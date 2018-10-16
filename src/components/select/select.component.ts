import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';

@Component({
    selector: 'jam-select',
    templateUrl: './select.component.html'
})
export class JamSelect implements OnInit {
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

    public constructor() {
        // code...
    }

    public ngOnInit() {
        if (this.limit) {
            this.adaptiveArray = this.collection.data.slice(0, Number(this.limit));
        } else {
            this.adaptiveArray = this.collection.data;
        }
        this.toRelate = this.collection[this.toRelate.id];
    }

    public updateRelationships() {
        this.toRelateChange.emit(this.toRelate);
    }
}
