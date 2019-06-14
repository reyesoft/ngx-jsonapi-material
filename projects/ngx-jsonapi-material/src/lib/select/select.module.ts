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
import { MatSelectModule, MatFormFieldModule, MatIconModule, MatDividerModule, MatButtonModule } from '@angular/material';
import { SelectComponent } from './select.component';
import { FilterPipe } from '../search-input/search-text.pipe';
import { JamSearchInputModule } from '../search-input/search-input.module';
import { JamOptionFooterComponent } from './option-footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule,
        JamSearchInputModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        CommonModule
    ],
    providers: [FilterPipe],
    declarations: [SelectComponent, JamOptionFooterComponent],
    exports: [ SelectComponent, JamOptionFooterComponent]
})
export class JamSelectModule {}
