import { TextareaModule } from './textarea/textarea.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldModule } from './form-field/form-field.module';
import { InputModule } from './input/input.module';


@NgModule({
  imports: [
    CommonModule,
    InputModule,
    TextareaModule,
    FormFieldModule
  ],
  exports: [
    InputModule,
    TextareaModule,
    FormFieldModule,
  ]
})
export class ControlsModule { }
