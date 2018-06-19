import { Component, OnInit, ViewChild } from '@angular/core';
import { animations } from './shared/config/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ animations.back ]
})
export class AppComponent implements OnInit {
  class = '';
  @ViewChild('drawer') sidenav;
  showBack = 'inactive';

  constructor() { }

  ngOnInit () {
    setTimeout(() => this.showBack = 'active', 100);
  }

  closeDrawer () {
    this.sidenav.close();
  }

}
