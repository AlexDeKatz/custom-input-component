import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feetInch'
})
export class FeetInchPipe implements PipeTransform {

  transform(value: any): any {
    const feet = Math.floor(value);
    const inches = Math.round((value - feet) * 12);
    return feet + "'" + inches + '"';
  }

}
