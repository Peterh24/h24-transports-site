import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromRoot from '@app/store/';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromThemes from '@app/store/themes';
import { GlobalService } from '@app/services/global';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dictionaries$: Observable<any>;
  currentTheme$: Observable<string>;
  loadingState$: Observable<boolean>;

  constructor(
    public globalService: GlobalService,
    private store: Store<fromRoot.State>,
  ){}

  ngOnInit() {
    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));
    this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));
    this.loadingState$ = this.store.pipe(select(fromThemes.getLoadingState));
  }

}


