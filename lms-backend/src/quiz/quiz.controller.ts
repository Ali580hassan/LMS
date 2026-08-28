import { Controller, Post, Get, Body, Param, ParseIntPipe, UseGuards, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QuizzesService } from './quiz.service';
import { CreateQuizDto } from './dto/CreateQuizDto';
import { SubmitQuizDto } from './dto/SubmitQuizDto';

@Controller('courses/:courseId/quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Post()
  create(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user,
    @Body() dto: CreateQuizDto,
  ) {
    return this.quizzesService.create(courseId, user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.quizzesService.findAllByCourse(courseId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Get('stats')
  getCourseQuizStats(@Param('courseId', ParseIntPipe) courseId: number, @CurrentUser() user) {
    return this.quizzesService.getCourseQuizStats(courseId, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Post(':quizId/submit')
  submit(
    @Param('quizId', ParseIntPipe) quizId: number,
    @CurrentUser() user,
    @Body() dto: SubmitQuizDto,
  ) {
    return this.quizzesService.submitAttempt(quizId, user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Get(':quizId/my-attempts')
  getMyAttempts(@Param('quizId', ParseIntPipe) quizId: number, @CurrentUser() user) {
    return this.quizzesService.getMyAttempts(quizId, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Delete(':quizId')
  remove(@Param('quizId', ParseIntPipe) quizId: number, @CurrentUser() user) {
    return this.quizzesService.remove(quizId, user.userId);
  }
}