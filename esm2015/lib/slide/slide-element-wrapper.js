/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef } from '@angular/core';
import { mixinDisabled } from '@angular/material/core';
// Boilerplate for applying mixins to JamSlideElementWrapper.
/** @docs-private */
export class JamSlideElementWrapperBase {
}
export const _JamSlideElementWrapperMixinBase = mixinDisabled(JamSlideElementWrapperBase);
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator directive-selector
/**
 * Used in the `jam-slide-group` view to display slide labels.
 * @docs-private
 */
export class JamSlideElementWrapper extends _JamSlideElementWrapperMixinBase {
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /** Sets focus on the wrapper element */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
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
JamSlideElementWrapper.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtZWxlbWVudC13cmFwcGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvc2xpZGUvc2xpZGUtZWxlbWVudC13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBOEIsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkYsNkRBQTZEO0FBQzdELG9CQUFvQjtBQUNwQixNQUFNLE9BQU8sMEJBQTBCO0NBQUc7QUFDMUMsTUFBTSxDQUFDLE1BQU0sZ0NBQWdDLEdBQ3pDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBRTlDLDZHQUE2RztBQUU3Rzs7O0dBR0c7QUFTSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZ0NBQWdDO0lBQzFFLFlBQTBCLFVBQXNCO1FBQzlDLEtBQUssRUFBRSxDQUFDO1FBRGdCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFFaEQsQ0FBQztJQUVELHdDQUF3QztJQUNqQyxLQUFLO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLGFBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDbEQsQ0FBQztJQUVNLGNBQWM7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDbkQsQ0FBQzs7O1lBeEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLElBQUksRUFBRTtvQkFDSiw0QkFBNEIsRUFBRSxVQUFVO29CQUN4QyxzQkFBc0IsRUFBRSxZQUFZO2lCQUNyQzthQUNGOzs7O1lBdEJtQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyQmFzZSB7fVxuZXhwb3J0IGNvbnN0IF9KYW1TbGlkZUVsZW1lbnRXcmFwcGVyTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyQmFzZSA9XG4gICAgbWl4aW5EaXNhYmxlZChKYW1TbGlkZUVsZW1lbnRXcmFwcGVyQmFzZSk7XG5cbi8vIHRzbGludDpkaXNhYmxlOiBpbnRlcmZhY2UtbmFtZSB1c2UtaW5wdXQtcHJvcGVydHktZGVjb3JhdG9yIHVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvciBkaXJlY3RpdmUtc2VsZWN0b3JcblxuLyoqXG4gKiBVc2VkIGluIHRoZSBgamFtLXNsaWRlLWdyb3VwYCB2aWV3IHRvIGRpc3BsYXkgc2xpZGUgbGFiZWxzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbamFtU2xpZGVFbGVtZW50V3JhcHBlcl0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuamFtLXNsaWRlLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJyEhZGlzYWJsZWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVFbGVtZW50V3JhcHBlciBleHRlbmRzIF9KYW1TbGlkZUVsZW1lbnRXcmFwcGVyTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKiogU2V0cyBmb2N1cyBvbiB0aGUgd3JhcHBlciBlbGVtZW50ICovXG4gIHB1YmxpYyBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgcHVibGljIGdldE9mZnNldExlZnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPZmZzZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgfVxufVxuIl19