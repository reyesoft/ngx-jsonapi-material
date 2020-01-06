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
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RangeDatepickerComponent } from './range-datepicker.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
    imports: [
        FormsModule,
        SatNativeDateModule,
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
