import { InfosImg } from './../../../../models/backend/components/infosimg/index';
import { Component } from '@angular/core';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-infos-img',
  templateUrl: './infos-img.component.html',
  styleUrls: ['./infos-img.component.scss']
})
export class InfosImgComponent {
  public datas$: Observable<InfosImg>;
  public id: string;

  constructor(
    private globalService: GlobalService,
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }
}
