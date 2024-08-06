import { Injectable } from '@nestjs/common';

import { Maybe } from 'src/types/util.types';
import { PrismaService } from 'src/lib/prisma/prisma.service';

//TODO: This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 'a4a937ed-d2a7-4faa-9861-50e401230da1',
      email: 'mariano@gmail.com',
      password: '$2b$10$cyVsgk3ogSYHtKVE2YI66.GfusmUd3s2vd2PvP.OJ.q0zTTXNnyU2', //!23Haslo
    },
  ];

  constructor(private readonly prisma: PrismaService) {}
  async findOne(email: string): Promise<Maybe<User>> {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        createadAt: true,
        password: true,
      },
    });
    console.log('Xdd user: ', foundUser);

    return this.users.find((user) => user.email === email) ?? null;
  }
}
