import { createAction, props } from '@ngrx/store';
import { LoginForm } from '@models/login-form.model';
import { LoginResponse } from '@models/login-response.model';
import { AuthState } from './auth.state';
import { AUTH_STATE_NAME } from './auth.selector';

export const LOGIN_START = `[${AUTH_STATE_NAME}] login start`;
export const LOGIN_SUCCESS = `[${AUTH_STATE_NAME}] login success`;
export const LOGIN_FAIL = `[${AUTH_STATE_NAME}] login fail`;
export const LOGOUT = `[${AUTH_STATE_NAME}] logout`;
export const AUTOLOGIN = `[${AUTH_STATE_NAME}] auto login`;
export const AUTOLOGOUT = `[${AUTH_STATE_NAME}] auto logout`;
export const SET_LOGOUT_TIMEOUT = `[${AUTH_STATE_NAME}] set logout timeout`;

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
);

export const autoLogin = createAction(
    AUTOLOGIN,
    props<{data: AuthState, redirect: boolean }>()
);

export const autoLogout = createAction(
    AUTOLOGOUT,
    props<{timeout: number}>()
);

export const setLogoutTimeout = createAction(
    SET_LOGOUT_TIMEOUT,
    props<{timeout: number}>()
);