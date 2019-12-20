/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
export declare class DeleteConfirmationComponent {
    dialog: MatDialog;
    type: 'icon' | 'button'; /** @Deprecated */
    icon: string;
    tooltip: string;
    msg: string;
    text: string;
    title: string;
    classed: string; /** @Deprecated */
    styled: {};
    styleIcon: string;
    accept: string;
    appearance: 'mat-button' | 'mat-raised-button' | 'mat-flat-button' | 'mat-stroked-button' | 'mat-icon-button';
    delete: EventEmitter<any>;
    smartColor: {
        'mat-button': string;
        'mat-raised-button': string;
        'mat-flat-button': string;
        'mat-stroked-button': string;
        'mat-icon-button': string;
    };
    constructor(dialog: MatDialog);
    showConfirm(): void;
}
