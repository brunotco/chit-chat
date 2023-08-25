import { UserDto } from './dto/user.dto';

export class JwtPayload extends UserDto {
  iat: number;
  exp: number;
}
