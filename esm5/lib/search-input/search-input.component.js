/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Destroyer } from '../destroyer';
var SearchInputComponent = /** @class */ (function () {
    function SearchInputComponent() {
        this.opened = false;
        this.textChange = new EventEmitter();
        this.searchCtrl = new FormControl();
        this.showSearch = false;
        this.destroyer = new Destroyer();
    }
    SearchInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showSearch = this.opened || this.showSearch;
        this.searchCtrl.valueChanges
            .pipe(this.destroyer.pipe(), map(function (x) { return x; }), debounceTime(400)).subscribe(function (newValue) { return _this.textChange.emit(newValue); });
    };
    SearchInputComponent.prototype.ngOnDestroy = function () {
        this.destroyer.destroy();
    };
    SearchInputComponent.prototype.showInput = function () {
        var _this = this;
        if (this.opened) {
            this.showSearch = this.opened;
        }
        else {
            this.showSearch = !this.showSearch;
            setTimeout(function () { if (_this.showSearch)
                document.getElementById('search-input').focus(); }, 0);
        }
    };
    SearchInputComponent.prototype.switch = function () {
        if (this.opened) {
            this.showSearch = this.opened;
        }
        else {
            this.showSearch = false;
        }
        if (this.searchCtrl.value !== '') {
            this.searchCtrl.setValue('');
            this.textChange.emit(this.searchCtrl.value);
        }
    };
    SearchInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-search-input',
                    styles: ["div.opened{background-color:rgba(0,0,0,.12)}.jam-input{border:0;background:0 0;height:48px;padding:16px;outline:0!important}.mat-icon{margin:0!important}@media only screen and (max-width:600px){div.opened{position:absolute;top:0;left:0;right:0;z-index:333;background:#fff;height:48px;max-height:48px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}div.opened:active,div.opened:focus,div.opened:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}}"],
                    template: "<div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n    <button mat-icon-button class=\"mat-button\" matTooltip=\"Buscar\"\n        *ngIf=\"!showSearch\"\n        (click)=\"showInput()\">\n        <mat-icon class=\"mat-hint\">search</mat-icon>\n    </button>\n    <div class=\"reset-input-default\" fxFlex=\"100\" [style.padding-left]=\"'16px'\"\n        *ngIf=\"showSearch\"\n        [ngClass]=\"showSearch ? 'opened' : ''\"\n        fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16\">\n        <mat-icon class=\"mat-hint\">search</mat-icon>\n        <input class=\"jam-input\" fxFlex id=\"search-input\" autocomplete=\"off\"\n            [formControl]=\"searchCtrl\" placeholder=\"Buscar...\">\n\n        <button mat-icon-button class=\"mat-button\" (click)=\"switch()\">\n            <mat-icon class=\"mat-hint\">clear</mat-icon>\n        </button>\n    </div>\n</div>\n"
                },] },
    ];
    SearchInputComponent.propDecorators = {
        text: [{ type: Input }],
        opened: [{ type: Input }],
        textChange: [{ type: Output }]
    };
    return SearchInputComponent;
}());
export { SearchInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QztJQUFBO1FBMEJvQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRSxlQUFVLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFFNUMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVsQixjQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztJQXVDeEMsQ0FBQztJQXJDVSx1Q0FBUSxHQUFmO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVk7YUFDdkIsSUFBSSxDQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQ3JCLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRCxDQUFDLENBQUMsRUFDWCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQ3BCLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sMENBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSx3Q0FBUyxHQUFoQjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxVQUFVLENBQUMsY0FBUSxJQUFJLEtBQUksQ0FBQyxVQUFVO2dCQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEc7SUFFTCxDQUFDO0lBRU0scUNBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNqQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQzs7Z0JBdkVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixNQUFNLEVBQUUsQ0FBQyxzaUJBQXNpQixDQUFDO29CQUNoakIsUUFBUSxFQUFFLHM0QkFtQmI7aUJBQ0E7Ozt1QkFFSSxLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsTUFBTTs7SUE2Q1gsMkJBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQWhEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxNyBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZXN0cm95ZXIgfSBmcm9tICcuLi9kZXN0cm95ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zZWFyY2gtaW5wdXQnLFxuICAgIHN0eWxlczogW2BkaXYub3BlbmVke2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMTIpfS5qYW0taW5wdXR7Ym9yZGVyOjA7YmFja2dyb3VuZDowIDA7aGVpZ2h0OjQ4cHg7cGFkZGluZzoxNnB4O291dGxpbmU6MCFpbXBvcnRhbnR9Lm1hdC1pY29ue21hcmdpbjowIWltcG9ydGFudH1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NjAwcHgpe2Rpdi5vcGVuZWR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDozMzM7YmFja2dyb3VuZDojZmZmO2hlaWdodDo0OHB4O21heC1oZWlnaHQ6NDhweDtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9ZGl2Lm9wZW5lZDphY3RpdmUsZGl2Lm9wZW5lZDpmb2N1cyxkaXYub3BlbmVkOmhvdmVye2JveC1zaGFkb3c6MCAycHggNHB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA0cHggNXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDEwcHggMCByZ2JhKDAsMCwwLC4xMil9fWBdLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiPlxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWJ1dHRvblwiIG1hdFRvb2x0aXA9XCJCdXNjYXJcIlxuICAgICAgICAqbmdJZj1cIiFzaG93U2VhcmNoXCJcbiAgICAgICAgKGNsaWNrKT1cInNob3dJbnB1dCgpXCI+XG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCI+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwicmVzZXQtaW5wdXQtZGVmYXVsdFwiIGZ4RmxleD1cIjEwMFwiIFtzdHlsZS5wYWRkaW5nLWxlZnRdPVwiJzE2cHgnXCJcbiAgICAgICAgKm5nSWY9XCJzaG93U2VhcmNoXCJcbiAgICAgICAgW25nQ2xhc3NdPVwic2hvd1NlYXJjaCA/ICdvcGVuZWQnIDogJydcIlxuICAgICAgICBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2XCI+XG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCI+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiamFtLWlucHV0XCIgZnhGbGV4IGlkPVwic2VhcmNoLWlucHV0XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJzZWFyY2hDdHJsXCIgcGxhY2Vob2xkZXI9XCJCdXNjYXIuLi5cIj5cblxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1idXR0b25cIiAoY2xpY2spPVwic3dpdGNoKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCI+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgdGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIHNlYXJjaEN0cmw6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG5cbiAgICBwdWJsaWMgc2hvd1NlYXJjaCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBkZXN0cm95ZXIgPSBuZXcgRGVzdHJveWVyKCk7XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1NlYXJjaCA9IHRoaXMub3BlbmVkIHx8IHRoaXMuc2hvd1NlYXJjaDtcblxuICAgICAgICB0aGlzLnNlYXJjaEN0cmwudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3llci5waXBlKCksXG4gICAgICAgICAgICAgICAgbWFwKHggPT4geCksXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDQwMClcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKG5ld1ZhbHVlID0+IHRoaXMudGV4dENoYW5nZS5lbWl0KG5ld1ZhbHVlKSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dJbnB1dCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTZWFyY2ggPSB0aGlzLm9wZW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1NlYXJjaCA9ICF0aGlzLnNob3dTZWFyY2g7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgaWYgKHRoaXMuc2hvd1NlYXJjaCkgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1pbnB1dCcpLmZvY3VzKCk7IH0sIDApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc3dpdGNoKCkge1xuICAgICAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1NlYXJjaCA9IHRoaXMub3BlbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93U2VhcmNoID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hDdHJsLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hDdHJsLnNldFZhbHVlKCcnKTtcbiAgICAgICAgICAgIHRoaXMudGV4dENoYW5nZS5lbWl0KHRoaXMuc2VhcmNoQ3RybC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=