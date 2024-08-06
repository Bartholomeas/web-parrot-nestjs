import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';

import { UserEntity } from 'src/user/entity/user.entity';

interface UserCreatePayload {
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: UserCreatePayload): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        email: payload.email,
        password: payload.password,
      },
      select: {
        id: true,
        createdAt: true,
        email: true,
      },
    });

    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        password: true,
      },
    });

    return new UserEntity(user);
  }
}
