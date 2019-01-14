import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Destroyer } from '../destroyer';
import { Option, Button } from './button';

@Component({
    selector: 'jam-menu',
    styleUrls: ['./menu.component.scss'],
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnDestroy, OnChanges {
    @Input() public options: Array<Option>;
    @Input() public disabledButtons: Array<string>;
    @Input() public hiddenButtons: Array<string>;
    @Input() public hiddenSections: Array<string>;
    @Input() public data: Array<any>;
    @Output() public selected = new EventEmitter<{ key: string, data?: Array<any> }>();

    public destroyer = new Destroyer();

    public constructor(
        private matBottomSheet : MatBottomSheet
    ) { }

    public ngOnChanges(changes) {
        if (changes.disabledButtons) {
            this.updateButtonAttributes('disabled', true, this.disabledButtons);
        }

        if (changes.hiddenButtons) {
            this.updateButtonAttributes('hidden', true, this.hiddenButtons);
        }
    }

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
        .subscribe(response => this.selected.emit(this.getEmit(response)));
    }

    public selectedOption(selected: string): void {
        this.selected.emit(this.getEmit(selected));
    }

    private getEmit(response: string) {
        return { key: response, data: this.data || null };
    }

    private updateButtonAttributes(attribute: string, value: any, button_ids: Array<string>) {
        for (let button_id of button_ids) {
            for (let option of this.options) {
                let button = this.searchButton(button_id, option);
                if (!button) continue;
                button.attributes[attribute] = value;
            }
        }

        this.hiddenSection();
    }

    private searchButton(button_id: string, option: Option): Button {
        return option.buttons.find((button: Button) => {
            return button.id === button_id;
        });
    }

    private hiddenSection(): void {
        for (let option of this.options) {
            let count = 0;
            for (let button of option.buttons) {
                if (button.attributes.hidden) {
                    count++
                }

                if (option.buttons.length === count) {
                    option.hidden = true;
                }
            }
        }
    }
}
