import { IsEmail, IsEnum, IsIn, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsIn(['student', 'instructor'])
  role!: UserRole;
}