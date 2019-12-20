import { AfterViewInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
export declare class JamTabsDirective implements AfterViewInit {
    protected router: Router;
    protected activatedRoute: ActivatedRoute;
    tabNames: {
        [key: string]: number;
    };
    tabGroup: MatTabGroup;
    defaultTabIndex: number;
    selected_tab: number;
    query_params: Params;
    constructor(router: Router, activatedRoute: ActivatedRoute);
    ngAfterViewInit(): void;
    onTabChange(new_index: number): void;
}
