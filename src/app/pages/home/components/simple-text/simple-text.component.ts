import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleText } from '@app/models/backend/components/simpletext';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-simple-text',
  templateUrl: './simple-text.component.html',
  styleUrls: ['./simple-text.component.scss']
})
export class SimpleTextComponent implements OnInit {
  public datas$: Observable<SimpleText>;
  public id: string;

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
  }

  goTo (link: string) {
    if (link?.startsWith ("http")) {
      document.location.href = link;
    } else {
      this.router.navigateByUrl (link);
    }
  }
}
