import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  login: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
export class UpdateUserPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  old_password: string;
  @ApiProperty()
  @IsNotEmpty()
  new_password: string;
}
// export class SimpleUserDto {
// }
// export class FullUserDto extends SimpleUserDto {
// }