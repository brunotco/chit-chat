import { Controller, Get, Param, Put, Request, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from './user.dto';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    return this.userService.getUser(username);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/password')
  public async updatePassword(
    @Request() req,
    @Body() updatePwd: UpdateUserPasswordDto,
  ) {
    // console.log(req.user)
    await this.userService.updatePassword(updatePwd, req.user.id);
    return {
      message: 'password_update_success',
    };
  }

  // @Get('me')
  // public async me(@Request() req) {
  //   return new Render
  // }
}
