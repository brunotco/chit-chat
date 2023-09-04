import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import { setLoading } from "./shared.actions";

const _sharedReducer = createReducer(
    initialState,
    on(setLoading, (state, action) => {
        return {
            ... state,
            loading: action.status
        }
    })
);

export function SharedReducer(state: any, action: any) {
    return _sharedReducer(state, action);
}