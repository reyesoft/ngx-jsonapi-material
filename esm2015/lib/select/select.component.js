import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
export class SelectComponent {
    constructor() {
        this.appareance = 'outline';
        this.floatLabel = 'always';
        this.hasRefresh = false;
        this.toRelateChange = new EventEmitter();
        this.refresh = new EventEmitter();
        this.adaptiveArray = [];
        this.clear_relationships = null;
        this.searchText = '';
    }
    ngOnInit() {
        if (this.limit) {
            this.adaptiveArray = this.collection.data.slice(0, Number(this.limit));
        }
        else {
            this.adaptiveArray = this.collection.data;
        }
        if (this.toRelate) {
            this.toRelate = this.collection.find(this.toRelate.id);
        }
    }
    updateFilter(search_text) {
        this.searchText = search_text;
    }
    updateRelationships(resource) {
        this.toRelateChange.emit(resource);
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-select',
                styles: [`.mat-option-footer,.mat-option-header{position:-webkit-sticky;position:sticky;background:inherit;z-index:999!important;width:100%}.mat-option-header{padding-left:0;padding-right:0;top:0}.mat-option-footer{bottom:0}.mat-icon{margin:0!important}mat-form-field{width:100%}`],
                template: `<mat-form-field
    [floatLabel]="floatLabel"
    [appearance]="appareance"
>
    <mat-label>
        {{ label || 'Seleccione una opción' }}
        <i *ngIf="!toRelate">(Ninguna)</i>
    </mat-label>
    <mat-select
        [ngModel]="toRelate"
        (ngModelChange)="updateRelationships($event)"
        [disabled]="disabled || false"
        [placeholder]="placeholder || 'Seleccione una opción'"
        [multiple]="multiple || false"
        >

        <div class="mat-option-header" *ngIf="adaptiveArray.length >= 10">
            <jam-search-input
                [text]="searchText"
                [opened]="true"
                (textChange)="updateFilter($event)"
            ></jam-search-input>
        </div>

        <mat-divider></mat-divider>

        <mat-option *ngIf="removeRelationships" [value]="clear_relationships">-- Ninguna --</mat-option>

        <ng-container *ngFor="let resource of adaptiveArray | filter: searchText">
            <mat-option [value]="resource" *ngIf="parentId && resource.id !== parentId">
                {{ resource.attributes[displayAttribute] }}
            </mat-option>
            <mat-option [value]="resource" *ngIf="!parentId">
                {{ resource.attributes[displayAttribute] }}
            </mat-option>
        </ng-container>

        <div class="mat-option-footer">
            <ng-content></ng-content>
        </div>
    </mat-select>

    <button matSuffix mat-icon-button class="mat-button" *ngIf="hasRefresh"
        (click)="refresh.emit()">
        <div fxLayout="row" fxLayoutAlign="center center">
            <mat-icon class="mat-hint">refresh</mat-icon>
        </div>
    </button>
</mat-form-field>
`
            },] },
];
SelectComponent.propDecorators = {
    appareance: [{ type: Input }],
    floatLabel: [{ type: Input }],
    multiple: [{ type: Input }],
    parentId: [{ type: Input }],
    toRelate: [{ type: Input }],
    placeholder: [{ type: Input }],
    label: [{ type: Input }],
    displayAttribute: [{ type: Input }],
    collection: [{ type: Input }],
    removeRelationships: [{ type: Input }],
    disabled: [{ type: Input }],
    limit: [{ type: Input }],
    hasRefresh: [{ type: Input }],
    toRelateChange: [{ type: Output }],
    refresh: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUF3RDNELE1BQU0sT0FBTyxlQUFlO0lBdEQ1QjtRQXVEb0IsZUFBVSxHQUErQyxTQUFTLENBQUM7UUFDbkUsZUFBVSxHQUF1QixRQUFRLENBQUM7UUFXMUMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUUzQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFDOUMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFNUMsa0JBQWEsR0FBb0IsRUFBRSxDQUFDO1FBQ3BDLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsRUFBRSxDQUFDO0lBcUJuQyxDQUFDO0lBbkJVLFFBQVE7UUFDWCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzFFO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1NBQzdDO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQztJQUVNLFlBQVksQ0FBQyxXQUFtQjtRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztJQUNsQyxDQUFDO0lBRU0sbUJBQW1CLENBQUMsUUFBa0I7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBL0ZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsTUFBTSxFQUFFLENBQUMsK1FBQStRLENBQUM7Z0JBQ3pSLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWlEYjthQUNBOzs7eUJBRUksS0FBSzt5QkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7b0JBQ0wsS0FBSzsrQkFDTCxLQUFLO3lCQUNMLEtBQUs7a0NBQ0wsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFFTCxNQUFNO3NCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc291cmNlLCBEb2N1bWVudENvbGxlY3Rpb24gfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXNlbGVjdCcsXG4gICAgc3R5bGVzOiBbYC5tYXQtb3B0aW9uLWZvb3RlciwubWF0LW9wdGlvbi1oZWFkZXJ7cG9zaXRpb246LXdlYmtpdC1zdGlja3k7cG9zaXRpb246c3RpY2t5O2JhY2tncm91bmQ6aW5oZXJpdDt6LWluZGV4Ojk5OSFpbXBvcnRhbnQ7d2lkdGg6MTAwJX0ubWF0LW9wdGlvbi1oZWFkZXJ7cGFkZGluZy1sZWZ0OjA7cGFkZGluZy1yaWdodDowO3RvcDowfS5tYXQtb3B0aW9uLWZvb3Rlcntib3R0b206MH0ubWF0LWljb257bWFyZ2luOjAhaW1wb3J0YW50fW1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCV9YF0sXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGRcbiAgICBbZmxvYXRMYWJlbF09XCJmbG9hdExhYmVsXCJcbiAgICBbYXBwZWFyYW5jZV09XCJhcHBhcmVhbmNlXCJcbj5cbiAgICA8bWF0LWxhYmVsPlxuICAgICAgICB7eyBsYWJlbCB8fCAnU2VsZWNjaW9uZSB1bmEgb3BjacOzbicgfX1cbiAgICAgICAgPGkgKm5nSWY9XCIhdG9SZWxhdGVcIj4oTmluZ3VuYSk8L2k+XG4gICAgPC9tYXQtbGFiZWw+XG4gICAgPG1hdC1zZWxlY3RcbiAgICAgICAgW25nTW9kZWxdPVwidG9SZWxhdGVcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVSZWxhdGlvbnNoaXBzKCRldmVudClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgZmFsc2VcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgfHwgJ1NlbGVjY2lvbmUgdW5hIG9wY2nDs24nXCJcbiAgICAgICAgW211bHRpcGxlXT1cIm11bHRpcGxlIHx8IGZhbHNlXCJcbiAgICAgICAgPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXQtb3B0aW9uLWhlYWRlclwiICpuZ0lmPVwiYWRhcHRpdmVBcnJheS5sZW5ndGggPj0gMTBcIj5cbiAgICAgICAgICAgIDxqYW0tc2VhcmNoLWlucHV0XG4gICAgICAgICAgICAgICAgW3RleHRdPVwic2VhcmNoVGV4dFwiXG4gICAgICAgICAgICAgICAgW29wZW5lZF09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAodGV4dENoYW5nZSk9XCJ1cGRhdGVGaWx0ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9qYW0tc2VhcmNoLWlucHV0PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cblxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdJZj1cInJlbW92ZVJlbGF0aW9uc2hpcHNcIiBbdmFsdWVdPVwiY2xlYXJfcmVsYXRpb25zaGlwc1wiPi0tIE5pbmd1bmEgLS08L21hdC1vcHRpb24+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgcmVzb3VyY2Ugb2YgYWRhcHRpdmVBcnJheSB8IGZpbHRlcjogc2VhcmNoVGV4dFwiPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gW3ZhbHVlXT1cInJlc291cmNlXCIgKm5nSWY9XCJwYXJlbnRJZCAmJiByZXNvdXJjZS5pZCAhPT0gcGFyZW50SWRcIj5cbiAgICAgICAgICAgICAgICB7eyByZXNvdXJjZS5hdHRyaWJ1dGVzW2Rpc3BsYXlBdHRyaWJ1dGVdIH19XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwicmVzb3VyY2VcIiAqbmdJZj1cIiFwYXJlbnRJZFwiPlxuICAgICAgICAgICAgICAgIHt7IHJlc291cmNlLmF0dHJpYnV0ZXNbZGlzcGxheUF0dHJpYnV0ZV0gfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1vcHRpb24tZm9vdGVyXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbWF0LXNlbGVjdD5cblxuICAgIDxidXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1idXR0b25cIiAqbmdJZj1cImhhc1JlZnJlc2hcIlxuICAgICAgICAoY2xpY2spPVwicmVmcmVzaC5lbWl0KClcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiPnJlZnJlc2g8L21hdC1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIGFwcGFyZWFuY2U6ICdmaWxsJyB8ICdvdXRsaW5lJyB8ICdsZWdhY3knIHwgJ3N0YW5kYXJkJyA9ICdvdXRsaW5lJztcbiAgICBASW5wdXQoKSBwdWJsaWMgZmxvYXRMYWJlbDogJ25ldmVyJyB8ICdhbHdheXMnID0gJ2Fsd2F5cyc7XG4gICAgQElucHV0KCkgcHVibGljIG11bHRpcGxlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRJZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0b1JlbGF0ZTogUmVzb3VyY2U7XG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGRpc3BsYXlBdHRyaWJ1dGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgY29sbGVjdGlvbjogRG9jdW1lbnRDb2xsZWN0aW9uO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZW1vdmVSZWxhdGlvbnNoaXBzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgbGltaXQ6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgaGFzUmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIHB1YmxpYyB0b1JlbGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzb3VyY2U+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZWZyZXNoID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBwdWJsaWMgYWRhcHRpdmVBcnJheTogQXJyYXk8UmVzb3VyY2U+ID0gW107XG4gICAgcHVibGljIGNsZWFyX3JlbGF0aW9uc2hpcHMgPSBudWxsO1xuXG4gICAgcHVibGljIHNlYXJjaFRleHQ6IHN0cmluZyA9ICcnO1xuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5saW1pdCkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGl2ZUFycmF5ID0gdGhpcy5jb2xsZWN0aW9uLmRhdGEuc2xpY2UoMCwgTnVtYmVyKHRoaXMubGltaXQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRpdmVBcnJheSA9IHRoaXMuY29sbGVjdGlvbi5kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudG9SZWxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudG9SZWxhdGUgPSB0aGlzLmNvbGxlY3Rpb24uZmluZCh0aGlzLnRvUmVsYXRlLmlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXIoc2VhcmNoX3RleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFRleHQgPSBzZWFyY2hfdGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlUmVsYXRpb25zaGlwcyhyZXNvdXJjZTogUmVzb3VyY2UpIHtcbiAgICAgICAgdGhpcy50b1JlbGF0ZUNoYW5nZS5lbWl0KHJlc291cmNlKTtcbiAgICB9XG59XG4iXX0=