import { ThemesService } from './themes.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as fromRoot from '@app/store/';
import * as fromActions from './themes.actions';
import * as fromThemes from '@app/store/themes';
import { Store } from '@ngrx/store';



@Injectable()
export class ThemesEffects {
  constructor(
    private actions: Actions,
    private themesService: ThemesService,
    private store: Store<fromRoot.State>,
  ) {}

  read$ = createEffect(() => this.actions.pipe(
    ofType(fromActions.Types.READ),
    switchMap(() =>  {
      return this.themesService.getDictionaries().pipe(
        map(data => {
          return new fromActions.ReadSuccess(data);
        }),
        catchError(err => of(new fromActions.ReadError(err)))
      )
    })
  ))
}
