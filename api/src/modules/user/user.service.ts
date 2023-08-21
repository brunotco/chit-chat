import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { CreateUserDto, LoginUserDto, UpdateUserPasswordDto } from './user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getUser(username: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }

  async updatePassword(
    payload: UpdateUserPasswordDto,
    id: string,
  ): Promise<any> {
    console.log('reached')
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('invalid_user', HttpStatus.UNAUTHORIZED);
    }
    // console.log(user)
    const equalPwd = await compare(payload.old_password, user.password);
    if (!equalPwd) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prismaService.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }

  async createUser(newUser: CreateUserDto): Promise<any> {
    const alreadyExists = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: newUser.username }, { email: newUser.email }],
      },
    });
    if (alreadyExists) {
      throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
    }
    return await this.prismaService.user.create({
      data: { ...newUser, password: await hash(newUser.password, 10) },
    });
  }

  async findByLogin(loginUser: LoginUserDto): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: loginUser.login }, { email: loginUser.login }],
      },
    });
    if (!user) {
      throw new HttpException('invalid_user', HttpStatus.UNAUTHORIZED);
    }
    const equalPwd = await compare(loginUser.password, user.password);
    if (!equalPwd) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    const { password, ...rest } = user;
    return rest;
  }

  async findByPayload({ username, email }: any): Promise<any> {
    return await this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }
}
