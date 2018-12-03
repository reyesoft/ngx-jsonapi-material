import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Resource, DocumentCollection, Service } from 'ngx-jsonapi';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { filterOrRequest } from '../batch';
import { trackById } from '../trackById';

@Component({
    selector: 'jam-chips-autocomplete',
    templateUrl: './chips-autocomplete.component.html'
})
export class ChipsAutocompleteComponent implements OnInit {
    @ViewChild('resourceInput') public resourceInput: ElementRef;
    @Input() public placeholder: string;
    @Input() public resource: Resource;
    @Input() public remoteFilter: { [key: string]: any };
    @Input() public service: Service<Resource>;
    @Input() public relationAlias: string;
    @Input() public attributesDisplay: Array<string>;
    @Input() public appearance: 'standard' | 'outline' | 'legacy' | 'fill';
    @Input() public matLabel: string;

    public trackById = trackById;
    public filteredCollection: Observable<Array<Resource>>;
    public formControl: FormControl;
    public collection: DocumentCollection<Resource>;
    public addOnBlur: boolean = true;
    public selectable: boolean = true;
    public removable: boolean = true;
    public collection_relationships: DocumentCollection<Resource>;

    private collectionArray: Array<Resource> = [];
    private collectionArrayLastFilterValue: string;

    public constructor() {
        this.formControl = new FormControl();
     }

    public ngOnInit(): void {
        this.collection = this.service.newCollection();
        this.collection_relationships = <DocumentCollection>this.resource.relationships[this.relationAlias];

        this.filteredCollection = this.formControl.valueChanges.pipe(
            filterOrRequest({
                attribute_to_search: this.attributesDisplay[0],
                resourcesArray: this.collectionArray,
                getAllFc: this.getAll.bind(this),
                last_filter_value: this.collectionArrayLastFilterValue,
                collection: this.collection,
                page_size: 100
            })
        );
    }

    public getAll(search_text: string): Observable<DocumentCollection<Resource>> {
        if (search_text) {
            this.attributesDisplay[0] = search_text;
            this.remoteFilter = { ...this.remoteFilter, ...[this.attributesDisplay[0]]};
        }

        return this.service
            .all()
            .pipe(
                tap(collection => {
                    for (let resource of this.collection_relationships.data) {
                        if (collection.find(resource.id)) {
                            resource.attributes.__selected = true;
                        }
                    }
                })
            );
    }

    public filterCollection(search_text: string | Resource): Array<Resource> {
        const filterValue = typeof search_text === 'string' ? search_text.toLowerCase() : '';

        return this.collection.data.filter((resource: Resource) => {
            resource.attributes[this.attributesDisplay[0]]
                .toLowerCase()
                .indexOf(filterValue) >= 0
        });
    }

    public addResource(resource: Resource): void {
        resource.attributes.__selected = true;
        this.resource.addRelationship(resource, this.relationAlias);
        this.resourceInput.nativeElement.value = '';
        this.formControl.setValue(null);
    }

    public displayName(resource: Resource): '' {
        return '';
    }

    public removeResource(resource: Resource): void {
        resource.attributes.__selected = false;
        this.resource.removeRelationship(this.relationAlias, resource.id);
    }
}
