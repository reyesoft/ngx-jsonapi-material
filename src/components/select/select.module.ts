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
import { MatSelectModule } from '@angular/material';
import { JamSelect } from './select.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule
  ],
  exports: [
    JamSelect,
    MatSelectModule
],
  declarations: [JamSelect]
})
export class JamSelectModule {}
