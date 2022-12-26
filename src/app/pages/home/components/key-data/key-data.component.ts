import { Component, OnInit } from '@angular/core';
import { KeyData } from '@app/models/backend/components/keydata';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-key-data',
  templateUrl: './key-data.component.html',
  styleUrls: ['./key-data.component.scss']
})
export class KeyDataComponent implements OnInit {
  public datas$: Observable<KeyData>;
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent('KeyDataComponent');
  }

  goToAnchor(anchor:any): void {
    console.log('Go to ', anchor)
  }
}
