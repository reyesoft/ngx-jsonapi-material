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
var JamSelectionBarModule = /** @class */ (function () {
    function JamSelectionBarModule() {
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
    return JamSelectionBarModule;
}());
export { JamSelectionBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQzdHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRTlGO0lBQUE7SUFZb0MsQ0FBQzs7Z0JBWnBDLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixZQUFZO3FCQUNmO29CQUNELFNBQVMsRUFBRSxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLENBQUM7b0JBQ3hELFlBQVksRUFBRSxDQUFDLDhCQUE4QixFQUFFLHlCQUF5QixDQUFDO29CQUN6RSxPQUFPLEVBQUUsQ0FBRSw4QkFBOEIsRUFBRSx5QkFBeUIsQ0FBQztpQkFDeEU7O0lBQ21DLDRCQUFDO0NBQUEsQUFackMsSUFZcUM7U0FBeEIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZpbHRlclBpcGUgfSBmcm9tICcuLi9zZWFyY2gtaW5wdXQvc2VhcmNoLXRleHQucGlwZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFNlbGVjdGlvbkJhclNlcnZpY2UgfSBmcm9tICcuL3NlbGVjdGlvbi1iYXIuc2VydmljZSc7XG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi9kb20uc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25CYXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdGlvbi1iYXItY29udGFpbmVyL3NlbGVjdGlvbi1iYXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3Rpb25CYXJJbmZvQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Rpb24tYmFyLWluZm8vc2VsZWN0aW9uLWJhci1pbmZvLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtGaWx0ZXJQaXBlLCBTZWxlY3Rpb25CYXJTZXJ2aWNlLCBEb21TZXJ2aWNlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTZWxlY3Rpb25CYXJDb250YWluZXJDb21wb25lbnQsIFNlbGVjdGlvbkJhckluZm9Db21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFsgU2VsZWN0aW9uQmFyQ29udGFpbmVyQ29tcG9uZW50LCBTZWxlY3Rpb25CYXJJbmZvQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1TZWxlY3Rpb25CYXJNb2R1bGUge31cbiJdfQ==