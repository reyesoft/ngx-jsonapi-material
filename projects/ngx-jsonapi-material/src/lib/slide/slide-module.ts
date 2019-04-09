/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { JamSlide } from './slide';
import { JamSlideGroup } from './slide-group';
import { JamSlideHeader } from './slide-header';
import { JamSlideElement } from './slide-element';
import { JamSlideElementWrapper } from './slide-element-wrapper';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [
    CommonModule,
    MatCommonModule,
    PortalModule,
    MatRippleModule,
    ObserversModule,
    A11yModule
  ],
  // Don't export all components because some are only to be used internally.
  exports: [
    MatCommonModule,
    JamSlideGroup,
    JamSlideElement,
    JamSlide
  ],
  declarations: [
    JamSlideGroup,
    JamSlideElement,
    JamSlide,
    JamSlideElementWrapper,
    JamSlideHeader
  ]
})
export class JamSlideModule {}
