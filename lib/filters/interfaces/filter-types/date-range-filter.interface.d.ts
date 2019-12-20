import { RangeFilterInterface } from './range-filter.interface';
export interface DateRangeFilterInterface extends RangeFilterInterface {
    eq?: string;
    since?: string;
    until?: string;
}
