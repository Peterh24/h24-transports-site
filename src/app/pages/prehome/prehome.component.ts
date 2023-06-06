import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as fromRoot from '@app/store/';
import * as fromThemes from '@app/store/themes';
import { Observable } from 'rxjs';
import { GlobalService } from '@app/services/global';

@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.component.html',
  styleUrls: ['./prehome.component.scss']
})
export class PrehomeComponent implements OnInit {
    menu$: Observable<any>;
    datas$: Observable<any>;
    currentTheme$: Observable<any>;
    loadingState$: Observable<boolean>;
    currentchild: string;
    constructor(
        private store: Store<fromRoot.State>,
        private globalService: GlobalService,
    ){}

    ngOnInit() {
        this.menu$ = this.store.pipe(select(fromThemes.getThemeNav));
        this.datas$ = this.store.pipe(select(fromThemes.getThemeData));
        this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));
        this.loadingState$ = this.store.pipe(select(fromThemes.getLoadingState));
    }

    goToTheme(theme:string):void {
      //Add current Theme on store
      this.store.dispatch(new fromThemes.AddCurrentTheme(theme));

      this.store.dispatch(new fromThemes.LoaderStart());
    }

    changePicture(id: string) {
      this.currentchild = id;
    }
}
