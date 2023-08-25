import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Post, Body } from '@nestjs/common';
import { RegistrationData } from '@shared/registration-data';
import { LoginData } from '@shared/login-data';
import { CreateUserDto } from '@shared/dto/create-user.dto';
import { LoginUserDto } from '@shared/dto/login-user.dto';

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
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ type: RegistrationData })
  public async register(
    @Body() user: CreateUserDto,
  ): Promise<RegistrationData> {
    return this.authService.register(user);
  }

  /**
   * Login a user
   * @param login The data for the login
   * @returns Data from the login
   */
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiCreatedResponse({ type: LoginData })
  public async login(@Body() login: LoginUserDto): Promise<LoginData> {
    return this.authService.login(login);
  }
}
