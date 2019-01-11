import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Destroyer } from '../destroyer';
import { Option } from './button';
import { DocumentCollection, Resource } from 'ngx-jsonapi';
import { Button } from 'ngx-jsonapi-material/public_api';

@Component({
    selector: 'jam-menu',
    styleUrls: ['./menu.component.scss'],
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnDestroy, OnInit {
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

    public ngOnInit() {
        if (this.disabledButtons && this.disabledButtons.length > 0) {
            this.updateButtonAttributes('disabled', true, this.disabledButtons);
        }

        if (this.hiddenButtons && this.hiddenButtons.length > 0) {
            this.updateButtonAttributes('hidden', true, this.hiddenButtons);
        }

        // if (this.hiddenSections.length > 0) {

        // }
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
                option.buttons
                    .find((button): boolean => {
                        if (button.id !== button_id) return;
                        button.attributes[attribute] = value;
                    })
            }
        }
    }
}
