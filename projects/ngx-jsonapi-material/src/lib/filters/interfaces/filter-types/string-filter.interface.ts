import { RangeFilterInterface } from './range-filter.interface';

export interface StringFilterInterface extends RangeFilterInterface{
    eq?: string;
    ne?: string;
    contains?: string;
    nc?: string;
    like?: string;
}
