import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { DomService } from './dom.service';
var SelectionBarService = /** @class */ (function () {
    function SelectionBarService(domService) {
        this.domService = domService;
        this.selected$ = new BehaviorSubject(new SelectionModel());
        this.callMethod$ = new BehaviorSubject({ method: '' });
        this.selectionBarElementId = 'selection-bar-container';
    }
    SelectionBarService.prototype.selected = function (selected) {
        this.selected$.next(selected);
    };
    SelectionBarService.prototype.callMethod = function (methodRef) {
        this.callMethod$.next(methodRef);
    };
    SelectionBarService.prototype.clearMethod = function () {
        this.callMethod({ method: '' });
    };
    SelectionBarService.prototype.init = function (component, inputs, outputs) {
        var componentConfig = {
            inputs: inputs,
            outputs: outputs
        };
        if (document.getElementById(this.selectionBarElementId).className === 'show') {
            return undefined; // ts-lint => Value-returning function should use `return undefined;`, not just `return;`
        }
        var created_component_instance = this.domService.appendComponentTo(this.selectionBarElementId, component, componentConfig);
        document.getElementById(this.selectionBarElementId).className = 'show';
        return created_component_instance;
    };
    SelectionBarService.prototype.destroy = function () {
        this.domService.removeComponent();
        document.getElementById(this.selectionBarElementId).className = 'hidden';
    };
    SelectionBarService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SelectionBarService.ctorParameters = function () { return [
        { type: DomService }
    ]; };
    return SelectionBarService;
}());
export { SelectionBarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0aW9uLWJhci9zZWxlY3Rpb24tYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQztJQU1JLDZCQUEyQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSjFDLGNBQVMsR0FBeUMsSUFBSSxlQUFlLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQzVGLGdCQUFXLEdBQWdDLElBQUksZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUUsMEJBQXFCLEdBQUcseUJBQXlCLENBQUM7SUFFTixDQUFDO0lBRTlDLHNDQUFRLEdBQWYsVUFBbUIsUUFBMkI7UUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLHdDQUFVLEdBQWpCLFVBQWtCLFNBQXFCO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSx5Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sa0NBQUksR0FBWCxVQUFZLFNBQWMsRUFBRSxNQUFjLEVBQUUsT0FBZTtRQUN2RCxJQUFJLGVBQWUsR0FBRztZQUNsQixNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7UUFFRixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUMxRSxPQUFPLFNBQVMsQ0FBQyxDQUFDLHlGQUF5RjtTQUM5RztRQUVELElBQUksMEJBQTBCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNILFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUV2RSxPQUFPLDBCQUEwQixDQUFDO0lBQ3RDLENBQUM7SUFFTSxxQ0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNsQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDN0UsQ0FBQzs7Z0JBdkNKLFVBQVU7Ozs7Z0JBUEYsVUFBVTs7SUErQ25CLDBCQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7U0F2Q1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL2RvbS5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWV0aG9kUmVmIHtcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICBwYXJhbXM/OiBhbnk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25CYXJTZXJ2aWNlIHtcbiAgICBwdWJsaWMgc2VsZWN0ZWQkOiBCZWhhdmlvclN1YmplY3Q8U2VsZWN0aW9uTW9kZWw8YW55Pj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG5ldyBTZWxlY3Rpb25Nb2RlbCgpKTtcbiAgICBwdWJsaWMgY2FsbE1ldGhvZCQ6IEJlaGF2aW9yU3ViamVjdDxJTWV0aG9kUmVmPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoeyBtZXRob2Q6ICcnIH0pO1xuICAgIHByaXZhdGUgc2VsZWN0aW9uQmFyRWxlbWVudElkID0gJ3NlbGVjdGlvbi1iYXItY29udGFpbmVyJztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGRvbVNlcnZpY2U6IERvbVNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWQ8VD4oc2VsZWN0ZWQ6IFNlbGVjdGlvbk1vZGVsPFQ+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYWxsTWV0aG9kKG1ldGhvZFJlZjogSU1ldGhvZFJlZik6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbGxNZXRob2QkLm5leHQobWV0aG9kUmVmKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJNZXRob2QoKSB7XG4gICAgICAgIHRoaXMuY2FsbE1ldGhvZCh7IG1ldGhvZDogJycgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoY29tcG9uZW50OiBhbnksIGlucHV0czogb2JqZWN0LCBvdXRwdXRzOiBvYmplY3QpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgICAgIGxldCBjb21wb25lbnRDb25maWcgPSB7XG4gICAgICAgICAgICBpbnB1dHM6IGlucHV0cyxcbiAgICAgICAgICAgIG91dHB1dHM6IG91dHB1dHNcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50SWQpLmNsYXNzTmFtZSA9PT0gJ3Nob3cnKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyB0cy1saW50ID0+IFZhbHVlLXJldHVybmluZyBmdW5jdGlvbiBzaG91bGQgdXNlIGByZXR1cm4gdW5kZWZpbmVkO2AsIG5vdCBqdXN0IGByZXR1cm47YFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNyZWF0ZWRfY29tcG9uZW50X2luc3RhbmNlID0gdGhpcy5kb21TZXJ2aWNlLmFwcGVuZENvbXBvbmVudFRvKHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudElkLCBjb21wb25lbnQsIGNvbXBvbmVudENvbmZpZyk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudElkKS5jbGFzc05hbWUgPSAnc2hvdyc7XG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZWRfY29tcG9uZW50X2luc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRvbVNlcnZpY2UucmVtb3ZlQ29tcG9uZW50KCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudElkKS5jbGFzc05hbWUgPSAnaGlkZGVuJztcbiAgICB9XG59XG4iXX0=