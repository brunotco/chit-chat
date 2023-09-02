import { createAction, props } from '@ngrx/store';
import { LoginForm } from 'src/app/models/login-form.model';
import { LoginResponse } from 'src/app/models/login-response.model';
import { AuthState } from './auth.state';

const state = 'auth';
export const LOGIN_START = `[${state}] login start`;
export const LOGIN_SUCCESS = `[${state}] login success`;
export const LOGIN_FAIL = `[${state}] login fail`;
export const LOGIN_STORAGE = `[${state}] login from storage`;
export const LOGOUT = `[${state}] logout`;
export const AUTOLOGIN = `[${state}] auto login`;
export const AUTOLOGIN_SUCCESS = `[${state}] auto login success`;

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