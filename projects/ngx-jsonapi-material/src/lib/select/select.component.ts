import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';

@Component({
    selector: 'jam-select',
    styleUrls: ['./select.component.scss'],
    templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {
    @Input() public multiple: boolean;
    @Input() public parentId: string;
    @Input() public toRelate: Resource;
    @Input() public placeholder: string;
    @Input() public label: string;
    @Input() public displayAttribute: string;
    @Input() public collection: DocumentCollection;
    @Input() public removeRelationships: boolean;
    @Input() public disabled: boolean;
    @Input() public limit: number;
    @Input() public hasRefresh: boolean = false;

    @Output() public toRelateChange = new EventEmitter<Resource>();
    @Output() public refresh = new EventEmitter<any>();

    public adaptiveArray: Array<Resource> = [];
    public clear_relationships = {};

    public searchText: string = '';

    public ngOnInit() {
        if (this.limit) {
            this.adaptiveArray = this.collection.data.slice(0, Number(this.limit));
        } else {
            this.adaptiveArray = this.collection.data;
        }

        if (this.toRelate) {
            this.toRelate = this.collection.find(this.toRelate.id);
        }
    }

    public updateFilter(search_text: string): void {
        this.searchText = search_text;
    }

    public updateRelationships(resource: Resource) {
        this.toRelateChange.emit(resource);
    }
}
