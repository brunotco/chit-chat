import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistrationData } from '@shared/registration-data';
import { LoginData } from '@shared/login-data';
import { JwtPayload } from '@shared/jwt-payload';
import { UsersService } from '@modules/users/users.service';
import { CreateUserDto } from '@shared/dto/create-user.dto';
import { LoginUserDto } from '@shared/dto/login-user.dto';
import { UserDto } from '@shared/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param user The data for the user
   * @returns Result of the registration
   */
  public async register(user: CreateUserDto): Promise<RegistrationData> {
    const userData = await this.usersService.createUser(user);
    return {
      message: 'User Created',
      userData,
    };
  }

  /**
   * Login a user
   * @param login The data for the login
   * @returns Data from the login
   */
  public async login(login: LoginUserDto): Promise<LoginData> {
    const userData = await this.usersService.findByLogin(login);
    // const token = await this._createToken(user);
    return {
      authorization: this.jwtService.sign(userData)
    };
  }

  // private async _createToken(user): Promise<LoginData> {
  //   // const user: JwtPayload = { login };
  //   const authorization = await this.jwtService.sign(user);
  //   return {
  //     authorization,
  //     userData: user,
  //     // expiresIn: process.env.EXPIRESIN,
  //     expiresIn: '60m',
  //   };
  // }

  /**
   * Validate the JWT Token
   * @param payload The JWT payload
   * @returns The user that matchs the one in the payload
   */
  public async validateUser(payload: JwtPayload): Promise<UserDto> {
    return this.usersService.findOne(payload);
  }
}
