import { MainMenuModule } from './../../components/main-menu/main-menu.module';
import { FooterModule } from './../../components/footer/footer.module';
import { ControlsModule } from '@app/shared/controls';
import { SmoothScrollDirective } from './../../directives/smooth-scroll/index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SwiperModule } from 'swiper/angular';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { KeyDataComponent } from './components/key-data/key-data.component';
import { OurValuesComponent } from './components/our-values/our-values.component';
import { TimeLimitComponent } from './components/time-limit/time-limit.component';
import { TeasingComponent } from './components/teasing/teasing.component';
import { OurVehiclesComponent } from './components/our-vehicles/our-vehicles.component';
import { ClientComponent } from './components/client/client.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoaderDirective } from '@app/directives/loader';
import { LayoutModule, LoadingModule } from '@app/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnimatedCounterDirective } from '@app/directives/animated-counter';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@app/shared/buttons';
import { InfosComponent } from './components/infos/infos.component';
import { InfosImgComponent } from './components/infos-img/infos-img.component';
import { HeaderModule } from '@app/components/header/header.module';




@NgModule({
    declarations: [
        HomeComponent,
        KeyDataComponent,
        OurValuesComponent,
        TimeLimitComponent,
        TeasingComponent,
        OurVehiclesComponent,
        ClientComponent,
        NewsComponent,
        ContactComponent,
        LoaderDirective,
        AnimatedCounterDirective,
        SmoothScrollDirective,
        InfosComponent,
        InfosImgComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        LayoutModule,
        MatIconModule,
        FontAwesomeModule,
        LoadingModule,
        SwiperModule,
        ControlsModule,
        ButtonModule,
        FooterModule,
        HeaderModule,
        MainMenuModule
    ]
})
export class HomeModule { }
