/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { FloatingFiltersComponent } from './floating-filters.component';
import { AvoidDisabledStyleDirective } from './avoid-disabled-style.directive';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatExpansionModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        FlexLayoutModule,
        CommonModule
    ],
    declarations: [FloatingFiltersComponent, AvoidDisabledStyleDirective],
    exports: [FloatingFiltersComponent, AvoidDisabledStyleDirective]
})
export class JamFloatingFiltersModule {}
