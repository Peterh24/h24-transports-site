import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { timer, Subject, takeUntil } from "rxjs";

@Directive({
  selector: '[appAnimatedCounter]'
})
export class AnimatedCounterDirective {
  @Input('appAnimatedCounter') value: number;
  @Input() delay: number;
  @Input() speed: number;

  staticText: string;

  private destroyed$ = new Subject<void>();
  private startingValue: number;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ){
    this.delay = 0;
    this.speed = 8;
    this.startingValue = 0;
  }

  ngOnInit(): void {

    timer(this.delay || 0).pipe(takeUntil(this.destroyed$)).subscribe({
      complete: () => {
        return this.animate()
      }
    });
  }

  private animate(): void {
    if(this.value) {
      const start = () => {
        if(this.startingValue < this.value){
          this.startingValue++;
          this.renderer.setProperty(this.el.nativeElement, 'textContent', this.startingValue);
          setTimeout(start, this.speed)
        }
      };

      start();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}


