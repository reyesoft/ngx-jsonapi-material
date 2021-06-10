import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Destroyer } from '../../destroyer';
import { SelectionBarService } from '../selection-bar.service';

@Component({
    selector: 'jam-selection-bar-info',
    templateUrl: './selection-bar-info.component.html'
})
export class SelectionBarInfoComponent implements OnDestroy {
    public selection: SelectionModel<any>;
    public label: string;
    private destroyer = new Destroyer();

    public constructor(
        protected selectionBarService: SelectionBarService
    ) {
        this.selectionBarService.selected$
            .pipe(this.destroyer.pipe())
            .subscribe((selection): void => {
                this.selection = selection;
                this.label = selection.selected.length + (selection.selected.length >= 1 ? ' seleccionados' : ' seleccionado');
                if (selection.selected.length <= 0) this.selectionBarService.destroy();
            });
    }

    public ngOnDestroy() {
        this.destroyer.destroy();
    }

    public close(): void {
        this.selection.clear();
        this.selectionBarService.destroy();
    }
}
