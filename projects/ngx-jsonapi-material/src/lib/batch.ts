// tslint:disable: rxjs-no-wholesale rxjs-deep-operators

import { map, concatMap, startWith , filter , switchMap , skip , debounceTime , catchError } from 'rxjs/operators';
import { Observable , pipe , of , UnaryFunction } from 'rxjs';

import { Service } from 'ngx-jsonapi/service';
import { Resource } from 'ngx-jsonapi/resource';
import { DocumentCollection, IParamsCollection } from 'ngx-jsonapi';

export function batchAll<T extends Service<R>, R extends Resource>(service: T, params: IParamsCollection): Observable<DocumentCollection<R>> {
    return <Observable<DocumentCollection<R>>>service.all(params).pipe(concatMap((collection): Observable<any> => {
        if (collection.data.length < params.page.size) {
            return of(collection);
        }

        params.page.number += 1;

        return batchAll(service, params).pipe(startWith(collection));
    }));
}

export const filterOrRequest = <T extends Resource>(params: {
    attribute_to_search?: string;
    resourcesArray: Array<T>;
    getAllFc: ((filter: string) => Observable<DocumentCollection<T>>);
    last_filter_value: string;
    collection: DocumentCollection<T>;
    page_size: number;
}): UnaryFunction<Observable<string>, Observable<Array<T>>> =>
    pipe(
        startWith(''),
        debounceTime(400),
        filter((filterValue): boolean => typeof filterValue === 'string'),
        switchMap((filterValue: string): Observable<any> => {
            if (filterValue.includes(params.last_filter_value) && params.collection.data.length < params.page_size) {
                return of(params.resourcesArray.filter((resource: T): boolean =>
                    resource.attributes[params.attribute_to_search].toLowerCase().indexOf(filterValue) >= 0));
            }

            return params
                .getAllFc(filterValue)
                .pipe(
                    catchError((): Array<any> => [])
                ).pipe(
                map((collection: DocumentCollection<T>): Array<T> => {
                    params.collection = collection;
                    params.resourcesArray = collection.data;
                    params.last_filter_value = filterValue;

                    return params.resourcesArray;
                }));
        })
    );
