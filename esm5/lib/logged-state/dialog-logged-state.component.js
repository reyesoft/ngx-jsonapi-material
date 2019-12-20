import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
var DialogLoggedStateComponent = /** @class */ (function () {
    function DialogLoggedStateComponent(thisDialogRef) {
        this.thisDialogRef = thisDialogRef;
    }
    DialogLoggedStateComponent.prototype.onCloseConfirm = function () {
        this.thisDialogRef.close('Confirm');
    };
    DialogLoggedStateComponent.prototype.onCloseCancel = function () {
        this.thisDialogRef.close('Cancel');
    };
    DialogLoggedStateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-dialog-logged-state',
                    template: "<h3 mat-dialog-title>Tu sesi\u00F3n se ha cerrado.</h3>\n<hr>\n<mat-dialog-content>\n    <p>Es necesario que vuelvas a ingresar tu usuario y contrase\u00F1a. \u00A1Vamos a ello!</p>\n</mat-dialog-content>\n<mat-dialog-actions fxLayout=\"row\" fxLayoutAlign=\"end center\">\n    <jam-submit (accept)=\"onCloseConfirm()\" [noCancel]=\"true\" submitLabel=\"Aceptar\"></jam-submit>\n</mat-dialog-actions>\n"
                },] },
    ];
    /** @nocollapse */
    DialogLoggedStateComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return DialogLoggedStateComponent;
}());
export { DialogLoggedStateComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWxvZ2dlZC1zdGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9sb2dnZWQtc3RhdGUvZGlhbG9nLWxvZ2dlZC1zdGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFeEQ7SUFhSSxvQ0FBNkIsYUFBdUQ7UUFBdkQsa0JBQWEsR0FBYixhQUFhLENBQTBDO0lBQUcsQ0FBQztJQUVqRixtREFBYyxHQUFyQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxrREFBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O2dCQXJCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLG9aQVFiO2lCQUNBOzs7O2dCQWJRLFlBQVk7O0lBd0JyQixpQ0FBQztDQUFBLEFBdEJELElBc0JDO1NBVlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWRpYWxvZy1sb2dnZWQtc3RhdGUnLFxuICAgIHRlbXBsYXRlOiBgPGgzIG1hdC1kaWFsb2ctdGl0bGU+VHUgc2VzacOzbiBzZSBoYSBjZXJyYWRvLjwvaDM+XG48aHI+XG48bWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxwPkVzIG5lY2VzYXJpbyBxdWUgdnVlbHZhcyBhIGluZ3Jlc2FyIHR1IHVzdWFyaW8geSBjb250cmFzZcOxYS4gwqFWYW1vcyBhIGVsbG8hPC9wPlxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG48bWF0LWRpYWxvZy1hY3Rpb25zIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICA8amFtLXN1Ym1pdCAoYWNjZXB0KT1cIm9uQ2xvc2VDb25maXJtKClcIiBbbm9DYW5jZWxdPVwidHJ1ZVwiIHN1Ym1pdExhYmVsPVwiQWNlcHRhclwiPjwvamFtLXN1Ym1pdD5cbjwvbWF0LWRpYWxvZy1hY3Rpb25zPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0aGlzRGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnQ+KSB7fVxuXG4gICAgcHVibGljIG9uQ2xvc2VDb25maXJtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRoaXNEaWFsb2dSZWYuY2xvc2UoJ0NvbmZpcm0nKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbG9zZUNhbmNlbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aGlzRGlhbG9nUmVmLmNsb3NlKCdDYW5jZWwnKTtcbiAgICB9XG59XG4iXX0=