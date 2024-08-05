import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { BaseUser } from 'src/dto/user/base-user.dto';

export class CreateUserDto extends BaseUser {
  @ApiProperty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  confirmPassword: string;
}
