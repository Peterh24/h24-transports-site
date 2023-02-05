import { Component } from '@angular/core';
import { OurVehicles } from '@app/models/backend/components/ourvehicles';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-our-vehicles',
  templateUrl: './our-vehicles.component.html',
  styleUrls: ['./our-vehicles.component.scss']
})
export class OurVehiclesComponent {
  public datas$: Observable<OurVehicles>;
  public id: string;
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }
}
