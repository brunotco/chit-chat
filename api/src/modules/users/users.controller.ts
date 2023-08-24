import { Body, Controller, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RegistrationData } from '@shared/registration-data';
import { UpdateUserPasswordDto } from '@shared/user.dto';
import { User } from '@shared/prisma-class/user';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Returns all users
   * @returns Data of all users
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Returns all users' })
  @ApiOkResponse({ type: User, isArray: true })
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //TODO: Update this
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    return this.usersService.findByUsername(username);
  }

  /**
   * Update a user password
   * @param req The data from the request
   * @param updatePwd The data for the password update
   * @returns Result of the registration
   */
  @Put('update/password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user password' })
  @ApiOkResponse({ type: RegistrationData })
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
