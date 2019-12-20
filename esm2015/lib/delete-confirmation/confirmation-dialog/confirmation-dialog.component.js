/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export class ConfirmationDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        if (!data.accept) {
            data.accept = 'Sí';
        }
        if (!data.msg) {
            data.msg = '¿Está seguro que desea continuar?';
        }
    }
}
ConfirmationDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-confirmation-dialog',
                template: `<h2 *ngIf="data.title" mat-dialog-title [innerHtml]="data.title"></h2>
<mat-dialog-content>
    <p [innerHtml]="data.msg"></p>
</mat-dialog-content>
<mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
    <button mat-button mat-dialog-close>No</button>
    <button mat-button [mat-dialog-close]="true" [innerHtml]="data.accept"></button>
</mat-dialog-actions>
`
            },] },
];
/** @nocollapse */
ConfirmationDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9kZWxldGUtY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi1kaWFsb2cvY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBY3pFLE1BQU0sT0FBTywyQkFBMkI7SUFDcEMsWUFBMEIsU0FBb0QsRUFBa0MsSUFBUztRQUEvRixjQUFTLEdBQVQsU0FBUyxDQUEyQztRQUFrQyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQ3JILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLElBQUksQ0FBQyxHQUFHLEdBQUcsbUNBQW1DLENBQUM7U0FDbEQ7SUFDTCxDQUFDOzs7WUFwQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Q0FRYjthQUNBOzs7O1lBYlEsWUFBWTs0Q0FlZ0UsTUFBTSxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1jb25maXJtYXRpb24tZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZTogYDxoMiAqbmdJZj1cImRhdGEudGl0bGVcIiBtYXQtZGlhbG9nLXRpdGxlIFtpbm5lckh0bWxdPVwiZGF0YS50aXRsZVwiPjwvaDI+XG48bWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxwIFtpbm5lckh0bWxdPVwiZGF0YS5tc2dcIj48L3A+XG48L21hdC1kaWFsb2ctY29udGVudD5cbjxtYXQtZGlhbG9nLWFjdGlvbnMgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPk5vPC9idXR0b24+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIFttYXQtZGlhbG9nLWNsb3NlXT1cInRydWVcIiBbaW5uZXJIdG1sXT1cImRhdGEuYWNjZXB0XCI+PC9idXR0b24+XG48L21hdC1kaWFsb2ctYWN0aW9ucz5cbmBcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudD4sIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55KSB7XG4gICAgICAgIGlmICghZGF0YS5hY2NlcHQpIHtcbiAgICAgICAgICAgIGRhdGEuYWNjZXB0ID0gJ1PDrSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkYXRhLm1zZykge1xuICAgICAgICAgICAgZGF0YS5tc2cgPSAnwr9Fc3TDoSBzZWd1cm8gcXVlIGRlc2VhIGNvbnRpbnVhcj8nO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19