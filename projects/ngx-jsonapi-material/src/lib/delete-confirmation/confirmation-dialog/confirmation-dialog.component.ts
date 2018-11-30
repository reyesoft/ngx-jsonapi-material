/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'jam-confirmation-dialog',
    templateUrl: 'confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {
    public constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        if (!data.accept) {
            data.accept = 'Sí';
        }
        if (!data.msg) {
            data.msg = '¿Está seguro que desea continuar?';
        }
    }
}
