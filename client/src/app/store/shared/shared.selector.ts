import { SharedState } from "./shared.state";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, state => state.loading);