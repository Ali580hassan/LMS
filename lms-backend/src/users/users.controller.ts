import { UseGuards, Req, Get, Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user; // wahi data jo JwtStrategy.validate() se return hua tha
  }

  
}