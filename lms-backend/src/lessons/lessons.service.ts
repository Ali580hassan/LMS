import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/CreateLessonDto';
import { UpdateLessonDto } from './dto/UpdateLessonDto';
import { ProgressService } from 'src/progress/progress.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { NotificationType } from 'src/notifications/entities/notification.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    private progressService: ProgressService,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  // Helper method: Clear lesson related cache
  private async clearLessonCache(courseId: number, lessonId?: number) {
    const promises: Promise<any>[] = [
      this.cacheManager.del(`course:${courseId}`),
    ];
    if (lessonId) {
      promises.push(this.cacheManager.del(`lesson:${lessonId}`));
    }
    await Promise.all(promises);
  }

  async create(courseId: number, dto: CreateLessonDto): Promise<Lesson> {
    const lessonData = {
      ...dto,
      title: dto.title?.trim(),
      description: dto.description?.trim() || undefined,
      videoUrl: dto.videoUrl?.trim() || undefined,
      resourceUrl: dto.resourceUrl?.trim() || undefined,
      course: { id: courseId } as any,
    };

    const lesson = this.lessonRepository.create(lessonData);
    const savedLesson = await this.lessonRepository.save(lesson);

    // 🔥 Cache clear & progress recalculation
    await this.clearLessonCache(courseId);
    await this.progressService.recalculateAllForCourse(courseId);

    // Notifications dispatch
    const enrollments = await this.enrollmentRepository.find({
      where: { course: { id: courseId } },
      relations: { student: true },
    });

    if (enrollments.length > 0) {
      const notificationPromises = enrollments.map((enrollment) =>
        this.notificationsService.createNotification(
          enrollment.student.id,
          `New lesson "${savedLesson.title}" has been added to your course!`,
          NotificationType.LESSON,
        ),
      );
      await Promise.all(notificationPromises);
    }

    return savedLesson;
  }

  // ⚡ CACHED: Fetch paginated lessons for a course (TTL: 120 Seconds)
  async findAllByCourse(
    courseId: number,
    page: number = 1,
    limit: number = 10,
  ) {
    const cacheKey = `course_${courseId}_lessons_p${page}_l${limit}`;

    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Heavy relation 'progress' removed from public list to improve speed
    const [lessons, total] = await this.lessonRepository.findAndCount({
      where: { course: { id: courseId } },
      order: { order: 'ASC', createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const response = {
      data: lessons,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };

    await this.cacheManager.set(cacheKey, response, 120);
    return response;
  }

  private checkLessonOwnerShip(lesson: Lesson, instructorId: number): void {
    if (
      !lesson.course?.instructor ||
      lesson.course.instructor.id !== instructorId
    ) {
      throw new ForbiddenException('You do not own this lesson');
    }
  }

  // ⚡ CACHED: Fetch single lesson details (TTL: 120 Seconds)
  async findOne(id: number): Promise<Lesson> {
    const cacheKey = `lesson:${id}`;

    const cached = await this.cacheManager.get<Lesson>(cacheKey);
    if (cached) {
      return cached;
    }

    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: {
        course: {
          instructor: true,
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    await this.cacheManager.set(cacheKey, lesson, 120);
    return lesson;
  }

  async update(lessonId: number, instructorId: number, dto: UpdateLessonDto) {
    const lesson = await this.findOne(lessonId);

    this.checkLessonOwnerShip(lesson, instructorId);

    Object.assign(lesson, {
      ...dto,
      title: dto.title?.trim(),
      description: dto.description?.trim() || undefined,
      videoUrl: dto.videoUrl?.trim() || undefined,
      resourceUrl: dto.resourceUrl?.trim() || undefined,
    });

    const updatedLesson = await this.lessonRepository.save(lesson);

    // 🔥 Cache Invalidation
    await this.clearLessonCache(lesson.course.id, lessonId);

    const enrollments = await this.enrollmentRepository.find({
      where: { course: { id: lesson.course.id } },
      relations: { student: true },
    });

    if (enrollments.length > 0) {
      const notificationPromises = enrollments.map((enrollment) =>
        this.notificationsService.createNotification(
          enrollment.student.id,
          `Lesson "${updatedLesson.title}" has been updated.`,
          NotificationType.LESSON,
        ),
      );

      await Promise.all(notificationPromises);
    }

    return updatedLesson;
  }

  async remove(
    lessonId: number,
    instructorId: number,
  ): Promise<{ message: string }> {
    const lesson = await this.findOne(lessonId);
    this.checkLessonOwnerShip(lesson, instructorId);
    const courseId = lesson.course.id;

    await this.lessonRepository.remove(lesson);

    // 🔥 Cache Invalidation & Progress Recalculation
    await this.clearLessonCache(courseId, lessonId);
    await this.progressService.recalculateAllForCourse(courseId);

    return { message: 'Lesson deleted successfully' };
  }
}
