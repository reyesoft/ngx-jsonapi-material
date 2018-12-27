import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '../button';

@Component({
    selector: 'jam-dropdown-menu',
    styleUrls: ['../menu.component.scss'],
    templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent {
    @Input() public options: Array<Option>;
    @Output() public selected = new EventEmitter<string>();
}
