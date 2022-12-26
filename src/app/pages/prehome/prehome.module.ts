import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrehomeRoutingModule } from './prehome-routing.module';
import { PrehomeComponent } from './prehome.component';
import { LoadingModule, LogoModule } from '@app/shared';


@NgModule({
  declarations: [
    PrehomeComponent,
  ],
  imports: [
    CommonModule,
    PrehomeRoutingModule,
    LoadingModule,
    LogoModule
  ]
})
export class PrehomeModule { }
