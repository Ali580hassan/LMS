import { Module } from '@nestjs/common';
import { QuizzesService } from './quiz.service';
import { QuizzesController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { Progress } from 'src/progress/entities/progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      Question,
      QuizAttempt,
      Enrollment,
      Progress,
    ]),
    CoursesModule,
  ],
  providers: [QuizzesService],
  controllers: [QuizzesController],
})
export class QuizModule {}
