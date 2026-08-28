import { IsString, MinLength, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  description!: string;

  @IsDateString()
  deadline!: string;
}