import { MainMenuComponent } from '@app/components/main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoModule } from '@app/shared';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    MatIconModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    MainMenuComponent
  ]
})
export class MainMenuModule { }
