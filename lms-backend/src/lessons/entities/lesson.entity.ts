import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Entity()
// 🚀 1. Composite Index: Specific course ke lessons ko sequence (order) mein super-fast load karne ke liye
@Index(['course', 'order'])
export class Lesson {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  videoUrl!: string;

  @Column({ nullable: true })
  resourceUrl!: string;

  // 🚀 2. Single Index: Order-wise sorting ke liye
  @Index()
  @Column({ default: 0 })
  order!: number;

  // 🚀 3. Single Index: Foreign Key filter ke liye (WHERE courseId = ?)
  @Index()
  @ManyToOne(() => Course, (course) => course.lessons, { onDelete: 'CASCADE' })
  course!: Course;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Progress, (progress) => progress.lesson)
  progress!: Progress[];
}
