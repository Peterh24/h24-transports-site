import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromRoot from '@app/store/';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromThemes from '@app/store/themes';
import { GlobalService } from '@app/services/global';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dictionaries$: Observable<any>;
  currentTheme$: Observable<any>;
  themeName$: Observable<string>;
  isThemeExist$: Observable<string>;
  loadingState$: Observable<boolean>;

  domReady: boolean = false;
  currentTheme: string;
  constructor(
    public globalService: GlobalService,
    private store: Store<fromRoot.State>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit() {
    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));
    this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));
    this.loadingState$ = this.store.pipe(select(fromThemes.getLoadingState));
    this.themeName$ = this.store.pipe(select(fromThemes.getThemeName));

    this.currentTheme$.pipe(take(1)).subscribe(currentTheme => {
      if(currentTheme !== null) {
        if(currentTheme.child !== null){
          this.currentTheme = currentTheme.child;
        } else {
          this.currentTheme = currentTheme.currentTheme;
        }
      }
       else {
          const lastUrlPart = this.router.url.split('?')[0].split('/').pop()
          // Detect if the param exist

          if(lastUrlPart) {
            // Test if the param theme exist in available theme
            this.store.pipe(select(fromThemes.themeExist(lastUrlPart)), take(1)).subscribe(isThemeExist => {
              if(isThemeExist) {
                this.store.dispatch(new fromThemes.AddCurrentTheme(lastUrlPart));
                this.domReady = true;
              } else {
                this.router.navigateByUrl('/');
              }
            })

          } else {
            this.router.navigateByUrl('/');
          }

      }
    })
  }

}


