import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../menu-elements/section';

@Component({
    selector: 'jam-dropdown-menu',
    styleUrls: ['../menu.component.scss'],
    templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent {
    @Input() public sections: Array<Section>;
    @Input() public main_image: { url: string; styles: {[key: string]: string}};
    @Output() public selected = new EventEmitter<string>();
}
