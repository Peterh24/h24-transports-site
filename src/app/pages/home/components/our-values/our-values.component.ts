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
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent('OurValuesComponent');
  }
}
