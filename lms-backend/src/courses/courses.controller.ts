import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Post()
  create(@CurrentUser() user, @Body() dto: CreateCourseDto) {
    return this.coursesService.create(user.userId, dto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.coursesService.findAll(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      search,
      categoryId ? Number(categoryId) : undefined,
    );
  }

  // 1. INSTRUCTOR COURSES ROUTE (ADD THIS BEFORE :id)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Get('instructor')
  findInstructorCourses(@CurrentUser() user) {
    // Apne service method ka naam yahan check kar lein (e.g. findByInstructor, findInstructorCourses)
    return this.coursesService.findByInstructor(user.userId);
  }

  // Dynamic route :id hamesha specific static routes ke BAAD aana chahiye
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
    return this.coursesService.remove(id, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @Patch(':id/publish')
  togglePublish(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
    return this.coursesService.togglePublish(id, user.userId);
  }
}
