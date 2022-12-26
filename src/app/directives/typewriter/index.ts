import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[typeWritter]'
})
export class TypeWritterDirective implements AfterViewInit{
  private originalText: string;
  private _delay = 70;
  @Input() set delay(value: number) {
    this._delay = value || 70;
  }
  constructor (private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.originalText = this.el.nativeElement.textContent;
    this.el.nativeElement.textContent = "";
    let textLength = 0;
    let interval = setInterval(() => {
    if (textLength < this.originalText.length) {
      textLength++;
      this.el.nativeElement.textContent = this.originalText.substring(0, textLength);
    }
    else {
      clearInterval(interval);
    }
    },this._delay);
  }
}
