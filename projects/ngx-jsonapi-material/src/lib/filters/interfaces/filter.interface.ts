/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { FilterOption } from './filter-option.interface';
import { RangeFilterInterface } from './filter-types/range-filter.interface';
import { StringFilterInterface } from './filter-types/string-filter.interface';
import { NumberFilterInterface } from './filter-types/number-filter.interface';
import { DateRangeFilterInterface } from './filter-types/date-range-filter.interface';

export type ResourceFilter =
    string|number|Array<string>|object|RangeFilterInterface|StringFilterInterface|NumberFilterInterface|DateRangeFilterInterface;

export interface Filter {
    type: 'options' | 'checks' | 'range_date';
    attribute: string;
    options: {
        [jsonvalue: string]: FilterOption;
    };
    selected: ResourceFilter;
    title?: string;
    loaded?: boolean;
}

export class FilterConfig {
    public type: 'options' | 'checks' | 'range_date';
    public attribute: string;
    public options: {
        [jsonvalue: string]: FilterOption;
    };
    public selected: ResourceFilter;
    public title: string;
}
