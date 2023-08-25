import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class RegistrationData {
  @ApiPropertyOptional()
  message: string;
  @ApiPropertyOptional()
  userData?: UserDto;
}