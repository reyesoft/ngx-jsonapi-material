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
import { MatSelectModule, MatFormFieldModule, MatIconModule, MatDividerModule, MatButtonModule } from '@angular/material';
import { FilterPipe } from '../search-input/search-text.pipe';
import { JamSearchInputModule } from '../search-input/search-input.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SelectionBarService } from './selection-bar.service';
import { ResourceSelectionBarService } from './resource-selection-bar.service';
import { DomService } from './dom.service';
import { SelectionBarContainerComponent } from './selection-bar-container/selection-bar-container.component';
import { SelectionBarInfoComponent } from './selection-bar-info/selection-bar-info.component';

@NgModule({
    imports: [
        RouterModule,
        JamSearchInputModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        CommonModule
    ],
    providers: [FilterPipe, SelectionBarService, ResourceSelectionBarService, DomService],
    declarations: [SelectionBarContainerComponent, SelectionBarInfoComponent],
    exports: [ SelectionBarContainerComponent, SelectionBarInfoComponent]
})
export class JamSelectionBarModule {}
