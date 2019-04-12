import { Filter } from './filter.interface';

export interface FilterChecks extends Filter {
    type: 'checks';
    selected: Array<string>;
}
