import { AuthState } from "./auth.state";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, state => (state.token && state.user) ? true : false);
export const getToken = createSelector(getAuthState, state => state.token);
export const getUser = createSelector(getAuthState, state => state.user);