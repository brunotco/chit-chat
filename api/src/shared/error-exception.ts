import { ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorException {
  @ApiPropertyOptional()
  statusCode: number;
  @ApiPropertyOptional()
  message: string | string[];
  @ApiPropertyOptional()
  error?: string;
}
