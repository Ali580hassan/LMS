import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import { Progress } from 'src/progress/entities/progress.entity';
import { QuizAttempt } from 'src/quiz/entities/quiz-attempt.entity';
import { AssignmentSubmission } from 'src/assignments/entities/assignment-submission.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Certificate } from '../../certificates/entities/certificate.entity';

@Entity()
// 🚀 1. Composite Unique Index: Duplicate student enrollment prevent karne aur double-field search superfast karne ke liye
@Index(['student', 'course'], { unique: true })
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  // 🚀 2. Single Foreign Key Index: `getMyEnrollments` (student filter) ke liye
  @Index()
  @ManyToOne(() => User, (user) => user.enrollments)
  student!: User;

  // 🚀 3. Single Foreign Key Index: `getCourseStudents` (course filter) ke liye
  @Index()
  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  course!: Course;

  @Column({ default: 0 })
  progressPercentage!: number;

  // 🚀 4. Sorting Index: Date-wise sorting ke liye
  @Index()
  @CreateDateColumn()
  enrolledAt!: Date;

  @OneToMany(() => Progress, (progress) => progress.enrollment, {
    onDelete: 'CASCADE',
  })
  progress!: Progress[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.enrollment)
  quizAttempts!: QuizAttempt[];

  @OneToMany(() => AssignmentSubmission, (submission) => submission.enrollment)
  assignmentSubmissions!: AssignmentSubmission[];

  @OneToMany(() => Review, (review) => review.enrollment)
  reviews!: Review[];

  @OneToMany(() => Certificate, (certificate) => certificate.enrollment)
  certificates!: Certificate[];
}
