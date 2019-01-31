import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
    <strong>{{ message }}</strong>
    <ul>
      <li
        [myvisibility]=true
        mynewcolor='#dac'
        (onChangeColor)='handleChangeColor($event)'
        *ngFor="let item of items"
      >
        {{ item }}
      </li>
    </ul>
  `
})
export class ListComponent {
  @Input() items: Array<any>;
  private message: string;

  constructor() {
    this.message = 'Click on items';
  }

  handleChangeColor(e) {
    this.message = e;
  }
}
