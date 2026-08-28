import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/entities/course.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notifications/entities/notification.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private coursesService: CoursesService,
    private notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  // 🛠️ Helper: Single function to clear all affected caches
  private async clearEnrollmentCaches(courseId: number, studentId: number) {
    await Promise.all([
      this.cacheManager.del(`course:${courseId}`), // Course details cache
      this.cacheManager.del(`user_enrollments:${studentId}`), // Student's enrollment list cache
      this.cacheManager.del(`course_students:${courseId}`), // Instructor's student list cache
    ]);
  }

  async enroll(courseId: number, studentId: number): Promise<Enrollment> {
    const course = await this.coursesService.findOne(courseId);

    if (!course.isPublished) {
      throw new BadRequestException('Cannot enroll in an unpublished course');
    }

    if (course.instructor?.id === studentId) {
      throw new BadRequestException(
        'Instructor cannot enroll in their own course',
      );
    }

    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: { student: { id: studentId }, course: { id: courseId } },
    });

    if (existingEnrollment) {
      throw new BadRequestException(
        'Student is already enrolled in this course',
      );
    }

    const enrollment = this.enrollmentRepository.create({
      student: { id: studentId },
      course: { id: courseId },
    });

    const savedEnrollment = await this.enrollmentRepository.save(enrollment);

    // 🔥 CACHE INVALIDATION: Stale cache ko clear kar rahe hain
    await this.clearEnrollmentCaches(courseId, studentId);

    // 🔔 Send Notifications
    const notificationPromises = [
      this.notificationsService.createNotification(
        studentId,
        `You have successfully enrolled in "${course.title}"! 🎉`,
        NotificationType.ENROLLMENT,
      ),
    ];

    if (course.instructor?.id) {
      notificationPromises.push(
        this.notificationsService.createNotification(
          course.instructor.id,
          `A new student has enrolled in your course "${course.title}"!`,
          NotificationType.ENROLLMENT,
        ),
      );
    }

    await Promise.all(notificationPromises);

    return savedEnrollment;
  }

  // ⚡ CACHED: Student's Enrolled Courses List (TTL: 300 seconds / 5 mins)
  async getMyEnrollments(studentId: number): Promise<Enrollment[]> {
    const cacheKey = `user_enrollments:${studentId}`;

    const cached = await this.cacheManager.get<Enrollment[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const enrollments = await this.enrollmentRepository.find({
      where: { student: { id: studentId } },
      relations: { course: true },
    });

    // 5 minutes ke liye save kar lo
    await this.cacheManager.set(cacheKey, enrollments, 300);
    return enrollments;
  }

  private checkOwnership(course: Course, instructorId: number): void {
    if (course.instructor?.id !== instructorId) {
      throw new ForbiddenException(
        'You can only view students of your own courses',
      );
    }
  }

  // ⚡ CACHED: Instructor's Course Student List (TTL: 300 seconds / 5 mins)
  async getCourseStudents(
    courseId: number,
    instructorId: number,
  ): Promise<Enrollment[]> {
    const course = await this.coursesService.findOne(courseId);
    this.checkOwnership(course, instructorId);

    const cacheKey = `course_students:${courseId}`;

    const cached = await this.cacheManager.get<Enrollment[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const students = await this.enrollmentRepository.find({
      where: { course: { id: courseId } },
      relations: { student: true },
    });

    await this.cacheManager.set(cacheKey, students, 300);
    return students;
  }

  async cancel(
    courseId: number,
    studentId: number,
  ): Promise<{ message: string }> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { course: { id: courseId }, student: { id: studentId } },
      relations: { course: true },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    const courseTitle = enrollment.course?.title || 'Course';

    await this.enrollmentRepository.remove(enrollment);

    // 🔥 CACHE INVALIDATION: Enrollment delete hoti hi cache clear!
    await this.clearEnrollmentCaches(courseId, studentId);

    await this.notificationsService.createNotification(
      studentId,
      `Your enrollment in "${courseTitle}" has been cancelled successfully.`,
      NotificationType.ENROLLMENT,
    );

    return { message: 'Enrollment cancelled successfully' };
  }
}
