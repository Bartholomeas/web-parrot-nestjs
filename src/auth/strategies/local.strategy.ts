import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/dto/user/sign-in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const payload = {
      email,
      password,
    } satisfies SignInDto;

    const user = await this.authService.validateUser(payload);
    if (!user?.email) throw new UnauthorizedException();

    return user;
  }
}
