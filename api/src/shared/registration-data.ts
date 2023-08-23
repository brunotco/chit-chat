import { User } from '@prisma/client';

export interface RegistrationData {
  message: string;
  userData?: Partial<User>;
}