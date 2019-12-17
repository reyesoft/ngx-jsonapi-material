import { Filter, FilterConfig } from './filter.interface';
import { DateRangeFilterInterface } from './filter-types/date-range-filter.interface';

export interface FilterDateRange extends Filter {
    type: 'range_date';
    selected: DateRangeFilterInterface;
}

export class JsonapiFilterRangedateConfig extends FilterConfig implements FilterDateRange {
    public type: 'range_date';
    public attribute = 'date';
    public options = {};
    public selected = { since: '', until: '' };

    public setProperty(property_name, property_value) {
        this[property_name] = property_value;

        return this;
    }
}
