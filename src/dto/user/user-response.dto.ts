import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { BaseUser } from 'src/dto/user/base-user.dto';

export class UserResponseDto extends BaseUser {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;
}
