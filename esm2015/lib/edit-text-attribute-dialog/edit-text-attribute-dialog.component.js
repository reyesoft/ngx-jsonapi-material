/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export class EditTextAttributeDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.text_value = '';
        if (!data.accept) {
            data.accept = 'Aceptar';
        }
    }
    onKeyUp(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            this.updateAttributeAndClose(this.data.attribute, this.text_value);
        }
    }
    updateAttributeAndClose(attribute, value) {
        this.data.resource.attributes[attribute] = value;
        this.dialogRef.close(true);
    }
}
EditTextAttributeDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-edit-text-attribute',
                template: `<form name="myForm" novalidate (ngSubmit)="updateAttributeAndClose(data.attribute, text_value)">
    <h2 *ngIf="data.title" mat-dialog-title [innerHtml]="data.title"></h2>
    <mat-dialog-content>
        <p *ngIf="data.message">{{ data.message }}</p>
        <mat-form-field
            appearance="outline"
            fxFlex
        >
            <mat-label>{{ data.textarea_label }}</mat-label>
            <textarea maxlength="140"
                name="text_attribute"
                type="text"
                #textarea
                [(ngModel)]="text_value"
                matInput
            ></textarea>
            <mat-hint align="end">{{textarea.value.length}} / 140</mat-hint>
        </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
        <jam-submit
            (cancel)="dialogRef.close()"
            [submitLabel]="data.accept"
        ></jam-submit>
    </mat-dialog-actions>
</form>
`
            },] },
];
/** @nocollapse */
EditTextAttributeDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
EditTextAttributeDialogComponent.propDecorators = {
    onKeyUp: [{ type: HostListener, args: ['window: keyup', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUEyQ3pFLE1BQU0sT0FBTyxnQ0FBZ0M7SUFHekMsWUFDVyxTQUF5RCxFQUNoQyxJQUE0QjtRQURyRCxjQUFTLEdBQVQsU0FBUyxDQUFnRDtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUp6RCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBS25CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRWlELE9BQU8sQ0FBQyxLQUFvQjtRQUMxRSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBSTtZQUM1QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUVNLHVCQUF1QixDQUFDLFNBQWlCLEVBQUUsS0FBYTtRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7OztZQW5ESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EyQmI7YUFDQTs7OztZQTFDUSxZQUFZOzRDQWdEWixNQUFNLFNBQUMsZUFBZTs7O3NCQU0xQixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTggUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVkaXRUZXh0QXR0cmlidXRlRGF0YSB7XG4gICAgcmVzb3VyY2U6IFJlc291cmNlO1xuICAgIGF0dHJpYnV0ZTogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgYWNjZXB0Pzogc3RyaW5nO1xuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgdGV4dGFyZWFfbGFiZWw/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWVkaXQtdGV4dC1hdHRyaWJ1dGUnLFxuICAgIHRlbXBsYXRlOiBgPGZvcm0gbmFtZT1cIm15Rm9ybVwiIG5vdmFsaWRhdGUgKG5nU3VibWl0KT1cInVwZGF0ZUF0dHJpYnV0ZUFuZENsb3NlKGRhdGEuYXR0cmlidXRlLCB0ZXh0X3ZhbHVlKVwiPlxuICAgIDxoMiAqbmdJZj1cImRhdGEudGl0bGVcIiBtYXQtZGlhbG9nLXRpdGxlIFtpbm5lckh0bWxdPVwiZGF0YS50aXRsZVwiPjwvaDI+XG4gICAgPG1hdC1kaWFsb2ctY29udGVudD5cbiAgICAgICAgPHAgKm5nSWY9XCJkYXRhLm1lc3NhZ2VcIj57eyBkYXRhLm1lc3NhZ2UgfX08L3A+XG4gICAgICAgIDxtYXQtZm9ybS1maWVsZFxuICAgICAgICAgICAgYXBwZWFyYW5jZT1cIm91dGxpbmVcIlxuICAgICAgICAgICAgZnhGbGV4XG4gICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtbGFiZWw+e3sgZGF0YS50ZXh0YXJlYV9sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICAgICAgPHRleHRhcmVhIG1heGxlbmd0aD1cIjE0MFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInRleHRfYXR0cmlidXRlXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgI3RleHRhcmVhXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJ0ZXh0X3ZhbHVlXCJcbiAgICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJlbmRcIj57e3RleHRhcmVhLnZhbHVlLmxlbmd0aH19IC8gMTQwPC9tYXQtaGludD5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8L21hdC1kaWFsb2ctY29udGVudD5cblxuICAgIDxtYXQtZGlhbG9nLWFjdGlvbnMgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICA8amFtLXN1Ym1pdFxuICAgICAgICAgICAgKGNhbmNlbCk9XCJkaWFsb2dSZWYuY2xvc2UoKVwiXG4gICAgICAgICAgICBbc3VibWl0TGFiZWxdPVwiZGF0YS5hY2NlcHRcIlxuICAgICAgICA+PC9qYW0tc3VibWl0PlxuICAgIDwvbWF0LWRpYWxvZy1hY3Rpb25zPlxuPC9mb3JtPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBFZGl0VGV4dEF0dHJpYnV0ZURpYWxvZ0NvbXBvbmVudCB7XG4gICAgcHVibGljIHRleHRfdmFsdWUgPSAnJztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEVkaXRUZXh0QXR0cmlidXRlRGlhbG9nQ29tcG9uZW50PixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBJRWRpdFRleHRBdHRyaWJ1dGVEYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS5hY2NlcHQpIHtcbiAgICAgICAgICAgIGRhdGEuYWNjZXB0ID0gJ0FjZXB0YXInO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OiBrZXl1cCcsIFsnJGV2ZW50J10pIHB1YmxpYyBvbktleVVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgIWV2ZW50LnNoaWZ0S2V5KSAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXR0cmlidXRlQW5kQ2xvc2UodGhpcy5kYXRhLmF0dHJpYnV0ZSwgdGhpcy50ZXh0X3ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVBbmRDbG9zZShhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGEucmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRydWUpO1xuICAgIH1cbn1cbiJdfQ==