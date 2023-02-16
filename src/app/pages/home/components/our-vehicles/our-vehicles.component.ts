import { Component, ElementRef, ViewChild } from '@angular/core';
import { OurVehicles } from '@app/models/backend/components/ourvehicles';
import { GlobalService } from '@app/services/global';
import { Observable, take } from 'rxjs';
import SwiperCore, { Pagination, Autoplay, EffectFade, SwiperOptions } from 'swiper';

SwiperCore.use([Pagination, Autoplay, EffectFade ]);
let menu:any = [];

@Component({
  selector: 'app-our-vehicles',
  templateUrl: './our-vehicles.component.html',
  styleUrls: ['./our-vehicles.component.scss']
})
export class OurVehiclesComponent {
  @ViewChild('illustrationContainer', { static: true }) illustrationContainer: ElementRef;
  public datas$: Observable<OurVehicles>;
  public id: string;
  public config: SwiperOptions = {
    slidesPerView: 1,
    effect: 'fade',
    speed: 1000,
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.vehicle__interaction',
      type: 'bullets',
      clickable: true,
      renderBullet: function (index, className) {
        return `
        <button type="button" class="${className}">
          ${(menu[index].title)}
        </button>
        `
      },
    },on: {
      slideChange: (event) => {
        this.updateIllustration(event.activeIndex);
      }
    }
  };
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
    this.datas$.pipe(take(1)).subscribe(vehicle => {
      menu = vehicle.list;
    })
    this.updateIllustration(0);
  }

  updateIllustration(index: number) {
    const illustration = menu[index].illustration;
    const img = new Image();
    /**TODO: Calculate window width and apply different styles for responsive */
    img.src = illustration;
    img.style
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';

    // Remove previous illustration
    while (this.illustrationContainer.nativeElement.firstChild) {
      this.illustrationContainer.nativeElement.removeChild(this.illustrationContainer.nativeElement.firstChild);
    }

    // Add new illustration
    this.illustrationContainer.nativeElement.appendChild(img);
  }
}
