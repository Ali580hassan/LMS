import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Quiz } from './quiz.entity';

@Entity()
// 🚀 INDEX 6 (Composite): Jab quiz aur enrollment ek sath search hon
@Index(['quiz', 'enrollment'])
export class QuizAttempt {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  score!: number;

  @Column()
  totalQuestions!: number;

  @Column()
  passed!: boolean;
  // 🚀 INDEX 3: Enrollment Foreign Key
  @Index()
  @ManyToOne(() => Enrollment, (enrollment) => enrollment.quizAttempts, {
    onDelete: 'CASCADE',
  })
  enrollment!: Enrollment;
  // 🚀 INDEX 4: Quiz Foreign Key
  @Index()
  @ManyToOne(() => Quiz, (quiz) => quiz.attempts, { onDelete: 'CASCADE' })
  quiz!: Quiz;
  // 🚀 INDEX 5: Fast Sorting ke liye (ORDER BY attemptedAt)
  @Index()
  @CreateDateColumn()
  attemptedAt!: Date; // yehi tumhara "Date" concept hai — CreateDateColumn khud handle karta hai
}
