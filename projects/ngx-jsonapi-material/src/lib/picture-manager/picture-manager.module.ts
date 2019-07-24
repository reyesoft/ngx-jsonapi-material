/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxUploaderModule } from 'ngx-uploader';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadComponent } from './upload/upload.component';
import { PictureManagerComponent } from './picture/picture-manager.component';
import { GalleryManagerComponent } from './gallery/gallery-manager.component';
import { JamDeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';

@NgModule({
    imports: [
        JamDeleteConfirmationModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        NgxUploaderModule,
        FlexLayoutModule,
        CommonModule
    ],
    declarations: [UploadComponent, PictureManagerComponent, GalleryManagerComponent],
    exports: [PictureManagerComponent, GalleryManagerComponent]
})
export class JamPictureManagerModule {}
