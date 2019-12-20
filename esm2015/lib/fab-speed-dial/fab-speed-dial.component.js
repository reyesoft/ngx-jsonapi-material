import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
export class FabSpeedDialComponent {
    constructor(activatedRoute) {
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
    ngOnInit() {
        if (!this.queryParams) {
            this.queryParams = this.activatedRoute.snapshot.queryParams;
        }
    }
    toggleFabStatus(status) {
        if (status === 'open') {
            this.fab_status.status = 'opened';
            this.fab_status.opened = true;
        }
        else {
            this.fab_status.status = 'closed';
            setTimeout(() => {
                if (this.fab_status.status === 'closed') {
                    this.fab_status.opened = false;
                }
            }, 300);
        }
    }
}
FabSpeedDialComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-fab-speed-dial',
                template: `<eco-fab-speed-dial
    class="rs-speed-dial--position"
    [animationMode]="animationMode"
    (mouseover)="toggleFabStatus('open')"
    (mouseleave)="toggleFabStatus('close')"
    [(open)]="fab_status.opened"
    [fixed]="true"
    >
    <eco-fab-speed-dial-trigger [spin]="spin">
        <button
            mat-fab
            matTooltipPosition="before"
            [matTooltip]="tooltip"
            (click)="fabSpeedDialClick.emit()"
            [routerLink]="routerLink || []"
            [queryParams]="queryParams"
            >
            <mat-icon>{{ fab_status.opened ? icon : 'add' }}</mat-icon>
        </button>
    </eco-fab-speed-dial-trigger>

    <eco-fab-speed-dial-actions [hidden]="!fab_status.opened">
        <button
            *ngFor="let fabSpeedDialMiniButton of fabSpeedDialMiniButtons"
            mat-mini-fab
            matTooltipPosition="before"
            [matTooltip]="fabSpeedDialMiniButton.tooltip"
            (click)="actionsClick.emit(fabSpeedDialMiniButton.key)"
            [routerLink]="fabSpeedDialMiniButton.router_link || []"
            [queryParams]="fabSpeedDialMiniButton.query_params || queryParams"
            >
            <mat-icon *ngIf="fabSpeedDialMiniButton.icon.type === 'svg-icon'" [svgIcon]="fabSpeedDialMiniButton.icon.name"></mat-icon>
            <mat-icon *ngIf="fabSpeedDialMiniButton.icon.type === 'mat-icon'">{{ fabSpeedDialMiniButton.icon.name }}</mat-icon>
        </button>
    </eco-fab-speed-dial-actions>
</eco-fab-speed-dial>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
FabSpeedDialComponent.ctorParameters = () => [
    { type: ActivatedRoute }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFiLXNwZWVkLWRpYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmFiLXNwZWVkLWRpYWwvZmFiLXNwZWVkLWRpYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBNENqRCxNQUFNLE9BQU8scUJBQXFCO0lBa0I5QixZQUEyQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFoQnpDLGtCQUFhLEdBQVcsT0FBTyxDQUFDO1FBQ2hDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixTQUFJLEdBQVcsS0FBSyxDQUFDO1FBQ3JCLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBRS9CLDRCQUF1QixHQUFrQyxFQUFFLENBQUM7UUFFM0Qsc0JBQWlCLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0QsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxlQUFVLEdBQUc7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsUUFBUTtTQUNuQixDQUFDO0lBRTBELENBQUM7SUFFdEQsUUFBUTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUVNLGVBQWUsQ0FBQyxNQUFNO1FBQ3pCLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDbEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtvQkFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUNsQztZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYO0lBQ0wsQ0FBQzs7O1lBL0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9DYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDZjs7OztZQTNDUSxjQUFjOzs7NEJBOENsQixLQUFLO3NCQUNMLEtBQUs7bUJBQ0wsS0FBSzttQkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSztzQ0FDTCxLQUFLO2dDQUVMLE1BQU07MkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZhYlNwZWVkRGlhbE1pbmlCdXR0b24gfSBmcm9tICcuL2ZhYi1zcGVlZC1kaWFsLW1pbmktYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmFiLXNwZWVkLWRpYWwnLFxuICAgIHRlbXBsYXRlOiBgPGVjby1mYWItc3BlZWQtZGlhbFxuICAgIGNsYXNzPVwicnMtc3BlZWQtZGlhbC0tcG9zaXRpb25cIlxuICAgIFthbmltYXRpb25Nb2RlXT1cImFuaW1hdGlvbk1vZGVcIlxuICAgIChtb3VzZW92ZXIpPVwidG9nZ2xlRmFiU3RhdHVzKCdvcGVuJylcIlxuICAgIChtb3VzZWxlYXZlKT1cInRvZ2dsZUZhYlN0YXR1cygnY2xvc2UnKVwiXG4gICAgWyhvcGVuKV09XCJmYWJfc3RhdHVzLm9wZW5lZFwiXG4gICAgW2ZpeGVkXT1cInRydWVcIlxuICAgID5cbiAgICA8ZWNvLWZhYi1zcGVlZC1kaWFsLXRyaWdnZXIgW3NwaW5dPVwic3BpblwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYXQtZmFiXG4gICAgICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwidG9vbHRpcFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZmFiU3BlZWREaWFsQ2xpY2suZW1pdCgpXCJcbiAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmsgfHwgW11cIlxuICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cInF1ZXJ5UGFyYW1zXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj57eyBmYWJfc3RhdHVzLm9wZW5lZCA/IGljb24gOiAnYWRkJyB9fTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZWNvLWZhYi1zcGVlZC1kaWFsLXRyaWdnZXI+XG5cbiAgICA8ZWNvLWZhYi1zcGVlZC1kaWFsLWFjdGlvbnMgW2hpZGRlbl09XCIhZmFiX3N0YXR1cy5vcGVuZWRcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGZhYlNwZWVkRGlhbE1pbmlCdXR0b24gb2YgZmFiU3BlZWREaWFsTWluaUJ1dHRvbnNcIlxuICAgICAgICAgICAgbWF0LW1pbmktZmFiXG4gICAgICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi50b29sdGlwXCJcbiAgICAgICAgICAgIChjbGljayk9XCJhY3Rpb25zQ2xpY2suZW1pdChmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmtleSlcIlxuICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5yb3V0ZXJfbGluayB8fCBbXVwiXG4gICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5xdWVyeV9wYXJhbXMgfHwgcXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5pY29uLnR5cGUgPT09ICdzdmctaWNvbidcIiBbc3ZnSWNvbl09XCJmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmljb24ubmFtZVwiPjwvbWF0LWljb24+XG4gICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmljb24udHlwZSA9PT0gJ21hdC1pY29uJ1wiPnt7IGZhYlNwZWVkRGlhbE1pbmlCdXR0b24uaWNvbi5uYW1lIH19PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9lY28tZmFiLXNwZWVkLWRpYWwtYWN0aW9ucz5cbjwvZWNvLWZhYi1zcGVlZC1kaWFsPlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRmFiU3BlZWREaWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBhbmltYXRpb25Nb2RlOiBzdHJpbmcgPSAnc2NhbGUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0b29sdGlwOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoKSBwdWJsaWMgc3BpbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcHVibGljIGljb246IHN0cmluZyA9ICdhZGQnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByb3V0ZXJMaW5rOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZmFiU3BlZWREaWFsTWluaUJ1dHRvbnM6IEFycmF5PEZhYlNwZWVkRGlhbE1pbmlCdXR0b24+ID0gW107XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGZhYlNwZWVkRGlhbENsaWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBhY3Rpb25zQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGZhYl9zdGF0dXMgPSB7XG4gICAgICAgIG9wZW5lZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogJ2Nsb3NlZCdcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMucXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUZhYlN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMuc3RhdHVzID0gJ29wZW5lZCc7XG4gICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFiX3N0YXR1cy5zdGF0dXMgPSAnY2xvc2VkJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhYl9zdGF0dXMuc3RhdHVzID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19