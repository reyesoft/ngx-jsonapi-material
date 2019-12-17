import { RangeFilterInterface } from './range-filter.interface';

export interface NumberFilterInterface extends RangeFilterInterface {
    eq?: number;
    ne?: number;
    gt?: number;
    lt?: number;
    le?: number;
    ge?: number;
}
