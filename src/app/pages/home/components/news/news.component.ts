import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { News } from '@app/models/backend/components/news';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade, SwiperOptions } from 'swiper';
import { EventsParams } from 'swiper/angular';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade ]);

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public datas$: Observable<News>;
  public id: string;
  public config: SwiperOptions = {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    loop: true,
    slidesPerView: 1,
    effect: 'fade',
    speed: 1000,
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.customPagination',
      bulletElement:"div",
      clickable: true
     },
  };
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }

  slideNext() {

  }

  slidePrev() {

  }

}
