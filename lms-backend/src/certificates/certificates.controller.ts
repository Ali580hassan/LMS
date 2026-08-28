import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('certificates')
export class CertificatesController {
  constructor(private certificatesService: CertificatesService) {}

  // Student: Apne saare certificates dekho
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Get('my')
  getMyCertificates(@CurrentUser() user) {
    return this.certificatesService.getMyCertificates(user.userId);
  }

  // Instructor / Admin: Dekho kis kis student ne certificate liya hai
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor', 'admin')
  @Get('all')
  getAllCertificates(@CurrentUser() user) {
    const instructorId = user.role === 'instructor' ? user.userId : undefined;
    return this.certificatesService.getAllCertificates(instructorId);
  }

  // Student: Specific certificate view / download ke liye
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student', 'instructor', 'admin')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
    return this.certificatesService.findOne(id, user.userId, user.role);
  }

  // Public — koi guard nahi, koi bhi verify kar sake
  @Get(':id/verify')
  verify(@Param('id', ParseIntPipe) id: number) {
    return this.certificatesService.verify(id);
  }
}
