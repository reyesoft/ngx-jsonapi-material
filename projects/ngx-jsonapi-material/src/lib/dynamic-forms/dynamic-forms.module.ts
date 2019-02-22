/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyFormFlexComponent } from './formly-form-flex.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormlyModule.forRoot(),
        FormlyMaterialModule
    ],
    declarations: [FormlyFormFlexComponent],
    exports: [FormlyFormFlexComponent]
})
export class JamDynamicFormsModule {}
