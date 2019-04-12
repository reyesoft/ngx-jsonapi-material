/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  InjectionToken,
  Inject,
  Optional
} from '@angular/core';
import {
  CanColor,
  CanColorCtor,
  CanDisableRipple,
  CanDisableRippleCtor,
  mixinColor,
  mixinDisableRipple,
  ThemePalette
} from '@angular/material/core';
import { merge, Subscription } from 'rxjs';
import { JamSlide } from './slide';
import { JamSlideHeader } from './slide-header';

// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator component-selector

/** Used to generate unique ID's for each slide component */
let nextId = 0;

/** A simple change event emitted on focus or selection changes. */
export class JamSlideChangeEvent {
  /** Index of the currently-selected slide. */
  public index: number;
  /** Reference to the currently-selected slide. */
  public slide: JamSlide;
}

/** Possible positions for the slide header. */
export type JamSlideHeaderPosition = 'above' | 'below';

/** Object that can be used to configure the default options for the slides module. */
export interface JamSlidesConfig {
  /** Duration for the slide animation. Must be a valid CSS value (e.g. 600ms). */
  animationDuration?: string;
}

/** Injection token that can be used to provide the default options the slides module. */
export const MAT_TABS_CONFIG: InjectionToken<any> = new InjectionToken('MAT_TABS_CONFIG');

// Boilerplate for applying mixins to JamSlideGroup.
/** @docs-private */
export class JamSlideGroupBase {
  public constructor(public _elementRef: ElementRef) {}
}
export const _JamSlideGroupMixinBase: CanColorCtor & CanDisableRippleCtor & typeof JamSlideGroupBase =
    mixinColor(mixinDisableRipple(JamSlideGroupBase), 'primary');

/**
 * Material design slide-group component.  Supports basic slide pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/slides.html
 */
