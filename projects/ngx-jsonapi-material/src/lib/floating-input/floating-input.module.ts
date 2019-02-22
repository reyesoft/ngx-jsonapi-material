/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FloatingInputComponent } from './floating-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        CommonModule
    ],
    declarations: [FloatingInputComponent],
    exports: [FloatingInputComponent]
})
export class JamFloatingInputModule {}
