import { Component, OnInit } from '@angular/core';
import { animations } from '../../shared/config/animations';
import { WHeightService } from '../../shared/services/w-height.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ animations.appear ]
})
export class LoginComponent implements OnInit {

  appearIn = 'inactive';
  height = 0;

  constructor(
    private wHeight: WHeightService
  ) { }

  ngOnInit() {
    this.wHeight.wHeight$
      .map(val => !val ? val = 0 : val - 304) // 144
      .subscribe(height => this.height = height);
    setTimeout(() => this.appearIn = 'active', 500);
  }

}
