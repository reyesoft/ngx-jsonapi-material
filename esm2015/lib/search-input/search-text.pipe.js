import { Pipe } from '@angular/core';
export class FilterPipe {
    /**
     *
     * @param items List of items to filter
     * @param term  a string term to compare with every property of the list
     *
     */
    static filter(items, term) {
        const toCompare = term.toLowerCase();
        return items.filter((item) => {
            for (let property in item) {
                if (property !== 'attributes') {
                    continue;
                }
                for (let sub_property in item[property]) {
                    if (!['string', 'number'].includes(typeof item[property][sub_property])) {
                        continue;
                    }
                    if (item[property][sub_property]
                        .toString()
                        .toLowerCase()
                        .includes(toCompare)) {
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
    transform(items, searchText) {
        if (!searchText || !items)
            return items;
        return FilterPipe.filter(items, searchText);
    }
}
FilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'filter'
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXRleHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtdGV4dC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBTXBELE1BQU0sT0FBTyxVQUFVO0lBQ25COzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFpQixFQUFFLElBQVk7UUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXJDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQzlCLEtBQUssSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUN2QixJQUFJLFFBQVEsS0FBSyxZQUFZLEVBQUU7b0JBQzNCLFNBQVM7aUJBQ1o7Z0JBRUQsS0FBSyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTt3QkFDckUsU0FBUztxQkFDWjtvQkFFRCxJQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUM7eUJBQ3ZCLFFBQVEsRUFBRTt5QkFDVixXQUFXLEVBQUU7eUJBQ2IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUMxQjt3QkFDRSxPQUFPLElBQUksQ0FBQztxQkFDZjtpQkFDSjthQUNKO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksU0FBUyxDQUFDLEtBQVUsRUFBRSxVQUFrQjtRQUMzQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXhDLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7O1lBL0NKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsUUFBUTthQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQXJyYXksIGlzT2JqZWN0LCBpc0Z1bmN0aW9uLCBpc1VuZGVmaW5lZCB9IGZyb20gJ3V0aWwnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZpbHRlcidcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW1zIExpc3Qgb2YgaXRlbXMgdG8gZmlsdGVyXG4gICAgICogQHBhcmFtIHRlcm0gIGEgc3RyaW5nIHRlcm0gdG8gY29tcGFyZSB3aXRoIGV2ZXJ5IHByb3BlcnR5IG9mIHRoZSBsaXN0XG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZpbHRlcihpdGVtczogQXJyYXk8YW55PiwgdGVybTogc3RyaW5nKTogQXJyYXk8YW55PiB7XG4gICAgICAgIGNvbnN0IHRvQ29tcGFyZSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3BlcnR5IGluIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgIT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzdWJfcHJvcGVydHkgaW4gaXRlbVtwcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFbJ3N0cmluZycsICdudW1iZXInXS5pbmNsdWRlcyh0eXBlb2YgaXRlbVtwcm9wZXJ0eV1bc3ViX3Byb3BlcnR5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVtwcm9wZXJ0eV1bc3ViX3Byb3BlcnR5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5jbHVkZXModG9Db21wYXJlKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtcyBvYmplY3Qgb3IgcmVzb3VyY2UgZnJvbSBhcnJheVxuICAgICAqIEBwYXJhbSBzZWFyY2hUZXh0IHNlYXJjaCB0ZXJtXG4gICAgICovXG4gICAgcHVibGljIHRyYW5zZm9ybShpdGVtczogYW55LCBzZWFyY2hUZXh0OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAoIXNlYXJjaFRleHQgfHwgIWl0ZW1zKSByZXR1cm4gaXRlbXM7XG5cbiAgICAgICAgcmV0dXJuIEZpbHRlclBpcGUuZmlsdGVyKGl0ZW1zLCBzZWFyY2hUZXh0KTtcbiAgICB9XG59XG4iXX0=