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
import { AssignmentsService } from './assignments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateAssignmentDto } from './dto/CreateAssignment.dto';
import { UpdateAssignmentDto } from './dto/UpdateAssignment.dto';
import { CreateSubmissionDto } from './dto/CreateSubmission.dto';
import { GradeSubmissionDto } from './dto/GradeSubmissiondto';

@Controller('courses/:courseId/assignments')
export class AssignmentsController {
    constructor(private assignmentsService: AssignmentsService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('instructor')
    @Post()
    create(
        @Param('courseId', ParseIntPipe) courseId: number,
        @CurrentUser() user,
        @Body() dto: CreateAssignmentDto,
    ) {
        return this.assignmentsService.create(courseId, user.userId, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('instructor')
    @Patch(':assignmentId')
    update(
        // FIXED: Extra colon (:) removed from Param decorator
        @Param('assignmentId', ParseIntPipe) assignmentId: number,
        @CurrentUser() user,
        @Body() dto: UpdateAssignmentDto,
    ) {
        return this.assignmentsService.update(assignmentId, user.userId, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('instructor')
    @Delete(':assignmentId')
    remove(
        @Param('assignmentId', ParseIntPipe) assignmentId: number,
        @CurrentUser() user,
    ) {
        return this.assignmentsService.remove(assignmentId, user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAllByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
        return this.assignmentsService.findAllByCourse(courseId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':assignmentId')
    findOne(@Param('assignmentId', ParseIntPipe) assignmentId: number) {
        return this.assignmentsService.findOne(assignmentId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('student')
    @Post(':assignmentId/submit')
    submit(
        @Param('assignmentId', ParseIntPipe) assignmentId: number,
        @CurrentUser() user,
        @Body() dto: CreateSubmissionDto,
    ) {
        return this.assignmentsService.submitAssignment(assignmentId, user.userId, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('instructor')
    @Get(':assignmentId/submissions')
    getSubmissions(@Param('assignmentId', ParseIntPipe) assignmentId: number, @CurrentUser() user) {
        return this.assignmentsService.getSubmissionsForAssignment(assignmentId, user.userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('instructor')
    @Patch('submissions/:submissionId/grade')
    gradeSubmission(
        @Param('submissionId', ParseIntPipe) submissionId: number,
        @CurrentUser() user,
        @Body() dto: GradeSubmissionDto,
    ) {
        return this.assignmentsService.gradeSubmission(submissionId, user.userId, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('student')
    @Get(':assignmentId/my-submission')
    getMySubmission(@Param('assignmentId', ParseIntPipe) assignmentId: number, @CurrentUser() user) {
        return this.assignmentsService.getMySubmission(assignmentId, user.userId);
    }
}