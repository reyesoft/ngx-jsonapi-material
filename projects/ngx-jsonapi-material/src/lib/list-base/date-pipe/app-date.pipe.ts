import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'appdate',
    pure: true
})
export class AppDatePipe extends DatePipe implements PipeTransform {
    public transform(value: any): any {
        return super.transform(new Date(value).toISOString(), 'dd/MM/yyyy');
    }
}

@Pipe({
    name: 'appdatetime'
})
export class AppDateTimePipe extends DatePipe implements PipeTransform {
    public transform(value: any): any {
        return super.transform(new Date(value).toISOString(), 'dd/MM/yyyy HH:mm:ss');
    }
}
