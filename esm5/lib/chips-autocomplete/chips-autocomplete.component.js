import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Resource, Service } from 'ngx-jsonapi';
import { FormControl } from '@angular/forms';
import { filterOrRequest } from '../batch';
import { trackById } from '../track-by-id';
var ChipsAutocompleteComponent = /** @class */ (function () {
    function ChipsAutocompleteComponent() {
        this.page = {
            number: 1,
            size: 50
        };
        this.trackById = trackById;
        this.addOnBlur = true;
        this.selectable = true;
        this.removable = true;
        this.collectionArray = [];
        this.formControl = new FormControl();
    }
    ChipsAutocompleteComponent.prototype.ngOnInit = function () {
        this.collection = this.service.newCollection();
        this.collection_relationships = this.resource.relationships[this.relationAlias];
        this.filteredCollection = this.formControl.valueChanges.pipe(filterOrRequest({
            attribute_to_search: this.attributesDisplay[0],
            resourcesArray: this.collectionArray,
            getAllFc: this.getAll.bind(this),
            last_filter_value: this.collectionArrayLastFilterValue,
            collection: this.collection,
            page_size: this.page.size
        }));
    };
    ChipsAutocompleteComponent.prototype.getAll = function (search_text) {
        var _a;
        if (search_text) {
            this.remoteFilter = tslib_1.__assign({}, this.remoteFilter, (_a = {}, _a[this.attributesDisplay[0]] = search_text, _a));
            return this.service
                .all({
                remotefilter: this.remoteFilter,
                page: { number: 1, size: this.page.size }
            });
        }
        return this.service
            .all({
            remotefilter: this.remoteFilter,
            page: { number: 1, size: this.page.size }
        });
    };
    ChipsAutocompleteComponent.prototype.filterCollection = function (search_text) {
        var _this = this;
        var filterValue = typeof search_text === 'string' ? search_text.toLowerCase() : '';
        return this.collection.data.filter(function (resource) { return resource.attributes[_this.attributesDisplay[0]]
            .toLowerCase()
            .indexOf(filterValue) >= 0; });
    };
    ChipsAutocompleteComponent.prototype.addResource = function (resource) {
        this.resource.addRelationship(resource, this.relationAlias);
        this.resourceInput.nativeElement.value = '';
        this.formControl.setValue(null);
    };
    ChipsAutocompleteComponent.prototype.displayName = function (resource) {
        return '';
    };
    ChipsAutocompleteComponent.prototype.removeResource = function (resource) {
        this.resource.removeRelationship(this.relationAlias, resource.id);
    };
    ChipsAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-chips-autocomplete',
                    template: "<mat-form-field [style.width.%]=\"'100'\" [appearance]=\"appearance\">\n    <mat-label *ngIf=\"matLabel\">{{ matLabel }}</mat-label>\n    <mat-chip-list #chipList>\n        <mat-chip\n            *ngFor=\"let resource_resource of collection_relationships.data; trackBy: collection_relationships.trackBy\"\n            [selectable]=\"selectable\"\n            [removable]=\"removable\"\n            (removed)=\"removeResource(resource_resource)\">\n            {{ resource_resource.attributes[attributesDisplay[0]] }}\n        <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon>\n        </mat-chip>\n        <input\n            [placeholder]=\"placeholder || ''\"\n            #resourceInput\n            [formControl]=\"formControl\"\n            [matAutocomplete]=\"auto\"\n            [matChipInputFor]=\"chipList\"\n            [matChipInputAddOnBlur]=\"addOnBlur\">\n    </mat-chip-list>\n\n    <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" (optionSelected)=\"addResource($event.option.value)\">\n        <ng-container *ngFor=\"let resource of filteredCollection | async; trackBy: trackById\">\n            <mat-option *ngIf=\"!collection_relationships.find(resource.id)\" [value]=\"resource\">\n                <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                    <mat-icon class=\"layout-margin\">person</mat-icon>\n                    <strong>{{ resource.attributes[attributesDisplay[0]] }}</strong>\n                    &nbsp;\n                    <small fxLayout=\"row\" fxLayoutAlign=\"start center\" *ngFor=\"let attribute_name of attributesDisplay; let attr_id = index\">\n                        <span *ngIf=\"attr_id >= 1\">| {{ resource.attributes[attribute_name] }}</span>\n                    </small>\n                </div>\n            </mat-option>\n        </ng-container>\n    </mat-autocomplete>\n</mat-form-field>\n"
                },] },
    ];
    /** @nocollapse */
    ChipsAutocompleteComponent.ctorParameters = function () { return []; };
    ChipsAutocompleteComponent.propDecorators = {
        resourceInput: [{ type: ViewChild, args: ['resourceInput',] }],
        placeholder: [{ type: Input }],
        resource: [{ type: Input }],
        remoteFilter: [{ type: Input }],
        service: [{ type: Input }],
        relationAlias: [{ type: Input }],
        attributesDisplay: [{ type: Input }],
        appearance: [{ type: Input }],
        matLabel: [{ type: Input }],
        page: [{ type: Input }]
    };
    return ChipsAutocompleteComponent;
}());
export { ChipsAutocompleteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2NoaXBzLWF1dG9jb21wbGV0ZS9jaGlwcy1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLEVBQXNCLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0M7SUFrRUk7UUFqQmdCLFNBQUksR0FBVTtZQUMxQixNQUFNLEVBQUUsQ0FBQztZQUNULElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUVLLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFJdEIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHekIsb0JBQWUsR0FBb0IsRUFBRSxDQUFDO1FBSTFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUssNkNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsd0JBQXdCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVwRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxD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LElBNkhDO1NBdEZZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvdXJjZSwgRG9jdW1lbnRDb2xsZWN0aW9uLCBTZXJ2aWNlIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmaWx0ZXJPclJlcXVlc3QgfSBmcm9tICcuLi9iYXRjaCc7XG5pbXBvcnQgeyB0cmFja0J5SWQgfSBmcm9tICcuLi90cmFjay1ieS1pZCc7XG5pbXBvcnQgeyBJUGFnZSB9IGZyb20gJ25neC1qc29uYXBpL2ludGVyZmFjZXMvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWNoaXBzLWF1dG9jb21wbGV0ZScsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgW3N0eWxlLndpZHRoLiVdPVwiJzEwMCdcIiBbYXBwZWFyYW5jZV09XCJhcHBlYXJhbmNlXCI+XG4gICAgPG1hdC1sYWJlbCAqbmdJZj1cIm1hdExhYmVsXCI+e3sgbWF0TGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICA8bWF0LWNoaXAtbGlzdCAjY2hpcExpc3Q+XG4gICAgICAgIDxtYXQtY2hpcFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJlc291cmNlX3Jlc291cmNlIG9mIGNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcy5kYXRhOyB0cmFja0J5OiBjb2xsZWN0aW9uX3JlbGF0aW9uc2hpcHMudHJhY2tCeVwiXG4gICAgICAgICAgICBbc2VsZWN0YWJsZV09XCJzZWxlY3RhYmxlXCJcbiAgICAgICAgICAgIFtyZW1vdmFibGVdPVwicmVtb3ZhYmxlXCJcbiAgICAgICAgICAgIChyZW1vdmVkKT1cInJlbW92ZVJlc291cmNlKHJlc291cmNlX3Jlc291cmNlKVwiPlxuICAgICAgICAgICAge3sgcmVzb3VyY2VfcmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVzRGlzcGxheVswXV0gfX1cbiAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmUgKm5nSWY9XCJyZW1vdmFibGVcIj5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlciB8fCAnJ1wiXG4gICAgICAgICAgICAjcmVzb3VyY2VJbnB1dFxuICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiXG4gICAgICAgICAgICBbbWF0Q2hpcElucHV0Rm9yXT1cImNoaXBMaXN0XCJcbiAgICAgICAgICAgIFttYXRDaGlwSW5wdXRBZGRPbkJsdXJdPVwiYWRkT25CbHVyXCI+XG4gICAgPC9tYXQtY2hpcC1saXN0PlxuXG4gICAgPG1hdC1hdXRvY29tcGxldGUgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgKG9wdGlvblNlbGVjdGVkKT1cImFkZFJlc291cmNlKCRldmVudC5vcHRpb24udmFsdWUpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHJlc291cmNlIG9mIGZpbHRlcmVkQ29sbGVjdGlvbiB8IGFzeW5jOyB0cmFja0J5OiB0cmFja0J5SWRcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwiIWNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcy5maW5kKHJlc291cmNlLmlkKVwiIFt2YWx1ZV09XCJyZXNvdXJjZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImxheW91dC1tYXJnaW5cIj5wZXJzb248L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnt7IHJlc291cmNlLmF0dHJpYnV0ZXNbYXR0cmlidXRlc0Rpc3BsYXlbMF1dIH19PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgICAgICA8c21hbGwgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgKm5nRm9yPVwibGV0IGF0dHJpYnV0ZV9uYW1lIG9mIGF0dHJpYnV0ZXNEaXNwbGF5OyBsZXQgYXR0cl9pZCA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImF0dHJfaWQgPj0gMVwiPnwge3sgcmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVfbmFtZV0gfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gXG59KVxuZXhwb3J0IGNsYXNzIENoaXBzQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdyZXNvdXJjZUlucHV0JykgcHVibGljIHJlc291cmNlSW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHJlc291cmNlOiBSZXNvdXJjZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXJ2aWNlOiBTZXJ2aWNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZWxhdGlvbkFsaWFzOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZXNEaXNwbGF5OiBBcnJheTxzdHJpbmc+O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhcHBlYXJhbmNlOiAnc3RhbmRhcmQnIHwgJ291dGxpbmUnIHwgJ2xlZ2FjeScgfCAnZmlsbCc7XG4gICAgQElucHV0KCkgcHVibGljIG1hdExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHBhZ2U6IElQYWdlID0ge1xuICAgICAgICBudW1iZXI6IDEsXG4gICAgICAgIHNpemU6IDUwXG4gICAgfTtcblxuICAgIHB1YmxpYyB0cmFja0J5SWQgPSB0cmFja0J5SWQ7XG4gICAgcHVibGljIGZpbHRlcmVkQ29sbGVjdGlvbjogT2JzZXJ2YWJsZTxBcnJheTxSZXNvdXJjZT4+O1xuICAgIHB1YmxpYyBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgcHVibGljIGNvbGxlY3Rpb246IERvY3VtZW50Q29sbGVjdGlvbjtcbiAgICBwdWJsaWMgYWRkT25CbHVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHJlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNvbGxlY3Rpb25fcmVsYXRpb25zaGlwczogRG9jdW1lbnRDb2xsZWN0aW9uO1xuXG4gICAgcHJpdmF0ZSBjb2xsZWN0aW9uQXJyYXk6IEFycmF5PFJlc291cmNlPiA9IFtdO1xuICAgIHByaXZhdGUgY29sbGVjdGlvbkFycmF5TGFzdEZpbHRlclZhbHVlOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSB0aGlzLnNlcnZpY2UubmV3Q29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcyA9IDxEb2N1bWVudENvbGxlY3Rpb24+dGhpcy5yZXNvdXJjZS5yZWxhdGlvbnNoaXBzW3RoaXMucmVsYXRpb25BbGlhc107XG5cbiAgICAgICAgdGhpcy5maWx0ZXJlZENvbGxlY3Rpb24gPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgZmlsdGVyT3JSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVfdG9fc2VhcmNoOiB0aGlzLmF0dHJpYnV0ZXNEaXNwbGF5WzBdLFxuICAgICAgICAgICAgICAgIHJlc291cmNlc0FycmF5OiB0aGlzLmNvbGxlY3Rpb25BcnJheSxcbiAgICAgICAgICAgICAgICBnZXRBbGxGYzogdGhpcy5nZXRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBsYXN0X2ZpbHRlcl92YWx1ZTogdGhpcy5jb2xsZWN0aW9uQXJyYXlMYXN0RmlsdGVyVmFsdWUsXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5jb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIHBhZ2Vfc2l6ZTogdGhpcy5wYWdlLnNpemVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbChzZWFyY2hfdGV4dDogc3RyaW5nKTogT2JzZXJ2YWJsZTxEb2N1bWVudENvbGxlY3Rpb24+IHtcbiAgICAgICAgaWYgKHNlYXJjaF90ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUZpbHRlciA9IHsgLi4udGhpcy5yZW1vdGVGaWx0ZXIsIC4uLnsgW3RoaXMuYXR0cmlidXRlc0Rpc3BsYXlbMF1dOiBzZWFyY2hfdGV4dCB9fTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZVxuICAgICAgICAgICAgICAgIC5hbGwoe1xuICAgICAgICAgICAgICAgICAgICByZW1vdGVmaWx0ZXI6IHRoaXMucmVtb3RlRmlsdGVyLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiB7IG51bWJlcjogMSwgc2l6ZTogdGhpcy5wYWdlLnNpemUgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZVxuICAgICAgICAgICAgLmFsbCh7XG4gICAgICAgICAgICAgICAgcmVtb3RlZmlsdGVyOiB0aGlzLnJlbW90ZUZpbHRlcixcbiAgICAgICAgICAgICAgICBwYWdlOiB7IG51bWJlcjogMSwgc2l6ZTogdGhpcy5wYWdlLnNpemUgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZpbHRlckNvbGxlY3Rpb24oc2VhcmNoX3RleHQ6IHN0cmluZyB8IFJlc291cmNlKTogQXJyYXk8UmVzb3VyY2U+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSB0eXBlb2Ygc2VhcmNoX3RleHQgPT09ICdzdHJpbmcnID8gc2VhcmNoX3RleHQudG9Mb3dlckNhc2UoKSA6ICcnO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uZGF0YS5maWx0ZXIoKHJlc291cmNlOiBSZXNvdXJjZSkgPT4gcmVzb3VyY2UuYXR0cmlidXRlc1t0aGlzLmF0dHJpYnV0ZXNEaXNwbGF5WzBdXVxuICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgLmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZS5hZGRSZWxhdGlvbnNoaXAocmVzb3VyY2UsIHRoaXMucmVsYXRpb25BbGlhcyk7XG4gICAgICAgIHRoaXMucmVzb3VyY2VJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BsYXlOYW1lKHJlc291cmNlOiBSZXNvdXJjZSk6ICcnIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZS5yZW1vdmVSZWxhdGlvbnNoaXAodGhpcy5yZWxhdGlvbkFsaWFzLCByZXNvdXJjZS5pZCk7XG4gICAgfVxufVxuIl19