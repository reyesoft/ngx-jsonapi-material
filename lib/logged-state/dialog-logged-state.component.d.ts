import { MatDialogRef } from '@angular/material/dialog';
export declare class DialogLoggedStateComponent {
    protected thisDialogRef: MatDialogRef<DialogLoggedStateComponent>;
    constructor(thisDialogRef: MatDialogRef<DialogLoggedStateComponent>);
    onCloseConfirm(): void;
    onCloseCancel(): void;
}
