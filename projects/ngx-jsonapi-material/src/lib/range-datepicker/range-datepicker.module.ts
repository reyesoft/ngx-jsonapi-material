/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatFormFieldModule, MatOptionModule, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { RangeDatepickerComponent } from './range-datepicker.component';
import { SatDatepickerModule } from 'saturn-datepicker';

@NgModule({
    imports: [
        FormsModule,
        SatDatepickerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatButtonModule,
        MatSelectModule,
        MatTooltipModule,
        MatIconModule,
        CommonModule
    ],
    declarations: [RangeDatepickerComponent],
    exports: [RangeDatepickerComponent]
})
export class JamRangeDatepickerModule {}
