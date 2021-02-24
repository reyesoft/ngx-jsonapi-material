import { Component, Input } from '@angular/core';

@Component({
    selector: 'jam-nothing-here',
    styleUrls: ['./nothing-here.component.scss'],
    templateUrl: './nothing-here.component.html'
})
export class NothingHereComponent {
    @Input() public classed: string;
    @Input() public text: string;
    @Input() public icon: string;
    @Input() public imageOrIcon: 'image' | 'icon';
    @Input() public imageUrl: string;
}
