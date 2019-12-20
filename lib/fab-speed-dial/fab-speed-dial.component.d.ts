import { OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FabSpeedDialMiniButton } from './fab-speed-dial-mini-button';
export declare class FabSpeedDialComponent implements OnInit {
    private activatedRoute;
    animationMode: string;
    tooltip: string;
    spin: boolean;
    icon: string;
    routerLink: Array<string>;
    queryParams: {
        [key: string]: any;
    };
    fabSpeedDialMiniButtons: Array<FabSpeedDialMiniButton>;
    fabSpeedDialClick: EventEmitter<void>;
    actionsClick: EventEmitter<string>;
    fab_status: {
        opened: boolean;
        status: string;
    };
    constructor(activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    toggleFabStatus(status: any): void;
}
