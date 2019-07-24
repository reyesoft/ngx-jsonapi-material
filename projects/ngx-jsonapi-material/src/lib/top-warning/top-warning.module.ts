/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TopWarningComponent } from './top-warning.component';
import { SingleWarningComponent } from './single-warning/single-warning.component';
import { TopWarningService } from './top-warning.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatExpansionModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDividerModule,
        // ReactiveFormsModule,
        FormsModule,
        RouterModule,
        CommonModule
    ],
    declarations: [TopWarningComponent, SingleWarningComponent],
    providers: [TopWarningService],
    exports: [TopWarningComponent, SingleWarningComponent]
})
export class JamTopWarningModule {}
