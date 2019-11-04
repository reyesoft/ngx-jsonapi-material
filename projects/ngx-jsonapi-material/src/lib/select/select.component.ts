import { Component, Input, OnInit } from '@angular/core';
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

    public constructor() {
        super();
    }

    public ngOnInit() {
        this.reload();
    }

    public updateFilter(search_text: string): void {
        this.searchText = search_text;
        this.autocompleteCtrl.setValue(this.searchText);
    }
}
