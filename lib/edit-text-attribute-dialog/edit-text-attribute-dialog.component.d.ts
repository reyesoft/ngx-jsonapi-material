/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { MatDialogRef } from '@angular/material/dialog';
import { Resource } from 'ngx-jsonapi';
export interface IEditTextAttributeData {
    resource: Resource;
    attribute: string;
    title: string;
    accept?: string;
    message?: string;
    textarea_label?: string;
}
export declare class EditTextAttributeDialogComponent {
    dialogRef: MatDialogRef<EditTextAttributeDialogComponent>;
    data: IEditTextAttributeData;
    text_value: string;
    constructor(dialogRef: MatDialogRef<EditTextAttributeDialogComponent>, data: IEditTextAttributeData);
    onKeyUp(event: KeyboardEvent): void;
    updateAttributeAndClose(attribute: string, value: string): void;
}
