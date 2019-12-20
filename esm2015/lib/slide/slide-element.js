/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator directive-selector
/** Used to flag slide labels for use with the portal directive */
export class JamSlideElement extends CdkPortal {
}
JamSlideElement.decorators = [
    { type: Directive, args: [{
                selector: '[jam-slide-element], [jamSlideElement]'
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NsaWRlL3NsaWRlLWVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsNkdBQTZHO0FBRTdHLGtFQUFrRTtBQUlsRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxTQUFTOzs7WUFIN0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3Q0FBd0M7YUFDbkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuLy8gdHNsaW50OmRpc2FibGU6IGludGVyZmFjZS1uYW1lIHVzZS1pbnB1dC1wcm9wZXJ0eS1kZWNvcmF0b3IgdXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yIGRpcmVjdGl2ZS1zZWxlY3RvclxuXG4vKiogVXNlZCB0byBmbGFnIHNsaWRlIGxhYmVscyBmb3IgdXNlIHdpdGggdGhlIHBvcnRhbCBkaXJlY3RpdmUgKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tqYW0tc2xpZGUtZWxlbWVudF0sIFtqYW1TbGlkZUVsZW1lbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBKYW1TbGlkZUVsZW1lbnQgZXh0ZW5kcyBDZGtQb3J0YWwge31cbiJdfQ==