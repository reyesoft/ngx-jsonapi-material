import { Pipe, PipeTransform } from '@angular/core';
import { isArray, isObject, isFunction, isUndefined } from 'util';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    /**
     *
     * @param items List of items to filter
     * @param term  a string term to compare with every property of the list
     *
     */
    public static filter(items: Array<any>, term: string): Array<any> {
        const toCompare = term.toLowerCase();

        return items.filter((item: any) => {
            for (let property in item) {
                if (property !== 'attributes') {
                    continue;
                }

                for (let sub_property in item[property]) {
                    if (!['string', 'number'].includes(typeof item[property][sub_property])) {
                        continue;
                    }

                    if (
                        item[property][sub_property]
                            .toString()
                            .toLowerCase()
                            .includes(toCompare)
                    ) {
                        return true;
                    }
                }
            }

            return false;
        });
    }

    /**
     * @param items object or resource from array
     * @param searchText search term
     */
    public transform(items: any, searchText: string): any {
        if (!searchText || !items) return items;

        return FilterPipe.filter(items, searchText);
    }
}
