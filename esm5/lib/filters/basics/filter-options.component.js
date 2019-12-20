/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
var JamFilterOptionsComponent = /** @class */ (function () {
    function JamFilterOptionsComponent() {
        this.remoteFilterChange = new EventEmitter();
    }
    JamFilterOptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterConfigArray = Object.keys(this.filterConfig.options).map(function (key) {
            _this.filterConfig.options[key].text = { key: key, name: _this.filterConfig.options[key].text };
            return _this.filterConfig.options[key];
        });
    };
    JamFilterOptionsComponent.prototype.optionSelected = function (jsonvalue, filter_list) {
        this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
        this.remoteFilterChange.emit(this.remoteFilter);
    };
    JamFilterOptionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-filter-options',
                    template: "<mat-form-field color=\"primary\" floatLabel=\"never\">\n    <mat-select\n        [(ngModel)]=\"filterConfig.selected\"\n        [placeholder]=\"filterConfig.title\">\n        <mat-option *ngFor=\"let config of filterConfigArray\"\n            [value]=\"config.text.key\"\n            (click)=\"optionSelected(config, filterConfig.selected)\">{{ config.text.name }}\n        </mat-option>\n    </mat-select>\n</mat-form-field>\n"
                },] },
    ];
    JamFilterOptionsComponent.propDecorators = {
        filterConfig: [{ type: Input }],
        remoteFilter: [{ type: Input }],
        remoteFilterChange: [{ type: Output }]
    };
    return JamFilterOptionsComponent;
}());
export { JamFilterOptionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLW9wdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmlsdGVycy9iYXNpY3MvZmlsdGVyLW9wdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkvRTtJQUFBO1FBaUJxQix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBZ0JsRSxDQUFDO0lBWlUsNENBQVEsR0FBZjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO1lBQ25FLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTlGLE9BQU8sS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sa0RBQWMsR0FBckIsVUFBc0IsU0FBUyxFQUFFLFdBQVc7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxDQUFDOztnQkFoQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSw4YUFVYjtpQkFDQTs7OytCQUVJLEtBQUs7K0JBQ0wsS0FBSztxQ0FDTCxNQUFNOztJQWdCWCxnQ0FBQztDQUFBLEFBakNELElBaUNDO1NBbkJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGaWx0ZXJPcHRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ZpbHRlci1vcHRpb24uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmlsdGVyLW9wdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNvbG9yPVwicHJpbWFyeVwiIGZsb2F0TGFiZWw9XCJuZXZlclwiPlxuICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyQ29uZmlnLnNlbGVjdGVkXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cImZpbHRlckNvbmZpZy50aXRsZVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIGZpbHRlckNvbmZpZ0FycmF5XCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJjb25maWcudGV4dC5rZXlcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9wdGlvblNlbGVjdGVkKGNvbmZpZywgZmlsdGVyQ29uZmlnLnNlbGVjdGVkKVwiPnt7IGNvbmZpZy50ZXh0Lm5hbWUgfX1cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdD5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEphbUZpbHRlck9wdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmaWx0ZXJDb25maWc6IEZpbHRlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiBvYmplY3Q7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZW1vdGVGaWx0ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBmaWx0ZXJDb25maWdBcnJheTogQXJyYXk8RmlsdGVyT3B0aW9uPjtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJDb25maWdBcnJheSA9IE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJDb25maWcub3B0aW9uc1trZXldLnRleHQgPSB7IGtleToga2V5LCBuYW1lOiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCB9O1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJDb25maWcub3B0aW9uc1trZXldO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0aW9uU2VsZWN0ZWQoanNvbnZhbHVlLCBmaWx0ZXJfbGlzdCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbW90ZUZpbHRlclt0aGlzLmZpbHRlckNvbmZpZy5hdHRyaWJ1dGVdID0gZmlsdGVyX2xpc3QudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5yZW1vdGVGaWx0ZXJDaGFuZ2UuZW1pdCh0aGlzLnJlbW90ZUZpbHRlcik7XG4gICAgfVxufVxuIl19