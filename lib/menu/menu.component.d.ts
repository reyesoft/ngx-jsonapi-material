import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Menu } from './menu-elements/menu';
import { MatBottomSheet } from '@angular/material';
import { Destroyer } from '../destroyer';
export declare class MenuComponent implements OnInit, OnDestroy {
    private matBottomSheet;
    menu: Menu;
    source_data: Array<any>;
    selected: EventEmitter<{
        key: string;
        data?: any[];
    }>;
    destroyer: Destroyer;
    constructor(matBottomSheet: MatBottomSheet);
    ngOnInit(): void;
    ngOnDestroy(): void;
    open(): void;
    selectedOption(selected: string): void;
    private formatEmission;
}
