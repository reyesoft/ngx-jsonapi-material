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
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
export class JamErrorHandlerModule {
}
JamErrorHandlerModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9lcnJvci1oYW5kbGVyL2Vycm9yLWhhbmRsZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQWV4RCxNQUFNLE9BQU8scUJBQXFCOzs7WUFiakMsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxlQUFlO29CQUNmLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLFlBQVk7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7Z0JBQzFDLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDNUIsZUFBZSxFQUFFLENBQUMsMEJBQTBCLENBQUM7Z0JBQzdDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO2FBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSmFtU3VibWl0TW9kdWxlIH0gZnJvbSAnLi4vc3VibWl0L3N1Ym1pdC5tb2R1bGUnO1xuaW1wb3J0IHsgSmFtRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9lcnJvci1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnQgfSBmcm9tICcuLi9sb2dnZWQtc3RhdGUvZGlhbG9nLWxvZ2dlZC1zdGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBKYW1TdWJtaXRNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbRGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW0phbUVycm9ySGFuZGxlcl0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbRGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtRXJyb3JIYW5kbGVyTW9kdWxlIHt9XG4iXX0=