import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notifications/entities/notification.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    private notificationsService: NotificationsService,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  // =========================================================
  // CLEAR SINGLE COURSE CACHE
  // =========================================================

  private async clearCourseCache(courseId: number): Promise<void> {
    await this.cacheManager.del(`course:${courseId}`);
  }

  // =========================================================
  // CLEAR COURSE LIST CACHE
  // =========================================================
  //
  // cache-manager ke default store mein wildcard delete
  // reliable nahi hota, isliye list cache keys ko track karna
  // better approach hai.
  //
  // Simple development solution:
  // specific known pagination/search combinations ko delete
  // karna possible hai.
  //
  // Production mein Redis use karte waqt pattern-based
  // invalidation better hai.
  // =========================================================

  private async clearCourseListCache(): Promise<void> {
    /**
     * Agar Redis use kar rahe ho to yahan pattern based
     * invalidation implement kar sakte ho:
     *
     * courses_*
     *
     * Filhal simple solution ke liye cache-manager store
     * ke keys() method ko use kar rahe hain agar available ho.
     */

    const store = this.cacheManager as any;

    if (store.store?.keys) {
      const keys: string[] = await store.store.keys('courses_*');

      await Promise.all(keys.map((key) => this.cacheManager.del(key)));
    }
  }

  // =========================================================
  // CREATE
  // =========================================================

  async create(instructorId: number, dto: CreateCourseDto): Promise<Course> {
    const { categoryIds, ...rest } = dto;

    const course = this.courseRepository.create({
      ...rest,

      instructor: {
        id: instructorId,
      } as any,

      categories: categoryIds?.map((id) => ({
        id,
      })) as any,
    });

    const savedCourse = await this.courseRepository.save(course);

    // New course means old course listing cache is stale
    await this.clearCourseListCache();

    return savedCourse;
  }

  // =========================================================
  // FIND ALL
  // =========================================================

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    categoryId?: number,
  ) {
    // Safety
    page = Math.max(1, Number(page) || 1);

    limit = Math.min(50, Math.max(1, Number(limit) || 10));

    const cacheKey =
      `courses_p${page}` +
      `_l${limit}` +
      `_s${search || ''}` +
      `_c${categoryId || ''}`;

    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      console.log(`✅ CACHE HIT — ${cacheKey}`);
      return cached;
    }

    console.log(`❌ CACHE MISS — ${cacheKey}`);

    const query = this.courseRepository
      .createQueryBuilder('course')

      // IMPORTANT:
      // instructor ki complete entity select nahi karni
      .leftJoin('course.instructor', 'instructor')

      // Sirf required instructor fields
      .addSelect([
        'instructor.id',
        'instructor.name',
        'instructor.profileImage',
      ])

      .leftJoinAndSelect('course.categories', 'category')

      .where(
        search
          ? '(course.title ILIKE :search OR course.description ILIKE :search)'
          : '1=1',
        search
          ? {
              search: `%${search}%`,
            }
          : {},
      );

    if (categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId,
      });
    }

    query
      .orderBy('course.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [courses, total] = await query.getManyAndCount();

    const response = {
      data: courses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    await this.cacheManager.set(cacheKey, response, 120);

    return response;
  }

  // =========================================================
  // FIND ONE
  // =========================================================

  async findOne(id: number): Promise<Course> {
    const cacheKey = `course:${id}`;

    const cached = await this.cacheManager.get<Course>(cacheKey);

    if (cached) {
      console.log(`✅ CACHE HIT — ${cacheKey}`);
      return cached;
    }

    console.log(`❌ CACHE MISS — ${cacheKey}`);

    const course = await this.courseRepository
      .createQueryBuilder('course')

      .leftJoin('course.instructor', 'instructor')

      // IMPORTANT:
      // Password intentionally excluded
      .addSelect([
        'instructor.id',
        'instructor.name',
        'instructor.email',
        'instructor.profileImage',
      ])

      .leftJoinAndSelect('course.categories', 'category')

      .leftJoinAndSelect('course.enrollments', 'enrollment')

      .leftJoinAndSelect('enrollment.student', 'student')

      .leftJoinAndSelect('course.lessons', 'lesson')

      .where('course.id = :id', { id })

      .getOne();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.cacheManager.set(cacheKey, course, 60);

    return course;
  }

  // =========================================================
  // OWNERSHIP
  // =========================================================

  private checkOwnership(course: Course, instructorId: number): void {
    if (course.instructor.id !== instructorId) {
      throw new ForbiddenException('You can only modify your own courses');
    }
  }

  // =========================================================
  // UPDATE
  // =========================================================

  async update(
    id: number,
    instructorId: number,
    dto: UpdateCourseDto,
  ): Promise<Course> {
    const course = await this.findOne(id);

    this.checkOwnership(course, instructorId);

    // categoryIds ko course entity mein directly assign
    // nahi karna.
    const { categoryIds, ...courseData } = dto;

    Object.assign(course, courseData);

    if (categoryIds) {
      course.categories = categoryIds.map((id) => ({
        id,
      })) as any;
    }

    const updatedCourse = await this.courseRepository.save(course);

    // Clear single course cache
    await this.clearCourseCache(id);

    // Clear ALL course list caches
    await this.clearCourseListCache();

    if (course.enrollments && course.enrollments.length > 0) {
      const notificationPromises = course.enrollments.map((enrollment) =>
        this.notificationsService.createNotification(
          enrollment.student.id,
          `The course "${updatedCourse.title}" has been updated.`,
          NotificationType.COURSE,
        ),
      );

      await Promise.all(notificationPromises);
    }

    return updatedCourse;
  }

  // =========================================================
  // DELETE
  // =========================================================

  async remove(id: number, instructorId: number): Promise<{ message: string }> {
    const course = await this.findOne(id);

    this.checkOwnership(course, instructorId);

    if (course.enrollments && course.enrollments.length > 0) {
      const notificationPromises = course.enrollments.map((enrollment) =>
        this.notificationsService.createNotification(
          enrollment.student.id,
          `The course "${course.title}" has been deleted.`,
          NotificationType.COURSE,
        ),
      );

      await Promise.all(notificationPromises);
    }

    await this.courseRepository.remove(course);

    // Clear caches
    await this.clearCourseCache(id);
    await this.clearCourseListCache();

    return {
      message: 'Course deleted successfully',
    };
  }

  // =========================================================
  // TOGGLE PUBLISH
  // =========================================================

  async togglePublish(id: number, instructorId: number): Promise<Course> {
    const course = await this.findOne(id);

    this.checkOwnership(course, instructorId);

    course.isPublished = !course.isPublished;

    const updatedCourse = await this.courseRepository.save(course);

    // Clear both caches
    await this.clearCourseCache(id);
    await this.clearCourseListCache();

    return updatedCourse;
  }

  // =========================================================
  // FIND BY INSTRUCTOR
  // =========================================================

  async findByInstructor(instructorId: number) {
    return this.courseRepository.find({
      where: {
        instructor: {
          id: instructorId,
        },
      },

      relations: {
        categories: true,
        lessons: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }
}
