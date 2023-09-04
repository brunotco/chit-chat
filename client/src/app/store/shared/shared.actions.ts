import { createAction, props } from '@ngrx/store';
import { SHARED_STATE_NAME } from './shared.selector';

export const SET_LOADING = `[${SHARED_STATE_NAME}] set loading`;

export const setLoading = createAction(
    SET_LOADING,
    props<{status: boolean}>()
);