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
import { MatProgressSpinnerModule, MatDividerModule, MatIconModule, MatTooltipModule, MatButtonModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadComponent } from './upload/upload.component';
import { PictureManagerComponent } from './picture/picture-manager.component';
import { GalleryManagerComponent } from './gallery/gallery-manager.component';
import { JamDeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';
export class JamPictureManagerModule {
}
JamPictureManagerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    JamDeleteConfirmationModule,
                    MatCardModule,
                    MatProgressSpinnerModule,
                    MatTooltipModule,
                    MatButtonModule,
                    MatProgressSpinnerModule,
                    MatDividerModule,
                    MatIconModule,
                    NgxUploaderModule,
                    FlexLayoutModule,
                    CommonModule
                ],
                declarations: [UploadComponent, PictureManagerComponent, GalleryManagerComponent],
                exports: [PictureManagerComponent, GalleryManagerComponent]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVyZS1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3BpY3R1cmUtbWFuYWdlci9waWN0dXJlLW1hbmFnZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoSixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFtQmhHLE1BQU0sT0FBTyx1QkFBdUI7OztZQWpCbkMsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCwyQkFBMkI7b0JBQzNCLGFBQWE7b0JBQ2Isd0JBQXdCO29CQUN4QixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2Ysd0JBQXdCO29CQUN4QixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQixnQkFBZ0I7b0JBQ2hCLFlBQVk7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixDQUFDO2dCQUNqRixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSx1QkFBdUIsQ0FBQzthQUM5RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hVcGxvYWRlck1vZHVsZSB9IGZyb20gJ25neC11cGxvYWRlcic7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC91cGxvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBpY3R1cmVNYW5hZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9waWN0dXJlL3BpY3R1cmUtbWFuYWdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2FsbGVyeU1hbmFnZXJDb21wb25lbnQgfSBmcm9tICcuL2dhbGxlcnkvZ2FsbGVyeS1tYW5hZ2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBKYW1EZWxldGVDb25maXJtYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEphbURlbGV0ZUNvbmZpcm1hdGlvbk1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTmd4VXBsb2FkZXJNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbVXBsb2FkQ29tcG9uZW50LCBQaWN0dXJlTWFuYWdlckNvbXBvbmVudCwgR2FsbGVyeU1hbmFnZXJDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtQaWN0dXJlTWFuYWdlckNvbXBvbmVudCwgR2FsbGVyeU1hbmFnZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbVBpY3R1cmVNYW5hZ2VyTW9kdWxlIHt9XG4iXX0=