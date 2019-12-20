/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
var EditTextAttributeDialogComponent = /** @class */ (function () {
    function EditTextAttributeDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.text_value = '';
        if (!data.accept) {
            data.accept = 'Aceptar';
        }
    }
    EditTextAttributeDialogComponent.prototype.onKeyUp = function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            this.updateAttributeAndClose(this.data.attribute, this.text_value);
        }
    };
    EditTextAttributeDialogComponent.prototype.updateAttributeAndClose = function (attribute, value) {
        this.data.resource.attributes[attribute] = value;
        this.dialogRef.close(true);
    };
    EditTextAttributeDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-edit-text-attribute',
                    template: "<form name=\"myForm\" novalidate (ngSubmit)=\"updateAttributeAndClose(data.attribute, text_value)\">\n    <h2 *ngIf=\"data.title\" mat-dialog-title [innerHtml]=\"data.title\"></h2>\n    <mat-dialog-content>\n        <p *ngIf=\"data.message\">{{ data.message }}</p>\n        <mat-form-field\n            appearance=\"outline\"\n            fxFlex\n        >\n            <mat-label>{{ data.textarea_label }}</mat-label>\n            <textarea maxlength=\"140\"\n                name=\"text_attribute\"\n                type=\"text\"\n                #textarea\n                [(ngModel)]=\"text_value\"\n                matInput\n            ></textarea>\n            <mat-hint align=\"end\">{{textarea.value.length}} / 140</mat-hint>\n        </mat-form-field>\n    </mat-dialog-content>\n\n    <mat-dialog-actions fxLayout=\"row\" fxLayoutAlign=\"end center\">\n        <jam-submit\n            (cancel)=\"dialogRef.close()\"\n            [submitLabel]=\"data.accept\"\n        ></jam-submit>\n    </mat-dialog-actions>\n</form>\n"
                },] },
    ];
    /** @nocollapse */
    EditTextAttributeDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    EditTextAttributeDialogComponent.propDecorators = {
        onKeyUp: [{ type: HostListener, args: ['window: keyup', ['$event'],] }]
    };
    return EditTextAttributeDialogComponent;
}());
export { EditTextAttributeDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFZekU7SUFrQ0ksMENBQ1csU0FBeUQsRUFDaEMsSUFBNEI7UUFEckQsY0FBUyxHQUFULFNBQVMsQ0FBZ0Q7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFKekQsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUtuQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVpRCxrREFBTyxHQUF6RCxVQUEwRCxLQUFvQjtRQUMxRSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBSTtZQUM1QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUVNLGtFQUF1QixHQUE5QixVQUErQixTQUFpQixFQUFFLEtBQWE7UUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOztnQkFuREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSwwZ0NBMkJiO2lCQUNBOzs7O2dCQTFDUSxZQUFZO2dEQWdEWixNQUFNLFNBQUMsZUFBZTs7OzBCQU0xQixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQVU3Qyx1Q0FBQztDQUFBLEFBcERELElBb0RDO1NBckJZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE4IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuXG5leHBvcnQgaW50ZXJmYWNlIElFZGl0VGV4dEF0dHJpYnV0ZURhdGEge1xuICAgIHJlc291cmNlOiBSZXNvdXJjZTtcbiAgICBhdHRyaWJ1dGU6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGFjY2VwdD86IHN0cmluZztcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgIHRleHRhcmVhX2xhYmVsPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1lZGl0LXRleHQtYXR0cmlidXRlJyxcbiAgICB0ZW1wbGF0ZTogYDxmb3JtIG5hbWU9XCJteUZvcm1cIiBub3ZhbGlkYXRlIChuZ1N1Ym1pdCk9XCJ1cGRhdGVBdHRyaWJ1dGVBbmRDbG9zZShkYXRhLmF0dHJpYnV0ZSwgdGV4dF92YWx1ZSlcIj5cbiAgICA8aDIgKm5nSWY9XCJkYXRhLnRpdGxlXCIgbWF0LWRpYWxvZy10aXRsZSBbaW5uZXJIdG1sXT1cImRhdGEudGl0bGVcIj48L2gyPlxuICAgIDxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgICAgIDxwICpuZ0lmPVwiZGF0YS5tZXNzYWdlXCI+e3sgZGF0YS5tZXNzYWdlIH19PC9wPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGRcbiAgICAgICAgICAgIGFwcGVhcmFuY2U9XCJvdXRsaW5lXCJcbiAgICAgICAgICAgIGZ4RmxleFxuICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWxhYmVsPnt7IGRhdGEudGV4dGFyZWFfbGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBtYXhsZW5ndGg9XCIxNDBcIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJ0ZXh0X2F0dHJpYnV0ZVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICN0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwidGV4dF92YWx1ZVwiXG4gICAgICAgICAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgICAgID48L3RleHRhcmVhPlxuICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwiZW5kXCI+e3t0ZXh0YXJlYS52YWx1ZS5sZW5ndGh9fSAvIDE0MDwvbWF0LWhpbnQ+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG5cbiAgICA8bWF0LWRpYWxvZy1hY3Rpb25zIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGphbS1zdWJtaXRcbiAgICAgICAgICAgIChjYW5jZWwpPVwiZGlhbG9nUmVmLmNsb3NlKClcIlxuICAgICAgICAgICAgW3N1Ym1pdExhYmVsXT1cImRhdGEuYWNjZXB0XCJcbiAgICAgICAgPjwvamFtLXN1Ym1pdD5cbiAgICA8L21hdC1kaWFsb2ctYWN0aW9ucz5cbjwvZm9ybT5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRWRpdFRleHRBdHRyaWJ1dGVEaWFsb2dDb21wb25lbnQge1xuICAgIHB1YmxpYyB0ZXh0X3ZhbHVlID0gJyc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxFZGl0VGV4dEF0dHJpYnV0ZURpYWxvZ0NvbXBvbmVudD4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogSUVkaXRUZXh0QXR0cmlidXRlRGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEuYWNjZXB0KSB7XG4gICAgICAgICAgICBkYXRhLmFjY2VwdCA9ICdBY2VwdGFyJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzoga2V5dXAnLCBbJyRldmVudCddKSBwdWJsaWMgb25LZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInICYmICFldmVudC5zaGlmdEtleSkgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUF0dHJpYnV0ZUFuZENsb3NlKHRoaXMuZGF0YS5hdHRyaWJ1dGUsIHRoaXMudGV4dF92YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQXR0cmlidXRlQW5kQ2xvc2UoYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kYXRhLnJlc291cmNlLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgICB9XG59XG4iXX0=