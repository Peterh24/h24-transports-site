
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NavigationState } from "./navigation.reducer";

export const getNavigationState = createFeatureSelector<NavigationState>('navigation');

const getNavigation = createSelector(
  getNavigationState,
  (state) => {
    return state.entities;
  }
)

export const getMenuState = createSelector(
  getNavigation,
  (state) => state.isNavOpen
)

