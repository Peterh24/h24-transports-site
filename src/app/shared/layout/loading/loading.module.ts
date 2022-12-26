import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { LoaderModule } from '../loader/loader.module';
import { TypeWritterDirective } from '@app/directives/typewriter';



@NgModule({
  declarations: [
    LoadingComponent,
    TypeWritterDirective
  ],
  imports: [
    CommonModule,
    LoaderModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule { }
