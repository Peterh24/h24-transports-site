import { createFeatureSelector, createSelector } from "@ngrx/store";

import { LanguageState } from './language.reducer';


export const getLanguageState = createFeatureSelector<LanguageState>('language');

export const getLanguage = createSelector(
  getLanguageState,
  (state) => {
    return state.lang
  }
);
