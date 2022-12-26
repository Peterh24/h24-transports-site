import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

// Store
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, effects } from './store';
import * as fromRoot from '@app/store';
import * as fromThemes from '@app/store/themes';
import * as fromNavigation from '@app/store/navigation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictionariesService } from './store/dictionaries/dictionaries.service';
import { HttpClientModule } from '@angular/common/http';
import { ThemesService } from './store/themes/themes.service';
import { GlobalService } from './services/global';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingModule } from './shared/layout/loading/loading.module';

const StoreDevTools: any = !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [];

export function initApplicationFactory(store: Store<fromRoot.State>) {
    return () => new Promise(resolve => {
        store.dispatch(new fromThemes.Read);
        store.dispatch(new fromNavigation.NavClose);
        resolve(true)
    });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    StoreDevTools,
    LoadingModule
  ],
  providers: [
    {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: initApplicationFactory,
        deps: [[new Inject(Store)]]
    },
    ThemesService,
    GlobalService,
    DictionariesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
