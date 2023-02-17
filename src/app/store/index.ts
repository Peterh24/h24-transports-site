
import { ActionReducerMap } from "@ngrx/store";

import * as fromThemes from './themes';
import * as fromDictionaries from './dictionaries';
import * as fromNavigation from "./navigation";
import * as fromLanguage from "./language";

export interface State {
  themes: fromThemes.ThemesState;
  dictionaries: fromDictionaries.DictionariesState;
  navigation: fromNavigation.NavigationState;
  language: fromLanguage.LanguageState;
}

export const reducers: ActionReducerMap<State, null> = {
  themes: fromThemes.reducer,
  dictionaries: fromDictionaries.reducer,
  navigation: fromNavigation.reducer,
  language: fromLanguage.reducer
}

export const effects = [
    fromThemes.ThemesEffects,
    fromDictionaries.DictionariesEffects
]
