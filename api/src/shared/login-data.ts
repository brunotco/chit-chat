import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginData {
  @ApiPropertyOptional()
  authorization: string;
  @ApiPropertyOptional()
  expiresIn?: string;
  @ApiPropertyOptional()
  userData?: UserDto;
}