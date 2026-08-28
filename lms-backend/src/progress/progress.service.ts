import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { CertificatesService } from 'src/certificates/certificates.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notifications/entities/notification.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,

    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,

    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,

    private readonly certificatesService: CertificatesService,
    private readonly notificationsService: NotificationsService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // 🛠️ Helper: Clear affected caches
  private async clearProgressCache(
    courseId: number,
    studentId: number,
    enrollmentId: number,
  ) {
    await Promise.all([
      this.cacheManager.del(`course:${courseId}`),
      this.cacheManager.del(`user_enrollments:${studentId}`),
      this.cacheManager.del(`progress:${enrollmentId}`),
    ]);
  }

  async markComplete(lessonId: number, studentId: number): Promise<Progress> {
    // 1. Find Lesson
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: { course: true },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // 2. Find Student Enrollment
    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        student: { id: studentId },
        course: { id: lesson.course.id },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException(
        'You must be enrolled in this course to track progress',
      );
    }

    // 3. Check Existing Progress
    const existingProgress = await this.progressRepository.findOne({
      where: {
        enrollment: { id: enrollment.id },
        lesson: { id: lessonId },
      },
    });

    if (existingProgress) {
      return existingProgress;
    }

    // 4. Create Progress
    const progress = this.progressRepository.create({
      enrollment: { id: enrollment.id } as any,
      lesson: { id: lessonId } as any,
    });

    const savedProgress = await this.progressRepository.save(progress);

    // 5. Update Percentage & Clear Caches
    await this.updateEnrollmentProgress(enrollment.id, lesson.course.id);
    await this.clearProgressCache(lesson.course.id, studentId, enrollment.id);

    return savedProgress;
  }

  // ⚡ CACHED: Get student progress for a specific enrollment (TTL: 300s)
  async getProgressByEnrollment(enrollmentId: number): Promise<Progress[]> {
    const cacheKey = `progress:${enrollmentId}`;

    const cached = await this.cacheManager.get<Progress[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const progressRecords = await this.progressRepository.find({
      where: { enrollment: { id: enrollmentId } },
      relations: { lesson: true },
    });

    await this.cacheManager.set(cacheKey, progressRecords, 300);
    return progressRecords;
  }

  async countByCourse(courseId: number): Promise<number> {
    return this.lessonRepository.count({
      where: { course: { id: courseId } },
    });
  }

  private async updateEnrollmentProgress(
    enrollmentId: number,
    courseId: number,
  ): Promise<void> {
    const completedCount = await this.progressRepository.count({
      where: { enrollment: { id: enrollmentId } },
    });

    const totalLessons = await this.countByCourse(courseId);

    const percentage =
      totalLessons > 0
        ? Math.min(100, Math.round((completedCount / totalLessons) * 100))
        : 0;

    // Update DB
    await this.enrollmentRepository.update(enrollmentId, {
      progressPercentage: percentage,
    });

    if (percentage !== 100) {
      return;
    }

    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: enrollmentId },
      relations: {
        student: true,
        course: { instructor: true },
      },
    });

    if (!enrollment) {
      return;
    }

    // Certificate & Notifications
    await this.certificatesService.createCertificate(enrollmentId);

    await Promise.all([
      this.notificationsService.createNotification(
        enrollment.student.id,
        `Congratulations! You have completed "${enrollment.course.title}"`,
        NotificationType.CERTIFICATE,
      ),
      enrollment.course.instructor?.id
        ? this.notificationsService.createNotification(
            enrollment.course.instructor.id,
            `${enrollment.student.name} has completed your course "${enrollment.course.title}"`,
            NotificationType.CERTIFICATE,
          )
        : Promise.resolve(),
    ]);
  }

  // ⚡ OPTIMIZED: Parallel execution instead of sequential blocking loop
  async recalculateAllForCourse(courseId: number): Promise<void> {
    const enrollments = await this.enrollmentRepository.find({
      where: { course: { id: courseId } },
      select: { id: true },
    });

    if (enrollments.length === 0) return;

    const tasks = enrollments.map((enrollment) =>
      this.updateEnrollmentProgress(enrollment.id, courseId),
    );

    await Promise.all(tasks);
  }
}
