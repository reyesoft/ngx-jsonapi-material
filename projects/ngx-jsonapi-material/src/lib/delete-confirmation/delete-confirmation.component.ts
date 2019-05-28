/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'jam-delete-confirmation',
    templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmationComponent {
    @Input() public type: 'icon' | 'button' = 'icon'; /** @Deprecated */
    @Input() public icon: string;
    @Input() public tooltip: string;
    @Input() public msg: string;
    @Input() public text: string;
    @Input() public title: string;
    @Input() public classed: string; /** @Deprecated */
    @Input() public styled: {};
    @Input() public styleIcon: string;
    @Input() public accept: string;
    @Input() public appearance: 'mat-button' | 'mat-raised-button' |
        'mat-flat-button' | 'mat-stroked-button' | 'mat-icon-button' = 'mat-icon-button';
    @Output() public delete: EventEmitter<any> = new EventEmitter();

    public smartColor = {
        'mat-button': 'accent',
        'mat-raised-button': 'primary',
        'mat-flat-button': 'primary',
        'mat-stroked-button': 'accent',
        'mat-icon-button': 'default'
    };

    public constructor(
        public dialog: MatDialog
    ) {
        this.msg = this.msg || '¿Está seguro de eliminar?';
        this.accept = this.accept || 'Sí';
    }

    public showConfirm(): void {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: 'auto',
            data: { title: this.title, msg: this.msg, accept: this.accept }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete.emit();
            }
        });
    }
}
