import { Component, Input } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';

@Component({
    selector: 'jam-table-loader',
    templateUrl: './table-loader.component.html',
    styleUrls: ['./table-loader.component.scss']
})
export class TableLoaderComponent {
    @Input() public showNothingHere: boolean;
    @Input() public nothingHereClasses: string;
    @Input() public nothingHereText: string;
    @Input() public imageOrIcon: 'image' | 'icon';
    @Input() public nothingHereIcon: string;

    @Input() public showSpinner: boolean;
    @Input() public spinnerColor: 'primary' | 'accent' = 'primary';
    @Input() public spinnerMode: 'determinate' | 'indeterminate' = 'indeterminate';
    @Input() public spinnerValue: number = 0;
    @Input() public spinnerDiameter: number = 70;
    @Input() public spinnerClasses: string;

    @Input() public collection: DocumentCollection;
    @Input() public dataSource: Array<any>;
}
