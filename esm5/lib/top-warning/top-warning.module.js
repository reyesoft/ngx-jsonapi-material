/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatExpansionModule, MatIconModule, MatButtonModule, MatDividerModule, MatCardModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TopWarningComponent } from './top-warning.component';
import { SingleWarningComponent } from './single-warning/single-warning.component';
import { TopWarningService } from './top-warning.service';
import { FlexLayoutModule } from '@angular/flex-layout';
var JamTopWarningModule = /** @class */ (function () {
    function JamTopWarningModule() {
    }
    JamTopWarningModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MatFormFieldModule,
                        MatExpansionModule,
                        MatCardModule,
                        MatIconModule,
                        FlexLayoutModule,
                        MatButtonModule,
                        MatDividerModule,
                        // ReactiveFormsModule,
                        MatTooltipModule,
                        FormsModule,
                        RouterModule,
                        CommonModule
                    ],
                    declarations: [TopWarningComponent, SingleWarningComponent],
                    providers: [TopWarningService],
                    exports: [TopWarningComponent, SingleWarningComponent]
                },] },
    ];
    return JamTopWarningModule;
}());
export { JamTopWarningModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLXdhcm5pbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvdG9wLXdhcm5pbmcvdG9wLXdhcm5pbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhEO0lBQUE7SUFtQmtDLENBQUM7O2dCQW5CbEMsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLHVCQUF1Qjt3QkFDdkIsZ0JBQWdCO3dCQUNoQixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osWUFBWTtxQkFDZjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxzQkFBc0IsQ0FBQztvQkFDM0QsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQzlCLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLHNCQUFzQixDQUFDO2lCQUN6RDs7SUFDaUMsMEJBQUM7Q0FBQSxBQW5CbkMsSUFtQm1DO1NBQXRCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdEV4cGFuc2lvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgVG9wV2FybmluZ0NvbXBvbmVudCB9IGZyb20gJy4vdG9wLXdhcm5pbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFNpbmdsZVdhcm5pbmdDb21wb25lbnQgfSBmcm9tICcuL3NpbmdsZS13YXJuaW5nL3NpbmdsZS13YXJuaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb3BXYXJuaW5nU2VydmljZSB9IGZyb20gJy4vdG9wLXdhcm5pbmcuc2VydmljZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICAgICAgLy8gUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUb3BXYXJuaW5nQ29tcG9uZW50LCBTaW5nbGVXYXJuaW5nQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtUb3BXYXJuaW5nU2VydmljZV0sXG4gICAgZXhwb3J0czogW1RvcFdhcm5pbmdDb21wb25lbnQsIFNpbmdsZVdhcm5pbmdDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbVRvcFdhcm5pbmdNb2R1bGUge31cbiJdfQ==