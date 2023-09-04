import { createAction, props } from '@ngrx/store';
import { LoginForm } from '@models/login-form.model';
import { LoginResponse } from '@models/login-response.model';
import { AuthState } from './auth.state';
import { AUTH_STATE_NAME } from './auth.selector';

export const LOGIN_START = `[${AUTH_STATE_NAME}] login start`;
export const LOGIN_SUCCESS = `[${AUTH_STATE_NAME}] login success`;
export const LOGIN_FAIL = `[${AUTH_STATE_NAME}] login fail`;
export const LOGIN_STORAGE = `[${AUTH_STATE_NAME}] login from storage`;
export const LOGOUT = `[${AUTH_STATE_NAME}] logout`;
export const AUTOLOGIN = `[${AUTH_STATE_NAME}] auto login`;
export const AUTOLOGIN_SUCCESS = `[${AUTH_STATE_NAME}] auto login success`;

export const loginStart = createAction(
    LOGIN_START,
    props<{loginForm: LoginForm}>()
);

export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{loginResponse: LoginResponse, redirect: boolean }>()
);

//? This is to delete
export const loginFail = createAction(
    LOGIN_FAIL,
    props<{error: any}>()
);

export const logout = createAction(
    LOGOUT
)

export const autoLogin = createAction(
    AUTOLOGIN
)

export const autoLoginSuccess = createAction(
    AUTOLOGIN_SUCCESS,
    props<{data: AuthState, redirect: boolean }>()
);