/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
/**
 * Animations used by the Material slides.
 * @docs-private
 */
export const jamSlidesAnimations = {
    /** Animation translates a slide along the X axis. */
    translateTab: trigger('translateTab', [
        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
        state('center, void, left-origin-center, right-origin-center', style({ transform: 'none' })),
        // If the slide is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        state('left', style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
        state('right', style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
        transition('* => left, * => right, left => center, right => center', animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
        transition('void => left-origin-center', [
            style({ transform: 'translate3d(-100%, 0, 0)' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ]),
        transition('void => right-origin-center', [
            style({ transform: 'translate3d(100%, 0, 0)' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ])
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NsaWRlL3NsaWRlLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBRVIsTUFBTSxxQkFBcUIsQ0FBQztBQUU3Qjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FFNUI7SUFDRixxREFBcUQ7SUFDckQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUU7UUFDcEMsMEZBQTBGO1FBQzFGLEtBQUssQ0FBQyx1REFBdUQsRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUUxRix5RkFBeUY7UUFDekYscUZBQXFGO1FBQ3JGLDRGQUE0RjtRQUM1Rix5RUFBeUU7UUFDekUsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDL0UsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUseUJBQXlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFFL0UsVUFBVSxDQUFDLHdEQUF3RCxFQUMvRCxPQUFPLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUNwRSxVQUFVLENBQUMsNEJBQTRCLEVBQUU7WUFDdkMsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLDBCQUEwQixFQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLHNEQUFzRCxDQUFDO1NBQ2hFLENBQUM7UUFDRixVQUFVLENBQUMsNkJBQTZCLEVBQUU7WUFDeEMsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLHlCQUF5QixFQUFDLENBQUM7WUFDN0MsT0FBTyxDQUFDLHNEQUFzRCxDQUFDO1NBQ2hFLENBQUM7S0FDSCxDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogQW5pbWF0aW9ucyB1c2VkIGJ5IHRoZSBNYXRlcmlhbCBzbGlkZXMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBqYW1TbGlkZXNBbmltYXRpb25zOiB7XG4gIHJlYWRvbmx5IHRyYW5zbGF0ZVRhYjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgLyoqIEFuaW1hdGlvbiB0cmFuc2xhdGVzIGEgc2xpZGUgYWxvbmcgdGhlIFggYXhpcy4gKi9cbiAgdHJhbnNsYXRlVGFiOiB0cmlnZ2VyKCd0cmFuc2xhdGVUYWInLCBbXG4gICAgLy8gTm90ZTogdHJhbnNpdGlvbnMgdG8gYG5vbmVgIGluc3RlYWQgb2YgMCwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIG1pZ2h0IGJsdXIgdGhlIGNvbnRlbnQuXG4gICAgc3RhdGUoJ2NlbnRlciwgdm9pZCwgbGVmdC1vcmlnaW4tY2VudGVyLCByaWdodC1vcmlnaW4tY2VudGVyJywgc3R5bGUoe3RyYW5zZm9ybTogJ25vbmUnfSkpLFxuXG4gICAgLy8gSWYgdGhlIHNsaWRlIGlzIGVpdGhlciBvbiB0aGUgbGVmdCBvciByaWdodCwgd2UgYWRkaXRpb25hbGx5IGFkZCBhIGBtaW4taGVpZ2h0YCBvZiAxcHhcbiAgICAvLyBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBoYXMgYSBoZWlnaHQgYmVmb3JlIGl0cyBzdGF0ZSBjaGFuZ2VzLiBUaGlzIGlzXG4gICAgLy8gbmVjZXNzYXJ5IGJlY2F1c2UgQ2hyb21lIGRvZXMgc2VlbSB0byBza2lwIHRoZSB0cmFuc2l0aW9uIGluIFJUTCBtb2RlIGlmIHRoZSBlbGVtZW50IGRvZXNcbiAgICAvLyBub3QgaGF2ZSBhIHN0YXRpYyBoZWlnaHQgYW5kIGlzIG5vdCByZW5kZXJlZC4gU2VlIHJlbGF0ZWQgaXNzdWU6ICM5NDY1XG4gICAgc3RhdGUoJ2xlZnQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJywgbWluSGVpZ2h0OiAnMXB4J30pKSxcbiAgICBzdGF0ZSgncmlnaHQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknLCBtaW5IZWlnaHQ6ICcxcHgnfSkpLFxuXG4gICAgdHJhbnNpdGlvbignKiA9PiBsZWZ0LCAqID0+IHJpZ2h0LCBsZWZ0ID0+IGNlbnRlciwgcmlnaHQgPT4gY2VudGVyJyxcbiAgICAgICAgYW5pbWF0ZSgne3thbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScpKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGxlZnQtb3JpZ2luLWNlbnRlcicsIFtcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCknfSksXG4gICAgICBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJylcbiAgICBdKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHJpZ2h0LW9yaWdpbi1jZW50ZXInLCBbXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknfSksXG4gICAgICBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJylcbiAgICBdKVxuICBdKVxufTtcbiJdfQ==