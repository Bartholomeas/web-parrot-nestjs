import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    CacheModule.register(),
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
