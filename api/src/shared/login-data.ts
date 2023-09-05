import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginData {
  @ApiPropertyOptional()
  authorization: string;
}
