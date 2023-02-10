import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    FormFieldComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [
    FormFieldComponent
  ]
})
export class FormFieldModule { }
