import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay, EffectFade, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Autoplay, EffectFade ]);
import * as fromRoot from '@app/store/';
import * as fromThemes from '@app/store/themes';
import * as fromLanguage from '@app/store/language';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent  implements OnInit, OnDestroy{
  themeName$: Observable<string>;
  currentTheme$: Observable<any>;
  lang$: Observable<string>;
  @ViewChild('mapRef', { static: true }) mapRef: ElementRef;
  private locationList: Array<any> = [];
  public locationCurrent: any;
  data: any = {};
  private langSubscription: Subscription;
  public config: SwiperOptions;
  flag:boolean = false;
  constructor(
    private store: Store<fromRoot.State>,
    private http: HttpClient,
    private renderer: Renderer2) {}

    ngOnInit() {
      this.themeName$ = this.store.pipe(select(fromThemes.getThemeName));
      this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));

      // Souscription à l'observateur de la valeur de 'lang' dans le store
      this.lang$ = this.store.pipe(select(fromLanguage.getLanguage));
      this.langSubscription = this.lang$.subscribe(lang => {
        this.http.get("assets/datas/"+ lang +"/db-delay.json").pipe(take(1)).subscribe((data:any) => {
          this.flag = true;
          const menu = data.content;
          this.locationList = data.content;
          this.locationChoice('france');
          this.data = data;
          this.config = {
            slidesPerView: 1,
            initialSlide: 2,
            effect: 'fade',
            speed: 1000,
            fadeEffect: {
              crossFade: true
            },
            pagination: {
              el: '.map__interaction',
              type: 'bullets',
              clickable: true,
              renderBullet: function (index, className) {
                return `
                <div class="${className}">
                  <span class="location">${(menu[index]?.country)}</span>
                  <span class="time">${(menu[index]?.time)}</span>
                </div>
                `
              },
            },
            on: {
              slideChange: (event) => {
                const currentSlide = this.mapRef.nativeElement;
                this.renderer.removeClass(currentSlide, 'timelimit__swipper__wrap-' + menu[event.previousIndex]?.id);
                this.renderer.addClass(currentSlide, 'timelimit__swipper__wrap-' + menu[event.activeIndex]?.id);
              }
            }
          };
        });
      });
    }

    locationChoice(locationId: string): void{
      this.locationList.filter(elem => {
        return elem.id === locationId;
      }).map(elem => {
        this.locationCurrent = elem;
      });
    }

    ngOnDestroy() {
      this.langSubscription.unsubscribe();
    }
}
