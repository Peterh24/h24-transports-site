import { Component, OnInit } from '@angular/core';
import { KeyData } from '@app/models/backend/components/keydata';
import { GlobalService } from '@app/services/global';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@app/store/';
import * as fromThemes from '@app/store/themes';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-key-data',
  templateUrl: './key-data.component.html',
  styleUrls: ['./key-data.component.scss']
})
export class KeyDataComponent implements OnInit {
  public datas$: Observable<KeyData>;
  public id: string;
  constructor(
    private globalService: GlobalService,
    private store: Store<fromRoot.State>,
    private viewportScroller: ViewportScroller,
    private router: Router,
  ) {}
  loadingState$: Observable<boolean>;
  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
    this.loadingState$ = this.store.pipe(select(fromThemes.getLoadingState));
  }

  goToAnchor(anchor:any): void {
    this.viewportScroller.scrollToAnchor(anchor);
    this.router.navigate([], { fragment: anchor });
  }
}
