import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '@modules/user/user.dto';
import { Post, Body } from '@nestjs/common';
import { RegistrationData } from '@shared/registration-data';
import { LoginData } from '@shared/login-data';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user
   * @param user The data for the user
   * @returns Result of the registration
   */
  @Post('register')
  public async register(
    @Body() user: CreateUserDto,
  ): Promise<RegistrationData> {
    return await this.authService.register(user);
  }

  /**
   * Login a user
   * @param login The data for the login
   * @returns Data from the login
   */
  @Post('login')
  public async login(@Body() login: LoginUserDto): Promise<LoginData> {
    return await this.authService.login(login);
  }
}
