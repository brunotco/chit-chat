import { User } from "@prisma/client";

export interface LoginData {
  authorization: string;
  userData?: Partial<User>;
  expiresIn?: string;
}