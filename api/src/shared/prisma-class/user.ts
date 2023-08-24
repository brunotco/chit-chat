import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role = Role.USER;

  @ApiProperty({ type: Boolean })
  active: boolean = true;

  @ApiProperty({ type: Date })
  created: Date;

  @ApiProperty({ type: Date })
  updated: Date;
}
