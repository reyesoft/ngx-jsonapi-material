import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var FabSpeedDialComponent = /** @class */ (function () {
    function FabSpeedDialComponent(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.animationMode = 'scale';
        this.tooltip = '';
        this.spin = true;
        this.icon = 'add';
        this.routerLink = [];
        this.fabSpeedDialMiniButtons = [];
        this.fabSpeedDialClick = new EventEmitter();
        this.actionsClick = new EventEmitter();
        this.fab_status = {
            opened: false,
            status: 'closed'
        };
    }
    FabSpeedDialComponent.prototype.ngOnInit = function () {
        if (!this.queryParams) {
            this.queryParams = this.activatedRoute.snapshot.queryParams;
        }
    };
    FabSpeedDialComponent.prototype.toggleFabStatus = function (status) {
        var _this = this;
        if (status === 'open') {
            this.fab_status.status = 'opened';
            this.fab_status.opened = true;
        }
        else {
            this.fab_status.status = 'closed';
            setTimeout(function () {
                if (_this.fab_status.status === 'closed') {
                    _this.fab_status.opened = false;
                }
            }, 300);
        }
    };
    FabSpeedDialComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-fab-speed-dial',
                    template: "<eco-fab-speed-dial\n    class=\"rs-speed-dial--position\"\n    [animationMode]=\"animationMode\"\n    (mouseover)=\"toggleFabStatus('open')\"\n    (mouseleave)=\"toggleFabStatus('close')\"\n    [(open)]=\"fab_status.opened\"\n    [fixed]=\"true\"\n    >\n    <eco-fab-speed-dial-trigger [spin]=\"spin\">\n        <button\n            mat-fab\n            matTooltipPosition=\"before\"\n            [matTooltip]=\"tooltip\"\n            (click)=\"fabSpeedDialClick.emit()\"\n            [routerLink]=\"routerLink || []\"\n            [queryParams]=\"queryParams\"\n            >\n            <mat-icon>{{ fab_status.opened ? icon : 'add' }}</mat-icon>\n        </button>\n    </eco-fab-speed-dial-trigger>\n\n    <eco-fab-speed-dial-actions [hidden]=\"!fab_status.opened\">\n        <button\n            *ngFor=\"let fabSpeedDialMiniButton of fabSpeedDialMiniButtons\"\n            mat-mini-fab\n            matTooltipPosition=\"before\"\n            [matTooltip]=\"fabSpeedDialMiniButton.tooltip\"\n            (click)=\"actionsClick.emit(fabSpeedDialMiniButton.key)\"\n            [routerLink]=\"fabSpeedDialMiniButton.router_link || []\"\n            [queryParams]=\"fabSpeedDialMiniButton.query_params || queryParams\"\n            >\n            <mat-icon *ngIf=\"fabSpeedDialMiniButton.icon.type === 'svg-icon'\" [svgIcon]=\"fabSpeedDialMiniButton.icon.name\"></mat-icon>\n            <mat-icon *ngIf=\"fabSpeedDialMiniButton.icon.type === 'mat-icon'\">{{ fabSpeedDialMiniButton.icon.name }}</mat-icon>\n        </button>\n    </eco-fab-speed-dial-actions>\n</eco-fab-speed-dial>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    FabSpeedDialComponent.ctorParameters = function () { return [
        { type: ActivatedRoute }
    ]; };
    FabSpeedDialComponent.propDecorators = {
        animationMode: [{ type: Input }],
        tooltip: [{ type: Input }],
        spin: [{ type: Input }],
        icon: [{ type: Input }],
        routerLink: [{ type: Input }],
        queryParams: [{ type: Input }],
        fabSpeedDialMiniButtons: [{ type: Input }],
        fabSpeedDialClick: [{ type: Output }],
        actionsClick: [{ type: Output }]
    };
    return FabSpeedDialComponent;
}());
export { FabSpeedDialComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFiLXNwZWVkLWRpYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmFiLXNwZWVkLWRpYWwvZmFiLXNwZWVkLWRpYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR2pEO0lBMkRJLCtCQUEyQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFoQnpDLGtCQUFhLEdBQVcsT0FBTyxDQUFDO1FBQ2hDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixTQUFJLEdBQVcsS0FBSyxDQUFDO1FBQ3JCLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBRS9CLDRCQUF1QixHQUFrQyxFQUFFLENBQUM7UUFFM0Qsc0JBQWlCLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0QsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxlQUFVLEdBQUc7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsUUFBUTtTQUNuQixDQUFDO0lBRTBELENBQUM7SUFFdEQsd0NBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUVNLCtDQUFlLEdBQXRCLFVBQXVCLE1BQU07UUFBN0IsaUJBWUM7UUFYRyxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNqQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ2xDLFVBQVUsQ0FBQztnQkFDUCxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtvQkFDckMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUNsQztZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYO0lBQ0wsQ0FBQzs7Z0JBL0VKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUscWpEQW9DYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2Y7Ozs7Z0JBM0NRLGNBQWM7OztnQ0E4Q2xCLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzBDQUNMLEtBQUs7b0NBRUwsTUFBTTsrQkFDTixNQUFNOztJQTZCWCw0QkFBQztDQUFBLEFBakZELElBaUZDO1NBeENZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZhYlNwZWVkRGlhbE1pbmlCdXR0b24gfSBmcm9tICcuL2ZhYi1zcGVlZC1kaWFsLW1pbmktYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmFiLXNwZWVkLWRpYWwnLFxuICAgIHRlbXBsYXRlOiBgPGVjby1mYWItc3BlZWQtZGlhbFxuICAgIGNsYXNzPVwicnMtc3BlZWQtZGlhbC0tcG9zaXRpb25cIlxuICAgIFthbmltYXRpb25Nb2RlXT1cImFuaW1hdGlvbk1vZGVcIlxuICAgIChtb3VzZW92ZXIpPVwidG9nZ2xlRmFiU3RhdHVzKCdvcGVuJylcIlxuICAgIChtb3VzZWxlYXZlKT1cInRvZ2dsZUZhYlN0YXR1cygnY2xvc2UnKVwiXG4gICAgWyhvcGVuKV09XCJmYWJfc3RhdHVzLm9wZW5lZFwiXG4gICAgW2ZpeGVkXT1cInRydWVcIlxuICAgID5cbiAgICA8ZWNvLWZhYi1zcGVlZC1kaWFsLXRyaWdnZXIgW3NwaW5dPVwic3BpblwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYXQtZmFiXG4gICAgICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwidG9vbHRpcFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZmFiU3BlZWREaWFsQ2xpY2suZW1pdCgpXCJcbiAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmsgfHwgW11cIlxuICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cInF1ZXJ5UGFyYW1zXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj57eyBmYWJfc3RhdHVzLm9wZW5lZCA/IGljb24gOiAnYWRkJyB9fTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZWNvLWZhYi1zcGVlZC1kaWFsLXRyaWdnZXI+XG5cbiAgICA8ZWNvLWZhYi1zcGVlZC1kaWFsLWFjdGlvbnMgW2hpZGRlbl09XCIhZmFiX3N0YXR1cy5vcGVuZWRcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGZhYlNwZWVkRGlhbE1pbmlCdXR0b24gb2YgZmFiU3BlZWREaWFsTWluaUJ1dHRvbnNcIlxuICAgICAgICAgICAgbWF0LW1pbmktZmFiXG4gICAgICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi50b29sdGlwXCJcbiAgICAgICAgICAgIChjbGljayk9XCJhY3Rpb25zQ2xpY2suZW1pdChmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmtleSlcIlxuICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5yb3V0ZXJfbGluayB8fCBbXVwiXG4gICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5xdWVyeV9wYXJhbXMgfHwgcXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5pY29uLnR5cGUgPT09ICdzdmctaWNvbidcIiBbc3ZnSWNvbl09XCJmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmljb24ubmFtZVwiPjwvbWF0LWljb24+XG4gICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmljb24udHlwZSA9PT0gJ21hdC1pY29uJ1wiPnt7IGZhYlNwZWVkRGlhbE1pbmlCdXR0b24uaWNvbi5uYW1lIH19PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9lY28tZmFiLXNwZWVkLWRpYWwtYWN0aW9ucz5cbjwvZWNvLWZhYi1zcGVlZC1kaWFsPlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRmFiU3BlZWREaWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBhbmltYXRpb25Nb2RlOiBzdHJpbmcgPSAnc2NhbGUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0b29sdGlwOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoKSBwdWJsaWMgc3BpbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcHVibGljIGljb246IHN0cmluZyA9ICdhZGQnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByb3V0ZXJMaW5rOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZmFiU3BlZWREaWFsTWluaUJ1dHRvbnM6IEFycmF5PEZhYlNwZWVkRGlhbE1pbmlCdXR0b24+ID0gW107XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGZhYlNwZWVkRGlhbENsaWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBhY3Rpb25zQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGZhYl9zdGF0dXMgPSB7XG4gICAgICAgIG9wZW5lZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogJ2Nsb3NlZCdcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMucXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUZhYlN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMuc3RhdHVzID0gJ29wZW5lZCc7XG4gICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFiX3N0YXR1cy5zdGF0dXMgPSAnY2xvc2VkJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhYl9zdGF0dXMuc3RhdHVzID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19