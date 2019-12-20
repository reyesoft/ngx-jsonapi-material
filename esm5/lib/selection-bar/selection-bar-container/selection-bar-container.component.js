import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SelectionBarService } from '../selection-bar.service';
var SelectionBarContainerComponent = /** @class */ (function () {
    function SelectionBarContainerComponent(selectionBarService, router) {
        var _this = this;
        this.selectionBarService = selectionBarService;
        this.router = router;
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                _this.selectionBarService.destroy();
            }
        });
    }
    SelectionBarContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-selection-bar-container',
                    template: "<div id=\"selection-bar-container\" class=\"hidden\"></div>\n",
                    styles: [":host /deep/ .hidden{display:none!important}:host /deep/ .show{display:-webkit-box!important;display:flex!important}#selection-bar-container{-webkit-box-align:center;align-items:center;position:fixed;z-index:1003;top:0;left:0;right:0;width:100%;height:64px;opacity:1;background:#fff}:host /deep/ #selection-bar-container #current-selection-bar:first-child{padding:0 20px;width:100%}"]
                },] },
    ];
    /** @nocollapse */
    SelectionBarContainerComponent.ctorParameters = function () { return [
        { type: SelectionBarService },
        { type: Router }
    ]; };
    return SelectionBarContainerComponent;
}());
export { SelectionBarContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWJhci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0aW9uLWJhci9zZWxlY3Rpb24tYmFyLWNvbnRhaW5lci9zZWxlY3Rpb24tYmFyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9EO0lBT0ksd0NBQ2MsbUJBQXdDLEVBQ3hDLE1BQWM7UUFGNUIsaUJBU0M7UUFSYSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUM5QixJQUFJLEtBQUssWUFBWSxlQUFlLEVBQUU7Z0JBQ2xDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN0QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBaEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxRQUFRLEVBQUUsK0RBQ2I7b0JBQ0csTUFBTSxFQUFFLENBQUMsZ1lBQWdZLENBQUM7aUJBQzdZOzs7O2dCQVBRLG1CQUFtQjtnQkFEbkIsTUFBTTs7SUFvQmYscUNBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQVhZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTZWxlY3Rpb25CYXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VsZWN0aW9uLWJhci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tc2VsZWN0aW9uLWJhci1jb250YWluZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBpZD1cInNlbGVjdGlvbi1iYXItY29udGFpbmVyXCIgY2xhc3M9XCJoaWRkZW5cIj48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0IC9kZWVwLyAuaGlkZGVue2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9Omhvc3QgL2RlZXAvIC5zaG93e2Rpc3BsYXk6LXdlYmtpdC1ib3ghaW1wb3J0YW50O2Rpc3BsYXk6ZmxleCFpbXBvcnRhbnR9I3NlbGVjdGlvbi1iYXItY29udGFpbmVyey13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAzO3RvcDowO2xlZnQ6MDtyaWdodDowO3dpZHRoOjEwMCU7aGVpZ2h0OjY0cHg7b3BhY2l0eToxO2JhY2tncm91bmQ6I2ZmZn06aG9zdCAvZGVlcC8gI3NlbGVjdGlvbi1iYXItY29udGFpbmVyICNjdXJyZW50LXNlbGVjdGlvbi1iYXI6Zmlyc3QtY2hpbGR7cGFkZGluZzowIDIwcHg7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25CYXJDb250YWluZXJDb21wb25lbnQge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHNlbGVjdGlvbkJhclNlcnZpY2U6IFNlbGVjdGlvbkJhclNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlclxuICAgICkge1xuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQmFyU2VydmljZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==