import { PrismaService } from '@modules/prisma/prisma.service';
import { ConflictException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateUserDto, GetUserDto, LoginUserDto, UpdateUserPasswordDto, UserDto } from '@shared/user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Returns all users
   * @returns Data of all users
   */
  public async findAll(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        active: true,
      },
    });
    // users.forEach((user) => delete user.password);
    return users;
  }

  /**
   * Returns a user
   * @param param0 Search criteria id | username | email
   * @returns Data of the user
   */
  public async findOne({
    id,
    username,
    email,
  }: Partial<GetUserDto>): Promise<UserDto> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ id }, { username }, { email }],
        AND: { active: true },
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        active: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Invalid User');
    }
    return user;
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
  ): Promise<UserDto> {
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
        email: true,
        name: true,
        role: true,
        active: true,
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
  public async createUser(user: CreateUserDto): Promise<UserDto> {
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
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        active: true,
      },
    });
  }

  /**
   * Find a user
   * Check if user exists
   * Check if password match
   * @param login The data for the login
   * @returns Partial user data
   */
  public async findByLogin(login: LoginUserDto): Promise<UserDto> {
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
        active: true,
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
}
