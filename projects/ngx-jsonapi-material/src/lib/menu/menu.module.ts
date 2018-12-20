/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule, MatBottomSheetModule, MatTooltipModule, MatIconModule, MatDividerModule, MatListModule } from '@angular/material';
import { MenuComponent } from './menu.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        MatTooltipModule,
        MatBottomSheetModule,
        CommonModule
    ],
    declarations: [MenuComponent, DropdownMenuComponent, BottomSheetComponent],
    entryComponents: [BottomSheetComponent],
    exports: [MenuComponent]
})
export class JamMenuModule {}
