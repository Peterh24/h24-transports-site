  import { Component, OnInit, AfterViewInit } from '@angular/core';
  import { Client } from '@app/models/backend/components/client';
  import { GlobalService } from '@app/services/global';
  import { Observable } from 'rxjs';

  import SwiperCore, { Autoplay, SwiperOptions } from 'swiper';

  SwiperCore.use([Autoplay]);


  @Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
  })
  export class ClientComponent implements OnInit, AfterViewInit {
    public datas$: Observable<Client>;
    public id: string;
    public config: SwiperOptions = {
      autoplay: {delay: 2500, pauseOnMouseEnter:true, disableOnInteraction:false},
      loop: true,
      spaceBetween: 80,
      slidesPerView: 5,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        // when window width is >= 640px
        640: {
          spaceBetween: 80,
          slidesPerView: 5
        }
      }
    };
    constructor(
      private globalService: GlobalService,
    ) {}

    ngOnInit(): void {
      this.datas$ = this.globalService.getDataComponent(this.id);
    }

    ngAfterViewInit(): void {
      SwiperCore.use([]);
    }
  }
