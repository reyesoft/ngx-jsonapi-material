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
import { MatIconModule } from '@angular/material/icon';
import { SearchInputComponent } from './search-input.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterPipe } from './search-text.pipe';

@NgModule({
    imports: [
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        CommonModule
    ],
    declarations: [SearchInputComponent, FilterPipe],
    exports: [SearchInputComponent, FilterPipe]
})
export class JamSearchInputModule {}
