/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@angular/material/core';
import { Subject } from 'rxjs';
// import {JamSlideContent} from './slide-content';
import { JamSlideElement } from './slide-element';
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator component-selector no-input-rename
// Boilerplate for applying mixins to JamSlide.
/** @docs-private */
var JamSlideBase = /** @class */ (function () {
    function JamSlideBase() {
    }
    return JamSlideBase;
}());
export { JamSlideBase };
export var _JamSlideMixinBase = mixinDisabled(JamSlideBase);
var JamSlide = /** @class */ (function (_super) {
    tslib_1.__extends(JamSlide, _super);
    function JamSlide(_viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._viewContainerRef = _viewContainerRef;
        /**
         * Template provided in the slide content that will be used if present, used to enable lazy-loading
         */
        /** Plain text element for the slide, used when there is no template label. */
        _this.textLabel = '';
        /** Emits whenever the internal state of the slide changes. */
        _this._stateChanges = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        _this.position = null;
        /**
         * The initial relatively index origin of the slide if it was created and selected after there
         * was already a selected slide. Provides context of what position the slide should originate from.
         */
        _this.origin = null;
        /**
         * Whether the slide is currently active.
         */
        _this.isActive = false;
        /** Portal that will be the hosted content of the slide */
        _this._contentPortal = null;
        return _this;
    }
    Object.defineProperty(JamSlide.prototype, "content", {
        /** @docs-private */
        get: function () {
            return this._contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    JamSlide.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this._stateChanges.next();
        }
    };
    JamSlide.prototype.ngOnDestroy = function () {
        this._stateChanges.complete();
    };
    JamSlide.prototype.ngOnInit = function () {
        this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
    };
    JamSlide.decorators = [
        { type: Component, args: [{
                    selector: 'jam-slide',
                    template: "<!-- Create a template for the content of the <jam-slide> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the slide content in the appropriate place in the\n    slide-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n",
                    inputs: ['disabled'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'jamSlide'
                },] },
    ];
    /** @nocollapse */
    JamSlide.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    JamSlide.propDecorators = {
        templateLabel: [{ type: ContentChild, args: [JamSlideElement,] }],
        textLabel: [{ type: Input, args: ['label',] }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
        _implicitContent: [{ type: ViewChild, args: [TemplateRef,] }]
    };
    return JamSlide;
}(_JamSlideMixinBase));
export { JamSlide };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9zbGlkZS9zbGlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBS0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBOEIsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixtREFBbUQ7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWxELDZIQUE2SDtBQUU3SCwrQ0FBK0M7QUFDL0Msb0JBQW9CO0FBQ3BCO0lBQUE7SUFBMkIsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQUE1QixJQUE0Qjs7QUFDNUIsTUFBTSxDQUFDLElBQU0sa0JBQWtCLEdBQzNCLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVoQztJQVk4QixvQ0FBa0I7SUFxRDlDLGtCQUEyQixpQkFBbUM7UUFBOUQsWUFDRSxpQkFBTyxTQUNSO1FBRjBCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFqRDlEOztXQUVHO1FBQ0gsOEVBQThFO1FBQ3ZELGVBQVMsR0FBVyxFQUFFLENBQUM7UUFnQjlDLDhEQUE4RDtRQUM5QyxtQkFBYSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFcEQ7OztXQUdHO1FBQ0ksY0FBUSxHQUFrQixJQUFJLENBQUM7UUFFdEM7OztXQUdHO1FBQ0ksWUFBTSxHQUFrQixJQUFJLENBQUM7UUFFcEM7O1dBRUc7UUFDSSxjQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXhCLDBEQUEwRDtRQUNoRCxvQkFBYyxHQUEwQixJQUFJLENBQUM7O0lBVXZELENBQUM7SUFuQ0Qsc0JBQVcsNkJBQU87UUFEbEIsb0JBQW9CO2FBQ3BCO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBbUNNLDhCQUFXLEdBQWxCLFVBQW1CLE9BQXNCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRU0sOEJBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSwyQkFBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FDcEMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM5RSxDQUFDOztnQkFsRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUscVJBSVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNwQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxVQUFVO2lCQUNyQjs7OztnQkEzQkMsZ0JBQWdCOzs7Z0NBOEJmLFlBQVksU0FBQyxlQUFlOzRCQU01QixLQUFLLFNBQUMsT0FBTzs0QkFHYixLQUFLLFNBQUMsWUFBWTtpQ0FNbEIsS0FBSyxTQUFDLGlCQUFpQjttQ0FrQ3ZCLFNBQVMsU0FBQyxXQUFXOztJQW9CeEIsZUFBQztDQUFBLEFBbkZELENBWThCLGtCQUFrQixHQXVFL0M7U0F2RVksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgbWl4aW5EaXNhYmxlZCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuLy8gaW1wb3J0IHtKYW1TbGlkZUNvbnRlbnR9IGZyb20gJy4vc2xpZGUtY29udGVudCc7XG5pbXBvcnQgeyBKYW1TbGlkZUVsZW1lbnQgfSBmcm9tICcuL3NsaWRlLWVsZW1lbnQnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogaW50ZXJmYWNlLW5hbWUgdXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvciB1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3IgY29tcG9uZW50LXNlbGVjdG9yIG5vLWlucHV0LXJlbmFtZVxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIEphbVNsaWRlLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBKYW1TbGlkZUJhc2Uge31cbmV4cG9ydCBjb25zdCBfSmFtU2xpZGVNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIEphbVNsaWRlQmFzZSA9XG4gICAgbWl4aW5EaXNhYmxlZChKYW1TbGlkZUJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdqYW0tc2xpZGUnLFxuICB0ZW1wbGF0ZTogYDwhLS0gQ3JlYXRlIGEgdGVtcGxhdGUgZm9yIHRoZSBjb250ZW50IG9mIHRoZSA8amFtLXNsaWRlPiBzbyB0aGF0IHdlIGNhbiBncmFiIGEgcmVmZXJlbmNlIHRvIHRoaXNcbiAgICBUZW1wbGF0ZVJlZiBhbmQgdXNlIGl0IGluIGEgUG9ydGFsIHRvIHJlbmRlciB0aGUgc2xpZGUgY29udGVudCBpbiB0aGUgYXBwcm9wcmlhdGUgcGxhY2UgaW4gdGhlXG4gICAgc2xpZGUtZ3JvdXAuIC0tPlxuPG5nLXRlbXBsYXRlPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L25nLXRlbXBsYXRlPlxuYCxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ2phbVNsaWRlJ1xufSlcbmV4cG9ydCBjbGFzcyBKYW1TbGlkZSBleHRlbmRzIF9KYW1TbGlkZU1peGluQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgQ2FuRGlzYWJsZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKiogQ29udGVudCBmb3IgdGhlIHNsaWRlIGVsZW1lbnQgZ2l2ZW4gYnkgYDxuZy10ZW1wbGF0ZSBqYW0tc2xpZGUtZWxlbWVudD5gLiAqL1xuICBAQ29udGVudENoaWxkKEphbVNsaWRlRWxlbWVudCkgcHVibGljIHRlbXBsYXRlTGFiZWw6IEphbVNsaWRlRWxlbWVudDtcblxuICAvKipcbiAgICogVGVtcGxhdGUgcHJvdmlkZWQgaW4gdGhlIHNsaWRlIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHVzZWQgaWYgcHJlc2VudCwgdXNlZCB0byBlbmFibGUgbGF6eS1sb2FkaW5nXG4gICAqL1xuICAvKiogUGxhaW4gdGV4dCBlbGVtZW50IGZvciB0aGUgc2xpZGUsIHVzZWQgd2hlbiB0aGVyZSBpcyBubyB0ZW1wbGF0ZSBsYWJlbC4gKi9cbiAgQElucHV0KCdsYWJlbCcpIHB1YmxpYyB0ZXh0TGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBBcmlhIGVsZW1lbnQgZm9yIHRoZSBzbGlkZS4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgcHVibGljIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgdGhhdCB0aGUgc2xpZGUgaXMgbGFiZWxsZWQgYnkuXG4gICAqIFdpbGwgYmUgY2xlYXJlZCBpZiBgYXJpYS1sYWJlbGAgaXMgc2V0IGF0IHRoZSBzYW1lIHRpbWUuXG4gICAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIHB1YmxpYyBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gIC8qKiBAZG9jcy1wcml2YXRlICovXG4gIHB1YmxpYyBnZXQgY29udGVudCgpOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50UG9ydGFsO1xuICB9XG5cbiAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgc2xpZGUgY2hhbmdlcy4gKi9cbiAgcHVibGljIHJlYWRvbmx5IF9zdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVsYXRpdmVseSBpbmRleGVkIHBvc2l0aW9uIHdoZXJlIDAgcmVwcmVzZW50cyB0aGUgY2VudGVyLCBuZWdhdGl2ZSBpcyBsZWZ0LCBhbmQgcG9zaXRpdmVcbiAgICogcmVwcmVzZW50cyB0aGUgcmlnaHQuXG4gICAqL1xuICBwdWJsaWMgcG9zaXRpb246IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCByZWxhdGl2ZWx5IGluZGV4IG9yaWdpbiBvZiB0aGUgc2xpZGUgaWYgaXQgd2FzIGNyZWF0ZWQgYW5kIHNlbGVjdGVkIGFmdGVyIHRoZXJlXG4gICAqIHdhcyBhbHJlYWR5IGEgc2VsZWN0ZWQgc2xpZGUuIFByb3ZpZGVzIGNvbnRleHQgb2Ygd2hhdCBwb3NpdGlvbiB0aGUgc2xpZGUgc2hvdWxkIG9yaWdpbmF0ZSBmcm9tLlxuICAgKi9cbiAgcHVibGljIG9yaWdpbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHNsaWRlIGlzIGN1cnJlbnRseSBhY3RpdmUuXG4gICAqL1xuICBwdWJsaWMgaXNBY3RpdmUgPSBmYWxzZTtcblxuICAvKiogUG9ydGFsIHRoYXQgd2lsbCBiZSB0aGUgaG9zdGVkIGNvbnRlbnQgb2YgdGhlIHNsaWRlICovXG4gIHByb3RlY3RlZCBfY29udGVudFBvcnRhbDogVGVtcGxhdGVQb3J0YWwgfCBudWxsID0gbnVsbDtcblxuICAvLyBAQ29udGVudENoaWxkKEphbVNsaWRlQ29udGVudCwge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWV9KVxuICBwcm90ZWN0ZWQgX2V4cGxpY2l0Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKiogVGVtcGxhdGUgaW5zaWRlIHRoZSBKYW1TbGlkZSB2aWV3IHRoYXQgY29udGFpbnMgYW4gYDxuZy1jb250ZW50PmAuICovXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHByb3RlY3RlZCBfaW1wbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3RleHRMYWJlbCcpIHx8IGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Rpc2FibGVkJykpIHtcbiAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRlbnRQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwoXG4gICAgICAgIHRoaXMuX2V4cGxpY2l0Q29udGVudCB8fCB0aGlzLl9pbXBsaWNpdENvbnRlbnQsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICB9XG59XG4iXX0=