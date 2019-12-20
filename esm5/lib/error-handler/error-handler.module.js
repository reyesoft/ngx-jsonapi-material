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
var JamErrorHandlerModule = /** @class */ (function () {
    function JamErrorHandlerModule() {
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
    return JamErrorHandlerModule;
}());
export { JamErrorHandlerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9lcnJvci1oYW5kbGVyL2Vycm9yLWhhbmRsZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RDtJQUFBO0lBYW9DLENBQUM7O2dCQWJwQyxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsWUFBWTtxQkFDZjtvQkFDRCxZQUFZLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDMUMsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUM1QixlQUFlLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDN0MsT0FBTyxFQUFFLENBQUMsMEJBQTBCLENBQUM7aUJBQ3hDOztJQUNtQyw0QkFBQztDQUFBLEFBYnJDLElBYXFDO1NBQXhCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEphbVN1Ym1pdE1vZHVsZSB9IGZyb20gJy4uL3N1Ym1pdC9zdWJtaXQubW9kdWxlJztcbmltcG9ydCB7IEphbUVycm9ySGFuZGxlciB9IGZyb20gJy4vZXJyb3ItaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IERpYWxvZ0xvZ2dlZFN0YXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vbG9nZ2VkLXN0YXRlL2RpYWxvZy1sb2dnZWQtc3RhdGUuY29tcG9uZW50JztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgSmFtU3VibWl0TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0RpYWxvZ0xvZ2dlZFN0YXRlQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtKYW1FcnJvckhhbmRsZXJdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0RpYWxvZ0xvZ2dlZFN0YXRlQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUVycm9ySGFuZGxlck1vZHVsZSB7fVxuIl19