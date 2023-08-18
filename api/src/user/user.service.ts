import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getUser(username: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }
}
