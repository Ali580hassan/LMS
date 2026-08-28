import { Controller, Post, Body, UseGuards, Get, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Post()
  enroll(@CurrentUser() user, @Body('courseId') courseId: number) {
    return this.enrollmentsService.enroll(courseId, user.userId);
  }
// Student: see their own enrolled courses
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Get('my')
  getMyEnrollments(@CurrentUser() user) {
    return this.enrollmentsService.getMyEnrollments(user.userId);
  }

// Instructor: see students enrolled in one of their courses
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles('instructor')
  @Get('course/:courseId')
  getCourseStudents(@Param('courseId',ParseIntPipe)courseId : number,@CurrentUser() user){
return this.enrollmentsService.getCourseStudents(courseId , user.userId)
  }

     // Student: cancel their own enrollment in a course
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Delete(':courseId')
  cancel(@Param('courseId', ParseIntPipe) courseId: number, @CurrentUser() user) {
    return this.enrollmentsService.cancel(courseId, user.userId);
  }

}
