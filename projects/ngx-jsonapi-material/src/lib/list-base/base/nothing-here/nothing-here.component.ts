import { Component, Input } from '@angular/core';

@Component({
    selector: 'jam-nothing-here',
    templateUrl: './nothing-here.component.html',
    styleUrls: ['./nothing-here.component.scss']
})
export class NothingHereComponent {
    @Input() public classed: string;
    @Input() public text: string;
    @Input() public icon: string;
    @Input() public imageOrIcon: 'image' | 'icon';
    @Input() public nothingHereImageUrl: string;
}
