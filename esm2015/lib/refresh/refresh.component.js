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
export class JamRefreshService {
    constructor() {
        this.collection_to_refresh = new Subject();
        this.refreshSubject = new Subject();
    }
    refresh() {
        this.refreshSubject.next(true);
    }
}
JamRefreshService.decorators = [
    { type: Injectable },
];
export class RefreshComponent {
    constructor(changeDetectorRef, jamRefreshService) {
        this.changeDetectorRef = changeDetectorRef;
        this.jamRefreshService = jamRefreshService;
        this.colorProgressCircular = 'white';
        this.reload = new EventEmitter();
        this.destroyer = new Destroyer();
    }
    ngOnInit() {
        if (!this.collectionToRefresh) {
            this.jamRefreshService.collection_to_refresh.pipe(this.destroyer.pipe()).subscribe((collection) => {
                this.collectionToRefresh = collection;
                this.changeDetectorRef.detectChanges();
            });
        }
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    refreshCollection() {
        this.serviceToRefresh.clearCacheMemory();
        this.jamRefreshService.refresh();
    }
}
RefreshComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-refresh',
                template: `<button
    *ngIf="collectionToRefresh"
    mat-icon-button
    matTooltip="Actualizar"
    mat-ink-ripple="false"
    class="mat-icon-button mat-button"
    (click)="refreshCollection()"
    fxLayout="row"
    fxLayoutAlign="center center"
    >
    <mat-icon
        *ngIf="!collectionToRefresh.is_loading"
        class="material-icons"
        >
        {{ icon || 'refresh' }}
    </mat-icon>
    <mat-spinner
        class="material-icons elements-up padding-0 margin-0"
        *ngIf="collectionToRefresh.is_loading"
        color="accent"
        diameter="24"
        >
    </mat-spinner>
</button>
`
            },] },
];
/** @nocollapse */
RefreshComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: JamRefreshService }
];
RefreshComponent.propDecorators = {
    collectionToRefresh: [{ type: Input }],
    serviceToRefresh: [{ type: Input }],
    colorProgressCircular: [{ type: Input }],
    icon: [{ type: Input }],
    reload: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9yZWZyZXNoL3JlZnJlc2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQXFCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQWUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE1BQU0sT0FBTyxpQkFBaUI7SUFEOUI7UUFFVywwQkFBcUIsR0FBRyxJQUFJLE9BQU8sRUFBc0IsQ0FBQztRQUMxRCxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFLbkQsQ0FBQztJQUhVLE9BQU87UUFDVixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7WUFQSixVQUFVOztBQXNDWCxNQUFNLE9BQU8sZ0JBQWdCO0lBU3pCLFlBQTBCLGlCQUFvQyxFQUFTLGlCQUFvQztRQUFqRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQU4zRiwwQkFBcUIsR0FBRyxPQUFPLENBQUM7UUFFL0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0MsY0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7SUFFMkUsQ0FBQztJQUV4RyxRQUFRO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUE4QixFQUFFLEVBQUU7Z0JBQ2xILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7OztZQXZESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0JiO2FBQ0E7Ozs7WUExQytFLGlCQUFpQjtZQW9ESCxpQkFBaUI7OztrQ0FSMUcsS0FBSzsrQkFDTCxLQUFLO29DQUNMLEtBQUs7bUJBQ0wsS0FBSztxQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTcgUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIE9uSW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVzdHJveWVyIH0gZnJvbSAnLi4vZGVzdHJveWVyJztcbmltcG9ydCB7IFNlcnZpY2UsIERvY3VtZW50Q29sbGVjdGlvbiB9IGZyb20gJ25neC1qc29uYXBpJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKYW1SZWZyZXNoU2VydmljZSB7XG4gICAgcHVibGljIGNvbGxlY3Rpb25fdG9fcmVmcmVzaCA9IG5ldyBTdWJqZWN0PERvY3VtZW50Q29sbGVjdGlvbj4oKTtcbiAgICBwdWJsaWMgcmVmcmVzaFN1YmplY3QgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgcHVibGljIHJlZnJlc2goKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaFN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXJlZnJlc2gnLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvblxuICAgICpuZ0lmPVwiY29sbGVjdGlvblRvUmVmcmVzaFwiXG4gICAgbWF0LWljb24tYnV0dG9uXG4gICAgbWF0VG9vbHRpcD1cIkFjdHVhbGl6YXJcIlxuICAgIG1hdC1pbmstcmlwcGxlPVwiZmFsc2VcIlxuICAgIGNsYXNzPVwibWF0LWljb24tYnV0dG9uIG1hdC1idXR0b25cIlxuICAgIChjbGljayk9XCJyZWZyZXNoQ29sbGVjdGlvbigpXCJcbiAgICBmeExheW91dD1cInJvd1wiXG4gICAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgID5cbiAgICA8bWF0LWljb25cbiAgICAgICAgKm5nSWY9XCIhY29sbGVjdGlvblRvUmVmcmVzaC5pc19sb2FkaW5nXCJcbiAgICAgICAgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiXG4gICAgICAgID5cbiAgICAgICAge3sgaWNvbiB8fCAncmVmcmVzaCcgfX1cbiAgICA8L21hdC1pY29uPlxuICAgIDxtYXQtc3Bpbm5lclxuICAgICAgICBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGVsZW1lbnRzLXVwIHBhZGRpbmctMCBtYXJnaW4tMFwiXG4gICAgICAgICpuZ0lmPVwiY29sbGVjdGlvblRvUmVmcmVzaC5pc19sb2FkaW5nXCJcbiAgICAgICAgY29sb3I9XCJhY2NlbnRcIlxuICAgICAgICBkaWFtZXRlcj1cIjI0XCJcbiAgICAgICAgPlxuICAgIDwvbWF0LXNwaW5uZXI+XG48L2J1dHRvbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgUmVmcmVzaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgY29sbGVjdGlvblRvUmVmcmVzaDogRG9jdW1lbnRDb2xsZWN0aW9uO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXJ2aWNlVG9SZWZyZXNoOiBTZXJ2aWNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb2xvclByb2dyZXNzQ2lyY3VsYXIgPSAnd2hpdGUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpY29uOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZWxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBkZXN0cm95ZXIgPSBuZXcgRGVzdHJveWVyKCk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGphbVJlZnJlc2hTZXJ2aWNlOiBKYW1SZWZyZXNoU2VydmljZSkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxlY3Rpb25Ub1JlZnJlc2gpIHtcbiAgICAgICAgICAgIHRoaXMuamFtUmVmcmVzaFNlcnZpY2UuY29sbGVjdGlvbl90b19yZWZyZXNoLnBpcGUodGhpcy5kZXN0cm95ZXIucGlwZSgpKS5zdWJzY3JpYmUoKGNvbGxlY3Rpb246IERvY3VtZW50Q29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvblRvUmVmcmVzaCA9IGNvbGxlY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWZyZXNoQ29sbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlVG9SZWZyZXNoLmNsZWFyQ2FjaGVNZW1vcnkoKTtcbiAgICAgICAgdGhpcy5qYW1SZWZyZXNoU2VydmljZS5yZWZyZXNoKCk7XG4gICAgfVxufVxuIl19