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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
