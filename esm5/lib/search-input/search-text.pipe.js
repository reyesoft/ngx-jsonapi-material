import { Pipe } from '@angular/core';
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    /**
     *
     * @param items List of items to filter
     * @param term  a string term to compare with every property of the list
     *
     */
    FilterPipe.filter = function (items, term) {
        var toCompare = term.toLowerCase();
        return items.filter(function (item) {
            for (var property in item) {
                if (property !== 'attributes') {
                    continue;
                }
                for (var sub_property in item[property]) {
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
    };
    /**
     * @param items object or resource from array
     * @param searchText search term
     */
    FilterPipe.prototype.transform = function (items, searchText) {
        if (!searchText || !items)
            return items;
        return FilterPipe.filter(items, searchText);
    };
    FilterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'filter'
                },] },
    ];
    return FilterPipe;
}());
export { FilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXRleHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtdGV4dC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFnREEsQ0FBQztJQTVDRzs7Ozs7T0FLRztJQUNXLGlCQUFNLEdBQXBCLFVBQXFCLEtBQWlCLEVBQUUsSUFBWTtRQUNoRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBUztZQUMxQixLQUFLLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDdkIsSUFBSSxRQUFRLEtBQUssWUFBWSxFQUFFO29CQUMzQixTQUFTO2lCQUNaO2dCQUVELEtBQUssSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUU7d0JBQ3JFLFNBQVM7cUJBQ1o7b0JBRUQsSUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDO3lCQUN2QixRQUFRLEVBQUU7eUJBQ1YsV0FBVyxFQUFFO3lCQUNiLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDMUI7d0JBQ0UsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0o7YUFDSjtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDhCQUFTLEdBQWhCLFVBQWlCLEtBQVUsRUFBRSxVQUFrQjtRQUMzQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXhDLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Z0JBL0NKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsUUFBUTtpQkFDakI7O0lBOENELGlCQUFDO0NBQUEsQUFoREQsSUFnREM7U0E3Q1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQXJyYXksIGlzT2JqZWN0LCBpc0Z1bmN0aW9uLCBpc1VuZGVmaW5lZCB9IGZyb20gJ3V0aWwnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZpbHRlcidcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW1zIExpc3Qgb2YgaXRlbXMgdG8gZmlsdGVyXG4gICAgICogQHBhcmFtIHRlcm0gIGEgc3RyaW5nIHRlcm0gdG8gY29tcGFyZSB3aXRoIGV2ZXJ5IHByb3BlcnR5IG9mIHRoZSBsaXN0XG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZpbHRlcihpdGVtczogQXJyYXk8YW55PiwgdGVybTogc3RyaW5nKTogQXJyYXk8YW55PiB7XG4gICAgICAgIGNvbnN0IHRvQ29tcGFyZSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3BlcnR5IGluIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgIT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzdWJfcHJvcGVydHkgaW4gaXRlbVtwcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFbJ3N0cmluZycsICdudW1iZXInXS5pbmNsdWRlcyh0eXBlb2YgaXRlbVtwcm9wZXJ0eV1bc3ViX3Byb3BlcnR5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVtwcm9wZXJ0eV1bc3ViX3Byb3BlcnR5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5jbHVkZXModG9Db21wYXJlKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpdGVtcyBvYmplY3Qgb3IgcmVzb3VyY2UgZnJvbSBhcnJheVxuICAgICAqIEBwYXJhbSBzZWFyY2hUZXh0IHNlYXJjaCB0ZXJtXG4gICAgICovXG4gICAgcHVibGljIHRyYW5zZm9ybShpdGVtczogYW55LCBzZWFyY2hUZXh0OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAoIXNlYXJjaFRleHQgfHwgIWl0ZW1zKSByZXR1cm4gaXRlbXM7XG5cbiAgICAgICAgcmV0dXJuIEZpbHRlclBpcGUuZmlsdGVyKGl0ZW1zLCBzZWFyY2hUZXh0KTtcbiAgICB9XG59XG4iXX0=