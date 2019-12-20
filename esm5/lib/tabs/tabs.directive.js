import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
var JamTabsDirective = /** @class */ (function () {
    function JamTabsDirective(router, activatedRoute) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.defaultTabIndex = 0;
        activatedRoute.queryParams.subscribe(function (queryParams) { return _this.query_params = queryParams; });
    }
    JamTabsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.selected_tab = this.tabNames[this.query_params.tab_selected || Object.keys(this.tabNames)[this.defaultTabIndex]];
        this.tabGroup.selectedIndex = this.selected_tab;
        this.tabGroup.selectedIndexChange.subscribe(function (index) { return _this.onTabChange(index); });
    };
    JamTabsDirective.prototype.onTabChange = function (new_index) {
        var tab_selected;
        for (var each in this.tabNames) {
            if (this.tabNames[each] !== new_index)
                continue;
            tab_selected = each;
        }
        this.router.navigate([], { queryParams: tslib_1.__assign({}, this.query_params, { tab_selected: tab_selected }) });
    };
    JamTabsDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[jamTabs]'
                },] },
    ];
    /** @nocollapse */
    JamTabsDirective.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    JamTabsDirective.propDecorators = {
        tabNames: [{ type: Input }],
        tabGroup: [{ type: Input }],
        defaultTabIndex: [{ type: Input }]
    };
    return JamTabsDirective;
}());
export { JamTabsDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi90YWJzL3RhYnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFVLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFckQ7SUFXSSwwQkFDYyxNQUFjLEVBQ2QsY0FBOEI7UUFGNUMsaUJBS0M7UUFKYSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTjVCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBUXhDLGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsV0FBVyxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksR0FBRyxXQUFXLEVBQS9CLENBQStCLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRU0sMENBQWUsR0FBdEI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUN0SCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSxzQ0FBVyxHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxJQUFJLFlBQVksQ0FBQztRQUNqQixLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7Z0JBQUUsU0FBUztZQUNoRCxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyx1QkFBTyxJQUFJLENBQUMsWUFBWSxFQUFLLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxDQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7O2dCQS9CSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCOzs7O2dCQUxnQixNQUFNO2dCQUFFLGNBQWM7OzsyQkFRbEMsS0FBSzsyQkFDTCxLQUFLO2tDQUNMLEtBQUs7O0lBMEJWLHVCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0E5QlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFyYW1zLCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1hdFRhYkdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tqYW1UYWJzXSdcbn0pXG5leHBvcnQgY2xhc3MgSmFtVGFic0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KCkgcHVibGljIHRhYk5hbWVzOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfTtcbiAgICBASW5wdXQoKSBwdWJsaWMgdGFiR3JvdXA6IE1hdFRhYkdyb3VwO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBkZWZhdWx0VGFiSW5kZXg6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHNlbGVjdGVkX3RhYjogbnVtYmVyO1xuICAgIHB1YmxpYyBxdWVyeV9wYXJhbXM6IFBhcmFtcztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7XG4gICAgICAgIGFjdGl2YXRlZFJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShxdWVyeVBhcmFtcyA9PiB0aGlzLnF1ZXJ5X3BhcmFtcyA9IHF1ZXJ5UGFyYW1zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkX3RhYiA9IHRoaXMudGFiTmFtZXNbdGhpcy5xdWVyeV9wYXJhbXMudGFiX3NlbGVjdGVkIHx8IE9iamVjdC5rZXlzKHRoaXMudGFiTmFtZXMpW3RoaXMuZGVmYXVsdFRhYkluZGV4XV07XG4gICAgICAgIHRoaXMudGFiR3JvdXAuc2VsZWN0ZWRJbmRleCA9IHRoaXMuc2VsZWN0ZWRfdGFiO1xuICAgICAgICB0aGlzLnRhYkdyb3VwLnNlbGVjdGVkSW5kZXhDaGFuZ2Uuc3Vic2NyaWJlKGluZGV4ID0+IHRoaXMub25UYWJDaGFuZ2UoaW5kZXgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UYWJDaGFuZ2UobmV3X2luZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRhYl9zZWxlY3RlZDtcbiAgICAgICAgZm9yIChsZXQgZWFjaCBpbiB0aGlzLnRhYk5hbWVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJOYW1lc1tlYWNoXSAhPT0gbmV3X2luZGV4KSBjb250aW51ZTtcbiAgICAgICAgICAgIHRhYl9zZWxlY3RlZCA9IGVhY2g7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW10sIHsgcXVlcnlQYXJhbXM6IHsgLi4udGhpcy5xdWVyeV9wYXJhbXMsIC4uLnt0YWJfc2VsZWN0ZWQ6IHRhYl9zZWxlY3RlZH0gfSB9KTtcbiAgICB9XG5cbn1cbiJdfQ==