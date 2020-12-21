import { Pipe, PipeTransform } from '@angular/core';
/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalize
 * Example:
 *  // value.name = daniel San
 *  {{ value.name | capitalize  }}
 *  fromats to: Daniel San
 */
@Pipe({
    name: 'capitalize'
})
export class AppCapitalizePipe implements PipeTransform {
    public transform(value: null | string): string {
        if (value === null) return 'Not assigned';

        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
