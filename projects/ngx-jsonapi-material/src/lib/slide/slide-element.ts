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
@Directive({
  selector: '[jam-slide-element], [jamSlideElement]'
})
export class JamSlideElement extends CdkPortal {}
