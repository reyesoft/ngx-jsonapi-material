/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { END, ENTER, HOME, SPACE } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/scrolling';
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
  NgZone,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';
import { CanDisableRipple, CanDisableRippleCtor, mixinDisableRipple } from '@angular/material/core';
import { merge, of as observableOf, Subject, timer, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { MatInkBar } from './ink-bar';
import { JamSlideElementWrapper } from './slide-element-wrapper';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';

// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator component-selector

type ModifierKey = 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey';

/**
 * Checks whether a modifier key is pressed.
 * @param event Event to be checked.
 */
export function hasModifierKey(event: KeyboardEvent, ...modifiers: Array<ModifierKey>): boolean {
    if (modifiers.length) {
       return modifiers.some(modifier => event[modifier]);
    }

    return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}

/** Config used to bind passive event listeners */
const passiveEventListenerOptions =
    normalizePassiveListenerOptions({passive: true}) as EventListenerOptions;

/**
 * The directions that scrolling can go in when the header's slides exceed the header width. 'After'
 * will scroll the header towards the end of the slides list and 'before' will scroll towards the
 * beginning of the list.
 */
export type ScrollDirection = 'after' | 'before';

/**
 * The distance in pixels that will be overshot when scrolling a slide element into view. This helps
 * provide a small affordance to the element next to it.
 */
const EXAGGERATED_OVERSCROLL = 60;

/**
 * Amount of milliseconds to wait before starting to scroll the header automatically.
 * Set a little conservatively in order to handle fake events dispatched on touch devices.
 */
const HEADER_SCROLL_DELAY = 650;

/**
 * Interval in milliseconds at which to scroll the header
 * while the user is holding their pointer.
 */
const HEADER_SCROLL_INTERVAL = 100;

// Boilerplate for applying mixins to JamSlideHeader.
/** @docs-private */
export class JamSlideHeaderBase {}
export const _JamSlideHeaderMixinBase: CanDisableRippleCtor & typeof JamSlideHeaderBase =
    mixinDisableRipple(JamSlideHeaderBase);

/**
 * The header of the slide group which displays a list of all the slides in the slide group. Includes
 * an ink bar that follows the currently selected slide. When the slides list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
@Component({
  selector: 'jam-slide-header',
  templateUrl: 'slide-header.html',
  styleUrls: ['slide-header.scss'],
  inputs: ['disableRipple'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'jam-slide-header',
    '[class.jam-slide-header-pagination-controls-enabled]': '_showPaginationControls',
    '[class.jam-slide-header-rtl]': `_getLayoutDirection() == 'rtl'`
  }
})
export class JamSlideHeader extends _JamSlideHeaderMixinBase
    implements AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy, CanDisableRipple {

  @ContentChildren(JamSlideElementWrapper) public _elementWrappers: QueryList<JamSlideElementWrapper>;
  // @ViewChild(MatInkBar) _inkBar: MatInkBar;
  @ViewChild('slideListContainer') public _slideListContainer: ElementRef;
  @ViewChild('slideList') public _slideList: ElementRef;
  @ViewChild('nextPaginator') public _nextPaginator: ElementRef<HTMLElement>;
  @ViewChild('previousPaginator') public _previousPaginator: ElementRef<HTMLElement>;

  /** Event emitted when the option is selected. */
  @Output() public readonly selectFocusedIndex: EventEmitter<number> = new EventEmitter<number>();

  /** Event emitted when a element is focused. */
  @Output() public readonly indexFocused: EventEmitter<number> = new EventEmitter<number>();

  /** Whether the controls for pagination should be displayed */
  public _showPaginationControls = false;

  /** Whether the slide list can be scrolled more towards the end of the slide element list. */
  public _disableScrollAfter = true;

  /** Whether the slide list can be scrolled more towards the beginning of the slide element list. */
  public _disableScrollBefore = true;

  /** The distance in pixels that the slide labels should be translated to the left. */
  private _scrollDistance = 0;

  /** Whether the header should scroll to the selected index after the view has been checked. */
  private _selectedIndexChanged = false;

  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  /**
   * The number of slide labels that are displayed on the header. When this changes, the header
   * should re-evaluate the scroll position.
   */
  private _slideElementCount: number;

  /** Whether the scroll distance has changed and should be applied after the view is checked. */
  private _scrollDistanceChanged: boolean;

  /** Used to manage focus between the slides. */
  private _keyManager: FocusKeyManager<JamSlideElementWrapper>;

  /** Cached text content of the header. */
  private _currentTextContent: string;

  /** Stream that will stop the automated scrolling. */
  private _stopScrolling = new Subject<void>();

  /** The index of the active slide. */
  @Input()
  public get selectedIndex(): number { return this._selectedIndex; }
  public set selectedIndex(value: number) {
    value = coerceNumberProperty(value);
    this._selectedIndexChanged = this._selectedIndex !== value;
    this._selectedIndex = value;

    if (this._keyManager) {
      this._keyManager.updateActiveItem(value);
    }
  }
  private _selectedIndex: number = 0;

  public constructor(
      private _elementRef: ElementRef,
      private _changeDetectorRef: ChangeDetectorRef,
      private _viewportRuler: ViewportRuler,
      @Optional() private _dir: Directionality,
      // @breaking-change 8.0.0 `_ngZone` and `_platforms` parameters to be made required.
      private _ngZone?: NgZone,
      private _platform?: Platform
  ) {
    super();

    const element = _elementRef.nativeElement;
    const bindEvent = (): void => {
      fromEvent(element, 'mouseleave')
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => {
          this._stopInterval();
        });
    };

    // @breaking-change 8.0.0 remove null check once _ngZone is made into a required parameter.
    if (_ngZone) {
      // Bind the `mouseleave` event on the outside since it doesn't change anything in the view.
      _ngZone.runOutsideAngular(bindEvent);
    } else {
      bindEvent();
    }
  }

  public ngAfterContentChecked(): void {
    // If the number of slide labels have changed, check if scrolling should be enabled
    if (this._slideElementCount !== this._elementWrappers.length) {
      this.updatePagination();
      this._slideElementCount = this._elementWrappers.length;
      this._changeDetectorRef.markForCheck();
    }

    // If the selected index has changed, scroll to the element and check if the scrolling controls
    // should be disabled.
    if (this._selectedIndexChanged) {
      this._scrollToLabel(this._selectedIndex);
      this._checkScrollingControls();
      // this._alignInkBarToSelectedTab();
      this._selectedIndexChanged = false;
      this._changeDetectorRef.markForCheck();
    }

    // If the scroll distance has been changed (slide selected, focused, scroll controls activated),
    // then translate the header to reflect this.
    if (this._scrollDistanceChanged) {
      this._updateTabScrollPosition();
      this._scrollDistanceChanged = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Handles keyboard events on the header. */
  public _handleKeydown(event: KeyboardEvent) {
    console.log('inside handleKeyDown', event);
    console.log('inside handleKeyDown', event, hasModifierKey(event));
    // We don't handle any key bindings with a modifier key.
    if (hasModifierKey(event)) {
      return;
    }

    switch (event.keyCode) {
      case HOME:
        this._keyManager.setFirstItemActive();
        event.preventDefault();
        break;
      case END:
        this._keyManager.setLastItemActive();
        event.preventDefault();
        break;
      case ENTER:
      case SPACE:
        this.selectFocusedIndex.emit(this.focusIndex);
        event.preventDefault();
        break;
      default:
        this._keyManager.onKeydown(event);
        break;
    }
  }

  /**
   * Aligns the ink bar to the selected slide on load.
   */
  public ngAfterContentInit() {
    const dirChange = this._dir ? this._dir.change : observableOf(null);
    const resize = this._viewportRuler.change(150);
    const realign = (): void => {
      this.updatePagination();
      // this._alignInkBarToSelectedTab();
    };

    this._keyManager = new FocusKeyManager(this._elementWrappers)
      .withHorizontalOrientation(this._getLayoutDirection())
      .withWrap();

    this._keyManager.updateActiveItem(0);

    // Defer the first call in order to allow for slower browsers to lay out the elements.
    // This helps in cases where the user lands directly on a page with paginated slides.
    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(realign);
    } else {
        realign();
    }

    // On dir change or window resize, realign the ink bar and update the orientation of
    // the key manager if the direction has changed.
    merge(dirChange, resize).pipe(takeUntil(this._destroyed)).subscribe(() => {
      realign();
      this._keyManager.withHorizontalOrientation(this._getLayoutDirection());
    });

    // If there is a change in the focus key manager we need to emit the `indexFocused`
    // event in order to provide a public event that notifies about focus changes. Also we realign
    // the slides container by scrolling the new focused slide into the visible section.
    this._keyManager.change.pipe(takeUntil(this._destroyed)).subscribe(newFocusIndex => {
      this.indexFocused.emit(newFocusIndex);
      this._setTabFocus(newFocusIndex);
    });
  }

  public ngAfterViewInit() {
    // We need to handle these events manually, because we want to bind passive event listeners.
    fromEvent(this._previousPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._handlePaginatorPress('before');
      });

    fromEvent(this._nextPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._handlePaginatorPress('after');
      });
  }

  public ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._stopScrolling.complete();
  }

  /**
   * Callback for when the MutationObserver detects that the content has changed.
   */
  public _onContentChanges() {
    const textContent = this._elementRef.nativeElement.textContent;

    // We need to diff the text content of the header, because the MutationObserver callback
    // will fire even if the text content didn't change which is inefficient and is prone
    // to infinite loops if a poorly constructed expression is passed in (see #14249).
    if (textContent !== this._currentTextContent) {
      this._currentTextContent = textContent;

      const zoneCallback = (): void => {
        this.updatePagination();
        // this._alignInkBarToSelectedTab();
        this._changeDetectorRef.markForCheck();
      };

      // The content observer runs outside the `NgZone` by default, which
      // means that we need to bring the callback back in ourselves.
      // @breaking-change 8.0.0 Remove null check for `_ngZone` once it's a required parameter.
      if (this._ngZone) {
          this._ngZone.run(zoneCallback);
      } else {
          zoneCallback();
      }
    }
  }

  /**
   * Updates the view whether pagination should be enabled or not.
   *
   * WARNING: Calling this method can be very costly in terms of performance.  It should be called
   * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
   * page.
   */
  public updatePagination() {
    this._checkPaginationEnabled();
    this._checkScrollingControls();
    this._updateTabScrollPosition();
  }

  // tslint:disable: no-non-null-assertion
  /** Tracks which element has focus; used for keyboard navigation */
  public get focusIndex(): number {
    return this._keyManager ? this._keyManager.activeItemIndex! : 0;
  }

  /** When the focus index is set, we must manually send focus to the correct element */
  public set focusIndex(value: number) {
    if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
      return;
    }

    this._keyManager.setActiveItem(value);
  }

  /**
   * Determines if an index is valid.  If the slides are not ready yet, we assume that the user is
   * providing a valid index and return true.
   */
  public _isValidIndex(index: number): boolean {
    if (!this._elementWrappers) { return true; }

    const slide = this._elementWrappers ? this._elementWrappers.toArray()[index] : null;

    return !!slide && !slide.disabled;
  }

  /**
   * Sets focus on the HTML element for the element wrapper and scrolls it into the view if
   * scrolling is enabled.
   */
  public _setTabFocus(slideIndex: number) {
    if (this._showPaginationControls) {
      this._scrollToLabel(slideIndex);
    }

    if (this._elementWrappers && this._elementWrappers.length) {
      this._elementWrappers.toArray()[slideIndex].focus();

      // Do not let the browser manage scrolling to focus the element, this will be handled
      // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
      // should be the full width minus the offset width.
      const containerEl = this._slideListContainer.nativeElement;
      const dir = this._getLayoutDirection();

      if (dir === 'ltr') {
        containerEl.scrollLeft = 0;
      } else {
        containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
      }
    }
  }

  /** The layout direction of the containing app. */
  public _getLayoutDirection(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Performs the CSS transformation on the slide list that will cause the list to scroll. */
  public _updateTabScrollPosition() {
    const scrollDistance = this.scrollDistance;
    const platform = this._platform;
    const translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;

    // Don't use `translate3d` here because we don't want to create a new layer. A new layer
    // seems to cause flickering and overflow in Internet Explorer. For example, the ink bar
    // and ripples will exceed the boundaries of the visible slide bar.
    // See: https://github.com/angular/material2/issues/10276
    // We round the `transform` here, because transforms with sub-pixel precision cause some
    // browsers to blur the content of the element.
    this._slideList.nativeElement.style.transform = `translateX(${Math.round(translateX)}px)`;

    // Setting the `transform` on IE will change the scroll offset of the parent, causing the
    // position to be thrown off in some cases. We have to reset it ourselves to ensure that
    // it doesn't get thrown off. Note that we scope it only to IE and Edge, because messing
    // with the scroll position throws off Chrome 71+ in RTL mode (see #14689).
    // @breaking-change 8.0.0 Remove null check for `platform`.
    if (platform && (platform.TRIDENT || platform.EDGE)) {
      this._slideListContainer.nativeElement.scrollLeft = 0;
    }
  }

  /** Sets the distance in pixels that the slide header should be transformed in the X-axis. */
  public get scrollDistance(): number { return this._scrollDistance; }
  public set scrollDistance(value: number) {
    this._scrollTo(value);
  }

  /**
   * Moves the slide list in the 'before' or 'after' direction (towards the beginning of the list or
   * the end of the list, respectively). The distance to scroll is computed to be a third of the
   * length of the slide list view window.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  public _scrollHeader(direction: ScrollDirection) {
    const viewLength = this._slideListContainer.nativeElement.offsetWidth;

    // Move the scroll distance one-third the length of the slide list's viewport.
    const scrollAmount = (direction === 'before' ? -1 : 1) * viewLength / 3;

    return this._scrollTo(this._scrollDistance + scrollAmount);
  }

  /** Handles click events on the pagination arrows. */
  public _handlePaginatorClick(direction: ScrollDirection) {
    this._stopInterval();
    this._scrollHeader(direction);
  }

  /**
   * Moves the slide list such that the desired slide element (marked by index) is moved into view.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  public _scrollToLabel(labelIndex: number) {
    console.log('inside _scrollToLabel');
    const selectedLabel = this._elementWrappers ? this._elementWrappers.toArray()[labelIndex] : null;

    if (!selectedLabel) { return; }

    // The view length is the visible width of the slide labels.
    const viewLength = this._slideListContainer.nativeElement.offsetWidth;

    let labelBeforePos: number;
    let labelAfterPos: number;
    if (this._getLayoutDirection() === 'ltr') {
      labelBeforePos = selectedLabel.getOffsetLeft();
      labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
    } else {
      labelAfterPos = this._slideList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
      labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
    }

    const beforeVisiblePos = this.scrollDistance;
    const afterVisiblePos = this.scrollDistance + viewLength;

    if (labelBeforePos < beforeVisiblePos) {
      // Scroll header to move element to the before direction
      this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
    } else if (labelAfterPos > afterVisiblePos) {
      // Scroll header to move element to the after direction
      this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
    }
  }

  /**
   * Evaluate whether the pagination controls should be displayed. If the scroll width of the
   * slide list is wider than the size of the header container, then the pagination controls should
   * be shown.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  public _checkPaginationEnabled() {
    const isEnabled =
        this._slideList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;

    if (!isEnabled) {
      this.scrollDistance = 0;
    }

    if (isEnabled !== this._showPaginationControls) {
      this._changeDetectorRef.markForCheck();
    }

    this._showPaginationControls = isEnabled;
  }

  /**
   * Evaluate whether the before and after controls should be enabled or disabled.
   * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
   * before button. If the header is at the end of the list (scroll distance is equal to the
   * maximum distance we can scroll), then disable the after button.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  public _checkScrollingControls() {
    // Check if the pagination arrows should be activated.
    this._disableScrollBefore = this.scrollDistance === 0;
    this._disableScrollAfter = this.scrollDistance === this._getMaxScrollDistance();
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the slide list container and slide header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  public _getMaxScrollDistance(): number {
    const lengthOfTabList = this._slideList.nativeElement.scrollWidth;
    const viewLength = this._slideListContainer.nativeElement.offsetWidth;

    return (lengthOfTabList - viewLength) || 0;
  }

  /** Tells the ink-bar to align itself to the current element wrapper */
  // _alignInkBarToSelectedTab(): void {
  //   const selectedLabelWrapper = this._elementWrappers && this._elementWrappers.length ?
  //       this._elementWrappers.toArray()[this.selectedIndex].elementRef.nativeElement :
  //       null;
  //
  //   this._inkBar.alignToElement(selectedLabelWrapper!);
  // }

  /** Stops the currently-running paginator interval.  */
  public _stopInterval() {
    this._stopScrolling.next();
  }

  /**
   * Handles the user pressing down on one of the paginators.
   * Starts scrolling the header after a certain amount of time.
   * @param direction In which direction the paginator should be scrolled.
   */
  public _handlePaginatorPress(direction: ScrollDirection) {
    // Avoid overlapping timers.
    this._stopInterval();

    // Start a timer after the delay and keep firing based on the interval.
    timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL)
      // Keep the timer going until something tells it to stop or the component is destroyed.
      .pipe(takeUntil(merge(this._stopScrolling, this._destroyed)))
      .subscribe(() => {
        const {maxScrollDistance, distance}: any = this._scrollHeader(direction);

        // Stop the timer if we've reached the start or the end.
        if (distance === 0 || distance >= maxScrollDistance) {
          this._stopInterval();
        }
      });
  }

  /**
   * Scrolls the header to a given position.
   * @param position Position to which to scroll.
   * @returns Information on the current scroll distance and the maximum.
   */
  private _scrollTo(position: number) {
    const maxScrollDistance = this._getMaxScrollDistance();
    this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));

    // Mark that the scroll distance has changed so that after the view is checked, the CSS
    // transformation can move the header.
    this._scrollDistanceChanged = true;
    this._checkScrollingControls();

    return {maxScrollDistance, distance: this._scrollDistance};
  }
}
