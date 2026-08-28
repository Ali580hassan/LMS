import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['enrollment'])
export class Certificate {
  @PrimaryGeneratedColumn()
  id!: number;

  // 🚀 1. Foreign Key Unique Index: Quick lookup + Prevent Duplicate Certificates per enrollment
  @Index({ unique: true })
  @ManyToOne(() => Enrollment, (enrollment) => enrollment.certificates, {
    onDelete: 'CASCADE',
  })
  enrollment!: Enrollment;

  // 🚀 2. Single Sorting Index: Latest certificates sort karne ke liye (ORDER BY issuedAt DESC)
  @Index()
  @CreateDateColumn()
  issuedAt!: Date;
}
