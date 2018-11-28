import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
export class ChipsAutocompleteComponent implements OnInit, OnDestroy {
    @ViewChild('resourceInput') public resourceInput: ElementRef;
    @Input() public placeholder: string;
    @Input() public resource: Resource;
    @Input() public relationTo: DocumentCollection<Resource>;
    @Input() public remoteFilter: { [key: string]: any };
    @Input() public service: Service<Resource>; // Esto esta por verse si se queda o no... incluye las lineas [21]
    @Input() public relationAlias: string;
    @Input() public attributesDisplay: Array<string>;

    public trackById = trackById;
    public filteredCollection: Observable<Array<Resource>>;
    public formControl: FormControl;
    public collection: DocumentCollection<Resource>;
    public addOnBlur: boolean = true;
    public selectable: boolean = true;
    public removable: boolean = true;

    private collectionArray: Array<Resource> = [];
    private collectionArrayLastFilterValue: string;

    public constructor() {
        this.formControl = new FormControl();
     }

    public ngOnInit(): void {
        this.collection = this.service.newCollection();

        this.service.all().subscribe(
            collection => console.log('collection', collection)
        );

        this.filteredCollection = this.formControl.valueChanges.pipe(
            filterOrRequest({
                resourcesArray: this.collectionArray,
                getAllFc: this.getAll.bind(this),
                last_filter_value: this.collectionArrayLastFilterValue,
                collection: this.collection
            })
        );
    }

    public ngOnDestroy() {
        // code...
    }

    public getAll(search_text: string): Observable<DocumentCollection<Resource>> {
        if (search_text) {
            this.attributesDisplay[0] = search_text;
            this.remoteFilter = { ...this.remoteFilter, ...[this.attributesDisplay[0]]};
            console.log('soy la busqueda actual', this.remoteFilter);
        }

        return this.service
            .all()
            .pipe(
                tap(collection => {
                    console.log('eh?', collection);
                    // this.collection = collection;
                    let relationships = (<DocumentCollection<Resource>>this.resource.relationships[this.relationAlias]);
                    for (let resource of relationships.data) {
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
        /**
         * @TODO COL-1295 corregir todo el componente, propiedades sin uso
         * selectable? removable?
         */
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
