import { Component } from '@angular/core';
import { Infos } from '@app/models/backend';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent {
  public datas$: Observable<Infos>;
  public id: string;

  constructor(
    private globalService: GlobalService,
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }
}
