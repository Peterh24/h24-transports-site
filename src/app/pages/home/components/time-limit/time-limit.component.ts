import { Component } from '@angular/core';
import { TimeLimit } from '@app/models/backend/components/timelimit';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-time-limit',
  templateUrl: './time-limit.component.html',
  styleUrls: ['./time-limit.component.scss']
})
export class TimeLimitComponent {
  public datas$: Observable<TimeLimit>;
  private id: string;
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }
}
