/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefreshComponent, JamRefreshService } from './refresh.component';
import { MatButtonModule, MatTooltipModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatTooltipModule,
        FlexLayoutModule,
        MatIconModule
    ],
    providers: [JamRefreshService],
    declarations: [RefreshComponent],
    exports: [RefreshComponent]
})
export class JamRefreshModule {}
