import { User } from "@models/user.model";

export interface AuthState {
    token: string | null;
    user: User | null;
}

export const initialState: AuthState = {
    token: null,
    user: null
};