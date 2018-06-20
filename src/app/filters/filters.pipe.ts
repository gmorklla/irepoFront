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
