import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { SignInDto } from 'src/dto/user/sign-in.dto';
import { UserResponseDto } from 'src/dto/user/user-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: [UserResponseDto],
  })
  createUser(@Body(ValidationPipe) user: CreateUserDto): UserResponseDto {
    if (user.password !== user.confirmPassword)
      throw new BadRequestException('Passwords does not match');

    return {
      id: crypto.randomUUID(),
      email: user.email,
    };
  }

  @Post('login')
  login(@Body(ValidationPipe) credentials: SignInDto) {
    return credentials.email;
  }
}
