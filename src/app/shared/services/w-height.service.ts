import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class WHeightService {

  wHeight$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setHeight (value: number) {
    this.wHeight$.next(value);
  }
}
