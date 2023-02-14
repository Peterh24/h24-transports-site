import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    TextareaComponent
  ],
  imports: [
    CommonModule,
    MatInputModule
  ],
  exports: [
    TextareaComponent
  ]
})
export class TextareaModule { }
