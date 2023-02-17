import * as fromAction from './language.actions';

export interface LanguageState {
  lang: string;
}

const initialState: LanguageState = {
  lang: 'fr',
}

export function reducer (
  state = initialState,
  action: fromAction.All
) : LanguageState {
  switch(action.type) {

    case fromAction.Types.LANGUAGE_CHANGE: {
      return {...state, lang: action.lang }
    }

    default: {
      return state;
    }
  }
}
