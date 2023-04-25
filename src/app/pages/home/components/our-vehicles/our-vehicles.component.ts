import { Component, ElementRef, ViewChild } from '@angular/core';
import { OurVehicles } from '@app/models/backend/components/ourvehicles';
import { GlobalService } from '@app/services/global';
import { Observable, take } from 'rxjs';
import SwiperCore, { Pagination, Autoplay, EffectFade, SwiperOptions } from 'swiper';

SwiperCore.use([Pagination, Autoplay, EffectFade ]);
let menu:any = [];
let illustrationDOM;

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
    },
    on: {
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
    if(menu[index].illustration){
      const illustration = menu[index].illustration;
      illustrationDOM = new Image();

      illustrationDOM.src = illustration;
      illustrationDOM.style.objectFit = 'cover';
    } else {
      const mp4 = menu[index].video.mp4;
      const ogv = menu[index].video.ogv;
      const webm = menu[index].video.webm;
      const altVideo = menu[index].video.jpg;
      illustrationDOM = document.createElement('video');

      const sourceMp4 = document.createElement('source');
      sourceMp4.src = mp4;
      sourceMp4.type = 'video/mp4';
      illustrationDOM.appendChild(sourceMp4);

      const sourceWebm = document.createElement('source');
      sourceWebm.src = webm;
      sourceWebm.type = 'video/webm';
      illustrationDOM.appendChild(sourceWebm);

      const sourceOgv = document.createElement('source');
      sourceOgv.src = ogv;
      sourceOgv.type = 'video/ogg';
      illustrationDOM.appendChild(sourceOgv);

      illustrationDOM.poster = altVideo;
      illustrationDOM.autoplay = true;
      illustrationDOM.loop = true;
      illustrationDOM.muted = true;
      illustrationDOM.controls = false;
      illustrationDOM.playbackRate = .8;
    }

    /**TODO: Calculate window width and apply different styles for responsive */
    illustrationDOM.style.width = '100%';
    illustrationDOM.style.height = '100%';

    // Remove previous illustration
    while (this.illustrationContainer.nativeElement.firstChild) {
      this.illustrationContainer.nativeElement.removeChild(this.illustrationContainer.nativeElement.firstChild);
    }

    // Add new illustration
    this.illustrationContainer.nativeElement.appendChild(illustrationDOM);
  }
}
