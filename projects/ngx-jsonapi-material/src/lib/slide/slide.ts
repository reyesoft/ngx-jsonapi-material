/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { CanDisable, CanDisableCtor, mixinDisabled } from '@angular/material/core';
import { Subject } from 'rxjs';
// import {JamSlideContent} from './slide-content';
import { JamSlideElement } from './slide-element';

// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator component-selector no-input-rename

// Boilerplate for applying mixins to JamSlide.
/** @docs-private */
export class JamSlideBase {}
export const _JamSlideMixinBase: CanDisableCtor & typeof JamSlideBase =
    mixinDisabled(JamSlideBase);

@Component({
  selector: 'jam-slide',
  templateUrl: 'slide.html',
  inputs: ['disabled'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'jamSlide'
})
export class JamSlide extends _JamSlideMixinBase implements OnInit, CanDisable, OnChanges, OnDestroy {
  /** Content for the slide element given by `<ng-template jam-slide-element>`. */
  @ContentChild(JamSlideElement) public templateLabel: JamSlideElement;

  /**
   * Template provided in the slide content that will be used if present, used to enable lazy-loading
   */
  /** Plain text element for the slide, used when there is no template label. */
  @Input('label') public textLabel: string = '';

  /** Aria element for the slide. */
  @Input('aria-label') public ariaLabel: string;

  /**
   * Reference to the element that the slide is labelled by.
   * Will be cleared if `aria-label` is set at the same time.
   */
  @Input('aria-labelledby') public ariaLabelledby: string;

  /** @docs-private */
  public get content(): TemplatePortal | null {
    return this._contentPortal;
  }

  /** Emits whenever the internal state of the slide changes. */
  public readonly _stateChanges = new Subject<void>();

  /**
   * The relatively indexed position where 0 represents the center, negative is left, and positive
   * represents the right.
   */
  public position: number | null = null;

  /**
   * The initial relatively index origin of the slide if it was created and selected after there
   * was already a selected slide. Provides context of what position the slide should originate from.
   */
  public origin: number | null = null;

  /**
   * Whether the slide is currently active.
   */
  public isActive = false;

  /** Portal that will be the hosted content of the slide */
  protected _contentPortal: TemplatePortal | null = null;

  // @ContentChild(JamSlideContent, {read: TemplateRef, static: true})
  protected _explicitContent: TemplateRef<any>;

  /** Template inside the JamSlide view that contains an `<ng-content>`. */
  @ViewChild(TemplateRef) protected _implicitContent: TemplateRef<any>;

  public constructor(private _viewContainerRef: ViewContainerRef) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
      this._stateChanges.next();
    }
  }

  public ngOnDestroy(): void {
    this._stateChanges.complete();
  }

  public ngOnInit(): void {
    this._contentPortal = new TemplatePortal(
        this._explicitContent || this._implicitContent, this._viewContainerRef);
  }
}
