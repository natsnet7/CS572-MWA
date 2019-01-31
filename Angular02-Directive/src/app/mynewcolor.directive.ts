import { Directive, HostBinding, HostListener, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[mynewcolor]'
})
export class MynewcolorDirective {
  @HostBinding('style.color') color;
  @Input() mynewcolor;
  @Output() onChangeColor;

  constructor() {
    this.onChangeColor = new EventEmitter();
  }

  @HostListener('click') changeColor() {
    const newColor = this.color === this.mynewcolor ? '#000' : this.mynewcolor;
    this.color = newColor;
    this.onChangeColor.emit(`An element changed its color to ${newColor}`);
  }
}
