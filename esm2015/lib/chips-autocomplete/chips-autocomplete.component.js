import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Resource, Service } from 'ngx-jsonapi';
import { FormControl } from '@angular/forms';
import { filterOrRequest } from '../batch';
import { trackById } from '../track-by-id';
export class ChipsAutocompleteComponent {
    constructor() {
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
    ngOnInit() {
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
    }
    getAll(search_text) {
        if (search_text) {
            this.remoteFilter = Object.assign({}, this.remoteFilter, { [this.attributesDisplay[0]]: search_text });
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
    }
    filterCollection(search_text) {
        const filterValue = typeof search_text === 'string' ? search_text.toLowerCase() : '';
        return this.collection.data.filter((resource) => resource.attributes[this.attributesDisplay[0]]
            .toLowerCase()
            .indexOf(filterValue) >= 0);
    }
    addResource(resource) {
        this.resource.addRelationship(resource, this.relationAlias);
        this.resourceInput.nativeElement.value = '';
        this.formControl.setValue(null);
    }
    displayName(resource) {
        return '';
    }
    removeResource(resource) {
        this.resource.removeRelationship(this.relationAlias, resource.id);
    }
}
ChipsAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-chips-autocomplete',
                template: `<mat-form-field [style.width.%]="'100'" [appearance]="appearance">
    <mat-label *ngIf="matLabel">{{ matLabel }}</mat-label>
    <mat-chip-list #chipList>
        <mat-chip
            *ngFor="let resource_resource of collection_relationships.data; trackBy: collection_relationships.trackBy"
            [selectable]="selectable"
            [removable]="removable"
            (removed)="removeResource(resource_resource)">
            {{ resource_resource.attributes[attributesDisplay[0]] }}
        <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
        </mat-chip>
        <input
            [placeholder]="placeholder || ''"
            #resourceInput
            [formControl]="formControl"
            [matAutocomplete]="auto"
            [matChipInputFor]="chipList"
            [matChipInputAddOnBlur]="addOnBlur">
    </mat-chip-list>

    <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete" (optionSelected)="addResource($event.option.value)">
        <ng-container *ngFor="let resource of filteredCollection | async; trackBy: trackById">
            <mat-option *ngIf="!collection_relationships.find(resource.id)" [value]="resource">
                <div fxLayout="row" fxLayoutAlign="start center">
                    <mat-icon class="layout-margin">person</mat-icon>
                    <strong>{{ resource.attributes[attributesDisplay[0]] }}</strong>
                    &nbsp;
                    <small fxLayout="row" fxLayoutAlign="start center" *ngFor="let attribute_name of attributesDisplay; let attr_id = index">
                        <span *ngIf="attr_id >= 1">| {{ resource.attributes[attribute_name] }}</span>
                    </small>
                </div>
            </mat-option>
        </ng-container>
    </mat-autocomplete>
</mat-form-field>
`
            },] },
];
/** @nocollapse */
ChipsAutocompleteComponent.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2NoaXBzLWF1dG9jb21wbGV0ZS9jaGlwcy1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBc0IsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQTBDM0MsTUFBTSxPQUFPLDBCQUEwQjtJQTJCbkM7UUFqQmdCLFNBQUksR0FBVTtZQUMxQixNQUFNLEVBQUUsQ0FBQztZQUNULElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUVLLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFJdEIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHekIsb0JBQWUsR0FBb0IsRUFBRSxDQUFDO1FBSTFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUssUUFBUTtRQUNYLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsd0JBQXdCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVwRyxJQUFJLENBQUMsa0JBQWtC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bXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2UsIERvY3VtZW50Q29sbGVjdGlvbiwgU2VydmljZSB9IGZyb20gJ25neC1qc29uYXBpJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZmlsdGVyT3JSZXF1ZXN0IH0gZnJvbSAnLi4vYmF0Y2gnO1xuaW1wb3J0IHsgdHJhY2tCeUlkIH0gZnJvbSAnLi4vdHJhY2stYnktaWQnO1xuaW1wb3J0IHsgSVBhZ2UgfSBmcm9tICduZ3gtanNvbmFwaS9pbnRlcmZhY2VzL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1jaGlwcy1hdXRvY29tcGxldGUnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIFtzdHlsZS53aWR0aC4lXT1cIicxMDAnXCIgW2FwcGVhcmFuY2VdPVwiYXBwZWFyYW5jZVwiPlxuICAgIDxtYXQtbGFiZWwgKm5nSWY9XCJtYXRMYWJlbFwiPnt7IG1hdExhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgPG1hdC1jaGlwLWxpc3QgI2NoaXBMaXN0PlxuICAgICAgICA8bWF0LWNoaXBcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCByZXNvdXJjZV9yZXNvdXJjZSBvZiBjb2xsZWN0aW9uX3JlbGF0aW9uc2hpcHMuZGF0YTsgdHJhY2tCeTogY29sbGVjdGlvbl9yZWxhdGlvbnNoaXBzLnRyYWNrQnlcIlxuICAgICAgICAgICAgW3NlbGVjdGFibGVdPVwic2VsZWN0YWJsZVwiXG4gICAgICAgICAgICBbcmVtb3ZhYmxlXT1cInJlbW92YWJsZVwiXG4gICAgICAgICAgICAocmVtb3ZlZCk9XCJyZW1vdmVSZXNvdXJjZShyZXNvdXJjZV9yZXNvdXJjZSlcIj5cbiAgICAgICAgICAgIHt7IHJlc291cmNlX3Jlc291cmNlLmF0dHJpYnV0ZXNbYXR0cmlidXRlc0Rpc3BsYXlbMF1dIH19XG4gICAgICAgIDxtYXQtaWNvbiBtYXRDaGlwUmVtb3ZlICpuZ0lmPVwicmVtb3ZhYmxlXCI+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgfHwgJydcIlxuICAgICAgICAgICAgI3Jlc291cmNlSW5wdXRcbiAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIlxuICAgICAgICAgICAgW21hdENoaXBJbnB1dEZvcl09XCJjaGlwTGlzdFwiXG4gICAgICAgICAgICBbbWF0Q2hpcElucHV0QWRkT25CbHVyXT1cImFkZE9uQmx1clwiPlxuICAgIDwvbWF0LWNoaXAtbGlzdD5cblxuICAgIDxtYXQtYXV0b2NvbXBsZXRlIGF1dG9BY3RpdmVGaXJzdE9wdGlvbiAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiIChvcHRpb25TZWxlY3RlZCk9XCJhZGRSZXNvdXJjZSgkZXZlbnQub3B0aW9uLnZhbHVlKVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCByZXNvdXJjZSBvZiBmaWx0ZXJlZENvbGxlY3Rpb24gfCBhc3luYzsgdHJhY2tCeTogdHJhY2tCeUlkXCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdJZj1cIiFjb2xsZWN0aW9uX3JlbGF0aW9uc2hpcHMuZmluZChyZXNvdXJjZS5pZClcIiBbdmFsdWVdPVwicmVzb3VyY2VcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJsYXlvdXQtbWFyZ2luXCI+cGVyc29uPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57eyByZXNvdXJjZS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZXNEaXNwbGF5WzBdXSB9fTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAmbmJzcDtcbiAgICAgICAgICAgICAgICAgICAgPHNtYWxsIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0Zvcj1cImxldCBhdHRyaWJ1dGVfbmFtZSBvZiBhdHRyaWJ1dGVzRGlzcGxheTsgbGV0IGF0dHJfaWQgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhdHRyX2lkID49IDFcIj58IHt7IHJlc291cmNlLmF0dHJpYnV0ZXNbYXR0cmlidXRlX25hbWVdIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NtYWxsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L21hdC1hdXRvY29tcGxldGU+XG48L21hdC1mb3JtLWZpZWxkPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBDaGlwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZCgncmVzb3VyY2VJbnB1dCcpIHB1YmxpYyByZXNvdXJjZUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZXNvdXJjZTogUmVzb3VyY2U7XG4gICAgQElucHV0KCkgcHVibGljIHJlbW90ZUZpbHRlcjogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VydmljZTogU2VydmljZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVsYXRpb25BbGlhczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhdHRyaWJ1dGVzRGlzcGxheTogQXJyYXk8c3RyaW5nPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgYXBwZWFyYW5jZTogJ3N0YW5kYXJkJyB8ICdvdXRsaW5lJyB8ICdsZWdhY3knIHwgJ2ZpbGwnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtYXRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwYWdlOiBJUGFnZSA9IHtcbiAgICAgICAgbnVtYmVyOiAxLFxuICAgICAgICBzaXplOiA1MFxuICAgIH07XG5cbiAgICBwdWJsaWMgdHJhY2tCeUlkID0gdHJhY2tCeUlkO1xuICAgIHB1YmxpYyBmaWx0ZXJlZENvbGxlY3Rpb246IE9ic2VydmFibGU8QXJyYXk8UmVzb3VyY2U+PjtcbiAgICBwdWJsaWMgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIHB1YmxpYyBjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb247XG4gICAgcHVibGljIGFkZE9uQmx1cjogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHNlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyByZW1vdmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBjb2xsZWN0aW9uX3JlbGF0aW9uc2hpcHM6IERvY3VtZW50Q29sbGVjdGlvbjtcblxuICAgIHByaXZhdGUgY29sbGVjdGlvbkFycmF5OiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgICBwcml2YXRlIGNvbGxlY3Rpb25BcnJheUxhc3RGaWx0ZXJWYWx1ZTogc3RyaW5nO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gdGhpcy5zZXJ2aWNlLm5ld0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uX3JlbGF0aW9uc2hpcHMgPSA8RG9jdW1lbnRDb2xsZWN0aW9uPnRoaXMucmVzb3VyY2UucmVsYXRpb25zaGlwc1t0aGlzLnJlbGF0aW9uQWxpYXNdO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyZWRDb2xsZWN0aW9uID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGZpbHRlck9yUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlX3RvX3NlYXJjaDogdGhpcy5hdHRyaWJ1dGVzRGlzcGxheVswXSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXNBcnJheTogdGhpcy5jb2xsZWN0aW9uQXJyYXksXG4gICAgICAgICAgICAgICAgZ2V0QWxsRmM6IHRoaXMuZ2V0QWxsLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgbGFzdF9maWx0ZXJfdmFsdWU6IHRoaXMuY29sbGVjdGlvbkFycmF5TGFzdEZpbHRlclZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246IHRoaXMuY29sbGVjdGlvbixcbiAgICAgICAgICAgICAgICBwYWdlX3NpemU6IHRoaXMucGFnZS5zaXplXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGwoc2VhcmNoX3RleHQ6IHN0cmluZyk6IE9ic2VydmFibGU8RG9jdW1lbnRDb2xsZWN0aW9uPiB7XG4gICAgICAgIGlmIChzZWFyY2hfdGV4dCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdGVGaWx0ZXIgPSB7IC4uLnRoaXMucmVtb3RlRmlsdGVyLCAuLi57IFt0aGlzLmF0dHJpYnV0ZXNEaXNwbGF5WzBdXTogc2VhcmNoX3RleHQgfX07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VcbiAgICAgICAgICAgICAgICAuYWxsKHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3RlZmlsdGVyOiB0aGlzLnJlbW90ZUZpbHRlcixcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogeyBudW1iZXI6IDEsIHNpemU6IHRoaXMucGFnZS5zaXplIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VcbiAgICAgICAgICAgIC5hbGwoe1xuICAgICAgICAgICAgICAgIHJlbW90ZWZpbHRlcjogdGhpcy5yZW1vdGVGaWx0ZXIsXG4gICAgICAgICAgICAgICAgcGFnZTogeyBudW1iZXI6IDEsIHNpemU6IHRoaXMucGFnZS5zaXplIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaWx0ZXJDb2xsZWN0aW9uKHNlYXJjaF90ZXh0OiBzdHJpbmcgfCBSZXNvdXJjZSk6IEFycmF5PFJlc291cmNlPiB7XG4gICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdHlwZW9mIHNlYXJjaF90ZXh0ID09PSAnc3RyaW5nJyA/IHNlYXJjaF90ZXh0LnRvTG93ZXJDYXNlKCkgOiAnJztcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmRhdGEuZmlsdGVyKChyZXNvdXJjZTogUmVzb3VyY2UpID0+IHJlc291cmNlLmF0dHJpYnV0ZXNbdGhpcy5hdHRyaWJ1dGVzRGlzcGxheVswXV1cbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIC5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUmVzb3VyY2UocmVzb3VyY2U6IFJlc291cmNlKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzb3VyY2UuYWRkUmVsYXRpb25zaGlwKHJlc291cmNlLCB0aGlzLnJlbGF0aW9uQWxpYXMpO1xuICAgICAgICB0aGlzLnJlc291cmNlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKG51bGwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNwbGF5TmFtZShyZXNvdXJjZTogUmVzb3VyY2UpOiAnJyB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlUmVzb3VyY2UocmVzb3VyY2U6IFJlc291cmNlKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzb3VyY2UucmVtb3ZlUmVsYXRpb25zaGlwKHRoaXMucmVsYXRpb25BbGlhcywgcmVzb3VyY2UuaWQpO1xuICAgIH1cbn1cbiJdfQ==