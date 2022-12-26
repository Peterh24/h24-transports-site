import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrehomeComponent } from './prehome.component';

const routes: Routes = [
  {
    path: '',
    component: PrehomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrehomeRoutingModule { }
