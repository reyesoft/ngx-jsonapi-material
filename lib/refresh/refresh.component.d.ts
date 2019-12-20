/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Destroyer } from '../destroyer';
import { Service, DocumentCollection } from 'ngx-jsonapi';
import { Subject } from 'rxjs';
export declare class JamRefreshService {
    collection_to_refresh: Subject<DocumentCollection<import("ngx-jsonapi/resource").Resource>>;
    refreshSubject: Subject<boolean>;
    refresh(): void;
}
export declare class RefreshComponent implements OnInit, OnDestroy {
    changeDetectorRef: ChangeDetectorRef;
    jamRefreshService: JamRefreshService;
    collectionToRefresh: DocumentCollection;
    serviceToRefresh: Service;
    colorProgressCircular: string;
    icon: string;
    reload: EventEmitter<any>;
    destroyer: Destroyer;
    constructor(changeDetectorRef: ChangeDetectorRef, jamRefreshService: JamRefreshService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    refreshCollection(): void;
}
