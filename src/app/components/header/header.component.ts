import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromNavigation from '@app/store/navigation';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuState$: Observable<boolean>;
  constructor(
    private store: Store<fromRoot.State>,
  ){}

  ngOnInit(): void {
    this.menuState$ = this.store.pipe(select(fromNavigation.getMenuState));
  }

  toggleMenu(){
    this.store.dispatch(new fromNavigation.NavToggle);
  }
}
