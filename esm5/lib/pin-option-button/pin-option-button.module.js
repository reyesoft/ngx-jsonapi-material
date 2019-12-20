import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { PinOptionButtonComponent } from './pin-option-button.component';
import { NgxJsonapiMaterialModule } from '../ngx-jsonapi-material.module';
var JamPinOptionButtonModule = /** @class */ (function () {
    function JamPinOptionButtonModule() {
    }
    JamPinOptionButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        NgxJsonapiMaterialModule,
                        FlexLayoutModule,
                        MatButtonModule,
                        MatIconModule,
                        MatMenuModule
                    ],
                    declarations: [PinOptionButtonComponent],
                    providers: [],
                    exports: [PinOptionButtonComponent]
                },] },
    ];
    return JamPinOptionButtonModule;
}());
export { JamPinOptionButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluLW9wdGlvbi1idXR0b24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvcGluLW9wdGlvbi1idXR0b24vcGluLW9wdGlvbi1idXR0b24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRzFFO0lBQUE7SUFhdUMsQ0FBQzs7Z0JBYnZDLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWix3QkFBd0I7d0JBQ3hCLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGFBQWE7cUJBQ2hCO29CQUNELFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO29CQUN4QyxTQUFTLEVBQUUsRUFBRTtvQkFDYixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDdEM7O0lBQ3NDLCtCQUFDO0NBQUEsQUFieEMsSUFhd0M7U0FBM0Isd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9waW4tb3B0aW9uLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4SnNvbmFwaU1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi4vbmd4LWpzb25hcGktbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBOZ3hKc29uYXBpTWF0ZXJpYWxNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtdLFxuICAgIGV4cG9ydHM6IFtQaW5PcHRpb25CdXR0b25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbVBpbk9wdGlvbkJ1dHRvbk1vZHVsZSB7fVxuIl19