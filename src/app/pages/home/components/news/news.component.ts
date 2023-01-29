import { Component, OnInit } from '@angular/core';
import { News } from '@app/models/backend/components/news';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

import SwiperCore, { Navigation, Pagination, Autoplay, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public datas$: Observable<News>;
  private id: string;
  public config: SwiperOptions = {
    autoplay: {delay: 6000, pauseOnMouseEnter:true, disableOnInteraction:false},
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.customPagination',
      bulletElement:"div",
      clickable: true
     }
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
