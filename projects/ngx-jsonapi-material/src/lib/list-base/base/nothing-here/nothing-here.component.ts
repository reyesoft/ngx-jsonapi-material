import { Component, Input } from '@angular/core';

@Component({
    selector: 'rs-nothing-here',
    templateUrl: './nothing-here.component.html'
})
export class NothingHereComponent {
    @Input() public classed: string;
    @Input() public text: string;
    @Input() public icon: string;
}
