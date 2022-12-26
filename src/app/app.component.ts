import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@app/store/';
import * as fromThemes from '@app/store/themes';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'h24 Transports';
  loadingState$: Observable<boolean>;

  constructor(
      private store: Store<fromRoot.State>,
  ){}

  ngOnInit() {
    this.loadingState$ = this.store.pipe(select(fromThemes.getLoadingState));
  }
}

