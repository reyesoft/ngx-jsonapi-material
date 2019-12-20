/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
var DeleteConfirmationComponent = /** @class */ (function () {
    function DeleteConfirmationComponent(dialog) {
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
    DeleteConfirmationComponent.prototype.showConfirm = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: 'auto',
            data: { title: this.title, msg: this.msg, accept: this.accept }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.delete.emit();
            }
        });
    };
    DeleteConfirmationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-delete-confirmation',
                    template: "<div>\n    <button mat-button type=\"button\"\n        [ngClass]=\"appearance || 'mat-icon-button mat-button'\"\n        (click)=\"showConfirm()\"\n        [color]=\"smartColor[appearance]\"\n        [ngStyle]=\"styled\"\n        [matTooltip]=\"tooltip || text || 'Eliminar'\"\n        >\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\" fxLayoutGap=\"8px\">\n            <mat-icon\n                [ngStyle]=\"styleIcon ? styleIcon : ''\"\n            >\n                {{ icon ? icon : 'delete' }}\n            </mat-icon>\n            <span *ngIf=\"text && appearance !== 'mat-icon-button'\" [innerHtml]=\"text\"></span>\n        </div>\n    </button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    DeleteConfirmationComponent.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
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
    return DeleteConfirmationComponent;
}());
export { DeleteConfirmationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFFbEc7SUE2Q0kscUNBQ1csTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQXZCWixTQUFJLEdBQXNCLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQjtRQVVwRCxlQUFVLEdBQ3lDLGlCQUFpQixDQUFDO1FBQ3BFLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxlQUFVLEdBQUc7WUFDaEIsWUFBWSxFQUFFLFFBQVE7WUFDdEIsbUJBQW1CLEVBQUUsU0FBUztZQUM5QixpQkFBaUIsRUFBRSxTQUFTO1lBQzVCLG9CQUFvQixFQUFFLFFBQVE7WUFDOUIsaUJBQWlCLEVBQUUsU0FBUztTQUMvQixDQUFDO1FBS0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLDJCQUEyQixDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVNLGlEQUFXLEdBQWxCO1FBQUEsaUJBV0M7UUFWRyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRTtZQUMxRCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1NBQ2xFLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3BDLElBQUksTUFBTSxFQUFFO2dCQUNSLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQS9ESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLHdxQkFrQmI7aUJBQ0E7Ozs7Z0JBeEJRLFNBQVM7Ozt1QkEwQmIsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLO3lCQUVMLE1BQU07O0lBNkJYLGtDQUFDO0NBQUEsQUFoRUQsSUFnRUM7U0ExQ1ksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTggUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpcm1hdGlvbi1kaWFsb2cvY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1kZWxldGUtY29uZmlybWF0aW9uJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBbbmdDbGFzc109XCJhcHBlYXJhbmNlIHx8ICdtYXQtaWNvbi1idXR0b24gbWF0LWJ1dHRvbidcIlxuICAgICAgICAoY2xpY2spPVwic2hvd0NvbmZpcm0oKVwiXG4gICAgICAgIFtjb2xvcl09XCJzbWFydENvbG9yW2FwcGVhcmFuY2VdXCJcbiAgICAgICAgW25nU3R5bGVdPVwic3R5bGVkXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwidG9vbHRpcCB8fCB0ZXh0IHx8ICdFbGltaW5hcidcIlxuICAgICAgICA+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZUljb24gPyBzdHlsZUljb24gOiAnJ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgaWNvbiA/IGljb24gOiAnZGVsZXRlJyB9fVxuICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidGV4dCAmJiBhcHBlYXJhbmNlICE9PSAnbWF0LWljb24tYnV0dG9uJ1wiIFtpbm5lckh0bWxdPVwidGV4dFwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgdHlwZTogJ2ljb24nIHwgJ2J1dHRvbicgPSAnaWNvbic7IC8qKiBARGVwcmVjYXRlZCAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRvb2x0aXA6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbXNnOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgY2xhc3NlZDogc3RyaW5nOyAvKiogQERlcHJlY2F0ZWQgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgc3R5bGVkOiB7fTtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3R5bGVJY29uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGFjY2VwdDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhcHBlYXJhbmNlOiAnbWF0LWJ1dHRvbicgfCAnbWF0LXJhaXNlZC1idXR0b24nIHxcbiAgICAgICAgJ21hdC1mbGF0LWJ1dHRvbicgfCAnbWF0LXN0cm9rZWQtYnV0dG9uJyB8ICdtYXQtaWNvbi1idXR0b24nID0gJ21hdC1pY29uLWJ1dHRvbic7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBkZWxldGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIHNtYXJ0Q29sb3IgPSB7XG4gICAgICAgICdtYXQtYnV0dG9uJzogJ2FjY2VudCcsXG4gICAgICAgICdtYXQtcmFpc2VkLWJ1dHRvbic6ICdwcmltYXJ5JyxcbiAgICAgICAgJ21hdC1mbGF0LWJ1dHRvbic6ICdwcmltYXJ5JyxcbiAgICAgICAgJ21hdC1zdHJva2VkLWJ1dHRvbic6ICdhY2NlbnQnLFxuICAgICAgICAnbWF0LWljb24tYnV0dG9uJzogJ2RlZmF1bHQnXG4gICAgfTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nXG4gICAgKSB7XG4gICAgICAgIHRoaXMubXNnID0gdGhpcy5tc2cgfHwgJ8K/RXN0w6Egc2VndXJvIGRlIGVsaW1pbmFyPyc7XG4gICAgICAgIHRoaXMuYWNjZXB0ID0gdGhpcy5hY2NlcHQgfHwgJ1PDrSc7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dDb25maXJtKCk6IHZvaWQge1xuICAgICAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICAgICAgICBkYXRhOiB7IHRpdGxlOiB0aGlzLnRpdGxlLCBtc2c6IHRoaXMubXNnLCBhY2NlcHQ6IHRoaXMuYWNjZXB0IH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGUuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=