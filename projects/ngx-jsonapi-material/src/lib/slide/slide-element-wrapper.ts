/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directive, ElementRef } from '@angular/core';
import { CanDisable, CanDisableCtor, mixinDisabled } from '@angular/material/core';

// Boilerplate for applying mixins to JamSlideElementWrapper.
/** @docs-private */
export class JamSlideElementWrapperBase {}
export const _JamSlideElementWrapperMixinBase: CanDisableCtor & typeof JamSlideElementWrapperBase =
    mixinDisabled(JamSlideElementWrapperBase);

// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator directive-selector

/**
 * Used in the `jam-slide-group` view to display slide labels.
 * @docs-private
 */
@Directive({
  selector: '[jamSlideElementWrapper]',
  inputs: ['disabled'],
  host: {
    '[class.jam-slide-disabled]': 'disabled',
    '[attr.aria-disabled]': '!!disabled'
  }
})
export class JamSlideElementWrapper extends _JamSlideElementWrapperMixinBase implements CanDisable {
  public constructor(public elementRef: ElementRef) {
    super();
  }

  /** Sets focus on the wrapper element */
  public focus(): void {
    this.elementRef.nativeElement.focus();
  }

  public getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  public getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }
}
