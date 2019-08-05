import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'jam-dialog-logged-state',
    templateUrl: './dialog-logged-state.component.html'
})
export class DialogLoggedStateComponent {
    public constructor(protected thisDialogRef: MatDialogRef<DialogLoggedStateComponent>) {}

    public onCloseConfirm(): void {
        this.thisDialogRef.close('Confirm');
    }

    public onCloseCancel(): void {
        this.thisDialogRef.close('Cancel');
    }
}
