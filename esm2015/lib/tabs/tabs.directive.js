import { Directive, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
export class JamTabsDirective {
    constructor(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.defaultTabIndex = 0;
        activatedRoute.queryParams.subscribe(queryParams => this.query_params = queryParams);
    }
    ngAfterViewInit() {
        this.selected_tab = this.tabNames[this.query_params.tab_selected || Object.keys(this.tabNames)[this.defaultTabIndex]];
        this.tabGroup.selectedIndex = this.selected_tab;
        this.tabGroup.selectedIndexChange.subscribe(index => this.onTabChange(index));
    }
    onTabChange(new_index) {
        let tab_selected;
        for (let each in this.tabNames) {
            if (this.tabNames[each] !== new_index)
                continue;
            tab_selected = each;
        }
        this.router.navigate([], { queryParams: Object.assign({}, this.query_params, { tab_selected: tab_selected }) });
    }
}
JamTabsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[jamTabs]'
            },] },
];
/** @nocollapse */
JamTabsDirective.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute }
];
JamTabsDirective.propDecorators = {
    tabNames: [{ type: Input }],
    tabGroup: [{ type: Input }],
    defaultTabIndex: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi90YWJzL3RhYnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQVUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUtyRCxNQUFNLE9BQU8sZ0JBQWdCO0lBUXpCLFlBQ2MsTUFBYyxFQUNkLGNBQThCO1FBRDlCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFONUIsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFReEMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUN0SCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSxXQUFXLENBQUMsU0FBaUI7UUFDaEMsSUFBSSxZQUFZLENBQUM7UUFDakIsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTO2dCQUFFLFNBQVM7WUFDaEQsWUFBWSxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLFdBQVcsb0JBQU8sSUFBSSxDQUFDLFlBQVksRUFBSyxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUMsQ0FBRSxFQUFFLENBQUMsQ0FBQztJQUN6RyxDQUFDOzs7WUEvQkosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2FBQ3RCOzs7O1lBTGdCLE1BQU07WUFBRSxjQUFjOzs7dUJBUWxDLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFyYW1zLCBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1hdFRhYkdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tqYW1UYWJzXSdcbn0pXG5leHBvcnQgY2xhc3MgSmFtVGFic0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KCkgcHVibGljIHRhYk5hbWVzOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfTtcbiAgICBASW5wdXQoKSBwdWJsaWMgdGFiR3JvdXA6IE1hdFRhYkdyb3VwO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBkZWZhdWx0VGFiSW5kZXg6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHNlbGVjdGVkX3RhYjogbnVtYmVyO1xuICAgIHB1YmxpYyBxdWVyeV9wYXJhbXM6IFBhcmFtcztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7XG4gICAgICAgIGFjdGl2YXRlZFJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShxdWVyeVBhcmFtcyA9PiB0aGlzLnF1ZXJ5X3BhcmFtcyA9IHF1ZXJ5UGFyYW1zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkX3RhYiA9IHRoaXMudGFiTmFtZXNbdGhpcy5xdWVyeV9wYXJhbXMudGFiX3NlbGVjdGVkIHx8IE9iamVjdC5rZXlzKHRoaXMudGFiTmFtZXMpW3RoaXMuZGVmYXVsdFRhYkluZGV4XV07XG4gICAgICAgIHRoaXMudGFiR3JvdXAuc2VsZWN0ZWRJbmRleCA9IHRoaXMuc2VsZWN0ZWRfdGFiO1xuICAgICAgICB0aGlzLnRhYkdyb3VwLnNlbGVjdGVkSW5kZXhDaGFuZ2Uuc3Vic2NyaWJlKGluZGV4ID0+IHRoaXMub25UYWJDaGFuZ2UoaW5kZXgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UYWJDaGFuZ2UobmV3X2luZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRhYl9zZWxlY3RlZDtcbiAgICAgICAgZm9yIChsZXQgZWFjaCBpbiB0aGlzLnRhYk5hbWVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJOYW1lc1tlYWNoXSAhPT0gbmV3X2luZGV4KSBjb250aW51ZTtcbiAgICAgICAgICAgIHRhYl9zZWxlY3RlZCA9IGVhY2g7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW10sIHsgcXVlcnlQYXJhbXM6IHsgLi4udGhpcy5xdWVyeV9wYXJhbXMsIC4uLnt0YWJfc2VsZWN0ZWQ6IHRhYl9zZWxlY3RlZH0gfSB9KTtcbiAgICB9XG5cbn1cbiJdfQ==