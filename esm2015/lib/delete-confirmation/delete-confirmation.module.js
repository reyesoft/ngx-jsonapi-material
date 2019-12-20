/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
export class JamDeleteConfirmationModule {
}
JamDeleteConfirmationModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatTooltipModule,
                    MatDialogModule,
                    MatButtonModule,
                    MatIconModule,
                    FlexLayoutModule,
                    CommonModule
                ],
                declarations: [DeleteConfirmationComponent, ConfirmationDialogComponent],
                entryComponents: [ConfirmationDialogComponent],
                exports: [DeleteConfirmationComponent, ConfirmationDialogComponent]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbmZpcm1hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBZWxHLE1BQU0sT0FBTywyQkFBMkI7OztZQWJ2QyxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixZQUFZO2lCQUNmO2dCQUNELFlBQVksRUFBRSxDQUFDLDJCQUEyQixFQUFFLDJCQUEyQixDQUFDO2dCQUN4RSxlQUFlLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztnQkFDOUMsT0FBTyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsMkJBQTJCLENBQUM7YUFDdEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9kZWxldGUtY29uZmlybWF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpcm1hdGlvbi1kaWFsb2cvY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50LCBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnRdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0NvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW0RlbGV0ZUNvbmZpcm1hdGlvbkNvbXBvbmVudCwgQ29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1EZWxldGVDb25maXJtYXRpb25Nb2R1bGUge31cbiJdfQ==