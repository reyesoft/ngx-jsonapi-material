import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({
    name: 'appcurrency'
})
export class AppCurrencyPipe implements PipeTransform {
    public transform(
        value: number,
        currencyCode: string = '$',
        currencyId: number = 1,
        // display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol-narrow',
        digitsInfo: string = '1.2-2',
        locale: string = 'en-US'
    ): string | null {
        let currencies_supports = {
            1: '$',
            2: 'US$'
        };
        currencyCode = currencies_supports[currencyId];

        return formatCurrency(value, locale, getCurrencySymbol(currencyCode, 'wide', locale), digitsInfo).replace(/([^\d.,])(\d)/, '$1 $2');
    }
}
