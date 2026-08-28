import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum NotificationType {
  GRADE = 'grade',
  LESSON = 'lesson',
  ENROLLMENT = 'enrollment',
  REVIEW = 'review',
  CERTIFICATE = 'certificate',
  COURSE = 'course',
}
@Entity()
// 🚀 Composite Index: User ki notifications fast fetch + latest order (ORDER BY createdAt DESC)
@Index(['user', 'createdAt'])
// 🚀 Composite Index: Unread notifications instantly count/fetch karne ke liye
@Index(['user', 'isRead'])
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  message!: string;
  @Column({ type: 'enum', enum: NotificationType })
  type!: NotificationType;

  @Column({ default: false })
  isRead!: boolean;
  @Index()
  @CreateDateColumn()
  createdAt!: Date;
  @Index()
  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user!: User;
}
