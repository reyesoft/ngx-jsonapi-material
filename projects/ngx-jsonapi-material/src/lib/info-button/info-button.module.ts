/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { InfoButtonComponent } from './info-button.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule
    ],
    declarations: [InfoButtonComponent],
    exports: [InfoButtonComponent]
})
export class JamInfoButtonModule {}
