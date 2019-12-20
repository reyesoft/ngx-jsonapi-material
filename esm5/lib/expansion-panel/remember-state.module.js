/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RemembermeStateDirective } from './remember-state.directive';
var JamRememberStateModule = /** @class */ (function () {
    function JamRememberStateModule() {
    }
    JamRememberStateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MatExpansionModule,
                        CommonModule,
                        RouterModule
                    ],
                    declarations: [RemembermeStateDirective],
                    exports: [RemembermeStateDirective]
                },] },
    ];
    return JamRememberStateModule;
}());
export { JamRememberStateModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtZW1iZXItc3RhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZXhwYW5zaW9uLXBhbmVsL3JlbWVtYmVyLXN0YXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdEU7SUFBQTtJQVNxQyxDQUFDOztnQkFUckMsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osWUFBWTtxQkFDZjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDeEMsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7aUJBQ3RDOztJQUNvQyw2QkFBQztDQUFBLEFBVHRDLElBU3NDO1NBQXpCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUmVtZW1iZXJtZVN0YXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9yZW1lbWJlci1zdGF0ZS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUmVtZW1iZXJtZVN0YXRlRGlyZWN0aXZlXSxcbiAgICBleHBvcnRzOiBbUmVtZW1iZXJtZVN0YXRlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBKYW1SZW1lbWJlclN0YXRlTW9kdWxlIHt9XG4iXX0=