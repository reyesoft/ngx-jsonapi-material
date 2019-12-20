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
var JamDeleteConfirmationModule = /** @class */ (function () {
    function JamDeleteConfirmationModule() {
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
    return JamDeleteConfirmationModule;
}());
export { JamDeleteConfirmationModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbmZpcm1hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBRWxHO0lBQUE7SUFhMEMsQ0FBQzs7Z0JBYjFDLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLFlBQVk7cUJBQ2Y7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMkJBQTJCLEVBQUUsMkJBQTJCLENBQUM7b0JBQ3hFLGVBQWUsRUFBRSxDQUFDLDJCQUEyQixDQUFDO29CQUM5QyxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSwyQkFBMkIsQ0FBQztpQkFDdEU7O0lBQ3lDLGtDQUFDO0NBQUEsQUFiM0MsSUFhMkM7U0FBOUIsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IERlbGV0ZUNvbmZpcm1hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vZGVsZXRlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maXJtYXRpb24tZGlhbG9nL2NvbmZpcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0RlbGV0ZUNvbmZpcm1hdGlvbkNvbXBvbmVudCwgQ29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtEZWxldGVDb25maXJtYXRpb25Db21wb25lbnQsIENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtRGVsZXRlQ29uZmlybWF0aW9uTW9kdWxlIHt9XG4iXX0=