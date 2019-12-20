import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
export class BottomSheetComponent {
    constructor(data, matBottomSheetRef) {
        this.data = data;
        this.matBottomSheetRef = matBottomSheetRef;
    }
    close() {
        this.matBottomSheetRef.dismiss();
    }
    selected(option) {
        this.matBottomSheetRef.dismiss(option);
    }
}
BottomSheetComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-bottom-sheet',
                styles: [`/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}`],
                template: `<ng-template matMenuContent>
    <mat-nav-list>
        <ng-container *ngFor="let section of data.sections; let position = index">
            <h3 class="mat-hint" *ngIf="!section.hidden || section.id">
                <span [innerHtml]="section.id"></span>
            </h3>

            <ng-container *ngFor="let button of section.data">
                <mat-list-item *ngIf="!button.attributes.hidden"
                    [ngClass]="button.attributes.class + (button.attributes.disabled ? 'disabled' : null)"
                    (click)="button.attributes.disabled ? $event.stopPropagation() : selected(button.id)">
                    <mat-icon
                        *ngIf="button.attributes.icon || button.attributes.svg_icon"
                        [innerHtml]="button.attributes.icon"
                        [svgIcon]="button.attributes.svg_con"
                         class="mat-hint"
                        >
                    </mat-icon>
                    <span mat-line [innerHtml]="button.attributes.label"></span>
                </mat-list-item>
            </ng-container>

            <mat-divider *ngIf="(position + 1) < data.sections.length"></mat-divider>
        </ng-container>
    </mat-nav-list>
</ng-template>
`
            },] },
];
/** @nocollapse */
BottomSheetComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [MAT_BOTTOM_SHEET_DATA,] }] },
    { type: MatBottomSheetRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLXNoZWV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL21lbnUvYm90dG9tLXNoZWV0L2JvdHRvbS1zaGVldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFpQzdFLE1BQU0sT0FBTyxvQkFBb0I7SUFDN0IsWUFDMEMsSUFBUyxFQUN2QyxpQkFBMEQ7UUFENUIsU0FBSSxHQUFKLElBQUksQ0FBSztRQUN2QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXlDO0lBQ2xFLENBQUM7SUFFRSxLQUFLO1FBQ1IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxRQUFRLENBQUMsTUFBYztRQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7OztZQTNDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsTUFBTSxFQUFFLENBQUMsb1BBQW9QLENBQUM7Z0JBQzlQLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EwQmI7YUFDQTs7Ozs0Q0FHUSxNQUFNLFNBQUMscUJBQXFCO1lBbkNMLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9CT1RUT01fU0hFRVRfREFUQSwgTWF0Qm90dG9tU2hlZXRSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWJvdHRvbS1zaGVldCcsXG4gICAgc3R5bGVzOiBbYC9kZWVwLyBoM3tmb250LXNpemU6MTBwdDttYXJnaW46MTZweDtmb250LXdlaWdodDo1MDB9amFtLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpibG9ja30uamFtLWJvdHRvbS1zaGVldHtkaXNwbGF5Om5vbmV9LmRpc2FibGVke29wYWNpdHk6LjV9QG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjU5OXB4KXtqYW0tZHJvcGRvd24tbWVudXtkaXNwbGF5Om5vbmV9LmphbS1ib3R0b20tc2hlZXR7ZGlzcGxheTpibG9ja319YF0sXG4gICAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbWF0TWVudUNvbnRlbnQ+XG4gICAgPG1hdC1uYXYtbGlzdD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc2VjdGlvbiBvZiBkYXRhLnNlY3Rpb25zOyBsZXQgcG9zaXRpb24gPSBpbmRleFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwibWF0LWhpbnRcIiAqbmdJZj1cIiFzZWN0aW9uLmhpZGRlbiB8fCBzZWN0aW9uLmlkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJzZWN0aW9uLmlkXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIHNlY3Rpb24uZGF0YVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtbGlzdC1pdGVtICpuZ0lmPVwiIWJ1dHRvbi5hdHRyaWJ1dGVzLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImJ1dHRvbi5hdHRyaWJ1dGVzLmNsYXNzICsgKGJ1dHRvbi5hdHRyaWJ1dGVzLmRpc2FibGVkID8gJ2Rpc2FibGVkJyA6IG51bGwpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImJ1dHRvbi5hdHRyaWJ1dGVzLmRpc2FibGVkID8gJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpIDogc2VsZWN0ZWQoYnV0dG9uLmlkKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiYnV0dG9uLmF0dHJpYnV0ZXMuaWNvbiB8fCBidXR0b24uYXR0cmlidXRlcy5zdmdfaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIdG1sXT1cImJ1dHRvbi5hdHRyaWJ1dGVzLmljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3N2Z0ljb25dPVwiYnV0dG9uLmF0dHJpYnV0ZXMuc3ZnX2NvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYXQtaGludFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIG1hdC1saW5lIFtpbm5lckh0bWxdPVwiYnV0dG9uLmF0dHJpYnV0ZXMubGFiZWxcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9tYXQtbGlzdC1pdGVtPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDxtYXQtZGl2aWRlciAqbmdJZj1cIihwb3NpdGlvbiArIDEpIDwgZGF0YS5zZWN0aW9ucy5sZW5ndGhcIj48L21hdC1kaXZpZGVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L21hdC1uYXYtbGlzdD5cbjwvbmctdGVtcGxhdGU+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEJvdHRvbVNoZWV0Q29tcG9uZW50IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTUFUX0JPVFRPTV9TSEVFVF9EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgICAgICBwcml2YXRlIG1hdEJvdHRvbVNoZWV0UmVmOiBNYXRCb3R0b21TaGVldFJlZjxCb3R0b21TaGVldENvbXBvbmVudD5cbiAgICApIHsgfVxuXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hdEJvdHRvbVNoZWV0UmVmLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWQob3B0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXRCb3R0b21TaGVldFJlZi5kaXNtaXNzKG9wdGlvbik7XG4gICAgfVxufVxuIl19