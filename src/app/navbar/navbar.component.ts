import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<any>();
  @Output() permission = new EventEmitter<any>();
  showSubNav = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  getPermission (allow: boolean) {
    this.showSubNav = false;
    this.permission.emit(allow);
  }

  toggle() {
    this.sideNavToggle.emit();
  }

}
