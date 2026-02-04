import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as fromRoot from '@app/store/';
import * as fromThemes from '@app/store/themes';
import { Observable } from 'rxjs';
import { GlobalService } from '@app/services/global';

@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.component.html',
  styleUrls: ['./prehome.component.scss']
})
export class PrehomeComponent implements OnInit, AfterViewInit {
  menu$: Observable<any>;
  datas$: Observable<any>;
  currentTheme$: Observable<any>;
  loadingState$: Observable<boolean>;
  currentchild: string;
  showOverlay = false;      // Affiche l'overlay si autoplay bloqué
  showUnmuteButton = false; // Bouton pour activer le son

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  constructor(
      private store: Store<fromRoot.State>,
      private globalService: GlobalService,
  ){}

  ngOnInit() {
      this.menu$ = this.store.pipe(select(fromThemes.getThemeNav));
      this.datas$ = this.store.pipe(select(fromThemes.getThemeData));
      this.currentTheme$ = this.store.pipe(select(fromThemes.getCurrentTheme));
      this.loadingState$ = this.store.pipe(select(fromThemes.getLoadingState));
  }

  ngAfterViewInit() {
    const video = this.video.nativeElement;
    video.muted = true;
    this.showUnmuteButton = true;

    setTimeout(() => this.tryPlayVideo(), 500);
  }

  goToTheme(theme:string):void {
    //Add current Theme on store
    this.store.dispatch(new fromThemes.AddCurrentTheme(theme));

    this.store.dispatch(new fromThemes.LoaderStart());
  }

  changePicture(id: string) {
    this.currentchild = id;
  }

  clickContainer (event: any) {
    const phoneButton = document.getElementsByClassName("prehome__header__phone")?.[0];

    if (phoneButton && this.eventIsInside(event, phoneButton)) {
      event.preventDefault();
      event.stopPropagation();
      this.phone();
      return;
    }
  }

  eventIsInside (event: any, div: any) {
    const rect = div.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );
  }

  phone () {
    window.open('tel:+33180275460', '_blank');
  }

  order () {
    document.location.href = "https://dashboard.h24transports.com/";
  }

  private tryPlayVideo() {
    const video = this.video.nativeElement;

    video.muted = false;
    video.play()
      .then(() => {
        console.log('Autoplay réussi avec son');
        this.showOverlay = false;
        this.showUnmuteButton = video.muted; // Affiche bouton son si muted
      })
      .catch(err => {
        video.muted = true;
        video.play()
          .then(() => {
            console.log('Autoplay réussi sans son');
            this.showOverlay = false;
            this.showUnmuteButton = video.muted; // Affiche bouton son si muted
          })
          .catch(err => {
            console.warn('Autoplay bloqué :', err);
            this.showOverlay = true;      // Affiche overlay pour fallback interactif
          });
      });
  }

  startVideo() {
    const video = this.video.nativeElement;
    video.muted = true;
    video.play().catch(err => console.warn(err));
    this.showOverlay = false;
    this.showUnmuteButton = video.muted;
  }

  unmuteVideo() {
    console.log ('Unmute video');
    const video = this.video.nativeElement;
    video.muted = false;
    video.play().catch(err => console.warn(err));
    this.showUnmuteButton = false;
  }
}
