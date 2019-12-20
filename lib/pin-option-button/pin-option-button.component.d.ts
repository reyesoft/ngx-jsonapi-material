import { OnInit, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
export interface IPinButton {
    index: number;
    label: string;
}
export declare class PinOptionButtonComponent implements OnInit {
    private matIconRegistry;
    private domSanitizer;
    options: Array<string>;
    specialKey: string;
    jamColor: 'primary' | 'accent' | 'warn' | 'default';
    selected: EventEmitter<IPinButton>;
    index: number;
    buttons: Array<IPinButton>;
    selected_option: IPinButton;
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer);
    ngOnInit(): void;
    pinnedOption(event: any, button: IPinButton): void;
    pinButton(): void;
    private populateMenu;
    private defaultSelectedOption;
}
