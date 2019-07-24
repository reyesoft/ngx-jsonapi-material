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
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
