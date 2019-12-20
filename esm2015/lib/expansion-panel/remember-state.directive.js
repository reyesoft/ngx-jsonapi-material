import { Directive, ContentChild, ElementRef, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { Router } from '@angular/router';
export class RemembermeStateDirective {
    constructor(router, elementRef) {
        this.router = router;
        this.elementRef = elementRef;
        this.mat_expansion_pane_id = elementRef.nativeElement.id;
    }
    ngAfterViewInit() {
        if (localStorage.getItem(this.mat_expansion_pane_id)) {
            this.mat_expansion_panel.expanded = localStorage.getItem(this.mat_expansion_pane_id);
        }
        this.changeExpandedExpansionPanel();
    }
    onClick(event) {
        this.updateLocalStoreage();
    }
    changeExpandedExpansionPanel() {
        this.updateLocalStoreage();
    }
    updateLocalStoreage() {
        localStorage.setItem(this.mat_expansion_pane_id, this.mat_expansion_panel.expanded);
    }
}
RemembermeStateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[jamExpansionPanelStatus]'
            },] },
];
/** @nocollapse */
RemembermeStateDirective.ctorParameters = () => [
    { type: Router },
    { type: ElementRef }
];
RemembermeStateDirective.propDecorators = {
    mat_expansion_panel: [{ type: ContentChild, args: [MatExpansionPanel,] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtZW1iZXItc3RhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZXhwYW5zaW9uLXBhbmVsL3JlbWVtYmVyLXN0YXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFpQixZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLekMsTUFBTSxPQUFPLHdCQUF3QjtJQUtqQyxZQUNZLE1BQWMsRUFDZCxVQUFzQjtRQUR0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMscUJBQXFCLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7SUFDN0QsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUN4RjtRQUVELElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFHTyxPQUFPLENBQUMsS0FBSztRQUNqQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sNEJBQTRCO1FBQ2hDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTyxtQkFBbUI7UUFDdkIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7OztZQWxDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjthQUN4Qzs7OztZQUpRLE1BQU07WUFGa0MsVUFBVTs7O2tDQVF0RCxZQUFZLFNBQUMsaUJBQWlCO3NCQW1COUIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEV4cGFuc2lvblBhbmVsIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbamFtRXhwYW5zaW9uUGFuZWxTdGF0dXNdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZW1lbWJlcm1lU3RhdGVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBAQ29udGVudENoaWxkKE1hdEV4cGFuc2lvblBhbmVsKSBwdWJsaWMgbWF0X2V4cGFuc2lvbl9wYW5lbDogTWF0RXhwYW5zaW9uUGFuZWw7XG5cbiAgICBwcml2YXRlIG1hdF9leHBhbnNpb25fcGFuZV9pZDogc3RyaW5nO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICAgICAgdGhpcy5tYXRfZXhwYW5zaW9uX3BhbmVfaWQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaWQ7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubWF0X2V4cGFuc2lvbl9wYW5lX2lkKSkge1xuICAgICAgICAgICAgdGhpcy5tYXRfZXhwYW5zaW9uX3BhbmVsLmV4cGFuZGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5tYXRfZXhwYW5zaW9uX3BhbmVfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VFeHBhbmRlZEV4cGFuc2lvblBhbmVsKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIHByaXZhdGUgb25DbGljayhldmVudCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUxvY2FsU3RvcmVhZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUV4cGFuZGVkRXhwYW5zaW9uUGFuZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxTdG9yZWFnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTG9jYWxTdG9yZWFnZSgpOiB2b2lkIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5tYXRfZXhwYW5zaW9uX3BhbmVfaWQsIHRoaXMubWF0X2V4cGFuc2lvbl9wYW5lbC5leHBhbmRlZCk7XG4gICAgfVxufVxuIl19