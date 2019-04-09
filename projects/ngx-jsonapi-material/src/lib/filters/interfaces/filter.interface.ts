/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { FilterOption } from './filter-option.interface';

export interface Filter {
    type: 'options' | 'checks' | 'range_date';
    attribute: string;
    options: {
        [jsonvalue: string]: FilterOption;
    };
    selected: string | Array<string> | object;
    title?: string;
    loaded?: boolean;
}

export class FilterConfig {
    public type: 'options' | 'checks' | 'range_date';
    public attribute: string;
    public options: {
        [jsonvalue: string]: FilterOption;
    };
    public selected: string | Array<string> | object;
    public title: string;
}
