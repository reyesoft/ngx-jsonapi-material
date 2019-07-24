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
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
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
