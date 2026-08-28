import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('courses/:courseId/reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Post()
  create(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewService.createReview(courseId, user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('average')
  async getAverageRating(@Param('courseId', ParseIntPipe) courseId: number) {
    const avg = await this.reviewService.getAverageRating(courseId);
    return { averageRating: avg };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.reviewService.findAllByCourse(courseId);
  }

  // ADDED: Update Review endpoint
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Patch(':reviewId')
  update(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @CurrentUser() user,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, user.userId, dto);
  }

  // ADDED: Delete Review endpoint
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Delete(':reviewId')
  remove(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @CurrentUser() user,
  ) {
    return this.reviewService.deleteReview(reviewId, user.userId);
  }
}
