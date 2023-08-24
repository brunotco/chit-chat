import { PrismaService } from '@modules/prisma/prisma.service';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, LoginUserDto, UpdateUserPasswordDto } from '@shared/user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  //TODO: Update this
  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  //TODO: Update this
  async getUser(username: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }

  /**
   * Update a user password
   * @param id The user id
   * @param updatePwd The data for the password update
   * @returns Partial user data
   */
  public async updatePassword(
    id: string,
    updatePwd: UpdateUserPasswordDto,
  ): Promise<Partial<User>> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        password: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid User');
    }
    const equalPwd = await compare(updatePwd.old_password, user.password);
    if (!equalPwd) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return await this.prismaService.user.update({
      where: { id },
      data: { password: await hash(updatePwd.new_password, 10) },
      select: {
        id: true,
      },
    });
  }

  /**
   * Create a new user
   * Check if username or email already exists
   * On create, hashes the password
   * @param user The data for the user
   * @returns The created user
   */
  public async createUser(user: CreateUserDto): Promise<User> {
    const alreadyExists = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: user.username }, { email: user.email }],
      },
      select: {
        id: true,
      },
    });
    if (alreadyExists) {
      throw new ConflictException('Username or Email Already In Use');
    }
    return await this.prismaService.user.create({
      data: { ...user, password: await hash(user.password, 10) },
      //? Select just some userData
    });
  }

  /**
   * Find a user
   * Check if user exists
   * Check if password match
   * @param login The data for the login
   * @returns Partial user data
   */
  public async findByLogin(login: LoginUserDto): Promise<Partial<User>> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: login.login }, { email: login.login }],
        AND: { active: true },
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid User');
    }
    const equalPwd = await compare(login.password, user.password);
    if (!equalPwd) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const { password, ...rest } = user;
    return rest;
  }

  //TODO: Update this
  async findByPayload({ username, email }: any): Promise<any> {
    return await this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }

  //! Check if to delete
  private async findUser(login: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: login }, { email: login }],
      },
    });
  }
}
