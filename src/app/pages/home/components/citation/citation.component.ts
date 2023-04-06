import { Component, OnInit } from '@angular/core';
import { Citation } from '@app/models/backend/components/citation';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.component.html',
  styleUrls: ['./citation.component.scss']
})
export class CitationComponent implements OnInit {
  public datas$: Observable<Citation>;
  public id: string;

  constructor(
    private globalService: GlobalService,
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }
}
