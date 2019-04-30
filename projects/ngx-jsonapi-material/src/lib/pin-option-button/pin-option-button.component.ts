import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export interface IPinButton {
    index: number;
    label: string;
}

@Component({
    selector: 'jam-pin-option-button',
    templateUrl: './pin-option-button.component.html',
    styleUrls: ['./pin-option-button.component.scss']
})
export class PinOptionButtonComponent implements OnInit {
    @Input() public options: Array<string>;
    @Input() public specialKey: string;
    @Input() public jamColor: 'primary' | 'accent' | 'warn' | 'default' = 'default';

    @Output() public selected = new EventEmitter<IPinButton>();

    public index: number;
    public buttons: Array<IPinButton> = [];
    public selected_option: IPinButton;

    public constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {}

    public ngOnInit(): void {
        this.populateMenu();
        this.selected_option = this.defaultSelectedOption();

        this.matIconRegistry.addSvgIconSet(
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/all_custom_icons.svg')
        );
    }

    public pinnedOption(event, button: IPinButton): void {
        event.stopPropagation();

        this.selected_option = {
            index: button.index,
            label: button.label
        };

        localStorage.setItem(this.specialKey + '_pinned_creation_option', JSON.stringify(button));
    }

    public pinButton(): void {
        this.selected.emit(this.selected_option);
    }

    private populateMenu(): void {
        let count = 0;

        for (let option of this.options) {
            this.buttons.push({ index: count, label: option });
            count++;
        }
    }

    private defaultSelectedOption(): IPinButton {
        let local_storage_item = localStorage.getItem(this.specialKey + '_pinned_creation_option');

        return local_storage_item ? JSON.parse(local_storage_item) : this.buttons[0];
    }
}
