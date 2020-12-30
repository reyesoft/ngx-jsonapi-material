import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resource } from 'ngx-jsonapi';
import { Column } from '../table-columns';

@Component({
    selector: 'jam-editable-cell-content',
    templateUrl: './editable-cell-content.component.html',
    styleUrls: ['./editable-cell-content.component.scss']
})
export class EditableCellContent {
    @Input() public element: Resource;
    @Input() public column: Column;
    @Output() public save = new EventEmitter<any>();
    @Output() public cancel = new EventEmitter<any>();

    public local_value;

    public saveChanges() {
        this.save.emit(this.local_value);
    }

    public cancelChanges() {
        this.cancel.emit();
    }

    public updateLocalValue(value) {
        this.local_value = value;
    }
}
