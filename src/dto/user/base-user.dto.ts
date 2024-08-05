import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class BaseUser {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}
