import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { timer, Subject, takeUntil } from "rxjs";

@Directive({
  selector: '[appAnimatedCounter]'
})
export class AnimatedCounterDirective implements OnInit, OnDestroy {
  @Input('appAnimatedCounter') value: number;
  @Input('appValueUnit') staticText: string;

  @Input() delay: number;
  @Input() speed: number;

  private destroyed$ = new Subject<void>();
  private startingValue: number;
  private unit: string;
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ){
    this.delay = 0;
    this.speed = 8;
    this.startingValue = 0;
  }

  ngOnInit(): void {
    if(this.staticText) {
      this.unit = `<span style="display: inline-block;margin-left: 5px;font-size: 2.2rem;">${this.staticText}</span>`
    } else {
      this.unit = '';
    }
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
          this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.startingValue + this.unit);
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


