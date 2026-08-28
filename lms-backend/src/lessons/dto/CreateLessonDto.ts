import { IsString, IsOptional, IsUrl, MinLength, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  resourceUrl?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}