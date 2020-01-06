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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubmitComponent } from './submit.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
    declarations: [SubmitComponent],
    exports: [SubmitComponent]
})
export class JamSubmitModule {}
