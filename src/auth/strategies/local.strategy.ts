import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/dto/user/sign-in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(input: SignInDto): Promise<any> {
    const user = this.authService.validateUser(input);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
