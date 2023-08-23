import { CreateUserDto, LoginUserDto } from '@modules/user/user.dto';
import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistrationData } from '@shared/registration-data';
import { LoginData } from '@shared/login-data';
import { JwtPayload } from '@shared/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param user The data for the user
   * @returns Result of the registration
   */
  public async register(user: CreateUserDto): Promise<RegistrationData> {
    const userData = await this.userService.createUser(user);
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
    const userData = await this.userService.findByLogin(login);
    // const token = await this._createToken(user);
    return {
      authorization: this.jwtService.sign(userData),
      userData: userData,
      expiresIn: '60m',
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

  //TODO: Update this
  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid Token');
    }
    return user;
  }
}
