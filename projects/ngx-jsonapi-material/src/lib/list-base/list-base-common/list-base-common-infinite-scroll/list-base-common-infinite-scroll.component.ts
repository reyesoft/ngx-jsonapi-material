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
    ChangeDetectorRef
} from '@angular/core';
import { Column, Action } from '../table-components/table-columns';
import { DocumentCollection, Service, Resource, IParamsCollection } from 'ngx-jsonapi';
import { IPage } from '../../list-base';
import { Menu } from '../../../menu/menu-elements/menu';
import { JamRefreshService } from '../../../refresh/refresh.component';
import { Destroyer } from '../../../destroyer';

@Component({
    selector: 'jam-list-base-common-infinite-scroll',
    templateUrl: './list-base-common-infinite-scroll.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./list-base-common-infinite-scroll.component.scss']
})
export class ListBaseCommonInfiniteScrollComponent {
    public reloadPageData: IPage;
    public collection: Array<Resource> = [];
    public disableQueryParamsUpdate: boolean = true;
    public disabledButton: boolean = false;
    public pageIndex: number = 0;
    private destroyer = new Destroyer();
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

    public constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private rsRefreshService: JamRefreshService
    ) {
        this.observerAutoRefresh();
        this.observerRefresh();
    }

    private observerAutoRefresh(): void {
        this.rsRefreshService.autoRefreshSubject.pipe(this.destroyer.pipe()).subscribe((): void => {
            this.pageIndex = this.page && this.page.pageIndex ? this.page.pageIndex : 0;
            this.reloadPageData = {...this.page};
            this.changeDetectorRef.detectChanges();
        });
    }

    private observerRefresh(): void {
        this.rsRefreshService.refreshSubject.pipe(this.destroyer.pipe()).subscribe((): void => {
            this.page.pageIndex = 0;
            this.pageIndex = 0;
            this.reloadPageData = {...this.page};
            this.changeDetectorRef.detectChanges();
        });
    }

    public pageLengthChange(length: number): void {
        if (!this.page || !this.page.length) {
            return;
        }
        this.page.length = length;
    }

    public reloadPage(): void {
        this.page.pageIndex = this.page.pageIndex + 1;
        this.pageIndex = this.page.pageIndex;
        this.reloadPageData = {...this.page};
        this.changeDetectorRef.detectChanges();
    }

    public setCollection(collection: any): void {
        this.collectionChange.emit(collection);
        this.collection = this.cutAndReload(this.pageIndex, collection.data);
        this.disabledButton = this.disableButton(collection);
        this.changeDetectorRef.detectChanges();
    }

    private disableButton(collection: DocumentCollection): boolean {
        if (collection.page.total_resources === 0) {
            return false;
        }
        if (collection.page.total_resources <= collection.page.resources_per_page) {
            return true;
        }
        if (collection.page.total_resources === this.collection.length) {
            return true;
        }

        return false;
    }

    private cutAndReload(pageIndex: number, collection: any): any {
        if (this.collection[pageIndex * (this.page && this.page.pageSize ? this.page.pageSize : 10)] === undefined) {
            return this.collection.concat(collection);
        }

        return this.collection.slice(0, pageIndex * this.page.pageSize).concat(collection);
    }
}
