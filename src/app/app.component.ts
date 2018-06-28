import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WHeightService } from './shared/services/w-height.service';
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
  @ViewChild('container') container: ElementRef;
  showBack = 'inactive';

  constructor(
    private wHeight: WHeightService
  ) { }

  ngOnInit () {
    setTimeout(() => {
      this.wHeight.setHeight(this.container.nativeElement.offsetHeight);
      this.showBack = 'active';
    }, 100);
  }

  closeDrawer () {
    this.sidenav.close();
  }

}
