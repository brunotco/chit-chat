import { CreateUserDto, LoginUserDto } from '@modules/user/user.dto';
import { UserService } from '@modules/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(newUser: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Create Success',
    };
    try {
      status.data = await this.userService.createUser(newUser);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUser: LoginUserDto): Promise<any> {
    const user = await this.userService.findByLogin(loginUser);
    // const token = await this._createToken(user);
    return {
      Authorization: this.jwtService.sign(user),
      expiresIn: '60m',
      data: user,
    };
  }

  private async _createToken({ login }): Promise<any> {
    const user: JwtPayload = { login };
    const Authorization = await this.jwtService.sign(user);
    return {
      // expiresIn: process.env.EXPIRESIN,
      expiresIn: '60m',
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}

export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}
