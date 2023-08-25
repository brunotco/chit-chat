import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

export class RegistrationData {
  @ApiPropertyOptional()
  message: string;

  @ApiPropertyOptional()
  userData?: UserDto;
}
