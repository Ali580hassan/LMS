import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column('simple-array')
  options!: string[];

  @Column()
  correctAnswerIndex!: number;
  // 🚀 INDEX 2: Quiz ID ke zariye questions instantly JOIN karne ke liye
  @Index()
  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  quiz!: Quiz;
}
