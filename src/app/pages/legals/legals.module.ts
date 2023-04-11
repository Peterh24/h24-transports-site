import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalsRoutingModule } from './legals-routing.module';
import { LegalsComponent } from './legals.component';
import { HeaderModule, FooterModule, MainMenuModule } from '@app/components';


@NgModule({
  declarations: [
    LegalsComponent
  ],
  imports: [
    CommonModule,
    LegalsRoutingModule,
    HeaderModule,
    MainMenuModule,
    FooterModule
  ]
})
export class LegalsModule { }
