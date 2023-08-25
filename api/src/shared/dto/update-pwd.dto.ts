import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePwdDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  old_password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  new_password: string;
}
