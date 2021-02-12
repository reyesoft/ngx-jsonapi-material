import { Component, Input } from '@angular/core';

@Component({
    selector: 'jam-nothing-here',
    templateUrl: './nothing-here.component.html'
})
export class NothingHereComponent {
    @Input() public classed: string;
    @Input() public text: string = 'Todavía no tienes nada por aquí';
    @Input() public icon: string;
    @Input() public imageOrIcon: 'image' | 'icon' = 'icon';
}
