import { User } from "./user.model";

export interface LoginResponse {
    authorization: string;
    expiresIn: string;
    userData: User
}