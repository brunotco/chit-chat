import { Controller } from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '@modules/user/user.dto';
import { Post, Body, HttpException, HttpStatus } from '@nestjs/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() user: CreateUserDto): Promise<any> {
    const result: RegistrationStatus = await this.authService.register(user);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() login: LoginUserDto): Promise<any> {
    return await this.authService.login(login);
  }
}
