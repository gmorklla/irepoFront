import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'openOrClose'
})
export class OpenOrClosePipe implements PipeTransform {

  transform(value, key: string) {
    if (value && key !== '') {
      return value.filter(item => item.state[key].status);
    } else {
      return value;
    }
  }

}

@Pipe({ name: 'emailF' })
export class EmailF implements PipeTransform {
  transform(value) {
    return value ? value.replace(/@.+/, '') : value;
  }
}

@Pipe({
  name: 'orderBy'
})
export class OrderBy implements PipeTransform {

  transform(value: Array<any>, prop: string): any {
    if (value) {
      prop === 'severity' ? value.sort((a, b) => a[prop] > b[prop] ? 1 : -1) : value.sort((a, b) => a[prop] > b[prop] ? -1 : 1);
      return value;
    } else {
      return value;
    }
  }

}
