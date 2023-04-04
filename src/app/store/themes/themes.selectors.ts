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
          return {'id': elem.id, 'title': elem.title, 'inPrenav': elem.inPrenav, 'child': elem.child}
      })
  }
);

/*Load array of theme data*/
export const getThemeData = createSelector(
  getThemes,
  (state) => {
    return state.map(elem => {
      if (elem.inPrenav) {
        return {'id': elem.id, 'title': elem.title, 'text': elem.text, 'img': elem.img, 'cta': elem.cta, 'inPrenav': elem.inPrenav, 'child': elem.child};
      } else {
        return null; // Ignore elements that don't meet the condition
      }
    }).filter(Boolean); // Filter out null elements
  }
);




export const getThemeName = createSelector(
  getThemesState,
  (state) => {
    return state.currentTheme
  }
);


export const getCurrentTheme = createSelector(
  getThemesState,
  (state) => {
    const currentTheme = state.currentTheme;
    let child = null;

    // Vérifier si state.entities est null
    if (!state.entities) {
      return null;
    }

    // On parcourt les entités pour vérifier si le nom de thème donné est un enfant
    for (let i = 0; i < state.entities.length; i++) {
      const entity = state.entities[i];

      // Si le nom de thème donné correspond à une entité, alors c'est le thème courant
      if (entity.id === currentTheme) {
        return { currentTheme: currentTheme, child: null };
      }

      // Si le nom de thème donné correspond à un enfant, alors on retourne l'objet correspondant
      for (let j = 0; j < entity.child.length; j++) {
        const childEntity = entity.child[j];
        if (childEntity.id === currentTheme) {
          child = childEntity.id;
          return { currentTheme: entity.id, child: child };
        }
      }
    }

    // Si le nom de thème donné ne correspond à aucun thème ou enfant, on retourne null
    return null;
  }
);

export const getCurrentThemeData = createSelector(
  getThemeData,
  getCurrentTheme,
  (theme, item) => {
    const foundTheme = theme.find(elem => elem.id == (item.child || item.currentTheme));
    if (foundTheme) {
      return foundTheme;
    } else {
      // Si le thème n'est pas trouvé, chercher parmi les sous-thèmes
      for (const t of theme) {
        const foundChild = t.child.find(elem => elem.id == (item.child || item.currentTheme));
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
      return themes.some(theme => {
          if (theme.id === params) {
              return true;
          } else if (theme.child) {
              if (Array.isArray(theme.child)) {
                  return theme.child.some(child => child.id === params);
              }
          }
          return false;
      });
  }
);

