import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccess, logout } from "./auth.actions";

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ... state,
            token: action.loginResponse.authorization,
            user: action.loginResponse.userData
        }
    }),
    on(logout, (state) => {
        return {
            ... state,
            token: null,
            user: null
        }
    })
);

export function AuthReducer(state: any, action: any) {
    return _authReducer(state, action);
}