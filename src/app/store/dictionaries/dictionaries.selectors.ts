import { createFeatureSelector, createSelector } from "@ngrx/store";

import { DictionariesState } from './dictionaries.reducer';


export const getDictionariesState = createFeatureSelector<DictionariesState>('dictionaries');

export const getDictionaries = createSelector(
  getDictionariesState,
  (state) => {
    return state.entities
  }
);

export const getComponentList = createSelector(
  getDictionaries,
  (state) => {
    let components:any = [];
    state.map(elem => {
     elem.componentsList.map(elem => {
        components.push(
          {id: elem.id, title:elem.title, component: elem.component}
        )
      })
    })
    return components;
  }
);


export const getComponentData = (componentName: string) => createSelector(
  getDictionaries,
  (state) => {
    let component:any;
    state.map(list => {
      component = list.componentsList.filter(components =>components.component == componentName)
    })

    return component[0].data;
  }
);
