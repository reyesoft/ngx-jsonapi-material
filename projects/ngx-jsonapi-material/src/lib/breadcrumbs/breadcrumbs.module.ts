/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        CommonModule
    ],
    declarations: [BreadcrumbsComponent],
    exports: [BreadcrumbsComponent]
})

export class JamBreadcrumbsModule {}
