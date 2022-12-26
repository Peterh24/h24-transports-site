import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@app/store/';
import * as fromThemes from '@app/store/themes';
import { style, transition, trigger, animate } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger("inOutAnimation", [
      transition(":leave", [
        style({ opacity: 1 }),
        animate(
          "600ms ease-in-out",
          style({ opacity: 0 })
        )
      ])
    ])
  ]
})
export class AppComponent implements OnInit  {
  loadingState$: Observable<boolean>;

  constructor(
      private store: Store<fromRoot.State>,
  ){}

  ngOnInit() {
    this.loadingState$ = this.store.pipe(select(fromThemes.getLoadingState));
  }
}

