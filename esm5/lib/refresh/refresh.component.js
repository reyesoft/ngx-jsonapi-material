/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter, Injectable, ChangeDetectorRef } from '@angular/core';
import { Destroyer } from '../destroyer';
import { Service, DocumentCollection } from 'ngx-jsonapi';
import { Subject } from 'rxjs';
var JamRefreshService = /** @class */ (function () {
    function JamRefreshService() {
        this.collection_to_refresh = new Subject();
        this.refreshSubject = new Subject();
    }
    JamRefreshService.prototype.refresh = function () {
        this.refreshSubject.next(true);
    };
    JamRefreshService.decorators = [
        { type: Injectable },
    ];
    return JamRefreshService;
}());
export { JamRefreshService };
var RefreshComponent = /** @class */ (function () {
    function RefreshComponent(changeDetectorRef, jamRefreshService) {
        this.changeDetectorRef = changeDetectorRef;
        this.jamRefreshService = jamRefreshService;
        this.colorProgressCircular = 'white';
        this.reload = new EventEmitter();
        this.destroyer = new Destroyer();
    }
    RefreshComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.collectionToRefresh) {
            this.jamRefreshService.collection_to_refresh.pipe(this.destroyer.pipe()).subscribe(function (collection) {
                _this.collectionToRefresh = collection;
                _this.changeDetectorRef.detectChanges();
            });
        }
    };
    RefreshComponent.prototype.ngOnDestroy = function () {
        this.destroyer.destroy();
    };
    RefreshComponent.prototype.refreshCollection = function () {
        this.serviceToRefresh.clearCacheMemory();
        this.jamRefreshService.refresh();
    };
    RefreshComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-refresh',
                    template: "<button\n    *ngIf=\"collectionToRefresh\"\n    mat-icon-button\n    matTooltip=\"Actualizar\"\n    mat-ink-ripple=\"false\"\n    class=\"mat-icon-button mat-button\"\n    (click)=\"refreshCollection()\"\n    fxLayout=\"row\"\n    fxLayoutAlign=\"center center\"\n    >\n    <mat-icon\n        *ngIf=\"!collectionToRefresh.is_loading\"\n        class=\"material-icons\"\n        >\n        {{ icon || 'refresh' }}\n    </mat-icon>\n    <mat-spinner\n        class=\"material-icons elements-up padding-0 margin-0\"\n        *ngIf=\"collectionToRefresh.is_loading\"\n        color=\"accent\"\n        diameter=\"24\"\n        >\n    </mat-spinner>\n</button>\n"
                },] },
    ];
    /** @nocollapse */
    RefreshComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: JamRefreshService }
    ]; };
    RefreshComponent.propDecorators = {
        collectionToRefresh: [{ type: Input }],
        serviceToRefresh: [{ type: Input }],
        colorProgressCircular: [{ type: Input }],
        icon: [{ type: Input }],
        reload: [{ type: Output }]
    };
    return RefreshComponent;
}());
export { RefreshComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9yZWZyZXNoL3JlZnJlc2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQXFCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQWUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTVDO0lBQUE7UUFFVywwQkFBcUIsR0FBRyxJQUFJLE9BQU8sRUFBc0IsQ0FBQztRQUMxRCxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFLbkQsQ0FBQztJQUhVLG1DQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOztnQkFQSixVQUFVOztJQVFYLHdCQUFDO0NBQUEsQUFSRCxJQVFDO1NBUFksaUJBQWlCO0FBUzlCO0lBcUNJLDBCQUEwQixpQkFBb0MsRUFBUyxpQkFBb0M7UUFBakYsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFOM0YsMEJBQXFCLEdBQUcsT0FBTyxDQUFDO1FBRS9CLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTNDLGNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBRTJFLENBQUM7SUFFeEcsbUNBQVEsR0FBZjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxVQUE4QjtnQkFDOUcsS0FBSSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztnQkFDdEMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU0sc0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSw0Q0FBaUIsR0FBeEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Z0JBdkRKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLG9wQkF3QmI7aUJBQ0E7Ozs7Z0JBMUMrRSxpQkFBaUI7Z0JBb0RILGlCQUFpQjs7O3NDQVIxRyxLQUFLO21DQUNMLEtBQUs7d0NBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLE1BQU07O0lBdUJYLHVCQUFDO0NBQUEsQUF4REQsSUF3REM7U0E1QlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTcgUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIE9uSW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVzdHJveWVyIH0gZnJvbSAnLi4vZGVzdHJveWVyJztcbmltcG9ydCB7IFNlcnZpY2UsIERvY3VtZW50Q29sbGVjdGlvbiB9IGZyb20gJ25neC1qc29uYXBpJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKYW1SZWZyZXNoU2VydmljZSB7XG4gICAgcHVibGljIGNvbGxlY3Rpb25fdG9fcmVmcmVzaCA9IG5ldyBTdWJqZWN0PERvY3VtZW50Q29sbGVjdGlvbj4oKTtcbiAgICBwdWJsaWMgcmVmcmVzaFN1YmplY3QgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgcHVibGljIHJlZnJlc2goKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaFN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXJlZnJlc2gnLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvblxuICAgICpuZ0lmPVwiY29sbGVjdGlvblRvUmVmcmVzaFwiXG4gICAgbWF0LWljb24tYnV0dG9uXG4gICAgbWF0VG9vbHRpcD1cIkFjdHVhbGl6YXJcIlxuICAgIG1hdC1pbmstcmlwcGxlPVwiZmFsc2VcIlxuICAgIGNsYXNzPVwibWF0LWljb24tYnV0dG9uIG1hdC1idXR0b25cIlxuICAgIChjbGljayk9XCJyZWZyZXNoQ29sbGVjdGlvbigpXCJcbiAgICBmeExheW91dD1cInJvd1wiXG4gICAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgID5cbiAgICA8bWF0LWljb25cbiAgICAgICAgKm5nSWY9XCIhY29sbGVjdGlvblRvUmVmcmVzaC5pc19sb2FkaW5nXCJcbiAgICAgICAgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgID5cbiAgICAgICAge3sgaWNvbiB8fCAncmVmcmVzaCcgfX1cbiAgICA8L21hdC1pY29uPlxuICAgIDxtYXQtc3Bpbm5lclxuICAgICAgICBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGVsZW1lbnRzLXVwIHBhZGRpbmctMCBtYXJnaW4tMFwiXG4gICAgICAgICpuZ0lmPVwiY29sbGVjdGlvblRvUmVmcmVzaC5pc19sb2FkaW5nXCJcbiAgICAgICAgY29sb3I9XCJhY2NlbnRcIlxuICAgICAgICBkaWFtZXRlcj1cIjI0XCJcbiAgICAgICAgPlxuICAgIDwvbWF0LXNwaW5uZXI+XG48L2J1dHRvbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgUmVmcmVzaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgY29sbGVjdGlvblRvUmVmcmVzaDogRG9jdW1lbnRDb2xsZWN0aW9uO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXJ2aWNlVG9SZWZyZXNoOiBTZXJ2aWNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb2xvclByb2dyZXNzQ2lyY3VsYXIgPSAnd2hpdGUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpY29uOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZWxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBkZXN0cm95ZXIgPSBuZXcgRGVzdHJveWVyKCk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGphbVJlZnJlc2hTZXJ2aWNlOiBKYW1SZWZyZXNoU2VydmljZSkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3Rpb25Ub1JlZnJlc2gpIHtcbiAgICAgICAgICAgIHRoaXMuamFtUmVmcmVzaFNlcnZpY2UuY29sbGVjdGlvbl90b19yZWZyZXNoLnBpcGUodGhpcy5kZXN0cm95ZXIucGlwZSgpKS5zdWJzY3JpYmUoKGNvbGxlY3Rpb246IERvY3VtZW50Q29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvblRvUmVmcmVzaCA9IGNvbGxlY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWZyZXNoQ29sbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlVG9SZWZyZXNoLmNsZWFyQ2FjaGVNZW1vcnkoKTtcbiAgICAgICAgdGhpcy5qYW1SZWZyZXNoU2VydmljZS5yZWZyZXNoKCk7XG4gICAgfVxufVxuIl19