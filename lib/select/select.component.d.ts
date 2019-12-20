import { EventEmitter, OnInit } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
export declare class SelectComponent implements OnInit {
    appareance: 'fill' | 'outline' | 'legacy' | 'standard';
    floatLabel: 'never' | 'always';
    multiple: boolean;
    parentId: string;
    toRelate: Resource;
    placeholder: string;
    label: string;
    displayAttribute: string;
    collection: DocumentCollection;
    removeRelationships: boolean;
    disabled: boolean;
    limit: number;
    hasRefresh: boolean;
    toRelateChange: EventEmitter<Resource>;
    refresh: EventEmitter<any>;
    adaptiveArray: Array<Resource>;
    clear_relationships: any;
    searchText: string;
    ngOnInit(): void;
    updateFilter(search_text: string): void;
    updateRelationships(resource: Resource): void;
}
