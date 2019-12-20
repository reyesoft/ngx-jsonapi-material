import { OnInit, OnDestroy, ElementRef, EventEmitter, ChangeDetectorRef, TrackByFunction } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Resource, DocumentCollection, Service } from 'ngx-jsonapi';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';
export declare class JamAutocompleteComponent implements OnInit, OnDestroy {
    private changeDetectorRef;
    /**
     * @param  {boolean} previewSelected
     * @usageNotes By default it is `false`.
     * In case it is `true`, the autocomplete,
     * shows in the placeholder or matLabel a preview of the selected item.
     */
    previewSelected: boolean;
    /**
     * @param {string} displayText
     * @usageNotes Text of the selected item.
     */
    toggleResource: Resource;
    placeholder: string;
    services: Service;
    displayAttributes: Array<string>;
    remoteFilter: {};
    include: Array<string>;
    sort: Array<string>;
    icon: string;
    showList: boolean;
    toggleResourceChange: EventEmitter<Resource>;
    autocompleteResource: MatAutocompleteTrigger;
    autocompleteResourceInput: ElementRef;
    collection: DocumentCollection;
    filtered_resource: Observable<Array<Resource>>;
    dataArrived: Subject<string>;
    myForm: FormGroup;
    autocompleteCtrl: FormControl;
    resourceArray: Array<Resource>;
    use_is_loading: boolean;
    trackByFn: TrackByFunction<Resource>;
    resourceArrayLastFilterValue: string;
    private destroyer;
    private readonly collectionPerPage;
    private readonly resource_max_on_list;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    ngOnInit(): void;
    closeAutocomplete(): void;
    selectedResource(resource: Resource): void;
    displayFn(resource?: Resource): string;
    refresh(): void;
    getAll(search_text: string): Observable<DocumentCollection>;
    clearDisplay(): void;
    private filterResourceByName;
}
