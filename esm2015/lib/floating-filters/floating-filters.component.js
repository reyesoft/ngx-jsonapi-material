/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * Este component trabaja con 2 ng-content.
 * En el component que se use, debe definirse dos ng-container con las clases css:
 * header-filters, y filters, de esta forma el component sabe en que ng-content ubicar el contenido que se le pasa.
 */
export class FloatingFiltersComponent {
    constructor() {
        this.hasAdvancedFilters = true;
        this.appearance = 'square';
        this.resetFilters = new EventEmitter();
        this.show_reset_button = false;
        this.open_expansion_panel = false;
    }
    ngOnInit() {
        this.show_reset_button = this.resetFilters.observers.length > 0;
    }
    toggleStateExpansionPanel(state) {
        this.open_expansion_panel = !state;
    }
    clearFilters(panel_state) {
        if (!panel_state) {
            return;
        }
        this.resetFilters.emit();
    }
}
FloatingFiltersComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-floating-filters',
                styles: [`/deep/ .filter-button,/deep/ .filter-button-round,/deep/ .filter-button-square{padding:0;color:currentColor;font-weight:900!important;box-sizing:border-box}/deep/ .filter-button mat-icon,/deep/ .filter-button-round mat-icon,/deep/ .filter-button-square mat-icon{color:currentColor!important}/deep/ .filter-button-round::before,/deep/ .filter-button-square::before,/deep/ .filter-button::before{content:'';background-color:currentColor;position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit!important;opacity:.08}.filter-button-round{border-radius:100px!important}.filter-button-square{border-radius:6px}.filter-button-square button{border-radius:6px!important}mat-expansion-panel-header{background:0 0!important}`],
                template: `<mat-expansion-panel
    [disabled]="!hasAdvancedFilters"
    [hideToggle]="true"
    (opened)="toggleStateExpansionPanel(false)"
    (closed)="toggleStateExpansionPanel(true)"
    [style.box-shadow]="'none'"
    class="width-100" [expanded]="open_expansion_panel" [style.background]="'transparent'">
    <mat-expansion-panel-header jamAvoidDisabledStyle [style.padding]="'0'">
        <mat-panel-description fxLayout="row" fxLayoutAlign="space-between center">
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16px" (click)="$event.stopPropagation()">
                <button mat-button [ngClass]="'filter-button-' + appearance" color="accent"
                    *ngIf="hasAdvancedFilters"
                    (click)="toggleStateExpansionPanel(open_expansion_panel)">
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="4px">
                        <button mat-icon-button class="mat-button" (click)="clearFilters(open_expansion_panel)">
                            <mat-icon
                                [innerHtml]="!open_expansion_panel ? 'filter_list' : 'close'"
                                [matTooltip]="open_expansion_panel ? 'Borrar filtros' : 'Ver filtros'"
                            ></mat-icon>
                        </button>

                        <span>FILTROS</span>

                        <mat-icon matSuffix
                            [style.width.px]="'40'"
                            [innerHtml]="open_expansion_panel ? 'arrow_drop_up' : 'arrow_drop_down'"
                        ></mat-icon>
                    </div>
                </button>
            </div>

            <div fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="16px" (keydown)="$event.stopPropagation()" (click)="$event.stopPropagation()">
                <ng-content select="ng-container.jam-filter-header"></ng-content>
            </div>
        </mat-panel-description>
    </mat-expansion-panel-header>

    <div fxLayout="row wrap" fxLayoutAlign="start center" fxLayoutGap="16px grid">
        <ng-content select="ng-container.jam-filter-content">
        </ng-content>
    </div>
</mat-expansion-panel>
`
            },] },
];
FloatingFiltersComponent.propDecorators = {
    hasAdvancedFilters: [{ type: Input }],
    appearance: [{ type: Input }],
    resetFilters: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctZmlsdGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9mbG9hdGluZy1maWx0ZXJzL2Zsb2F0aW5nLWZpbHRlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUUvRTs7OztHQUlHO0FBaURILE1BQU0sT0FBTyx3QkFBd0I7SUEvQ3JDO1FBZ0RvQix1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFDbkMsZUFBVSxHQUF1QixRQUFRLENBQUM7UUFDekMsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRSxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMseUJBQW9CLEdBQUcsS0FBSyxDQUFDO0lBZ0J4QyxDQUFDO0lBZFUsUUFBUTtRQUNYLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSx5QkFBeUIsQ0FBQyxLQUFjO1FBQzNDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDO0lBRU0sWUFBWSxDQUFDLFdBQW9CO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7OztZQW5FSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsTUFBTSxFQUFFLENBQUMseXRCQUF5dEIsQ0FBQztnQkFDbnVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMENiO2FBQ0E7OztpQ0FFSSxLQUFLO3lCQUNMLEtBQUs7MkJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE4IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBFc3RlIGNvbXBvbmVudCB0cmFiYWphIGNvbiAyIG5nLWNvbnRlbnQuXG4gKiBFbiBlbCBjb21wb25lbnQgcXVlIHNlIHVzZSwgZGViZSBkZWZpbmlyc2UgZG9zIG5nLWNvbnRhaW5lciBjb24gbGFzIGNsYXNlcyBjc3M6XG4gKiBoZWFkZXItZmlsdGVycywgeSBmaWx0ZXJzLCBkZSBlc3RhIGZvcm1hIGVsIGNvbXBvbmVudCBzYWJlIGVuIHF1ZSBuZy1jb250ZW50IHViaWNhciBlbCBjb250ZW5pZG8gcXVlIHNlIGxlIHBhc2EuXG4gKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmxvYXRpbmctZmlsdGVycycsXG4gICAgc3R5bGVzOiBbYC9kZWVwLyAuZmlsdGVyLWJ1dHRvbiwvZGVlcC8gLmZpbHRlci1idXR0b24tcm91bmQsL2RlZXAvIC5maWx0ZXItYnV0dG9uLXNxdWFyZXtwYWRkaW5nOjA7Y29sb3I6Y3VycmVudENvbG9yO2ZvbnQtd2VpZ2h0OjkwMCFpbXBvcnRhbnQ7Ym94LXNpemluZzpib3JkZXItYm94fS9kZWVwLyAuZmlsdGVyLWJ1dHRvbiBtYXQtaWNvbiwvZGVlcC8gLmZpbHRlci1idXR0b24tcm91bmQgbWF0LWljb24sL2RlZXAvIC5maWx0ZXItYnV0dG9uLXNxdWFyZSBtYXQtaWNvbntjb2xvcjpjdXJyZW50Q29sb3IhaW1wb3J0YW50fS9kZWVwLyAuZmlsdGVyLWJ1dHRvbi1yb3VuZDo6YmVmb3JlLC9kZWVwLyAuZmlsdGVyLWJ1dHRvbi1zcXVhcmU6OmJlZm9yZSwvZGVlcC8gLmZpbHRlci1idXR0b246OmJlZm9yZXtjb250ZW50OicnO2JhY2tncm91bmQtY29sb3I6Y3VycmVudENvbG9yO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2JvdHRvbTowO2JvcmRlci1yYWRpdXM6aW5oZXJpdCFpbXBvcnRhbnQ7b3BhY2l0eTouMDh9LmZpbHRlci1idXR0b24tcm91bmR7Ym9yZGVyLXJhZGl1czoxMDBweCFpbXBvcnRhbnR9LmZpbHRlci1idXR0b24tc3F1YXJle2JvcmRlci1yYWRpdXM6NnB4fS5maWx0ZXItYnV0dG9uLXNxdWFyZSBidXR0b257Ym9yZGVyLXJhZGl1czo2cHghaW1wb3J0YW50fW1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVye2JhY2tncm91bmQ6MCAwIWltcG9ydGFudH1gXSxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtZXhwYW5zaW9uLXBhbmVsXG4gICAgW2Rpc2FibGVkXT1cIiFoYXNBZHZhbmNlZEZpbHRlcnNcIlxuICAgIFtoaWRlVG9nZ2xlXT1cInRydWVcIlxuICAgIChvcGVuZWQpPVwidG9nZ2xlU3RhdGVFeHBhbnNpb25QYW5lbChmYWxzZSlcIlxuICAgIChjbG9zZWQpPVwidG9nZ2xlU3RhdGVFeHBhbnNpb25QYW5lbCh0cnVlKVwiXG4gICAgW3N0eWxlLmJveC1zaGFkb3ddPVwiJ25vbmUnXCJcbiAgICBjbGFzcz1cIndpZHRoLTEwMFwiIFtleHBhbmRlZF09XCJvcGVuX2V4cGFuc2lvbl9wYW5lbFwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cIid0cmFuc3BhcmVudCdcIj5cbiAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXIgamFtQXZvaWREaXNhYmxlZFN0eWxlIFtzdHlsZS5wYWRkaW5nXT1cIicwJ1wiPlxuICAgICAgICA8bWF0LXBhbmVsLWRlc2NyaXB0aW9uIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gW25nQ2xhc3NdPVwiJ2ZpbHRlci1idXR0b24tJyArIGFwcGVhcmFuY2VcIiBjb2xvcj1cImFjY2VudFwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaGFzQWR2YW5jZWRGaWx0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVN0YXRlRXhwYW5zaW9uUGFuZWwob3Blbl9leHBhbnNpb25fcGFuZWwpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWJ1dHRvblwiIChjbGljayk9XCJjbGVhckZpbHRlcnMob3Blbl9leHBhbnNpb25fcGFuZWwpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckh0bWxdPVwiIW9wZW5fZXhwYW5zaW9uX3BhbmVsID8gJ2ZpbHRlcl9saXN0JyA6ICdjbG9zZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJvcGVuX2V4cGFuc2lvbl9wYW5lbCA/ICdCb3JyYXIgZmlsdHJvcycgOiAnVmVyIGZpbHRyb3MnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5GSUxUUk9TPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0U3VmZml4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cIic0MCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckh0bWxdPVwib3Blbl9leHBhbnNpb25fcGFuZWwgPyAnYXJyb3dfZHJvcF91cCcgOiAnYXJyb3dfZHJvcF9kb3duJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCIgKGtleWRvd24pPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5nLWNvbnRhaW5lci5qYW0tZmlsdGVyLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21hdC1wYW5lbC1kZXNjcmlwdGlvbj5cbiAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuXG4gICAgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZweCBncmlkXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5nLWNvbnRhaW5lci5qYW0tZmlsdGVyLWNvbnRlbnRcIj5cbiAgICAgICAgPC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0ZpbHRlcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBoYXNBZHZhbmNlZEZpbHRlcnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhcHBlYXJhbmNlOiAncm91bmQnIHwgJ3NxdWFyZScgPSAnc3F1YXJlJztcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlc2V0RmlsdGVyczogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHB1YmxpYyBzaG93X3Jlc2V0X2J1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBvcGVuX2V4cGFuc2lvbl9wYW5lbCA9IGZhbHNlO1xuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNob3dfcmVzZXRfYnV0dG9uID0gdGhpcy5yZXNldEZpbHRlcnMub2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVN0YXRlRXhwYW5zaW9uUGFuZWwoc3RhdGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuX2V4cGFuc2lvbl9wYW5lbCA9ICFzdGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJGaWx0ZXJzKHBhbmVsX3N0YXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghcGFuZWxfc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0RmlsdGVycy5lbWl0KCk7XG4gICAgfVxufVxuIl19