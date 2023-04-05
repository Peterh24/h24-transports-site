import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import * as fromRoot from '@app/store';
import * as fromNavigation from '@app/store/navigation';
import * as fromThemes from '@app/store/themes';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromLanguage from '@app/store/language';
import { GlobalService } from '@app/services/global';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input()test: any;
  menuState$: Observable<boolean>;
  themeList$: Observable<any>;
  currentTheme$: Observable<any>;
  componentList$: Observable<any>;

  lastUrlPart: string;
  faIcons:any = {
    faFacebookF: faFacebookF,
    faInstagram: faInstagram,
    faTwitter: faTwitter,
  }

  constructor(
    private store: Store<fromRoot.State>,
    private globalService: GlobalService,
    private viewportScroller: ViewportScroller,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.menuState$ = this.store.pipe(select(fromNavigation.getMenuState));
    this.themeList$ = this.store.pipe(select(fromThemes.getThemeNav));
    this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));
    this.componentList$ = this.store.pipe(select(fromDictionaries.getComponentList));

    this.lastUrlPart = this.router.url.split('?')[0].split('/').pop();

    this.currentTheme$.pipe(take(1)).subscribe(theme => {

      this.store.dispatch(new fromThemes.AddCurrentTheme(this.lastUrlPart));

    })
    if(this.lastUrlPart == "aboutUs" || this.lastUrlPart == "delay"){
      this.closeMenu();
    }
  }

  switchTheme(theme: string){
    this.store.dispatch(new fromThemes.AddCurrentTheme(theme));
    this.store.dispatch(new fromThemes.LoaderStart());
  }

  goToAnchor(id: string){
    this.viewportScroller.scrollToAnchor(id);
    this.router.navigate([], { fragment: id });
    this.closeMenu();
  }

  closeMenu(): void {
    this.store.dispatch(new fromNavigation.NavClose);
  }

  langChange(lang: string): void {


    this.store.dispatch(new fromLanguage.LanguageChange(lang));

    if(this.lastUrlPart != "aboutUs" && this.lastUrlPart != "delay"){
      this.store.dispatch(new fromThemes.LoaderStart());
      this.store.dispatch(new fromThemes.Read());
    }
    this.closeMenu();
  }
}
