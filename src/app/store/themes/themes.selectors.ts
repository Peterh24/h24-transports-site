import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ThemesState } from "./themes.reducer";



export const getThemesState = createFeatureSelector<ThemesState>('themes');

export const getThemes = createSelector(
  getThemesState,
  (state) => state.entities
);

export const getLoadingState = createSelector(
  getThemesState,
  (state) => state.loading
);

export const getThemeNav = createSelector(
  getThemes,
  (state) => {
      return state.map(elem => {
          return {'id': elem.id, 'title': elem.title}
      })
  }
);

/*Load array of theme data*/
export const getThemeData = createSelector(
  getThemes,
  (state) => {
      return state.map(elem => {
          return {'id': elem.id, 'title': elem.title, 'text': elem.text, 'img': elem.img, 'cta': elem.cta}
      })
  }
);

export const getCurrentTheme = createSelector(
  getThemesState,
  (state) => state.currentTheme
);

export const getCurrentThemeData = createSelector(
  getThemeData,
  getCurrentTheme,
  (theme, item) => {
      return theme.find(elem => elem.id == item)
  }
)


export const themeExist = (params: string) => createSelector(
  getThemes,
  (themes) => {
      return themes.some(theme => theme.id === params);
  }
)

