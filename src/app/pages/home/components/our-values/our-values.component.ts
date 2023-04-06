import { Component } from '@angular/core';
import { OurValues } from '@app/models/backend/components/ourvalues';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-our-values',
  templateUrl: './our-values.component.html',
  styleUrls: ['./our-values.component.scss']
})

export class OurValuesComponent {
  public datas$: Observable<OurValues>;
  public id: string;

  private valueElements: NodeListOf<Element>;

  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }

  ngAfterViewInit() {
    this.valueElements = document.querySelectorAll('.value');
    this.applyTransform();
  }

  applyTransform() {
    this.valueElements.forEach((valueElement) => {
      const contentElement = valueElement.querySelector('.value__content') as HTMLElement;
      const titleElement = valueElement.querySelector('.value__content__title') as HTMLElement;

      const contentHeight = contentElement.getBoundingClientRect().height;
      const titleHeight = titleElement.getBoundingClientRect().height;
      const translateY = contentHeight - titleHeight;

      contentElement.style.transform = `translateY(${translateY}px)`;
    });
  }


  onMouseEnter(event: MouseEvent): void {
    if (event.target instanceof Element) {
      const valueElement = event.target.closest('.value');
      if (valueElement) {
        const contentElement = valueElement.querySelector('.value__content') as HTMLElement;
        contentElement.style.transform = '';
      }
    }
  }

  onMouseLeave(event: MouseEvent): void {
    this.applyTransform();
  }

}
