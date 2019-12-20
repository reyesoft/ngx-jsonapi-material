import { Component, Input, ElementRef, ViewChild, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Resource, Service } from 'ngx-jsonapi';
import { FormControl } from '@angular/forms';
import { timeout, filter, tap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
import { filterOrRequest } from '../../lib/batch';
import { Destroyer } from '../../lib/destroyer';
var JamAutocompleteComponent = /** @class */ (function () {
    function JamAutocompleteComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
         * @param  {boolean} previewSelected
         * @usageNotes By default it is `false`.
         * In case it is `true`, the autocomplete,
         * shows in the placeholder or matLabel a preview of the selected item.
         */
        this.previewSelected = false;
        this.placeholder = 'Escribe algo que buscar';
        this.displayAttributes = [];
        this.remoteFilter = {};
        this.include = [];
        this.sort = [];
        this.showList = true;
        this.toggleResourceChange = new EventEmitter();
        this.dataArrived = new Subject();
        this.autocompleteCtrl = new FormControl();
        this.resourceArray = [];
        this.use_is_loading = true;
        this.destroyer = new Destroyer();
        this.collectionPerPage = 100; // 500
        this.resource_max_on_list = 50;
    }
    JamAutocompleteComponent.prototype.ngOnDestroy = function () {
        this.destroyer.destroy();
    };
    JamAutocompleteComponent.prototype.ngOnInit = function () {
        this.collection = this.services.newCollection();
        this.filtered_resource = this.autocompleteCtrl.valueChanges.pipe(this.destroyer.pipe(), filterOrRequest({
            attribute_to_search: this.displayAttributes[0],
            resourcesArray: this.resourceArray,
            getAllFc: this.getAll.bind(this),
            last_filter_value: this.resourceArrayLastFilterValue,
            collection: this.collection,
            page_size: this.collectionPerPage
        }));
    };
    JamAutocompleteComponent.prototype.closeAutocomplete = function () {
        var _this = this;
        this.autocompleteResource.optionSelections.pipe(timeout(150)).subscribe(function (selection) {
            _this.autocompleteResource.closePanel();
        }, function (err) {
            _this.autocompleteResource.closePanel();
        });
    };
    JamAutocompleteComponent.prototype.selectedResource = function (resource) {
        if (!resource) {
            return;
        }
        if (this.previewSelected) {
            this.toggleResource = resource;
        }
        this.toggleResourceChange.emit(resource);
    };
    JamAutocompleteComponent.prototype.displayFn = function (resource) {
        return ''; // clear input after item selection
    };
    JamAutocompleteComponent.prototype.refresh = function () {
        this.services.clearCacheMemory();
        this.use_is_loading = false;
    };
    JamAutocompleteComponent.prototype.getAll = function (search_text) {
        var _this = this;
        var _a;
        var params = {
            page: {
                number: 1,
                size: this.collectionPerPage
            },
            remotefilter: this.remoteFilter,
            include: this.include
        };
        if (search_text) {
            params.remotefilter = (_a = {}, _a[this.displayAttributes[0]] = search_text, _a);
        }
        return this.services.all(params).pipe(filter(function (collection) { return collection.builded; }), tap(function (collection) {
            _this.collection = collection;
        }));
    };
    JamAutocompleteComponent.prototype.clearDisplay = function () {
        this.toggleResource = null;
        this.autocompleteCtrl.setValue('');
    };
    JamAutocompleteComponent.prototype.filterResourceByName = function (value) {
        var _this = this;
        var filterValue = typeof value === 'string' ? value.toLowerCase() : '';
        var count = 0;
        this.showList = !value && filterValue.length > 0;
        return this.resourceArray.filter(function (resource) {
            if (count < _this.resource_max_on_list &&
                (resource.attributes[_this.displayAttributes[0]].toLowerCase().indexOf(filterValue) === 0 ||
                    resource.attributes[_this.displayAttributes[0]].toLowerCase().indexOf(' ' + filterValue) > 0)) {
                return count += 1;
            }
        });
    };
    JamAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-autocomplete',
                    styles: [".custom-placeholder::-webkit-input-placeholder{color:inherit;opacity:1}.custom-placeholder::-moz-placeholder{color:inherit;opacity:1}.custom-placeholder::-ms-input-placeholder{color:inherit;opacity:1;color:inherit}.custom-placeholder::placeholder{color:inherit;opacity:1}.custom-placeholder:-ms-input-placeholder{color:inherit}"],
                    template: "<mat-form-field style=\"width: 100%\" *ngIf=\"collection\"\n    appearance=\"outline\" floatLabel=\"never\" color=\"accent\"\n>\n    <input matInput aria-label=\"Escribe algo que buscar\" name=\"autocomplete-resource\"\n        [placeholder]=\"toggleResource?.attributes[displayAttributes[0]] || placeholder\"\n        type=\"text\"\n        [ngClass]=\"toggleResource?.attributes[displayAttributes[0]] ? 'custom-placeholder' : null\"\n        [matAutocomplete]=\"auto\"\n        [formControl]=\"autocompleteCtrl\"\n        (blur)=\"closeAutocomplete()\"\n        id=\"autocompleteResource\"\n        #autocompleteResource\n    >\n\n    <mat-autocomplete #auto=\"matAutocomplete\"\n        [displayWith]=\"displayFn\"\n        (optionSelected)=\"selectedResource($event.option.value)\">\n        <div *ngIf=\"showList\">\n            <mat-option [value]=\"null\" (click)=\"clearDisplay()\">-- Ninguna --</mat-option>\n            <mat-option [ngClass]=\"toggleResource?.id === resource.id ? 'mat-selected mat-active' : null\"\n                [value]=\"resource\"\n                *ngFor=\"let resource of filtered_resource | async; trackBy: trackByFn\"\n            >\n                <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"4px\">\n                    <mat-icon *ngIf=\"icon\">{{ icon }}</mat-icon>\n                    <strong\n                        [innerHTML]=\"resource.attributes[displayAttributes[0]]\"\n                    ></strong>\n                    <ng-container *ngFor=\"let attribute of displayAttributes; let item = index\">\n                        <small *ngIf=\"item >= 1\"> | {{ resource.attributes[attribute] }}</small>\n                    </ng-container>\n                </div>\n            </mat-option>\n        </div>\n    </mat-autocomplete>\n\n    <div fxLayout=\"row\" matSuffix fxLayoutAlign=\"end center\">\n        <button mat-icon-button type=\"button\" class=\"mat-button\" matSuffix matTooltip=\"Limpiar selecci\u00F3n\"\n            *ngIf=\"toggleResource?.attributes[displayAttributes[0]] || autocompleteCtrl.value\"\n            [disabled]=\"!collection?.loaded\"\n            (click)=\"clearDisplay()\"\n        >\n            <mat-icon class=\"mat-hint\">close</mat-icon>\n        </button>\n\n        <button mat-icon-button type=\"button\" class=\"mat-button\" matSuffix matTooltip=\"Actualizar lista\"\n            [disabled]=\"!collection?.loaded\" (click)=\"$event.stopPropagation(); refresh()\">\n            <mat-icon class=\"mat-hint\">refresh</mat-icon>\n        </button>\n\n        <div class=\"mat-select-arrow-wrapper\">\n            <div class=\"mat-select-arrow\"></div>\n        </div>\n    </div>\n</mat-form-field>\n\n<mat-progress-bar class=\"progress-bar-autocomplete\"\n    *ngIf=\"!collection?.loaded\"\n    color=\"accent\"\n    mode=\"indeterminate\"\n></mat-progress-bar>\n"
                },] },
    ];
    /** @nocollapse */
    JamAutocompleteComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    JamAutocompleteComponent.propDecorators = {
        previewSelected: [{ type: Input }],
        toggleResource: [{ type: Input }],
        placeholder: [{ type: Input }],
        services: [{ type: Input }],
        displayAttributes: [{ type: Input }],
        remoteFilter: [{ type: Input }],
        include: [{ type: Input }],
        sort: [{ type: Input }],
        icon: [{ type: Input }],
        showList: [{ type: Input }],
        toggleResourceChange: [{ type: Output }],
        autocompleteResource: [{ type: ViewChild, args: [MatAutocompleteTrigger,] }],
        autocompleteResourceInput: [{ type: ViewChild, args: ['autocompleteResource',] }]
    };
    return JamAutocompleteComponent;
}());
export { JamAutocompleteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQ3JKLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBc0IsT0FBTyxFQUFxQixNQUFNLGFBQWEsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRDtJQXlHSSxrQ0FDWSxpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXZDaEQ7Ozs7O1dBS0c7UUFDYSxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQU1qQyxnQkFBVyxHQUFXLHlCQUF5QixDQUFDO1FBRWhELHNCQUFpQixHQUFrQixFQUFFLENBQUM7UUFDdEMsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsWUFBTyxHQUFrQixFQUFFLENBQUM7UUFDNUIsU0FBSSxHQUFrQixFQUFFLENBQUM7UUFFekIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN4Qix5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFB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LENBQUMsQ0FBQzthQUNyQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBek1KLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixNQUFNLEVBQUUsQ0FBQyx5VUFBeVUsQ0FBQztvQkFDblYsUUFBUSxFQUFFLHd6RkE2RFg7aUJBQ0E7Ozs7Z0JBMUUwRixpQkFBaUI7OztrQ0FrRnZHLEtBQUs7aUNBS0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7b0NBQ0wsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7dUNBQ0wsTUFBTTt1Q0FDTixTQUFTLFNBQUMsc0JBQXNCOzRDQUNoQyxTQUFTLFNBQUMsc0JBQXNCOztJQWlIckMsK0JBQUM7Q0FBQSxBQTFNRCxJQTBNQztTQXhJWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFRyYWNrQnlGdW5jdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUmVzb3VyY2UsIERvY3VtZW50Q29sbGVjdGlvbiwgU2VydmljZSwgSVBhcmFtc0NvbGxlY3Rpb24gfSBmcm9tICduZ3gtanNvbmFwaSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgdGltZW91dCwgZmlsdGVyLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgZmlsdGVyT3JSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vbGliL2JhdGNoJztcbmltcG9ydCB7IERlc3Ryb3llciB9IGZyb20gJy4uLy4uL2xpYi9kZXN0cm95ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdqYW0tYXV0b2NvbXBsZXRlJyxcbiAgc3R5bGVzOiBbYC5jdXN0b20tcGxhY2Vob2xkZXI6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6aW5oZXJpdDtvcGFjaXR5OjF9LmN1c3RvbS1wbGFjZWhvbGRlcjo6LW1vei1wbGFjZWhvbGRlcntjb2xvcjppbmhlcml0O29wYWNpdHk6MX0uY3VzdG9tLXBsYWNlaG9sZGVyOjotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6aW5oZXJpdDtvcGFjaXR5OjE7Y29sb3I6aW5oZXJpdH0uY3VzdG9tLXBsYWNlaG9sZGVyOjpwbGFjZWhvbGRlcntjb2xvcjppbmhlcml0O29wYWNpdHk6MX0uY3VzdG9tLXBsYWNlaG9sZGVyOi1tcy1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjppbmhlcml0fWBdLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBzdHlsZT1cIndpZHRoOiAxMDAlXCIgKm5nSWY9XCJjb2xsZWN0aW9uXCJcbiAgICBhcHBlYXJhbmNlPVwib3V0bGluZVwiIGZsb2F0TGFiZWw9XCJuZXZlclwiIGNvbG9yPVwiYWNjZW50XCJcbj5cbiAgICA8aW5wdXQgbWF0SW5wdXQgYXJpYS1sYWJlbD1cIkVzY3JpYmUgYWxnbyBxdWUgYnVzY2FyXCIgbmFtZT1cImF1dG9jb21wbGV0ZS1yZXNvdXJjZVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJ0b2dnbGVSZXNvdXJjZT8uYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlc1swXV0gfHwgcGxhY2Vob2xkZXJcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInRvZ2dsZVJlc291cmNlPy5hdHRyaWJ1dGVzW2Rpc3BsYXlBdHRyaWJ1dGVzWzBdXSA/ICdjdXN0b20tcGxhY2Vob2xkZXInIDogbnVsbFwiXG4gICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiXG4gICAgICAgIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVDdHJsXCJcbiAgICAgICAgKGJsdXIpPVwiY2xvc2VBdXRvY29tcGxldGUoKVwiXG4gICAgICAgIGlkPVwiYXV0b2NvbXBsZXRlUmVzb3VyY2VcIlxuICAgICAgICAjYXV0b2NvbXBsZXRlUmVzb3VyY2VcbiAgICA+XG5cbiAgICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gICAgICAgIFtkaXNwbGF5V2l0aF09XCJkaXNwbGF5Rm5cIlxuICAgICAgICAob3B0aW9uU2VsZWN0ZWQpPVwic2VsZWN0ZWRSZXNvdXJjZSgkZXZlbnQub3B0aW9uLnZhbHVlKVwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd0xpc3RcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJudWxsXCIgKGNsaWNrKT1cImNsZWFyRGlzcGxheSgpXCI+LS0gTmluZ3VuYSAtLTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIFtuZ0NsYXNzXT1cInRvZ2dsZVJlc291cmNlPy5pZCA9PT0gcmVzb3VyY2UuaWQgPyAnbWF0LXNlbGVjdGVkIG1hdC1hY3RpdmUnIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cInJlc291cmNlXCJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcmVzb3VyY2Ugb2YgZmlsdGVyZWRfcmVzb3VyY2UgfCBhc3luYzsgdHJhY2tCeTogdHJhY2tCeUZuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiNHB4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cImljb25cIj57eyBpY29uIH19PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZ1xuICAgICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJyZXNvdXJjZS5hdHRyaWJ1dGVzW2Rpc3BsYXlBdHRyaWJ1dGVzWzBdXVwiXG4gICAgICAgICAgICAgICAgICAgID48L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYXR0cmlidXRlIG9mIGRpc3BsYXlBdHRyaWJ1dGVzOyBsZXQgaXRlbSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgKm5nSWY9XCJpdGVtID49IDFcIj4gfCB7eyByZXNvdXJjZS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gfX08L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuXG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIG1hdFN1ZmZpeCBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtYnV0dG9uXCIgbWF0U3VmZml4IG1hdFRvb2x0aXA9XCJMaW1waWFyIHNlbGVjY2nDs25cIlxuICAgICAgICAgICAgKm5nSWY9XCJ0b2dnbGVSZXNvdXJjZT8uYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlc1swXV0gfHwgYXV0b2NvbXBsZXRlQ3RybC52YWx1ZVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJEaXNwbGF5KClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWJ1dHRvblwiIG1hdFN1ZmZpeCBtYXRUb29sdGlwPVwiQWN0dWFsaXphciBsaXN0YVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IHJlZnJlc2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5yZWZyZXNoPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1zZWxlY3QtYXJyb3ctd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1zZWxlY3QtYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L21hdC1mb3JtLWZpZWxkPlxuXG48bWF0LXByb2dyZXNzLWJhciBjbGFzcz1cInByb2dyZXNzLWJhci1hdXRvY29tcGxldGVcIlxuICAgICpuZ0lmPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiXG4gICAgY29sb3I9XCJhY2NlbnRcIlxuICAgIG1vZGU9XCJpbmRldGVybWluYXRlXCJcbj48L21hdC1wcm9ncmVzcy1iYXI+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEphbUF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBwcmV2aWV3U2VsZWN0ZWRcbiAgICAgKiBAdXNhZ2VOb3RlcyBCeSBkZWZhdWx0IGl0IGlzIGBmYWxzZWAuXG4gICAgICogSW4gY2FzZSBpdCBpcyBgdHJ1ZWAsIHRoZSBhdXRvY29tcGxldGUsXG4gICAgICogc2hvd3MgaW4gdGhlIHBsYWNlaG9sZGVyIG9yIG1hdExhYmVsIGEgcHJldmlldyBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgcHJldmlld1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlUZXh0XG4gICAgICogQHVzYWdlTm90ZXMgVGV4dCBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgdG9nZ2xlUmVzb3VyY2U6IFJlc291cmNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ0VzY3JpYmUgYWxnbyBxdWUgYnVzY2FyJztcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VydmljZXM6IFNlcnZpY2U7XG4gICAgQElucHV0KCkgcHVibGljIGRpc3BsYXlBdHRyaWJ1dGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHJlbW90ZUZpbHRlciA9IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpbmNsdWRlOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHNvcnQ6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93TGlzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgQE91dHB1dCgpIHB1YmxpYyB0b2dnbGVSZXNvdXJjZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzb3VyY2U+KCk7XG4gICAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSBwdWJsaWMgYXV0b2NvbXBsZXRlUmVzb3VyY2U6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXI7XG4gICAgQFZpZXdDaGlsZCgnYXV0b2NvbXBsZXRlUmVzb3VyY2UnKSBwdWJsaWMgYXV0b2NvbXBsZXRlUmVzb3VyY2VJbnB1dDogRWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyBjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb247XG4gICAgcHVibGljIGZpbHRlcmVkX3Jlc291cmNlOiBPYnNlcnZhYmxlPEFycmF5PFJlc291cmNlPj47XG4gICAgcHVibGljIGRhdGFBcnJpdmVkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHB1YmxpYyBteUZvcm06IEZvcm1Hcm91cDtcbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRlQ3RybDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICBwdWJsaWMgcmVzb3VyY2VBcnJheTogQXJyYXk8UmVzb3VyY2U+ID0gW107XG4gICAgcHVibGljIHVzZV9pc19sb2FkaW5nID0gdHJ1ZTtcbiAgICBwdWJsaWMgdHJhY2tCeUZuOiBUcmFja0J5RnVuY3Rpb248UmVzb3VyY2U+O1xuICAgIHB1YmxpYyByZXNvdXJjZUFycmF5TGFzdEZpbHRlclZhbHVlOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbGxlY3Rpb25QZXJQYWdlID0gMTAwOyAvLyA1MDBcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc291cmNlX21heF9vbl9saXN0ID0gNTA7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7fVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSB0aGlzLnNlcnZpY2VzLm5ld0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5maWx0ZXJlZF9yZXNvdXJjZSA9IHRoaXMuYXV0b2NvbXBsZXRlQ3RybC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveWVyLnBpcGUoKSxcbiAgICAgICAgICAgIGZpbHRlck9yUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlX3RvX3NlYXJjaDogdGhpcy5kaXNwbGF5QXR0cmlidXRlc1swXSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXNBcnJheTogdGhpcy5yZXNvdXJjZUFycmF5LFxuICAgICAgICAgICAgICAgIGdldEFsbEZjOiB0aGlzLmdldEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIGxhc3RfZmlsdGVyX3ZhbHVlOiB0aGlzLnJlc291cmNlQXJyYXlMYXN0RmlsdGVyVmFsdWUsXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5jb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIHBhZ2Vfc2l6ZTogdGhpcy5jb2xsZWN0aW9uUGVyUGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VBdXRvY29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlUmVzb3VyY2Uub3B0aW9uU2VsZWN0aW9ucy5waXBlKHRpbWVvdXQoMTUwKSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgc2VsZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZVJlc291cmNlLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlUmVzb3VyY2UuY2xvc2VQYW5lbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RlZFJlc291cmNlKHJlc291cmNlOiBSZXNvdXJjZSkge1xuICAgICAgICBpZiAoIXJlc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2UgPSByZXNvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2VDaGFuZ2UuZW1pdChyZXNvdXJjZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BsYXlGbihyZXNvdXJjZT86IFJlc291cmNlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICcnOyAvLyBjbGVhciBpbnB1dCBhZnRlciBpdGVtIHNlbGVjdGlvblxuICAgIH1cblxuICAgIHB1YmxpYyByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2VzLmNsZWFyQ2FjaGVNZW1vcnkoKTtcbiAgICAgICAgdGhpcy51c2VfaXNfbG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGwoc2VhcmNoX3RleHQ6IHN0cmluZyk6IE9ic2VydmFibGU8RG9jdW1lbnRDb2xsZWN0aW9uPiB7XG4gICAgICAgIGxldCBwYXJhbXM6IElQYXJhbXNDb2xsZWN0aW9uID0ge1xuICAgICAgICAgICAgcGFnZToge1xuICAgICAgICAgICAgICAgIG51bWJlcjogMSxcbiAgICAgICAgICAgICAgICBzaXplOiB0aGlzLmNvbGxlY3Rpb25QZXJQYWdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlZmlsdGVyOiB0aGlzLnJlbW90ZUZpbHRlcixcbiAgICAgICAgICAgIGluY2x1ZGU6IHRoaXMuaW5jbHVkZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoc2VhcmNoX3RleHQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5yZW1vdGVmaWx0ZXIgPSB7IFt0aGlzLmRpc3BsYXlBdHRyaWJ1dGVzWzBdXTogc2VhcmNoX3RleHQgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmFsbChwYXJhbXMpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLmJ1aWxkZWQpLFxuICAgICAgICAgICAgdGFwKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckRpc3BsYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUN0cmwuc2V0VmFsdWUoJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlsdGVyUmVzb3VyY2VCeU5hbWUodmFsdWU6IHN0cmluZyB8IFJlc291cmNlKTogQXJyYXk8UmVzb3VyY2U+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6ICcnO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIHRoaXMuc2hvd0xpc3QgPSAhdmFsdWUgJiYgZmlsdGVyVmFsdWUubGVuZ3RoID4gMDtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUFycmF5LmZpbHRlcigocmVzb3VyY2U6IFJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY291bnQgPCB0aGlzLnJlc291cmNlX21heF9vbl9saXN0ICYmXG4gICAgICAgICAgICAgICAgKHJlc291cmNlLmF0dHJpYnV0ZXNbdGhpcy5kaXNwbGF5QXR0cmlidXRlc1swXV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5hdHRyaWJ1dGVzW3RoaXMuZGlzcGxheUF0dHJpYnV0ZXNbMF1dLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignICcgKyBmaWx0ZXJWYWx1ZSkgPiAwKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==