/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RemembermeStateDirective } from './remember-state.directive';

@NgModule({
    imports: [
        MatExpansionModule,
        CommonModule,
        RouterModule
    ],
    declarations: [RemembermeStateDirective],
    exports: [RemembermeStateDirective]
})
export class JamRememberStateModule {}
