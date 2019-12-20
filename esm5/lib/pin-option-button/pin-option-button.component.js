import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
var PinOptionButtonComponent = /** @class */ (function () {
    function PinOptionButtonComponent(matIconRegistry, domSanitizer) {
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.jamColor = 'default';
        this.selected = new EventEmitter();
        this.buttons = [];
    }
    PinOptionButtonComponent.prototype.ngOnInit = function () {
        this.populateMenu();
        this.selected_option = this.defaultSelectedOption();
        this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/all_custom_icons.svg'));
    };
    PinOptionButtonComponent.prototype.pinnedOption = function (event, button) {
        event.stopPropagation();
        this.selected_option = {
            index: button.index,
            label: button.label
        };
        localStorage.setItem(this.specialKey + '_pinned_creation_option', JSON.stringify(button));
    };
    PinOptionButtonComponent.prototype.pinButton = function () {
        this.selected.emit(this.selected_option);
    };
    PinOptionButtonComponent.prototype.populateMenu = function () {
        var e_1, _a;
        var count = 0;
        try {
            for (var _b = tslib_1.__values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                this.buttons.push({ index: count, label: option });
                count += 1;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    PinOptionButtonComponent.prototype.defaultSelectedOption = function () {
        var local_storage_item = localStorage.getItem(this.specialKey + '_pinned_creation_option');
        return local_storage_item ? JSON.parse(local_storage_item) : this.buttons[0];
    };
    PinOptionButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-pin-option-button',
                    template: "<button mat-flat-button class=\"pin-button-round\"\n    [ngClass]=\"jamColor === 'default' ? 'mat-hint' : null\"\n    [color]=\"jamColor\"\n    (click)=\"selected.emit(selected_option)\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"4px\">\n        <button mat-icon-button class=\"mat-button\">\n            <mat-icon>add_circle</mat-icon>\n        </button>\n\n        <span>{{ selected_option?.label }}</span>\n\n        <button mat-icon-button matSuffix class=\"mat-button\"\n            [matMenuTriggerFor]=\"jamPinOptionButton\"\n            (click)=\"$event.stopPropagation()\">\n            <mat-icon>arrow_drop_down</mat-icon>\n        </button>\n    </div>\n</button>\n\n<mat-menu #jamPinOptionButton=\"matMenu\">\n    <button mat-menu-item class=\"mouseover\" *ngFor=\"let button of buttons; let item = index\"\n        (click)=\"selected.emit(button)\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"16px\">\n            <span>{{ button.label }}</span>\n            <div class=\"pin-container\">\n                <button mat-icon-button\n                    [ngClass]=\"selected_option?.index !== item ? 'mouseover-child mat-button' : 'mat-button'\"\n                    (click)=\"pinnedOption($event, button)\">\n                    <mat-icon svgIcon=\"pin_rs\" color=\"accent\"\n                        [ngStyle]=\"{ color: selected_option.index !== item ? '#000000B3' : null }\"\n                    ></mat-icon>\n                </button>\n            </div>\n        </div>\n    </button>\n</mat-menu>\n",
                    styles: ["button.pin-button-round{background-color:rgba(0,0,0,.102)!important;padding:0;border-radius:50px}.pin-container{width:40px}.pin-container button mat-icon{margin:0}.mouseover * .mouseover-child{display:none}.mouseover:hover * .mouseover-child{display:inherit}"]
                },] },
    ];
    /** @nocollapse */
    PinOptionButtonComponent.ctorParameters = function () { return [
        { type: MatIconRegistry },
        { type: DomSanitizer }
    ]; };
    PinOptionButtonComponent.propDecorators = {
        options: [{ type: Input }],
        specialKey: [{ type: Input }],
        jamColor: [{ type: Input }],
        selected: [{ type: Output }]
    };
    return PinOptionButtonComponent;
}());
export { PinOptionButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluLW9wdGlvbi1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvcGluLW9wdGlvbi1idXR0b24vcGluLW9wdGlvbi1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPekQ7SUFvREksa0NBQ1ksZUFBZ0MsRUFDaEMsWUFBMEI7UUFEMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBVnRCLGFBQVEsR0FBOEMsU0FBUyxDQUFDO1FBRS9ELGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBR3BELFlBQU8sR0FBc0IsRUFBRSxDQUFDO0lBTXBDLENBQUM7SUFFRywyQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsOEJBQThCLENBQUMsNkJBQTZCLENBQUMsQ0FDbEYsQ0FBQztJQUNOLENBQUM7SUFFTSwrQ0FBWSxHQUFuQixVQUFvQixLQUFLLEVBQUUsTUFBa0I7UUFDekMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztTQUN0QixDQUFDO1FBRUYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLHlCQUF5QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sNENBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLCtDQUFZLEdBQXBCOztRQUNJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQzs7WUFFZCxLQUFtQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBNUIsSUFBSSxNQUFNLFdBQUE7Z0JBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxLQUFLLElBQUksQ0FBQyxDQUFDO2FBQ2Q7Ozs7Ozs7OztJQUNMLENBQUM7SUFFTyx3REFBcUIsR0FBN0I7UUFDSSxJQUFJLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO1FBRTNGLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDOztnQkE5RkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxrakRBb0NiO29CQUNHLE1BQU0sRUFBRSxDQUFDLG9RQUFvUSxDQUFDO2lCQUNqUjs7OztnQkFoRFEsZUFBZTtnQkFDZixZQUFZOzs7MEJBaURoQixLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFFTCxNQUFNOztJQWlEWCwrQkFBQztDQUFBLEFBL0ZELElBK0ZDO1NBdERZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQaW5CdXR0b24ge1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgbGFiZWw6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tcGluLW9wdGlvbi1idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY2xhc3M9XCJwaW4tYnV0dG9uLXJvdW5kXCJcbiAgICBbbmdDbGFzc109XCJqYW1Db2xvciA9PT0gJ2RlZmF1bHQnID8gJ21hdC1oaW50JyA6IG51bGxcIlxuICAgIFtjb2xvcl09XCJqYW1Db2xvclwiXG4gICAgKGNsaWNrKT1cInNlbGVjdGVkLmVtaXQoc2VsZWN0ZWRfb3B0aW9uKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtYnV0dG9uXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+YWRkX2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxzcGFuPnt7IHNlbGVjdGVkX29wdGlvbj8ubGFiZWwgfX08L3NwYW4+XG5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IGNsYXNzPVwibWF0LWJ1dHRvblwiXG4gICAgICAgICAgICBbbWF0TWVudVRyaWdnZXJGb3JdPVwiamFtUGluT3B0aW9uQnV0dG9uXCJcbiAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19kcm9wX2Rvd248L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvYnV0dG9uPlxuXG48bWF0LW1lbnUgI2phbVBpbk9wdGlvbkJ1dHRvbj1cIm1hdE1lbnVcIj5cbiAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gY2xhc3M9XCJtb3VzZW92ZXJcIiAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnM7IGxldCBpdGVtID0gaW5kZXhcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0ZWQuZW1pdChidXR0b24pXCI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7IGJ1dHRvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaW4tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwic2VsZWN0ZWRfb3B0aW9uPy5pbmRleCAhPT0gaXRlbSA/ICdtb3VzZW92ZXItY2hpbGQgbWF0LWJ1dHRvbicgOiAnbWF0LWJ1dHRvbidcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicGlubmVkT3B0aW9uKCRldmVudCwgYnV0dG9uKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gc3ZnSWNvbj1cInBpbl9yc1wiIGNvbG9yPVwiYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgY29sb3I6IHNlbGVjdGVkX29wdGlvbi5pbmRleCAhPT0gaXRlbSA/ICcjMDAwMDAwQjMnIDogbnVsbCB9XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9idXR0b24+XG48L21hdC1tZW51PlxuYCxcbiAgICBzdHlsZXM6IFtgYnV0dG9uLnBpbi1idXR0b24tcm91bmR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xMDIpIWltcG9ydGFudDtwYWRkaW5nOjA7Ym9yZGVyLXJhZGl1czo1MHB4fS5waW4tY29udGFpbmVye3dpZHRoOjQwcHh9LnBpbi1jb250YWluZXIgYnV0dG9uIG1hdC1pY29ue21hcmdpbjowfS5tb3VzZW92ZXIgKiAubW91c2VvdmVyLWNoaWxke2Rpc3BsYXk6bm9uZX0ubW91c2VvdmVyOmhvdmVyICogLm1vdXNlb3Zlci1jaGlsZHtkaXNwbGF5OmluaGVyaXR9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uczogQXJyYXk8c3RyaW5nPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3BlY2lhbEtleTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBqYW1Db2xvcjogJ3ByaW1hcnknIHwgJ2FjY2VudCcgfCAnd2FybicgfCAnZGVmYXVsdCcgPSAnZGVmYXVsdCc7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxJUGluQnV0dG9uPigpO1xuXG4gICAgcHVibGljIGluZGV4OiBudW1iZXI7XG4gICAgcHVibGljIGJ1dHRvbnM6IEFycmF5PElQaW5CdXR0b24+ID0gW107XG4gICAgcHVibGljIHNlbGVjdGVkX29wdGlvbjogSVBpbkJ1dHRvbjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtYXRJY29uUmVnaXN0cnk6IE1hdEljb25SZWdpc3RyeSxcbiAgICAgICAgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICAgICkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU1lbnUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZF9vcHRpb24gPSB0aGlzLmRlZmF1bHRTZWxlY3RlZE9wdGlvbigpO1xuXG4gICAgICAgIHRoaXMubWF0SWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb25TZXQoXG4gICAgICAgICAgICB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoJ2Fzc2V0cy9hbGxfY3VzdG9tX2ljb25zLnN2ZycpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHBpbm5lZE9wdGlvbihldmVudCwgYnV0dG9uOiBJUGluQnV0dG9uKTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRfb3B0aW9uID0ge1xuICAgICAgICAgICAgaW5kZXg6IGJ1dHRvbi5pbmRleCxcbiAgICAgICAgICAgIGxhYmVsOiBidXR0b24ubGFiZWxcbiAgICAgICAgfTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnNwZWNpYWxLZXkgKyAnX3Bpbm5lZF9jcmVhdGlvbl9vcHRpb24nLCBKU09OLnN0cmluZ2lmeShidXR0b24pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGluQnV0dG9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5zZWxlY3RlZF9vcHRpb24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9wdWxhdGVNZW51KCk6IHZvaWQge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKHsgaW5kZXg6IGNvdW50LCBsYWJlbDogb3B0aW9uIH0pO1xuICAgICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdFNlbGVjdGVkT3B0aW9uKCk6IElQaW5CdXR0b24ge1xuICAgICAgICBsZXQgbG9jYWxfc3RvcmFnZV9pdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zcGVjaWFsS2V5ICsgJ19waW5uZWRfY3JlYXRpb25fb3B0aW9uJyk7XG5cbiAgICAgICAgcmV0dXJuIGxvY2FsX3N0b3JhZ2VfaXRlbSA/IEpTT04ucGFyc2UobG9jYWxfc3RvcmFnZV9pdGVtKSA6IHRoaXMuYnV0dG9uc1swXTtcbiAgICB9XG59XG4iXX0=