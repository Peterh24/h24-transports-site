import { ComponentRef, Directive, ElementRef, Input, Renderer2, ViewContainerRef } from "@angular/core";
import { ClientComponent } from "@app/pages/home/components/client/client.component";
import { ContactComponent } from "@app/pages/home/components/contact/contact.component";
import { KeyDataComponent } from "@app/pages/home/components/key-data/key-data.component";
import { NewsComponent } from "@app/pages/home/components/news/news.component";

import { OurVehiclesComponent } from "@app/pages/home/components/our-vehicles/our-vehicles.component";
import { TeasingComponent } from "@app/pages/home/components/teasing/teasing.component";
import { TimeLimitComponent } from "@app/pages/home/components/time-limit/time-limit.component";
import { OurValuesComponent } from "@app/pages/home/components/our-values/our-values.component";
import { InfosComponent } from "@app/pages/home/components/infos/infos.component";
import { InfosImgComponent } from "@app/pages/home/components/infos-img/infos-img.component";
import { SimpleTextComponent } from "@app/pages/home/components/simple-text/simple-text.component";

import { select, Store } from "@ngrx/store";
import { Observable, skip, Subscription } from "rxjs";

import * as fromRoot from '@app/store/';
import * as fromDictionaries from '@app/store/dictionaries';
import { Component } from "@app/models/backend";




@Directive({
  selector: '[appLoader]',
})
export class LoaderDirective {
  @Input() set appLoader(showLoader: boolean) {
    if (showLoader) {
      this.showComponent();
    } else {
      this.showComponent();
    }
  }
  componentList$: Observable<any>;
  private subscription: Subscription;

  private componentsRef = {
    'ContactComponent': ContactComponent,
    'KeyDataComponent': KeyDataComponent,
    'NewsComponent': NewsComponent,
    'OurValuesComponent': OurValuesComponent,
    'OurVehiclesComponent': OurVehiclesComponent,
    'TeasingComponent': TeasingComponent,
    'TimeLimitComponent': TimeLimitComponent,
    'ClientComponent': ClientComponent,
    'InfosComponent': InfosComponent,
    'InfosImgComponent': InfosImgComponent,
    'SimpleTextComponent': SimpleTextComponent,
  }

  private currentComponents:Array<string> = [];

  constructor(
    private store: Store<fromRoot.State>,
    private readonly vcr: ViewContainerRef,
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {

    //When the directive is called create default components
    // this.createComponent();
  }

  private showComponent(): void {
    //remove component List
    this.removeComponent();

    this.createComponent();
    //this.createComponent();
  }

  private removeComponent(): void {
    // Unsubscribe the observable
    if(this.subscription){
      this.subscription.unsubscribe();
      this.currentComponents.map((elem,index) =>{
        this.vcr.remove();
      })
    }
  }

  private createComponent(): void {
    this.store.dispatch(new fromDictionaries.Read);
    this.currentComponents = [];
    this.componentList$ = this.store.pipe(select(fromDictionaries.getComponentList));
    this.subscription = this.componentList$.pipe(skip(1)).subscribe((data:Array<Component>) => {
      data.map((elem: Component, index)=> {
        this.currentComponents.push(elem.component);
        const component = this.vcr.createComponent(this.componentsRef[elem.component as keyof null]) as ComponentRef<any>;
        component.instance.id = elem.id;
      })
    })

  }


}
