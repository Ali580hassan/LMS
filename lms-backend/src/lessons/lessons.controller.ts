import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateLessonDto } from './dto/CreateLessonDto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateLessonDto } from './dto/UpdateLessonDto';

@Controller('courses/:courseId/lessons')
export class LessonsController {
  constructor(private lessonServices: LessonsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Post()
  create(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() dto: CreateLessonDto,
  ) {
    return this.lessonServices.create(courseId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.lessonServices.findAllByCourse(
      courseId,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonServices.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonServices.update(id, user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
    return this.lessonServices.remove(id, user.userId);
  }
}
