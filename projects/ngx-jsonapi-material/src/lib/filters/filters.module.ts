/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JamFilterChecksComponent } from './basics/filter-checks.component';
import { JamFilterOptionsComponent } from './basics/filter-options.component';
import { FilterPipe } from '../search-input/search-text.pipe';
import { FormsModule } from '@angular/forms';
import { JamSearchInputModule } from '../search-input/search-input.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDividerModule,
        FlexLayoutModule,
        MatFormFieldModule,
        JamSearchInputModule
    ],
    providers: [FilterPipe],
    declarations: [JamFilterChecksComponent, JamFilterOptionsComponent],
    exports: [JamFilterChecksComponent, JamFilterOptionsComponent]
})
export class JamFilterModule {}
