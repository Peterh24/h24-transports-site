import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';


import * as fromRoot from '@app/store';
import * as fromThemes from '@app/store/themes';
import * as fromNavigation from '@app/store/navigation';
import { Router } from '@angular/router';
import { GlobalService } from '@app/services/global';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input() timer: number;
  datas$: Observable<any>;
  currentTheme$: Observable<any>;
  loadingState$: Observable<boolean>;
  localCurrentTheme: string;
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private globalService: GlobalService,
    private renderer: Renderer2,
  ){
    this.timer = 5000;
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'loader-open');
    this.datas$ = this.store.pipe(select(fromThemes.getCurrentThemeData));
    this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));
    this.loadingState$ = this.store.pipe(select(fromThemes.getLoadingState));
    this.globalService.flag = !this.globalService.flag;



    this.currentTheme$.pipe(take(1)).subscribe(
      theme => {
        this.localCurrentTheme = (theme.child || theme.currentTheme);
        let route: string;
        if(!theme.child){
          route = '/home/' + theme.currentTheme;
        } else {
          route = '/home/' + theme.currentTheme + '/' + theme.child
        }
        window.setTimeout(()=>{
          this.router.navigate([route]).then(() => {
            window.setTimeout(()=>{
              this.store.dispatch(new fromThemes.LoaderStop());
            }, this.timer)
          })

          this.store.dispatch(new fromNavigation.NavClose);

        }, 1000)
      }
    )


    // if(this.router.url == '/prehome') {
    //   window.setTimeout(()=>{
    //     this.currentTheme$.pipe(take(1)).subscribe(
    //       theme => {
    //         this.localCurrentTheme = (theme.child || theme.currentTheme);
    //         this.router.navigate(['/home', (theme.child || theme.currentTheme)]).then(() => {
    //           window.setTimeout(()=>{
    //             this.store.dispatch(new fromThemes.LoaderStop());
    //           }, this.timer)
    //         });
    //       }
    //     )
    //   }, 1000)
    // } else {
    //   window.setTimeout(()=>{
    //     this.currentTheme$.pipe(take(1)).subscribe(
    //       theme => {
    //         this.router.navigate(['/home', (theme.child || theme.currentTheme)]).then(() => {
    //           window.setTimeout(()=>{
    //             this.store.dispatch(new fromThemes.LoaderStop());
    //            }, this.timer)
    //         });
    //       }
    //     )

    //     this.store.dispatch(new fromNavigation.NavClose);
    //   }, 1000)
    // }

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'loader-open');
  }
}
