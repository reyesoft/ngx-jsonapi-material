/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { OnInit, EventEmitter } from '@angular/core';
import { Filter } from '../interfaces/filter.interface';
import { FilterOption } from '../interfaces/filter-option.interface';
export declare class JamFilterOptionsComponent implements OnInit {
    filterConfig: Filter;
    remoteFilter: object;
    remoteFilterChange: EventEmitter<any>;
    filterConfigArray: Array<FilterOption>;
    ngOnInit(): void;
    optionSelected(jsonvalue: any, filter_list: any): void;
}
