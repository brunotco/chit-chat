import { PrismaService } from '@modules/prisma/prisma.service';
import { ConflictException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { User } from '@shared/prisma-class/user';
import { CreateUserDto, LoginUserDto, UpdateUserPasswordDto } from '@shared/user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Returns all users
   * @returns Data of all users
   */
  public async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    users.forEach((user) => delete user.password);
    return users;
  }

  //TODO: Update this
  public async findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  //TODO: Update this
  public async findByUsername(username: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }

  //TODO: Update this
  public async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
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
      throw new NotFoundException('Invalid User');
    }
    const equalPwd = await compare(updatePwd.old_password, user.password);
    if (!equalPwd) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.prismaService.user.update({
      where: { id },
      data: { password: await hash(updatePwd.new_password, 10) },
      select: {
        id: true,
        username: true,
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
    return this.prismaService.user.create({
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
      throw new NotFoundException('Invalid User');
    }
    const equalPwd = await compare(login.password, user.password);
    if (!equalPwd) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    delete user.password;
    return user;
  }

  //TODO: Update this
  async findByPayload({ username, email }: any): Promise<any> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }

  //! Check if to delete
  private async findUser(login: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username: login }, { email: login }],
      },
    });
  }
}
