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
      },
      {
        path: 'aboutUs',
        loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule),
      },
      {
        path: 'delay',
        loadChildren: () => import('./pages/delay/delay.module').then(m => m.DelayModule),
      },
      {
        path: 'legals',
        loadChildren: () => import('./pages/legals/legals.module').then(m => m.LegalsModule),
      },
      // Ajouter la route 404 en dernière position
      {
        path: '**',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})]
})
export class AppRoutingModule { }
