/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { ResponsiveColumns } from './table-components/responsive-columns';
import {
    Component,
    OnDestroy,
    Input,
    Output,
    OnInit,
    EventEmitter,
    ComponentRef,
    ChangeDetectionStrategy,
    TemplateRef,
    ChangeDetectorRef,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { Column, Action } from './table-components/table-columns';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentCollection, Service, Resource, IParamsCollection } from 'ngx-jsonapi';
import { PageEvent } from '@angular/material/paginator';
import { ListBase, IPage } from '../list-base';
import { MediaObserver } from '@angular/flex-layout';
import { Sort } from '@angular/material/sort';
import { trackById } from '../base/track-by-id';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionBarService } from '../../selection-bar/selection-bar.service';
import { UpdateFiltersService } from '../base/update-filters/update-filters.component';
import { Menu } from '../../menu/menu-elements/menu';
import { JamRefreshService } from '../../refresh/refresh.component';

@Component({
    selector: 'jam-list-base-common',
    templateUrl: './list-base-common.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./list-base-common.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class ListBaseCommonComponent extends ListBase implements OnInit, OnChanges, OnDestroy {
    @Input() public tableColumns: Array<Column>;
    @Input() public displayedColumns: Array<string>;
    @Input() public expandableRow: TemplateRef<any>;
    @Input() public expandedElement: Resource;
    @Input() public editElement: Resource;
    @Input() public overrideEditableCellsSave: boolean = false;
    @Input() public ngContentColumns: Array<string> = [];
    @Input() public columnPipes: { [key: string]: any };
    @Input() public service: Service;
    @Input() public include: Array<string> = [];
    @Input() public beforePath: string;
    @Input() public remoteFilter: { [key: string]: any } = {};
    @Input() public actions: Array<Action>;
    @Input() public showTableLoader: boolean = true;
    @Input() public showActionsMenu: boolean = true;
    @Input() public actions_menu: Menu;
    @Input() public selectionBarComponent: Component;
    @Input() public selectionBarComponentInputs: { [key: string]: any } = {};
    @Input() public checkbox: boolean;
    @Input() public responsiveColumns: ResponsiveColumns = new ResponsiveColumns();
    @Input() public resizeContent: boolean = true;
    @Input() public page: IPage;
    @Input() public sort: Array<string>;
    @Input() public disableQueryParamsUpdate: boolean = false;
    @Input() public nothingHereClasses: string;
    @Input() public nothingHereText: string = 'Todavía no tienes nada por aquí';
    @Input() public imageOrIcon: 'image' | 'icon' = 'icon';
    @Input() public nothingHereIcon: string = 'sentiment_neutral';
    @Input() public nothingHereImageUrl: string;
    @Input() public reloadPageData: IPage = {};
    @Input() public collectionInfiniteScroll: Array<any>;
    @Output() public saveEditableCell: EventEmitter<Resource> = new EventEmitter<Resource>();
    @Output() public pageLengthChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() public pageSizeOptionsEmit: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
    @Output() public collectionChange: EventEmitter<DocumentCollection> = new EventEmitter();
    @Output() public actionsClick: EventEmitter<any> = new EventEmitter();
    @Output() public rowClick: EventEmitter<any> = new EventEmitter();
    @Output() public rowDoubleClick: EventEmitter<any> = new EventEmitter();
    @Output() public selectionBarComponentCreated: EventEmitter<ComponentRef<any>> = new EventEmitter<ComponentRef<any>>();
    @Output() public openedActionsMenu: EventEmitter<Resource> = new EventEmitter<Resource>(); // @todo: use generic typing or remove type
    public trackById = trackById;
    public masterCheckbox: any;

    public constructor(
        public router: Router,
        public observableMedia: MediaObserver,
        public activatedRoute: ActivatedRoute,
        public updateFiltersService: UpdateFiltersService,
        public selectionBarService: SelectionBarService,
        protected changeDetectorRef: ChangeDetectorRef
    ) {
        super(router, selectionBarService, updateFiltersService, activatedRoute);
    }

    // Recives a cell element and return the corresponding column sytles
    @Input() public columnHeaderClasses: (column: string, element: any) => { [key: string]: string } = (): any => {
        return null;
    }
    @Input() public columnHeaderStyles: (column: string, element: any) => { [key: string]: string } = (): any => {
        return null;
    }
    @Input() public cellClasses: (column: string, element: any) => { [key: string]: string } = (): any => {
        return null;
    }
    @Input() public cellStyles: (column: string, element: any) => { [key: string]: string } = (): any => {
        return null;
    }
    @Input() public cellDataClasses: (column: string, element: any) => { [key: string]: string } = (): any => {
        return null;
    }
    @Input() public cellDataStyles: (column: string, element: any) => { [key: string]: string } | null = (): {
        [key: string]: string;
    } | null => {
        return null;
    }

    public ngOnInit() {
        super.ngOnInit();
        // TODO: remove resizeTableContent used outside observable when flex-layout works fine
        if (!this.tableColumns.find((column): boolean => column.key === 'mobile')) {
            this.tableColumns.splice(1, 0, new Column('mobile', ' ', ' '));
        }
        this.pageSizeOptionsEmit.emit(this.pageSizeOptions);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.changeReloadPageData(changes);
        this.changeCollectionInfiniteScroll(changes);
    }

    private changeReloadPageData(changes: SimpleChanges): void {
        if (changes.reloadPageData && changes.reloadPageData.currentValue !== undefined) {
            this.realReload(changes.reloadPageData.currentValue, { ttl: 0 }, false);
        }
    }

    private changeCollectionInfiniteScroll(changes: SimpleChanges): void {
        if (changes.collectionInfiniteScroll && changes.collectionInfiniteScroll.currentValue.length !== 0) {
            this.dataTableSource.data = changes.collectionInfiniteScroll.currentValue;
        }
    }

    public realReload(page?: PageEvent | IPage, options: IParamsCollection = {}, clear_data = true) {
        // @TODO: implement IParamsCollection in ListBase class and use it to manage requests data
        this.requestCollectionAndUpdatePagination({
            service: this.service,
            filter: this.remoteFilter,
            clear_data: clear_data,
            include: this.include,
            beforepath: this.beforePath,
            page: page,
            sort: this.sort,
            ttl: options.ttl
        }).subscribe((): void => {
            this.pageLengthChange.emit(this.page && this.page.length ? this.page.length : 0);
            this.collectionChange.emit(this.collection);
            this.changeDetectorRef.detectChanges();
        });
    }

    public mainRowClick(row: any) {
        /* tslint:disable:strict-comparisons */
        this.expandedElement = this.expandedElement === row ? null : row;
        this.rowClick.emit(row);
        /* tslint:enable:strict-comparisons */
    }

    public editTableElement(element: Resource) {
        if (this.editElement) {
            return;
        }
        this.editElement = element;
    }

    public clearEditElement() {
        this.editElement = null;
    }

    public saveTableElement(element: Resource, column: Column, value: any) {
        let last_value = element.attributes[column.key];
        element.attributes[column.key] = value;
        if (this.overrideEditableCellsSave) {
            this.saveEditableCell.emit(element);

            return;
        }
        element.save().subscribe(
            (): void => {
                this.changeDetectorRef.detectChanges();
            },
            (error): void => {
                element.attributes[column.key] = last_value;
                this.changeDetectorRef.detectChanges();
                throw new Error(error);
            }
        );
        this.editElement = null;
    }

    public actionClick(element: any, key: string) {
        this.actionsClick.emit({ element, key });
    }

    public openSelection(): void {
        let inputs = {
            selection: this.selection,
            ...this.selectionBarComponentInputs
        };

        let selection_bar_component = this.selectionBarService.init(this.selectionBarComponent, inputs, {});
        if (!selection_bar_component) {
            return;
        }
        if (this.selectionBarComponentCreated.observers.length > 0) {
            this.selectionBarComponentCreated.emit(selection_bar_component);
        } else {
            this.subscribeToSelectionBarEvents(selection_bar_component);
        }
    }

    public getDisplayedColumns(table_columns: Array<Column>, displayed_columns_array?: Array<string>): Array<string> {
        let columns = displayed_columns_array || table_columns.map((column): any => column.key).filter((key): boolean => key !== 'mobile');

        if (!this.resizeContent) {
            return columns;
        }

        if (this.observableMedia.isActive('xs')) {
            return this.responsiveColumns.xs || columns; // mobile
        }
        if (this.observableMedia.isActive('sm')) {
            return this.responsiveColumns.sm || columns; // mobile
        }
        if (this.observableMedia.isActive('md')) {
            return this.responsiveColumns.md || columns; // mobile
        }
        if (this.observableMedia.isActive('lg')) {
            return this.responsiveColumns.lg || columns; // mobile
        }

        return columns;
    }

    public sortByColumn(sort: Sort) {
        this.page = {
            pageSize: this.page.pageSize,
            pageIndex: 0,
            length: undefined
        };
        this.sort = [];
        if (sort.direction === 'asc') {
            this.sort.push(sort.active);
        } else if (sort.direction === 'desc') {
            this.sort.push('-' + sort.active);
        }
        this.realReload(this.page);
    }
}
