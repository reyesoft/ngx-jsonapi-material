/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { ResponsiveColumns } from '../table-components/responsive-columns';
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
    ViewChild
} from '@angular/core';
import { Column, Action } from '../table-components/table-columns';
import { DocumentCollection, Service, Resource, IParamsCollection } from 'ngx-jsonapi';
import { IPage } from '../../list-base';
import { Menu } from '../../../menu/menu-elements/menu';
import { JamRefreshService } from '../../../refresh/refresh.component';
import { Destroyer } from '../../../destroyer';
import { PageEvent } from '@angular/material/paginator';
import { ListBaseCommonComponent } from '../list-base-common.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'jam-list-base-common-paginator',
    templateUrl: './list-base-common-paginator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./list-base-common-paginator.component.scss']
})
export class ListBaseCommonPaginatorComponent {
    public reloadPageData: IPage;
    public pageSizeOptions: Array<number> = [];
    public dataTableSource = new MatTableDataSource<Resource>();
    @ViewChild('table') public table: ListBaseCommonComponent;
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
    @Input() public page: IPage = {
        pageIndex: 0,
        pageSize: 25
    };
    @Input() public sort: Array<string>;
    @Input() public disableQueryParamsUpdate: boolean = false;
    @Input() public nothingHereClasses: string;
    @Input() public nothingHereText: string = 'Todavía no tienes nada por aquí';
    @Input() public imageOrIcon: 'image' | 'icon' = 'icon';
    @Input() public nothingHereIcon: string = 'sentiment_neutral';
    @Input() public nothingHereImageUrl: string;
    @Output() public saveEditableCell: EventEmitter<Resource> = new EventEmitter<Resource>();
    @Output() public collectionChange: EventEmitter<DocumentCollection> = new EventEmitter();
    @Output() public actionsClick: EventEmitter<any> = new EventEmitter();
    @Output() public rowClick: EventEmitter<any> = new EventEmitter();
    @Output() public rowDoubleClick: EventEmitter<any> = new EventEmitter();
    @Output() public selectionBarComponentCreated: EventEmitter<ComponentRef<any>> = new EventEmitter<ComponentRef<any>>();
    @Output() public openedActionsMenu: EventEmitter<Resource> = new EventEmitter<Resource>(); // @todo: use generic typing or remove type
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

    private destroyer = new Destroyer();

    public constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private rsRefreshService: JamRefreshService
    ) {
        this.rsRefreshService.refreshSubject.pipe(this.destroyer.pipe()).subscribe((): void => {
            this.reloadPageData = {...this.page};
            this.changeDetectorRef.detectChanges();
        });
    }

    public realReload(page?: PageEvent | IPage, options: IParamsCollection = {}, clear_data = true) {
        this.table.realReload(page, options, clear_data)
    }

    public updateFilter(current_filter: any) {
        this.table.updateFilter(current_filter);
    }

    public pageLengthChange(length: number): void {
        this.page.length = length;
        this.changeDetectorRef.detectChanges();
    }

    public pageSizeOptionsEmit(pageSizeOptions: Array<number>): void {
        this.pageSizeOptions = pageSizeOptions;
        this.changeDetectorRef.detectChanges();
    }

    public reloadPage(page: IPage): void {
        this.reloadPageData = page;
        this.changeDetectorRef.detectChanges();
    }
}
