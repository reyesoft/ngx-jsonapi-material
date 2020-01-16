/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
    imports: [
        MatTooltipModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        CommonModule
    ],
    declarations: [DeleteConfirmationComponent, ConfirmationDialogComponent],
    entryComponents: [ConfirmationDialogComponent],
    exports: [DeleteConfirmationComponent, ConfirmationDialogComponent]
})
export class JamDeleteConfirmationModule {}
