import { Dictionaries } from './dictionaries.models';
import * as fromActions from './dictionaries.actions';


export interface DictionariesState {
  entities: Array<Dictionaries>;
  error: string;
}

const initialState: DictionariesState = {
  entities: [],
  error: null
}

export function reducer (
  state = initialState,
  action: fromActions.All
) : DictionariesState {

  switch(action.type) {

    case fromActions.Types.READ: {
      return {...state, error: null}
    }

    case fromActions.Types.READ_SUCCESS: {
      return {...state, entities: action.dictionaries}
    }

    case fromActions.Types.READ_ERROR: {
      return {...state, entities: null, error: action.error}
    }

    default: {
      return state;
    }
  }

}
