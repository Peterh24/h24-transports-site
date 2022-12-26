import { DictionariesService } from './dictionaries.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';

import * as fromRoot from '@app/store/';
import * as fromActions from './dictionaries.actions';
import * as fromThemes from '@app/store/themes';
import { Router } from '@angular/router';



@Injectable()
export class DictionariesEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private dictionariesService: DictionariesService,
    private store: Store<fromRoot.State>,
  ) {}

  read$ = createEffect(() => this.actions.pipe(
    ofType(fromActions.Types.READ),
    withLatestFrom(this.store.select(fromThemes.getCurrentTheme)),
    switchMap((theme) =>  {
      let currentTheme = theme[1];
      if(!currentTheme){
        this.router.navigateByUrl('/');
        return [];
      } else {
        return this.dictionariesService.getDictionaries(currentTheme).pipe(
          map(data => {
            return new fromActions.ReadSuccess([data]);
          }),
          catchError(err => of(new fromActions.ReadError(err)))
        )
      }
    })
  ))



  //GET FULL THEME
  // read$ = createEffect(() => this.actions.pipe(
  //   ofType(fromActions.Types.READ),
  //   switchMap(() =>  {
  //       return forkJoin(
  //           {
  //               event: this.dictionariesService.getDictionaries('event'),
  //               express: this.dictionariesService.getDictionaries('express'),
  //               application: this.dictionariesService.getDictionaries('application'),
  //           }
  //       ).pipe(
  //           map(data => {
  //               return new fromActions.ReadSuccess(data);
  //             }),
  //             catchError(err => of(new fromActions.ReadError(err)))
  //       )
  //   })
  // ))
}


