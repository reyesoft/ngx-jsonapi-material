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
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FloatingButtonComponent } from './floating-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule,
        MatTooltipModule,
        MatIconModule
    ],
    declarations: [FloatingButtonComponent],
    exports: [FloatingButtonComponent]
})
export class JamFloatingButtonModule {}
