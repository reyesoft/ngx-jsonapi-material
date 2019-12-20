import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
var SelectComponent = /** @class */ (function () {
    function SelectComponent() {
        this.appareance = 'outline';
        this.floatLabel = 'always';
        this.hasRefresh = false;
        this.toRelateChange = new EventEmitter();
        this.refresh = new EventEmitter();
        this.adaptiveArray = [];
        this.clear_relationships = null;
        this.searchText = '';
    }
    SelectComponent.prototype.ngOnInit = function () {
        if (this.limit) {
            this.adaptiveArray = this.collection.data.slice(0, Number(this.limit));
        }
        else {
            this.adaptiveArray = this.collection.data;
        }
        if (this.toRelate) {
            this.toRelate = this.collection.find(this.toRelate.id);
        }
    };
    SelectComponent.prototype.updateFilter = function (search_text) {
        this.searchText = search_text;
    };
    SelectComponent.prototype.updateRelationships = function (resource) {
        this.toRelateChange.emit(resource);
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-select',
                    styles: [".mat-option-footer,.mat-option-header{position:-webkit-sticky;position:sticky;background:inherit;z-index:999!important;width:100%}.mat-option-header{padding-left:0;padding-right:0;top:0}.mat-option-footer{bottom:0}.mat-icon{margin:0!important}mat-form-field{width:100%}"],
                    template: "<mat-form-field\n    [floatLabel]=\"floatLabel\"\n    [appearance]=\"appareance\"\n>\n    <mat-label>\n        {{ label || 'Seleccione una opci\u00F3n' }}\n        <i *ngIf=\"!toRelate\">(Ninguna)</i>\n    </mat-label>\n    <mat-select\n        [ngModel]=\"toRelate\"\n        (ngModelChange)=\"updateRelationships($event)\"\n        [disabled]=\"disabled || false\"\n        [placeholder]=\"placeholder || 'Seleccione una opci\u00F3n'\"\n        [multiple]=\"multiple || false\"\n        >\n\n        <div class=\"mat-option-header\" *ngIf=\"adaptiveArray.length >= 10\">\n            <jam-search-input\n                [text]=\"searchText\"\n                [opened]=\"true\"\n                (textChange)=\"updateFilter($event)\"\n            ></jam-search-input>\n        </div>\n\n        <mat-divider></mat-divider>\n\n        <mat-option *ngIf=\"removeRelationships\" [value]=\"clear_relationships\">-- Ninguna --</mat-option>\n\n        <ng-container *ngFor=\"let resource of adaptiveArray | filter: searchText\">\n            <mat-option [value]=\"resource\" *ngIf=\"parentId && resource.id !== parentId\">\n                {{ resource.attributes[displayAttribute] }}\n            </mat-option>\n            <mat-option [value]=\"resource\" *ngIf=\"!parentId\">\n                {{ resource.attributes[displayAttribute] }}\n            </mat-option>\n        </ng-container>\n\n        <div class=\"mat-option-footer\">\n            <ng-content></ng-content>\n        </div>\n    </mat-select>\n\n    <button matSuffix mat-icon-button class=\"mat-button\" *ngIf=\"hasRefresh\"\n        (click)=\"refresh.emit()\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n            <mat-icon class=\"mat-hint\">refresh</mat-icon>\n        </div>\n    </button>\n</mat-form-field>\n"
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
    return SelectComponent;
}());
export { SelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFM0Q7SUFBQTtRQXVEb0IsZUFBVSxHQUErQyxTQUFTLENBQUM7UUFDbkUsZUFBVSxHQUF1QixRQUFRLENBQUM7UUFXMUMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUUzQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFDOUMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFNUMsa0JBQWEsR0FBb0IsRUFBRSxDQUFDO1FBQ3BDLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsRUFBRSxDQUFDO0lBcUJuQyxDQUFDO0lBbkJVLGtDQUFRLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzFFO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1NBQzdDO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQztJQUVNLHNDQUFZLEdBQW5CLFVBQW9CLFdBQW1CO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0lBQ2xDLENBQUM7SUFFTSw2Q0FBbUIsR0FBMUIsVUFBMkIsUUFBa0I7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Z0JBL0ZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsTUFBTSxFQUFFLENBQUMsK1FBQStRLENBQUM7b0JBQ3pSLFFBQVEsRUFBRSx5d0RBaURiO2lCQUNBOzs7NkJBRUksS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7d0JBQ0wsS0FBSzttQ0FDTCxLQUFLOzZCQUNMLEtBQUs7c0NBQ0wsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSztpQ0FFTCxNQUFNOzBCQUNOLE1BQU07O0lBMEJYLHNCQUFDO0NBQUEsQUFoR0QsSUFnR0M7U0ExQ1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2UsIERvY3VtZW50Q29sbGVjdGlvbiB9IGZyb20gJ25neC1qc29uYXBpJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tc2VsZWN0JyxcbiAgICBzdHlsZXM6IFtgLm1hdC1vcHRpb24tZm9vdGVyLC5tYXQtb3B0aW9uLWhlYWRlcntwb3NpdGlvbjotd2Via2l0LXN0aWNreTtwb3NpdGlvbjpzdGlja3k7YmFja2dyb3VuZDppbmhlcml0O3otaW5kZXg6OTk5IWltcG9ydGFudDt3aWR0aDoxMDAlfS5tYXQtb3B0aW9uLWhlYWRlcntwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjA7dG9wOjB9Lm1hdC1vcHRpb24tZm9vdGVye2JvdHRvbTowfS5tYXQtaWNvbnttYXJnaW46MCFpbXBvcnRhbnR9bWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZFxuICAgIFtmbG9hdExhYmVsXT1cImZsb2F0TGFiZWxcIlxuICAgIFthcHBlYXJhbmNlXT1cImFwcGFyZWFuY2VcIlxuPlxuICAgIDxtYXQtbGFiZWw+XG4gICAgICAgIHt7IGxhYmVsIHx8ICdTZWxlY2Npb25lIHVuYSBvcGNpw7NuJyB9fVxuICAgICAgICA8aSAqbmdJZj1cIiF0b1JlbGF0ZVwiPihOaW5ndW5hKTwvaT5cbiAgICA8L21hdC1sYWJlbD5cbiAgICA8bWF0LXNlbGVjdFxuICAgICAgICBbbmdNb2RlbF09XCJ0b1JlbGF0ZVwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZVJlbGF0aW9uc2hpcHMoJGV2ZW50KVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBmYWxzZVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlciB8fCAnU2VsZWNjaW9uZSB1bmEgb3BjacOzbidcIlxuICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGUgfHwgZmFsc2VcIlxuICAgICAgICA+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1vcHRpb24taGVhZGVyXCIgKm5nSWY9XCJhZGFwdGl2ZUFycmF5Lmxlbmd0aCA+PSAxMFwiPlxuICAgICAgICAgICAgPGphbS1zZWFyY2gtaW5wdXRcbiAgICAgICAgICAgICAgICBbdGV4dF09XCJzZWFyY2hUZXh0XCJcbiAgICAgICAgICAgICAgICBbb3BlbmVkXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICh0ZXh0Q2hhbmdlKT1cInVwZGF0ZUZpbHRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgID48L2phbS1zZWFyY2gtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuXG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwicmVtb3ZlUmVsYXRpb25zaGlwc1wiIFt2YWx1ZV09XCJjbGVhcl9yZWxhdGlvbnNoaXBzXCI+LS0gTmluZ3VuYSAtLTwvbWF0LW9wdGlvbj5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCByZXNvdXJjZSBvZiBhZGFwdGl2ZUFycmF5IHwgZmlsdGVyOiBzZWFyY2hUZXh0XCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwicmVzb3VyY2VcIiAqbmdJZj1cInBhcmVudElkICYmIHJlc291cmNlLmlkICE9PSBwYXJlbnRJZFwiPlxuICAgICAgICAgICAgICAgIHt7IHJlc291cmNlLmF0dHJpYnV0ZXNbZGlzcGxheUF0dHJpYnV0ZV0gfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJyZXNvdXJjZVwiICpuZ0lmPVwiIXBhcmVudElkXCI+XG4gICAgICAgICAgICAgICAge3sgcmVzb3VyY2UuYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlXSB9fVxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0LW9wdGlvbi1mb290ZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYXQtc2VsZWN0PlxuXG4gICAgPGJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWJ1dHRvblwiICpuZ0lmPVwiaGFzUmVmcmVzaFwiXG4gICAgICAgIChjbGljayk9XCJyZWZyZXNoLmVtaXQoKVwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCI+cmVmcmVzaDwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuPC9tYXQtZm9ybS1maWVsZD5cbmBcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgYXBwYXJlYW5jZTogJ2ZpbGwnIHwgJ291dGxpbmUnIHwgJ2xlZ2FjeScgfCAnc3RhbmRhcmQnID0gJ291dGxpbmUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmbG9hdExhYmVsOiAnbmV2ZXInIHwgJ2Fsd2F5cycgPSAnYWx3YXlzJztcbiAgICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIHBhcmVudElkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRvUmVsYXRlOiBSZXNvdXJjZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzcGxheUF0dHJpYnV0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb247XG4gICAgQElucHV0KCkgcHVibGljIHJlbW92ZVJlbGF0aW9uc2hpcHM6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBoYXNSZWZyZXNoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIHRvUmVsYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxSZXNvdXJjZT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlZnJlc2ggPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBhZGFwdGl2ZUFycmF5OiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgICBwdWJsaWMgY2xlYXJfcmVsYXRpb25zaGlwcyA9IG51bGw7XG5cbiAgICBwdWJsaWMgc2VhcmNoVGV4dDogc3RyaW5nID0gJyc7XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0aXZlQXJyYXkgPSB0aGlzLmNvbGxlY3Rpb24uZGF0YS5zbGljZSgwLCBOdW1iZXIodGhpcy5saW1pdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGl2ZUFycmF5ID0gdGhpcy5jb2xsZWN0aW9uLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b1JlbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy50b1JlbGF0ZSA9IHRoaXMuY29sbGVjdGlvbi5maW5kKHRoaXMudG9SZWxhdGUuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUZpbHRlcihzZWFyY2hfdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHNlYXJjaF90ZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVSZWxhdGlvbnNoaXBzKHJlc291cmNlOiBSZXNvdXJjZSkge1xuICAgICAgICB0aGlzLnRvUmVsYXRlQ2hhbmdlLmVtaXQocmVzb3VyY2UpO1xuICAgIH1cbn1cbiJdfQ==