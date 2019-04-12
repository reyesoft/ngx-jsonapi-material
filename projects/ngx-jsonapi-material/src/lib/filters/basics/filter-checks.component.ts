import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterChecks } from '../interfaces/filter-checks.interface';
import { FilterOption } from '../interfaces/filter-option.interface';

export interface IOption {
    key: string;
    name: string;
}

@Component({
    selector: 'jam-filter-checks',
    templateUrl: './filter-checks.component.html'
})
export class JamFilterChecksComponent implements OnInit {
    @Input() public filterConfig: FilterChecks;
    @Input() public remoteFilter: object;

    @Output() public filterConfigChange = new EventEmitter<any>();
    @Output() public remoteFilterChange = new EventEmitter<any>();

    public filter_config_options: Array<FilterOption>;

    public searchText: string = '';
    public show_input_search: boolean = false;

    public constructor() {
        // code...
    }

    public ngOnInit() {
        if (this.filterConfig.selected.length !== 0) {
            this.remoteFilter[this.filterConfig.attribute] = this.filterConfig.selected;
        }
        this.filterConfigOptionsUpdate();

        this.filter_config_options.sort((a, b) => {
            if ((<IOption>a.text).name.toLowerCase() < (<IOption>b.text).name.toLowerCase()) { return -1; }
            if ((<IOption>a.text).name.toLowerCase() > (<IOption>b.text).name.toLowerCase()) { return 1; }

            return 0;
        });

        this.showInputSearch();
    }

    public showInputSearch() {
        if (Object.keys(this.filterConfig.options).length > 10) {
            this.show_input_search = true;
        }
    }

    public filterConfigOptionsUpdate() {
        this.filter_config_options = Object.keys(this.filterConfig.options).map(key => {
            if (typeof this.filterConfig.options[key].text === 'string') {
                this.filterConfig.options[key].text = { key: key, name: this.filterConfig.options[key].text };
            }

            return this.filterConfig.options[key];
        });
    }

    public clearSelected() {
        this.filterConfig.selected = [];
    }

    public optionSelected(jsonvalue, filter_list): void {
        this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
        this.remoteFilterChange.emit(this.remoteFilter);
    }
}
