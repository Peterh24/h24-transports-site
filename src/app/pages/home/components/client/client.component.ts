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
    private id: string;
    public config: SwiperOptions = {
      autoplay: {delay: 2500, pauseOnMouseEnter:true, disableOnInteraction:false},
      loop: true,
      slidesPerView: 5
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
