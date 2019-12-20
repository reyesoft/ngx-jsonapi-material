/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
export class DeleteConfirmationComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.type = 'icon'; /** @Deprecated */
        this.appearance = 'mat-icon-button';
        this.delete = new EventEmitter();
        this.smartColor = {
            'mat-button': 'accent',
            'mat-raised-button': 'primary',
            'mat-flat-button': 'primary',
            'mat-stroked-button': 'accent',
            'mat-icon-button': 'default'
        };
        this.msg = this.msg || '¿Está seguro de eliminar?';
        this.accept = this.accept || 'Sí';
    }
    showConfirm() {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: 'auto',
            data: { title: this.title, msg: this.msg, accept: this.accept }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete.emit();
            }
        });
    }
}
DeleteConfirmationComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-delete-confirmation',
                template: `<div>
    <button mat-button type="button"
        [ngClass]="appearance || 'mat-icon-button mat-button'"
        (click)="showConfirm()"
        [color]="smartColor[appearance]"
        [ngStyle]="styled"
        [matTooltip]="tooltip || text || 'Eliminar'"
        >
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="8px">
            <mat-icon
                [ngStyle]="styleIcon ? styleIcon : ''"
            >
                {{ icon ? icon : 'delete' }}
            </mat-icon>
            <span *ngIf="text && appearance !== 'mat-icon-button'" [innerHtml]="text"></span>
        </div>
    </button>
</div>
`
            },] },
];
/** @nocollapse */
DeleteConfirmationComponent.ctorParameters = () => [
    { type: MatDialog }
];
DeleteConfirmationComponent.propDecorators = {
    type: [{ type: Input }],
    icon: [{ type: Input }],
    tooltip: [{ type: Input }],
    msg: [{ type: Input }],
    text: [{ type: Input }],
    title: [{ type: Input }],
    classed: [{ type: Input }],
    styled: [{ type: Input }],
    styleIcon: [{ type: Input }],
    accept: [{ type: Input }],
    appearance: [{ type: Input }],
    delete: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0scURBQXFELENBQUM7QUF3QmxHLE1BQU0sT0FBTywyQkFBMkI7SUF1QnBDLFlBQ1csTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQXZCWixTQUFJLEdBQXNCLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQjtRQVVwRCxlQUFVLEdBQ3lDLGlCQUFpQixDQUFDO1FBQ3BFLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxlQUFVLEdBQUc7WUFDaEIsWUFBWSxFQUFFLFFBQVE7WUFDdEIsbUJBQW1CLEVBQUUsU0FBUztZQUM5QixpQkFBaUIsRUFBRSxTQUFTO1lBQzVCLG9CQUFvQixFQUFFLFFBQVE7WUFDOUIsaUJBQWlCLEVBQUUsU0FBUztTQUMvQixDQUFDO1FBS0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLDJCQUEyQixDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRTtZQUMxRCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1NBQ2xFLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBL0RKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtCYjthQUNBOzs7O1lBeEJRLFNBQVM7OzttQkEwQmIsS0FBSzttQkFDTCxLQUFLO3NCQUNMLEtBQUs7a0JBQ0wsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7c0JBQ0wsS0FBSztxQkFDTCxLQUFLO3dCQUNMLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWRlbGV0ZS1jb25maXJtYXRpb24nLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImFwcGVhcmFuY2UgfHwgJ21hdC1pY29uLWJ1dHRvbiBtYXQtYnV0dG9uJ1wiXG4gICAgICAgIChjbGljayk9XCJzaG93Q29uZmlybSgpXCJcbiAgICAgICAgW2NvbG9yXT1cInNtYXJ0Q29sb3JbYXBwZWFyYW5jZV1cIlxuICAgICAgICBbbmdTdHlsZV09XCJzdHlsZWRcIlxuICAgICAgICBbbWF0VG9vbHRpcF09XCJ0b29sdGlwIHx8IHRleHQgfHwgJ0VsaW1pbmFyJ1wiXG4gICAgICAgID5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlSWNvbiA/IHN0eWxlSWNvbiA6ICcnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7eyBpY29uID8gaWNvbiA6ICdkZWxldGUnIH19XG4gICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0ZXh0ICYmIGFwcGVhcmFuY2UgIT09ICdtYXQtaWNvbi1idXR0b24nXCIgW2lubmVySHRtbF09XCJ0ZXh0XCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVDb25maXJtYXRpb25Db21wb25lbnQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0eXBlOiAnaWNvbicgfCAnYnV0dG9uJyA9ICdpY29uJzsgLyoqIEBEZXByZWNhdGVkICovXG4gICAgQElucHV0KCkgcHVibGljIGljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtc2c6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjbGFzc2VkOiBzdHJpbmc7IC8qKiBARGVwcmVjYXRlZCAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzdHlsZWQ6IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzdHlsZUljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgYWNjZXB0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGFwcGVhcmFuY2U6ICdtYXQtYnV0dG9uJyB8ICdtYXQtcmFpc2VkLWJ1dHRvbicgfFxuICAgICAgICAnbWF0LWZsYXQtYnV0dG9uJyB8ICdtYXQtc3Ryb2tlZC1idXR0b24nIHwgJ21hdC1pY29uLWJ1dHRvbicgPSAnbWF0LWljb24tYnV0dG9uJztcbiAgICBAT3V0cHV0KCkgcHVibGljIGRlbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgc21hcnRDb2xvciA9IHtcbiAgICAgICAgJ21hdC1idXR0b24nOiAnYWNjZW50JyxcbiAgICAgICAgJ21hdC1yYWlzZWQtYnV0dG9uJzogJ3ByaW1hcnknLFxuICAgICAgICAnbWF0LWZsYXQtYnV0dG9uJzogJ3ByaW1hcnknLFxuICAgICAgICAnbWF0LXN0cm9rZWQtYnV0dG9uJzogJ2FjY2VudCcsXG4gICAgICAgICdtYXQtaWNvbi1idXR0b24nOiAnZGVmYXVsdCdcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2dcbiAgICApIHtcbiAgICAgICAgdGhpcy5tc2cgPSB0aGlzLm1zZyB8fCAnwr9Fc3TDoSBzZWd1cm8gZGUgZWxpbWluYXI/JztcbiAgICAgICAgdGhpcy5hY2NlcHQgPSB0aGlzLmFjY2VwdCB8fCAnU8OtJztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0NvbmZpcm0oKTogdm9pZCB7XG4gICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgICAgICAgIGRhdGE6IHsgdGl0bGU6IHRoaXMudGl0bGUsIG1zZzogdGhpcy5tc2csIGFjY2VwdDogdGhpcy5hY2NlcHQgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==