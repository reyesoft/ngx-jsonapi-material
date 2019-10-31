import { Resource, Service, DocumentCollection, IParamsCollection } from 'ngx-jsonapi';
import { Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { IPage } from 'ngx-jsonapi/interfaces/page';

export class ParentAutocomplete {
    @Input() public toRelate: Resource;
    @Input() public remoteFilter: { [key: string]: any };
    @Input() public placeholder: string;
    @Input() public service: Service;
    @Input() public matLabel: string;
    @Input() public disabled: boolean;
    @Input() public hasRefresh: boolean = false;
    @Input() public include: Array<string> = [];
    @Input() public displayAttributes: Array<string> = [];
    @Input() public sort: Array<string> = [];
    @Input() public appareance: 'fill' | 'outline' | 'legacy' | 'standard' = 'outline';
    @Output() public toRelateChange = new EventEmitter<Resource>();

    public autocompleteCtrl: FormControl = new FormControl();
    public collection: DocumentCollection;
    public filteredCollection: Observable<Array<Resource>>;
    protected collectionArrayLastFilterValue: string;
    protected collectionArray: Array<Resource> = [];
    protected readonly collectionPerPage = 100; // 500

    // public constructor() {
    // }

    public selectedResource(resource: Resource) {
        if (!resource) {
            return;
        }

        // lo definel hijo?
        // if (this.previewSelected) {
        //     this.toRelate = resource;
        // }

        this.toRelateChange.emit(resource);
    }

    public refresh() {
        this.service.clearCacheMemory();
        // this.use_is_loading = false; // Esto no se para q es...
    }

    public getAll(search_text: string): Observable<DocumentCollection> {
        let params: IParamsCollection = {
            page: { number: 1, size: this.collectionPerPage },
            remotefilter: this.remoteFilter,
            sort: this.sort,
            include: this.include
        };

        if (search_text) {
            params.remotefilter = { [this.displayAttributes[0]]: search_text };
        }

        return this.service.all(params).pipe(
            filter(collection => collection.builded),
            tap(collection => {
                this.collection = collection;
            })
        );
    }

    public clearDisplay(): void {
        this.toRelate = null;
        this.autocompleteCtrl.setValue('');
    }
}
