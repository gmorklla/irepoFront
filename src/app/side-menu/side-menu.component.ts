import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { sections } from '../shared/config/data.model';
import { EmitterService } from '../shared/services/emitter.service';
import { ErrorSnackService } from '../shared/services/error-snack.service';
import { CheckUserService } from '../shared/services/check-user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  sections = sections;
  notifications = [];
  routes = [
    { name: 'issues', active: false },
    { name: 'reports', active: false },
    { name: 'users', active: false },
  ];
  user;
  message;
  @Output() close = new EventEmitter<any>();

  constructor(
    private router: Router,
    private errorSnack: ErrorSnackService,
    private checkUser: CheckUserService
  ) { }

  ngOnInit() {
    this.checkUser.userS.subscribe(user => {
      if (user) {
        this.user = user;
        this.activateRoutes();
      } else {
        this.deactivateRoutes();
      }
    });
  }

  activateRoutes() {
    this.routes.forEach(route => route.active = true);
  }

  deactivateRoutes() {
    this.routes.forEach(route => route.active = false);
  }

  linkClicked () {
    this.close.emit();
  }

}
