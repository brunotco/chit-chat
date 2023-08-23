import { Controller, Get, Param, Put, Request, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from './user.dto';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RegistrationData } from '@shared/registration-data';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: Update this
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  //TODO: Update this
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    return this.userService.getUser(username);
  }

  /**
   * Update a user password
   * @param req The data from the request
   * @param updatePwd The data for the password update
   * @returns Result of the registration
   */
  @UseGuards(JwtAuthGuard)
  @Put('update/password')
  public async updatePassword(
    @Request() req,
    @Body() updatePwd: UpdateUserPasswordDto,
  ): Promise<RegistrationData> {
    const userData = await this.userService.updatePassword(
      req.user.id,
      updatePwd,
    );
    return {
      message: 'Password Updated',
      userData,
    };
  }
}
