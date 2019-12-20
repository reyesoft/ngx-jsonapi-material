import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
export class JamOptionFooterComponent {
    constructor(activatedRoute, router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.openNewTab = false;
    }
    goTo(target = '_self') {
        if (this.routerLink) {
            this.router.navigate(this.routerLink, {
                relativeTo: this.activatedRoute,
                queryParams: this.queryParams
            });
        }
        else if (this.url) {
            window.open(this.url, target);
        }
    }
}
JamOptionFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-option-footer',
                styles: [`.mouseover * .mouseover-child{display:none}.mouseover:hover * .mouseover-child{display:inherit}`],
                template: `<mat-option class="mat-elevation-z1 mouseover"
    (click)="goTo()">
    <div fxLayout="row" fxLayoutAlign="space-between center">
        <div>
            <mat-icon class="mat-hint">add_circle</mat-icon>
            <span>{{ labelOption || 'Add'}}</span>
        </div>
        <div *ngIf="openNewTab && !routerLink">
            <a mat-icon-button class="mat-button mouseover-child" target="_blank"
                (click)="$event.stopPropagation(); goTo('_blank')">
                <mat-icon class="mat-hint" [style.margin]="'0'">open_in_new</mat-icon>
            </a>
        </div>
    </div>
</mat-option>
`
            },] },
];
/** @nocollapse */
JamOptionFooterComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
JamOptionFooterComponent.propDecorators = {
    url: [{ type: Input }],
    labelOption: [{ type: Input }],
    routerLink: [{ type: Input }],
    queryParams: [{ type: Input }],
    openNewTab: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Qvb3B0aW9uLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFVLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXNCakUsTUFBTSxPQUFPLHdCQUF3QjtJQU9qQyxZQUNZLGNBQThCLEVBQzlCLE1BQWM7UUFEZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUpWLGVBQVUsR0FBWSxLQUFLLENBQUM7SUFLekMsQ0FBQztJQUVHLElBQUksQ0FBQyxTQUE2QixPQUFPO1FBQzVDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNsQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQy9CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzthQUNoQyxDQUFDLENBQUM7U0FDTjthQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqQixNQUFNLENBQUMsSUFBSSxDQUNQLElBQUksQ0FBQyxHQUFHLEVBQ1IsTUFBTSxDQUNULENBQUM7U0FDTDtJQUNMLENBQUM7OztZQTVDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsTUFBTSxFQUFFLENBQUMsaUdBQWlHLENBQUM7Z0JBQzNHLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0NBZWI7YUFDQTs7OztZQXJCd0IsY0FBYztZQUF0QixNQUFNOzs7a0JBdUJsQixLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3lCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJhbXMsIFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1vcHRpb24tZm9vdGVyJyxcbiAgICBzdHlsZXM6IFtgLm1vdXNlb3ZlciAqIC5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTpub25lfS5tb3VzZW92ZXI6aG92ZXIgKiAubW91c2VvdmVyLWNoaWxke2Rpc3BsYXk6aW5oZXJpdH1gXSxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtb3B0aW9uIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16MSBtb3VzZW92ZXJcIlxuICAgIChjbGljayk9XCJnb1RvKClcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiPmFkZF9jaXJjbGU8L21hdC1pY29uPlxuICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxPcHRpb24gfHwgJ0FkZCd9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJvcGVuTmV3VGFiICYmICFyb3V0ZXJMaW5rXCI+XG4gICAgICAgICAgICA8YSBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtYnV0dG9uIG1vdXNlb3Zlci1jaGlsZFwiIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZ29UbygnX2JsYW5rJylcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiIFtzdHlsZS5tYXJnaW5dPVwiJzAnXCI+b3Blbl9pbl9uZXc8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbWF0LW9wdGlvbj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgSmFtT3B0aW9uRm9vdGVyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGxhYmVsT3B0aW9uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHJvdXRlckxpbms6IEFycmF5PHN0cmluZz47XG4gICAgQElucHV0KCkgcHVibGljIHF1ZXJ5UGFyYW1zOiBQYXJhbXM7XG4gICAgQElucHV0KCkgcHVibGljIG9wZW5OZXdUYWI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ29Ubyh0YXJnZXQ6ICdfc2VsZicgfCAnX2JsYW5rJyA9ICdfc2VsZicpIHtcbiAgICAgICAgaWYgKHRoaXMucm91dGVyTGluaykge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUodGhpcy5yb3V0ZXJMaW5rLCB7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy51cmwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKFxuICAgICAgICAgICAgICAgIHRoaXMudXJsLFxuICAgICAgICAgICAgICAgIHRhcmdldFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==