@Component({
  selector: 'jam-slide-group',
  exportAs: 'jamSlideGroup',
  templateUrl: 'slide-group.html',
  styleUrls: ['slide-group.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color', 'disableRipple'],
  host: {
    'class': 'jam-slide-group',
    '[class.jam-slide-group-dynamic-height]': 'dynamicHeight',
    '[class.jam-slide-group-inverted-header]': 'headerPosition === "below"'
  }
})
export class JamSlideGroup extends _JamSlideGroupMixinBase implements AfterContentInit,
    AfterContentChecked, OnDestroy, CanColor, CanDisableRipple {

  @ContentChildren(JamSlide) public _slides: QueryList<JamSlide>;

  @ViewChild('slideBodyWrapper') public _slideBodyWrapper: ElementRef;

  @ViewChild('slideHeader') public _slideHeader: JamSlideHeader;

  /** Output to enable support for two-way binding on `[(selectedIndex)]` */
  @Output() public readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

  /** Event emitted when focus has changed within a slide group. */
  @Output() public readonly focusChange: EventEmitter<JamSlideChangeEvent> =
      new EventEmitter<JamSlideChangeEvent>();

  /** Event emitted when the body animation has completed */
  @Output() public readonly animationDone: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the slide selection has changed. */
  @Output() public readonly selectedTabChange: EventEmitter<JamSlideChangeEvent> =
      new EventEmitter<JamSlideChangeEvent>(true);

  /** Position of the slide header. */
  @Input() public headerPosition: JamSlideHeaderPosition = 'above';

  /** The slide index that should be selected after the content has been checked. */
  private _indexToSelect: number | null = 0;

  /** Snapshot of the height of the slide body wrapper before another slide is activated. */
  private _slideBodyWrapperHeight: number = 0;

  /** Subscription to slides being added/removed. */
  private _slidesSubscription = Subscription.EMPTY;

  /** Subscription to changes in the slide labels. */
  private _slideElementSubscription = Subscription.EMPTY;

  /** Whether the slide group should grow to the size of the active slide. */
  @Input()
  public get dynamicHeight(): boolean { return this._dynamicHeight; }
  public set dynamicHeight(value: boolean) { this._dynamicHeight = coerceBooleanProperty(value); }
  private _dynamicHeight: boolean = false;

  /** The index of the active slide. */
  @Input()
  public get selectedIndex(): number | null { return this._selectedIndex; }
  public set selectedIndex(value: number | null) {
    this._indexToSelect = coerceNumberProperty(value, null);
  }
  private _selectedIndex: number | null = null;

  /** Duration for the slide animation. Will be normalized to milliseconds if no units are set. */
  @Input()
  public get animationDuration(): string { return this._animationDuration; }
  public set animationDuration(value: string) {
    this._animationDuration = /^\d+$/.test(value) ? value + 'ms' : value;
  }
  private _animationDuration: string;

  /** Background color of the slide group. */
  @Input()
  public get backgroundColor(): ThemePalette { return this._backgroundColor; }
  public set backgroundColor(value: ThemePalette) {
    const nativeElement: HTMLElement = this._elementRef.nativeElement;

    nativeElement.classList.remove(`mat-background-${this.backgroundColor}`);

    if (value) {
      nativeElement.classList.add(`mat-background-${value}`);
    }

    this._backgroundColor = value;
  }
  private _backgroundColor: ThemePalette;

  private _groupId: number;

  public constructor(
      elementRef: ElementRef,
      private _changeDetectorRef: ChangeDetectorRef,
      @Inject(MAT_TABS_CONFIG) @Optional() defaultConfig?: JamSlidesConfig
    ) {
    super(elementRef);
    this._groupId = nextId++;
    this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
        defaultConfig.animationDuration : '500ms';
  }

  /**
   * After the content is checked, this component knows what slides have been defined
   * and what the selected index should be. This is where we can know exactly what position
   * each slide should be in according to the new selected index, and additionally we know how
   * a new selected slide should transition in (from the left or right).
   */
  public ngAfterContentChecked() {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of slides changes before the actual change detection runs.
    const indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect) {
      const isFirstRun = this._selectedIndex == null;

      if (!isFirstRun) {
        this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
      }

      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this._slides.forEach((slide, index) => slide.isActive = index === indexToSelect);

        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
        }
      });
    }

    // Setup the position for each slide and optionally setup an origin on the next selected slide.
    this._slides.forEach((slide: JamSlide, index: number) => {
      slide.position = index - indexToSelect;

      // If there is already a selected slide, then set up an origin for the next selected slide
      // if it doesn't have one already.
      if (this._selectedIndex != null && slide.position === 0 && !slide.origin) {
        slide.origin = indexToSelect - this._selectedIndex;
      }
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this._changeDetectorRef.markForCheck();
    }
  }

  public ngAfterContentInit() {
    this._subscribeToTabLabels();

    // Subscribe to changes in the amount of slides, in order to be
    // able to re-render the content as new slides are added or removed.
    this._slidesSubscription = this._slides.changes.subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);

      // Maintain the previously-selected slide if a new slide is added or removed and there is no
      // explicit change that selects a different slide.
      if (indexToSelect === this._selectedIndex) {
        const slides = this._slides.toArray();

        for (let i = 0; i < slides.length; i++) {
          if (slides[i].isActive) {
            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a slide within the `selectedIndexChange` event.
            this._indexToSelect = this._selectedIndex = i;
            break;
          }
        }
      }

      this._subscribeToTabLabels();
      this._changeDetectorRef.markForCheck();
    });
  }

  public ngOnDestroy() {
    this._slidesSubscription.unsubscribe();
    this._slideElementSubscription.unsubscribe();
  }

  /** Re-aligns the ink bar to the selected slide element. */
  // realignInkBar() {
  //   if (this._slideHeader) {
  //     this._slideHeader._alignInkBarToSelectedTab();
  //   }
  // }

  public _focusChanged(index: number) {
    this.focusChange.emit(this._createChangeEvent(index));
  }

  /** Returns a unique id for each slide element element */
  public _getTabLabelId(i: number): string {
    return `jam-slide-element-${this._groupId}-${i}`;
  }

  /** Returns a unique id for each slide content element */
  public _getTabContentId(i: number): string {
    return `jam-slide-content-${this._groupId}-${i}`;
  }

  /**
   * Sets the height of the body wrapper to the height of the activating slide if dynamic
   * height property is true.
   */
  public _setTabBodyWrapperHeight(slideHeight: number): void {
    if (!this._dynamicHeight || !this._slideBodyWrapperHeight) { return; }

    const wrapper: HTMLElement = this._slideBodyWrapper.nativeElement;

    wrapper.style.height = this._slideBodyWrapperHeight + 'px';

    // This conditional forces the browser to paint the height so that
    // the animation to the new height can have an origin.
    if (this._slideBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = slideHeight + 'px';
    }
  }

  /** Removes the height of the slide body wrapper. */
  public _removeTabBodyWrapperHeight(): void {
    const wrapper = this._slideBodyWrapper.nativeElement;
    this._slideBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = '';
    this.animationDone.emit();
  }

  /** Handle click events, setting new selected index if appropriate. */
  public _handleClick(slide: JamSlide, slideHeader: JamSlideHeader, index: number) {
    if (!slide.disabled) {
      this.selectedIndex = slideHeader.focusIndex = index;
    }
  }

  /** Retrieves the slideindex for the slide. */
  public _getTabIndex(slide: JamSlide, idx: number): number | null {
    if (slide.disabled) {
      return null;
    }

    return this.selectedIndex === idx ? 0 : -1;
  }

  private _createChangeEvent(index: number): JamSlideChangeEvent {
    const event = new JamSlideChangeEvent();
    event.index = index;
    if (this._slides && this._slides.length) {
      event.slide = this._slides.toArray()[index];
    }

    return event;
  }

  /**
   * Subscribes to changes in the slide labels. This is needed, because the @Input for the element is
   * on the JamSlide component, whereas the data binding is inside the JamSlideGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  private _subscribeToTabLabels() {
    if (this._slideElementSubscription) {
      this._slideElementSubscription.unsubscribe();
    }

    this._slideElementSubscription = merge(...this._slides.map(slide => slide._stateChanges))
      .subscribe(() => this._changeDetectorRef.markForCheck());
  }

  /** Clamps the given index to the bounds of 0 and the slides length. */
  private _clampTabIndex(index: number | null): number {
    // Note the `|| 0`, which ensures that values like NaN can't get through
    // and which would otherwise throw the component into an infinite loop
    // (since Math.max(NaN, 0) === NaN).
    return Math.min(this._slides.length - 1, Math.max(index || 0, 0));
  }

}
