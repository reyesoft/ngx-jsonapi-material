import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';

@Component({
    selector: 'jam-select',
    templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {
    @Input() public multiple: boolean;
    @Input() public parentId: string;
    @Input() public toRelate: Resource;
    @Input() public placeholder: string;
    @Input() public displayAttribute: string;
    @Input() public collection: DocumentCollection;
    @Input() public removeRelationships: boolean;
    @Input() public disabled: boolean;
    @Input() public limit: number;

    @Output() public toRelateChange = new EventEmitter<Resource>();
    public adaptiveArray: Array<Resource> = [];
    public clear_relationships = {}

    public ngOnInit() {
        if (this.limit) {
            this.adaptiveArray = this.collection.data.slice(0, Number(this.limit));
        } else {
            this.adaptiveArray = this.collection.data;
        }
        this.toRelate = this.collection.find(this.toRelate.id);
    }

    public updateRelationships(resource: Resource) {
        this.toRelateChange.emit(resource);
    }
}
