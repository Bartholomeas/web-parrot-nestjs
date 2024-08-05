import { Injectable } from '@nestjs/common';
import { Maybe } from 'src/types/util.types';

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

  async findOne(email: string): Promise<Maybe<User>> {
    return this.users.find((user) => user.email === email) ?? null;
  }
}
