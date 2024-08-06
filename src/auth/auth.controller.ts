import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.auth.guard';
import { AccessTokenDto } from 'src/dto/auth/access-token.dto';

import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { SignInDto } from 'src/dto/user/sign-in.dto';
import { UserResponseDto } from 'src/dto/user/user-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: [AccessTokenDto],
  })
  async signIn(@Body(ValidationPipe) credentials: SignInDto) {
    return await this.authService.signIn(credentials);
  }

  @Post('create-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: [UserResponseDto],
  })
  async createUser(
    @Body(ValidationPipe) user: CreateUserDto,
  ): Promise<UserResponseDto> {
    const createdUser = await this.authService.createUser(user);
    return {
      id: createdUser.id,
      createdAt: createdUser.createdAt,
      email: createdUser.email,
    };
  }
}
