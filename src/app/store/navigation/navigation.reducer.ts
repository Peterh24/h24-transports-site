import { Navigation } from "./navigation.models";
import * as fromAction from './navigation.actions';

export interface NavigationState {
  entities: Navigation;
}

const initialState: NavigationState = {
  entities: null,
}

export function reducer (
  state = initialState,
  action: fromAction.All
) : NavigationState {

  switch(action.type) {

    case fromAction.Types.NAV_OPEN: {
      return {...state, entities: {...state, isNavOpen: true}}
    }

    case fromAction.Types.NAV_CLOSE: {
      return {...state, entities: {...state, isNavOpen: false}}
    }

    case fromAction.Types.NAV_TOGGLE: {
      return {...state, entities: {...state, isNavOpen: !state.entities.isNavOpen}}
    }

    default: {
      return state;
    }
  }

}
