import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, EventEmitter, Output, ChangeDetectorRef, TrackByFunction } from '@angular/core';
import { Observable, merge, Subject, Subscription } from 'rxjs';
import { Resource, DocumentCollection, Service, IParamsCollection } from 'ngx-jsonapi';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, startWith, map, timeout, filter, finalize, tap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
import { filterOrRequest } from '../../lib/batch';
import { Destroyer } from '../../lib/destroyer';

@Component({
  selector: 'jam-autocomplete',
  templateUrl: 'autocomplete.component.html'
})
export class JamAutocompleteComponent implements OnInit, OnDestroy {
    /**
     * @param  {boolean} previewSelected
     * @usageNotes By default it is `false`.
     * In case it is `true`, the autocomplete,
     * shows in the placeholder or matLabel a preview of the selected item.
     */
    @Input() public previewSelected: boolean = false;
    /**
     * @param {string} displayText
     * @usageNotes Text of the selected item.
     */
    @Input() public displayText: string = '';
    @Input() public placeholder: string = 'Escribe algo que buscar';
    @Input() public services: Service;
    @Input() public displayAttributes: Array<string> = [];
    @Input() public useBatchAll = false;
    @Input() public include: Array<string> = [];
    @Input() public sort: Array<string> = [];
    @Input() public icon: string;
    @Input() public showList: boolean = true;
    @Output() public toggleResourceChange = new EventEmitter<Resource>();
    @ViewChild(MatAutocompleteTrigger) public autocompleteResource: MatAutocompleteTrigger;
    @ViewChild('autocompleteResource') public autocompleteResourceInput: ElementRef;

    public collection: DocumentCollection;
    public filtered_resource: Observable<Array<Resource>>;
    public dataArrived: Subject<string> = new Subject();
    public myForm: FormGroup;
    public autocompleteCtrl: FormControl = new FormControl();
    public resourceArray: Array<Resource> = [];
    public use_is_loading = true;
    public trackByFn: TrackByFunction<Resource>;
    public resourceArrayLastFilterValue: string;

    private destroyer = new Destroyer();
    private readonly collectionPerPage = 100; // 500
    private readonly resource_max_on_list = 50;

    public constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    public ngOnDestroy() {
        this.destroyer.destroy();
    }

    public ngOnInit(): void {
        this.collection = this.services.newCollection();
        this.filtered_resource = this.autocompleteCtrl.valueChanges.pipe(
            this.destroyer.pipe(),
            filterOrRequest({
                attribute_to_search: this.displayAttributes[0],
                resourcesArray: this.resourceArray,
                getAllFc: this.getAll.bind(this),
                last_filter_value: this.resourceArrayLastFilterValue,
                collection: this.collection,
                page_size: this.collectionPerPage
            })
        );
    }

    public closeAutocomplete() {
        this.autocompleteResource.optionSelections.pipe(timeout(150)).subscribe(
            selection => {
                this.autocompleteResource.closePanel();
            },
            err => {
                this.autocompleteResource.closePanel();
            }
        );
    }

    public selectedResource(resource: Resource) {
        this.toggleResourceChange.emit(resource);

        this.displayText = this.displayPreview(resource.attributes[this.displayAttributes[0]]);
    }

    public displayPreview(display_text: string): string {
        return this.previewSelected ? display_text : this.placeholder;
    }

    public displayFn(resource?: Resource): string {
        return ''; // clear input after item selection
    }

    public refresh() {
        this.services.clearCacheMemory();
        this.use_is_loading = false;
    }

    public getAll(search_text: string): Observable<DocumentCollection> {
        let params: IParamsCollection = {
            page: {
                number: 1,
                size: this.collectionPerPage
            },
            remotefilter: {},
            include: this.include
        };
        if (search_text) {
            params.remotefilter = { [this.displayAttributes[0]]: search_text };
        }

        return this.services.all(params).pipe(
            filter(collection => collection.builded),
            tap(collection => {
                // if (!this.currentEntity) this.setCurrentEntityOrLoad();
                this.collection = collection;
            })
        );
    }

    public clearDisplayText(): void {
        this.displayText = '';
        this.autocompleteCtrl.setValue('');
    }

    private filterResourceByName(value: string | Resource): Array<Resource> {
        const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
        let count = 0;

        this.showList = !value && filterValue.length > 0;

        return this.resourceArray.filter((resource: Resource) => {
            if (
                count < this.resource_max_on_list &&
                (resource.attributes[this.displayAttributes[0]].toLowerCase().indexOf(filterValue) === 0 ||
                    resource.attributes[this.displayAttributes[0]].toLowerCase().indexOf(' ' + filterValue) > 0)
            ) {
                return count += 1;
            }
        });
    }
}
