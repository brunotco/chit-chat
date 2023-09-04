
import { AuthEffects } from "./auth/auth.effects";
import { AuthReducer } from "./auth/auth.reducer";
import { AUTH_STATE_NAME } from "./auth/auth.selector";
import { AuthState } from "./auth/auth.state";
import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState
    [AUTH_STATE_NAME]: AuthState;
}

export const appReducers = {
    [SHARED_STATE_NAME]: SharedReducer,
    [AUTH_STATE_NAME]: AuthReducer
}

export const appEffects = [
    AuthEffects
]