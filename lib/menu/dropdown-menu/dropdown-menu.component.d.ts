import { EventEmitter } from '@angular/core';
import { Section } from '../menu-elements/section';
export declare class DropdownMenuComponent {
    sections: Array<Section>;
    main_image: {
        url: string;
        styles: {
            [key: string]: string;
        };
    };
    selected: EventEmitter<string>;
}
