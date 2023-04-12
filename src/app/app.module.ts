import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

// Store
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, effects } from './store';
import * as fromRoot from '@app/store';
import * as fromThemes from '@app/store/themes';
import * as fromNavigation from '@app/store/navigation';
import * as fromLanguage from '@app/store/language';

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

export function initExploitationFactory(store: Store<fromRoot.State>) {
  const defaultLanguage = navigator.language.split('-')[0];
    return () => new Promise(resolve => {
        store.dispatch(new fromThemes.Read);
        store.dispatch(new fromNavigation.NavClose);
        store.dispatch(new fromLanguage.LanguageChange(defaultLanguage));
        resolve(true)
    });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    LoadingModule,
  ],
  providers: [
    {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: initExploitationFactory,
        deps: [[new Inject(Store)]]
    },
    ThemesService,
    GlobalService,
    DictionariesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
