import { ApiProperty } from '@nestjs/swagger';
import { User } from '@shared/prisma-class/user';

export class LoginData {
  @ApiProperty()
  authorization: string;
  @ApiProperty()
  expiresIn?: string;
  @ApiProperty()
  userData?: Partial<User>;
}