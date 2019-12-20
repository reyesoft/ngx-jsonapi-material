/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@angular/material/core';
import { Subject } from 'rxjs';
// import {JamSlideContent} from './slide-content';
import { JamSlideElement } from './slide-element';
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator component-selector no-input-rename
// Boilerplate for applying mixins to JamSlide.
/** @docs-private */
export class JamSlideBase {
}
export const _JamSlideMixinBase = mixinDisabled(JamSlideBase);
export class JamSlide extends _JamSlideMixinBase {
    constructor(_viewContainerRef) {
        super();
        this._viewContainerRef = _viewContainerRef;
        /**
         * Template provided in the slide content that will be used if present, used to enable lazy-loading
         */
        /** Plain text element for the slide, used when there is no template label. */
        this.textLabel = '';
        /** Emits whenever the internal state of the slide changes. */
        this._stateChanges = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        this.position = null;
        /**
         * The initial relatively index origin of the slide if it was created and selected after there
         * was already a selected slide. Provides context of what position the slide should originate from.
         */
        this.origin = null;
        /**
         * Whether the slide is currently active.
         */
        this.isActive = false;
        /** Portal that will be the hosted content of the slide */
        this._contentPortal = null;
    }
    /** @docs-private */
    get content() {
        return this._contentPortal;
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this._stateChanges.next();
        }
    }
    ngOnDestroy() {
        this._stateChanges.complete();
    }
    ngOnInit() {
        this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
    }
}
JamSlide.decorators = [
    { type: Component, args: [{
                selector: 'jam-slide',
                template: `<!-- Create a template for the content of the <jam-slide> so that we can grab a reference to this
    TemplateRef and use it in a Portal to render the slide content in the appropriate place in the
    slide-group. -->
<ng-template><ng-content></ng-content></ng-template>
`,
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'jamSlide'
            },] },
];
/** @nocollapse */
JamSlide.ctorParameters = () => [
    { type: ViewContainerRef }
];
JamSlide.propDecorators = {
    templateLabel: [{ type: ContentChild, args: [JamSlideElement,] }],
    textLabel: [{ type: Input, args: ['label',] }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    _implicitContent: [{ type: ViewChild, args: [TemplateRef,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9zbGlkZS9zbGlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFLTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLG1EQUFtRDtBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsNkhBQTZIO0FBRTdILCtDQUErQztBQUMvQyxvQkFBb0I7QUFDcEIsTUFBTSxPQUFPLFlBQVk7Q0FBRztBQUM1QixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FDM0IsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBY2hDLE1BQU0sT0FBTyxRQUFTLFNBQVEsa0JBQWtCO0lBcUQ5QyxZQUEyQixpQkFBbUM7UUFDNUQsS0FBSyxFQUFFLENBQUM7UUFEaUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQWpEOUQ7O1dBRUc7UUFDSCw4RUFBOEU7UUFDdkQsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQWdCOUMsOERBQThEO1FBQzlDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUVwRDs7O1dBR0c7UUFDSSxhQUFRLEdBQWtCLElBQUksQ0FBQztRQUV0Qzs7O1dBR0c7UUFDSSxXQUFNLEdBQWtCLElBQUksQ0FBQztRQUVwQzs7V0FFRztRQUNJLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFeEIsMERBQTBEO1FBQ2hELG1CQUFjLEdBQTBCLElBQUksQ0FBQztJQVV2RCxDQUFDO0lBcENELG9CQUFvQjtJQUNwQixJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFtQ00sV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FDcEMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM5RSxDQUFDOzs7WUFsRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7Q0FJWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLFVBQVU7YUFDckI7Ozs7WUEzQkMsZ0JBQWdCOzs7NEJBOEJmLFlBQVksU0FBQyxlQUFlO3dCQU01QixLQUFLLFNBQUMsT0FBTzt3QkFHYixLQUFLLFNBQUMsWUFBWTs2QkFNbEIsS0FBSyxTQUFDLGlCQUFpQjsrQkFrQ3ZCLFNBQVMsU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG4vLyBpbXBvcnQge0phbVNsaWRlQ29udGVudH0gZnJvbSAnLi9zbGlkZS1jb250ZW50JztcbmltcG9ydCB7IEphbVNsaWRlRWxlbWVudCB9IGZyb20gJy4vc2xpZGUtZWxlbWVudCc7XG5cbi8vIHRzbGludDpkaXNhYmxlOiBpbnRlcmZhY2UtbmFtZSB1c2UtaW5wdXQtcHJvcGVydHktZGVjb3JhdG9yIHVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvciBjb21wb25lbnQtc2VsZWN0b3Igbm8taW5wdXQtcmVuYW1lXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gSmFtU2xpZGUuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIEphbVNsaWRlQmFzZSB7fVxuZXhwb3J0IGNvbnN0IF9KYW1TbGlkZU1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgSmFtU2xpZGVCYXNlID1cbiAgICBtaXhpbkRpc2FibGVkKEphbVNsaWRlQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2phbS1zbGlkZScsXG4gIHRlbXBsYXRlOiBgPCEtLSBDcmVhdGUgYSB0ZW1wbGF0ZSBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIDxqYW0tc2xpZGU+IHNvIHRoYXQgd2UgY2FuIGdyYWIgYSByZWZlcmVuY2UgdG8gdGhpc1xuICAgIFRlbXBsYXRlUmVmIGFuZCB1c2UgaXQgaW4gYSBQb3J0YWwgdG8gcmVuZGVyIHRoZSBzbGlkZSBjb250ZW50IGluIHRoZSBhcHByb3ByaWF0ZSBwbGFjZSBpbiB0aGVcbiAgICBzbGlkZS1ncm91cC4gLS0+XG48bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+XG5gLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnamFtU2xpZGUnXG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlIGV4dGVuZHMgX0phbVNsaWRlTWl4aW5CYXNlIGltcGxlbWVudHMgT25Jbml0LCBDYW5EaXNhYmxlLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBDb250ZW50IGZvciB0aGUgc2xpZGUgZWxlbWVudCBnaXZlbiBieSBgPG5nLXRlbXBsYXRlIGphbS1zbGlkZS1lbGVtZW50PmAuICovXG4gIEBDb250ZW50Q2hpbGQoSmFtU2xpZGVFbGVtZW50KSBwdWJsaWMgdGVtcGxhdGVMYWJlbDogSmFtU2xpZGVFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUZW1wbGF0ZSBwcm92aWRlZCBpbiB0aGUgc2xpZGUgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICovXG4gIC8qKiBQbGFpbiB0ZXh0IGVsZW1lbnQgZm9yIHRoZSBzbGlkZSwgdXNlZCB3aGVuIHRoZXJlIGlzIG5vIHRlbXBsYXRlIGxhYmVsLiAqL1xuICBASW5wdXQoJ2xhYmVsJykgcHVibGljIHRleHRMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgLyoqIEFyaWEgZWxlbWVudCBmb3IgdGhlIHNsaWRlLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCB0aGF0IHRoZSBzbGlkZSBpcyBsYWJlbGxlZCBieS5cbiAgICogV2lsbCBiZSBjbGVhcmVkIGlmIGBhcmlhLWxhYmVsYCBpcyBzZXQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgcHVibGljIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmc7XG5cbiAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgcHVibGljIGdldCBjb250ZW50KCk6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRQb3J0YWw7XG4gIH1cblxuICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSBzbGlkZSBjaGFuZ2VzLiAqL1xuICBwdWJsaWMgcmVhZG9ubHkgX3N0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSByZWxhdGl2ZWx5IGluZGV4ZWQgcG9zaXRpb24gd2hlcmUgMCByZXByZXNlbnRzIHRoZSBjZW50ZXIsIG5lZ2F0aXZlIGlzIGxlZnQsIGFuZCBwb3NpdGl2ZVxuICAgKiByZXByZXNlbnRzIHRoZSByaWdodC5cbiAgICovXG4gIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIHJlbGF0aXZlbHkgaW5kZXggb3JpZ2luIG9mIHRoZSBzbGlkZSBpZiBpdCB3YXMgY3JlYXRlZCBhbmQgc2VsZWN0ZWQgYWZ0ZXIgdGhlcmVcbiAgICogd2FzIGFscmVhZHkgYSBzZWxlY3RlZCBzbGlkZS4gUHJvdmlkZXMgY29udGV4dCBvZiB3aGF0IHBvc2l0aW9uIHRoZSBzbGlkZSBzaG91bGQgb3JpZ2luYXRlIGZyb20uXG4gICAqL1xuICBwdWJsaWMgb3JpZ2luOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgc2xpZGUgaXMgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIHB1YmxpYyBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIC8qKiBQb3J0YWwgdGhhdCB3aWxsIGJlIHRoZSBob3N0ZWQgY29udGVudCBvZiB0aGUgc2xpZGUgKi9cbiAgcHJvdGVjdGVkIF9jb250ZW50UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwgPSBudWxsO1xuXG4gIC8vIEBDb250ZW50Q2hpbGQoSmFtU2xpZGVDb250ZW50LCB7cmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gIHByb3RlY3RlZCBfZXhwbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBUZW1wbGF0ZSBpbnNpZGUgdGhlIEphbVNsaWRlIHZpZXcgdGhhdCBjb250YWlucyBhbiBgPG5nLWNvbnRlbnQ+YC4gKi9cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgcHJvdGVjdGVkIF9pbXBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndGV4dExhYmVsJykgfHwgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZGlzYWJsZWQnKSkge1xuICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGVudFBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbChcbiAgICAgICAgdGhpcy5fZXhwbGljaXRDb250ZW50IHx8IHRoaXMuX2ltcGxpY2l0Q29udGVudCwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gIH1cbn1cbiJdfQ==