import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentDto } from './CreateAssignment.dto';

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {}