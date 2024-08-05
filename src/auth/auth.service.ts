import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AccessTokenDto } from 'src/dto/auth/access-token.do';
import { SignInDto } from 'src/dto/user/sign-in.dto';
import { UserResponseDto } from 'src/dto/user/user-response.dto';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(input: SignInDto): Promise<AccessTokenDto> {
    const user = await this.validateUser(input);
    const passwordsMatches = await this.comparePasswords(
      input.password,
      user.password,
    );
    if (!passwordsMatches) throw new UnauthorizedException();

    const accessToken = await this.signAccessToken(user);

    return { accessToken };
  }

  async comparePasswords(
    firstPassword: string,
    secondPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(firstPassword, secondPassword);
  }

  // TODO: replace any with User entity from Prisma
  async validateUser(input: SignInDto): Promise<any> {
    const user = await this.userService.findOne(input.email);
    if (!user) throw new UnauthorizedException();

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
