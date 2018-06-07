import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('back', [
      state('inactive', style({
        opacity: 0,
        transform: 'scale(1.2)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('500ms ease-out')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  class = '';
  @ViewChild('drawer') sidenav;
  showBack = 'inactive';

  constructor(
  ) { }

  ngOnInit () {
    setTimeout(() => this.showBack = 'active', 100);
  }

  closeDrawer () {
    this.sidenav.close();
  }

}
