/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef } from '@angular/core';
import { mixinDisabled } from '@angular/material/core';
// Boilerplate for applying mixins to JamSlideElementWrapper.
/** @docs-private */
var JamSlideElementWrapperBase = /** @class */ (function () {
    function JamSlideElementWrapperBase() {
    }
    return JamSlideElementWrapperBase;
}());
export { JamSlideElementWrapperBase };
export var _JamSlideElementWrapperMixinBase = mixinDisabled(JamSlideElementWrapperBase);
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator directive-selector
/**
 * Used in the `jam-slide-group` view to display slide labels.
 * @docs-private
 */
var JamSlideElementWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(JamSlideElementWrapper, _super);
    function JamSlideElementWrapper(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** Sets focus on the wrapper element */
    JamSlideElementWrapper.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    JamSlideElementWrapper.prototype.getOffsetLeft = function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    JamSlideElementWrapper.prototype.getOffsetWidth = function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    JamSlideElementWrapper.decorators = [
        { type: Directive, args: [{
                    selector: '[jamSlideElementWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.jam-slide-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled'
                    }
                },] },
    ];
    /** @nocollapse */
    JamSlideElementWrapper.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return JamSlideElementWrapper;
}(_JamSlideElementWrapperMixinBase));
export { JamSlideElementWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtZWxlbWVudC13cmFwcGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvc2xpZGUvc2xpZGUtZWxlbWVudC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5GLDZEQUE2RDtBQUM3RCxvQkFBb0I7QUFDcEI7SUFBQTtJQUF5QyxDQUFDO0lBQUQsaUNBQUM7QUFBRCxDQUFDLEFBQTFDLElBQTBDOztBQUMxQyxNQUFNLENBQUMsSUFBTSxnQ0FBZ0MsR0FDekMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFFOUMsNkdBQTZHO0FBRTdHOzs7R0FHRztBQUNIO0lBUTRDLGtEQUFnQztJQUMxRSxnQ0FBMEIsVUFBc0I7UUFBaEQsWUFDRSxpQkFBTyxTQUNSO1FBRnlCLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztJQUVoRCxDQUFDO0lBRUQsd0NBQXdDO0lBQ2pDLHNDQUFLLEdBQVo7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU0sOENBQWEsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztJQUNsRCxDQUFDO0lBRU0sK0NBQWMsR0FBckI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUNuRCxDQUFDOztnQkF4QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLDRCQUE0QixFQUFFLFVBQVU7d0JBQ3hDLHNCQUFzQixFQUFFLFlBQVk7cUJBQ3JDO2lCQUNGOzs7O2dCQXRCbUIsVUFBVTs7SUF3QzlCLDZCQUFDO0NBQUEsQUF6QkQsQ0FRNEMsZ0NBQWdDLEdBaUIzRTtTQWpCWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgbWl4aW5EaXNhYmxlZCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIEphbVNsaWRlRWxlbWVudFdyYXBwZXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIEphbVNsaWRlRWxlbWVudFdyYXBwZXJCYXNlIHt9XG5leHBvcnQgY29uc3QgX0phbVNsaWRlRWxlbWVudFdyYXBwZXJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIEphbVNsaWRlRWxlbWVudFdyYXBwZXJCYXNlID1cbiAgICBtaXhpbkRpc2FibGVkKEphbVNsaWRlRWxlbWVudFdyYXBwZXJCYXNlKTtcblxuLy8gdHNsaW50OmRpc2FibGU6IGludGVyZmFjZS1uYW1lIHVzZS1pbnB1dC1wcm9wZXJ0eS1kZWNvcmF0b3IgdXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yIGRpcmVjdGl2ZS1zZWxlY3RvclxuXG4vKipcbiAqIFVzZWQgaW4gdGhlIGBqYW0tc2xpZGUtZ3JvdXBgIHZpZXcgdG8gZGlzcGxheSBzbGlkZSBsYWJlbHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tqYW1TbGlkZUVsZW1lbnRXcmFwcGVyXScsXG4gIGlucHV0czogWydkaXNhYmxlZCddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5qYW0tc2xpZGUtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnISFkaXNhYmxlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyIGV4dGVuZHMgX0phbVNsaWRlRWxlbWVudFdyYXBwZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSB3cmFwcGVyIGVsZW1lbnQgKi9cbiAgcHVibGljIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T2Zmc2V0TGVmdCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xuICB9XG5cbiAgcHVibGljIGdldE9mZnNldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICB9XG59XG4iXX0=