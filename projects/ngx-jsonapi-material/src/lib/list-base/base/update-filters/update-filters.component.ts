import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class UpdateFiltersService {
    public constructor(public router: Router) {}

    public getRemoteFilter(queryParams: any, remoteFilterObject: any) {
        /*
         * Extracts remoteFilter object from queryParams
         *
         * @param queryParams: queryParams from the actual route
         * @return: remoteFilter object
         */

        let remoteFilter = this.parseQueryParams({ ...queryParams });
        Object.keys(queryParams).forEach((key): void => {
            if (!remoteFilterObject.hasOwnProperty(key)) {
                delete remoteFilter[key];
            }
        });

        return remoteFilter;
    }

    public getPaginationData(queryParams: any, page: any) {
        /*
         * Extracts pagination data object from queryParams
         *
         * @param queryParams: queryParams from the actual route
         * @return: pagination data object
         */

        Object.keys(queryParams).forEach((key): void => {
            if (page.hasOwnProperty(key)) {
                page[key] = queryParams[key];
            }
        });

        return page;
    }

    public filterByText(text: any, filterName: any, remoteFilter: any, page: any) {
        /*
         * Applies text filter to the current route
         *
         * @param filter: filter to apply in the actual route
         * @param remoteFilter: (object) route's actual filter
         * @param page: (object) route's actual pagination data
         */

        if (remoteFilter[filterName] !== undefined && remoteFilter[filterName] !== text && text.length < 4) {
            delete remoteFilter[filterName];
            this.router.navigate([], { queryParams: { ...remoteFilter, ...page } });
        }
        if (text.length < 4) {
            return;
        }

        remoteFilter[filterName] = text;
        this.router.navigate([], { queryParams: { ...remoteFilter, ...page } });
    }

    public applyFilters(filter: any): void {
        /*
         * Applies new filters to the current route
         *
         * @param filter: filter to apply in the actual route
         */

        Object.keys(filter).forEach((key): void => {
            /* tslint:disable:strict-comparisons */
            if (!filter[key] || (Object.keys(filter[key]).length === 0 && filter[key].constructor === Object)) {
                filter[key] = null;
            }
            if (filter.hasOwnProperty(key) && typeof filter[key] === 'object' && filter[key]) {
                Object.keys(filter[key]).forEach((subKey): void => {
                    if (filter[key].hasOwnProperty(subKey)) {
                        let filter_key = key + '[' + subKey + ']';
                        filter[filter_key] = filter[key][subKey];
                    }
                });
                delete filter[key];
            }
            /* tslint:enable:strict-comparisons */
        });

        this.router.navigate([], { queryParams: filter });
    }

    public parseQueryParams(queryParams: any) {
        let parsed_query_params: { [key: string]: string | { [key: string]: string } } | any = {};

        /* tslint:disable:no-for-in */
        for (let query_param in queryParams) {
            if (!queryParams.hasOwnProperty(query_param)) {
                continue;
            }
            if (query_param.indexOf('[') !== -1 && query_param.indexOf(']') !== -1) {
                let splitted_query_params = query_param.split(/\[|\]/);
                if (!parsed_query_params[splitted_query_params[0]]) {
                    parsed_query_params[splitted_query_params[0]] = {};
                }
                parsed_query_params[splitted_query_params[0]][splitted_query_params[1]] = queryParams[query_param];
            } else {
                parsed_query_params[query_param] = queryParams[query_param];
            }
        }
        /* tslint:enable:no-for-in */

        return parsed_query_params;
    }
}
