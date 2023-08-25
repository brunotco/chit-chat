import { UserDto } from './user.dto';

export class JwtPayload extends UserDto {
  iat: number;
  exp: number;
}
