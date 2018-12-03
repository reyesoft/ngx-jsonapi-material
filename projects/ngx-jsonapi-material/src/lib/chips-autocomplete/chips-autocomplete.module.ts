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
import { MatFormFieldModule, MatChipsModule, MatIconModule, MatOptionModule, MatAutocompleteModule } from '@angular/material';
import { ChipsAutocompleteComponent } from './chips-autocomplete.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatOptionModule,
        MatChipsModule,
        MatIconModule,
        CommonModule
    ],
    declarations: [ChipsAutocompleteComponent],
    exports: [ChipsAutocompleteComponent]
})
export class JamChipsAutocompleteModule {}
