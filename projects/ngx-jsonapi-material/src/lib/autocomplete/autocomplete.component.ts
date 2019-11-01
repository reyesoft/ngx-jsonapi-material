import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, EventEmitter, Output, ChangeDetectorRef, TrackByFunction } from '@angular/core';
import { Resource } from 'ngx-jsonapi';
import { timeout } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
import { Destroyer } from '../../lib/destroyer';
import { ParentAutocomplete } from '../parent-autocomplete';

@Component({
  selector: 'jam-autocomplete',
  styleUrls: ['./autocomplete.component.scss'],
  templateUrl: 'autocomplete.component.html'
})
export class JamAutocompleteComponent extends ParentAutocomplete implements OnInit, OnDestroy {
    /**
     * @param  {boolean} previewSelected
     * @usageNotes By default it is `false`.
     * In case it is `true`, the autocomplete,
     * shows in the placeholder or matLabel a preview of the selected item.
     */
    @Input() public previewSelected: boolean = false;
    @Input() public toggleResource: Resource;
    @Input() public icon: string;
    @Input() public showList: boolean = true;
    @Output() public toggleResourceChange = new EventEmitter<Resource>();
    @ViewChild(MatAutocompleteTrigger) public autocompleteResource: MatAutocompleteTrigger;
    @ViewChild('autocompleteResource') public autocompleteResourceInput: ElementRef;

    public trackByFn: TrackByFunction<Resource>;
    private destroyer = new Destroyer();

    public constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnDestroy() {
        this.destroyer.destroy();
    }

    public ngOnInit(): void {
        this.clearDisplay();
        this.collection = this.service.newCollection();
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
        if (!resource) {
            return;
        }

        if (this.previewSelected) {
            this.toRelate = resource;
        }

        this.toRelateChange.emit(resource);
    }

    public displayFn(resource?: Resource): string {
        return ''; // clear input after item selection
    }
}
