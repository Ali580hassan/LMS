import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Question } from './question.entity';
import { QuizAttempt } from './quiz-attempt.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: 70 })
  passingScore!: number;
  //INDEX 1: Course ke saare quizzes load karne ke liye
  @Index()
  @ManyToOne(() => Course, (course) => course.quizzes, { onDelete: 'CASCADE' })
  course!: Course;

  @OneToMany(() => Question, (question) => question.quiz)
  questions!: Question[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.quiz)
  attempts!: QuizAttempt[];
}
