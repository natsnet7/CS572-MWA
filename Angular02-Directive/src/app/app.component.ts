import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-list [items]="items"></app-list>
  `
})
export class AppComponent {
  title = 'lab12';
  items = ["Hakuna matata", "It's a wonderful life!"];
}
