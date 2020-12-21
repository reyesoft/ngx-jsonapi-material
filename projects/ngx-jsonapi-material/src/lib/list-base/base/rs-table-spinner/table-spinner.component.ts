import { Component, Input } from '@angular/core';

@Component({
    selector: 'jam-table-spinner',
    templateUrl: './table-spinner.component.html'
})
export class TableSpinnerComponent {
    @Input() public color: 'primary' | 'accent' = 'accent';
    @Input() public mode: 'determinate' | 'indeterminate' = 'indeterminate';
    @Input() public value: number = 0;
    @Input() public diameter: number = 70;
    @Input() public spinnerClasses: string = 'width-100';
}
