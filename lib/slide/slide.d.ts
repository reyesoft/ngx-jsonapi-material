/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TemplatePortal } from '@angular/cdk/portal';
import { OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { CanDisable, CanDisableCtor } from '@angular/material/core';
import { Subject } from 'rxjs';
import { JamSlideElement } from './slide-element';
/** @docs-private */
export declare class JamSlideBase {
}
export declare const _JamSlideMixinBase: CanDisableCtor & typeof JamSlideBase;
export declare class JamSlide extends _JamSlideMixinBase implements OnInit, CanDisable, OnChanges, OnDestroy {
    private _viewContainerRef;
    /** Content for the slide element given by `<ng-template jam-slide-element>`. */
    templateLabel: JamSlideElement;
    /**
     * Template provided in the slide content that will be used if present, used to enable lazy-loading
     */
    /** Plain text element for the slide, used when there is no template label. */
    textLabel: string;
    /** Aria element for the slide. */
    ariaLabel: string;
    /**
     * Reference to the element that the slide is labelled by.
     * Will be cleared if `aria-label` is set at the same time.
     */
    ariaLabelledby: string;
    /** @docs-private */
    readonly content: TemplatePortal | null;
    /** Emits whenever the internal state of the slide changes. */
    readonly _stateChanges: Subject<void>;
    /**
     * The relatively indexed position where 0 represents the center, negative is left, and positive
     * represents the right.
     */
    position: number | null;
    /**
     * The initial relatively index origin of the slide if it was created and selected after there
     * was already a selected slide. Provides context of what position the slide should originate from.
     */
    origin: number | null;
    /**
     * Whether the slide is currently active.
     */
    isActive: boolean;
    /** Portal that will be the hosted content of the slide */
    protected _contentPortal: TemplatePortal | null;
    protected _explicitContent: TemplateRef<any>;
    /** Template inside the JamSlide view that contains an `<ng-content>`. */
    protected _implicitContent: TemplateRef<any>;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
}
