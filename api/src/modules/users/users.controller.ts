import { Body, Controller, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RegistrationData } from '@shared/registration-data';
import { UpdateUserPasswordDto } from '@shared/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //TODO: Update this
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  //TODO: Update this
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    return this.usersService.getUser(username);
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
    const userData = await this.usersService.updatePassword(
      req.user.id,
      updatePwd,
    );
    return {
      message: 'Password Updated',
      userData,
    };
  }
}
