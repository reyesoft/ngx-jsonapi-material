import { OnInit, EventEmitter } from '@angular/core';
import { FilterChecks } from '../interfaces/filter-checks.interface';
import { FilterOption } from '../interfaces/filter-option.interface';
export interface IOption {
    key: string;
    name: string;
}
export declare class JamFilterChecksComponent implements OnInit {
    filterConfig: FilterChecks;
    remoteFilter: object;
    filterConfigChange: EventEmitter<any>;
    remoteFilterChange: EventEmitter<any>;
    filter_config_options: Array<FilterOption>;
    searchText: string;
    show_input_search: boolean;
    ngOnInit(): void;
    showInputSearch(): void;
    filterConfigOptionsUpdate(): void;
    clearSelected(): void;
    optionSelected(jsonvalue: any, filter_list: any): void;
}
