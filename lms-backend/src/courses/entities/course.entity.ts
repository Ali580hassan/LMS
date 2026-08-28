import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Category } from 'src/categories/entities/categories.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Entity()
// 🚀 1. Composite Index: Instructor dashboard par courses fetch + latest order (ORDER BY createdAt DESC)
@Index(['instructor', 'createdAt'])
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ default: false })
  isPublished!: boolean;

  // 🚀 2. Single Foreign Key Index: `findByInstructor` filter aur foreign key relation JOINs ke liye
  @Index()
  @ManyToOne(() => User, (user) => user.courses)
  instructor!: User;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course, {
    onDelete: 'CASCADE',
  })
  enrollments!: Enrollment[];

  @OneToMany(() => Lesson, (lesson) => lesson.course, { onDelete: 'CASCADE' })
  lessons!: Lesson[];

  // 🚀 3. Single Sorting Index: Standalone date sorting ke liye
  @Index()
  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => Category, (category) => category.courses)
  @JoinTable()
  categories!: Category[];

  @OneToMany(() => Quiz, (quiz) => quiz.course)
  quizzes!: Quiz[];

  @OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments!: Assignment[];
}
