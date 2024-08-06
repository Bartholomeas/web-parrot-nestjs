import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
