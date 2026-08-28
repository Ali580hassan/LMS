import { Course } from 'src/courses/entities/course.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssignmentSubmission } from './assignment-submission.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  deadline!: Date;

  // 🚀 Single Foreign Key Index: `findAllByCourse` ke filter performance ke liye
  @Index()
  @ManyToOne(() => Course, (course) => course.assignments)
  course!: Course;

  @OneToMany(() => AssignmentSubmission, (submission) => submission.assignment)
  assignmentSubmissions!: AssignmentSubmission[];
}
