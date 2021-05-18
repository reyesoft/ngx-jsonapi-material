/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, Output, EventEmitter, Injectable, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Destroyer } from '../destroyer';
import { Service, DocumentCollection } from 'ngx-jsonapi';
import { Observable , Subject } from 'rxjs';

@Injectable()
export class JamRefreshService {
    public collection_to_refresh = new Subject<DocumentCollection>();
    public refreshSubject = new Subject<boolean>();
    public autoRefreshSubject = new Subject<boolean>();

    public refresh(): void {
        this.refreshSubject.next(true);
    }

    public autoRefresh(): void {
        this.autoRefreshSubject.next(true);
    }
}

@Component({
    selector: 'jam-refresh',
    templateUrl: './refresh.component.html'
})
export class RefreshComponent implements OnInit, OnDestroy {
    @Input() public collectionToRefresh: DocumentCollection;
    @Input() public serviceToRefresh: Service;
    @Input() public colorProgressCircular = 'white';
    @Input() public icon: string;
    @Output() public reload = new EventEmitter<any>();

    public destroyer = new Destroyer();

    public constructor(public changeDetectorRef: ChangeDetectorRef, public jamRefreshService: JamRefreshService) {}

    public ngOnInit() {
        if (!this.collectionToRefresh) {
            this.jamRefreshService.collection_to_refresh.pipe(this.destroyer.pipe()).subscribe((collection: DocumentCollection) => {
                this.collectionToRefresh = collection;
                this.changeDetectorRef.detectChanges();
            });
        }
    }

    public ngOnDestroy() {
        this.destroyer.destroy();
    }

    public refreshCollection() {
        this.serviceToRefresh.clearCacheMemory();
        this.jamRefreshService.refresh();
    }
}
