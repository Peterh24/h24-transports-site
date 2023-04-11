import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import * as fromRoot from '@app/store/';
import * as fromLanguage from '@app/store/language';
import * as fromNavigation from '@app/store/navigation';
import * as fromThemes from '@app/store/themes';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentTheme$: Observable<any>;
  themeList$: Observable<any>;
  datas$: Observable<any>;
  lang$: Observable<any>;
  lastUrlPart: string;
  faIcons:any = {
    faFacebookF: faFacebookF,
    faInstagram: faInstagram,
    faTwitter: faTwitter,
  }
  data: any = [];
  currentYear: number;
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
  ){}

  ngOnInit() {
    this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));
    this.themeList$ = this.store.pipe(select(fromThemes.getThemeNav));
    this.lang$ = this.store.select(fromLanguage.getLanguage);

    this.lastUrlPart = this.router.url.split('?')[0].split('/').pop();


    this.currentTheme$.pipe(take(1)).subscribe(theme => {

      this.store.dispatch(new fromThemes.AddCurrentTheme(this.lastUrlPart.split('#')[0]));

    })
    if(this.lastUrlPart == "aboutUs" || this.lastUrlPart == "delay" || this.lastUrlPart == "legals"){
      this.closeMenu();
    }

    //current years
    this.currentYear = new Date().getFullYear();
  }

  switchTheme(theme: string) {
    this.resetData();
    this.store.dispatch(new fromThemes.AddCurrentTheme(theme));
    this.store.dispatch(new fromThemes.LoaderStart());
  }

  langChange(lang: string): void {
    //delete all data
    this.resetData();

    this.store.dispatch(new fromLanguage.LanguageChange(lang));

    if(this.lastUrlPart != "aboutUs" && this.lastUrlPart != "delay" && this.lastUrlPart != "legals"){
      this.store.dispatch(new fromThemes.LoaderStart());
      this.store.dispatch(new fromThemes.Read());
    }
    this.closeMenu();
  }

  closeMenu(): void {
    this.store.dispatch(new fromNavigation.NavClose);
  }

  resetData(): void {
    this.data = [];
  }
}
