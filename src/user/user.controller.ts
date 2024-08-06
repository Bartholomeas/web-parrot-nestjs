import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@Controller('user')
export class UserController {
  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  async getMe() {
    return 'xdd';
  }
}
