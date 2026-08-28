import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { CoursesService } from 'src/courses/courses.service';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notifications/entities/notification.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private coursesService: CoursesService,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createReview(
    courseId: number,
    studentId: number,
    dto: CreateReviewDto,
  ) {
    const course = await this.coursesService.findOne(courseId);

    const enrollment = await this.enrollmentRepository.findOne({
      where: { student: { id: studentId }, course: { id: courseId } },
      relations: {
        student: true,
      },
    });

    if (!enrollment) {
      throw new ForbiddenException('You must need to enroll first');
    }

    const review = this.reviewRepository.create({
      rating: dto.rating,
      comment: dto.comment,
      enrollment: enrollment,
    });

    const savedReview = await this.reviewRepository.save(review);

    await this.notificationsService.createNotification(
      course.instructor.id,
      `${enrollment.student.name} has submitted a ${dto.rating}-star review for your course.`,
      NotificationType.REVIEW,
    );
    return savedReview;
  }

  async findAllByCourse(courseId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { enrollment: { course: { id: courseId } } },
      relations: {
        enrollment: {
          student: true,
          course: true,
        },
      },
      order: { id: 'DESC' },
    });
  }

  async getAverageRating(courseId: number): Promise<number> {
    const cacheKey = `avg-rating-${courseId}`;

    // Step 1: pehlay cache mein check karo
    const cached = await this.cacheManager.get<number>(cacheKey);
    if (cached !== undefined && cached !== null) {
      return cached; // mil gaya cache se, database tak jane ki zaroorat nahi
    }

    // Step 2: cache mein nahi mila, to calculate karo (jaisa pehlay karte thay)
    const reviews = await this.findAllByCourse(courseId);
    const average =
      reviews.length === 0
        ? 0
        : Math.round(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) *
              10,
          ) / 10;

    // Step 3: result ko cache mein save kar do, agli baar ke liye
    await this.cacheManager.set(cacheKey, average);

    return average;
  }

  // ADDED: Update Review (Edit)
  async updateReview(
    reviewId: number,
    studentId: number,
    dto: CreateReviewDto,
  ) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: { enrollment: { student: true, course: true } },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.enrollment.student.id !== studentId) {
      throw new ForbiddenException('You can only edit your own review');
    }

    review.rating = dto.rating;
    review.comment = dto.comment;
    await this.cacheManager.del(
      `avg-rating-${review.enrollment.course.id}`,
    );
    return this.reviewRepository.save(review);
  }

  // ADDED: Delete Review
  async deleteReview(reviewId: number, studentId: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: { enrollment: { student: true } },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.enrollment.student.id !== studentId) {
      throw new ForbiddenException('You can only delete your own review');
    }

    await this.reviewRepository.remove(review);
    return { message: 'Review deleted successfully' };
  }
}
