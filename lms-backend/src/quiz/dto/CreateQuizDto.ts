import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDto {
  @IsString()
  @MinLength(3)
  text!: string;

  @IsArray()
  @IsString({ each: true })
  options!: string[];

  @IsNumber()
  correctAnswerIndex!: number;
}

export class CreateQuizDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsOptional()
  @IsNumber()
  passingScore?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions!: QuestionDto[];
}