/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resource } from 'ngx-jsonapi';

export interface IEditTextAttributeData {
    resource: Resource;
    attribute: string;
    title: string;
    accept?: string;
    message?: string;
    textarea_label?: string;
}

@Component({
    selector: 'jam-edit-text-attribute',
    templateUrl: 'edit-text-attribute-dialog.component.html'
})
export class EditTextAttributeDialogComponent {
    public text_value = '';

    public constructor(
        public dialogRef: MatDialogRef<EditTextAttributeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IEditTextAttributeData) {
        if (!data.accept) {
            data.accept = 'Aceptar';
        }
    }

    @HostListener('window: keyup', ['$event']) public onKeyUp(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey)   {
            this.updateAttributeAndClose(this.data.attribute, this.text_value);
        }
    }

    public updateAttributeAndClose(attribute: string, value: string) {
        this.data.resource.attributes[attribute] = value;
        this.dialogRef.close(true);
    }
}
