import { Injectable, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, take } from "rxjs";

import * as fromRoot from '@app/store/';
import * as fromDictionaries from '@app/store/dictionaries';


@Injectable()
export class GlobalService implements OnInit {
  currentTheme$: Observable<any>;
  public container: any;
  public flag: boolean = false;
  data$: Observable<any>;
  currentTheme: string;
  public switchComponent(): void {
  }

  constructor(
    private store: Store<fromRoot.State>,
  ){

  }

  ngOnInit() {

  }

  getDataComponent(componentId: string) {
    this.data$ = this.store.pipe(select(fromDictionaries.getComponentData(componentId)));
    return this.data$.pipe(take(1));
  }

}
