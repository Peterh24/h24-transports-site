import { Injectable } from "@angular/core";
import { ClientComponent } from "@app/pages/home/components/client/client.component";
import { ContactComponent } from "@app/pages/home/components/contact/contact.component";
import { KeyDataComponent } from "@app/pages/home/components/key-data/key-data.component";
import { NewsComponent } from "@app/pages/home/components/news/news.component";
import { OurValuesComponent } from "@app/pages/home/components/our-values/our-values.component";
import { OurVehiclesComponent } from "@app/pages/home/components/our-vehicles/our-vehicles.component";
import { TeasingComponent } from "@app/pages/home/components/teasing/teasing.component";
import { TimeLimitComponent } from "@app/pages/home/components/time-limit/time-limit.component";
import { select, Store } from "@ngrx/store";
import { Observable, take } from "rxjs";

import * as fromRoot from '@app/store/';
import * as fromDictionaries from '@app/store/dictionaries';

@Injectable()
export class GlobalService {
  public container: any;
  public flag: boolean = false;
  public currentTheme: string;
  data$: Observable<any>;
  public components = {
    'ContactComponent': ContactComponent,
    'KeyDataComponent': KeyDataComponent,
    'NewsComponent': NewsComponent,
    'OurValuesComponent': OurValuesComponent,
    'OurVehiclesComponent': OurVehiclesComponent,
    'TeasingComponent': TeasingComponent,
    'TimeLimitComponent': TimeLimitComponent,
    'ClientComponent': ClientComponent
  }

  public currentComponents = [ContactComponent, KeyDataComponent];

  public switchComponent(): void {
  }

  constructor(
    private store: Store<fromRoot.State>,
  ){

  }

  getDataComponent(component: string) {
    this.data$ = this.store.pipe(select(fromDictionaries.getComponentData(component)));

    return this.data$.pipe(take(1));
  }

}
