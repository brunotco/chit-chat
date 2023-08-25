import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RegistrationData } from '@shared/registration-data';
import { GetUserDto, UpdateUserPasswordDto, UserDto } from '@shared/user.dto';

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
  @ApiOkResponse({ type: UserDto, isArray: true })
  public async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  /**
   * Returns a user
   * @param userDetails Search criteria id | username | email
   * @returns Data of the user
   */
  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Returns a user' })
  @ApiOkResponse({ type: UserDto })
  public async findOne(@Body() userDetails: GetUserDto): Promise<UserDto> {
    return this.usersService.findOne(userDetails);
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
