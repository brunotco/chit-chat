import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional({ enum: Role })
  role: Role;

  @ApiPropertyOptional()
  active: boolean;
}
