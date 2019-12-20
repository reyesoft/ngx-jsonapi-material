import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
var DomService = /** @class */ (function () {
    function DomService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.child_dom_element_id = 'current-selection-bar';
    }
    DomService.prototype.appendComponentTo = function (parentId, child, childConfig) {
        var child_node = document.getElementById(this.child_dom_element_id);
        if (child_node)
            child_node.parentNode.removeChild(child_node);
        /** Crea una referencia de componente desde el componente hijo */
        var childComponentRef = this.componentFactoryResolver.resolveComponentFactory(child).create(this.injector);
        /** Conecta la configuración al hijo (entradas y salidas) */
        this.attachConfig(childConfig, childComponentRef);
        this.childComponentRef = childComponentRef;
        // Agrega el componente al appRef de modo que esté dentro del árbol de componentes "ng"
        this.appRef.attachView(childComponentRef.hostView);
        // Obtiene el elemento DOM del componente
        var childDomElem = childComponentRef.hostView.rootNodes[0];
        childDomElem.setAttribute('id', this.child_dom_element_id);
        document.getElementById(parentId).appendChild(childDomElem);
        childDomElem.className = 'width-100';
        return childComponentRef;
    };
    DomService.prototype.removeComponent = function () {
        if (!this.childComponentRef)
            return;
        this.appRef.detachView(this.childComponentRef.hostView);
        this.childComponentRef.destroy();
    };
    DomService.prototype.attachConfig = function (config, componentRef) {
        var inputs = config.inputs;
        var outputs = config.outputs;
        for (var key in inputs) {
            componentRef.instance[key] = inputs[key];
        }
        for (var key in outputs) {
            componentRef.instance[key] = outputs[key];
        }
    };
    DomService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DomService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector }
    ]; };
    return DomService;
}());
export { DomService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Rpb24tYmFyL2RvbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFPOUg7SUFLSSxvQkFDWSx3QkFBa0QsRUFDbEQsTUFBc0IsRUFDdEIsUUFBa0I7UUFGbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTHRCLHlCQUFvQixHQUFHLHVCQUF1QixDQUFDO0lBTXBELENBQUM7SUFFRyxzQ0FBaUIsR0FBeEIsVUFBeUIsUUFBZ0IsRUFBRSxLQUFVLEVBQUUsV0FBMEI7UUFDN0UsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNwRSxJQUFJLFVBQVU7WUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU5RCxpRUFBaUU7UUFDakUsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3Ryw0REFBNEQ7UUFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsdUZBQXVGO1FBQ3ZGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5ELHlDQUF5QztRQUN6QyxJQUFNLFlBQVksR0FBSSxpQkFBaUIsQ0FBQyxRQUFpQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUM7UUFDdEcsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFM0QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsWUFBWSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7UUFFckMsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0lBRU0sb0NBQWUsR0FBdEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtZQUFFLE9BQU87UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU8saUNBQVksR0FBcEIsVUFBcUIsTUFBTSxFQUFFLFlBQVk7UUFDckMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzdCLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3BCLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsS0FBSyxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUU7WUFDckIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDOztnQkFsREosVUFBVTs7OztnQkFQVSx3QkFBd0I7Z0JBQUUsY0FBYztnQkFBRSxRQUFROztJQTBEdkUsaUJBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQWxEWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBBcHBsaWNhdGlvblJlZiwgSW5qZWN0b3IsIEVtYmVkZGVkVmlld1JlZiwgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmludGVyZmFjZSBJQ2hpbGRDb25maWcge1xuICAgIGlucHV0czogb2JqZWN0O1xuICAgIG91dHB1dHM6IG9iamVjdDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNlcnZpY2Uge1xuICAgIHByaXZhdGUgY2hpbGRDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjx7fT47XG4gICAgcHJpdmF0ZSBjaGlsZF9kb21fZWxlbWVudF9pZCA9ICdjdXJyZW50LXNlbGVjdGlvbi1iYXInO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGFwcGVuZENvbXBvbmVudFRvKHBhcmVudElkOiBzdHJpbmcsIGNoaWxkOiBhbnksIGNoaWxkQ29uZmlnPzogSUNoaWxkQ29uZmlnKTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgICAgICBsZXQgY2hpbGRfbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuY2hpbGRfZG9tX2VsZW1lbnRfaWQpO1xuICAgICAgICBpZiAoY2hpbGRfbm9kZSkgY2hpbGRfbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkX25vZGUpO1xuXG4gICAgICAgIC8qKiBDcmVhIHVuYSByZWZlcmVuY2lhIGRlIGNvbXBvbmVudGUgZGVzZGUgZWwgY29tcG9uZW50ZSBoaWpvICovXG4gICAgICAgIGNvbnN0IGNoaWxkQ29tcG9uZW50UmVmID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY2hpbGQpLmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcblxuICAgICAgICAvKiogQ29uZWN0YSBsYSBjb25maWd1cmFjacOzbiBhbCBoaWpvIChlbnRyYWRhcyB5IHNhbGlkYXMpICovXG4gICAgICAgIHRoaXMuYXR0YWNoQ29uZmlnKGNoaWxkQ29uZmlnLCBjaGlsZENvbXBvbmVudFJlZik7XG5cbiAgICAgICAgdGhpcy5jaGlsZENvbXBvbmVudFJlZiA9IGNoaWxkQ29tcG9uZW50UmVmO1xuICAgICAgICAvLyBBZ3JlZ2EgZWwgY29tcG9uZW50ZSBhbCBhcHBSZWYgZGUgbW9kbyBxdWUgZXN0w6kgZGVudHJvIGRlbCDDoXJib2wgZGUgY29tcG9uZW50ZXMgXCJuZ1wiXG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY2hpbGRDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgICAgIC8vIE9idGllbmUgZWwgZWxlbWVudG8gRE9NIGRlbCBjb21wb25lbnRlXG4gICAgICAgIGNvbnN0IGNoaWxkRG9tRWxlbSA9IChjaGlsZENvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjaGlsZERvbUVsZW0uc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuY2hpbGRfZG9tX2VsZW1lbnRfaWQpO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudElkKS5hcHBlbmRDaGlsZChjaGlsZERvbUVsZW0pO1xuICAgICAgICBjaGlsZERvbUVsZW0uY2xhc3NOYW1lID0gJ3dpZHRoLTEwMCc7XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkQ29tcG9uZW50UmVmO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVDb21wb25lbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGlsZENvbXBvbmVudFJlZikgcmV0dXJuO1xuICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMuY2hpbGRDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICB0aGlzLmNoaWxkQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaENvbmZpZyhjb25maWcsIGNvbXBvbmVudFJlZikge1xuICAgICAgICBsZXQgaW5wdXRzID0gY29uZmlnLmlucHV0cztcbiAgICAgICAgbGV0IG91dHB1dHMgPSBjb25maWcub3V0cHV0cztcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGlucHV0cykge1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlW2tleV0gPSBpbnB1dHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb3V0cHV0cykge1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlW2tleV0gPSBvdXRwdXRzW2tleV07XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=