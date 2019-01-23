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
    @Input() public type: 'icon' | 'button' = 'icon';
    @Input() public icon: string;
    @Input() public tooltip: string;
    @Input() public msg: string;
    @Input() public text: string;
    @Input() public title: string;
    @Input() public classed: string;
    @Input() public styled: {};
    @Input() public styleIcon: string;
    @Input() public accept: string;
    @Output() public delete: EventEmitter<any> = new EventEmitter();

    public constructor(
        public dialog: MatDialog
    ) {
        this.styled = this.styled || { height: '45px' };
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
