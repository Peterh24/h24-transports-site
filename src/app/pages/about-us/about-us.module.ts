import { FooterModule } from './../../components/footer/footer.module';
import { MainMenuModule } from './../../components/main-menu/main-menu.module';
import { HeaderModule } from './../../components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    HeaderModule,
    MainMenuModule,
    FooterModule
  ]
})
export class AboutUsModule { }
