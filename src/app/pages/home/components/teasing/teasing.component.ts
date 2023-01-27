import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Teasing } from '@app/models/backend/components/teasing';
import { GlobalService } from '@app/services/global';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-teasing',
  templateUrl: './teasing.component.html',
  styleUrls: ['./teasing.component.scss']
})
export class TeasingComponent {
  public datas$: Observable<Teasing>;
  private id: string;
  public iframe: HTMLIFrameElement;

  constructor(
  private globalService: GlobalService,
  private renderer: Renderer2,
  private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
    this.datas$.pipe(take(1)).subscribe(data => {
      if(data.info.videoId || (data.info.videoId && data.info.img)){
      this.iframe = this.renderer.createElement('iframe');
      this.renderer.setAttribute(this.iframe, 'src', `https://www.youtube.com/embed/${data.info.videoId}?controls=0&autoplay=1&mute=1&playsinline=1&playlist=${data.info.videoId}&loop=1`);
      this.renderer.setAttribute(this.iframe, 'frameBorder', '0');
        this.renderer.appendChild(this.el.nativeElement.querySelector('.teasing__background__video'), this.iframe);
      }

    });
  }
}
