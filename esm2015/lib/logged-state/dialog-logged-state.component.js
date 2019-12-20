import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export class DialogLoggedStateComponent {
    constructor(thisDialogRef) {
        this.thisDialogRef = thisDialogRef;
    }
    onCloseConfirm() {
        this.thisDialogRef.close('Confirm');
    }
    onCloseCancel() {
        this.thisDialogRef.close('Cancel');
    }
}
DialogLoggedStateComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-dialog-logged-state',
                template: `<h3 mat-dialog-title>Tu sesión se ha cerrado.</h3>
<hr>
<mat-dialog-content>
    <p>Es necesario que vuelvas a ingresar tu usuario y contraseña. ¡Vamos a ello!</p>
</mat-dialog-content>
<mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
    <jam-submit (accept)="onCloseConfirm()" [noCancel]="true" submitLabel="Aceptar"></jam-submit>
</mat-dialog-actions>
`
            },] },
];
/** @nocollapse */
DialogLoggedStateComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWxvZ2dlZC1zdGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9sb2dnZWQtc3RhdGUvZGlhbG9nLWxvZ2dlZC1zdGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFjeEQsTUFBTSxPQUFPLDBCQUEwQjtJQUNuQyxZQUE2QixhQUF1RDtRQUF2RCxrQkFBYSxHQUFiLGFBQWEsQ0FBMEM7SUFBRyxDQUFDO0lBRWpGLGNBQWM7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGFBQWE7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBckJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7O0NBUWI7YUFDQTs7OztZQWJRLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZGlhbG9nLWxvZ2dlZC1zdGF0ZScsXG4gICAgdGVtcGxhdGU6IGA8aDMgbWF0LWRpYWxvZy10aXRsZT5UdSBzZXNpw7NuIHNlIGhhIGNlcnJhZG8uPC9oMz5cbjxocj5cbjxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPHA+RXMgbmVjZXNhcmlvIHF1ZSB2dWVsdmFzIGEgaW5ncmVzYXIgdHUgdXN1YXJpbyB5IGNvbnRyYXNlw7FhLiDCoVZhbW9zIGEgZWxsbyE8L3A+XG48L21hdC1kaWFsb2ctY29udGVudD5cbjxtYXQtZGlhbG9nLWFjdGlvbnMgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgIDxqYW0tc3VibWl0IChhY2NlcHQpPVwib25DbG9zZUNvbmZpcm0oKVwiIFtub0NhbmNlbF09XCJ0cnVlXCIgc3VibWl0TGFiZWw9XCJBY2VwdGFyXCI+PC9qYW0tc3VibWl0PlxuPC9tYXQtZGlhbG9nLWFjdGlvbnM+XG5gXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0xvZ2dlZFN0YXRlQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJvdGVjdGVkIHRoaXNEaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudD4pIHt9XG5cbiAgICBwdWJsaWMgb25DbG9zZUNvbmZpcm0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGhpc0RpYWxvZ1JlZi5jbG9zZSgnQ29uZmlybScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlQ2FuY2VsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRoaXNEaWFsb2dSZWYuY2xvc2UoJ0NhbmNlbCcpO1xuICAgIH1cbn1cbiJdfQ==