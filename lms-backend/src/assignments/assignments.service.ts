import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/CreateAssignment.dto';
import { CoursesService } from 'src/courses/courses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { UpdateAssignmentDto } from './dto/UpdateAssignment.dto';
import { CreateSubmissionDto } from './dto/CreateSubmission.dto';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { AssignmentSubmission } from './entities/assignment-submission.entity';
import { GradeSubmissionDto } from './dto/GradeSubmissiondto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    private coursesService: CoursesService,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(AssignmentSubmission)
    private submissionRepository: Repository<AssignmentSubmission>,
  ) {}
  async create(
    courseId: number,
    instructorId: number,
    dto: CreateAssignmentDto,
  ) {
    const course = await this.coursesService.findOne(courseId);
    if (course.instructor.id !== instructorId) {
      throw new ForbiddenException(
        'you can only create your own course assignment',
      );
    }
    const assignment = this.assignmentRepository.create({
      title: dto.title,
      description: dto.description,
      deadline: dto.deadline,
      course: { id: courseId } as any,
    });
    return this.assignmentRepository.save(assignment);
  }
  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: {
        course: {
          instructor: true,
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }
  private checkAssignmentOwnership(
    assignment: Assignment,
    instructorId: number,
  ): void {
    if (assignment.course.instructor.id !== instructorId) {
      throw new ForbiddenException('...');
    }
  }
  async update(
    assignmentId: number,
    instructorId: number,
    dto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    // Step 1: findOne se assignment nikalo
    const assignment = await this.findOne(assignmentId);
    // Step 2: checkAssignmentOwnership call karo
    this.checkAssignmentOwnership(assignment, instructorId);
    // Step 3: Object.assign se dto ka data merge karo
    Object.assign(assignment, dto);
    // Step 4: save karo, return karo
    return this.assignmentRepository.save(assignment);
  }
  async remove(
    assignmentId: number,
    instructorId: number,
  ): Promise<{ message: string }> {
    // Step 1: findOne
    const assignment = await this.findOne(assignmentId);
    // Step 2: ownership check
    this.checkAssignmentOwnership(assignment, instructorId);
    // Step 3: delete karo
    await this.assignmentRepository.remove(assignment);

    // Step 4: message return karo
    return { message: 'Course deleted successfully' };
  }
  async findAllByCourse(courseId: number): Promise<Assignment[]> {
    return this.assignmentRepository.find({
      where: { course: { id: courseId } },
    });
  }

  async submitAssignment(
    assignmentId: number,
    studentId: number,
    dto: CreateSubmissionDto,
  ) {
    // Step 1: assignment fetch karo
    const assignment = await this.findOne(assignmentId);

    // Step 2: socho — is assignment ke course mein, is student ki enrollment dhoondo
    // (bilkul QuizzesService.submitAttempt() jaisa pattern)
    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        student: { id: studentId },
        course: { id: assignment.course.id },
      },
    });

    // Step 3: agar enrollment na mile, error throw karo
    if (!enrollment) {
      throw new ForbiddenException('you must need to enroll in this course');
    }
    // Step 4: naya AssignmentSubmission record banao aur save karo
    const submission = this.submissionRepository.create({
      content: dto.content,
      fileUrl: dto.fileUrl,
      enrollment: { id: enrollment.id } as any,
      assignment: { id: assignmentId } as any,
    });

    return this.submissionRepository.save(submission);
  }

  // Instructor: ek specific assignment ke saare submissions dekho
  async getSubmissionsForAssignment(
    assignmentId: number,
    instructorId: number,
  ): Promise<AssignmentSubmission[]> {
    const assignment = await this.findOne(assignmentId); // course.instructor bhi load hota hai
    this.checkAssignmentOwnership(assignment, instructorId);

    return this.submissionRepository.find({
      where: { assignment: { id: assignmentId } },
      relations: { enrollment: { student: true } },
      order: { submittedAt: 'DESC' },
    });
  }

  // Instructor: ek submission ko grade + feedback do
  async gradeSubmission(
    submissionId: number,
    instructorId: number,
    dto: GradeSubmissionDto,
  ): Promise<AssignmentSubmission> {
    const submission = await this.submissionRepository.findOne({
      where: { id: submissionId },
      relations: { assignment: { course: { instructor: true } } },
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    if (submission.assignment.course.instructor.id !== instructorId) {
      throw new ForbiddenException(
        'You can only grade submissions for your own courses',
      );
    }

    submission.grade = dto.grade || '';
    submission.comment = dto.comment || '';

    return this.submissionRepository.save(submission);
  }

  // Student: apni submission dekho (status/grade check karne ke liye)
  async getMySubmission(
    assignmentId: number,
    studentId: number,
  ): Promise<AssignmentSubmission | null> {
    return this.submissionRepository.findOne({
      where: {
        assignment: { id: assignmentId },
        enrollment: { student: { id: studentId } },
      },
    });
  }
}
