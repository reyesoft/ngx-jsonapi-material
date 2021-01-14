/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UpdateFiltersService } from './base/update-filters/update-filters.component';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Resource, Service, DocumentCollection } from 'ngx-jsonapi';
import { OnInit, OnDestroy, ChangeDetectorRef, ComponentRef, Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, filter, takeUntil } from 'rxjs/operators';
import { isFunction } from './base/util';
import { cloneDeep, isEqual } from 'lodash';
import { SelectionBarService } from '../selection-bar/selection-bar.service';
import { Destroyer } from '../destroyer';

export interface IPage {
    length?: number;
    pageIndex?: number;
    pageSize?: number;
}

export interface IRequestCollectionOptions {
    service: Service;
    filter: Object;
    clear_data?: boolean;
    include: Array<string>;
    beforepath: string | undefined;
    page?: PageEvent | IPage;
    sort?: Array<string>;
    disable_query_params_update?: boolean;
    ttl?: number;
}

export class ListBase implements OnInit, OnDestroy {
    public collection: DocumentCollection;
    // Pagination attributes...
    public page: IPage = {
        pageSize: 25,
        pageIndex: 0,
        length: undefined
    };
    public limit: number;
    public pageSize = 50;
    public pagIndex = 0;
    public pageSizeOptions = [10, 25, 50, 100, 250, 500];
    public remoteFilter: { [key: string]: any } = {};
    public queryParams: { [key: string]: any }; // NOTE: no inicializar como objeto vacío!
    public disableQueryParamsUpdate = false;

    // Select Rows
    public initialSelection = [];
    public allowMultiSelect = true;
    public selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
    public selection_bar_component: any;
    public selection_bar_inputs: { [key: string]: any } = { selected: this.selection };

    public dataTableSource = new MatTableDataSource<Resource>();

    protected essential_filters: { [key: string]: any } = {};
    protected destroyer = new Destroyer();
    protected block_query_params: boolean = false;
    protected deprecate_collection_subscription: Subject<void> = new Subject();
    protected last_remote_filter: any;
    protected last_page: any;

    public constructor(
        protected router: Router,
        protected selectionBarService: SelectionBarService,
        public updateFiltersService: UpdateFiltersService,
        public activatedRoute: ActivatedRoute,
        protected changeDetectorRef?: ChangeDetectorRef
    ) {}

    // WARNING: Used ngOnInit instead of constructor because it can be overriden by children if needed, don't override without intention
    public ngOnInit() {
        this.router.events
            .pipe(this.destroyer.pipe())
            .pipe(filter((event): boolean => event instanceof NavigationEnd))
            .subscribe((): void => this.clearSelected());

        this.activatedRoute.queryParams
            // @important need to unsubscribe when activatedRoute is used in a mat-dialog
            .pipe(this.destroyer.pipe())
            .subscribe((queryParams): void => {
                // TODO: COL-2385 should_reload is a hot fix for using tables with mat-tabs...
                // improve if updates on query params are thrown to the filters
                // NOTE: if queryParams is falsy, list should be reloaded because it's the first time that passes through this code
                let should_reload = !this.queryParams || this.disableQueryParamsUpdate;
                if (this.remoteFilter && !this.disableQueryParamsUpdate) {
                    this.remoteFilter = this.updateFiltersService.getRemoteFilter(queryParams, this.remoteFilter);
                    should_reload = should_reload || !isEqual(this.last_remote_filter, this.remoteFilter);
                    this.last_remote_filter = cloneDeep(this.remoteFilter);
                }
                if (this.page && !this.disableQueryParamsUpdate) {
                    this.page = this.updateFiltersService.getPaginationData(queryParams, this.page);
                    should_reload = should_reload || !isEqual(this.last_page, this.page);
                    this.last_page = cloneDeep(this.page);
                }
                this.queryParams = queryParams;
                if (should_reload || !this.queryParams) {
                    this.realReload(this.page);
                }
            });
    }

    public updateFilter(current_filter: any) {
        /*
         * This method removes remoteFilter queryParams from route to keep other query params
         * and then merges in the new remoteFilter params
         */

        // Have to copy queryParams property because it can't be edited (it's a reference to the original angular's queryParams)
        let queryParamsCopy = { ...this.queryParams };
        if (queryParamsCopy.pageIndex) {
            queryParamsCopy.pageIndex = '0';
        }
        let filter_keys: any = [];

        Object.keys(this.remoteFilter).forEach((key): void => {
            if (typeof this.remoteFilter[key] !== 'object') {
                filter_keys.push(key);
            } else {
                Object.keys(this.remoteFilter[key]).forEach((subKey): void => {
                    let filter_key = key + '[' + subKey + ']';
                    filter_keys.push(filter_key);
                });
            }
        });

        for (let key of filter_keys) {
            delete queryParamsCopy[key];
        }
        this.remoteFilter = current_filter;

        if (this.disableQueryParamsUpdate) {
            this.realReload({ ...this.page, ...{ pageIndex: 0 } });
        } else {
            this.updateFiltersService.applyFilters({ ...queryParamsCopy, ...current_filter });
        }
    }

