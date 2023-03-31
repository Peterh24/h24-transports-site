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
          return {'id': elem.id, 'title': elem.title, 'child': elem.child}
      })
  }
);

/*Load array of theme data*/
export const getThemeData = createSelector(
  getThemes,
  (state) => {
      return state.map(elem => {
          return {'id': elem.id, 'title': elem.title, 'text': elem.text, 'img': elem.img, 'cta': elem.cta, 'child': elem.child}
      })
  }
);

export const getCurrentTheme = createSelector(
  getThemesState,
  (state) => {
    return state.currentTheme
  }
);

export const getCurrentThemeData = createSelector(
  getThemeData,
  getCurrentTheme,
  (theme, item) => {
    const foundTheme = theme.find(elem => elem.id == item);
    if (foundTheme) {
      return foundTheme;
    } else {
      // Si le thème n'est pas trouvé, chercher parmi les sous-thèmes
      for (const t of theme) {
        const foundChild = t.child.find(elem => elem.id == item);
        if (foundChild) {
          return foundChild;
        }
      }
      // Si ni le thème ni aucun sous-thème n'a été trouvé, renvoyer null
      return null;
    }
  }
);


export const themeExist = (params: string) => createSelector(
  getThemes,
  (themes) => {
      return themes.some(theme => theme.id === params);
  }
)

