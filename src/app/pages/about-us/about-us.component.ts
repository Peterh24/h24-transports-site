import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';

import * as fromRoot from '@app/store/';
import * as fromThemes from '@app/store/themes';
import * as fromLanguage from '@app/store/language';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {
  themeName$: Observable<string>;
  currentTheme$: Observable<any>;
  lang$: Observable<string>;

  data: any = {};
  private langSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private http: HttpClient) {}

  ngOnInit() {
    this.themeName$ = this.store.pipe(select(fromThemes.getThemeName));
    this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));

    // Souscription à l'observateur de la valeur de 'lang' dans le store
    this.lang$ = this.store.pipe(select(fromLanguage.getLanguage));
    this.langSubscription = this.lang$.subscribe(lang => {
      this.http.get("assets/datas/"+ lang +"/db-aboutUs.json").pipe(take(1)).subscribe(data => {
        this.data = data;
      })
    });
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }
}
