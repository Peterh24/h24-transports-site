import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as fromRoot from '@app/store/';
import * as fromThemes from '@app/store/themes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.component.html',
  styleUrls: ['./prehome.component.scss']
})
export class PrehomeComponent implements OnInit, AfterViewInit {
  readonly phoneNumber = '+33180275460';
  readonly phoneDisplay = '01 80 27 54 60';
  readonly orderUrl = 'https://dashboard.h24transports.com/';

  /** Accroches courtes par univers (clé = id du thème). */
  readonly pitches: Record<string, string> = {
    event: 'Audiovisuel, mode & événementiel : du matériel sensible livré avec expertise.',
    express: 'Transport urgent exclusif, ponctuel ou récurrent, partout en France.',
    exploitation: 'Créez, suivez et facturez vos missions en temps réel depuis l’application.',
  };

  datas$: Observable<any>;
  showOverlay = false;      // overlay affiché si l'autoplay est totalement bloqué
  showUnmuteButton = false; // bouton pour réactiver le son

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('servicesSection') servicesSection!: ElementRef<HTMLElement>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.datas$ = this.store.pipe(select(fromThemes.getThemeData));
  }

  ngAfterViewInit(): void {
    const video = this.video.nativeElement;
    video.muted = true;
    this.showUnmuteButton = true;

    setTimeout(() => this.tryPlayVideo(), 500);
  }

  /** Navigue vers l'univers choisi (la transition est gérée par le loader global). */
  goToTheme(theme: string): void {
    this.store.dispatch(new fromThemes.AddCurrentTheme(theme));
    this.store.dispatch(new fromThemes.LoaderStart());
  }

  scrollToServices(): void {
    this.servicesSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  startVideo(): void {
    const video = this.video.nativeElement;
    video.muted = true;
    video.play().catch(() => {});
    this.showOverlay = false;
    this.showUnmuteButton = video.muted;
  }

  unmuteVideo(): void {
    const video = this.video.nativeElement;
    video.muted = false;
    video.play().catch(() => {});
    this.showUnmuteButton = false;
  }

  /**
   * Lecture automatique en 3 paliers : avec son, puis muet (toléré par les
   * navigateurs), puis overlay manuel si tout est bloqué.
   */
  private async tryPlayVideo(): Promise<void> {
    const video = this.video.nativeElement;

    video.muted = false;
    try {
      await video.play();
    } catch {
      video.muted = true;
      try {
        await video.play();
      } catch {
        this.showOverlay = true;
        return;
      }
    }

    this.showOverlay = false;
    this.showUnmuteButton = video.muted; // bouton son visible seulement si la lecture est muette
  }
}
