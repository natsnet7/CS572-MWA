import { Directive, OnInit, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[myvisibility]'
})
export class MyvisibilityDirective implements OnInit {
  @HostBinding('style.visibility') visibility;
  @Input() myvisibility;

  ngOnInit() {
    this.visibility = this.myvisibility ? 'visible' : 'hidden';
  }

}
