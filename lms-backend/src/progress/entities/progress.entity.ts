import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
@Index(['enrollment', 'lesson'])
export class Progress {
  @PrimaryGeneratedColumn()
  id!: number;
  @Index()
  @ManyToOne(() => Enrollment, (enrollment) => enrollment.progress, {
    onDelete: 'CASCADE',
  })
  enrollment!: Enrollment;
  @Index()
  @ManyToOne(() => Lesson, (lesson) => lesson.progress, { onDelete: 'CASCADE' })
  lesson!: Lesson;
  @Index()
  @CreateDateColumn()
  completedAt!: Date;
}
