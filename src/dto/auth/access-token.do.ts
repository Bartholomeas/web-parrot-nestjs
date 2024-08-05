import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty()
  @IsString()
  accessToken: string;
}
