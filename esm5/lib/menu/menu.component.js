import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from './menu-elements/menu';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Destroyer } from '../destroyer';
var MenuComponent = /** @class */ (function () {
    function MenuComponent(matBottomSheet) {
        this.matBottomSheet = matBottomSheet;
        this.selected = new EventEmitter();
        this.destroyer = new Destroyer();
    }
    MenuComponent.prototype.ngOnInit = function () {
        if (this.menu.main_image && !this.menu.main_image.styles) {
            this.menu.main_image.styles = { 'border-radius': '100px', width: '40px', height: '40px' };
        }
        this.menu.removeEmptySections();
    };
    MenuComponent.prototype.ngOnDestroy = function () {
        this.destroyer.destroy();
    };
    MenuComponent.prototype.open = function () {
        var _this = this;
        this.matBottomSheet.open(BottomSheetComponent, {
            data: { sections: this.menu.data }
        })
            .afterDismissed()
            .pipe(this.destroyer.pipe(), filter(function (response) { return ![null, undefined, ''].includes(response); }))
            .subscribe(function (response) { return _this.selected.emit(_this.formatEmission(response)); });
    };
    MenuComponent.prototype.selectedOption = function (selected) {
        this.selected.emit(this.formatEmission(selected));
    };
    MenuComponent.prototype.formatEmission = function (response) {
        return { key: response, data: this.source_data || null };
    };
    MenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-menu',
                    styles: ["/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}"],
                    template: "<jam-dropdown-menu\n    [sections]=\"menu.data\"\n    [main_image]=\"menu.main_image\"\n    (selected)=\"selectedOption($event)\"\n></jam-dropdown-menu>\n\n<div class=\"jam-bottom-sheet\">\n    <button\n        mat-icon-button\n        class=\"mat-button mat-icon-button\"\n        matTooltip=\"M\u00E1s\"\n        fxLayout=\"row\"\n        fxLayoutAlign=\"center center\"\n        (click)=\"open()\">\n        <img *ngIf=\"menu.main_image?.url\" [src]=\"menu.main_image?.url\" [ngStyle]=\"menu.main_image?.styles\"/>\n        <mat-icon *ngIf=\"!menu.main_image?.url\">more_vert</mat-icon>\n    </button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    MenuComponent.ctorParameters = function () { return [
        { type: MatBottomSheet }
    ]; };
    MenuComponent.propDecorators = {
        menu: [{ type: Input }],
        source_data: [{ type: Input }],
        selected: [{ type: Output }]
    };
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9tZW51L21lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHekM7SUE4QkksdUJBQ1ksY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTHpCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBc0MsQ0FBQztRQUU1RSxjQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUloQyxDQUFDO0lBRUcsZ0NBQVEsR0FBZjtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUM3RjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sbUNBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSw0QkFBSSxHQUFYO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUMzQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDckMsQ0FBQzthQUNELGNBQWMsRUFBRTthQUNoQixJQUFJLENBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFDckIsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUF6QyxDQUF5QyxDQUFDLENBQ2hFO2FBQ0EsU0FBUyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLHNDQUFjLEdBQXJCLFVBQXNCLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU8sc0NBQWMsR0FBdEIsVUFBdUIsUUFBZ0I7UUFDbkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFLENBQUM7SUFDN0QsQ0FBQzs7Z0JBL0RKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsTUFBTSxFQUFFLENBQUMsb1BBQW9QLENBQUM7b0JBQzlQLFFBQVEsRUFBRSx3bUJBa0JiO2lCQUNBOzs7O2dCQTNCUSxjQUFjOzs7dUJBNkJsQixLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsTUFBTTs7SUFzQ1gsb0JBQUM7Q0FBQSxBQWhFRCxJQWdFQztTQXpDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICcuL21lbnUtZWxlbWVudHMvbWVudSc7XG5pbXBvcnQgeyBTZWN0aW9uIH0gZnJvbSAnLi9tZW51LWVsZW1lbnRzL3NlY3Rpb24nO1xuaW1wb3J0IHsgQm90dG9tU2hlZXRDb21wb25lbnQgfSBmcm9tICcuL2JvdHRvbS1zaGVldC9ib3R0b20tc2hlZXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdEJvdHRvbVNoZWV0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVzdHJveWVyIH0gZnJvbSAnLi4vZGVzdHJveWVyJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vbWVudS1lbGVtZW50cy9idXR0b24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1tZW51JyxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIGgze2ZvbnQtc2l6ZToxMHB0O21hcmdpbjoxNnB4O2ZvbnQtd2VpZ2h0OjUwMH1qYW0tZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5qYW0tYm90dG9tLXNoZWV0e2Rpc3BsYXk6bm9uZX0uZGlzYWJsZWR7b3BhY2l0eTouNX1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpe2phbS1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZX0uamFtLWJvdHRvbS1zaGVldHtkaXNwbGF5OmJsb2NrfX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxqYW0tZHJvcGRvd24tbWVudVxuICAgIFtzZWN0aW9uc109XCJtZW51LmRhdGFcIlxuICAgIFttYWluX2ltYWdlXT1cIm1lbnUubWFpbl9pbWFnZVwiXG4gICAgKHNlbGVjdGVkKT1cInNlbGVjdGVkT3B0aW9uKCRldmVudClcIlxuPjwvamFtLWRyb3Bkb3duLW1lbnU+XG5cbjxkaXYgY2xhc3M9XCJqYW0tYm90dG9tLXNoZWV0XCI+XG4gICAgPGJ1dHRvblxuICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgY2xhc3M9XCJtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblwiXG4gICAgICAgIG1hdFRvb2x0aXA9XCJNw6FzXCJcbiAgICAgICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgICAgICBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiXG4gICAgICAgIChjbGljayk9XCJvcGVuKClcIj5cbiAgICAgICAgPGltZyAqbmdJZj1cIm1lbnUubWFpbl9pbWFnZT8udXJsXCIgW3NyY109XCJtZW51Lm1haW5faW1hZ2U/LnVybFwiIFtuZ1N0eWxlXT1cIm1lbnUubWFpbl9pbWFnZT8uc3R5bGVzXCIvPlxuICAgICAgICA8bWF0LWljb24gKm5nSWY9XCIhbWVudS5tYWluX2ltYWdlPy51cmxcIj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcHVibGljIG1lbnU6IE1lbnU7XG4gICAgQElucHV0KCkgcHVibGljIHNvdXJjZV9kYXRhOiBBcnJheTxhbnk+O1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHsga2V5OiBzdHJpbmc7IGRhdGE/OiBBcnJheTxhbnk+IH0+KCk7XG5cbiAgICBwdWJsaWMgZGVzdHJveWVyID0gbmV3IERlc3Ryb3llcigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG1hdEJvdHRvbVNoZWV0OiBNYXRCb3R0b21TaGVldFxuICAgICkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVudS5tYWluX2ltYWdlICYmICF0aGlzLm1lbnUubWFpbl9pbWFnZS5zdHlsZXMpIHtcbiAgICAgICAgICAgIHRoaXMubWVudS5tYWluX2ltYWdlLnN0eWxlcyA9IHsgJ2JvcmRlci1yYWRpdXMnOiAnMTAwcHgnLCB3aWR0aDogJzQwcHgnLCBoZWlnaHQ6ICc0MHB4JyB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWVudS5yZW1vdmVFbXB0eVNlY3Rpb25zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3llci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW4oKSB7XG4gICAgICAgIHRoaXMubWF0Qm90dG9tU2hlZXQub3BlbihCb3R0b21TaGVldENvbXBvbmVudCwge1xuICAgICAgICAgICAgZGF0YTogeyBzZWN0aW9uczogdGhpcy5tZW51LmRhdGEgfVxuICAgICAgICB9KVxuICAgICAgICAuYWZ0ZXJEaXNtaXNzZWQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveWVyLnBpcGUoKSxcbiAgICAgICAgICAgIGZpbHRlcihyZXNwb25zZSA9PiAhW251bGwsIHVuZGVmaW5lZCwgJyddLmluY2x1ZGVzKHJlc3BvbnNlKSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLmZvcm1hdEVtaXNzaW9uKHJlc3BvbnNlKSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbihzZWxlY3RlZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLmZvcm1hdEVtaXNzaW9uKHNlbGVjdGVkKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb3JtYXRFbWlzc2lvbihyZXNwb25zZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB7IGtleTogcmVzcG9uc2UsIGRhdGE6IHRoaXMuc291cmNlX2RhdGEgfHwgbnVsbCB9O1xuICAgIH1cbn1cbiJdfQ==