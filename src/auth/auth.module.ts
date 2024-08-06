import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { SessionSerializer } from 'src/auth/helpers/session.serializer';

import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UserService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: process.env.AUTH_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
})
export class AuthModule {}
