import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { sections } from '../shared/config/data.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = '';
  titleIcon = '';

  constructor(
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const title = event.url.match(/^\/(\w*)/)[1];
        this.title = title === '' ? 'login' : title;
        const idx = sections.findIndex(val => val.url === this.title);
        this.titleIcon = sections[idx].icon;
      }
    });
  }

}
