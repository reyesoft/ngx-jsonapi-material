import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, EventEmitter, Output, ChangeDetectorRef, TrackByFunction } from '@angular/core';
import { Observable, merge, Subject, Subscription } from 'rxjs';
import { Resource, DocumentCollection, Service } from 'ngx-jsonapi';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, startWith, map, timeout, filter, finalize } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
import { batchAll } from '../../lib/batch';
import { Destroyer } from '../../lib/destroyer';

@Component({
  selector: 'jam-autocomplete',
  templateUrl: 'autocomplete.component.html'
})
export class JamAutocompleteComponent implements OnInit, OnDestroy {
    @Input() public services: Service;
    @Input() public displayAttributes: Array<string> = [];
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
    public dataLoading: Subscription;
    public use_is_loading = true;
    public trackByFn: TrackByFunction<Resource>;

    private destroyer = new Destroyer();
    private readonly collectionPerPage = 100; // 500
    private readonly resource_max_on_list = 50;

    public constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.myForm = new FormGroup({ autocompleteCtrl: new FormControl() });
    }

    public ngOnDestroy() {
        this.destroyer.destroy();
    }

    public ngOnInit(): void {
        this.filtered_resource = merge(this.dataArrived, this.autocompleteCtrl.valueChanges.pipe(debounceTime(400))).pipe(
            startWith(''),
            map(
                (text: string | Resource) =>
                    text ? this.filterResourceByName(text) : this.resourceArray.slice(0, this.resource_max_on_list)
            ),
            this.destroyer.pipe()
        );

        this.reload();
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
    }

    public displayFn(resource?: Resource): string {
        return ''; // clear input after item selection
    }

    public refresh() {
        this.services.clearCacheMemory();
        this.use_is_loading = false;
        this.reload();
    }

    private reload(): void {
        if (this.dataLoading) {
            this.dataLoading.unsubscribe();
        }
        this.collection = this.services.newCollection();
        this.resourceArray = [];

        this.dataLoading = batchAll<Service, Resource>(this.services, {
            include: this.include || null,
            sort: this.sort || null,
            ttl: 3600 * 20,
            page: { number: 1, size: this.collectionPerPage }
        }).pipe(
            filter(
                collection => (collection.builded && collection.data.length > 0) && (!this.use_is_loading || !collection.is_loading)
            ),
            finalize(() => {
                this.dataArrived.next(this.autocompleteCtrl.value);
                this.dataArrived.complete();
                this.changeDetectorRef.detectChanges();
            })
        )
        .subscribe(
            collection => {
                this.collection = collection;

                this.resourceArray = <Array<Resource>>[...this.resourceArray, ...collection.data];
                this.dataArrived.next(this.autocompleteCtrl.value);

                if (collection.data.length < this.collectionPerPage && this.dataLoading) {
                    this.dataLoading.unsubscribe();
                }
            });
    }

    private filterResourceByName(value: string | Resource): Array<Resource> {
        const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
        let count = 0;

        this.showList = value !== null && filterValue.length > 0;

        return this.resourceArray.filter((resource: Resource) => {
            if (
                count < this.resource_max_on_list &&
                (resource.attributes.name.toLowerCase().indexOf(filterValue) === 0 ||
                    resource.attributes.name.toLowerCase().indexOf(' ' + filterValue) > 0)
            ) {
                return ++count;
            }
        });
    }
}
