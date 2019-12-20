import { Filter, FilterConfig } from './filter.interface';
import { DateRangeFilterInterface } from './filter-types/date-range-filter.interface';
export interface FilterDateRange extends Filter {
    type: 'range_date';
    selected: DateRangeFilterInterface;
}
export declare class JsonapiFilterRangedateConfig extends FilterConfig implements FilterDateRange {
    type: 'range_date';
    attribute: string;
    options: {};
    selected: {
        since: string;
        until: string;
    };
    setProperty(property_name: any, property_value: any): this;
}
