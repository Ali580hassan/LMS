import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  rating!: number;

  @Column()
  comment!: string;
  // () => Enrollment target entity , (enrollment) => enrollment.reviews,
  //  enrollment this is the instance of target property
  //  enrollment.reviews retuen feild that reffer to this entity
  @Index()
  @ManyToOne(() => Enrollment, (enrollment) => enrollment.reviews, {
    onDelete: 'CASCADE',
  })
  enrollment!: Enrollment;
  @Index()
  @CreateDateColumn()
  reviewdate!: Date; // socho — kab review diya, konsa field naam?
}
