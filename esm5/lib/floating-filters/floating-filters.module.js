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
var JamFloatingFiltersModule = /** @class */ (function () {
    function JamFloatingFiltersModule() {
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
    return JamFloatingFiltersModule;
}());
export { JamFloatingFiltersModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctZmlsdGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9mbG9hdGluZy1maWx0ZXJzL2Zsb2F0aW5nLWZpbHRlcnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7SUFBQTtJQVl1QyxDQUFDOztnQkFadkMsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsWUFBWTtxQkFDZjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSwyQkFBMkIsQ0FBQztvQkFDckUsT0FBTyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsMkJBQTJCLENBQUM7aUJBQ25FOztJQUNzQywrQkFBQztDQUFBLEFBWnhDLElBWXdDO1NBQTNCLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsb2F0aW5nRmlsdGVyc0NvbXBvbmVudCB9IGZyb20gJy4vZmxvYXRpbmctZmlsdGVycy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXZvaWREaXNhYmxlZFN0eWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9hdm9pZC1kaXNhYmxlZC1zdHlsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0Zsb2F0aW5nRmlsdGVyc0NvbXBvbmVudCwgQXZvaWREaXNhYmxlZFN0eWxlRGlyZWN0aXZlXSxcbiAgICBleHBvcnRzOiBbRmxvYXRpbmdGaWx0ZXJzQ29tcG9uZW50LCBBdm9pZERpc2FibGVkU3R5bGVEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIEphbUZsb2F0aW5nRmlsdGVyc01vZHVsZSB7fVxuIl19