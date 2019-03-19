import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { Menu } from './menu-elements/menu';
import { Section } from './menu-elements/section';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Destroyer } from '../destroyer';
import { Button } from './menu-elements/button';

@Component({
    selector: 'jam-menu',
    styleUrls: ['./menu.component.scss'],
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {
    @Input() public menu: Menu;
    @Input() public source_data: Array<any>;
    @Output() public selected = new EventEmitter<{ key: string; data?: Array<any> }>();

    public destroyer = new Destroyer();

    public constructor(
        private matBottomSheet: MatBottomSheet
    ) {}

    public ngOnInit() {
        if (this.menu.main_image && !this.menu.main_image.styles) {
            this.menu.main_image.styles = { 'border-radius': '100px', width: '40px', height: '40px' };
        }
        this.menu.removeEmptySections();
    }

    public ngOnDestroy(): void {
        this.destroyer.destroy();
    }

    public open() {
        this.matBottomSheet.open(BottomSheetComponent, {
            data: { sections: this.menu.data }
        })
        .afterDismissed()
        .pipe(
            this.destroyer.pipe(),
            filter(response => ![null, undefined, ''].includes(response))
        )
        .subscribe(response => this.selected.emit(this.formatEmission(response)));
    }

    public selectedOption(selected: string): void {
        this.selected.emit(this.formatEmission(selected));
    }

    private formatEmission(response: string) {
        return { key: response, data: this.source_data || null };
    }
}
