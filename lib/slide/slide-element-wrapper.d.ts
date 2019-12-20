/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef } from '@angular/core';
import { CanDisable, CanDisableCtor } from '@angular/material/core';
/** @docs-private */
export declare class JamSlideElementWrapperBase {
}
export declare const _JamSlideElementWrapperMixinBase: CanDisableCtor & typeof JamSlideElementWrapperBase;
/**
 * Used in the `jam-slide-group` view to display slide labels.
 * @docs-private
 */
export declare class JamSlideElementWrapper extends _JamSlideElementWrapperMixinBase implements CanDisable {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
    /** Sets focus on the wrapper element */
    focus(): void;
    getOffsetLeft(): number;
    getOffsetWidth(): number;
}
