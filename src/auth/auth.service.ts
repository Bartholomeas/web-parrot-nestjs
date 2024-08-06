import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { AccessTokenDto } from 'src/dto/auth/access-token.dto';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { SignInDto } from 'src/dto/user/sign-in.dto';
import { UserResponseDto } from 'src/dto/user/user-response.dto';
import { UserEntity } from 'src/user/entity/user.entity';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(input: SignInDto): Promise<AccessTokenDto> {
    const user = await this.validateUser(input);
    const accessToken = await this.signAccessToken(user);
    return { accessToken };
  }

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    if (user.password !== user.confirmPassword)
      throw new BadRequestException('Passwords does not match');

    const userExists = await this.userService.findOne(user.email);
    if (userExists?.email)
      throw new BadRequestException('User with this email already exists');

    const payload = {
      email: user.email,
      password: await bcrypt.hash(user.password, 9),
    };
    return await this.userService.create(payload);
  }

  async comparePasswords(
    firstPassword: string,
    secondPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(firstPassword, secondPassword);
  }

  async validateUser(input: SignInDto): Promise<UserEntity> {
    const user = await this.userService.findOne(input.email);

    if (!user?.email) throw new UnauthorizedException();

    const passwordsMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordsMatch) throw new UnauthorizedException();

    return user;
  }

  async signAccessToken(user: UserResponseDto): Promise<string> {
    return await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
  }
}
