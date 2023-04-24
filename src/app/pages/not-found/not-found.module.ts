import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { LogoModule } from "../../shared/layout/logo/logo.module";


@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        LogoModule
    ]
})
export class NotFoundModule { }
