import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/prehome',
        pathMatch: 'full',
      },
      {
        path: 'prehome',
        loadChildren: () => import('./pages/prehome/prehome.module').then(m => m.PrehomeModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})]
})
export class AppRoutingModule { }
