import { Component } from '@angular/core';
import { Teasing } from '@app/models/backend/components/teasing';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teasing',
  templateUrl: './teasing.component.html',
  styleUrls: ['./teasing.component.scss']
})
export class TeasingComponent {
  public datas$: Observable<Teasing>;
  private id: string;
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }
}
