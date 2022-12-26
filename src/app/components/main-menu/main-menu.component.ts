import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import * as fromRoot from '@app/store';
import * as fromNavigation from '@app/store/navigation';
import * as fromThemes from '@app/store/themes';
import * as fromDictionaries from '@app/store/dictionaries';
import { GlobalService } from '@app/services/global';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input()test: any;
  menuState$: Observable<boolean>;
  themeList$: Observable<any>;
  currentTheme$: Observable<string>;
  componentList$: Observable<any>;

  faIcons:any = {
    faFacebookF: faFacebookF,
    faInstagram: faInstagram,
    faTwitter: faTwitter,
  }

  constructor(
    private store: Store<fromRoot.State>,
    private globalService: GlobalService,
  ){}

  ngOnInit(): void {
    this.menuState$ = this.store.pipe(select(fromNavigation.getMenuState));
    this.themeList$ = this.store.pipe(select(fromThemes.getThemeNav));
    this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));
    this.componentList$ = this.store.pipe(select(fromDictionaries.getComponentList));

  }

  switchTheme(theme: string){
    this.globalService.currentTheme = theme;
    this.store.dispatch(new fromThemes.LoaderStart());
  }

  goToAnchor(id: string){
    this.closeMenu();
  }

  closeMenu(): void {
    this.store.dispatch(new fromNavigation.NavClose);
  }
}
