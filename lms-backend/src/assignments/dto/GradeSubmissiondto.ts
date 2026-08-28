// src/assignments/dto/grade-submission.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class GradeSubmissionDto {
  @IsString()
  grade!: string; // letter grade, jaise "A", "B+"

  @IsOptional()
  @IsString()
  comment?: string;
}