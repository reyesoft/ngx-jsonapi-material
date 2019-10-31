import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Resource, DocumentCollection, Service, IParamsCollection } from 'ngx-jsonapi';
import { IPage } from 'ngx-jsonapi/interfaces/page';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { filterOrRequest } from '../batch';
import { filter, tap } from 'rxjs/operators';
import { ParentAutocomplete } from '../parent-autocomplete';

@Component({
    selector: 'jam-select',
    styleUrls: ['./select.component.scss'],
    templateUrl: './select.component.html'
})
export class SelectComponent extends ParentAutocomplete implements OnInit {
    @Input() public floatLabel: 'never' | 'always' = 'always';
    @Input() public multiple: boolean;
    @Input() public parentId: string;
    @Input() public removeRelationships: boolean;

    public clear_relationships = null;
    public searchText: string = '';
    public use_is_loading = true; // Esto mepa q vuela

    public constructor() {
        super();
    }

    public ngOnInit() {
        this.filteredCollection = this.autocompleteCtrl.valueChanges.pipe(
            filterOrRequest({
                attribute_to_search: this.displayAttributes[0],
                resourcesArray: this.collectionArray,
                getAllFc: this.getAll.bind(this),
                last_filter_value: this.collectionArrayLastFilterValue,
                collection: this.collection,
                page_size: this.collectionPerPage
            })
        );
    }

    public selectedResource(resource: Resource): void {
        if (!resource) {
            return;
        }

        this.toRelate = resource;
        this.toRelateChange.emit(resource);
        this.autocompleteCtrl.setValue(null);
    }

    public updateFilter(search_text: string): void {
        this.searchText = search_text;
        this.autocompleteCtrl.setValue(this.searchText);
    }

    public refresh() {
        this.service.clearCacheMemory();
        this.use_is_loading = false;
    }
}
