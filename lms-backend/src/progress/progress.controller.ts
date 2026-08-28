import { Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('progress')
export class ProgressController {
    constructor(private progressService : ProgressService){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('student')
    @Post(':lessonId/complete')
    markComplete(@Param('lessonId', ParseIntPipe) lessonId: number, @CurrentUser() user) {
        return this.progressService.markComplete(lessonId, user.userId);
    }
}
