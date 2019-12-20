/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { FilterPipe } from '../search-input/search-text.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SelectionBarService } from './selection-bar.service';
import { DomService } from './dom.service';
import { SelectionBarContainerComponent } from './selection-bar-container/selection-bar-container.component';
import { SelectionBarInfoComponent } from './selection-bar-info/selection-bar-info.component';
export class JamSelectionBarModule {
}
JamSelectionBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule,
                    FlexLayoutModule,
                    MatButtonModule,
                    MatIconModule,
                    CommonModule
                ],
                providers: [FilterPipe, SelectionBarService, DomService],
                declarations: [SelectionBarContainerComponent, SelectionBarInfoComponent],
                exports: [SelectionBarContainerComponent, SelectionBarInfoComponent]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQzdHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBYzlGLE1BQU0sT0FBTyxxQkFBcUI7OztZQVpqQyxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsWUFBWTtpQkFDZjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxDQUFDO2dCQUN4RCxZQUFZLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSx5QkFBeUIsQ0FBQztnQkFDekUsT0FBTyxFQUFFLENBQUUsOEJBQThCLEVBQUUseUJBQXlCLENBQUM7YUFDeEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmlsdGVyUGlwZSB9IGZyb20gJy4uL3NlYXJjaC1pbnB1dC9zZWFyY2gtdGV4dC5waXBlJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2VsZWN0aW9uQmFyU2VydmljZSB9IGZyb20gJy4vc2VsZWN0aW9uLWJhci5zZXJ2aWNlJztcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL2RvbS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvbkJhckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0aW9uLWJhci1jb250YWluZXIvc2VsZWN0aW9uLWJhci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdGlvbkJhckluZm9Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdGlvbi1iYXItaW5mby9zZWxlY3Rpb24tYmFyLWluZm8uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW0ZpbHRlclBpcGUsIFNlbGVjdGlvbkJhclNlcnZpY2UsIERvbVNlcnZpY2VdLFxuICAgIGRlY2xhcmF0aW9uczogW1NlbGVjdGlvbkJhckNvbnRhaW5lckNvbXBvbmVudCwgU2VsZWN0aW9uQmFySW5mb0NvbXBvbmVudF0sXG4gICAgZXhwb3J0czogWyBTZWxlY3Rpb25CYXJDb250YWluZXJDb21wb25lbnQsIFNlbGVjdGlvbkJhckluZm9Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbVNlbGVjdGlvbkJhck1vZHVsZSB7fVxuIl19