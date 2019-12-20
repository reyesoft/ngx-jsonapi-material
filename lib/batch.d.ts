import { Observable, UnaryFunction } from 'rxjs';
import { Service } from 'ngx-jsonapi/service';
import { Resource } from 'ngx-jsonapi/resource';
import { DocumentCollection, IParamsCollection } from 'ngx-jsonapi';
export declare function batchAll<T extends Service<R>, R extends Resource>(service: T, params: IParamsCollection): Observable<DocumentCollection<R>>;
export declare const filterOrRequest: <T extends Resource>(params: {
    attribute_to_search?: string;
    resourcesArray: T[];
    getAllFc: (filter: string) => Observable<DocumentCollection<T>>;
    last_filter_value: string;
    collection: DocumentCollection<T>;
    page_size: number;
}) => UnaryFunction<Observable<string>, Observable<T[]>>;
