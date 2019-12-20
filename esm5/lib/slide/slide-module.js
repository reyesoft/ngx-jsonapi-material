/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { JamSlide } from './slide';
import { JamSlideGroup } from './slide-group';
import { JamSlideHeader } from './slide-header';
import { JamSlideElement } from './slide-element';
import { JamSlideElementWrapper } from './slide-element-wrapper';
import { A11yModule } from '@angular/cdk/a11y';
var JamSlideModule = /** @class */ (function () {
    function JamSlideModule() {
    }
    JamSlideModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatCommonModule,
                        PortalModule,
                        MatRippleModule,
                        ObserversModule,
                        A11yModule
                    ],
                    // Don't export all components because some are only to be used internally.
                    exports: [
                        MatCommonModule,
                        JamSlideGroup,
                        JamSlideElement,
                        JamSlide
                    ],
                    declarations: [
                        JamSlideGroup,
                        JamSlideElement,
                        JamSlide,
                        JamSlideElementWrapper,
                        JamSlideHeader
                    ]
                },] },
    ];
    return JamSlideModule;
}());
export { JamSlideModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvc2xpZGUvc2xpZGUtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFL0M7SUFBQTtJQXdCNkIsQ0FBQzs7Z0JBeEI3QixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixVQUFVO3FCQUNYO29CQUNELDJFQUEyRTtvQkFDM0UsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixlQUFlO3dCQUNmLFFBQVE7cUJBQ1Q7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixRQUFRO3dCQUNSLHNCQUFzQjt3QkFDdEIsY0FBYztxQkFDZjtpQkFDRjs7SUFDNEIscUJBQUM7Q0FBQSxBQXhCOUIsSUF3QjhCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgT2JzZXJ2ZXJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IEphbVNsaWRlIH0gZnJvbSAnLi9zbGlkZSc7XG5pbXBvcnQgeyBKYW1TbGlkZUdyb3VwIH0gZnJvbSAnLi9zbGlkZS1ncm91cCc7XG5pbXBvcnQgeyBKYW1TbGlkZUhlYWRlciB9IGZyb20gJy4vc2xpZGUtaGVhZGVyJztcbmltcG9ydCB7IEphbVNsaWRlRWxlbWVudCB9IGZyb20gJy4vc2xpZGUtZWxlbWVudCc7XG5pbXBvcnQgeyBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyIH0gZnJvbSAnLi9zbGlkZS1lbGVtZW50LXdyYXBwZXInO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBPYnNlcnZlcnNNb2R1bGUsXG4gICAgQTExeU1vZHVsZVxuICBdLFxuICAvLyBEb24ndCBleHBvcnQgYWxsIGNvbXBvbmVudHMgYmVjYXVzZSBzb21lIGFyZSBvbmx5IHRvIGJlIHVzZWQgaW50ZXJuYWxseS5cbiAgZXhwb3J0czogW1xuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBKYW1TbGlkZUdyb3VwLFxuICAgIEphbVNsaWRlRWxlbWVudCxcbiAgICBKYW1TbGlkZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBKYW1TbGlkZUdyb3VwLFxuICAgIEphbVNsaWRlRWxlbWVudCxcbiAgICBKYW1TbGlkZSxcbiAgICBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyLFxuICAgIEphbVNsaWRlSGVhZGVyXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVNb2R1bGUge31cbiJdfQ==