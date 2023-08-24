import { ApiProperty } from '@nestjs/swagger';
import { User } from '@shared/prisma-class/user';

export class RegistrationData {
  @ApiProperty()
  message: string;
  @ApiProperty()
  userData?: Partial<User>;
}