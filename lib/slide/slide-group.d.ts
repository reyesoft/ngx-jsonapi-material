/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList, InjectionToken } from '@angular/core';
import { CanColor, CanColorCtor, CanDisableRipple, CanDisableRippleCtor, ThemePalette } from '@angular/material/core';
import { JamSlide } from './slide';
import { JamSlideHeader } from './slide-header';
/** A simple change event emitted on focus or selection changes. */
export declare class JamSlideChangeEvent {
    /** Index of the currently-selected slide. */
    index: number;
    /** Reference to the currently-selected slide. */
    slide: JamSlide;
}
/** Possible positions for the slide header. */
export declare type JamSlideHeaderPosition = 'above' | 'below';
/** Object that can be used to configure the default options for the slides module. */
export interface JamSlidesConfig {
    /** Duration for the slide animation. Must be a valid CSS value (e.g. 600ms). */
    animationDuration?: string;
}
/** Injection token that can be used to provide the default options the slides module. */
export declare const MAT_TABS_CONFIG: InjectionToken<any>;
/** @docs-private */
export declare class JamSlideGroupBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _JamSlideGroupMixinBase: CanColorCtor & CanDisableRippleCtor & typeof JamSlideGroupBase;
/**
 * Material design slide-group component.  Supports basic slide pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/slides.html
 */
export declare class JamSlideGroup extends _JamSlideGroupMixinBase implements AfterContentInit, AfterContentChecked, OnDestroy, CanColor, CanDisableRipple {
    private _changeDetectorRef;
    _slides: QueryList<JamSlide>;
    _slideBodyWrapper: ElementRef;
    _slideHeader: JamSlideHeader;
    /** Output to enable support for two-way binding on `[(selectedIndex)]` */
    readonly selectedIndexChange: EventEmitter<number>;
    /** Event emitted when focus has changed within a slide group. */
    readonly focusChange: EventEmitter<JamSlideChangeEvent>;
    /** Event emitted when the body animation has completed */
    readonly animationDone: EventEmitter<void>;
    /** Event emitted when the slide selection has changed. */
    readonly selectedTabChange: EventEmitter<JamSlideChangeEvent>;
    /** Position of the slide header. */
    headerPosition: JamSlideHeaderPosition;
    /** The slide index that should be selected after the content has been checked. */
    private _indexToSelect;
    /** Snapshot of the height of the slide body wrapper before another slide is activated. */
    private _slideBodyWrapperHeight;
    /** Subscription to slides being added/removed. */
    private _slidesSubscription;
    /** Subscription to changes in the slide labels. */
    private _slideElementSubscription;
    /** Whether the slide group should grow to the size of the active slide. */
    dynamicHeight: boolean;
    private _dynamicHeight;
    /** The index of the active slide. */
    selectedIndex: number | null;
    private _selectedIndex;
    /** Duration for the slide animation. Will be normalized to milliseconds if no units are set. */
    animationDuration: string;
    private _animationDuration;
    /** Background color of the slide group. */
    backgroundColor: ThemePalette;
    private _backgroundColor;
    private _groupId;
    constructor(elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef, defaultConfig?: JamSlidesConfig);
    /**
     * After the content is checked, this component knows what slides have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each slide should be in according to the new selected index, and additionally we know how
     * a new selected slide should transition in (from the left or right).
     */
    ngAfterContentChecked(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Re-aligns the ink bar to the selected slide element. */
    _focusChanged(index: number): void;
    /** Returns a unique id for each slide element element */
    _getTabLabelId(i: number): string;
    /** Returns a unique id for each slide content element */
    _getTabContentId(i: number): string;
    /**
     * Sets the height of the body wrapper to the height of the activating slide if dynamic
     * height property is true.
     */
    _setTabBodyWrapperHeight(slideHeight: number): void;
    /** Removes the height of the slide body wrapper. */
    _removeTabBodyWrapperHeight(): void;
    /** Handle click events, setting new selected index if appropriate. */
    _handleClick(slide: JamSlide, slideHeader: JamSlideHeader, index: number): void;
    /** Retrieves the slideindex for the slide. */
    _getTabIndex(slide: JamSlide, idx: number): number | null;
    private _createChangeEvent;
    /**
     * Subscribes to changes in the slide labels. This is needed, because the @Input for the element is
     * on the JamSlide component, whereas the data binding is inside the JamSlideGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     */
    private _subscribeToTabLabels;
    /** Clamps the given index to the bounds of 0 and the slides length. */
    private _clampTabIndex;
}
