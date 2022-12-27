import { SmoothScrollDirective } from './../../directives/smooth-scroll/index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { MainMenuComponent } from '@app/components/main-menu/main-menu.component';
import { FooterComponent } from '@app/components/footer/footer.component';
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



@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        MainMenuComponent,
        FooterComponent,
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
        SmoothScrollDirective
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        LayoutModule,
        MatIconModule,
        FontAwesomeModule,
        LoadingModule
    ]
})
export class HomeModule { }
