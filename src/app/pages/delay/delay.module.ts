import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DelayRoutingModule } from './delay-routing.module';
import { DelayComponent } from './delay.component';
import { FooterModule, HeaderModule, MainMenuModule } from '@app/components';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    DelayComponent
  ],
  imports: [
    CommonModule,
    DelayRoutingModule,
    HeaderModule,
    MainMenuModule,
    FooterModule,
    SwiperModule,
  ]
})
export class DelayModule { }
