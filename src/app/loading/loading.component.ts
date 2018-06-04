import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../shared/services/emitter.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  show = false;

  constructor() { }

  ngOnInit() {
    EmitterService.get('load').subscribe(val => {
      this.show = val;
    });
  }

}
