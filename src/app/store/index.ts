
import { ActionReducerMap } from "@ngrx/store";

import * as fromThemes from './themes';
import * as fromDictionaries from './dictionaries';
import * as fromNavigation from "./navigation";

export interface State {
  themes: fromThemes.ThemesState;
  dictionaries: fromDictionaries.DictionariesState;
  navigation: fromNavigation.NavigationState;
}

export const reducers: ActionReducerMap<State, null> = {
  themes: fromThemes.reducer,
  dictionaries: fromDictionaries.reducer,
  navigation: fromNavigation.reducer
}

export const effects = [
    fromThemes.ThemesEffects,
    fromDictionaries.DictionariesEffects
]
