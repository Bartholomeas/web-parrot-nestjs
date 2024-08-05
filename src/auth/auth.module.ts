import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
