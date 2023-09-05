import { User } from "./user.model";

export interface LoginResponse {
    authorization: string;
    userData: User
}