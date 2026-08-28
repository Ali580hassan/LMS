import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { AssignmentSubmission } from './entities/assignment-submission.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Assignment , AssignmentSubmission ,Enrollment ]),
    CoursesModule,
    EnrollmentsModule
  ],
  providers: [AssignmentsService],
  controllers: [AssignmentsController]
})
export class AssignmentsModule {}
