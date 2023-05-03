import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrehomeRoutingModule } from './prehome-routing.module';
import { PrehomeComponent } from './prehome.component';
import { LoadingModule, LogoModule } from '@app/shared';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    PrehomeComponent,
  ],
  imports: [
    CommonModule,
    PrehomeRoutingModule,
    LoadingModule,
    LogoModule,
    MatIconModule
  ]
})
export class PrehomeModule { }
