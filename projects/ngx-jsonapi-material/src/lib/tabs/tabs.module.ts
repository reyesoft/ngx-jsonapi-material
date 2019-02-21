/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { JamTabsDirective } from './tabs.directive';

@NgModule({
    imports: [
        MatTabsModule,
        CommonModule
    ],
    declarations: [JamTabsDirective],
    exports: [JamTabsDirective]
})
export class JamTabsModule {}