    /*
     * @description
     * This method removes pagination queryParams from route to keep other query params
     * and then merges in the new pagination params
     */
    public updatePagination(page: any) {
        // Have to copy queryParams property because it can't be edited (it's a reference to the original angular's queryParams)
        let queryParamsCopy = { ...this.queryParams };

        Object.keys(page).forEach((key): void => {
            delete queryParamsCopy[key];
        });

        let queryParams = { pageSize: page.pageSize, pageIndex: page.pageIndex };

        if (this.remoteFilter && Object.keys(this.remoteFilter).length !== 0) {
            Object.keys(this.remoteFilter).forEach((key): void => {
                queryParams[key] = this.remoteFilter[key];
            });
        }

        if (this.disableQueryParamsUpdate) {
            this.realReload(page);
        } else {
            this.updateFiltersService.applyFilters({ ...queryParams });
        }
    }

    public resetFilters() {
        this.updateFiltersService.applyFilters(this.essential_filters);
    }

    public realReload(page?: any) {
        console.log(page);
    }

    public fillPageData(page: IPage | PageEvent) {
        this.page = {
            length: page.length,
            pageIndex: page.pageIndex,
            pageSize: page.pageSize
        };
    }

    public requestCollectionAndUpdatePagination(request_options: IRequestCollectionOptions): Observable<DocumentCollection> {
        this.deprecate_collection_subscription.next();
        let pageIndex = 0;

        if (!this.page.pageSize) {
            pageIndex = 0;
        } else {
            pageIndex = this.page.pageSize;
        }

        return request_options.service
            .all({
                include: request_options.include,
                remotefilter: request_options.filter,
                beforepath: request_options.beforepath,
                page: {
                    number:
                        request_options.page && request_options.page.pageIndex !== undefined
                            ? request_options.page.pageIndex * 1 + 1
                            : pageIndex,
                    size: request_options.page ? request_options.page.pageSize : this.pageSize
                },
                ttl: request_options.ttl,
                sort: request_options.sort
            })
            .pipe(
                filter((collection): boolean => collection.builded || this.dataTableSource.data.length === 0),
                tap((collection): void => {
                    this.collection = collection;
                    this.dataTableSource.data = collection.data;
                    if (request_options.page) {
                        request_options.page.length = collection.page.total_resources;
                        this.fillPageData(request_options.page);
                    }
                    if (!this.disableQueryParamsUpdate) {
                        this.updatePagination(this.page);
                    }
                }),
                takeUntil(this.deprecate_collection_subscription)
            );
    }

    public ngOnDestroy(): void {
        this.destroyer.destroy();
        this.deprecate_collection_subscription.complete();
        this.selectionBarService.clearMethod();
    }

    /** Checks if the number of selected rows matches the total number of rows */
    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataTableSource.data.length;

        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    public masterToggle(): void {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.dataTableSource.data.forEach((row): void => {
                this.selection.select(row);
            });
        }
    }

    public callCheckboxEvents(event: any, row?: any): void {
        if (event.checked) this.openSelection();
        if (event && row) {
            this.selection.toggle(row);
        } else if (event) {
            this.masterToggle();
        }
        this.selectionBarService.selected(this.selection);
    }

    public openSelection() {
        let inputs = this.selection_bar_inputs;
        this.selectionBarService.init(this.selection_bar_component, inputs, {});
    }

    public selectedMenuOption(option: { key: string; data?: Array<any> }): void {
        if (!isFunction(this[option.key])) {
            console.warn('No se encontro el método', option.key, ', verifica su nombre');

            return;
        }

        if (option.data) {
            this[option.key](option.data);
        } else {
            this[option.key]();
        }
    }

    protected compare(a: string | number, b: string | number, isAsc: boolean): number {
        /* tslint:disable:strict-comparisons */
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
        /* tslint:enable:strict-comparisons */
    }

    protected clearSelected(): void {
        this.selection.clear();
        if (this.changeDetectorRef) this.changeDetectorRef.detectChanges();
    }

    // protected runSelectionBarEvents(): void {
    //     this.selectionBarService.selected$
    //         .pipe(this.destroyer.pipe())
    //         .subscribe(response => {
    //             if (response.length <= 0) this.selection.clear();
    //             if (this.changeDetectorRef) this.changeDetectorRef.detectChanges();
    //         });

    //     this.selectionBarService.callMethod$
    //         .pipe(
    //             this.destroyer.pipe(),
    //             filter(methodRef => !['', null, undefined].includes(methodRef.method) && (typeof this[methodRef.method] === 'function'))
    //         )
    //         .subscribe(methodRef => this[methodRef.method](methodRef.params));
    // }

    // @TODO: COL-2447 ---> crear clase padre para que todas las selection bars extiendan y usarla en lugar del "any"
    protected subscribeToSelectionBarEvents(selection_bar_component: ComponentRef<any>): void {
        selection_bar_component.instance.reload.subscribe((): void => {
            this.realReload();
        }); // Angular automatically unsubscribes Outputs
        selection_bar_component.instance.clearSelection.subscribe((): void => {
            this.clearSelected();
        }); // Angular automatically unsubscribes Outputs
    }
}
