import { createAction, props } from '@ngrx/store';
import { LoginForm } from '@models/login-form.model';
import { AUTH_STATE_NAME } from './auth.selector';
import { User } from '@models/user.model';

export const LOGIN_START = `[${AUTH_STATE_NAME}] login start`;
export const LOGIN_SUCCESS = `[${AUTH_STATE_NAME}] login success`;
export const LOGIN_FAIL = `[${AUTH_STATE_NAME}] login fail`;
export const LOGOUT = `[${AUTH_STATE_NAME}] logout`;

export const loginStart = createAction(
    LOGIN_START,
    props<{loginForm: LoginForm}>()
);

export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{token: string, user: User, redirect: boolean }>()
);

//? This is to delete
export const loginFail = createAction(
    LOGIN_FAIL,
    props<{error: any}>()
);

export const logout = createAction(
    LOGOUT
);