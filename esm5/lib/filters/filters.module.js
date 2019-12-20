/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatDividerModule, MatOptionModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JamFilterChecksComponent } from './basics/filter-checks.component';
import { JamFilterOptionsComponent } from './basics/filter-options.component';
import { FilterPipe } from '../search-input/search-text.pipe';
import { FormsModule } from '@angular/forms';
import { JamSearchInputModule } from '../search-input/search-input.module';
var JamFilterModule = /** @class */ (function () {
    function JamFilterModule() {
    }
    JamFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        MatIconModule,
                        MatInputModule,
                        MatOptionModule,
                        MatSelectModule,
                        MatDividerModule,
                        FlexLayoutModule,
                        MatFormFieldModule,
                        JamSearchInputModule
                    ],
                    providers: [FilterPipe],
                    declarations: [JamFilterChecksComponent, JamFilterOptionsComponent],
                    exports: [JamFilterChecksComponent, JamFilterOptionsComponent]
                },] },
    ];
    return JamFilterModule;
}());
export { JamFilterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxSSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTNFO0lBQUE7SUFpQjhCLENBQUM7O2dCQWpCOUIsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxXQUFXO3dCQUNYLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixvQkFBb0I7cUJBQ3ZCO29CQUNELFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsd0JBQXdCLEVBQUUseUJBQXlCLENBQUM7b0JBQ25FLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixFQUFFLHlCQUF5QixDQUFDO2lCQUNqRTs7SUFDNkIsc0JBQUM7Q0FBQSxBQWpCL0IsSUFpQitCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRPcHRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNpY3MvZmlsdGVyLWNoZWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSmFtRmlsdGVyT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vYmFzaWNzL2ZpbHRlci1vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC10ZXh0LnBpcGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBKYW1TZWFyY2hJbnB1dE1vZHVsZSB9IGZyb20gJy4uL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBKYW1TZWFyY2hJbnB1dE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbRmlsdGVyUGlwZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50LCBKYW1GaWx0ZXJPcHRpb25zQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50LCBKYW1GaWx0ZXJPcHRpb25zQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1GaWx0ZXJNb2R1bGUge31cbiJdfQ==