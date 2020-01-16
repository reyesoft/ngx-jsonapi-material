/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { JamSubmitModule } from '../submit/submit.module';
import { JamErrorHandler } from './error-handler.service';
import { DialogLoggedStateComponent } from '../logged-state/dialog-logged-state.component';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        JamSubmitModule,
        CommonModule
    ],
    declarations: [DialogLoggedStateComponent],
    providers: [JamErrorHandler],
    entryComponents: [DialogLoggedStateComponent],
    exports: [DialogLoggedStateComponent]
})
export class JamErrorHandlerModule {}
