// tslint:disable: rxjs-no-wholesale rxjs-deep-operators
import { map, concatMap, startWith, filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
export function batchAll(service, params) {
    return service.all(params).pipe(concatMap(function (collection) {
        if (collection.data.length < params.page.size) {
            return of(collection);
        }
        params.page.number += 1;
        return batchAll(service, params).pipe(startWith(collection));
    }));
}
export var filterOrRequest = function (params) {
    return pipe(startWith(''), debounceTime(400), filter(function (filterValue) { return typeof filterValue === 'string'; }), switchMap(function (filterValue) {
        if (filterValue.includes(params.last_filter_value) && params.collection.data.length < params.page_size) {
            return of(params.resourcesArray.filter(function (resource) {
                return resource.attributes[params.attribute_to_search].toLowerCase().indexOf(filterValue) >= 0;
            }));
        }
        return params
            .getAllFc(filterValue)
            .pipe(catchError(function () { return []; })).pipe(map(function (collection) {
            params.collection = collection;
            params.resourcesArray = collection.data;
            params.last_filter_value = filterValue;
            return params.resourcesArray;
        }));
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmF0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9iYXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3REFBd0Q7QUFFeEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFHLE1BQU0sRUFBRyxTQUFTLEVBQVUsWUFBWSxFQUFHLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ILE9BQU8sRUFBZSxJQUFJLEVBQUcsRUFBRSxFQUFrQixNQUFNLE1BQU0sQ0FBQztBQU05RCxNQUFNLFVBQVUsUUFBUSxDQUEyQyxPQUFVLEVBQUUsTUFBeUI7SUFDcEcsT0FBMEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsVUFBVTtRQUNuRixJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzNDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBRXhCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUM7QUFFRCxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsVUFBcUIsTUFPbkQ7SUFDRyxPQUFBLElBQUksQ0FDQSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQ2IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixNQUFNLENBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQS9CLENBQStCLENBQUMsRUFDdEQsU0FBUyxDQUFDLFVBQUMsV0FBbUI7UUFDMUIsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3BHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBVztnQkFDL0MsT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQXZGLENBQXVGLENBQUMsQ0FBQyxDQUFDO1NBQ2pHO1FBRUQsT0FBTyxNQUFNO2FBQ1IsUUFBUSxDQUFDLFdBQVcsQ0FBQzthQUNyQixJQUFJLENBQ0QsVUFBVSxDQUFDLGNBQU0sT0FBQSxFQUFFLEVBQUYsQ0FBRSxDQUFDLENBQ3ZCLENBQUMsSUFBSSxDQUNOLEdBQUcsQ0FBQyxVQUFDLFVBQWlDO1lBQ2xDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUN4QyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO1lBRXZDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQ0w7QUF2QkQsQ0F1QkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiByeGpzLW5vLXdob2xlc2FsZSByeGpzLWRlZXAtb3BlcmF0b3JzXG5cbmltcG9ydCB7IG1hcCwgY29uY2F0TWFwLCBzdGFydFdpdGggLCBmaWx0ZXIgLCBzd2l0Y2hNYXAgLCBza2lwICwgZGVib3VuY2VUaW1lICwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCBwaXBlICwgb2YgLCBVbmFyeUZ1bmN0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICduZ3gtanNvbmFwaS9zZXJ2aWNlJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnbmd4LWpzb25hcGkvcmVzb3VyY2UnO1xuaW1wb3J0IHsgRG9jdW1lbnRDb2xsZWN0aW9uLCBJUGFyYW1zQ29sbGVjdGlvbiB9IGZyb20gJ25neC1qc29uYXBpJztcblxuZXhwb3J0IGZ1bmN0aW9uIGJhdGNoQWxsPFQgZXh0ZW5kcyBTZXJ2aWNlPFI+LCBSIGV4dGVuZHMgUmVzb3VyY2U+KHNlcnZpY2U6IFQsIHBhcmFtczogSVBhcmFtc0NvbGxlY3Rpb24pOiBPYnNlcnZhYmxlPERvY3VtZW50Q29sbGVjdGlvbjxSPj4ge1xuICAgIHJldHVybiA8T2JzZXJ2YWJsZTxEb2N1bWVudENvbGxlY3Rpb248Uj4+PnNlcnZpY2UuYWxsKHBhcmFtcykucGlwZShjb25jYXRNYXAoY29sbGVjdGlvbiA9PiB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEubGVuZ3RoIDwgcGFyYW1zLnBhZ2Uuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9mKGNvbGxlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zLnBhZ2UubnVtYmVyICs9IDE7XG5cbiAgICAgICAgcmV0dXJuIGJhdGNoQWxsKHNlcnZpY2UsIHBhcmFtcykucGlwZShzdGFydFdpdGgoY29sbGVjdGlvbikpO1xuICAgIH0pKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlck9yUmVxdWVzdCA9IDxUIGV4dGVuZHMgUmVzb3VyY2U+KHBhcmFtczoge1xuICAgIGF0dHJpYnV0ZV90b19zZWFyY2g/OiBzdHJpbmc7XG4gICAgcmVzb3VyY2VzQXJyYXk6IEFycmF5PFQ+O1xuICAgIGdldEFsbEZjOiAoKGZpbHRlcjogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPERvY3VtZW50Q29sbGVjdGlvbjxUPj4pO1xuICAgIGxhc3RfZmlsdGVyX3ZhbHVlOiBzdHJpbmc7XG4gICAgY29sbGVjdGlvbjogRG9jdW1lbnRDb2xsZWN0aW9uPFQ+O1xuICAgIHBhZ2Vfc2l6ZTogbnVtYmVyO1xufSk6IFVuYXJ5RnVuY3Rpb248T2JzZXJ2YWJsZTxzdHJpbmc+LCBPYnNlcnZhYmxlPEFycmF5PFQ+Pj4gPT5cbiAgICBwaXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoNDAwKSxcbiAgICAgICAgZmlsdGVyKGZpbHRlclZhbHVlID0+IHR5cGVvZiBmaWx0ZXJWYWx1ZSA9PT0gJ3N0cmluZycpLFxuICAgICAgICBzd2l0Y2hNYXAoKGZpbHRlclZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJWYWx1ZS5pbmNsdWRlcyhwYXJhbXMubGFzdF9maWx0ZXJfdmFsdWUpICYmIHBhcmFtcy5jb2xsZWN0aW9uLmRhdGEubGVuZ3RoIDwgcGFyYW1zLnBhZ2Vfc2l6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihwYXJhbXMucmVzb3VyY2VzQXJyYXkuZmlsdGVyKChyZXNvdXJjZTogVCkgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UuYXR0cmlidXRlc1twYXJhbXMuYXR0cmlidXRlX3RvX3NlYXJjaF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJhbXNcbiAgICAgICAgICAgICAgICAuZ2V0QWxsRmMoZmlsdGVyVmFsdWUpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gW10pXG4gICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoY29sbGVjdGlvbjogRG9jdW1lbnRDb2xsZWN0aW9uPFQ+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnJlc291cmNlc0FycmF5ID0gY29sbGVjdGlvbi5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMubGFzdF9maWx0ZXJfdmFsdWUgPSBmaWx0ZXJWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnJlc291cmNlc0FycmF5O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICApO1xuIl19