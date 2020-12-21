import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'appdate'
})
export class AppDatePipe extends DatePipe implements PipeTransform {
    public transform(value: any): any {
        return super.transform(value, 'dd/MM/yyyy');
    }
}

@Pipe({
    name: 'appdatetime'
})
export class AppDateTimePipe extends DatePipe implements PipeTransform {
    public transform(value: any): any {
        return super.transform(value, 'dd/MM/yyyy HH:mm:ss');
    }
}
