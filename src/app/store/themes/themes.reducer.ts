import { Themes } from './themes.models';
import * as fromActions from './themes.actions';


export interface ThemesState {
  entities: Array<Themes>;
  currentTheme: string;
  loading: boolean;
  error: string;
}

const initialState: ThemesState = {
  entities: null,
  currentTheme: null,
  loading: null,
  error: null
}

export function reducer (
  state = initialState,
  action: fromActions.All
) : ThemesState {

  switch(action.type) {

    case fromActions.Types.READ: {
      return {...state, error: null}
    }

    case fromActions.Types.READ_SUCCESS: {
      return {...state, entities: action.themes}
    }

    case fromActions.Types.READ_ERROR: {
      return {...state, entities: null, error: action.error}
    }

    case fromActions.Types.ADD_CURRENT_THEME: {
      return {...state, currentTheme: action.theme}
    }

    case fromActions.Types.LOADER_START: {
      return {...state, loading: true}
    }

    case fromActions.Types.LOADER_STOP: {
      return {...state, loading: false}
    }

    default: {
      return state;
    }
  }

}
