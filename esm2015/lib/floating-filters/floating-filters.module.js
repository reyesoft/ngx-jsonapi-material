/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { FloatingFiltersComponent } from './floating-filters.component';
import { AvoidDisabledStyleDirective } from './avoid-disabled-style.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
export class JamFloatingFiltersModule {
}
JamFloatingFiltersModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatExpansionModule,
                    MatButtonModule,
                    MatTooltipModule,
                    MatIconModule,
                    FlexLayoutModule,
                    CommonModule
                ],
                declarations: [FloatingFiltersComponent, AvoidDisabledStyleDirective],
                exports: [FloatingFiltersComponent, AvoidDisabledStyleDirective]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctZmlsdGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9mbG9hdGluZy1maWx0ZXJzL2Zsb2F0aW5nLWZpbHRlcnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFjeEQsTUFBTSxPQUFPLHdCQUF3Qjs7O1lBWnBDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsa0JBQWtCO29CQUNsQixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLFlBQVk7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsMkJBQTJCLENBQUM7Z0JBQ3JFLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixFQUFFLDJCQUEyQixDQUFDO2FBQ25FIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEV4cGFuc2lvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxvYXRpbmdGaWx0ZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9mbG9hdGluZy1maWx0ZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdm9pZERpc2FibGVkU3R5bGVEaXJlY3RpdmUgfSBmcm9tICcuL2F2b2lkLWRpc2FibGVkLXN0eWxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbRmxvYXRpbmdGaWx0ZXJzQ29tcG9uZW50LCBBdm9pZERpc2FibGVkU3R5bGVEaXJlY3RpdmVdLFxuICAgIGV4cG9ydHM6IFtGbG9hdGluZ0ZpbHRlcnNDb21wb25lbnQsIEF2b2lkRGlzYWJsZWRTdHlsZURpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgSmFtRmxvYXRpbmdGaWx0ZXJzTW9kdWxlIHt9XG4iXX0=