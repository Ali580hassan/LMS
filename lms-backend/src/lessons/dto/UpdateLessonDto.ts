import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './CreateLessonDto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}