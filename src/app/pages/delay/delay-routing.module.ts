import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DelayComponent } from './delay.component';

const routes: Routes = [
  {
    path: '',
    component: DelayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelayRoutingModule { }
