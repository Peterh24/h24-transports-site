  import { Component, OnInit, AfterViewInit } from '@angular/core';
  import { Client } from '@app/models/backend/components/client';
  import { GlobalService } from '@app/services/global';
  import { Observable } from 'rxjs';

  import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

  SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);


  @Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
  })
  export class ClientComponent implements OnInit, AfterViewInit {
    public datas$: Observable<Client>;
    private id: string;
    constructor(
      private globalService: GlobalService,
    ) {}

    ngOnInit(): void {
      this.datas$ = this.globalService.getDataComponent(this.id);

    }

    ngAfterViewInit(): void {
      SwiperCore.use([]);
    }

    onSlideChange() {
      console.log('slide change');
    }
  }
