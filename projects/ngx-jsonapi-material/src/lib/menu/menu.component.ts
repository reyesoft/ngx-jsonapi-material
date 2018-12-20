import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Destroyer } from '../destroyer';
import { Option } from './button';

@Component({
    selector: 'jam-menu',
    styleUrls: ['./menu.component.scss'],
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnDestroy {
    @Input() public options: Array<Option>;
    @Output() public selected = new EventEmitter<string>();

    public destroyer = new Destroyer();

    public constructor(
        private matBottomSheet : MatBottomSheet
    ) { }

    public ngOnDestroy(): void {
        this.destroyer.destroy();
    }

    public open() {
        this.matBottomSheet.open(BottomSheetComponent, {
            data: { options: this.options }
        })
        .afterDismissed()
        .pipe(
            this.destroyer.pipe(),
            filter(response => ![null, undefined, ''].includes(response))
        )
        .subscribe(response => this.selected.emit(response));
    }

    public selectedOption(selected: string): void {
        this.selected.emit(selected);
    }
}
