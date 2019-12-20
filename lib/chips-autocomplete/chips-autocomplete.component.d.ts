import { OnInit, ElementRef } from '@angular/core';
import { Resource, DocumentCollection, Service } from 'ngx-jsonapi';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { trackById } from '../track-by-id';
import { IPage } from 'ngx-jsonapi/interfaces/page';
export declare class ChipsAutocompleteComponent implements OnInit {
    resourceInput: ElementRef;
    placeholder: string;
    resource: Resource;
    remoteFilter: {
        [key: string]: any;
    };
    service: Service;
    relationAlias: string;
    attributesDisplay: Array<string>;
    appearance: 'standard' | 'outline' | 'legacy' | 'fill';
    matLabel: string;
    page: IPage;
    trackById: typeof trackById;
    filteredCollection: Observable<Array<Resource>>;
    formControl: FormControl;
    collection: DocumentCollection;
    addOnBlur: boolean;
    selectable: boolean;
    removable: boolean;
    collection_relationships: DocumentCollection;
    private collectionArray;
    private collectionArrayLastFilterValue;
    constructor();
    ngOnInit(): void;
    getAll(search_text: string): Observable<DocumentCollection>;
    filterCollection(search_text: string | Resource): Array<Resource>;
    addResource(resource: Resource): void;
    displayName(resource: Resource): '';
    removeResource(resource: Resource): void;
}
