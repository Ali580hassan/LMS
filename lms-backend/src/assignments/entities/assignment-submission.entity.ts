import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Assignment } from './assignment.entity';

@Entity()
// 🚀 1. Composite Unique Index: Student single submission enforcement + fast getMySubmission lookups
@Index(['assignment', 'enrollment'], { unique: true })
export class AssignmentSubmission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  content!: string;

  @Column({ nullable: true })
  fileUrl!: string;

  @Column({ nullable: true })
  grade!: string;

  @Column({ nullable: true })
  comment!: string;

  // 🚀 2. Single Sorting Index: Date-wise ordering (`ORDER BY submittedAt DESC`)
  @Index()
  @CreateDateColumn()
  submittedAt!: Date;

  // 🚀 3. Foreign Key Index: Enrollment joins & filter lookups
  @Index()
  @ManyToOne(
    () => Enrollment,
    (enrollment) => enrollment.assignmentSubmissions,
    { onDelete: 'CASCADE' },
  )
  enrollment!: Enrollment;

  // 🚀 4. Foreign Key Index: `getSubmissionsForAssignment` method filter
  @Index()
  @ManyToOne(
    () => Assignment,
    (assignment) => assignment.assignmentSubmissions,
    { onDelete: 'CASCADE' },
  )
  assignment!: Assignment;
}
