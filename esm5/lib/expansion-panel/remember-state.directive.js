import { Directive, ContentChild, ElementRef, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { Router } from '@angular/router';
var RemembermeStateDirective = /** @class */ (function () {
    function RemembermeStateDirective(router, elementRef) {
        this.router = router;
        this.elementRef = elementRef;
        this.mat_expansion_pane_id = elementRef.nativeElement.id;
    }
    RemembermeStateDirective.prototype.ngAfterViewInit = function () {
        if (localStorage.getItem(this.mat_expansion_pane_id)) {
            this.mat_expansion_panel.expanded = localStorage.getItem(this.mat_expansion_pane_id);
        }
        this.changeExpandedExpansionPanel();
    };
    RemembermeStateDirective.prototype.onClick = function (event) {
        this.updateLocalStoreage();
    };
    RemembermeStateDirective.prototype.changeExpandedExpansionPanel = function () {
        this.updateLocalStoreage();
    };
    RemembermeStateDirective.prototype.updateLocalStoreage = function () {
        localStorage.setItem(this.mat_expansion_pane_id, this.mat_expansion_panel.expanded);
    };
    RemembermeStateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[jamExpansionPanelStatus]'
                },] },
    ];
    /** @nocollapse */
    RemembermeStateDirective.ctorParameters = function () { return [
        { type: Router },
        { type: ElementRef }
    ]; };
    RemembermeStateDirective.propDecorators = {
        mat_expansion_panel: [{ type: ContentChild, args: [MatExpansionPanel,] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return RemembermeStateDirective;
}());
export { RemembermeStateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtZW1iZXItc3RhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZXhwYW5zaW9uLXBhbmVsL3JlbWVtYmVyLXN0YXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekM7SUFRSSxrQ0FDWSxNQUFjLEVBQ2QsVUFBc0I7UUFEdEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFOUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFTSxrREFBZSxHQUF0QjtRQUNJLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDeEY7UUFFRCxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBR08sMENBQU8sR0FEZixVQUNnQixLQUFLO1FBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTywrREFBNEIsR0FBcEM7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sc0RBQW1CLEdBQTNCO1FBQ0ksWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7O2dCQWxDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtpQkFDeEM7Ozs7Z0JBSlEsTUFBTTtnQkFGa0MsVUFBVTs7O3NDQVF0RCxZQUFZLFNBQUMsaUJBQWlCOzBCQW1COUIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFZckMsK0JBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQWhDWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRFeHBhbnNpb25QYW5lbCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2phbUV4cGFuc2lvblBhbmVsU3RhdHVzXSdcbn0pXG5leHBvcnQgY2xhc3MgUmVtZW1iZXJtZVN0YXRlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQENvbnRlbnRDaGlsZChNYXRFeHBhbnNpb25QYW5lbCkgcHVibGljIG1hdF9leHBhbnNpb25fcGFuZWw6IE1hdEV4cGFuc2lvblBhbmVsO1xuXG4gICAgcHJpdmF0ZSBtYXRfZXhwYW5zaW9uX3BhbmVfaWQ6IHN0cmluZztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICAgKSB7XG4gICAgICAgIHRoaXMubWF0X2V4cGFuc2lvbl9wYW5lX2lkID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlkO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLm1hdF9leHBhbnNpb25fcGFuZV9pZCkpIHtcbiAgICAgICAgICAgIHRoaXMubWF0X2V4cGFuc2lvbl9wYW5lbC5leHBhbmRlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubWF0X2V4cGFuc2lvbl9wYW5lX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRXhwYW5kZWRFeHBhbnNpb25QYW5lbCgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBwcml2YXRlIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVMb2NhbFN0b3JlYWdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VFeHBhbmRlZEV4cGFuc2lvblBhbmVsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZUxvY2FsU3RvcmVhZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUxvY2FsU3RvcmVhZ2UoKTogdm9pZCB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubWF0X2V4cGFuc2lvbl9wYW5lX2lkLCB0aGlzLm1hdF9leHBhbnNpb25fcGFuZWwuZXhwYW5kZWQpO1xuICAgIH1cbn1cbiJdfQ==