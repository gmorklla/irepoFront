import { Component, OnInit } from '@angular/core';
import { animations } from '../../shared/config/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ animations.appear ]
})
export class LoginComponent implements OnInit {

  appearIn = 'inactive';

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.appearIn = 'active', 500);
  }

}
