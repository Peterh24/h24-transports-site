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
  currentTheme$: Observable<string>;
  isThemeExist$: Observable<string>;
  loadingState$: Observable<boolean>;

  domReady: boolean = false;
  paramMap: string;

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


    this.currentTheme$.pipe(take(1)).subscribe(currenTheme => {
      // si la page a été recharger
      if(!currenTheme) {
        this.activatedRoute.paramMap.subscribe(paramMap => {
          this.paramMap = paramMap.get('theme');
          // Detect if the param exist
          if(this.paramMap) {
            // Test if the param theme exist in available theme
            this.store.pipe(select(fromThemes.themeExist(this.paramMap)), take(1)).subscribe(isThemeExist => {
              if(isThemeExist) {
                this.store.dispatch(new fromThemes.AddCurrentTheme(this.paramMap));
                this.domReady = true;
              } else {
                this.router.navigateByUrl('/');
              }
            })

          } else {
            this.router.navigateByUrl('/');
          }

        })
      }
    })
  }

}


