import { OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectionBarService } from '../selection-bar.service';
export declare class SelectionBarInfoComponent implements OnDestroy {
    protected selectionBarService: SelectionBarService;
    selection: SelectionModel<any>;
    label: string;
    private destroyer;
    constructor(selectionBarService: SelectionBarService);
    ngOnDestroy(): void;
    close(): void;
}
