/*
 * Public API Surface of ngx-jsonapi-material
 */

export * from './lib/custom-validators';
export * from './lib/track-by-id';
export * from './lib/batch';
export *from './lib/destroyer';

export * from './lib/select/select.component';
export * from './lib/select/option-footer.component';
export * from './lib/select/select.module';

export * from './lib/submit/submit.component';
export * from './lib/submit/submit.module';

export * from './lib/floating-filters/floating-filters.component';
export * from './lib/floating-filters/avoid-disabled-style.directive';
export * from './lib/floating-filters/floating-filters.module';

export * from './lib/picture-manager/picture/picture-manager.component';
export * from './lib/picture-manager/gallery/gallery-manager.component';
export * from './lib/picture-manager/picture/image-change-interface';
export * from './lib/picture-manager/picture-manager.module';

// export * from './lib/breadcrumbs/breadcrumbs.component';
// export * from './lib/breadcrumbs/breadcrumbs.module';

export * from './lib/search-input/search-input.component';
export * from './lib/search-input/search-text.pipe';
export * from './lib/search-input/search-input.module';

export * from './lib/chips-autocomplete/chips-autocomplete.component';
export * from './lib/chips-autocomplete/chips-autocomplete.module';

export * from './lib/delete-confirmation/confirmation-dialog/confirmation-dialog.component';
export * from './lib/delete-confirmation/delete-confirmation.component';
export * from './lib/delete-confirmation/delete-confirmation.module';

export * from './lib/edit-text-attribute-dialog/edit-text-attribute-dialog.component';
export * from './lib/edit-text-attribute-dialog/edit-text-attribute-dialog.module';

export * from './lib/top-warning/top-warning.component';
export * from './lib/top-warning/top-warning.service';
export * from './lib/top-warning/single-warning/single-warning.component';
export * from './lib/top-warning/top-warning.module';

export * from './lib/error-handler/error-handler.service';
export * from './lib/error-handler/error-handler.module';

export * from './lib/fab-speed-dial/fab-speed-dial.component';
export * from './lib/fab-speed-dial/fab-speed-dial-mini-button';
export * from './lib/fab-speed-dial/fab-speed-dial.module';

export * from './lib/refresh/refresh.component';
export * from './lib/refresh/refresh.module';

export * from './lib/menu/menu-elements/menu';
export * from './lib/menu/menu-elements/section';
export * from './lib/menu/menu-elements/button';
export * from './lib/menu/dropdown-menu/dropdown-menu.component';
export * from './lib/menu/menu.component';
export * from './lib/menu/menu.module';

export * from './lib/floating-button/floating-button.component';
export * from './lib/floating-button/floating-button.module';

export * from './lib/dynamic-forms/dynamic-inputs';
export * from './lib/dynamic-forms/formly-form-flex.component';
export * from './lib/dynamic-forms/dynamic-forms.module';

export * from './lib/tabs/tabs.directive';
export * from './lib/tabs/tabs.module';

export * from './lib/expansion-panel/remember-state.directive';
export * from './lib/expansion-panel/remember-state.module';

export * from './lib/floating-input/floating-input.component';
export * from './lib/floating-input/floating-input.module';

export * from './lib/filters/interfaces/filter-date-range.interface';
export * from './lib/filters/interfaces/filter-checks.interface';
export * from './lib/filters/interfaces/filter-option.interface';
export * from './lib/filters/interfaces/filter.interface';
export * from './lib/filters/basics/filter-options.component';
export * from './lib/filters/basics/filter-checks.component';
export * from './lib/filters/filters.module';

export * from './lib/slide/slide-module';
export * from './lib/slide/slide-group';
export { JamSlideHeader, ScrollDirection } from './lib/slide/slide-header';
export { JamSlideElementWrapper } from './lib/slide/slide-element-wrapper';
export { JamSlide } from './lib/slide/slide';
export { JamSlideElement } from './lib/slide/slide-element';
export * from './lib/slide/slide-animations';

export * from './lib/pin-option-button/pin-option-button.component';
export * from './lib/pin-option-button/pin-option-button.module';

export * from './lib/autocomplete/autocomplete.component';
export * from './lib/autocomplete/autocomplete.module';

export { DialogLoggedStateComponent } from './lib/logged-state/dialog-logged-state.component';

export { ResponsiveColumns } from './lib/list-base/list-base-common/table-components/responsive-columns';
export * from './lib/list-base/list-base-common/table-components/table-columns';
export { AppDatePipe } from './lib/list-base/date-pipe/app-date.pipe';
export { AppDateTimePipe } from './lib/list-base/date-pipe/app-date.pipe';
export { AppCapitalizePipe } from './lib/list-base/capitalize-pipe/capitalize.pipe';
export { AppCurrencyPipe } from './lib/list-base/currency-pipe/app-currency.pipe';
export { ListBaseCommonComponent } from './lib/list-base/list-base-common/list-base-common.component';
export * from './lib/list-base/list-base';
export { ListBaseModule } from './lib/list-base/list-base.module';
export { ListBaseCommonPaginatorComponent } from './lib/list-base/list-base-common/list-base-common-paginator/list-base-common-paginator.component';
export { ListBaseCommonInfiniteScrollComponent } from './lib/list-base/list-base-common/list-base-common-infinite-scroll/list-base-common-infinite-scroll.component';

export { InfoButtonComponent } from './lib/info-button/info-button.component';
export { JamInfoButtonModule } from './lib/info-button/info-button.module';

export { SelectionBarContainerComponent } from './lib/selection-bar/selection-bar-container/selection-bar-container.component';
export { SelectionBarInfoComponent } from './lib/selection-bar/selection-bar-info/selection-bar-info.component';
export { DomService } from './lib/selection-bar/dom.service';
export { IMethodRef, SelectionBarService } from './lib/selection-bar/selection-bar.service';
export { JamSelectionBarModule } from './lib/selection-bar/selection-bar.module';
