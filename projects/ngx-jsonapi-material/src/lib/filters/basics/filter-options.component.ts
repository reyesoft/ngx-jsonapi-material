/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Filter } from '../interfaces/filter.interface';
import { FilterOption } from '../interfaces/filter-option.interface';

@Component({
    selector: 'jam-filter-options',
    templateUrl: './filter-options.component.html'
})
export class JamFilterOptionsComponent implements OnInit {
    @Input() public filterConfig: Filter;
    @Input() public remoteFilter: object;
    @Output() public remoteFilterChange = new EventEmitter<any>();

    public filterConfigArray: Array<FilterOption>;

    public ngOnInit() {
        this.filterConfigArray = Object.keys(this.filterConfig.options).map(key => {
            this.filterConfig.options[key].text = { key: key, name: this.filterConfig.options[key].text };

            return this.filterConfig.options[key];
        });
    }

    public optionSelected(jsonvalue, filter_list): void {
        this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
        this.remoteFilterChange.emit(this.remoteFilter);
    }
}
