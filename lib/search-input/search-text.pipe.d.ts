import { PipeTransform } from '@angular/core';
export declare class FilterPipe implements PipeTransform {
    /**
     *
     * @param items List of items to filter
     * @param term  a string term to compare with every property of the list
     *
     */
    static filter(items: Array<any>, term: string): Array<any>;
    /**
     * @param items object or resource from array
     * @param searchText search term
     */
    transform(items: any, searchText: string): any;
}
