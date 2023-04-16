import { DictionariesService } from './dictionaries.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';

import * as fromRoot from '@app/store/';
import * as fromActions from './dictionaries.actions';
import * as fromThemes from '@app/store/themes';
import * as fromLanguage from '@app/store/language';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';



@Injectable()
export class DictionariesEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private dictionariesService: DictionariesService,
    private metaService: Meta,
    private store: Store<fromRoot.State>,
  ) {}

  read$ = createEffect(() => this.actions.pipe(
    ofType(fromActions.Types.READ),
    withLatestFrom(
      this.store.select(fromThemes.getCurrentTheme),
      this.store.select(fromLanguage.getLanguage)
    ),
    switchMap(([action, currentTheme, currentlang]) => {
      if (!currentTheme) {
        return [];
      } else {
        return this.dictionariesService.getDictionaries(((currentTheme.child && currentTheme.child.id) || currentTheme.currentTheme), currentlang).pipe(
          map(data => {
            let description = currentTheme.child ? currentTheme.child.meta.description : currentTheme.meta.description;
            let keywords = currentTheme.child ? currentTheme.child.meta.keywords: currentTheme.meta.keywords;
            this.metaService.updateTag({ name: 'description', content: description });
            this.metaService.updateTag({ name: 'keywords', content: keywords });

            return new fromActions.ReadSuccess([data]);
          }),
          catchError(err => of(new fromActions.ReadError(err)))
        );
      }
    })
  ));
}


