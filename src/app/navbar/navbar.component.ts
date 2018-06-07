import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { sections } from '../shared/config/data.model';
import { Observable, BehaviorSubject } from 'rxjs-compat';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<any>();
  @Output() permission = new EventEmitter<any>();
  showSubNav = false;
  title = '';
  titleIcon = '';

  constructor(
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.title = event.url.split('/')[1] !== '' ? event.url.split('/')[1] : 'Login';
        if (this.title === 'Login') {
          this.titleIcon = '';
        }
        Observable.from(sections)
          .filter(val => val.url === this.title)
          .subscribe(sub => this.titleIcon = sub.icon);
      }
    });
  }

  ngOnInit() {}

  toggle() {
    this.sideNavToggle.emit();
  }

}
