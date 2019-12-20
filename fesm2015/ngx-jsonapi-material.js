import { map, concatMap, startWith, filter, switchMap, debounceTime, catchError, takeUntil, timeout, tap } from 'rxjs/operators';
import { pipe, of, Subject, merge, timer, fromEvent, Subscription, BehaviorSubject } from 'rxjs';
import { Component, Input, Output, EventEmitter, Pipe, NgModule, Directive, ElementRef, Inject, ViewChild, HostListener, Injectable, ErrorHandler, NgZone, ChangeDetectorRef, ContentChild, ChangeDetectionStrategy, TemplateRef, ViewContainerRef, ViewEncapsulation, ContentChildren, Optional, InjectionToken, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import 'ngx-jsonapi';
import { Router, ActivatedRoute, RouterModule, NavigationStart } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location, DatePipe } from '@angular/common';
import { MatButtonModule, MatIconModule, MatSelectModule, MatFormFieldModule, MatDividerModule, MatProgressSpinnerModule, MatTooltipModule, MatExpansionModule, MatDialogModule, MatCardModule, MatChipsModule, MatOptionModule, MatAutocompleteModule, MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatBottomSheet, MatMenuModule, MatBottomSheetModule, MatListModule, MatExpansionPanel, MatInputModule as MatInputModule$1, MatIconRegistry, MatTableModule, MatPaginatorModule, MatToolbarModule, MatTabsModule as MatTabsModule$1, MatDatepickerModule, MatNativeDateModule, MatAutocompleteTrigger, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient } from '@angular/common/http';
import { humanizeBytes, NgxUploaderModule } from 'ngx-uploader';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule as MatDialogModule$1 } from '@angular/material/dialog';
import { MatIconModule as MatIconModule$1 } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule as MatButtonModule$1 } from '@angular/material/button';
import { MatTooltipModule as MatTooltipModule$1 } from '@angular/material/tooltip';
import { MatFormFieldModule as MatFormFieldModule$1 } from '@angular/material/form-field';
import { __awaiter } from 'tslib';
import { ToasterService } from 'angular2-toaster';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatTabsModule } from '@angular/material/tabs';
import { CdkPortal, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { mixinDisabled, mixinDisableRipple, mixinColor, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { FocusKeyManager, A11yModule } from '@angular/cdk/a11y';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectionModel } from '@angular/cdk/collections';

class CustomValidators {
    patternValidator(regex, error) {
        return (control) => {
            if (!control.value)
                return null; // if control is empty return no error
            const VALID = regex.test(control.value); // test the value of the control against the regexp supplied
            return VALID ? null : error; // if true, return no error (no error), else return error passed in the second parameter
        };
    }
    /**
     * @description NoPassswordMatch allows you to display an error if the password does not match.
     * @usageNotes
     * ### Ejemplo
     * ```typescript
     * validation: {
     *     message: {
     *         NoPassswordMatch: 'Mi mensaje'
     *     }
     * }
     * ```
     */
    passwordMatchValidator(control) {
        const PASSWORD = control.get('password').value; // get password from our password form control
        const CONFIRM_PASSWORD = control.get('confirm_password').value; // get password from our confirmPassword form control
        // compare is the password math
        if (PASSWORD !== CONFIRM_PASSWORD) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirm_password').setErrors({ NoPassswordMatch: true });
        }
    }
}

function trackById(index, resource) {
    return resource.id;
}

// tslint:disable: rxjs-no-wholesale rxjs-deep-operators
function batchAll(service, params) {
    return service.all(params).pipe(concatMap(collection => {
        if (collection.data.length < params.page.size) {
            return of(collection);
        }
        params.page.number += 1;
        return batchAll(service, params).pipe(startWith(collection));
    }));
}
const filterOrRequest = (params) => pipe(startWith(''), debounceTime(400), filter(filterValue => typeof filterValue === 'string'), switchMap((filterValue) => {
    if (filterValue.includes(params.last_filter_value) && params.collection.data.length < params.page_size) {
        return of(params.resourcesArray.filter((resource) => resource.attributes[params.attribute_to_search].toLowerCase().indexOf(filterValue) >= 0));
    }
    return params
        .getAllFc(filterValue)
        .pipe(catchError(() => [])).pipe(map((collection) => {
        params.collection = collection;
        params.resourcesArray = collection.data;
        params.last_filter_value = filterValue;
        return params.resourcesArray;
    }));
}));

class Destroyer {
    constructor() {
        this.takeuntil = new Subject();
    }
    pipe() {
        return pipe(takeUntil(this.takeuntil));
    }
    destroy() {
        this.takeuntil.next();
        this.takeuntil.complete();
    }
}

class SelectComponent {
    constructor() {
        this.appareance = 'outline';
        this.floatLabel = 'always';
        this.hasRefresh = false;
        this.toRelateChange = new EventEmitter();
        this.refresh = new EventEmitter();
        this.adaptiveArray = [];
        this.clear_relationships = null;
        this.searchText = '';
    }
    ngOnInit() {
        if (this.limit) {
            this.adaptiveArray = this.collection.data.slice(0, Number(this.limit));
        }
        else {
            this.adaptiveArray = this.collection.data;
        }
        if (this.toRelate) {
            this.toRelate = this.collection.find(this.toRelate.id);
        }
    }
    updateFilter(search_text) {
        this.searchText = search_text;
    }
    updateRelationships(resource) {
        this.toRelateChange.emit(resource);
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-select',
                styles: [`.mat-option-footer,.mat-option-header{position:-webkit-sticky;position:sticky;background:inherit;z-index:999!important;width:100%}.mat-option-header{padding-left:0;padding-right:0;top:0}.mat-option-footer{bottom:0}.mat-icon{margin:0!important}mat-form-field{width:100%}`],
                template: `<mat-form-field
    [floatLabel]="floatLabel"
    [appearance]="appareance"
>
    <mat-label>
        {{ label || 'Seleccione una opción' }}
        <i *ngIf="!toRelate">(Ninguna)</i>
    </mat-label>
    <mat-select
        [ngModel]="toRelate"
        (ngModelChange)="updateRelationships($event)"
        [disabled]="disabled || false"
        [placeholder]="placeholder || 'Seleccione una opción'"
        [multiple]="multiple || false"
        >

        <div class="mat-option-header" *ngIf="adaptiveArray.length >= 10">
            <jam-search-input
                [text]="searchText"
                [opened]="true"
                (textChange)="updateFilter($event)"
            ></jam-search-input>
        </div>

        <mat-divider></mat-divider>

        <mat-option *ngIf="removeRelationships" [value]="clear_relationships">-- Ninguna --</mat-option>

        <ng-container *ngFor="let resource of adaptiveArray | filter: searchText">
            <mat-option [value]="resource" *ngIf="parentId && resource.id !== parentId">
                {{ resource.attributes[displayAttribute] }}
            </mat-option>
            <mat-option [value]="resource" *ngIf="!parentId">
                {{ resource.attributes[displayAttribute] }}
            </mat-option>
        </ng-container>

        <div class="mat-option-footer">
            <ng-content></ng-content>
        </div>
    </mat-select>

    <button matSuffix mat-icon-button class="mat-button" *ngIf="hasRefresh"
        (click)="refresh.emit()">
        <div fxLayout="row" fxLayoutAlign="center center">
            <mat-icon class="mat-hint">refresh</mat-icon>
        </div>
    </button>
</mat-form-field>
`
            },] },
];
SelectComponent.propDecorators = {
    appareance: [{ type: Input }],
    floatLabel: [{ type: Input }],
    multiple: [{ type: Input }],
    parentId: [{ type: Input }],
    toRelate: [{ type: Input }],
    placeholder: [{ type: Input }],
    label: [{ type: Input }],
    displayAttribute: [{ type: Input }],
    collection: [{ type: Input }],
    removeRelationships: [{ type: Input }],
    disabled: [{ type: Input }],
    limit: [{ type: Input }],
    hasRefresh: [{ type: Input }],
    toRelateChange: [{ type: Output }],
    refresh: [{ type: Output }]
};

class JamOptionFooterComponent {
    constructor(activatedRoute, router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.openNewTab = false;
    }
    goTo(target = '_self') {
        if (this.routerLink) {
            this.router.navigate(this.routerLink, {
                relativeTo: this.activatedRoute,
                queryParams: this.queryParams
            });
        }
        else if (this.url) {
            window.open(this.url, target);
        }
    }
}
JamOptionFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-option-footer',
                styles: [`.mouseover * .mouseover-child{display:none}.mouseover:hover * .mouseover-child{display:inherit}`],
                template: `<mat-option class="mat-elevation-z1 mouseover"
    (click)="goTo()">
    <div fxLayout="row" fxLayoutAlign="space-between center">
        <div>
            <mat-icon class="mat-hint">add_circle</mat-icon>
            <span>{{ labelOption || 'Add'}}</span>
        </div>
        <div *ngIf="openNewTab && !routerLink">
            <a mat-icon-button class="mat-button mouseover-child" target="_blank"
                (click)="$event.stopPropagation(); goTo('_blank')">
                <mat-icon class="mat-hint" [style.margin]="'0'">open_in_new</mat-icon>
            </a>
        </div>
    </div>
</mat-option>
`
            },] },
];
/** @nocollapse */
JamOptionFooterComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
JamOptionFooterComponent.propDecorators = {
    url: [{ type: Input }],
    labelOption: [{ type: Input }],
    routerLink: [{ type: Input }],
    queryParams: [{ type: Input }],
    openNewTab: [{ type: Input }]
};

class FilterPipe {
    /**
     *
     * @param items List of items to filter
     * @param term  a string term to compare with every property of the list
     *
     */
    static filter(items, term) {
        const toCompare = term.toLowerCase();
        return items.filter((item) => {
            for (let property in item) {
                if (property !== 'attributes') {
                    continue;
                }
                for (let sub_property in item[property]) {
                    if (!['string', 'number'].includes(typeof item[property][sub_property])) {
                        continue;
                    }
                    if (item[property][sub_property]
                        .toString()
                        .toLowerCase()
                        .includes(toCompare)) {
                        return true;
                    }
                }
            }
            return false;
        });
    }
    /**
     * @param items object or resource from array
     * @param searchText search term
     */
    transform(items, searchText) {
        if (!searchText || !items)
            return items;
        return FilterPipe.filter(items, searchText);
    }
}
FilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'filter'
            },] },
];

/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class SearchInputComponent {
    constructor() {
        this.opened = false;
        this.textChange = new EventEmitter();
        this.searchCtrl = new FormControl();
        this.showSearch = false;
        this.destroyer = new Destroyer();
    }
    ngOnInit() {
        this.showSearch = this.opened || this.showSearch;
        this.searchCtrl.valueChanges
            .pipe(this.destroyer.pipe(), map(x => x), debounceTime(400)).subscribe(newValue => this.textChange.emit(newValue));
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    showInput() {
        if (this.opened) {
            this.showSearch = this.opened;
        }
        else {
            this.showSearch = !this.showSearch;
            setTimeout(() => { if (this.showSearch)
                document.getElementById('search-input').focus(); }, 0);
        }
    }
    switch() {
        if (this.opened) {
            this.showSearch = this.opened;
        }
        else {
            this.showSearch = false;
        }
        if (this.searchCtrl.value !== '') {
            this.searchCtrl.setValue('');
            this.textChange.emit(this.searchCtrl.value);
        }
    }
}
SearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-search-input',
                styles: [`div.opened{background-color:rgba(0,0,0,.12)}.jam-input{border:0;background:0 0;height:48px;padding:16px;outline:0!important}.mat-icon{margin:0!important}@media only screen and (max-width:600px){div.opened{position:absolute;top:0;left:0;right:0;z-index:333;background:#fff;height:48px;max-height:48px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}div.opened:active,div.opened:focus,div.opened:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}}`],
                template: `<div fxLayout="row" fxLayoutAlign="space-between center">
    <button mat-icon-button class="mat-button" matTooltip="Buscar"
        *ngIf="!showSearch"
        (click)="showInput()">
        <mat-icon class="mat-hint">search</mat-icon>
    </button>
    <div class="reset-input-default" fxFlex="100" [style.padding-left]="'16px'"
        *ngIf="showSearch"
        [ngClass]="showSearch ? 'opened' : ''"
        fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16">
        <mat-icon class="mat-hint">search</mat-icon>
        <input class="jam-input" fxFlex id="search-input" autocomplete="off"
            [formControl]="searchCtrl" placeholder="Buscar...">

        <button mat-icon-button class="mat-button" (click)="switch()">
            <mat-icon class="mat-hint">clear</mat-icon>
        </button>
    </div>
</div>
`
            },] },
];
SearchInputComponent.propDecorators = {
    text: [{ type: Input }],
    opened: [{ type: Input }],
    textChange: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamSearchInputModule {
}
JamSearchInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    FlexLayoutModule,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatIconModule,
                    CommonModule
                ],
                declarations: [SearchInputComponent, FilterPipe],
                exports: [SearchInputComponent, FilterPipe]
            },] },
];

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamSelectModule {
}
JamSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule,
                    JamSearchInputModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MatButtonModule,
                    MatIconModule,
                    MatDividerModule,
                    MatFormFieldModule,
                    MatSelectModule,
                    CommonModule
                ],
                providers: [FilterPipe],
                declarations: [SelectComponent, JamOptionFooterComponent],
                exports: [SelectComponent, JamOptionFooterComponent]
            },] },
];

/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class SubmitComponent {
    constructor(location, router, activatedRoute) {
        this.location = location;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.submitAppearance = 'mat-flat-button';
        this.submitColor = 'primary';
        this.goBack = false;
        this.loading = false;
        this.accept = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    changeState(event) {
        if (!this.noCancel && this.goBack) {
            this.location.back();
            this.cancel.emit('goBack');
        }
        else if (this.cancel) {
            this.cancel.emit();
        }
        else if (this.cancelState && (this.cancelState.slice(0, 2) === '..')) {
            this.router.navigate([this.cancelState], { relativeTo: this.activatedRoute });
        }
        else {
            this.router.navigate([this.cancelState], { queryParams: this.cancelParamsState });
        }
    }
    submit() {
        this.accept.emit();
    }
}
SubmitComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-submit',
                styles: [`div,div button[type=submit]{width:inherit}div button[type=submit]{min-height:36px}`],
                template: `<div fxLayout="row" fxLayoutAlign="end center">
    <button type="button" mat-button color="accent" *ngIf="!noCancel" (click)="changeState($event)" class="accent pull-right" rs-esc-key>Cancelar</button>
    <button mat-button  type="submit" aria-label="Guardar" class="pull-right"
        [color]="submitColor"
        [ngClass]="submitAppearance"
        [disabled]="loading || disabled"
        (click)="submit()">
        <div fxLayout="row" fxLayoutAlign="center center">
            <span *ngIf="!loading" class="elements-up">{{ (submitLabel ? submitLabel : 'Guardar') | uppercase }}</span>
            <mat-progress-spinner class="elements-up default"
                *ngIf="loading"
                mode="indeterminate"
                value="value"
                diameter="20"
                aria-label="Cargando Espere">
            </mat-progress-spinner>
        </div>
    </button>
</div>
`
            },] },
];
/** @nocollapse */
SubmitComponent.ctorParameters = () => [
    { type: Location },
    { type: Router },
    { type: ActivatedRoute }
];
SubmitComponent.propDecorators = {
    submitAppearance: [{ type: Input }],
    submitColor: [{ type: Input }],
    disabled: [{ type: Input }],
    noCancel: [{ type: Input }],
    cancelParamsState: [{ type: Input }],
    submitLabel: [{ type: Input }],
    cancelState: [{ type: Input }],
    goBack: [{ type: Input }],
    loading: [{ type: Input }],
    accept: [{ type: Output }],
    cancel: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamSubmitModule {
}
JamSubmitModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MatTooltipModule,
                    MatButtonModule,
                    MatProgressSpinnerModule,
                    CommonModule
                ],
                declarations: [SubmitComponent],
                exports: [SubmitComponent]
            },] },
];

/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
/**
 * Este component trabaja con 2 ng-content.
 * En el component que se use, debe definirse dos ng-container con las clases css:
 * header-filters, y filters, de esta forma el component sabe en que ng-content ubicar el contenido que se le pasa.
 */
class FloatingFiltersComponent {
    constructor() {
        this.hasAdvancedFilters = true;
        this.appearance = 'square';
        this.resetFilters = new EventEmitter();
        this.show_reset_button = false;
        this.open_expansion_panel = false;
    }
    ngOnInit() {
        this.show_reset_button = this.resetFilters.observers.length > 0;
    }
    toggleStateExpansionPanel(state$$1) {
        this.open_expansion_panel = !state$$1;
    }
    clearFilters(panel_state) {
        if (!panel_state) {
            return;
        }
        this.resetFilters.emit();
    }
}
FloatingFiltersComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-floating-filters',
                styles: [`/deep/ .filter-button,/deep/ .filter-button-round,/deep/ .filter-button-square{padding:0;color:currentColor;font-weight:900!important;box-sizing:border-box}/deep/ .filter-button mat-icon,/deep/ .filter-button-round mat-icon,/deep/ .filter-button-square mat-icon{color:currentColor!important}/deep/ .filter-button-round::before,/deep/ .filter-button-square::before,/deep/ .filter-button::before{content:'';background-color:currentColor;position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit!important;opacity:.08}.filter-button-round{border-radius:100px!important}.filter-button-square{border-radius:6px}.filter-button-square button{border-radius:6px!important}mat-expansion-panel-header{background:0 0!important}`],
                template: `<mat-expansion-panel
    [disabled]="!hasAdvancedFilters"
    [hideToggle]="true"
    (opened)="toggleStateExpansionPanel(false)"
    (closed)="toggleStateExpansionPanel(true)"
    [style.box-shadow]="'none'"
    class="width-100" [expanded]="open_expansion_panel" [style.background]="'transparent'">
    <mat-expansion-panel-header jamAvoidDisabledStyle [style.padding]="'0'">
        <mat-panel-description fxLayout="row" fxLayoutAlign="space-between center">
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16px" (click)="$event.stopPropagation()">
                <button mat-button [ngClass]="'filter-button-' + appearance" color="accent"
                    *ngIf="hasAdvancedFilters"
                    (click)="toggleStateExpansionPanel(open_expansion_panel)">
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="4px">
                        <button mat-icon-button class="mat-button" (click)="clearFilters(open_expansion_panel)">
                            <mat-icon
                                [innerHtml]="!open_expansion_panel ? 'filter_list' : 'close'"
                                [matTooltip]="open_expansion_panel ? 'Borrar filtros' : 'Ver filtros'"
                            ></mat-icon>
                        </button>

                        <span>FILTROS</span>

                        <mat-icon matSuffix
                            [style.width.px]="'40'"
                            [innerHtml]="open_expansion_panel ? 'arrow_drop_up' : 'arrow_drop_down'"
                        ></mat-icon>
                    </div>
                </button>
            </div>

            <div fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="16px" (keydown)="$event.stopPropagation()" (click)="$event.stopPropagation()">
                <ng-content select="ng-container.jam-filter-header"></ng-content>
            </div>
        </mat-panel-description>
    </mat-expansion-panel-header>

    <div fxLayout="row wrap" fxLayoutAlign="start center" fxLayoutGap="16px grid">
        <ng-content select="ng-container.jam-filter-content">
        </ng-content>
    </div>
</mat-expansion-panel>
`
            },] },
];
FloatingFiltersComponent.propDecorators = {
    hasAdvancedFilters: [{ type: Input }],
    appearance: [{ type: Input }],
    resetFilters: [{ type: Output }]
};

/**
 * Esta directive se usa en conjunto con la directive/attribute [disabled].
 * Es especial para los matExpansionPanel, cuando se aplican botones de acciones al header de este
 * y no se quiere abrir el matExpansionPanel, entonces esta directiv lo que hará es no aplicar los estilos apagado
 * que proporciona material cuando un elemento/tag esta des habilitado.
 */
class AvoidDisabledStyleDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        const NATIVE_ELEMENT = this.elementRef.nativeElement;
        this.changes = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                this.preservingOriginalStyles(mutation);
            }
        });
        this.changes.observe(NATIVE_ELEMENT, {
            attributes: true,
            childList: false,
            characterData: false
        });
    }
    ngOnDestroy() {
        this.changes.disconnect();
    }
    preservingOriginalStyles(mutation) {
        if (mutation.attributeName !== 'aria-disabled') {
            return;
        }
        let elements = document.getElementsByTagName(mutation.target.nodeName);
        for (let element of elements) {
            element.style.color = 'inherit';
        }
    }
}
AvoidDisabledStyleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[jamAvoidDisabledStyle]'
            },] },
];
/** @nocollapse */
AvoidDisabledStyleDirective.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamFloatingFiltersModule {
}
JamFloatingFiltersModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatExpansionModule,
                    MatButtonModule,
                    MatTooltipModule,
                    MatIconModule,
                    FlexLayoutModule,
                    CommonModule
                ],
                declarations: [FloatingFiltersComponent, AvoidDisabledStyleDirective],
                exports: [FloatingFiltersComponent, AvoidDisabledStyleDirective]
            },] },
];

class PictureManagerComponent {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.showDeleteOption = true;
        /**
         * Outputs
         * @param uploadChange: updates the image and returns the url for it.
         */
        this.uploadChange = new EventEmitter();
        this.response = new EventEmitter();
        this.drag_and_drop = false;
    }
    ngOnInit() {
        this.settingDefaultValues();
    }
    dragAndDropStyles(drag_and_drop) {
        this.drag_and_drop = drag_and_drop;
    }
    showPreview(image) {
        this.source = image;
        this.deleteUrl = this.deleteUrl || this.source;
        this.uploadChange.emit({ status_change: 'update', source: this.source });
    }
    delete() {
        let delete_url = this.creatDeleteUrl(this.source);
        this.httpClient.delete(delete_url, {
            headers: this.jamHeaders
        }).subscribe((response) => {
            this.uploadChange.emit({ status_change: 'delete', source: this.source });
        });
    }
    settingDefaultValues() {
        this.type = this.type || 'square';
        this.deleteUrl = this.deleteUrl || this.source;
        this.uploadUrl = this.uploadUrl || this.source;
    }
    creatDeleteUrl(source) {
        let img_url_parties = source.split('/');
        let img_name = img_url_parties.pop();
        return this.deleteUrl + img_name;
    }
}
PictureManagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-picture-manager',
                template: `<jam-upload [uploadUrl]="uploadUrl" (dragAndDropChange)="dragAndDropStyles($event)" (showPreview)="showPreview($event)" mat-icon-button fxLayout="row" fxLayoutAlign="center center"
    [jamHeaders]="jamHeaders"
    (response)="response.emit($event)"
    >
    <div *ngIf="drag_and_drop" [ngClass]="type + '-drag-and-drop-styles'"></div>
    <div *ngIf="!drag_and_drop" id="picture-manager" class="mouseover">
        <div [ngClass]="type" [style.background-image]="'url(' + source + ')'">
            <div class="mouseover-child">
                <div class="blur" [style.background-image]="'url(' + source + ')'"></div>
                <div class="overlay"></div>
                <div class="menu">
                    <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="8px">
                        <mat-icon matTooltip="Subir imagen">add_a_photo</mat-icon>
                        <mat-divider *ngIf="showDeleteOption"></mat-divider>
                        <jam-delete-confirmation *ngIf="showDeleteOption"
                            [styled]="{ color: 'white' }"
                            (delete)="delete()"
                        ></jam-delete-confirmation>
                    </div>
                </div>
            </div>
        </div>
    </div>
</jam-upload>
`,
                styles: [`jam-upload #picture-manager *,jam-upload #picture-manager *>mat-icon{width:auto;height:auto}.square{border-radius:2%;overflow:hidden}.round{border-radius:50%;overflow:hidden}.round-drag-and-drop-styles{background-color:rgba(0,0,0,.05);position:relative;width:180px;height:180px;top:0;left:0;z-index:333;background-image:url(/assets/images/drag_and_drop.png);border-radius:50%}.square-drag-and-drop-styles{background-color:rgba(0,0,0,.05);position:relative;width:180px;height:180px;top:0;left:0;z-index:333;background-image:url(/assets/images/drag_and_drop.png)}jam-upload #picture-manager *>mat-icon{color:#fff;font-size:4.5rem}jam-upload #picture-manager.mouseover:hover{background-color:transparent}jam-upload #picture-manager.mouseover div>.mouseover-child{display:none;-webkit-transition:display .3s;transition:display .3s}jam-upload #picture-manager.mouseover:hover div>.mouseover-child{display:inherit}jam-upload #picture-manager.mouseover:hover div>.mouseover-child .blur{top:0;bottom:0;left:0;right:0;-webkit-filter:blur(10px);-moz-filter:blur(10px);-ms-filter:blur(10px);-o-filter:blur(10px);filter:blur(10px);width:calc(100% + 40px);height:calc(100% + 40px);position:absolute;z-index:1;margin:-20px}jam-upload #picture-manager div mat-divider{width:60%;position:relative;border-color:#fff}jam-upload #picture-manager div{width:180px;height:180px;position:relative;background-size:cover;background-position:center}jam-upload #picture-manager.mouseover div>.mouseover-child .menu{z-index:3;position:absolute;top:0}jam-upload #picture-manager div>div.overlay{top:0;bottom:0;left:0;right:0;width:100%;height:100%;position:absolute;z-index:1;background-color:rgba(0,0,0,.376)}`]
            },] },
];
/** @nocollapse */
PictureManagerComponent.ctorParameters = () => [
    { type: HttpClient }
];
PictureManagerComponent.propDecorators = {
    type: [{ type: Input }],
    source: [{ type: Input }],
    deleteUrl: [{ type: Input }],
    uploadUrl: [{ type: Input }],
    showDeleteOption: [{ type: Input }],
    jamHeaders: [{ type: Input }],
    uploadChange: [{ type: Output }],
    response: [{ type: Output }]
};

class GalleryManagerComponent {
    constructor() {
        this.updatePicture = '/photos/';
        this.showDeleteOption = true;
        /**
         * @param  {number} highlightedImage
         * Position in the array of the highlighted image, by default is the position 0.
         */
        this.highlightedImage = 0;
        this.addPicture = new EventEmitter();
        this.responsePicture = new EventEmitter();
        this.image_loading = false;
    }
    ngOnInit() {
        this.highlightedImage = this.highlightedImage || 0;
    }
    showPreview(img) {
        this.addPicture.emit(img);
    }
    response(event) {
        if (event.type !== 'done') {
            this.image_loading = true;
            return;
        }
        this.image_loading = false;
        this.responsePicture.emit(event.file.response.data);
    }
}
GalleryManagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-gallery-manager',
                template: `<div *ngFor="let picture of pictures; let position = index">
    <mat-card class="mat-card-flat padding-0 container-gallery-manager"
        *ngIf="limit ? position <= limit : true"
        [matTooltip]="highlightedImage == position ? 'Imagen principal' : null"
        [ngClass]="highlightedImage == position ? 'mat-icon mat-accent highlighted-image-container' : null"
    >
        <mat-icon color="accent" *ngIf="highlightedImage == position"
            class="highlighted-image"
        >collections_bookmark</mat-icon>
        <jam-picture-manager
            [showDeleteOption]="showDeleteOption"
            [source]="picture.attributes.url"
            [uploadUrl]="uploadUrl + updatePicture + picture.id"
            [jamHeaders]="jamHeaders"
        ></jam-picture-manager>
    </mat-card>
</div>
<jam-upload id="gallery-manager" [uploadUrl]="uploadUrl" (showPreview)="showPreview($event)"
    *ngIf="pictures && pictures.length < limit" class="container-gallery-manager"
    [disabled]="image_loading"
    (response)="response($event)"
    mat-icon-button matTooltip="Subir imagen"
    [jamHeaders]="jamHeaders">
    <mat-icon id="base-icon" [ngClass]="image_loading ? 'disabled-update' : null">add_a_photo</mat-icon>
    <mat-progress-spinner class="elements-up default"
        class="loading-position"
        *ngIf="image_loading"
        mode="indeterminate"
        value="value"
        diameter="42"
        aria-label="Cargando Espere">
    </mat-progress-spinner>
</jam-upload>
`,
                styles: [`jam-upload #gallery-manager{width:auto;height:100%}#base-icon{width:auto;height:auto;font-size:8rem}.container-gallery-manager{position:relative;border-radius:inherit}.highlighted-image-container{height:auto!important;width:auto!important;--color:currentColor;border:2px solid var(--color)}.highlighted-image{padding:2px;box-sizing:content-box;background:inherit;border-radius:10%;position:absolute;top:-10px;left:calc(100% - 14px);z-index:2}.loading-position{position:absolute;top:54px;left:48px}.disabled-update{opacity:.3}`]
            },] },
];
GalleryManagerComponent.propDecorators = {
    pictures: [{ type: Input }],
    uploadUrl: [{ type: Input }],
    updatePicture: [{ type: Input }],
    limit: [{ type: Input }],
    showDeleteOption: [{ type: Input }],
    jamHeaders: [{ type: Input }],
    highlightedImage: [{ type: Input }],
    addPicture: [{ type: Output }],
    responsePicture: [{ type: Output }]
};

class UploadComponent {
    constructor(router) {
        this.router = router;
        this.data = {};
        this.disabled = false;
        this.showPreview = new EventEmitter();
        this.response = new EventEmitter();
        this.dragAndDropChange = new EventEmitter();
        this.dragOver = false;
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytesFunction = humanizeBytes;
    }
    onUploadOutput(output) {
        switch (output.type) {
            case 'allAddedToQueue':
                this.startUpload();
                break;
            case 'addedToQueue':
                if (typeof output.file !== 'undefined') {
                    this.previewImage(output.file);
                    this.files.push(output.file);
                }
                break;
            case 'uploading':
                if (typeof output.file !== 'undefined') {
                    // update current data in files array for uploading file
                    const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
                    this.files[index] = output.file;
                }
                break;
            case 'removed':
                // remove file from array when removed
                this.files = this.files.filter((file) => JSON.stringify(file) !== JSON.stringify(output.file));
                break;
            case 'dragOver':
                this.dragOver = true;
                this.dragAndDropChange.emit(this.dragOver);
                break;
            case 'dragOut':
            case 'drop':
                this.dragOver = false;
                this.dragAndDropChange.emit(this.dragOver);
                break;
            case 'done':
                if (this.redirect) {
                    this.router.navigate([this.router.url + '/' + output.file.response.id]);
                }
                break;
        }
        this.response.emit(output);
    }
    // The preview function
    previewImage(file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file.nativeFile || file.target.files[0]);
        fileReader.onload = (image) => {
            this.showPreview.emit(image.target.result);
        };
    }
    startUpload() {
        const event = {
            type: 'uploadAll',
            url: this.uploadUrl,
            method: 'POST',
            data: this.data,
            headers: this.jamHeaders
        };
        this.uploadInput.emit(event);
    }
    cancelUpload(id) {
        this.uploadInput.emit({ type: 'cancel', id: id });
    }
    removeFile(id) {
        this.uploadInput.emit({ type: 'remove', id: id });
    }
    removeAllFiles() {
        this.uploadInput.emit({ type: 'removeAll' });
    }
}
UploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-upload',
                template: `<div>
    <div fxLayout="column" fxLayoutAlign="center center" ngFileDrop [options]="options" (uploadOutput)="onUploadOutput($event)" [uploadInput]="uploadInput">
        <label class="upload-button margin-0"
            style="display: inline-block;
                border: none;
                outline: none;
                cursor: pointer;"
            >
            <input style="display: none" type="file" class="layout-margin" ngFileSelect
                [uploadInput]="uploadInput"
                [disabled]="disabled"
                [options]="options"
                (change)="previewImage($event)"
                (uploadOutput)="onUploadOutput($event)"
                multiple>
            <ng-content></ng-content>
        </label>
    </div>
</div>
<div *ngFor="let f of files; let i = index;">
    <mat-spinner *ngIf="f.progress.data < 100"></mat-spinner>
</div>
`
            },] },
];
/** @nocollapse */
UploadComponent.ctorParameters = () => [
    { type: Router }
];
UploadComponent.propDecorators = {
    uploadUrl: [{ type: Input }],
    data: [{ type: Input }],
    redirect: [{ type: Input }],
    jamHeaders: [{ type: Input }],
    disabled: [{ type: Input }],
    uploadInput: [{ type: Output }],
    showPreview: [{ type: Output }],
    response: [{ type: Output }],
    dragAndDropChange: [{ type: Output }]
};

/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class ConfirmationDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        if (!data.accept) {
            data.accept = 'Sí';
        }
        if (!data.msg) {
            data.msg = '¿Está seguro que desea continuar?';
        }
    }
}
ConfirmationDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-confirmation-dialog',
                template: `<h2 *ngIf="data.title" mat-dialog-title [innerHtml]="data.title"></h2>
<mat-dialog-content>
    <p [innerHtml]="data.msg"></p>
</mat-dialog-content>
<mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
    <button mat-button mat-dialog-close>No</button>
    <button mat-button [mat-dialog-close]="true" [innerHtml]="data.accept"></button>
</mat-dialog-actions>
`
            },] },
];
/** @nocollapse */
ConfirmationDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];

/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class DeleteConfirmationComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.type = 'icon'; /** @Deprecated */
        this.appearance = 'mat-icon-button';
        this.delete = new EventEmitter();
        this.smartColor = {
            'mat-button': 'accent',
            'mat-raised-button': 'primary',
            'mat-flat-button': 'primary',
            'mat-stroked-button': 'accent',
            'mat-icon-button': 'default'
        };
        this.msg = this.msg || '¿Está seguro de eliminar?';
        this.accept = this.accept || 'Sí';
    }
    showConfirm() {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: 'auto',
            data: { title: this.title, msg: this.msg, accept: this.accept }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete.emit();
            }
        });
    }
}
DeleteConfirmationComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-delete-confirmation',
                template: `<div>
    <button mat-button type="button"
        [ngClass]="appearance || 'mat-icon-button mat-button'"
        (click)="showConfirm()"
        [color]="smartColor[appearance]"
        [ngStyle]="styled"
        [matTooltip]="tooltip || text || 'Eliminar'"
        >
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="8px">
            <mat-icon
                [ngStyle]="styleIcon ? styleIcon : ''"
            >
                {{ icon ? icon : 'delete' }}
            </mat-icon>
            <span *ngIf="text && appearance !== 'mat-icon-button'" [innerHtml]="text"></span>
        </div>
    </button>
</div>
`
            },] },
];
/** @nocollapse */
DeleteConfirmationComponent.ctorParameters = () => [
    { type: MatDialog }
];
DeleteConfirmationComponent.propDecorators = {
    type: [{ type: Input }],
    icon: [{ type: Input }],
    tooltip: [{ type: Input }],
    msg: [{ type: Input }],
    text: [{ type: Input }],
    title: [{ type: Input }],
    classed: [{ type: Input }],
    styled: [{ type: Input }],
    styleIcon: [{ type: Input }],
    accept: [{ type: Input }],
    appearance: [{ type: Input }],
    delete: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamDeleteConfirmationModule {
}
JamDeleteConfirmationModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatTooltipModule,
                    MatDialogModule,
                    MatButtonModule,
                    MatIconModule,
                    FlexLayoutModule,
                    CommonModule
                ],
                declarations: [DeleteConfirmationComponent, ConfirmationDialogComponent],
                entryComponents: [ConfirmationDialogComponent],
                exports: [DeleteConfirmationComponent, ConfirmationDialogComponent]
            },] },
];

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamPictureManagerModule {
}
JamPictureManagerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    JamDeleteConfirmationModule,
                    MatCardModule,
                    MatProgressSpinnerModule,
                    MatTooltipModule,
                    MatButtonModule,
                    MatProgressSpinnerModule,
                    MatDividerModule,
                    MatIconModule,
                    NgxUploaderModule,
                    FlexLayoutModule,
                    CommonModule
                ],
                declarations: [UploadComponent, PictureManagerComponent, GalleryManagerComponent],
                exports: [PictureManagerComponent, GalleryManagerComponent]
            },] },
];

class ChipsAutocompleteComponent {
    constructor() {
        this.page = {
            number: 1,
            size: 50
        };
        this.trackById = trackById;
        this.addOnBlur = true;
        this.selectable = true;
        this.removable = true;
        this.collectionArray = [];
        this.formControl = new FormControl();
    }
    ngOnInit() {
        this.collection = this.service.newCollection();
        this.collection_relationships = this.resource.relationships[this.relationAlias];
        this.filteredCollection = this.formControl.valueChanges.pipe(filterOrRequest({
            attribute_to_search: this.attributesDisplay[0],
            resourcesArray: this.collectionArray,
            getAllFc: this.getAll.bind(this),
            last_filter_value: this.collectionArrayLastFilterValue,
            collection: this.collection,
            page_size: this.page.size
        }));
    }
    getAll(search_text) {
        if (search_text) {
            this.remoteFilter = Object.assign({}, this.remoteFilter, { [this.attributesDisplay[0]]: search_text });
            return this.service
                .all({
                remotefilter: this.remoteFilter,
                page: { number: 1, size: this.page.size }
            });
        }
        return this.service
            .all({
            remotefilter: this.remoteFilter,
            page: { number: 1, size: this.page.size }
        });
    }
    filterCollection(search_text) {
        const filterValue = typeof search_text === 'string' ? search_text.toLowerCase() : '';
        return this.collection.data.filter((resource) => resource.attributes[this.attributesDisplay[0]]
            .toLowerCase()
            .indexOf(filterValue) >= 0);
    }
    addResource(resource) {
        this.resource.addRelationship(resource, this.relationAlias);
        this.resourceInput.nativeElement.value = '';
        this.formControl.setValue(null);
    }
    displayName(resource) {
        return '';
    }
    removeResource(resource) {
        this.resource.removeRelationship(this.relationAlias, resource.id);
    }
}
ChipsAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-chips-autocomplete',
                template: `<mat-form-field [style.width.%]="'100'" [appearance]="appearance">
    <mat-label *ngIf="matLabel">{{ matLabel }}</mat-label>
    <mat-chip-list #chipList>
        <mat-chip
            *ngFor="let resource_resource of collection_relationships.data; trackBy: collection_relationships.trackBy"
            [selectable]="selectable"
            [removable]="removable"
            (removed)="removeResource(resource_resource)">
            {{ resource_resource.attributes[attributesDisplay[0]] }}
        <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
        </mat-chip>
        <input
            [placeholder]="placeholder || ''"
            #resourceInput
            [formControl]="formControl"
            [matAutocomplete]="auto"
            [matChipInputFor]="chipList"
            [matChipInputAddOnBlur]="addOnBlur">
    </mat-chip-list>

    <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete" (optionSelected)="addResource($event.option.value)">
        <ng-container *ngFor="let resource of filteredCollection | async; trackBy: trackById">
            <mat-option *ngIf="!collection_relationships.find(resource.id)" [value]="resource">
                <div fxLayout="row" fxLayoutAlign="start center">
                    <mat-icon class="layout-margin">person</mat-icon>
                    <strong>{{ resource.attributes[attributesDisplay[0]] }}</strong>
                    &nbsp;
                    <small fxLayout="row" fxLayoutAlign="start center" *ngFor="let attribute_name of attributesDisplay; let attr_id = index">
                        <span *ngIf="attr_id >= 1">| {{ resource.attributes[attribute_name] }}</span>
                    </small>
                </div>
            </mat-option>
        </ng-container>
    </mat-autocomplete>
</mat-form-field>
`
            },] },
];
/** @nocollapse */
ChipsAutocompleteComponent.ctorParameters = () => [];
ChipsAutocompleteComponent.propDecorators = {
    resourceInput: [{ type: ViewChild, args: ['resourceInput',] }],
    placeholder: [{ type: Input }],
    resource: [{ type: Input }],
    remoteFilter: [{ type: Input }],
    service: [{ type: Input }],
    relationAlias: [{ type: Input }],
    attributesDisplay: [{ type: Input }],
    appearance: [{ type: Input }],
    matLabel: [{ type: Input }],
    page: [{ type: Input }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamChipsAutocompleteModule {
}
JamChipsAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    FlexLayoutModule,
                    ReactiveFormsModule,
                    MatAutocompleteModule,
                    MatFormFieldModule,
                    MatOptionModule,
                    MatChipsModule,
                    MatIconModule,
                    CommonModule
                ],
                declarations: [ChipsAutocompleteComponent],
                exports: [ChipsAutocompleteComponent]
            },] },
];

/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class EditTextAttributeDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.text_value = '';
        if (!data.accept) {
            data.accept = 'Aceptar';
        }
    }
    onKeyUp(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            this.updateAttributeAndClose(this.data.attribute, this.text_value);
        }
    }
    updateAttributeAndClose(attribute, value) {
        this.data.resource.attributes[attribute] = value;
        this.dialogRef.close(true);
    }
}
EditTextAttributeDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-edit-text-attribute',
                template: `<form name="myForm" novalidate (ngSubmit)="updateAttributeAndClose(data.attribute, text_value)">
    <h2 *ngIf="data.title" mat-dialog-title [innerHtml]="data.title"></h2>
    <mat-dialog-content>
        <p *ngIf="data.message">{{ data.message }}</p>
        <mat-form-field
            appearance="outline"
            fxFlex
        >
            <mat-label>{{ data.textarea_label }}</mat-label>
            <textarea maxlength="140"
                name="text_attribute"
                type="text"
                #textarea
                [(ngModel)]="text_value"
                matInput
            ></textarea>
            <mat-hint align="end">{{textarea.value.length}} / 140</mat-hint>
        </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
        <jam-submit
            (cancel)="dialogRef.close()"
            [submitLabel]="data.accept"
        ></jam-submit>
    </mat-dialog-actions>
</form>
`
            },] },
];
/** @nocollapse */
EditTextAttributeDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
EditTextAttributeDialogComponent.propDecorators = {
    onKeyUp: [{ type: HostListener, args: ['window: keyup', ['$event'],] }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamEditTextAttributeModule {
}
JamEditTextAttributeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    MatTooltipModule$1,
                    MatDialogModule$1,
                    MatButtonModule$1,
                    MatFormFieldModule$1,
                    MatIconModule$1,
                    MatInputModule,
                    FlexLayoutModule,
                    JamSubmitModule,
                    CommonModule
                ],
                declarations: [EditTextAttributeDialogComponent],
                entryComponents: [EditTextAttributeDialogComponent],
                exports: [EditTextAttributeDialogComponent]
            },] },
];

/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class TopWarningService {
    constructor() {
        this.warnings = [];
    }
    /**
     * Receives a warning resource.
     *
     * @param warning
     */
    setWarningMessage(warning) {
        if (!warning)
            return;
        if (this.warnings.length <= 0) {
            this.warnings.push(warning);
        }
        let search_warning = this.warnings.find(msj_warning => msj_warning.id === warning.id);
        if (!search_warning || search_warning.id !== warning.id) {
            this.warnings.push(warning);
        }
    }
    getWarningMessage() {
        return this.warnings;
    }
    clearMessage(warning_keys) {
        for (let warning of this.warnings) {
            if (!warning_keys.includes(warning.id))
                continue;
            let index = this.warnings.indexOf(warning);
            this.warnings.splice(index, 1);
        }
    }
}
TopWarningService.decorators = [
    { type: Injectable },
];

class TopWarningComponent {
    constructor(topWarningService) {
        this.topWarningService = topWarningService;
        this.opened = true;
        this.button_state = 'standby';
        this.button_icons = {
            expanded: 'keyboard_arrow_down',
            contracted: 'keyboard_arrow_up',
            standby: 'remove'
        };
        this.defaultAccordionState();
    }
    onMouseEnter() {
        this.opened ? this.button_state = 'contracted' : this.button_state = 'expanded';
    }
    onMouseLeave() {
        this.button_state = 'standby';
    }
    toggleOpenAccordion(opened) {
        this.opened = opened;
        localStorage.setItem('opened', this.opened.toString());
    }
    defaultAccordionState() {
        this.opened = localStorage.getItem('opened') === 'false' ? false : true;
    }
}
TopWarningComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-top-warning',
                template: `<mat-accordion *ngIf="topWarningService.warnings.length > 0">
    <mat-expansion-panel id="rsTopWarning" class="yellow-bg-400"
        [expanded]="opened"
        [ngClass]="opened ? 'hidden-header' : ''"
        [hideToggle]="true"
        (expandedChange)="toggleOpenAccordion($event)">
        <mat-expansion-panel-header *ngIf="!opened">
            <mat-panel-description fxLayout="column" fxLayoutAlign="end center">
                <mat-icon>{{ button_icons[button_state] }}</mat-icon>
            </mat-panel-description>
        </mat-expansion-panel-header>
        <div fxLayout="column" class="text-center">
            <div *ngFor="let warn of topWarningService.warnings">
                <jam-single-warning
                    [message]="warn.attributes.message"
                    [link]="warn.attributes.link"
                    [linkQueryParams]="warn.attributes.linkQueryParams"
                    [externalLink]="warn.attributes.externalLink"
                    [linkText]="warn.attributes.linkText"
                    >
                </jam-single-warning>
                <mat-divider></mat-divider>
            </div>
            <div [style.cursor]="'pointer'" class="action-button" fxLayout="column" fxLayoutAlign="center center"
                (click)="opened = false">
                <button mat-icon-button>
                    <mat-icon *ngIf="opened"
                    >{{ button_icons[button_state] }}</mat-icon>
                </button>
            </div>
        </div>
    </mat-expansion-panel>
</mat-accordion>
`,
                styles: [`.yellow-bg-400{background:#ffee58}.overlay{z-index:999}.text-center{text-align:center}mat-expansion-panel-header{height:15px!important}:host /deep/ .mat-expansion-panel-body{padding-bottom:0}mat-divider{border-color:#fbc02d!important}mat-icon{color:#757575}.action-button{height:24px}`]
            },] },
];
/** @nocollapse */
TopWarningComponent.ctorParameters = () => [
    { type: TopWarningService }
];
TopWarningComponent.propDecorators = {
    opened: [{ type: Input }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};

/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class SingleWarningComponent {
    constructor() {
        this.actionButtonClick = new EventEmitter();
        this.actionIconButtonClick = new EventEmitter();
        this.custom_styles = {};
    }
    ngOnInit() {
        if (this.backgroundColor) {
            this.custom_styles['background-color'] = this.backgroundColor;
        }
        if (this.textColor) {
            this.custom_styles.color = this.textColor;
        }
    }
}
SingleWarningComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-single-warning',
                template: `<mat-card class="mat-card-flat yellow-bg-400 width-100"
    *ngIf="message"
    [ngStyle]="custom_styles"
>
    <span>{{ message }}</span>
    <a
        [routerLink]="link"
        [queryParams]="linkQueryParams || {}"
        *ngIf="link"
        >
        {{ linkText || 'Más información' }}
    </a>
    <a
        [href]="externalLink"
        target="_blank"
        *ngIf="externalLink"
        >
        {{ linkText || 'Más información' }}
    </a>

    <button
        *ngIf="actionButtonText"
        mat-button
        type="button"
        name="button"
        (click)="actionButtonClick.emit()"
        >
        {{ actionButtonText }}
    </button>
    <button
        *ngIf="actionIconButton"
        mat-icon-button
        [matTooltip]="actionIconButtonTooltip"
        type="button"
        name="button"
        (click)="actionIconButtonClick.emit()"
        >
        <mat-icon>
            {{ actionIconButton }}
        </mat-icon>
    </button>
</mat-card>
`,
                styles: [`.yellow-bg-400{box-sizing:border-box;background:#ffee58;color:#212121}`]
            },] },
];
SingleWarningComponent.propDecorators = {
    message: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    textColor: [{ type: Input }],
    link: [{ type: Input }],
    linkQueryParams: [{ type: Input }],
    externalLink: [{ type: Input }],
    linkText: [{ type: Input }],
    actionButtonText: [{ type: Input }],
    actionIconButton: [{ type: Input }],
    actionIconButtonTooltip: [{ type: Input }],
    actionButtonClick: [{ type: Output }],
    actionIconButtonClick: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamTopWarningModule {
}
JamTopWarningModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatFormFieldModule,
                    MatExpansionModule,
                    MatCardModule,
                    MatIconModule,
                    FlexLayoutModule,
                    MatButtonModule,
                    MatDividerModule,
                    // ReactiveFormsModule,
                    MatTooltipModule$1,
                    FormsModule,
                    RouterModule,
                    CommonModule
                ],
                declarations: [TopWarningComponent, SingleWarningComponent],
                providers: [TopWarningService],
                exports: [TopWarningComponent, SingleWarningComponent]
            },] },
];

class DialogLoggedStateComponent {
    constructor(thisDialogRef) {
        this.thisDialogRef = thisDialogRef;
    }
    onCloseConfirm() {
        this.thisDialogRef.close('Confirm');
    }
    onCloseCancel() {
        this.thisDialogRef.close('Cancel');
    }
}
DialogLoggedStateComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-dialog-logged-state',
                template: `<h3 mat-dialog-title>Tu sesión se ha cerrado.</h3>
<hr>
<mat-dialog-content>
    <p>Es necesario que vuelvas a ingresar tu usuario y contraseña. ¡Vamos a ello!</p>
</mat-dialog-content>
<mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
    <jam-submit (accept)="onCloseConfirm()" [noCancel]="true" submitLabel="Aceptar"></jam-submit>
</mat-dialog-actions>
`
            },] },
];
/** @nocollapse */
DialogLoggedStateComponent.ctorParameters = () => [
    { type: MatDialogRef }
];

class JamErrorHandler extends ErrorHandler {
    constructor(ngZone, matDialog, toasterService) {
        super();
        this.ngZone = ngZone;
        this.matDialog = matDialog;
        this.toasterService = toasterService;
        this.lastErrorCached = { title: '', time: 0 };
        this.show_angular_errors = true;
    }
    handleError(error) {
        if (error.status === 404) {
            this.Notification('Error al contactar con el servidor, intenta nuevamente más tarde.');
            return;
        }
        if (error.status === 500 || error.message && error.message === 'Server Error') {
            this.unhandledError(error.status);
            return;
        }
        if (error.errors) {
            this.handleJsonapiErrors(error);
            return;
        }
        if (error.rejection) {
            // this first case is for guest module rejections
            if (error.rejection.error && error.rejection.error.errors)
                this.handleJsonapiErrors(error.rejection.error);
            if (error.rejection.errors)
                this.handleJsonapiErrors(error.rejection);
            console.error('Rejection:', error.rejection);
            return;
        }
        if (error.status) {
            this.unhandledError(error.status);
        }
        else if (error.message && this.show_angular_errors) {
            this.unhandledError(error.message);
        }
        super.handleError(error);
    }
    handleJsonapiErrors(error, use_error_cache = true) {
        for (let actual_error of error.errors) {
            if (use_error_cache) {
                // si es ultimo mensaje recibido y solo han pasado 2 segundos, no muestra error
                if (this.lastErrorCached.title === actual_error.title && this.lastErrorCached.time > Date.now() - 2000)
                    return;
                this.lastErrorCached.title = actual_error.title;
                this.lastErrorCached.time = Date.now();
            }
            switch (actual_error.title) {
                case 'Internal server error':
                    this.Notification(actual_error.detail, 'error');
                    return;
                case 'Bad request':
                    if (actual_error.detail.includes('Token required')) {
                        this.ngZone.run(() => __awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                        return;
                    }
                    break;
                case 'Invalid data received':
                    if (actual_error.detail === 'The refresh token must be at least 20 characters.') {
                        this.ngZone.run(() => __awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                        return;
                    }
                    break;
                case 'Token has expired':
                case 'Token not provided':
                    this.ngZone.run(() => __awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                    return;
                case 'Too many attempts':
                    this.Notification('Has agotado el límite de intentos, espera un momento antes de continuar.', 'error');
                    return;
            }
            // cannot use special conditions to SWITCH statement without changing the data inside switch to "true"
            if (actual_error.detail.includes('Token required')) {
                this.ngZone.run(() => __awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                return;
            }
            switch (actual_error.detail) {
                case 'Expired access token.':
                case 'The refresh token is invalid. Cannot decrypt the refresh token':
                case 'Invalid access token':
                    this.ngZone.run(() => __awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                    return;
            }
            this.singleError(actual_error);
        }
    }
    logOut() {
        if (this.token_dialog_is_open) {
            return;
        }
        this.token_dialog_is_open = true;
        const dialog_ref = this.matDialog.open(DialogLoggedStateComponent, {
            width: '600px',
            disableClose: true
        });
        dialog_ref.afterClosed().subscribe(success => {
            this.token_dialog_is_open = false;
            this.globalStateService.logout();
        });
    }
    setForm(form) {
        this.form = form;
    }
    Notification(title, type, body) {
        let messages = title.split('|');
        type = type || 'error';
        if (messages.length === 1) {
            this.toasterService.pop(type, title, body);
            return;
        }
        for (let each of messages) {
            if (each !== '\n') {
                this.toasterService.pop(type, each);
            }
        }
    }
    singleError(error) {
        if (!error.detail && !error.title) {
            console.warn('Error cant be handled:', error);
            return;
        }
        if (this.form && error.source && this.form.get(error.source.attribute)) {
            this.form.get(error.source.attribute).setErrors({ 'server-error': error.detail });
        }
        else {
            this.Notification(error.detail || error.title);
        }
    }
    unhandledError(message) {
        this.Notification('Ups, ha ocurrido un error. Contáctanos por correo a soporte@multinexo.com', 'error', `Código de error: ${message}`);
    }
}
JamErrorHandler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
JamErrorHandler.ctorParameters = () => [
    { type: NgZone },
    { type: MatDialog },
    { type: ToasterService }
];

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamErrorHandlerModule {
}
JamErrorHandlerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatDialogModule,
                    MatButtonModule,
                    FlexLayoutModule,
                    JamSubmitModule,
                    CommonModule
                ],
                declarations: [DialogLoggedStateComponent],
                providers: [JamErrorHandler],
                entryComponents: [DialogLoggedStateComponent],
                exports: [DialogLoggedStateComponent]
            },] },
];

const start_time = [0, 0, 0];
const end_time = [23, 59, 59];
class RangeDatepickerComponent {
    constructor(datePipe) {
        this.datePipe = datePipe;
        this.startDateChange = new EventEmitter();
        this.endDateChange = new EventEmitter();
        this.updateDate = new EventEmitter();
    }
    ngOnInit() {
        this.label = 'Rango de fecha';
    }
    onDateInput(event) {
        this.lastDateInput = event.value;
        this.updateDateChange(this.lastDateInput.begin, this.lastDateInput.end);
    }
    onDateChange(event) {
        this.lastDateChange = event.value;
        this.updateDateChange(this.lastDateChange.begin, this.lastDateChange.end);
    }
    applyCustomRange(event, picker) {
        event.stopPropagation();
        picker.open();
    }
    applyLastWeek() {
        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setDate(this.endDate.getDate() - 6);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    }
    applyToday() {
        this.startDate = this.endDate = new Date();
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    }
    applyCurrentMonth() {
        let today = new Date();
        this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    }
    clearRange(event) {
        event.stopPropagation();
        this.date = null;
        this.updateDateChange(null, null);
        this.label = 'Rango de fecha';
    }
    applylastMonth() {
        let today = new Date();
        this.startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        this.endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    }
    updateDateChange(start_date, end_date) {
        this.startDate = start_date;
        this.endDate = end_date;
        this.label = this.togglePreviewText(start_date, end_date);
        this.startDateChange.emit(this.formatDateAndAddTime(start_date, start_time));
        this.endDateChange.emit(this.formatDateAndAddTime(end_date, end_time));
        this.updateDate.emit();
    }
    togglePreviewText(start_date, end_date) {
        if (start_date && end_date) {
            return this.createPreviewText(start_date, end_date).toUpperCase();
        }
        if (start_date) {
            return this.getDays(start_date).toUpperCase();
        }
        if (end_date) {
            return this.getDays(end_date).toUpperCase();
        }
    }
    getDays(date) {
        let today = new Date();
        if (date.getDate() === today.getDate()) {
            return 'hoy';
        }
        return this.datePipe.transform(date, 'dd MMM yyyy');
    }
    createPreviewText(start_date, end_date) {
        if (start_date.getFullYear() !== end_date.getFullYear()) {
            return (this.datePipe.transform(start_date, 'dd MMM yyyy - ') +
                this.datePipe.transform(end_date, 'dd MMM yyyy'));
        }
        if (start_date.getMonth() === end_date.getMonth()) {
            if (this.compareDaysOfTheSameMonth())
                return this.getDays(start_date);
            return (this.datePipe.transform(start_date, 'dd - ') +
                this.datePipe.transform(end_date, 'dd') +
                this.datePipe.transform(end_date, ' MMM yyyy'));
        }
        return (this.datePipe.transform(start_date, 'dd MMM - ') +
            this.datePipe.transform(end_date, 'dd MMM') +
            this.datePipe.transform(end_date, ' yyyy'));
    }
    compareDaysOfTheSameMonth() {
        if (this.startDate.getDate() === this.endDate.getDate())
            return true;
    }
    formatDateAndAddTime(date, time) {
        date.setHours(time[0], time[1], time[2]);
        return date;
    }
}
RangeDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-range-datepicker',
                template: `<mat-form-field [matTooltip]="label">
    <mat-select [placeholder]="label">
        <mat-option (click)="applyCustomRange($event, resultPicker); $event.stopPropagation()" fxLayout="row" fxLayoutAlign="space-between center">
            <sat-datepicker-toggle matPrefix [for]="resultPicker"></sat-datepicker-toggle>
            <input matInput
                placeholder="Rango personalizado"
                #resultPickerModel="ngModel"
                [satDatepicker]="resultPicker"
                [(ngModel)]="date"
                (dateInput)="onDateInput($event)"
                (dateChange)="onDateChange($event)">
            <sat-datepicker
                [disabled]="false"
                #resultPicker [rangeMode]="true">
            </sat-datepicker>

            <div matSuffix fxFlex="10">
                <button mat-icon-button matTooltip="Limpiar filtro" (click)="clearRange($event)">
                    <mat-icon>clear</mat-icon>
                </button>
            </div>
        </mat-option>

        <mat-option (click)="applyToday()">Hoy</mat-option>
        <mat-option (click)="applyLastWeek()">Última semana</mat-option>
        <mat-option (click)="applyCurrentMonth()">Este mes</mat-option>
        <mat-option (click)="applylastMonth()">El mes pasado</mat-option>
    </mat-select>
</mat-form-field>
`,
                providers: [DatePipe],
                styles: [`mat-form-field{font-size:15px}`]
            },] },
];
/** @nocollapse */
RangeDatepickerComponent.ctorParameters = () => [
    { type: DatePipe }
];
RangeDatepickerComponent.propDecorators = {
    startDate: [{ type: Input }],
    endDate: [{ type: Input }],
    startDateChange: [{ type: Output }],
    endDateChange: [{ type: Output }],
    updateDate: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamRangeDatepickerModule {
}
JamRangeDatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    SatNativeDateModule,
                    SatDatepickerModule,
                    ReactiveFormsModule,
                    MatFormFieldModule,
                    MatOptionModule,
                    MatButtonModule,
                    MatSelectModule,
                    MatTooltipModule,
                    MatIconModule,
                    CommonModule
                ],
                declarations: [RangeDatepickerComponent],
                exports: [RangeDatepickerComponent]
            },] },
];

class FabSpeedDialComponent {
    constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.animationMode = 'scale';
        this.tooltip = '';
        this.spin = true;
        this.icon = 'add';
        this.routerLink = [];
        this.fabSpeedDialMiniButtons = [];
        this.fabSpeedDialClick = new EventEmitter();
        this.actionsClick = new EventEmitter();
        this.fab_status = {
            opened: false,
            status: 'closed'
        };
    }
    ngOnInit() {
        if (!this.queryParams) {
            this.queryParams = this.activatedRoute.snapshot.queryParams;
        }
    }
    toggleFabStatus(status) {
        if (status === 'open') {
            this.fab_status.status = 'opened';
            this.fab_status.opened = true;
        }
        else {
            this.fab_status.status = 'closed';
            setTimeout(() => {
                if (this.fab_status.status === 'closed') {
                    this.fab_status.opened = false;
                }
            }, 300);
        }
    }
}
FabSpeedDialComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-fab-speed-dial',
                template: `<eco-fab-speed-dial
    class="rs-speed-dial--position"
    [animationMode]="animationMode"
    (mouseover)="toggleFabStatus('open')"
    (mouseleave)="toggleFabStatus('close')"
    [(open)]="fab_status.opened"
    [fixed]="true"
    >
    <eco-fab-speed-dial-trigger [spin]="spin">
        <button
            mat-fab
            matTooltipPosition="before"
            [matTooltip]="tooltip"
            (click)="fabSpeedDialClick.emit()"
            [routerLink]="routerLink || []"
            [queryParams]="queryParams"
            >
            <mat-icon>{{ fab_status.opened ? icon : 'add' }}</mat-icon>
        </button>
    </eco-fab-speed-dial-trigger>

    <eco-fab-speed-dial-actions [hidden]="!fab_status.opened">
        <button
            *ngFor="let fabSpeedDialMiniButton of fabSpeedDialMiniButtons"
            mat-mini-fab
            matTooltipPosition="before"
            [matTooltip]="fabSpeedDialMiniButton.tooltip"
            (click)="actionsClick.emit(fabSpeedDialMiniButton.key)"
            [routerLink]="fabSpeedDialMiniButton.router_link || []"
            [queryParams]="fabSpeedDialMiniButton.query_params || queryParams"
            >
            <mat-icon *ngIf="fabSpeedDialMiniButton.icon.type === 'svg-icon'" [svgIcon]="fabSpeedDialMiniButton.icon.name"></mat-icon>
            <mat-icon *ngIf="fabSpeedDialMiniButton.icon.type === 'mat-icon'">{{ fabSpeedDialMiniButton.icon.name }}</mat-icon>
        </button>
    </eco-fab-speed-dial-actions>
</eco-fab-speed-dial>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
FabSpeedDialComponent.ctorParameters = () => [
    { type: ActivatedRoute }
];
FabSpeedDialComponent.propDecorators = {
    animationMode: [{ type: Input }],
    tooltip: [{ type: Input }],
    spin: [{ type: Input }],
    icon: [{ type: Input }],
    routerLink: [{ type: Input }],
    queryParams: [{ type: Input }],
    fabSpeedDialMiniButtons: [{ type: Input }],
    fabSpeedDialClick: [{ type: Output }],
    actionsClick: [{ type: Output }]
};

class FabSpeedDialMiniButton {
    constructor(key, tooltip, router_link, query_params) {
        this.navigate = false;
        this.icon = { name: 'add', type: 'mat-icon' };
        this.key = key;
        this.tooltip = tooltip;
        if (router_link) {
            this.router_link = router_link;
            this.query_params = query_params || {};
        }
    }
    setRouterLink(router_link) {
        this.router_link = router_link;
        this.navigate = true;
        return this;
    }
    getRouterLink() {
        return this.router_link;
    }
    setQueryParams(query_params) {
        this.query_params = query_params;
        return this;
    }
    getQueryParams() {
        return this.query_params;
    }
    shouldNavigate() {
        return this.navigate;
    }
}

class FabSpeedDialModule {
}
FabSpeedDialModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, RouterModule, EcoFabSpeedDialModule, MatIconModule$1, MatTooltipModule$1, MatButtonModule$1],
                declarations: [FabSpeedDialComponent],
                exports: [FabSpeedDialComponent]
            },] },
];

/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class JamRefreshService {
    constructor() {
        this.collection_to_refresh = new Subject();
        this.refreshSubject = new Subject();
    }
    refresh() {
        this.refreshSubject.next(true);
    }
}
JamRefreshService.decorators = [
    { type: Injectable },
];
class RefreshComponent {
    constructor(changeDetectorRef, jamRefreshService) {
        this.changeDetectorRef = changeDetectorRef;
        this.jamRefreshService = jamRefreshService;
        this.colorProgressCircular = 'white';
        this.reload = new EventEmitter();
        this.destroyer = new Destroyer();
    }
    ngOnInit() {
        if (!this.collectionToRefresh) {
            this.jamRefreshService.collection_to_refresh.pipe(this.destroyer.pipe()).subscribe((collection) => {
                this.collectionToRefresh = collection;
                this.changeDetectorRef.detectChanges();
            });
        }
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    refreshCollection() {
        this.serviceToRefresh.clearCacheMemory();
        this.jamRefreshService.refresh();
    }
}
RefreshComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-refresh',
                template: `<button
    *ngIf="collectionToRefresh"
    mat-icon-button
    matTooltip="Actualizar"
    mat-ink-ripple="false"
    class="mat-icon-button mat-button"
    (click)="refreshCollection()"
    fxLayout="row"
    fxLayoutAlign="center center"
    >
    <mat-icon
        *ngIf="!collectionToRefresh.is_loading"
        class="material-icons"
        >
        {{ icon || 'refresh' }}
    </mat-icon>
    <mat-spinner
        class="material-icons elements-up padding-0 margin-0"
        *ngIf="collectionToRefresh.is_loading"
        color="accent"
        diameter="24"
        >
    </mat-spinner>
</button>
`
            },] },
];
/** @nocollapse */
RefreshComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: JamRefreshService }
];
RefreshComponent.propDecorators = {
    collectionToRefresh: [{ type: Input }],
    serviceToRefresh: [{ type: Input }],
    colorProgressCircular: [{ type: Input }],
    icon: [{ type: Input }],
    reload: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamRefreshModule {
}
JamRefreshModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatProgressSpinnerModule,
                    MatButtonModule,
                    MatTooltipModule,
                    FlexLayoutModule,
                    MatIconModule
                ],
                providers: [JamRefreshService],
                declarations: [RefreshComponent],
                exports: [RefreshComponent]
            },] },
];

class MenuElement {
    constructor(id) {
        this.attributes = {};
        this._id = id;
    }
    get id() { return this._id; }
    setAttributes(attribute, value) {
        this.attributes[attribute] = value;
        return this;
    }
    addAttributes(attributes) {
        this.attributes = Object.assign({}, this.attributes, attributes);
        return this;
    }
    hide() {
        this.attributes.hidden = true;
        return this;
    }
    show() {
        this.attributes.hidden = false;
        return this;
    }
    isShown() {
        return !this.attributes.hidden;
    }
    disable() {
        this.attributes.disabled = true;
        return this;
    }
    enable() {
        this.attributes.disabled = false;
        return this;
    }
}
class MenuElementsCollection {
    constructor(id) {
        this.data = [];
        this._id = id;
    }
    get id() { return this._id; }
    hide() {
        this.hidden = true;
        return this;
    }
    show() {
        this.hidden = false;
        return this;
    }
    isShown() {
        return !this.hidden;
    }
    find(id) {
        return this.data.find(element => {
            if (this.data.length === 0) {
                console.log('--------------- no data! ---------------');
                return false;
            }
            return element.id === id;
        });
    }
    add(data) {
        this.data = this.data.concat(data);
        return this;
    }
}

class Menu extends MenuElementsCollection {
    constructor() {
        super(...arguments);
        this.data = [];
        this.findSection = this.find;
        this.addSections = this.add;
    }
    removeEmptySections() {
        for (let section of this.data) {
            if (section.hasShownElements()) {
                return true;
            }
        }
        return false;
    }
    setMainImage(image_data) {
        this.main_image = image_data;
        return this;
    }
}

class Section extends MenuElementsCollection {
    constructor() {
        super(...arguments);
        this.findButton = this.find;
        this.addButtons = this.add;
    }
    hasShownElements() {
        for (let element of this.data) {
            if (element.isShown()) {
                return true;
            }
        }
        return false;
    }
}

class Button extends MenuElement {
    constructor() {
        super(...arguments);
        this.attributes = {
            icon: '',
            label: '',
            class: '',
            disabled: false,
            hidden: false
        };
    }
    setAttributes(attribute, // TODO: improve typing
    value) {
        this.attributes[attribute] = value;
        return this;
    }
    addAttributes(attributes) {
        this.attributes = Object.assign({}, this.attributes, attributes);
        return this;
    }
}

class DropdownMenuComponent {
    constructor() {
        this.selected = new EventEmitter();
    }
}
DropdownMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-dropdown-menu',
                styles: [`/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}`],
                template: `<button
    mat-icon-button
    class="mat-icon-button mat-button"
    matTooltip="Más"
    fxLayout="row"
    fxLayoutAlign="center center"
    [matMenuTriggerFor]="menuRef"
    >
    <img
        *ngIf="main_image"
        [src]="main_image?.url"
        [ngStyle]="main_image?.styles"
        />
    <mat-icon *ngIf="!main_image">more_vert</mat-icon>
</button>

<mat-menu #menuRef="matMenu">
    <ng-container *ngFor="let section of sections; let position = index">
        <mat-divider *ngIf="section.hasShownElements() && !section.hidden && position > 0"></mat-divider>

        <h3 class="mat-hint" *ngIf="section.hasShownElements() && !section.hidden && section.id">
            <span [innerHtml]="section.id"></span>
        </h3>

        <ng-container *ngFor="let button of section.data">
            <button
                mat-menu-item
                *ngIf="!button.attributes.hidden"
                [disabled]="button.attributes.disabled"
                [ngClass]="button.attributes.class"
                (click)="selected.emit(button.id)"
                >
                <mat-icon
                    *ngIf="button.attributes.icon"
                    [innerHtml]="button.attributes.icon"
                    >
                </mat-icon>
                <mat-icon
                    *ngIf="button.attributes.svg_icon"
                    [svgIcon]="button.attributes.svg_icon"
                    >
                </mat-icon>
                <span [innerHtml]="button.attributes.label"></span>
            </button>
        </ng-container>
    </ng-container>
</mat-menu>
`
            },] },
];
DropdownMenuComponent.propDecorators = {
    sections: [{ type: Input }],
    main_image: [{ type: Input }],
    selected: [{ type: Output }]
};

class BottomSheetComponent {
    constructor(data, matBottomSheetRef) {
        this.data = data;
        this.matBottomSheetRef = matBottomSheetRef;
    }
    close() {
        this.matBottomSheetRef.dismiss();
    }
    selected(option) {
        this.matBottomSheetRef.dismiss(option);
    }
}
BottomSheetComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-bottom-sheet',
                styles: [`/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}`],
                template: `<ng-template matMenuContent>
    <mat-nav-list>
        <ng-container *ngFor="let section of data.sections; let position = index">
            <h3 class="mat-hint" *ngIf="!section.hidden || section.id">
                <span [innerHtml]="section.id"></span>
            </h3>

            <ng-container *ngFor="let button of section.data">
                <mat-list-item *ngIf="!button.attributes.hidden"
                    [ngClass]="button.attributes.class + (button.attributes.disabled ? 'disabled' : null)"
                    (click)="button.attributes.disabled ? $event.stopPropagation() : selected(button.id)">
                    <mat-icon
                        *ngIf="button.attributes.icon || button.attributes.svg_icon"
                        [innerHtml]="button.attributes.icon"
                        [svgIcon]="button.attributes.svg_con"
                         class="mat-hint"
                        >
                    </mat-icon>
                    <span mat-line [innerHtml]="button.attributes.label"></span>
                </mat-list-item>
            </ng-container>

            <mat-divider *ngIf="(position + 1) < data.sections.length"></mat-divider>
        </ng-container>
    </mat-nav-list>
</ng-template>
`
            },] },
];
/** @nocollapse */
BottomSheetComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [MAT_BOTTOM_SHEET_DATA,] }] },
    { type: MatBottomSheetRef }
];

class MenuComponent {
    constructor(matBottomSheet) {
        this.matBottomSheet = matBottomSheet;
        this.selected = new EventEmitter();
        this.destroyer = new Destroyer();
    }
    ngOnInit() {
        if (this.menu.main_image && !this.menu.main_image.styles) {
            this.menu.main_image.styles = { 'border-radius': '100px', width: '40px', height: '40px' };
        }
        this.menu.removeEmptySections();
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    open() {
        this.matBottomSheet.open(BottomSheetComponent, {
            data: { sections: this.menu.data }
        })
            .afterDismissed()
            .pipe(this.destroyer.pipe(), filter(response => ![null, undefined, ''].includes(response)))
            .subscribe(response => this.selected.emit(this.formatEmission(response)));
    }
    selectedOption(selected) {
        this.selected.emit(this.formatEmission(selected));
    }
    formatEmission(response) {
        return { key: response, data: this.source_data || null };
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-menu',
                styles: [`/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}`],
                template: `<jam-dropdown-menu
    [sections]="menu.data"
    [main_image]="menu.main_image"
    (selected)="selectedOption($event)"
></jam-dropdown-menu>

<div class="jam-bottom-sheet">
    <button
        mat-icon-button
        class="mat-button mat-icon-button"
        matTooltip="Más"
        fxLayout="row"
        fxLayoutAlign="center center"
        (click)="open()">
        <img *ngIf="menu.main_image?.url" [src]="menu.main_image?.url" [ngStyle]="menu.main_image?.styles"/>
        <mat-icon *ngIf="!menu.main_image?.url">more_vert</mat-icon>
    </button>
</div>
`
            },] },
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [
    { type: MatBottomSheet }
];
MenuComponent.propDecorators = {
    menu: [{ type: Input }],
    source_data: [{ type: Input }],
    selected: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamMenuModule {
}
JamMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FlexLayoutModule,
                    MatMenuModule,
                    MatIconModule,
                    MatListModule,
                    MatDividerModule,
                    MatTooltipModule,
                    MatBottomSheetModule,
                    CommonModule
                ],
                declarations: [MenuComponent, DropdownMenuComponent, BottomSheetComponent],
                entryComponents: [BottomSheetComponent],
                exports: [MenuComponent]
            },] },
];

/** This's component @deprecated */
class FloatingButtonComponent {
}
FloatingButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-floating-button',
                styles: [`a.mat-fab{position:fixed;bottom:24px;right:24px;z-index:333}`],
                template: `<a
    mat-fab href
    *ngIf="show || true"
    [matTooltip]="tooltip"
    matTooltipPosition="before"
    [target]="target || '_self'"
    [routerLink]="rsRouterLink"
    [queryParams]="rsQueryParams">
    <mat-icon style="color: white">{{ iconName ? iconName : 'add' }}</mat-icon>
</a>
`
            },] },
];
FloatingButtonComponent.propDecorators = {
    rsBackground: [{ type: Input }],
    iconName: [{ type: Input }],
    tooltip: [{ type: Input }],
    target: [{ type: Input }],
    rsRouterLink: [{ type: Input }],
    rsQueryParams: [{ type: Input }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamFloatingButtonModule {
}
JamFloatingButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    RouterModule,
                    MatTooltipModule,
                    MatIconModule
                ],
                declarations: [FloatingButtonComponent],
                exports: [FloatingButtonComponent]
            },] },
];

class DynamicInput {
    constructor(key) {
        this.key = this.id = this.name = key;
    }
    setFocus() {
        this.focus = true;
        return this;
    }
    required() {
        this.templateOptions.required = true;
        return this;
    }
    fxFlex(value) {
        this.templateOptions.fxFlex = value;
        return this;
    }
    set(property, value) {
        this[property] = value;
        return this;
    }
    setTemplateOption(property, value) {
        this.templateOptions[property] = value;
        return this;
    }
    addTemplateOptions(template_options) {
        this.templateOptions = Object.assign({}, this.templateOptions, template_options);
        return this;
    }
    setTranslatedTemplateOptions(translateService) {
        return this;
    }
    load(fieldConfig) {
        for (let key in fieldConfig) {
            this[key] = fieldConfig[key];
        }
        return this;
    }
}
class TextDynamicInput extends DynamicInput {
    constructor(key) {
        super(key);
        this.key = key;
        this.type = 'input';
        this.templateOptions = {
            placeholder: key
        };
    }
    setTranslatedTemplateOptions(translateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);
        return this;
    }
}
class NumberDynamicInput extends DynamicInput {
    constructor(key) {
        super(key);
        this.key = key;
        this.type = 'input';
        this.key = this.id = this.name = key;
        this.templateOptions = {
            type: 'number',
            step: 0.01,
            min: 0,
            placeholder: key
        };
    }
    setTranslatedTemplateOptions(translateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);
        return this;
    }
}
class CheckboxDynamicInput extends DynamicInput {
    constructor(key) {
        super(key);
        this.key = key;
        this.type = 'checkbox';
        this.templateOptions = {
            indeterminate: false,
            label: key
        };
    }
    setTranslatedTemplateOptions(translateService) {
        this.templateOptions.label = translateService.instant(this.key);
        return this;
    }
}
class TextareaDynamicInput extends DynamicInput {
    constructor(key) {
        super(key);
        this.key = key;
        this.type = 'textarea';
        this.templateOptions = {
            matAutosizeMinRows: 2,
            matAutosizeMaxRows: 150,
            label: key
        };
    }
    setTranslatedTemplateOptions(translateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);
        this.templateOptions.label = translateService.instant(this.key);
        return this;
    }
}
class SelectDynamicInput extends DynamicInput {
    constructor(key) {
        super(key);
        this.key = key;
        this.type = 'select';
        this.templateOptions = {
            label: key,
            options: []
        };
    }
    setTranslatedTemplateOptions(translateService) {
        this.templateOptions.label = translateService.instant(this.key);
        return this;
    }
    setOptions(options) {
        this.templateOptions.options = options;
        return this;
    }
}

class FormlyFormFlexComponent extends FormlyForm {
}
FormlyFormFlexComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-formly-form-flex',
                template: `
      <formly-field *ngFor="let field of fields"
        [fxFlex]="field.templateOptions.fxFlex"
        [model]="model" [form]="form"
        [field]="field"
        [ngClass]="field.className"
        [options]="options">
      </formly-field>
      <ng-content></ng-content>
  `
            },] },
];

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamDynamicFormsModule {
}
JamDynamicFormsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    FormlyModule.forRoot(),
                    FormlyMaterialModule
                ],
                declarations: [FormlyFormFlexComponent],
                exports: [FormlyFormFlexComponent]
            },] },
];

class JamTabsDirective {
    constructor(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.defaultTabIndex = 0;
        activatedRoute.queryParams.subscribe(queryParams => this.query_params = queryParams);
    }
    ngAfterViewInit() {
        this.selected_tab = this.tabNames[this.query_params.tab_selected || Object.keys(this.tabNames)[this.defaultTabIndex]];
        this.tabGroup.selectedIndex = this.selected_tab;
        this.tabGroup.selectedIndexChange.subscribe(index => this.onTabChange(index));
    }
    onTabChange(new_index) {
        let tab_selected;
        for (let each in this.tabNames) {
            if (this.tabNames[each] !== new_index)
                continue;
            tab_selected = each;
        }
        this.router.navigate([], { queryParams: Object.assign({}, this.query_params, { tab_selected: tab_selected }) });
    }
}
JamTabsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[jamTabs]'
            },] },
];
/** @nocollapse */
JamTabsDirective.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute }
];
JamTabsDirective.propDecorators = {
    tabNames: [{ type: Input }],
    tabGroup: [{ type: Input }],
    defaultTabIndex: [{ type: Input }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamTabsModule {
}
JamTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatTabsModule,
                    CommonModule
                ],
                declarations: [JamTabsDirective],
                exports: [JamTabsDirective]
            },] },
];

class RemembermeStateDirective {
    constructor(router, elementRef) {
        this.router = router;
        this.elementRef = elementRef;
        this.mat_expansion_pane_id = elementRef.nativeElement.id;
    }
    ngAfterViewInit() {
        if (localStorage.getItem(this.mat_expansion_pane_id)) {
            this.mat_expansion_panel.expanded = localStorage.getItem(this.mat_expansion_pane_id);
        }
        this.changeExpandedExpansionPanel();
    }
    onClick(event) {
        this.updateLocalStoreage();
    }
    changeExpandedExpansionPanel() {
        this.updateLocalStoreage();
    }
    updateLocalStoreage() {
        localStorage.setItem(this.mat_expansion_pane_id, this.mat_expansion_panel.expanded);
    }
}
RemembermeStateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[jamExpansionPanelStatus]'
            },] },
];
/** @nocollapse */
RemembermeStateDirective.ctorParameters = () => [
    { type: Router },
    { type: ElementRef }
];
RemembermeStateDirective.propDecorators = {
    mat_expansion_panel: [{ type: ContentChild, args: [MatExpansionPanel,] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamRememberStateModule {
}
JamRememberStateModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatExpansionModule,
                    CommonModule,
                    RouterModule
                ],
                declarations: [RemembermeStateDirective],
                exports: [RemembermeStateDirective]
            },] },
];

class FloatingInputComponent {
    constructor(router) {
        this.router = router;
        this.entryValueChange = new EventEmitter();
        this.resourceChange = new EventEmitter();
        this.searchParams = router.parseUrl(router.url);
        this.lock = this.lock || false;
    }
    statusToggle(status) {
        if (!this.lock) {
            this.status = status;
            setTimeout(() => {
                if (!status) {
                    return;
                }
                this.focusInput();
            }, 100);
        }
    }
    bindingEntryValue(value) {
        this.entryValueChange.emit(value);
    }
    keyPress(keyCode) {
        switch (keyCode) {
            case 13:
                this.status = false;
                break;
        }
    }
    focusInput() {
        let input = document.getElementById('floatingInput');
        input.focus();
    }
}
FloatingInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-floating-input',
                styles: [`mat-expansion-panel{width:auto;box-shadow:none!important;background:inherit!important;border:0!important}mat-form-field{width:100%}input[type^=number]{text-align:end}`],
                template: `<div class="floating-input" [ngClass]="status ? 'mat-elevation-z1' : ''">
    <mat-expansion-panel
        hideToggle="true"
        style="width: auto; box-shadow: none !important; background: inherit !important; border: 0 !important;"
        [disabled]="lock"
        [expanded]="status"
        (closed)="statusToggle(false)"
        (opened)="statusToggle(true)">
        <mat-expansion-panel-header *ngIf="!status">
            <mat-panel-title fxLayout="row" [fxLayoutAlign]="(horPosition || 'end')">
                <ng-content></ng-content>
            </mat-panel-title>
        </mat-expansion-panel-header>

        <mat-form-field *ngIf="status">
            <input matInput id="floatingInput" type="number" step="0.001" name="floatingNumber" aria-label="Modificar"
                [(ngModel)]="entryValue"
                (blur)="statusToggle(false)"
                (ngModelChange)="bindingEntryValue(entryValue)"
                (keydown)="keyPress($event.keyCode)"
                (focus)="status">
        </mat-form-field>
    </mat-expansion-panel>
</div>
`
            },] },
];
/** @nocollapse */
FloatingInputComponent.ctorParameters = () => [
    { type: Router }
];
FloatingInputComponent.propDecorators = {
    entryValue: [{ type: Input }],
    resource: [{ type: Input }],
    horPosition: [{ type: Input }],
    lock: [{ type: Input }],
    entryValueChange: [{ type: Output }],
    resourceChange: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamFloatingInputModule {
}
JamFloatingInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    MatFormFieldModule,
                    MatExpansionModule,
                    MatInputModule$1,
                    MatCardModule,
                    MatButtonModule,
                    MatIconModule,
                    FlexLayoutModule,
                    CommonModule
                ],
                declarations: [FloatingInputComponent],
                exports: [FloatingInputComponent]
            },] },
];

/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class FilterConfig {
}

class JsonapiFilterRangedateConfig extends FilterConfig {
    constructor() {
        super(...arguments);
        this.attribute = 'date';
        this.options = {};
        this.selected = { since: '', until: '' };
    }
    setProperty(property_name, property_value) {
        this[property_name] = property_value;
        return this;
    }
}

/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
class JamFilterOptionsComponent {
    constructor() {
        this.remoteFilterChange = new EventEmitter();
    }
    ngOnInit() {
        this.filterConfigArray = Object.keys(this.filterConfig.options).map(key => {
            this.filterConfig.options[key].text = { key: key, name: this.filterConfig.options[key].text };
            return this.filterConfig.options[key];
        });
    }
    optionSelected(jsonvalue, filter_list) {
        this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
        this.remoteFilterChange.emit(this.remoteFilter);
    }
}
JamFilterOptionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-filter-options',
                template: `<mat-form-field color="primary" floatLabel="never">
    <mat-select
        [(ngModel)]="filterConfig.selected"
        [placeholder]="filterConfig.title">
        <mat-option *ngFor="let config of filterConfigArray"
            [value]="config.text.key"
            (click)="optionSelected(config, filterConfig.selected)">{{ config.text.name }}
        </mat-option>
    </mat-select>
</mat-form-field>
`
            },] },
];
JamFilterOptionsComponent.propDecorators = {
    filterConfig: [{ type: Input }],
    remoteFilter: [{ type: Input }],
    remoteFilterChange: [{ type: Output }]
};

class JamFilterChecksComponent {
    constructor() {
        this.filterConfigChange = new EventEmitter();
        this.remoteFilterChange = new EventEmitter();
        this.searchText = '';
        this.show_input_search = false;
    }
    ngOnInit() {
        if (this.filterConfig.selected.length !== 0) {
            this.remoteFilter[this.filterConfig.attribute] = this.filterConfig.selected;
        }
        this.filterConfigOptionsUpdate();
        this.filter_config_options = this.filter_config_options.sort((a, b) => a.text.name.localeCompare(b.text.name));
        this.showInputSearch();
    }
    showInputSearch() {
        if (Object.keys(this.filterConfig.options).length > 10) {
            this.show_input_search = true;
        }
    }
    filterConfigOptionsUpdate() {
        this.filter_config_options = Object.keys(this.filterConfig.options).map(key => {
            if (typeof this.filterConfig.options[key].text === 'string') {
                this.filterConfig.options[key].text = { key: key, name: this.filterConfig.options[key].text };
            }
            return this.filterConfig.options[key];
        });
    }
    clearSelected() {
        this.filterConfig.selected = [];
    }
    optionSelected(jsonvalue, filter_list) {
        this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
        this.remoteFilterChange.emit(this.remoteFilter);
    }
}
JamFilterChecksComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-filter-checks',
                template: `<mat-form-field color="primary" floatLabel="never">
    <mat-select
        multiple
        [(ngModel)]="filterConfig.selected"
        (focus)="filterConfigOptionsUpdate()"
        [placeholder]="filterConfig.title">
        <div mat-menu-item class="focus-element-4dp reset-input-default"
            *ngIf="filter_config_options.length > 10"
            fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10"
            (click)="$event.stopPropagation()">
            <mat-icon>search</mat-icon>
            <input fxFlex class="rs-input" tabindex="1" autofocus placeholder="Buscar"
                [(ngModel)]="searchText">
            <div style="height: 24px; width: 24px" fxLayout="row" fxLayoutAlign="start center">
                <mat-icon *ngIf="searchText" (click)="searchText = ''">clear</mat-icon>
            </div>
        </div>
        <mat-divider></mat-divider>
        <mat-option *ngFor="let option of filter_config_options | filter: searchText"
            [value]="option.text.key"
            (click)="optionSelected(option, filterConfig.selected)">{{ option.text.name }}
        </mat-option>
    </mat-select>
</mat-form-field>
`
            },] },
];
JamFilterChecksComponent.propDecorators = {
    filterConfig: [{ type: Input }],
    remoteFilter: [{ type: Input }],
    filterConfigChange: [{ type: Output }],
    remoteFilterChange: [{ type: Output }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamFilterModule {
}
JamFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    CommonModule,
                    MatIconModule,
                    MatInputModule$1,
                    MatOptionModule,
                    MatSelectModule,
                    MatDividerModule,
                    FlexLayoutModule,
                    MatFormFieldModule,
                    JamSearchInputModule
                ],
                providers: [FilterPipe],
                declarations: [JamFilterChecksComponent, JamFilterOptionsComponent],
                exports: [JamFilterChecksComponent, JamFilterOptionsComponent]
            },] },
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator directive-selector
/** Used to flag slide labels for use with the portal directive */
class JamSlideElement extends CdkPortal {
}
JamSlideElement.decorators = [
    { type: Directive, args: [{
                selector: '[jam-slide-element], [jamSlideElement]'
            },] },
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator component-selector no-input-rename
// Boilerplate for applying mixins to JamSlide.
/** @docs-private */
class JamSlideBase {
}
const _JamSlideMixinBase = mixinDisabled(JamSlideBase);
class JamSlide extends _JamSlideMixinBase {
    constructor(_viewContainerRef) {
        super();
        this._viewContainerRef = _viewContainerRef;
        /**
         * Template provided in the slide content that will be used if present, used to enable lazy-loading
         */
        /** Plain text element for the slide, used when there is no template label. */
        this.textLabel = '';
        /** Emits whenever the internal state of the slide changes. */
        this._stateChanges = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        this.position = null;
        /**
         * The initial relatively index origin of the slide if it was created and selected after there
         * was already a selected slide. Provides context of what position the slide should originate from.
         */
        this.origin = null;
        /**
         * Whether the slide is currently active.
         */
        this.isActive = false;
        /** Portal that will be the hosted content of the slide */
        this._contentPortal = null;
    }
    /** @docs-private */
    get content() {
        return this._contentPortal;
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this._stateChanges.next();
        }
    }
    ngOnDestroy() {
        this._stateChanges.complete();
    }
    ngOnInit() {
        this._contentPortal = new TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
    }
}
JamSlide.decorators = [
    { type: Component, args: [{
                selector: 'jam-slide',
                template: `<!-- Create a template for the content of the <jam-slide> so that we can grab a reference to this
    TemplateRef and use it in a Portal to render the slide content in the appropriate place in the
    slide-group. -->
<ng-template><ng-content></ng-content></ng-template>
`,
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'jamSlide'
            },] },
];
/** @nocollapse */
JamSlide.ctorParameters = () => [
    { type: ViewContainerRef }
];
JamSlide.propDecorators = {
    templateLabel: [{ type: ContentChild, args: [JamSlideElement,] }],
    textLabel: [{ type: Input, args: ['label',] }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    _implicitContent: [{ type: ViewChild, args: [TemplateRef,] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Boilerplate for applying mixins to JamSlideElementWrapper.
/** @docs-private */
class JamSlideElementWrapperBase {
}
const _JamSlideElementWrapperMixinBase = mixinDisabled(JamSlideElementWrapperBase);
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator directive-selector
/**
 * Used in the `jam-slide-group` view to display slide labels.
 * @docs-private
 */
class JamSlideElementWrapper extends _JamSlideElementWrapperMixinBase {
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /** Sets focus on the wrapper element */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
JamSlideElementWrapper.decorators = [
    { type: Directive, args: [{
                selector: '[jamSlideElementWrapper]',
                inputs: ['disabled'],
                host: {
                    '[class.jam-slide-disabled]': 'disabled',
                    '[attr.aria-disabled]': '!!disabled'
                }
            },] },
];
/** @nocollapse */
JamSlideElementWrapper.ctorParameters = () => [
    { type: ElementRef }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Checks whether a modifier key is pressed.
 * @param event Event to be checked.
 */
function hasModifierKey(event, ...modifiers) {
    if (modifiers.length) {
        return modifiers.some(modifier => event[modifier]);
    }
    return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
/** Config used to bind passive event listeners */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
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
class JamSlideHeaderBase {
}
const _JamSlideHeaderMixinBase = mixinDisableRipple(JamSlideHeaderBase);
/**
 * The header of the slide group which displays a list of all the slides in the slide group. Includes
 * an ink bar that follows the currently selected slide. When the slides list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
class JamSlideHeader extends _JamSlideHeaderMixinBase {
    constructor(_elementRef, _changeDetectorRef, _viewportRuler, _dir, 
    // @breaking-change 8.0.0 `_ngZone` and `_platforms` parameters to be made required.
    _ngZone, _platform) {
        super();
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        this._dir = _dir;
        this._ngZone = _ngZone;
        this._platform = _platform;
        /** Event emitted when the option is selected. */
        this.selectFocusedIndex = new EventEmitter();
        /** Event emitted when a element is focused. */
        this.indexFocused = new EventEmitter();
        /** Whether the controls for pagination should be displayed */
        this._showPaginationControls = false;
        /** Whether the slide list can be scrolled more towards the end of the slide element list. */
        this._disableScrollAfter = true;
        /** Whether the slide list can be scrolled more towards the beginning of the slide element list. */
        this._disableScrollBefore = true;
        /** The distance in pixels that the slide labels should be translated to the left. */
        this._scrollDistance = 0;
        /** Whether the header should scroll to the selected index after the view has been checked. */
        this._selectedIndexChanged = false;
        /** Emits when the component is destroyed. */
        this._destroyed = new Subject();
        /** Stream that will stop the automated scrolling. */
        this._stopScrolling = new Subject();
        this._selectedIndex = 0;
        const element = _elementRef.nativeElement;
        const bindEvent = () => {
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
        }
        else {
            bindEvent();
        }
    }
    /** The index of the active slide. */
    get selectedIndex() { return this._selectedIndex; }
    set selectedIndex(value) {
        value = coerceNumberProperty(value);
        this._selectedIndexChanged = this._selectedIndex !== value;
        this._selectedIndex = value;
        if (this._keyManager) {
            this._keyManager.updateActiveItem(value);
        }
    }
    ngAfterContentChecked() {
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
    _handleKeydown(event) {
        console.log('inside handleKeyDown', event);
        console.log('inside handleKeyDown', event, hasModifierKey(event));
        // We don't handle any key bindings with a modifier key.
        if (hasModifierKey(event)) {
            return;
        }
        switch (event.key) {
            case 'Home':
                this._keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case 'End':
                this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case 'Enter':
            case ' ':
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
    ngAfterContentInit() {
        const dirChange = this._dir ? this._dir.change : of(null);
        const resize = this._viewportRuler.change(150);
        const realign = () => {
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
        }
        else {
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
    ngAfterViewInit() {
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
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._stopScrolling.complete();
    }
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    _onContentChanges() {
        const textContent = this._elementRef.nativeElement.textContent;
        // We need to diff the text content of the header, because the MutationObserver callback
        // will fire even if the text content didn't change which is inefficient and is prone
        // to infinite loops if a poorly constructed expression is passed in (see #14249).
        if (textContent !== this._currentTextContent) {
            this._currentTextContent = textContent;
            const zoneCallback = () => {
                this.updatePagination();
                // this._alignInkBarToSelectedTab();
                this._changeDetectorRef.markForCheck();
            };
            // The content observer runs outside the `NgZone` by default, which
            // means that we need to bring the callback back in ourselves.
            // @breaking-change 8.0.0 Remove null check for `_ngZone` once it's a required parameter.
            if (this._ngZone) {
                this._ngZone.run(zoneCallback);
            }
            else {
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
    updatePagination() {
        this._checkPaginationEnabled();
        this._checkScrollingControls();
        this._updateTabScrollPosition();
    }
    // tslint:disable: no-non-null-assertion
    /** Tracks which element has focus; used for keyboard navigation */
    get focusIndex() {
        return this._keyManager ? this._keyManager.activeItemIndex : 0;
    }
    /** When the focus index is set, we must manually send focus to the correct element */
    set focusIndex(value) {
        if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
            return;
        }
        this._keyManager.setActiveItem(value);
    }
    /**
     * Determines if an index is valid.  If the slides are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    _isValidIndex(index) {
        if (!this._elementWrappers) {
            return true;
        }
        const slide = this._elementWrappers ? this._elementWrappers.toArray()[index] : null;
        return !!slide && !slide.disabled;
    }
    /**
     * Sets focus on the HTML element for the element wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    _setTabFocus(slideIndex) {
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
            }
            else {
                containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    }
    /** The layout direction of the containing app. */
    _getLayoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /** Performs the CSS transformation on the slide list that will cause the list to scroll. */
    _updateTabScrollPosition() {
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
    get scrollDistance() { return this._scrollDistance; }
    set scrollDistance(value) {
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
    _scrollHeader(direction) {
        const viewLength = this._slideListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the slide list's viewport.
        const scrollAmount = (direction === 'before' ? -1 : 1) * viewLength / 3;
        return this._scrollTo(this._scrollDistance + scrollAmount);
    }
    /** Handles click events on the pagination arrows. */
    _handlePaginatorClick(direction) {
        this._stopInterval();
        this._scrollHeader(direction);
    }
    /**
     * Moves the slide list such that the desired slide element (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    _scrollToLabel(labelIndex) {
        console.log('inside _scrollToLabel');
        const selectedLabel = this._elementWrappers ? this._elementWrappers.toArray()[labelIndex] : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the slide labels.
        const viewLength = this._slideListContainer.nativeElement.offsetWidth;
        let labelBeforePos;
        let labelAfterPos;
        if (this._getLayoutDirection() === 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos = this._slideList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        const beforeVisiblePos = this.scrollDistance;
        const afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move element to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
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
    _checkPaginationEnabled() {
        const isEnabled = this._slideList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
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
    _checkScrollingControls() {
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
    _getMaxScrollDistance() {
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
    _stopInterval() {
        this._stopScrolling.next();
    }
    /**
     * Handles the user pressing down on one of the paginators.
     * Starts scrolling the header after a certain amount of time.
     * @param direction In which direction the paginator should be scrolled.
     */
    _handlePaginatorPress(direction) {
        // Avoid overlapping timers.
        this._stopInterval();
        // Start a timer after the delay and keep firing based on the interval.
        timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL)
            // Keep the timer going until something tells it to stop or the component is destroyed.
            .pipe(takeUntil(merge(this._stopScrolling, this._destroyed)))
            .subscribe(() => {
            const { maxScrollDistance, distance } = this._scrollHeader(direction);
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
    _scrollTo(position) {
        const maxScrollDistance = this._getMaxScrollDistance();
        this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
        // Mark that the scroll distance has changed so that after the view is checked, the CSS
        // transformation can move the header.
        this._scrollDistanceChanged = true;
        this._checkScrollingControls();
        return { maxScrollDistance, distance: this._scrollDistance };
    }
}
JamSlideHeader.decorators = [
    { type: Component, args: [{
                selector: 'jam-slide-header',
                template: `<div class="jam-slide-header-pagination jam-slide-header-pagination-before mat-elevation-z4"
     #previousPaginator
     aria-hidden="true"
     mat-ripple [matRippleDisabled]="_disableScrollBefore || disableRipple"
     [class.jam-slide-header-pagination-disabled]="_disableScrollBefore"
     (click)="_handlePaginatorClick('before')"
     (mousedown)="_handlePaginatorPress('before')"
     (touchend)="_stopInterval()">
  <div class="jam-slide-header-pagination-chevron"></div>
</div>

<div class="jam-slide-element-container" #slideListContainer
     (keydown)="_handleKeydown($event)">
  <div class="jam-slide-list" #slideList role="slidelist" (cdkObserveContent)="_onContentChanges()">
    <div class="jam-slide-elements">
      <ng-content></ng-content>
    </div>
    <!-- <mat-ink-bar></mat-ink-bar> -->
  </div>
</div>

<div class="jam-slide-header-pagination jam-slide-header-pagination-after mat-elevation-z4"
     #nextPaginator
     aria-hidden="true"
     mat-ripple [matRippleDisabled]="_disableScrollAfter || disableRipple"
     [class.jam-slide-header-pagination-disabled]="_disableScrollAfter"
     (mousedown)="_handlePaginatorPress('after')"
     (click)="_handlePaginatorClick('after')"
     (touchend)="_stopInterval()">
  <div class="jam-slide-header-pagination-chevron"></div>
</div>
`,
                styles: [`@-webkit-keyframes cdk-text-field-autofill-start{/*!*/}@-webkit-keyframes cdk-text-field-autofill-end{/*!*/}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,"Helvetica Neue",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,"Helvetica Neue",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-card-title{font-size:24px;font-weight:500}.mat-card-header .mat-card-title{font-size:20px}.mat-card-content,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:14px;font-weight:500}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif}.mat-expansion-panel-header{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-form-field{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}@media print{.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28122em) scale(.75);transform:translateY(-1.28122em) scale(.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28121em) scale(.75);transform:translateY(-1.28121em) scale(.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.2812em) scale(.75);transform:translateY(-1.2812em) scale(.75)}}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-sub-label-error{font-weight:400}.mat-step-label-error{font-size:14px}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:8px;padding-bottom:8px}.mat-list-item,.mat-list-option{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-list-base .mat-list-item{font-size:16px}.mat-list-base .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list-base .mat-list-option{font-size:16px}.mat-list-base .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list-base .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-list-base[dense] .mat-list-item{font-size:12px}.mat-list-base[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list-base[dense] .mat-list-option{font-size:12px}.mat-list-base[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list-base[dense] .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-simple-snackbar{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-nested-tree-node,.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden;position:relative}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;-webkit-transition:opacity,-webkit-transform cubic-bezier(0,0,.2,1);transition:opacity,transform cubic-bezier(0,0,.2,1),-webkit-transform cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}@media (-ms-high-contrast:active){.mat-ripple-element{display:none}}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:-webkit-box;display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:-webkit-box;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity .4s cubic-bezier(.25,.8,.25,1);transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.jam-slide-header{display:-webkit-box;display:flex;overflow:hidden;position:relative;flex-shrink:0}.jam-slide-element{height:auto;padding:0 16px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;white-space:nowrap;position:relative}.jam-slide-element:focus{outline:0}.jam-slide-element:focus:not(.jam-slide-disabled){opacity:1}.jam-slide-element.jam-slide-disabled{cursor:default}.jam-slide-element .jam-slide-element-content{display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;white-space:nowrap}@media (-ms-high-contrast:active){.jam-slide-element:focus{outline:dotted 2px}.jam-slide-element.jam-slide-disabled{opacity:.5}.jam-slide-element{opacity:1}}@media (max-width:599px){.jam-slide-element{min-width:72px}}.jam-slide-header-pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.jam-slide-header-pagination-controls-enabled .jam-slide-header-pagination{display:-webkit-box;display:flex}.jam-slide-header-pagination-before,.jam-slide-header-rtl .jam-slide-header-pagination-after{padding-left:4px}.jam-slide-header-pagination-before .jam-slide-header-pagination-chevron,.jam-slide-header-rtl .jam-slide-header-pagination-after .jam-slide-header-pagination-chevron{-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.jam-slide-header-pagination-after,.jam-slide-header-rtl .jam-slide-header-pagination-before{padding-right:4px}.jam-slide-header-pagination-after .jam-slide-header-pagination-chevron,.jam-slide-header-rtl .jam-slide-header-pagination-before .jam-slide-header-pagination-chevron{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.jam-slide-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.jam-slide-header-pagination-disabled{box-shadow:none;cursor:default}.jam-slide-element-container{display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;overflow:hidden;z-index:1}.jam-slide-list{-webkit-box-flex:1;flex-grow:1;position:relative;-webkit-transition:-webkit-transform .5s cubic-bezier(.35,0,.25,1);transition:transform .5s cubic-bezier(.35,0,.25,1);transition:transform .5s cubic-bezier(.35,0,.25,1),-webkit-transform .5s cubic-bezier(.35,0,.25,1)}.jam-slide-elements{display:-webkit-box;display:flex}[mat-align-slides=center] .jam-slide-elements{-webkit-box-pack:center;justify-content:center}[mat-align-slides=end] .jam-slide-elements{-webkit-box-pack:end;justify-content:flex-end}`],
                inputs: ['disableRipple'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'jam-slide-header',
                    '[class.jam-slide-header-pagination-controls-enabled]': '_showPaginationControls',
                    '[class.jam-slide-header-rtl]': `_getLayoutDirection() == 'rtl'`
                }
            },] },
];
/** @nocollapse */
JamSlideHeader.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgZone },
    { type: Platform }
];
JamSlideHeader.propDecorators = {
    _elementWrappers: [{ type: ContentChildren, args: [JamSlideElementWrapper,] }],
    _slideListContainer: [{ type: ViewChild, args: ['slideListContainer',] }],
    _slideList: [{ type: ViewChild, args: ['slideList',] }],
    _nextPaginator: [{ type: ViewChild, args: ['nextPaginator',] }],
    _previousPaginator: [{ type: ViewChild, args: ['previousPaginator',] }],
    selectFocusedIndex: [{ type: Output }],
    indexFocused: [{ type: Output }],
    selectedIndex: [{ type: Input }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable: interface-name use-input-property-decorator use-host-property-decorator component-selector
/** Used to generate unique ID's for each slide component */
let nextId = 0;
/** A simple change event emitted on focus or selection changes. */
class JamSlideChangeEvent {
}
/** Injection token that can be used to provide the default options the slides module. */
const MAT_TABS_CONFIG = new InjectionToken('MAT_TABS_CONFIG');
// Boilerplate for applying mixins to JamSlideGroup.
/** @docs-private */
class JamSlideGroupBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _JamSlideGroupMixinBase = mixinColor(mixinDisableRipple(JamSlideGroupBase), 'primary');
/**
 * Material design slide-group component.  Supports basic slide pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/slides.html
 */
class JamSlideGroup extends _JamSlideGroupMixinBase {
    constructor(elementRef, _changeDetectorRef, defaultConfig) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        /** Output to enable support for two-way binding on `[(selectedIndex)]` */
        this.selectedIndexChange = new EventEmitter();
        /** Event emitted when focus has changed within a slide group. */
        this.focusChange = new EventEmitter();
        /** Event emitted when the body animation has completed */
        this.animationDone = new EventEmitter();
        /** Event emitted when the slide selection has changed. */
        this.selectedTabChange = new EventEmitter(true);
        /** Position of the slide header. */
        this.headerPosition = 'above';
        /** The slide index that should be selected after the content has been checked. */
        this._indexToSelect = 0;
        /** Snapshot of the height of the slide body wrapper before another slide is activated. */
        this._slideBodyWrapperHeight = 0;
        /** Subscription to slides being added/removed. */
        this._slidesSubscription = Subscription.EMPTY;
        /** Subscription to changes in the slide labels. */
        this._slideElementSubscription = Subscription.EMPTY;
        this._dynamicHeight = false;
        this._selectedIndex = null;
        this._groupId = nextId += 1;
        this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
            defaultConfig.animationDuration : '500ms';
    }
    /** Whether the slide group should grow to the size of the active slide. */
    get dynamicHeight() { return this._dynamicHeight; }
    set dynamicHeight(value) { this._dynamicHeight = coerceBooleanProperty(value); }
    /** The index of the active slide. */
    get selectedIndex() { return this._selectedIndex; }
    set selectedIndex(value) {
        this._indexToSelect = coerceNumberProperty(value, null);
    }
    /** Duration for the slide animation. Will be normalized to milliseconds if no units are set. */
    get animationDuration() { return this._animationDuration; }
    set animationDuration(value) {
        this._animationDuration = /^\d+$/.test(value) ? value + 'ms' : value;
    }
    /** Background color of the slide group. */
    get backgroundColor() { return this._backgroundColor; }
    set backgroundColor(value) {
        const nativeElement = this._elementRef.nativeElement;
        nativeElement.classList.remove(`mat-background-${this.backgroundColor}`);
        if (value) {
            nativeElement.classList.add(`mat-background-${value}`);
        }
        this._backgroundColor = value;
    }
    /**
     * After the content is checked, this component knows what slides have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each slide should be in according to the new selected index, and additionally we know how
     * a new selected slide should transition in (from the left or right).
     */
    ngAfterContentChecked() {
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of slides changes before the actual change detection runs.
        const indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect) {
            const isFirstRun = !this._selectedIndex;
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
        this._slides.forEach((slide, index) => {
            slide.position = index - indexToSelect;
            // If there is already a selected slide, then set up an origin for the next selected slide
            // if it doesn't have one already.
            if (!this._selectedIndex && slide.position === 0 && !slide.origin) {
                slide.origin = indexToSelect - this._selectedIndex;
            }
        });
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this._changeDetectorRef.markForCheck();
        }
    }
    ngAfterContentInit() {
        this._subscribeToTabLabels();
        // Subscribe to changes in the amount of slides, in order to be
        // able to re-render the content as new slides are added or removed.
        this._slidesSubscription = this._slides.changes.subscribe(() => {
            const indexToSelect = this._clampTabIndex(this._indexToSelect);
            // Maintain the previously-selected slide if a new slide is added or removed and there is no
            // explicit change that selects a different slide.
            if (indexToSelect === this._selectedIndex) {
                const slides = this._slides.toArray();
                for (let i = 0; i < slides.length; i += 1) {
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
    ngOnDestroy() {
        this._slidesSubscription.unsubscribe();
        this._slideElementSubscription.unsubscribe();
    }
    /** Re-aligns the ink bar to the selected slide element. */
    // realignInkBar() {
    //   if (this._slideHeader) {
    //     this._slideHeader._alignInkBarToSelectedTab();
    //   }
    // }
    _focusChanged(index) {
        this.focusChange.emit(this._createChangeEvent(index));
    }
    /** Returns a unique id for each slide element element */
    _getTabLabelId(i) {
        return `jam-slide-element-${this._groupId}-${i}`;
    }
    /** Returns a unique id for each slide content element */
    _getTabContentId(i) {
        return `jam-slide-content-${this._groupId}-${i}`;
    }
    /**
     * Sets the height of the body wrapper to the height of the activating slide if dynamic
     * height property is true.
     */
    _setTabBodyWrapperHeight(slideHeight) {
        if (!this._dynamicHeight || !this._slideBodyWrapperHeight) {
            return;
        }
        const wrapper = this._slideBodyWrapper.nativeElement;
        wrapper.style.height = this._slideBodyWrapperHeight + 'px';
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this._slideBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = slideHeight + 'px';
        }
    }
    /** Removes the height of the slide body wrapper. */
    _removeTabBodyWrapperHeight() {
        const wrapper = this._slideBodyWrapper.nativeElement;
        this._slideBodyWrapperHeight = wrapper.clientHeight;
        wrapper.style.height = '';
        this.animationDone.emit();
    }
    /** Handle click events, setting new selected index if appropriate. */
    _handleClick(slide, slideHeader, index) {
        if (!slide.disabled) {
            this.selectedIndex = slideHeader.focusIndex = index;
        }
    }
    /** Retrieves the slideindex for the slide. */
    _getTabIndex(slide, idx) {
        if (slide.disabled) {
            return null;
        }
        return this.selectedIndex === idx ? 0 : -1;
    }
    _createChangeEvent(index) {
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
    _subscribeToTabLabels() {
        if (this._slideElementSubscription) {
            this._slideElementSubscription.unsubscribe();
        }
        this._slideElementSubscription = merge(...this._slides.map(slide => slide._stateChanges))
            .subscribe(() => this._changeDetectorRef.markForCheck());
    }
    /** Clamps the given index to the bounds of 0 and the slides length. */
    _clampTabIndex(index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Math.max(NaN, 0) === NaN).
        return Math.min(this._slides.length - 1, Math.max(index || 0, 0));
    }
}
JamSlideGroup.decorators = [
    { type: Component, args: [{
                selector: 'jam-slide-group',
                exportAs: 'jamSlideGroup',
                template: `<jam-slide-header #slideHeader
               [selectedIndex]="selectedIndex"
               [disableRipple]="disableRipple"
               (indexFocused)="_focusChanged($event)"
               (selectFocusedIndex)="selectedIndex = $event">
  <div class="jam-slide-element" role="slide" jamSlideElementWrapper mat-ripple cdkMonitorElementFocus
       *ngFor="let slide of _slides; let i = index"
       [id]="_getTabLabelId(i)"
       [attr.tabIndex]="_getTabIndex(slide, i)"
       [attr.aria-posinset]="i + 1"
       [attr.aria-setsize]="_slides.length"
       [attr.aria-controls]="_getTabContentId(i)"
       [attr.aria-selected]="selectedIndex == i"
       [attr.aria-label]="slide.ariaLabel || null"
       [attr.aria-labelledby]="(!slide.ariaLabel && slide.ariaLabelledby) ? slide.ariaLabelledby : null"
       [class.jam-slide-element-active]="selectedIndex == i"
       [disabled]="slide.disabled"
       [matRippleDisabled]="slide.disabled || disableRipple"
       (click)="_handleClick(slide, slideHeader, i)">


    <div class="jam-slide-element-content">
      <!-- If there is a element template, use it. -->
      <ng-template [ngIf]="slide.templateLabel">
        <ng-template [cdkPortalOutlet]="slide.templateLabel"></ng-template>
      </ng-template>

      <!-- If there is not a element template, fall back to the text label. -->
      <ng-template [ngIf]="!slide.templateLabel">{{slide.textLabel}}</ng-template>
    </div>
  </div>
</jam-slide-header>

<!-- <div class="jam-slide-body-wrapper" #slideBodyWrapper>
  <jam-slide-body role="slidepanel"
               *ngFor="let slide of _slides; let i = index"
               [id]="_getTabContentId(i)"
               [attr.aria-labelledby]="_getTabLabelId(i)"
               [class.jam-slide-body-active]="selectedIndex == i"
               [content]="slide.content"
               [position]="slide.position"
               [origin]="slide.origin"
               [animationDuration]="animationDuration"
               (_onCentered)="_removeTabBodyWrapperHeight()"
               (_onCentering)="_setTabBodyWrapperHeight($event)">
  </jam-slide-body>
</div> -->
`,
                styles: [`@-webkit-keyframes cdk-text-field-autofill-start{/*!*/}@-webkit-keyframes cdk-text-field-autofill-end{/*!*/}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,"Helvetica Neue",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,"Helvetica Neue",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-card-title{font-size:24px;font-weight:500}.mat-card-header .mat-card-title{font-size:20px}.mat-card-content,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:14px;font-weight:500}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif}.mat-expansion-panel-header{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-form-field{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}@media print{.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28122em) scale(.75);transform:translateY(-1.28122em) scale(.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28121em) scale(.75);transform:translateY(-1.28121em) scale(.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.2812em) scale(.75);transform:translateY(-1.2812em) scale(.75)}}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-sub-label-error{font-weight:400}.mat-step-label-error{font-size:14px}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:8px;padding-bottom:8px}.mat-list-item,.mat-list-option{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-list-base .mat-list-item{font-size:16px}.mat-list-base .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list-base .mat-list-option{font-size:16px}.mat-list-base .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list-base .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-list-base[dense] .mat-list-item{font-size:12px}.mat-list-base[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list-base[dense] .mat-list-option{font-size:12px}.mat-list-base[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list-base[dense] .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-simple-snackbar{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-nested-tree-node,.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden;position:relative}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;-webkit-transition:opacity,-webkit-transform cubic-bezier(0,0,.2,1);transition:opacity,transform cubic-bezier(0,0,.2,1),-webkit-transform cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}@media (-ms-high-contrast:active){.mat-ripple-element{display:none}}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:-webkit-box;display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:-webkit-box;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity .4s cubic-bezier(.25,.8,.25,1);transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.jam-slide-group{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.jam-slide-group.jam-slide-group-inverted-header{-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}.jam-slide-element{height:auto;padding:0 16px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;white-space:nowrap;position:relative}.jam-slide-element:focus{outline:0}.jam-slide-element:focus:not(.jam-slide-disabled){opacity:1}.jam-slide-element.jam-slide-disabled{cursor:default}.jam-slide-element .jam-slide-element-content{display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;white-space:nowrap}@media (-ms-high-contrast:active){.jam-slide-element:focus{outline:dotted 2px}.jam-slide-element.jam-slide-disabled{opacity:.5}.jam-slide-element{opacity:1}}@media (max-width:599px){.jam-slide-element{padding:0 12px}}@media (max-width:959px){.jam-slide-element{padding:0 12px}}.jam-slide-group[mat-stretch-slides]>.jam-slide-header .jam-slide-element{flex-basis:0;-webkit-box-flex:1;flex-grow:1}.jam-slide-body-wrapper{position:relative;overflow:hidden;display:-webkit-box;display:flex;-webkit-transition:height .5s cubic-bezier(.35,0,.25,1);transition:height .5s cubic-bezier(.35,0,.25,1)}.jam-slide-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.jam-slide-body.jam-slide-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;-webkit-box-flex:1;flex-grow:1}.jam-slide-group.jam-slide-group-dynamic-height .jam-slide-body.jam-slide-body-active{overflow-y:hidden}`],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['color', 'disableRipple'],
                host: {
                    'class': 'jam-slide-group',
                    '[class.jam-slide-group-dynamic-height]': 'dynamicHeight',
                    '[class.jam-slide-group-inverted-header]': 'headerPosition === "below"'
                }
            },] },
];
/** @nocollapse */
JamSlideGroup.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_TABS_CONFIG,] }, { type: Optional }] }
];
JamSlideGroup.propDecorators = {
    _slides: [{ type: ContentChildren, args: [JamSlide,] }],
    _slideBodyWrapper: [{ type: ViewChild, args: ['slideBodyWrapper',] }],
    _slideHeader: [{ type: ViewChild, args: ['slideHeader',] }],
    selectedIndexChange: [{ type: Output }],
    focusChange: [{ type: Output }],
    animationDone: [{ type: Output }],
    selectedTabChange: [{ type: Output }],
    headerPosition: [{ type: Input }],
    dynamicHeight: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    animationDuration: [{ type: Input }],
    backgroundColor: [{ type: Input }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamSlideModule {
}
JamSlideModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Animations used by the Material slides.
 * @docs-private
 */
const jamSlidesAnimations = {
    /** Animation translates a slide along the X axis. */
    translateTab: trigger('translateTab', [
        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
        state('center, void, left-origin-center, right-origin-center', style({ transform: 'none' })),
        // If the slide is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        state('left', style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
        state('right', style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
        transition('* => left, * => right, left => center, right => center', animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
        transition('void => left-origin-center', [
            style({ transform: 'translate3d(-100%, 0, 0)' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ]),
        transition('void => right-origin-center', [
            style({ transform: 'translate3d(100%, 0, 0)' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ])
    ])
};

class PinOptionButtonComponent {
    constructor(matIconRegistry, domSanitizer) {
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.jamColor = 'default';
        this.selected = new EventEmitter();
        this.buttons = [];
    }
    ngOnInit() {
        this.populateMenu();
        this.selected_option = this.defaultSelectedOption();
        this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/all_custom_icons.svg'));
    }
    pinnedOption(event, button) {
        event.stopPropagation();
        this.selected_option = {
            index: button.index,
            label: button.label
        };
        localStorage.setItem(this.specialKey + '_pinned_creation_option', JSON.stringify(button));
    }
    pinButton() {
        this.selected.emit(this.selected_option);
    }
    populateMenu() {
        let count = 0;
        for (let option of this.options) {
            this.buttons.push({ index: count, label: option });
            count += 1;
        }
    }
    defaultSelectedOption() {
        let local_storage_item = localStorage.getItem(this.specialKey + '_pinned_creation_option');
        return local_storage_item ? JSON.parse(local_storage_item) : this.buttons[0];
    }
}
PinOptionButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-pin-option-button',
                template: `<button mat-flat-button class="pin-button-round"
    [ngClass]="jamColor === 'default' ? 'mat-hint' : null"
    [color]="jamColor"
    (click)="selected.emit(selected_option)">
    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="4px">
        <button mat-icon-button class="mat-button">
            <mat-icon>add_circle</mat-icon>
        </button>

        <span>{{ selected_option?.label }}</span>

        <button mat-icon-button matSuffix class="mat-button"
            [matMenuTriggerFor]="jamPinOptionButton"
            (click)="$event.stopPropagation()">
            <mat-icon>arrow_drop_down</mat-icon>
        </button>
    </div>
</button>

<mat-menu #jamPinOptionButton="matMenu">
    <button mat-menu-item class="mouseover" *ngFor="let button of buttons; let item = index"
        (click)="selected.emit(button)">
        <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="16px">
            <span>{{ button.label }}</span>
            <div class="pin-container">
                <button mat-icon-button
                    [ngClass]="selected_option?.index !== item ? 'mouseover-child mat-button' : 'mat-button'"
                    (click)="pinnedOption($event, button)">
                    <mat-icon svgIcon="pin_rs" color="accent"
                        [ngStyle]="{ color: selected_option.index !== item ? '#000000B3' : null }"
                    ></mat-icon>
                </button>
            </div>
        </div>
    </button>
</mat-menu>
`,
                styles: [`button.pin-button-round{background-color:rgba(0,0,0,.102)!important;padding:0;border-radius:50px}.pin-container{width:40px}.pin-container button mat-icon{margin:0}.mouseover * .mouseover-child{display:none}.mouseover:hover * .mouseover-child{display:inherit}`]
            },] },
];
/** @nocollapse */
PinOptionButtonComponent.ctorParameters = () => [
    { type: MatIconRegistry },
    { type: DomSanitizer }
];
PinOptionButtonComponent.propDecorators = {
    options: [{ type: Input }],
    specialKey: [{ type: Input }],
    jamColor: [{ type: Input }],
    selected: [{ type: Output }]
};

class NgxJsonapiMaterialComponent {
}
NgxJsonapiMaterialComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-ngx-jsonapi-material',
                template: `
    <p>
      ngx-jsonapi-material works!
    </p>
  `,
                styles: []
            },] },
];

class MaterialModule {
}
MaterialModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    MatExpansionModule,
                    MatSelectModule,
                    MatOptionModule,
                    MatNativeDateModule,
                    MatDatepickerModule,
                    MatInputModule$1,
                    MatFormFieldModule,
                    MatDialogModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    MatMenuModule,
                    MatIconModule,
                    FlexLayoutModule,
                    MatCardModule,
                    MatPaginatorModule,
                    MatTableModule,
                    MatTabsModule$1,
                    MatButtonModule
                ],
                exports: [
                    MatExpansionModule,
                    MatSelectModule,
                    MatOptionModule,
                    MatNativeDateModule,
                    MatDatepickerModule,
                    MatInputModule$1,
                    MatFormFieldModule,
                    MatDialogModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    MatMenuModule,
                    MatIconModule,
                    FlexLayoutModule,
                    MatCardModule,
                    MatPaginatorModule,
                    MatTableModule,
                    MatTabsModule$1,
                    MatButtonModule
                ],
                providers: []
            },] },
];

class NgxJsonapiMaterialModule {
}
NgxJsonapiMaterialModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
                declarations: [NgxJsonapiMaterialComponent],
                exports: [NgxJsonapiMaterialComponent]
            },] },
];

class JamPinOptionButtonModule {
}
JamPinOptionButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    NgxJsonapiMaterialModule,
                    FlexLayoutModule,
                    MatButtonModule,
                    MatIconModule,
                    MatMenuModule
                ],
                declarations: [PinOptionButtonComponent],
                providers: [],
                exports: [PinOptionButtonComponent]
            },] },
];

class JamAutocompleteComponent {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
         * @param  {boolean} previewSelected
         * @usageNotes By default it is `false`.
         * In case it is `true`, the autocomplete,
         * shows in the placeholder or matLabel a preview of the selected item.
         */
        this.previewSelected = false;
        this.placeholder = 'Escribe algo que buscar';
        this.displayAttributes = [];
        this.remoteFilter = {};
        this.include = [];
        this.sort = [];
        this.showList = true;
        this.toggleResourceChange = new EventEmitter();
        this.dataArrived = new Subject();
        this.autocompleteCtrl = new FormControl();
        this.resourceArray = [];
        this.use_is_loading = true;
        this.destroyer = new Destroyer();
        this.collectionPerPage = 100; // 500
        this.resource_max_on_list = 50;
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    ngOnInit() {
        this.collection = this.services.newCollection();
        this.filtered_resource = this.autocompleteCtrl.valueChanges.pipe(this.destroyer.pipe(), filterOrRequest({
            attribute_to_search: this.displayAttributes[0],
            resourcesArray: this.resourceArray,
            getAllFc: this.getAll.bind(this),
            last_filter_value: this.resourceArrayLastFilterValue,
            collection: this.collection,
            page_size: this.collectionPerPage
        }));
    }
    closeAutocomplete() {
        this.autocompleteResource.optionSelections.pipe(timeout(150)).subscribe(selection => {
            this.autocompleteResource.closePanel();
        }, err => {
            this.autocompleteResource.closePanel();
        });
    }
    selectedResource(resource) {
        if (!resource) {
            return;
        }
        if (this.previewSelected) {
            this.toggleResource = resource;
        }
        this.toggleResourceChange.emit(resource);
    }
    displayFn(resource) {
        return ''; // clear input after item selection
    }
    refresh() {
        this.services.clearCacheMemory();
        this.use_is_loading = false;
    }
    getAll(search_text) {
        let params = {
            page: {
                number: 1,
                size: this.collectionPerPage
            },
            remotefilter: this.remoteFilter,
            include: this.include
        };
        if (search_text) {
            params.remotefilter = { [this.displayAttributes[0]]: search_text };
        }
        return this.services.all(params).pipe(filter(collection => collection.builded), tap(collection => {
            this.collection = collection;
        }));
    }
    clearDisplay() {
        this.toggleResource = null;
        this.autocompleteCtrl.setValue('');
    }
    filterResourceByName(value) {
        const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
        let count = 0;
        this.showList = !value && filterValue.length > 0;
        return this.resourceArray.filter((resource) => {
            if (count < this.resource_max_on_list &&
                (resource.attributes[this.displayAttributes[0]].toLowerCase().indexOf(filterValue) === 0 ||
                    resource.attributes[this.displayAttributes[0]].toLowerCase().indexOf(' ' + filterValue) > 0)) {
                return count += 1;
            }
        });
    }
}
JamAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-autocomplete',
                styles: [`.custom-placeholder::-webkit-input-placeholder{color:inherit;opacity:1}.custom-placeholder::-moz-placeholder{color:inherit;opacity:1}.custom-placeholder::-ms-input-placeholder{color:inherit;opacity:1;color:inherit}.custom-placeholder::placeholder{color:inherit;opacity:1}.custom-placeholder:-ms-input-placeholder{color:inherit}`],
                template: `<mat-form-field style="width: 100%" *ngIf="collection"
    appearance="outline" floatLabel="never" color="accent"
>
    <input matInput aria-label="Escribe algo que buscar" name="autocomplete-resource"
        [placeholder]="toggleResource?.attributes[displayAttributes[0]] || placeholder"
        type="text"
        [ngClass]="toggleResource?.attributes[displayAttributes[0]] ? 'custom-placeholder' : null"
        [matAutocomplete]="auto"
        [formControl]="autocompleteCtrl"
        (blur)="closeAutocomplete()"
        id="autocompleteResource"
        #autocompleteResource
    >

    <mat-autocomplete #auto="matAutocomplete"
        [displayWith]="displayFn"
        (optionSelected)="selectedResource($event.option.value)">
        <div *ngIf="showList">
            <mat-option [value]="null" (click)="clearDisplay()">-- Ninguna --</mat-option>
            <mat-option [ngClass]="toggleResource?.id === resource.id ? 'mat-selected mat-active' : null"
                [value]="resource"
                *ngFor="let resource of filtered_resource | async; trackBy: trackByFn"
            >
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="4px">
                    <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
                    <strong
                        [innerHTML]="resource.attributes[displayAttributes[0]]"
                    ></strong>
                    <ng-container *ngFor="let attribute of displayAttributes; let item = index">
                        <small *ngIf="item >= 1"> | {{ resource.attributes[attribute] }}</small>
                    </ng-container>
                </div>
            </mat-option>
        </div>
    </mat-autocomplete>

    <div fxLayout="row" matSuffix fxLayoutAlign="end center">
        <button mat-icon-button type="button" class="mat-button" matSuffix matTooltip="Limpiar selección"
            *ngIf="toggleResource?.attributes[displayAttributes[0]] || autocompleteCtrl.value"
            [disabled]="!collection?.loaded"
            (click)="clearDisplay()"
        >
            <mat-icon class="mat-hint">close</mat-icon>
        </button>

        <button mat-icon-button type="button" class="mat-button" matSuffix matTooltip="Actualizar lista"
            [disabled]="!collection?.loaded" (click)="$event.stopPropagation(); refresh()">
            <mat-icon class="mat-hint">refresh</mat-icon>
        </button>

        <div class="mat-select-arrow-wrapper">
            <div class="mat-select-arrow"></div>
        </div>
    </div>
</mat-form-field>

<mat-progress-bar class="progress-bar-autocomplete"
    *ngIf="!collection?.loaded"
    color="accent"
    mode="indeterminate"
></mat-progress-bar>
`
            },] },
];
/** @nocollapse */
JamAutocompleteComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
JamAutocompleteComponent.propDecorators = {
    previewSelected: [{ type: Input }],
    toggleResource: [{ type: Input }],
    placeholder: [{ type: Input }],
    services: [{ type: Input }],
    displayAttributes: [{ type: Input }],
    remoteFilter: [{ type: Input }],
    include: [{ type: Input }],
    sort: [{ type: Input }],
    icon: [{ type: Input }],
    showList: [{ type: Input }],
    toggleResourceChange: [{ type: Output }],
    autocompleteResource: [{ type: ViewChild, args: [MatAutocompleteTrigger,] }],
    autocompleteResourceInput: [{ type: ViewChild, args: ['autocompleteResource',] }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamAutocompleteModule {
}
JamAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    FlexLayoutModule,
                    MatTooltipModule,
                    ReactiveFormsModule,
                    MatAutocompleteModule,
                    MatFormFieldModule,
                    MatInputModule$1,
                    MatProgressBarModule,
                    MatButtonModule,
                    MatOptionModule,
                    MatIconModule,
                    CommonModule
                ],
                declarations: [JamAutocompleteComponent],
                exports: [JamAutocompleteComponent]
            },] },
];

class InfoButtonComponent {
    constructor() {
        /**
         * @param icon optional property -
         * @description By default acquires as icon "info"
         */
        this.icon = 'info';
        /** @param jamTooltip optional property */
        this.jamTooltip = 'Más información';
    }
    ngOnInit() {
        this.icon = this.checkIcon();
    }
    /** @method checkIcon Checks arriving icon, if not supported, then returns info. */
    checkIcon() {
        console.warn(`"${this.icon}" icon is not supported 🤷‍♂️, Try "info" or "help."`);
        return !['info', 'help'].includes(this.icon) ? 'info' : this.icon;
    }
}
InfoButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-info-button',
                template: `<a class="mat-button" type="button" target="_blank"
    mat-icon-button
    [matTooltip]="jamTooltip"
    [href]="externalUrl"
    (click)="$event.stopPropagation()"
>
    <mat-icon
        [innerHtml]="icon"
    ></mat-icon>
</a>
`
            },] },
];
InfoButtonComponent.propDecorators = {
    externalUrl: [{ type: Input }],
    icon: [{ type: Input }],
    jamTooltip: [{ type: Input }]
};

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamInfoButtonModule {
}
JamInfoButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatTooltipModule,
                    MatIconModule
                ],
                declarations: [InfoButtonComponent],
                exports: [InfoButtonComponent]
            },] },
];

class DomService {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.child_dom_element_id = 'current-selection-bar';
    }
    appendComponentTo(parentId, child, childConfig) {
        let child_node = document.getElementById(this.child_dom_element_id);
        if (child_node)
            child_node.parentNode.removeChild(child_node);
        /** Crea una referencia de componente desde el componente hijo */
        const childComponentRef = this.componentFactoryResolver.resolveComponentFactory(child).create(this.injector);
        /** Conecta la configuración al hijo (entradas y salidas) */
        this.attachConfig(childConfig, childComponentRef);
        this.childComponentRef = childComponentRef;
        // Agrega el componente al appRef de modo que esté dentro del árbol de componentes "ng"
        this.appRef.attachView(childComponentRef.hostView);
        // Obtiene el elemento DOM del componente
        const childDomElem = childComponentRef.hostView.rootNodes[0];
        childDomElem.setAttribute('id', this.child_dom_element_id);
        document.getElementById(parentId).appendChild(childDomElem);
        childDomElem.className = 'width-100';
        return childComponentRef;
    }
    removeComponent() {
        if (!this.childComponentRef)
            return;
        this.appRef.detachView(this.childComponentRef.hostView);
        this.childComponentRef.destroy();
    }
    attachConfig(config, componentRef) {
        let inputs = config.inputs;
        let outputs = config.outputs;
        for (let key in inputs) {
            componentRef.instance[key] = inputs[key];
        }
        for (let key in outputs) {
            componentRef.instance[key] = outputs[key];
        }
    }
}
DomService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];

class SelectionBarService {
    constructor(domService) {
        this.domService = domService;
        this.selected$ = new BehaviorSubject(new SelectionModel());
        this.callMethod$ = new BehaviorSubject({ method: '' });
        this.selectionBarElementId = 'selection-bar-container';
    }
    selected(selected) {
        this.selected$.next(selected);
    }
    callMethod(methodRef) {
        this.callMethod$.next(methodRef);
    }
    clearMethod() {
        this.callMethod({ method: '' });
    }
    init(component, inputs, outputs) {
        let componentConfig = {
            inputs: inputs,
            outputs: outputs
        };
        if (document.getElementById(this.selectionBarElementId).className === 'show') {
            return undefined; // ts-lint => Value-returning function should use `return undefined;`, not just `return;`
        }
        let created_component_instance = this.domService.appendComponentTo(this.selectionBarElementId, component, componentConfig);
        document.getElementById(this.selectionBarElementId).className = 'show';
        return created_component_instance;
    }
    destroy() {
        this.domService.removeComponent();
        document.getElementById(this.selectionBarElementId).className = 'hidden';
    }
}
SelectionBarService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SelectionBarService.ctorParameters = () => [
    { type: DomService }
];

class SelectionBarContainerComponent {
    constructor(selectionBarService, router) {
        this.selectionBarService = selectionBarService;
        this.router = router;
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.selectionBarService.destroy();
            }
        });
    }
}
SelectionBarContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-selection-bar-container',
                template: `<div id="selection-bar-container" class="hidden"></div>
`,
                styles: [`:host /deep/ .hidden{display:none!important}:host /deep/ .show{display:-webkit-box!important;display:flex!important}#selection-bar-container{-webkit-box-align:center;align-items:center;position:fixed;z-index:1003;top:0;left:0;right:0;width:100%;height:64px;opacity:1;background:#fff}:host /deep/ #selection-bar-container #current-selection-bar:first-child{padding:0 20px;width:100%}`]
            },] },
];
/** @nocollapse */
SelectionBarContainerComponent.ctorParameters = () => [
    { type: SelectionBarService },
    { type: Router }
];

class SelectionBarInfoComponent {
    constructor(selectionBarService) {
        this.selectionBarService = selectionBarService;
        this.destroyer = new Destroyer();
        this.selectionBarService.selected$
            .pipe(this.destroyer.pipe())
            .subscribe(selection => {
            this.selection = selection;
            this.label = selection.selected.length + (selection.selected.length >= 1 ? ' seleccionados' : ' seleccionado');
            if (selection.selected.length <= 0)
                this.selectionBarService.destroy();
        });
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    close() {
        this.selection.clear();
        this.selectionBarService.destroy();
    }
}
SelectionBarInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-selection-bar-info',
                template: `<div fxLayout="row" fxLayoutAlign="end center">
    <button mat-icon-button matTooltip="Borrar selección" (click)="close()">
        <mat-icon class="material-icons">arrow_back</mat-icon>
    </button>
    <span>{{ label }}</span>
</div>
`
            },] },
];
/** @nocollapse */
SelectionBarInfoComponent.ctorParameters = () => [
    { type: SelectionBarService }
];

/**
 * @license
 * Copyright Reyesoft All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class JamSelectionBarModule {
}
JamSelectionBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule,
                    FlexLayoutModule,
                    MatButtonModule,
                    MatIconModule,
                    CommonModule
                ],
                providers: [FilterPipe, SelectionBarService, DomService],
                declarations: [SelectionBarContainerComponent, SelectionBarInfoComponent],
                exports: [SelectionBarContainerComponent, SelectionBarInfoComponent]
            },] },
];

/*
 * Public API Surface of ngx-jsonapi-material
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DialogLoggedStateComponent as ɵh, MaterialModule as ɵm, BottomSheetComponent as ɵk, MenuElement as ɵi, MenuElementsCollection as ɵj, NgxJsonapiMaterialComponent as ɵn, NgxJsonapiMaterialModule as ɵl, UploadComponent as ɵg, JamSlideBase as ɵe, _JamSlideMixinBase as ɵf, JamSlideElementWrapperBase as ɵc, _JamSlideElementWrapperMixinBase as ɵd, JamSlideHeaderBase as ɵa, _JamSlideHeaderMixinBase as ɵb, JamSlideHeader, JamSlideElementWrapper, JamSlide, JamSlideElement, InfoButtonComponent, JamInfoButtonModule, SelectionBarContainerComponent, SelectionBarInfoComponent, DomService, SelectionBarService, JamSelectionBarModule, CustomValidators, trackById, batchAll, filterOrRequest, Destroyer, SelectComponent, JamOptionFooterComponent, JamSelectModule, SubmitComponent, JamSubmitModule, FloatingFiltersComponent, AvoidDisabledStyleDirective, JamFloatingFiltersModule, PictureManagerComponent, GalleryManagerComponent, JamPictureManagerModule, SearchInputComponent, FilterPipe, JamSearchInputModule, ChipsAutocompleteComponent, JamChipsAutocompleteModule, ConfirmationDialogComponent, DeleteConfirmationComponent, JamDeleteConfirmationModule, EditTextAttributeDialogComponent, JamEditTextAttributeModule, TopWarningComponent, TopWarningService, SingleWarningComponent, JamTopWarningModule, JamErrorHandler, JamErrorHandlerModule, RangeDatepickerComponent, JamRangeDatepickerModule, FabSpeedDialComponent, FabSpeedDialMiniButton, FabSpeedDialModule, JamRefreshService, RefreshComponent, JamRefreshModule, Menu, Section, Button, DropdownMenuComponent, MenuComponent, JamMenuModule, FloatingButtonComponent, JamFloatingButtonModule, DynamicInput, TextDynamicInput, NumberDynamicInput, CheckboxDynamicInput, TextareaDynamicInput, SelectDynamicInput, FormlyFormFlexComponent, JamDynamicFormsModule, JamTabsDirective, JamTabsModule, RemembermeStateDirective, JamRememberStateModule, FloatingInputComponent, JamFloatingInputModule, JsonapiFilterRangedateConfig, FilterConfig, JamFilterOptionsComponent, JamFilterChecksComponent, JamFilterModule, JamSlideModule, JamSlideChangeEvent, MAT_TABS_CONFIG, JamSlideGroupBase, _JamSlideGroupMixinBase, JamSlideGroup, jamSlidesAnimations, PinOptionButtonComponent, JamPinOptionButtonModule, JamAutocompleteComponent, JamAutocompleteModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWpzb25hcGktbWF0ZXJpYWwuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9jdXN0b20tdmFsaWRhdG9ycy50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RyYWNrLWJ5LWlkLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvYmF0Y2gudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9kZXN0cm95ZXIudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NlbGVjdC9vcHRpb24tZm9vdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtdGV4dC5waXBlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWFyY2gtaW5wdXQvc2VhcmNoLWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NlbGVjdC9zZWxlY3QubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc3VibWl0L3N1Ym1pdC5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zdWJtaXQvc3VibWl0Lm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWZpbHRlcnMvZmxvYXRpbmctZmlsdGVycy5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9mbG9hdGluZy1maWx0ZXJzL2F2b2lkLWRpc2FibGVkLXN0eWxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWZpbHRlcnMvZmxvYXRpbmctZmlsdGVycy5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9waWN0dXJlLW1hbmFnZXIvcGljdHVyZS9waWN0dXJlLW1hbmFnZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvcGljdHVyZS1tYW5hZ2VyL2dhbGxlcnkvZ2FsbGVyeS1tYW5hZ2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3BpY3R1cmUtbWFuYWdlci91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2RlbGV0ZS1jb25maXJtYXRpb24vY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2RlbGV0ZS1jb25maXJtYXRpb24vZGVsZXRlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24ubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvcGljdHVyZS1tYW5hZ2VyL3BpY3R1cmUtbWFuYWdlci5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9jaGlwcy1hdXRvY29tcGxldGUvY2hpcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2NoaXBzLWF1dG9jb21wbGV0ZS9jaGlwcy1hdXRvY29tcGxldGUubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvdG9wLXdhcm5pbmcvdG9wLXdhcm5pbmcuc2VydmljZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RvcC13YXJuaW5nL3RvcC13YXJuaW5nLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RvcC13YXJuaW5nL3NpbmdsZS13YXJuaW5nL3NpbmdsZS13YXJuaW5nLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RvcC13YXJuaW5nL3RvcC13YXJuaW5nLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2xvZ2dlZC1zdGF0ZS9kaWFsb2ctbG9nZ2VkLXN0YXRlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Vycm9yLWhhbmRsZXIvZXJyb3ItaGFuZGxlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZXJyb3ItaGFuZGxlci9lcnJvci1oYW5kbGVyLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3JhbmdlLWRhdGVwaWNrZXIvcmFuZ2UtZGF0ZXBpY2tlci5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9yYW5nZS1kYXRlcGlja2VyL3JhbmdlLWRhdGVwaWNrZXIubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZmFiLXNwZWVkLWRpYWwvZmFiLXNwZWVkLWRpYWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZmFiLXNwZWVkLWRpYWwvZmFiLXNwZWVkLWRpYWwtbWluaS1idXR0b24udHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9mYWItc3BlZWQtZGlhbC9mYWItc3BlZWQtZGlhbC5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9yZWZyZXNoL3JlZnJlc2guY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvcmVmcmVzaC9yZWZyZXNoLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL21lbnUvbWVudS1lbGVtZW50cy9tZW51LWVsZW1lbnRzLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvbWVudS9tZW51LWVsZW1lbnRzL21lbnUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9tZW51L21lbnUtZWxlbWVudHMvc2VjdGlvbi50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL21lbnUvbWVudS1lbGVtZW50cy9idXR0b24udHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9tZW51L2Ryb3Bkb3duLW1lbnUvZHJvcGRvd24tbWVudS5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9tZW51L2JvdHRvbS1zaGVldC9ib3R0b20tc2hlZXQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvbWVudS9tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL21lbnUvbWVudS5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9mbG9hdGluZy1idXR0b24vZmxvYXRpbmctYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWJ1dHRvbi9mbG9hdGluZy1idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZHluYW1pYy1mb3Jtcy9keW5hbWljLWlucHV0cy50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2R5bmFtaWMtZm9ybXMvZm9ybWx5LWZvcm0tZmxleC5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9keW5hbWljLWZvcm1zL2R5bmFtaWMtZm9ybXMubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvdGFicy90YWJzLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RhYnMvdGFicy5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9leHBhbnNpb24tcGFuZWwvcmVtZW1iZXItc3RhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZXhwYW5zaW9uLXBhbmVsL3JlbWVtYmVyLXN0YXRlLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWlucHV0L2Zsb2F0aW5nLWlucHV0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWlucHV0L2Zsb2F0aW5nLWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2ZpbHRlcnMvaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZmlsdGVycy9pbnRlcmZhY2VzL2ZpbHRlci1kYXRlLXJhbmdlLmludGVyZmFjZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2ZpbHRlcnMvYmFzaWNzL2ZpbHRlci1vcHRpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2ZpbHRlcnMvYmFzaWNzL2ZpbHRlci1jaGVja3MuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NsaWRlL3NsaWRlLWVsZW1lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zbGlkZS9zbGlkZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NsaWRlL3NsaWRlLWVsZW1lbnQtd3JhcHBlci50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NsaWRlL3NsaWRlLWhlYWRlci50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NsaWRlL3NsaWRlLWdyb3VwLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2xpZGUvc2xpZGUtbW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2xpZGUvc2xpZGUtYW5pbWF0aW9ucy50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3Bpbi1vcHRpb24tYnV0dG9uL3Bpbi1vcHRpb24tYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL25neC1qc29uYXBpLW1hdGVyaWFsLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL21hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL25neC1qc29uYXBpLW1hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3Bpbi1vcHRpb24tYnV0dG9uL3Bpbi1vcHRpb24tYnV0dG9uLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9pbmZvLWJ1dHRvbi9pbmZvLWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9pbmZvLWJ1dHRvbi9pbmZvLWJ1dHRvbi5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Rpb24tYmFyL2RvbS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2VsZWN0aW9uLWJhci9zZWxlY3Rpb24tYmFyLnNlcnZpY2UudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXItY29udGFpbmVyL3NlbGVjdGlvbi1iYXItY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NlbGVjdGlvbi1iYXIvc2VsZWN0aW9uLWJhci1pbmZvL3NlbGVjdGlvbi1iYXItaW5mby5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXIubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9wdWJsaWMtYXBpLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9uZ3gtanNvbmFwaS1tYXRlcmlhbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tVmFsaWRhdG9ycyB7XG4gICAgcHVibGljIHBhdHRlcm5WYWxpZGF0b3IocmVnZXg6IFJlZ0V4cCwgZXJyb3I6IFZhbGlkYXRpb25FcnJvcnMpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUpIHJldHVybiBudWxsOyAvLyBpZiBjb250cm9sIGlzIGVtcHR5IHJldHVybiBubyBlcnJvclxuXG4gICAgICAgICAgICBjb25zdCBWQUxJRCA9IHJlZ2V4LnRlc3QoY29udHJvbC52YWx1ZSk7IC8vIHRlc3QgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sIGFnYWluc3QgdGhlIHJlZ2V4cCBzdXBwbGllZFxuXG4gICAgICAgICAgICByZXR1cm4gVkFMSUQgPyBudWxsIDogZXJyb3I7IC8vIGlmIHRydWUsIHJldHVybiBubyBlcnJvciAobm8gZXJyb3IpLCBlbHNlIHJldHVybiBlcnJvciBwYXNzZWQgaW4gdGhlIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gTm9QYXNzc3dvcmRNYXRjaCBhbGxvd3MgeW91IHRvIGRpc3BsYXkgYW4gZXJyb3IgaWYgdGhlIHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoLlxuICAgICAqIEB1c2FnZU5vdGVzXG4gICAgICogIyMjIEVqZW1wbG9cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogdmFsaWRhdGlvbjoge1xuICAgICAqICAgICBtZXNzYWdlOiB7XG4gICAgICogICAgICAgICBOb1Bhc3Nzd29yZE1hdGNoOiAnTWkgbWVuc2FqZSdcbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgcGFzc3dvcmRNYXRjaFZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgY29uc3QgUEFTU1dPUkQ6IHN0cmluZyA9IGNvbnRyb2wuZ2V0KCdwYXNzd29yZCcpLnZhbHVlOyAvLyBnZXQgcGFzc3dvcmQgZnJvbSBvdXIgcGFzc3dvcmQgZm9ybSBjb250cm9sXG4gICAgICAgIGNvbnN0IENPTkZJUk1fUEFTU1dPUkQ6IHN0cmluZyA9IGNvbnRyb2wuZ2V0KCdjb25maXJtX3Bhc3N3b3JkJykudmFsdWU7IC8vIGdldCBwYXNzd29yZCBmcm9tIG91ciBjb25maXJtUGFzc3dvcmQgZm9ybSBjb250cm9sXG5cbiAgICAgICAgLy8gY29tcGFyZSBpcyB0aGUgcGFzc3dvcmQgbWF0aFxuICAgICAgICBpZiAoUEFTU1dPUkQgIT09IENPTkZJUk1fUEFTU1dPUkQpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZXkgZG9uJ3QgbWF0Y2gsIHNldCBhbiBlcnJvciBpbiBvdXIgY29uZmlybVBhc3N3b3JkIGZvcm0gY29udHJvbFxuICAgICAgICAgICAgY29udHJvbC5nZXQoJ2NvbmZpcm1fcGFzc3dvcmQnKS5zZXRFcnJvcnMoeyBOb1Bhc3Nzd29yZE1hdGNoOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFja0J5SWQoaW5kZXgsIHJlc291cmNlOiBSZXNvdXJjZSkge1xuICAgIHJldHVybiByZXNvdXJjZS5pZDtcbn1cbiIsIi8vIHRzbGludDpkaXNhYmxlOiByeGpzLW5vLXdob2xlc2FsZSByeGpzLWRlZXAtb3BlcmF0b3JzXG5cbmltcG9ydCB7IG1hcCwgY29uY2F0TWFwLCBzdGFydFdpdGggLCBmaWx0ZXIgLCBzd2l0Y2hNYXAgLCBza2lwICwgZGVib3VuY2VUaW1lICwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCBwaXBlICwgb2YgLCBVbmFyeUZ1bmN0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICduZ3gtanNvbmFwaS9zZXJ2aWNlJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnbmd4LWpzb25hcGkvcmVzb3VyY2UnO1xuaW1wb3J0IHsgRG9jdW1lbnRDb2xsZWN0aW9uLCBJUGFyYW1zQ29sbGVjdGlvbiB9IGZyb20gJ25neC1qc29uYXBpJztcblxuZXhwb3J0IGZ1bmN0aW9uIGJhdGNoQWxsPFQgZXh0ZW5kcyBTZXJ2aWNlPFI+LCBSIGV4dGVuZHMgUmVzb3VyY2U+KHNlcnZpY2U6IFQsIHBhcmFtczogSVBhcmFtc0NvbGxlY3Rpb24pOiBPYnNlcnZhYmxlPERvY3VtZW50Q29sbGVjdGlvbjxSPj4ge1xuICAgIHJldHVybiA8T2JzZXJ2YWJsZTxEb2N1bWVudENvbGxlY3Rpb248Uj4+PnNlcnZpY2UuYWxsKHBhcmFtcykucGlwZShjb25jYXRNYXAoY29sbGVjdGlvbiA9PiB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEubGVuZ3RoIDwgcGFyYW1zLnBhZ2Uuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9mKGNvbGxlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zLnBhZ2UubnVtYmVyICs9IDE7XG5cbiAgICAgICAgcmV0dXJuIGJhdGNoQWxsKHNlcnZpY2UsIHBhcmFtcykucGlwZShzdGFydFdpdGgoY29sbGVjdGlvbikpO1xuICAgIH0pKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlck9yUmVxdWVzdCA9IDxUIGV4dGVuZHMgUmVzb3VyY2U+KHBhcmFtczoge1xuICAgIGF0dHJpYnV0ZV90b19zZWFyY2g/OiBzdHJpbmc7XG4gICAgcmVzb3VyY2VzQXJyYXk6IEFycmF5PFQ+O1xuICAgIGdldEFsbEZjOiAoKGZpbHRlcjogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPERvY3VtZW50Q29sbGVjdGlvbjxUPj4pO1xuICAgIGxhc3RfZmlsdGVyX3ZhbHVlOiBzdHJpbmc7XG4gICAgY29sbGVjdGlvbjogRG9jdW1lbnRDb2xsZWN0aW9uPFQ+O1xuICAgIHBhZ2Vfc2l6ZTogbnVtYmVyO1xufSk6IFVuYXJ5RnVuY3Rpb248T2JzZXJ2YWJsZTxzdHJpbmc+LCBPYnNlcnZhYmxlPEFycmF5PFQ+Pj4gPT5cbiAgICBwaXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoNDAwKSxcbiAgICAgICAgZmlsdGVyKGZpbHRlclZhbHVlID0+IHR5cGVvZiBmaWx0ZXJWYWx1ZSA9PT0gJ3N0cmluZycpLFxuICAgICAgICBzd2l0Y2hNYXAoKGZpbHRlclZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJWYWx1ZS5pbmNsdWRlcyhwYXJhbXMubGFzdF9maWx0ZXJfdmFsdWUpICYmIHBhcmFtcy5jb2xsZWN0aW9uLmRhdGEubGVuZ3RoIDwgcGFyYW1zLnBhZ2Vfc2l6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihwYXJhbXMucmVzb3VyY2VzQXJyYXkuZmlsdGVyKChyZXNvdXJjZTogVCkgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UuYXR0cmlidXRlc1twYXJhbXMuYXR0cmlidXRlX3RvX3NlYXJjaF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJhbXNcbiAgICAgICAgICAgICAgICAuZ2V0QWxsRmMoZmlsdGVyVmFsdWUpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gW10pXG4gICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoY29sbGVjdGlvbjogRG9jdW1lbnRDb2xsZWN0aW9uPFQ+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnJlc291cmNlc0FycmF5ID0gY29sbGVjdGlvbi5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMubGFzdF9maWx0ZXJfdmFsdWUgPSBmaWx0ZXJWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnJlc291cmNlc0FycmF5O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICApO1xuIiwiaW1wb3J0IHsgU3ViamVjdCAsIFVuYXJ5RnVuY3Rpb24gLCBPYnNlcnZhYmxlICwgcGlwZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgRGVzdHJveWVyIHtcbiAgICBwcml2YXRlIHRha2V1bnRpbDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwdWJsaWMgcGlwZSgpOiBVbmFyeUZ1bmN0aW9uPE9ic2VydmFibGU8YW55PiwgT2JzZXJ2YWJsZTxhbnk+PiB7XG4gICAgICAgIHJldHVybiBwaXBlKHRha2VVbnRpbCh0aGlzLnRha2V1bnRpbCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRha2V1bnRpbC5uZXh0KCk7XG4gICAgICAgIHRoaXMudGFrZXVudGlsLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvdXJjZSwgRG9jdW1lbnRDb2xsZWN0aW9uIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zZWxlY3QnLFxuICAgIHN0eWxlczogW2AubWF0LW9wdGlvbi1mb290ZXIsLm1hdC1vcHRpb24taGVhZGVye3Bvc2l0aW9uOi13ZWJraXQtc3RpY2t5O3Bvc2l0aW9uOnN0aWNreTtiYWNrZ3JvdW5kOmluaGVyaXQ7ei1pbmRleDo5OTkhaW1wb3J0YW50O3dpZHRoOjEwMCV9Lm1hdC1vcHRpb24taGVhZGVye3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MDt0b3A6MH0ubWF0LW9wdGlvbi1mb290ZXJ7Ym90dG9tOjB9Lm1hdC1pY29ue21hcmdpbjowIWltcG9ydGFudH1tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlfWBdLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkXG4gICAgW2Zsb2F0TGFiZWxdPVwiZmxvYXRMYWJlbFwiXG4gICAgW2FwcGVhcmFuY2VdPVwiYXBwYXJlYW5jZVwiXG4+XG4gICAgPG1hdC1sYWJlbD5cbiAgICAgICAge3sgbGFiZWwgfHwgJ1NlbGVjY2lvbmUgdW5hIG9wY2nDg8KzbicgfX1cbiAgICAgICAgPGkgKm5nSWY9XCIhdG9SZWxhdGVcIj4oTmluZ3VuYSk8L2k+XG4gICAgPC9tYXQtbGFiZWw+XG4gICAgPG1hdC1zZWxlY3RcbiAgICAgICAgW25nTW9kZWxdPVwidG9SZWxhdGVcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVSZWxhdGlvbnNoaXBzKCRldmVudClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgZmFsc2VcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgfHwgJ1NlbGVjY2lvbmUgdW5hIG9wY2nDg8KzbidcIlxuICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGUgfHwgZmFsc2VcIlxuICAgICAgICA+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1vcHRpb24taGVhZGVyXCIgKm5nSWY9XCJhZGFwdGl2ZUFycmF5Lmxlbmd0aCA+PSAxMFwiPlxuICAgICAgICAgICAgPGphbS1zZWFyY2gtaW5wdXRcbiAgICAgICAgICAgICAgICBbdGV4dF09XCJzZWFyY2hUZXh0XCJcbiAgICAgICAgICAgICAgICBbb3BlbmVkXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICh0ZXh0Q2hhbmdlKT1cInVwZGF0ZUZpbHRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgID48L2phbS1zZWFyY2gtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuXG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwicmVtb3ZlUmVsYXRpb25zaGlwc1wiIFt2YWx1ZV09XCJjbGVhcl9yZWxhdGlvbnNoaXBzXCI+LS0gTmluZ3VuYSAtLTwvbWF0LW9wdGlvbj5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCByZXNvdXJjZSBvZiBhZGFwdGl2ZUFycmF5IHwgZmlsdGVyOiBzZWFyY2hUZXh0XCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwicmVzb3VyY2VcIiAqbmdJZj1cInBhcmVudElkICYmIHJlc291cmNlLmlkICE9PSBwYXJlbnRJZFwiPlxuICAgICAgICAgICAgICAgIHt7IHJlc291cmNlLmF0dHJpYnV0ZXNbZGlzcGxheUF0dHJpYnV0ZV0gfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJyZXNvdXJjZVwiICpuZ0lmPVwiIXBhcmVudElkXCI+XG4gICAgICAgICAgICAgICAge3sgcmVzb3VyY2UuYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlXSB9fVxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0LW9wdGlvbi1mb290ZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYXQtc2VsZWN0PlxuXG4gICAgPGJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWJ1dHRvblwiICpuZ0lmPVwiaGFzUmVmcmVzaFwiXG4gICAgICAgIChjbGljayk9XCJyZWZyZXNoLmVtaXQoKVwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCI+cmVmcmVzaDwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuPC9tYXQtZm9ybS1maWVsZD5cbmBcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgYXBwYXJlYW5jZTogJ2ZpbGwnIHwgJ291dGxpbmUnIHwgJ2xlZ2FjeScgfCAnc3RhbmRhcmQnID0gJ291dGxpbmUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmbG9hdExhYmVsOiAnbmV2ZXInIHwgJ2Fsd2F5cycgPSAnYWx3YXlzJztcbiAgICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIHBhcmVudElkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRvUmVsYXRlOiBSZXNvdXJjZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzcGxheUF0dHJpYnV0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb247XG4gICAgQElucHV0KCkgcHVibGljIHJlbW92ZVJlbGF0aW9uc2hpcHM6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBoYXNSZWZyZXNoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIHRvUmVsYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxSZXNvdXJjZT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlZnJlc2ggPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBhZGFwdGl2ZUFycmF5OiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgICBwdWJsaWMgY2xlYXJfcmVsYXRpb25zaGlwcyA9IG51bGw7XG5cbiAgICBwdWJsaWMgc2VhcmNoVGV4dDogc3RyaW5nID0gJyc7XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0aXZlQXJyYXkgPSB0aGlzLmNvbGxlY3Rpb24uZGF0YS5zbGljZSgwLCBOdW1iZXIodGhpcy5saW1pdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGl2ZUFycmF5ID0gdGhpcy5jb2xsZWN0aW9uLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b1JlbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy50b1JlbGF0ZSA9IHRoaXMuY29sbGVjdGlvbi5maW5kKHRoaXMudG9SZWxhdGUuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUZpbHRlcihzZWFyY2hfdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHNlYXJjaF90ZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVSZWxhdGlvbnNoaXBzKHJlc291cmNlOiBSZXNvdXJjZSkge1xuICAgICAgICB0aGlzLnRvUmVsYXRlQ2hhbmdlLmVtaXQocmVzb3VyY2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcmFtcywgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLW9wdGlvbi1mb290ZXInLFxuICAgIHN0eWxlczogW2AubW91c2VvdmVyICogLm1vdXNlb3Zlci1jaGlsZHtkaXNwbGF5Om5vbmV9Lm1vdXNlb3Zlcjpob3ZlciAqIC5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTppbmhlcml0fWBdLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1vcHRpb24gY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoxIG1vdXNlb3ZlclwiXG4gICAgKGNsaWNrKT1cImdvVG8oKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCI+YWRkX2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgICAgICA8c3Bhbj57eyBsYWJlbE9wdGlvbiB8fCAnQWRkJ319PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm9wZW5OZXdUYWIgJiYgIXJvdXRlckxpbmtcIj5cbiAgICAgICAgICAgIDxhIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1idXR0b24gbW91c2VvdmVyLWNoaWxkXCIgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBnb1RvKCdfYmxhbmsnKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCIgW3N0eWxlLm1hcmdpbl09XCInMCdcIj5vcGVuX2luX25ldzwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9tYXQtb3B0aW9uPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBKYW1PcHRpb25Gb290ZXJDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbGFiZWxPcHRpb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgcm91dGVyTGluazogQXJyYXk8c3RyaW5nPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgcXVlcnlQYXJhbXM6IFBhcmFtcztcbiAgICBASW5wdXQoKSBwdWJsaWMgb3Blbk5ld1RhYjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICAgICkge31cblxuICAgIHB1YmxpYyBnb1RvKHRhcmdldDogJ19zZWxmJyB8ICdfYmxhbmsnID0gJ19zZWxmJykge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXJMaW5rKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSh0aGlzLnJvdXRlckxpbmssIHtcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLmFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnVybCkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oXG4gICAgICAgICAgICAgICAgdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgdGFyZ2V0XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNPYmplY3QsIGlzRnVuY3Rpb24sIGlzVW5kZWZpbmVkIH0gZnJvbSAndXRpbCc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZmlsdGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXRlbXMgTGlzdCBvZiBpdGVtcyB0byBmaWx0ZXJcbiAgICAgKiBAcGFyYW0gdGVybSAgYSBzdHJpbmcgdGVybSB0byBjb21wYXJlIHdpdGggZXZlcnkgcHJvcGVydHkgb2YgdGhlIGxpc3RcbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsdGVyKGl0ZW1zOiBBcnJheTxhbnk+LCB0ZXJtOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgY29uc3QgdG9Db21wYXJlID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcGVydHkgaW4gaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IHN1Yl9wcm9wZXJ0eSBpbiBpdGVtW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVsnc3RyaW5nJywgJ251bWJlciddLmluY2x1ZGVzKHR5cGVvZiBpdGVtW3Byb3BlcnR5XVtzdWJfcHJvcGVydHldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtW3Byb3BlcnR5XVtzdWJfcHJvcGVydHldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmNsdWRlcyh0b0NvbXBhcmUpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW1zIG9iamVjdCBvciByZXNvdXJjZSBmcm9tIGFycmF5XG4gICAgICogQHBhcmFtIHNlYXJjaFRleHQgc2VhcmNoIHRlcm1cbiAgICAgKi9cbiAgICBwdWJsaWMgdHJhbnNmb3JtKGl0ZW1zOiBhbnksIHNlYXJjaFRleHQ6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmICghc2VhcmNoVGV4dCB8fCAhaXRlbXMpIHJldHVybiBpdGVtcztcblxuICAgICAgICByZXR1cm4gRmlsdGVyUGlwZS5maWx0ZXIoaXRlbXMsIHNlYXJjaFRleHQpO1xuICAgIH1cbn1cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlc3Ryb3llciB9IGZyb20gJy4uL2Rlc3Ryb3llcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXNlYXJjaC1pbnB1dCcsXG4gICAgc3R5bGVzOiBbYGRpdi5vcGVuZWR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xMil9LmphbS1pbnB1dHtib3JkZXI6MDtiYWNrZ3JvdW5kOjAgMDtoZWlnaHQ6NDhweDtwYWRkaW5nOjE2cHg7b3V0bGluZTowIWltcG9ydGFudH0ubWF0LWljb257bWFyZ2luOjAhaW1wb3J0YW50fUBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo2MDBweCl7ZGl2Lm9wZW5lZHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjMzMztiYWNrZ3JvdW5kOiNmZmY7aGVpZ2h0OjQ4cHg7bWF4LWhlaWdodDo0OHB4O2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX1kaXYub3BlbmVkOmFjdGl2ZSxkaXYub3BlbmVkOmZvY3VzLGRpdi5vcGVuZWQ6aG92ZXJ7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX19YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtYnV0dG9uXCIgbWF0VG9vbHRpcD1cIkJ1c2NhclwiXG4gICAgICAgICpuZ0lmPVwiIXNob3dTZWFyY2hcIlxuICAgICAgICAoY2xpY2spPVwic2hvd0lucHV0KClcIj5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJyZXNldC1pbnB1dC1kZWZhdWx0XCIgZnhGbGV4PVwiMTAwXCIgW3N0eWxlLnBhZGRpbmctbGVmdF09XCInMTZweCdcIlxuICAgICAgICAqbmdJZj1cInNob3dTZWFyY2hcIlxuICAgICAgICBbbmdDbGFzc109XCJzaG93U2VhcmNoID8gJ29wZW5lZCcgOiAnJ1wiXG4gICAgICAgIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZcIj5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJqYW0taW5wdXRcIiBmeEZsZXggaWQ9XCJzZWFyY2gtaW5wdXRcIiBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cInNlYXJjaEN0cmxcIiBwbGFjZWhvbGRlcj1cIkJ1c2Nhci4uLlwiPlxuXG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWJ1dHRvblwiIChjbGljayk9XCJzd2l0Y2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0ZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIG9wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgdGV4dENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgc2VhcmNoQ3RybDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcblxuICAgIHB1YmxpYyBzaG93U2VhcmNoID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zaG93U2VhcmNoID0gdGhpcy5vcGVuZWQgfHwgdGhpcy5zaG93U2VhcmNoO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoQ3RybC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveWVyLnBpcGUoKSxcbiAgICAgICAgICAgICAgICBtYXAoeCA9PiB4KSxcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoNDAwKVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUobmV3VmFsdWUgPT4gdGhpcy50ZXh0Q2hhbmdlLmVtaXQobmV3VmFsdWUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0lucHV0KCkge1xuICAgICAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1NlYXJjaCA9IHRoaXMub3BlbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93U2VhcmNoID0gIXRoaXMuc2hvd1NlYXJjaDtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBpZiAodGhpcy5zaG93U2VhcmNoKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0JykuZm9jdXMoKTsgfSwgMCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBzd2l0Y2goKSB7XG4gICAgICAgIGlmICh0aGlzLm9wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93U2VhcmNoID0gdGhpcy5vcGVuZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEN0cmwudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEN0cmwuc2V0VmFsdWUoJycpO1xuICAgICAgICAgICAgdGhpcy50ZXh0Q2hhbmdlLmVtaXQodGhpcy5zZWFyY2hDdHJsLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFNlYXJjaElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi9zZWFyY2gtdGV4dC5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2VhcmNoSW5wdXRDb21wb25lbnQsIEZpbHRlclBpcGVdLFxuICAgIGV4cG9ydHM6IFtTZWFyY2hJbnB1dENvbXBvbmVudCwgRmlsdGVyUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2VhcmNoSW5wdXRNb2R1bGUge31cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyUGlwZSB9IGZyb20gJy4uL3NlYXJjaC1pbnB1dC9zZWFyY2gtdGV4dC5waXBlJztcbmltcG9ydCB7IEphbVNlYXJjaElucHV0TW9kdWxlIH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5tb2R1bGUnO1xuaW1wb3J0IHsgSmFtT3B0aW9uRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24tZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgSmFtU2VhcmNoSW5wdXRNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW0ZpbHRlclBpcGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1NlbGVjdENvbXBvbmVudCwgSmFtT3B0aW9uRm9vdGVyQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbIFNlbGVjdENvbXBvbmVudCwgSmFtT3B0aW9uRm9vdGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1TZWxlY3RNb2R1bGUge31cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zdWJtaXQnLFxuICAgIHN0eWxlczogW2BkaXYsZGl2IGJ1dHRvblt0eXBlPXN1Ym1pdF17d2lkdGg6aW5oZXJpdH1kaXYgYnV0dG9uW3R5cGU9c3VibWl0XXttaW4taGVpZ2h0OjM2cHh9YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uIGNvbG9yPVwiYWNjZW50XCIgKm5nSWY9XCIhbm9DYW5jZWxcIiAoY2xpY2spPVwiY2hhbmdlU3RhdGUoJGV2ZW50KVwiIGNsYXNzPVwiYWNjZW50IHB1bGwtcmlnaHRcIiBycy1lc2Mta2V5PkNhbmNlbGFyPC9idXR0b24+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uICB0eXBlPVwic3VibWl0XCIgYXJpYS1sYWJlbD1cIkd1YXJkYXJcIiBjbGFzcz1cInB1bGwtcmlnaHRcIlxuICAgICAgICBbY29sb3JdPVwic3VibWl0Q29sb3JcIlxuICAgICAgICBbbmdDbGFzc109XCJzdWJtaXRBcHBlYXJhbmNlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImxvYWRpbmcgfHwgZGlzYWJsZWRcIlxuICAgICAgICAoY2xpY2spPVwic3VibWl0KClcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFsb2FkaW5nXCIgY2xhc3M9XCJlbGVtZW50cy11cFwiPnt7IChzdWJtaXRMYWJlbCA/IHN1Ym1pdExhYmVsIDogJ0d1YXJkYXInKSB8IHVwcGVyY2FzZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciBjbGFzcz1cImVsZW1lbnRzLXVwIGRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgbW9kZT1cImluZGV0ZXJtaW5hdGVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIGRpYW1ldGVyPVwiMjBcIlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJDYXJnYW5kbyBFc3BlcmVcIj5cbiAgICAgICAgICAgIDwvbWF0LXByb2dyZXNzLXNwaW5uZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFN1Ym1pdENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHVibGljIHN1Ym1pdEFwcGVhcmFuY2U6ICdtYXQtZmxhdC1idXR0b24nIHwgJ21hdC1zdHJva2VkLWJ1dHRvbicgfCAnbWF0LXJhaXNlZC1idXR0b24nIHwgJ21hdC1idXR0b24nID0gJ21hdC1mbGF0LWJ1dHRvbic7XG4gICAgQElucHV0KCkgcHVibGljIHN1Ym1pdENvbG9yOiAncHJpbWFyeScgfCAnd2FybicgPSAncHJpbWFyeSc7XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBub0NhbmNlbDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsUGFyYW1zU3RhdGU6IG9iamVjdDtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3VibWl0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsU3RhdGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZ29CYWNrID0gZmFsc2U7XG4gICAgQElucHV0KCkgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgcHVibGljIGFjY2VwdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwdWJsaWMgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGNoYW5nZVN0YXRlKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ub0NhbmNlbCAmJiB0aGlzLmdvQmFjaykge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbC5lbWl0KCdnb0JhY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbmNlbCkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FuY2VsU3RhdGUgJiYgKHRoaXMuY2FuY2VsU3RhdGUuc2xpY2UoMCwgMikgPT09ICcuLicpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5jYW5jZWxTdGF0ZV0sIHsgcmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmNhbmNlbFN0YXRlXSwgeyBxdWVyeVBhcmFtczogdGhpcy5jYW5jZWxQYXJhbXNTdGF0ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWNjZXB0LmVtaXQoKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFN1Ym1pdENvbXBvbmVudCB9IGZyb20gJy4vc3VibWl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1N1Ym1pdENvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW1N1Ym1pdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU3VibWl0TW9kdWxlIHt9XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRXN0ZSBjb21wb25lbnQgdHJhYmFqYSBjb24gMiBuZy1jb250ZW50LlxuICogRW4gZWwgY29tcG9uZW50IHF1ZSBzZSB1c2UsIGRlYmUgZGVmaW5pcnNlIGRvcyBuZy1jb250YWluZXIgY29uIGxhcyBjbGFzZXMgY3NzOlxuICogaGVhZGVyLWZpbHRlcnMsIHkgZmlsdGVycywgZGUgZXN0YSBmb3JtYSBlbCBjb21wb25lbnQgc2FiZSBlbiBxdWUgbmctY29udGVudCB1YmljYXIgZWwgY29udGVuaWRvIHF1ZSBzZSBsZSBwYXNhLlxuICovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWZsb2F0aW5nLWZpbHRlcnMnLFxuICAgIHN0eWxlczogW2AvZGVlcC8gLmZpbHRlci1idXR0b24sL2RlZXAvIC5maWx0ZXItYnV0dG9uLXJvdW5kLC9kZWVwLyAuZmlsdGVyLWJ1dHRvbi1zcXVhcmV7cGFkZGluZzowO2NvbG9yOmN1cnJlbnRDb2xvcjtmb250LXdlaWdodDo5MDAhaW1wb3J0YW50O2JveC1zaXppbmc6Ym9yZGVyLWJveH0vZGVlcC8gLmZpbHRlci1idXR0b24gbWF0LWljb24sL2RlZXAvIC5maWx0ZXItYnV0dG9uLXJvdW5kIG1hdC1pY29uLC9kZWVwLyAuZmlsdGVyLWJ1dHRvbi1zcXVhcmUgbWF0LWljb257Y29sb3I6Y3VycmVudENvbG9yIWltcG9ydGFudH0vZGVlcC8gLmZpbHRlci1idXR0b24tcm91bmQ6OmJlZm9yZSwvZGVlcC8gLmZpbHRlci1idXR0b24tc3F1YXJlOjpiZWZvcmUsL2RlZXAvIC5maWx0ZXItYnV0dG9uOjpiZWZvcmV7Y29udGVudDonJztiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtib3JkZXItcmFkaXVzOmluaGVyaXQhaW1wb3J0YW50O29wYWNpdHk6LjA4fS5maWx0ZXItYnV0dG9uLXJvdW5ke2JvcmRlci1yYWRpdXM6MTAwcHghaW1wb3J0YW50fS5maWx0ZXItYnV0dG9uLXNxdWFyZXtib3JkZXItcmFkaXVzOjZweH0uZmlsdGVyLWJ1dHRvbi1zcXVhcmUgYnV0dG9ue2JvcmRlci1yYWRpdXM6NnB4IWltcG9ydGFudH1tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcntiYWNrZ3JvdW5kOjAgMCFpbXBvcnRhbnR9YF0sXG4gICAgdGVtcGxhdGU6IGA8bWF0LWV4cGFuc2lvbi1wYW5lbFxuICAgIFtkaXNhYmxlZF09XCIhaGFzQWR2YW5jZWRGaWx0ZXJzXCJcbiAgICBbaGlkZVRvZ2dsZV09XCJ0cnVlXCJcbiAgICAob3BlbmVkKT1cInRvZ2dsZVN0YXRlRXhwYW5zaW9uUGFuZWwoZmFsc2UpXCJcbiAgICAoY2xvc2VkKT1cInRvZ2dsZVN0YXRlRXhwYW5zaW9uUGFuZWwodHJ1ZSlcIlxuICAgIFtzdHlsZS5ib3gtc2hhZG93XT1cIidub25lJ1wiXG4gICAgY2xhc3M9XCJ3aWR0aC0xMDBcIiBbZXhwYW5kZWRdPVwib3Blbl9leHBhbnNpb25fcGFuZWxcIiBbc3R5bGUuYmFja2dyb3VuZF09XCIndHJhbnNwYXJlbnQnXCI+XG4gICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyIGphbUF2b2lkRGlzYWJsZWRTdHlsZSBbc3R5bGUucGFkZGluZ109XCInMCdcIj5cbiAgICAgICAgPG1hdC1wYW5lbC1kZXNjcmlwdGlvbiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHhcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIFtuZ0NsYXNzXT1cIidmaWx0ZXItYnV0dG9uLScgKyBhcHBlYXJhbmNlXCIgY29sb3I9XCJhY2NlbnRcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc0FkdmFuY2VkRmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTdGF0ZUV4cGFuc2lvblBhbmVsKG9wZW5fZXhwYW5zaW9uX3BhbmVsKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiNHB4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1idXR0b25cIiAoY2xpY2spPVwiY2xlYXJGaWx0ZXJzKG9wZW5fZXhwYW5zaW9uX3BhbmVsKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIdG1sXT1cIiFvcGVuX2V4cGFuc2lvbl9wYW5lbCA/ICdmaWx0ZXJfbGlzdCcgOiAnY2xvc2UnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwib3Blbl9leHBhbnNpb25fcGFuZWwgPyAnQm9ycmFyIGZpbHRyb3MnIDogJ1ZlciBmaWx0cm9zJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RklMVFJPUzwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdFN1ZmZpeFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCInNDAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIdG1sXT1cIm9wZW5fZXhwYW5zaW9uX3BhbmVsID8gJ2Fycm93X2Ryb3BfdXAnIDogJ2Fycm93X2Ryb3BfZG93bidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiIChrZXlkb3duKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZy1jb250YWluZXIuamFtLWZpbHRlci1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtcGFuZWwtZGVzY3JpcHRpb24+XG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHggZ3JpZFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZy1jb250YWluZXIuamFtLWZpbHRlci1jb250ZW50XCI+XG4gICAgICAgIDwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbjwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdGaWx0ZXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgaGFzQWR2YW5jZWRGaWx0ZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgYXBwZWFyYW5jZTogJ3JvdW5kJyB8ICdzcXVhcmUnID0gJ3NxdWFyZSc7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNldEZpbHRlcnM6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBwdWJsaWMgc2hvd19yZXNldF9idXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgb3Blbl9leHBhbnNpb25fcGFuZWwgPSBmYWxzZTtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zaG93X3Jlc2V0X2J1dHRvbiA9IHRoaXMucmVzZXRGaWx0ZXJzLm9ic2VydmVycy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVTdGF0ZUV4cGFuc2lvblBhbmVsKHN0YXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3Blbl9leHBhbnNpb25fcGFuZWwgPSAhc3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyRmlsdGVycyhwYW5lbF9zdGF0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIXBhbmVsX3N0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldEZpbHRlcnMuZW1pdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRXN0YSBkaXJlY3RpdmUgc2UgdXNhIGVuIGNvbmp1bnRvIGNvbiBsYSBkaXJlY3RpdmUvYXR0cmlidXRlIFtkaXNhYmxlZF0uXG4gKiBFcyBlc3BlY2lhbCBwYXJhIGxvcyBtYXRFeHBhbnNpb25QYW5lbCwgY3VhbmRvIHNlIGFwbGljYW4gYm90b25lcyBkZSBhY2Npb25lcyBhbCBoZWFkZXIgZGUgZXN0ZVxuICogeSBubyBzZSBxdWllcmUgYWJyaXIgZWwgbWF0RXhwYW5zaW9uUGFuZWwsIGVudG9uY2VzIGVzdGEgZGlyZWN0aXYgbG8gcXVlIGhhcsODwqEgZXMgbm8gYXBsaWNhciBsb3MgZXN0aWxvcyBhcGFnYWRvXG4gKiBxdWUgcHJvcG9yY2lvbmEgbWF0ZXJpYWwgY3VhbmRvIHVuIGVsZW1lbnRvL3RhZyBlc3RhIGRlcyBoYWJpbGl0YWRvLlxuICovXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2phbUF2b2lkRGlzYWJsZWRTdHlsZV0nXG59KVxuZXhwb3J0IGNsYXNzIEF2b2lkRGlzYWJsZWRTdHlsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBjaGFuZ2VzOiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBjb25zdCBOQVRJVkVfRUxFTUVOVCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuY2hhbmdlcyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnM6IEFycmF5PE11dGF0aW9uUmVjb3JkPik6IHZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzZXJ2aW5nT3JpZ2luYWxTdHlsZXMobXV0YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZXMub2JzZXJ2ZShOQVRJVkVfRUxFTUVOVCwge1xuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVzZXJ2aW5nT3JpZ2luYWxTdHlsZXMobXV0YXRpb246IE11dGF0aW9uUmVjb3JkKTogdm9pZCB7XG4gICAgICAgIGlmIChtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lICE9PSAnYXJpYS1kaXNhYmxlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtZW50czogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUobXV0YXRpb24udGFyZ2V0Lm5vZGVOYW1lKTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9ICdpbmhlcml0JztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsb2F0aW5nRmlsdGVyc0NvbXBvbmVudCB9IGZyb20gJy4vZmxvYXRpbmctZmlsdGVycy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXZvaWREaXNhYmxlZFN0eWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9hdm9pZC1kaXNhYmxlZC1zdHlsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0Zsb2F0aW5nRmlsdGVyc0NvbXBvbmVudCwgQXZvaWREaXNhYmxlZFN0eWxlRGlyZWN0aXZlXSxcbiAgICBleHBvcnRzOiBbRmxvYXRpbmdGaWx0ZXJzQ29tcG9uZW50LCBBdm9pZERpc2FibGVkU3R5bGVEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIEphbUZsb2F0aW5nRmlsdGVyc01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEltYWdlQ2hhbmdlIH0gZnJvbSAnLi9pbWFnZS1jaGFuZ2UtaW50ZXJmYWNlJztcbmltcG9ydCB7IFVwbG9hZE91dHB1dCB9IGZyb20gJ25neC11cGxvYWRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXBpY3R1cmUtbWFuYWdlcicsXG4gICAgdGVtcGxhdGU6IGA8amFtLXVwbG9hZCBbdXBsb2FkVXJsXT1cInVwbG9hZFVybFwiIChkcmFnQW5kRHJvcENoYW5nZSk9XCJkcmFnQW5kRHJvcFN0eWxlcygkZXZlbnQpXCIgKHNob3dQcmV2aWV3KT1cInNob3dQcmV2aWV3KCRldmVudClcIiBtYXQtaWNvbi1idXR0b24gZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiXG4gICAgW2phbUhlYWRlcnNdPVwiamFtSGVhZGVyc1wiXG4gICAgKHJlc3BvbnNlKT1cInJlc3BvbnNlLmVtaXQoJGV2ZW50KVwiXG4gICAgPlxuICAgIDxkaXYgKm5nSWY9XCJkcmFnX2FuZF9kcm9wXCIgW25nQ2xhc3NdPVwidHlwZSArICctZHJhZy1hbmQtZHJvcC1zdHlsZXMnXCI+PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIiFkcmFnX2FuZF9kcm9wXCIgaWQ9XCJwaWN0dXJlLW1hbmFnZXJcIiBjbGFzcz1cIm1vdXNlb3ZlclwiPlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInR5cGVcIiBbc3R5bGUuYmFja2dyb3VuZC1pbWFnZV09XCIndXJsKCcgKyBzb3VyY2UgKyAnKSdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb3VzZW92ZXItY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmx1clwiIFtzdHlsZS5iYWNrZ3JvdW5kLWltYWdlXT1cIid1cmwoJyArIHNvdXJjZSArICcpJ1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBtYXRUb29sdGlwPVwiU3ViaXIgaW1hZ2VuXCI+YWRkX2FfcGhvdG88L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwic2hvd0RlbGV0ZU9wdGlvblwiPjwvbWF0LWRpdmlkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8amFtLWRlbGV0ZS1jb25maXJtYXRpb24gKm5nSWY9XCJzaG93RGVsZXRlT3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVkXT1cInsgY29sb3I6ICd3aGl0ZScgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRlbGV0ZSk9XCJkZWxldGUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9qYW0tZGVsZXRlLWNvbmZpcm1hdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2phbS11cGxvYWQ+XG5gLFxuICAgIHN0eWxlczogW2BqYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKixqYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKj5tYXQtaWNvbnt3aWR0aDphdXRvO2hlaWdodDphdXRvfS5zcXVhcmV7Ym9yZGVyLXJhZGl1czoyJTtvdmVyZmxvdzpoaWRkZW59LnJvdW5ke2JvcmRlci1yYWRpdXM6NTAlO292ZXJmbG93OmhpZGRlbn0ucm91bmQtZHJhZy1hbmQtZHJvcC1zdHlsZXN7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4wNSk7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTgwcHg7aGVpZ2h0OjE4MHB4O3RvcDowO2xlZnQ6MDt6LWluZGV4OjMzMztiYWNrZ3JvdW5kLWltYWdlOnVybCgvYXNzZXRzL2ltYWdlcy9kcmFnX2FuZF9kcm9wLnBuZyk7Ym9yZGVyLXJhZGl1czo1MCV9LnNxdWFyZS1kcmFnLWFuZC1kcm9wLXN0eWxlc3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjA1KTtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxODBweDtoZWlnaHQ6MTgwcHg7dG9wOjA7bGVmdDowO3otaW5kZXg6MzMzO2JhY2tncm91bmQtaW1hZ2U6dXJsKC9hc3NldHMvaW1hZ2VzL2RyYWdfYW5kX2Ryb3AucG5nKX1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKj5tYXQtaWNvbntjb2xvcjojZmZmO2ZvbnQtc2l6ZTo0LjVyZW19amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyLm1vdXNlb3Zlcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTpub25lOy13ZWJraXQtdHJhbnNpdGlvbjpkaXNwbGF5IC4zczt0cmFuc2l0aW9uOmRpc3BsYXkgLjNzfWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXI6aG92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTppbmhlcml0fWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXI6aG92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGQgLmJsdXJ7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7LXdlYmtpdC1maWx0ZXI6Ymx1cigxMHB4KTstbW96LWZpbHRlcjpibHVyKDEwcHgpOy1tcy1maWx0ZXI6Ymx1cigxMHB4KTstby1maWx0ZXI6Ymx1cigxMHB4KTtmaWx0ZXI6Ymx1cigxMHB4KTt3aWR0aDpjYWxjKDEwMCUgKyA0MHB4KTtoZWlnaHQ6Y2FsYygxMDAlICsgNDBweCk7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxO21hcmdpbjotMjBweH1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgZGl2IG1hdC1kaXZpZGVye3dpZHRoOjYwJTtwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXItY29sb3I6I2ZmZn1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgZGl2e3dpZHRoOjE4MHB4O2hlaWdodDoxODBweDtwb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXJ9amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyLm1vdXNlb3ZlciBkaXY+Lm1vdXNlb3Zlci1jaGlsZCAubWVudXt6LWluZGV4OjM7cG9zaXRpb246YWJzb2x1dGU7dG9wOjB9amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyIGRpdj5kaXYub3ZlcmxheXt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjM3Nil9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGljdHVyZU1hbmFnZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qKlxuICAgICAqIElucHV0c1xuICAgICAqIEBwYXJhbSB0eXBlOiBkZXNjcmliZXMgdGhlIHNoYXBlIG9mIHRoZSBpbWFnZSBjb250YWluZXIsIHRoaXMgcGFyYW1ldGVyIGlzIG9wdGlvbmFsLi5cbiAgICAgKiBAcGFyYW0gc291cmNlOiBpcyBhIHVybCB0byByZWZlcmVuY2UgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIGRlbGV0ZVVybDogaXMgYSB1cmwgZm9yIGRlbGV0aW5nIGFuIGltYWdlLCB0aGlzIHBhcmFtZXRlciBpcyBvcHRpb25hbC5cbiAgICAgKiBAcGFyYW0gdXBsb2FkVXJsOiBpcyBhIHVybCBmb3IgdXBsb2FkaW5nIGFuIGltYWdlLCB0aGlzIHBhcmFtZXRlciBpcyBvcHRpb25hbC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgdHlwZTogJ3NxdWFyZScgfCAncm91bmQnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVsZXRlVXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHVwbG9hZFVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVsZXRlT3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgamFtSGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblxuICAgIC8qKlxuICAgICAqIE91dHB1dHNcbiAgICAgKiBAcGFyYW0gdXBsb2FkQ2hhbmdlOiB1cGRhdGVzIHRoZSBpbWFnZSBhbmQgcmV0dXJucyB0aGUgdXJsIGZvciBpdC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VDaGFuZ2U+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXI8VXBsb2FkT3V0cHV0PigpO1xuXG4gICAgcHVibGljIGRyYWdfYW5kX2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cENsaWVudDogSHR0cENsaWVudCkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nRGVmYXVsdFZhbHVlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmFnQW5kRHJvcFN0eWxlcyhkcmFnX2FuZF9kcm9wOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZHJhZ19hbmRfZHJvcCA9IGRyYWdfYW5kX2Ryb3A7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dQcmV2aWV3KGltYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5kZWxldGVVcmwgPSB0aGlzLmRlbGV0ZVVybCB8fCB0aGlzLnNvdXJjZTtcbiAgICAgICAgdGhpcy51cGxvYWRDaGFuZ2UuZW1pdCh7IHN0YXR1c19jaGFuZ2U6ICd1cGRhdGUnLCBzb3VyY2U6IHRoaXMuc291cmNlIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoKSB7XG4gICAgICAgIGxldCBkZWxldGVfdXJsID0gdGhpcy5jcmVhdERlbGV0ZVVybCh0aGlzLnNvdXJjZSk7XG4gICAgICAgIHRoaXMuaHR0cENsaWVudC5kZWxldGUoZGVsZXRlX3VybCwge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5qYW1IZWFkZXJzXG4gICAgICAgIH0pLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXNwb25zZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkQ2hhbmdlLmVtaXQoeyBzdGF0dXNfY2hhbmdlOiAnZGVsZXRlJywgc291cmNlOiB0aGlzLnNvdXJjZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHRpbmdEZWZhdWx0VmFsdWVzKCkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGUgfHwgJ3NxdWFyZSc7XG4gICAgICAgIHRoaXMuZGVsZXRlVXJsID0gdGhpcy5kZWxldGVVcmwgfHwgdGhpcy5zb3VyY2U7XG4gICAgICAgIHRoaXMudXBsb2FkVXJsID0gdGhpcy51cGxvYWRVcmwgfHwgdGhpcy5zb3VyY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdERlbGV0ZVVybChzb3VyY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBpbWdfdXJsX3BhcnRpZXM6IEFycmF5PHN0cmluZz4gPSBzb3VyY2Uuc3BsaXQoJy8nKTtcbiAgICAgICAgbGV0IGltZ19uYW1lOiBzdHJpbmcgPSBpbWdfdXJsX3BhcnRpZXMucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlVXJsICsgaW1nX25hbWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWdhbGxlcnktbWFuYWdlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0Zvcj1cImxldCBwaWN0dXJlIG9mIHBpY3R1cmVzOyBsZXQgcG9zaXRpb24gPSBpbmRleFwiPlxuICAgIDxtYXQtY2FyZCBjbGFzcz1cIm1hdC1jYXJkLWZsYXQgcGFkZGluZy0wIGNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJcIlxuICAgICAgICAqbmdJZj1cImxpbWl0ID8gcG9zaXRpb24gPD0gbGltaXQgOiB0cnVlXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiaGlnaGxpZ2h0ZWRJbWFnZSA9PSBwb3NpdGlvbiA/ICdJbWFnZW4gcHJpbmNpcGFsJyA6IG51bGxcIlxuICAgICAgICBbbmdDbGFzc109XCJoaWdobGlnaHRlZEltYWdlID09IHBvc2l0aW9uID8gJ21hdC1pY29uIG1hdC1hY2NlbnQgaGlnaGxpZ2h0ZWQtaW1hZ2UtY29udGFpbmVyJyA6IG51bGxcIlxuICAgID5cbiAgICAgICAgPG1hdC1pY29uIGNvbG9yPVwiYWNjZW50XCIgKm5nSWY9XCJoaWdobGlnaHRlZEltYWdlID09IHBvc2l0aW9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGlnaGxpZ2h0ZWQtaW1hZ2VcIlxuICAgICAgICA+Y29sbGVjdGlvbnNfYm9va21hcms8L21hdC1pY29uPlxuICAgICAgICA8amFtLXBpY3R1cmUtbWFuYWdlclxuICAgICAgICAgICAgW3Nob3dEZWxldGVPcHRpb25dPVwic2hvd0RlbGV0ZU9wdGlvblwiXG4gICAgICAgICAgICBbc291cmNlXT1cInBpY3R1cmUuYXR0cmlidXRlcy51cmxcIlxuICAgICAgICAgICAgW3VwbG9hZFVybF09XCJ1cGxvYWRVcmwgKyB1cGRhdGVQaWN0dXJlICsgcGljdHVyZS5pZFwiXG4gICAgICAgICAgICBbamFtSGVhZGVyc109XCJqYW1IZWFkZXJzXCJcbiAgICAgICAgPjwvamFtLXBpY3R1cmUtbWFuYWdlcj5cbiAgICA8L21hdC1jYXJkPlxuPC9kaXY+XG48amFtLXVwbG9hZCBpZD1cImdhbGxlcnktbWFuYWdlclwiIFt1cGxvYWRVcmxdPVwidXBsb2FkVXJsXCIgKHNob3dQcmV2aWV3KT1cInNob3dQcmV2aWV3KCRldmVudClcIlxuICAgICpuZ0lmPVwicGljdHVyZXMgJiYgcGljdHVyZXMubGVuZ3RoIDwgbGltaXRcIiBjbGFzcz1cImNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJcIlxuICAgIFtkaXNhYmxlZF09XCJpbWFnZV9sb2FkaW5nXCJcbiAgICAocmVzcG9uc2UpPVwicmVzcG9uc2UoJGV2ZW50KVwiXG4gICAgbWF0LWljb24tYnV0dG9uIG1hdFRvb2x0aXA9XCJTdWJpciBpbWFnZW5cIlxuICAgIFtqYW1IZWFkZXJzXT1cImphbUhlYWRlcnNcIj5cbiAgICA8bWF0LWljb24gaWQ9XCJiYXNlLWljb25cIiBbbmdDbGFzc109XCJpbWFnZV9sb2FkaW5nID8gJ2Rpc2FibGVkLXVwZGF0ZScgOiBudWxsXCI+YWRkX2FfcGhvdG88L21hdC1pY29uPlxuICAgIDxtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciBjbGFzcz1cImVsZW1lbnRzLXVwIGRlZmF1bHRcIlxuICAgICAgICBjbGFzcz1cImxvYWRpbmctcG9zaXRpb25cIlxuICAgICAgICAqbmdJZj1cImltYWdlX2xvYWRpbmdcIlxuICAgICAgICBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiXG4gICAgICAgIHZhbHVlPVwidmFsdWVcIlxuICAgICAgICBkaWFtZXRlcj1cIjQyXCJcbiAgICAgICAgYXJpYS1sYWJlbD1cIkNhcmdhbmRvIEVzcGVyZVwiPlxuICAgIDwvbWF0LXByb2dyZXNzLXNwaW5uZXI+XG48L2phbS11cGxvYWQ+XG5gLFxuICAgIHN0eWxlczogW2BqYW0tdXBsb2FkICNnYWxsZXJ5LW1hbmFnZXJ7d2lkdGg6YXV0bztoZWlnaHQ6MTAwJX0jYmFzZS1pY29ue3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87Zm9udC1zaXplOjhyZW19LmNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJ7cG9zaXRpb246cmVsYXRpdmU7Ym9yZGVyLXJhZGl1czppbmhlcml0fS5oaWdobGlnaHRlZC1pbWFnZS1jb250YWluZXJ7aGVpZ2h0OmF1dG8haW1wb3J0YW50O3dpZHRoOmF1dG8haW1wb3J0YW50Oy0tY29sb3I6Y3VycmVudENvbG9yO2JvcmRlcjoycHggc29saWQgdmFyKC0tY29sb3IpfS5oaWdobGlnaHRlZC1pbWFnZXtwYWRkaW5nOjJweDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O2JhY2tncm91bmQ6aW5oZXJpdDtib3JkZXItcmFkaXVzOjEwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwcHg7bGVmdDpjYWxjKDEwMCUgLSAxNHB4KTt6LWluZGV4OjJ9LmxvYWRpbmctcG9zaXRpb257cG9zaXRpb246YWJzb2x1dGU7dG9wOjU0cHg7bGVmdDo0OHB4fS5kaXNhYmxlZC11cGRhdGV7b3BhY2l0eTouM31gXVxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHBpY3R1cmVzOiBBcnJheTxSZXNvdXJjZSB8IGFueT47XG4gICAgQElucHV0KCkgcHVibGljIHVwbG9hZFVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB1cGRhdGVQaWN0dXJlOiBzdHJpbmcgPSAnL3Bob3Rvcy8nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVsZXRlT3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgamFtSGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IGhpZ2hsaWdodGVkSW1hZ2VcbiAgICAgKiBQb3NpdGlvbiBpbiB0aGUgYXJyYXkgb2YgdGhlIGhpZ2hsaWdodGVkIGltYWdlLCBieSBkZWZhdWx0IGlzIHRoZSBwb3NpdGlvbiAwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBoaWdobGlnaHRlZEltYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgQE91dHB1dCgpIHB1YmxpYyBhZGRQaWN0dXJlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNwb25zZVBpY3R1cmUgPSBuZXcgRXZlbnRFbWl0dGVyPFJlc291cmNlPigpO1xuXG4gICAgcHVibGljIGltYWdlX2xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZEltYWdlID0gdGhpcy5oaWdobGlnaHRlZEltYWdlIHx8IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dQcmV2aWV3KGltZykge1xuICAgICAgICB0aGlzLmFkZFBpY3R1cmUuZW1pdChpbWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNwb25zZShldmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSAhPT0gJ2RvbmUnKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlX2xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbWFnZV9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzcG9uc2VQaWN0dXJlLmVtaXQoZXZlbnQuZmlsZS5yZXNwb25zZS5kYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVXBsb2FkT3V0cHV0LCBVcGxvYWRJbnB1dCwgVXBsb2FkRmlsZSwgaHVtYW5pemVCeXRlcywgVXBsb2FkZXJPcHRpb25zIH0gZnJvbSAnbmd4LXVwbG9hZGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tdXBsb2FkJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgbmdGaWxlRHJvcCBbb3B0aW9uc109XCJvcHRpb25zXCIgKHVwbG9hZE91dHB1dCk9XCJvblVwbG9hZE91dHB1dCgkZXZlbnQpXCIgW3VwbG9hZElucHV0XT1cInVwbG9hZElucHV0XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInVwbG9hZC1idXR0b24gbWFyZ2luLTBcIlxuICAgICAgICAgICAgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8aW5wdXQgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdHlwZT1cImZpbGVcIiBjbGFzcz1cImxheW91dC1tYXJnaW5cIiBuZ0ZpbGVTZWxlY3RcbiAgICAgICAgICAgICAgICBbdXBsb2FkSW5wdXRdPVwidXBsb2FkSW5wdXRcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW29wdGlvbnNdPVwib3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJwcmV2aWV3SW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHVwbG9hZE91dHB1dCk9XCJvblVwbG9hZE91dHB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBtdWx0aXBsZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdGb3I9XCJsZXQgZiBvZiBmaWxlczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJmLnByb2dyZXNzLmRhdGEgPCAxMDBcIj48L21hdC1zcGlubmVyPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFVwbG9hZENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHVibGljIHVwbG9hZFVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gICAgQElucHV0KCkgcHVibGljIHJlZGlyZWN0OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBqYW1IZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBodHRwQ2xpZW50OiBIdHRwQ2xpZW50O1xuICAgIHB1YmxpYyBvcHRpb25zOiBVcGxvYWRlck9wdGlvbnM7XG4gICAgcHVibGljIGZvcm1EYXRhOiBGb3JtRGF0YTtcbiAgICBwdWJsaWMgZmlsZXM6IEFycmF5PFVwbG9hZEZpbGU+O1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkSW5wdXQ6IEV2ZW50RW1pdHRlcjxVcGxvYWRJbnB1dD47XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzaG93UHJldmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNwb25zZTogRXZlbnRFbWl0dGVyPFVwbG9hZE91dHB1dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBkcmFnQW5kRHJvcENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHB1YmxpYyBodW1hbml6ZUJ5dGVzRnVuY3Rpb246IEZ1bmN0aW9uO1xuICAgIHB1YmxpYyBkcmFnT3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICB0aGlzLmZpbGVzID0gW107IC8vIGxvY2FsIHVwbG9hZGluZyBmaWxlcyBhcnJheVxuICAgICAgICB0aGlzLnVwbG9hZElucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxVcGxvYWRJbnB1dD4oKTsgLy8gaW5wdXQgZXZlbnRzLCB3ZSB1c2UgdGhpcyB0byBlbWl0IGRhdGEgdG8gbmd4LXVwbG9hZGVyXG4gICAgICAgIHRoaXMuaHVtYW5pemVCeXRlc0Z1bmN0aW9uID0gaHVtYW5pemVCeXRlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25VcGxvYWRPdXRwdXQob3V0cHV0OiBVcGxvYWRPdXRwdXQpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChvdXRwdXQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYWxsQWRkZWRUb1F1ZXVlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhZGRlZFRvUXVldWUnOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0LmZpbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0ltYWdlKG91dHB1dC5maWxlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcy5wdXNoKG91dHB1dC5maWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd1cGxvYWRpbmcnOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0LmZpbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBjdXJyZW50IGRhdGEgaW4gZmlsZXMgYXJyYXkgZm9yIHVwbG9hZGluZyBmaWxlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWxlcy5maW5kSW5kZXgoZmlsZSA9PiB0eXBlb2Ygb3V0cHV0LmZpbGUgIT09ICd1bmRlZmluZWQnICYmIGZpbGUuaWQgPT09IG91dHB1dC5maWxlLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlc1tpbmRleF0gPSBvdXRwdXQuZmlsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZW1vdmVkJzpcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZmlsZSBmcm9tIGFycmF5IHdoZW4gcmVtb3ZlZFxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSB0aGlzLmZpbGVzLmZpbHRlcigoZmlsZTogVXBsb2FkRmlsZSkgPT4gSlNPTi5zdHJpbmdpZnkoZmlsZSkgIT09IEpTT04uc3RyaW5naWZ5KG91dHB1dC5maWxlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnT3Zlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnQW5kRHJvcENoYW5nZS5lbWl0KHRoaXMuZHJhZ092ZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJhZ091dCc6XG4gICAgICAgICAgICBjYXNlICdkcm9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnQW5kRHJvcENoYW5nZS5lbWl0KHRoaXMuZHJhZ092ZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG9uZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGVyLnVybCArICcvJyArIG91dHB1dC5maWxlLnJlc3BvbnNlLmlkXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzcG9uc2UuZW1pdChvdXRwdXQpO1xuICAgIH1cblxuICAgIC8vIFRoZSBwcmV2aWV3IGZ1bmN0aW9uXG4gICAgcHVibGljIHByZXZpZXdJbWFnZShmaWxlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUubmF0aXZlRmlsZSB8fCBmaWxlLnRhcmdldC5maWxlc1swXSk7XG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGltYWdlOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93UHJldmlldy5lbWl0KGltYWdlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydFVwbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IFVwbG9hZElucHV0ID0ge1xuICAgICAgICAgICAgdHlwZTogJ3VwbG9hZEFsbCcsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXBsb2FkVXJsLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsIC8vIGFnZXJnYXIgZGF0b3NcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuamFtSGVhZGVyc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVwbG9hZElucHV0LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYW5jZWxVcGxvYWQoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwbG9hZElucHV0LmVtaXQoeyB0eXBlOiAnY2FuY2VsJywgaWQ6IGlkIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVGaWxlKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGxvYWRJbnB1dC5lbWl0KHsgdHlwZTogJ3JlbW92ZScsIGlkOiBpZCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQWxsRmlsZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBsb2FkSW5wdXQuZW1pdCh7IHR5cGU6ICdyZW1vdmVBbGwnIH0pO1xuICAgIH1cbn1cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE4IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWNvbmZpcm1hdGlvbi1kaWFsb2cnLFxuICAgIHRlbXBsYXRlOiBgPGgyICpuZ0lmPVwiZGF0YS50aXRsZVwiIG1hdC1kaWFsb2ctdGl0bGUgW2lubmVySHRtbF09XCJkYXRhLnRpdGxlXCI+PC9oMj5cbjxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPHAgW2lubmVySHRtbF09XCJkYXRhLm1zZ1wiPjwvcD5cbjwvbWF0LWRpYWxvZy1jb250ZW50PlxuPG1hdC1kaWFsb2ctYWN0aW9ucyBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1kaWFsb2ctY2xvc2U+Tm88L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gW21hdC1kaWFsb2ctY2xvc2VdPVwidHJ1ZVwiIFtpbm5lckh0bWxdPVwiZGF0YS5hY2NlcHRcIj48L2J1dHRvbj5cbjwvbWF0LWRpYWxvZy1hY3Rpb25zPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50PiwgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKCFkYXRhLmFjY2VwdCkge1xuICAgICAgICAgICAgZGF0YS5hY2NlcHQgPSAnU8ODwq0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGF0YS5tc2cpIHtcbiAgICAgICAgICAgIGRhdGEubXNnID0gJ8OCwr9Fc3TDg8KhIHNlZ3VybyBxdWUgZGVzZWEgY29udGludWFyPyc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWRlbGV0ZS1jb25maXJtYXRpb24nLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImFwcGVhcmFuY2UgfHwgJ21hdC1pY29uLWJ1dHRvbiBtYXQtYnV0dG9uJ1wiXG4gICAgICAgIChjbGljayk9XCJzaG93Q29uZmlybSgpXCJcbiAgICAgICAgW2NvbG9yXT1cInNtYXJ0Q29sb3JbYXBwZWFyYW5jZV1cIlxuICAgICAgICBbbmdTdHlsZV09XCJzdHlsZWRcIlxuICAgICAgICBbbWF0VG9vbHRpcF09XCJ0b29sdGlwIHx8IHRleHQgfHwgJ0VsaW1pbmFyJ1wiXG4gICAgICAgID5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlSWNvbiA/IHN0eWxlSWNvbiA6ICcnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7eyBpY29uID8gaWNvbiA6ICdkZWxldGUnIH19XG4gICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0ZXh0ICYmIGFwcGVhcmFuY2UgIT09ICdtYXQtaWNvbi1idXR0b24nXCIgW2lubmVySHRtbF09XCJ0ZXh0XCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVDb25maXJtYXRpb25Db21wb25lbnQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0eXBlOiAnaWNvbicgfCAnYnV0dG9uJyA9ICdpY29uJzsgLyoqIEBEZXByZWNhdGVkICovXG4gICAgQElucHV0KCkgcHVibGljIGljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtc2c6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjbGFzc2VkOiBzdHJpbmc7IC8qKiBARGVwcmVjYXRlZCAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzdHlsZWQ6IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzdHlsZUljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgYWNjZXB0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGFwcGVhcmFuY2U6ICdtYXQtYnV0dG9uJyB8ICdtYXQtcmFpc2VkLWJ1dHRvbicgfFxuICAgICAgICAnbWF0LWZsYXQtYnV0dG9uJyB8ICdtYXQtc3Ryb2tlZC1idXR0b24nIHwgJ21hdC1pY29uLWJ1dHRvbicgPSAnbWF0LWljb24tYnV0dG9uJztcbiAgICBAT3V0cHV0KCkgcHVibGljIGRlbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgc21hcnRDb2xvciA9IHtcbiAgICAgICAgJ21hdC1idXR0b24nOiAnYWNjZW50JyxcbiAgICAgICAgJ21hdC1yYWlzZWQtYnV0dG9uJzogJ3ByaW1hcnknLFxuICAgICAgICAnbWF0LWZsYXQtYnV0dG9uJzogJ3ByaW1hcnknLFxuICAgICAgICAnbWF0LXN0cm9rZWQtYnV0dG9uJzogJ2FjY2VudCcsXG4gICAgICAgICdtYXQtaWNvbi1idXR0b24nOiAnZGVmYXVsdCdcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2dcbiAgICApIHtcbiAgICAgICAgdGhpcy5tc2cgPSB0aGlzLm1zZyB8fCAnw4LCv0VzdMODwqEgc2VndXJvIGRlIGVsaW1pbmFyPyc7XG4gICAgICAgIHRoaXMuYWNjZXB0ID0gdGhpcy5hY2NlcHQgfHwgJ1PDg8KtJztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0NvbmZpcm0oKTogdm9pZCB7XG4gICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgICAgICAgIGRhdGE6IHsgdGl0bGU6IHRoaXMudGl0bGUsIG1zZzogdGhpcy5tc2csIGFjY2VwdDogdGhpcy5hY2NlcHQgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBEZWxldGVDb25maXJtYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2RlbGV0ZS1jb25maXJtYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEZWxldGVDb25maXJtYXRpb25Db21wb25lbnQsIENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbQ29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50LCBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbURlbGV0ZUNvbmZpcm1hdGlvbk1vZHVsZSB7fVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFVwbG9hZGVyTW9kdWxlIH0gZnJvbSAnbmd4LXVwbG9hZGVyJztcbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vdXBsb2FkL3VwbG9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGljdHVyZU1hbmFnZXJDb21wb25lbnQgfSBmcm9tICcuL3BpY3R1cmUvcGljdHVyZS1tYW5hZ2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudCB9IGZyb20gJy4vZ2FsbGVyeS9nYWxsZXJ5LW1hbmFnZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEphbURlbGV0ZUNvbmZpcm1hdGlvbk1vZHVsZSB9IGZyb20gJy4uL2RlbGV0ZS1jb25maXJtYXRpb24vZGVsZXRlLWNvbmZpcm1hdGlvbi5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgSmFtRGVsZXRlQ29uZmlybWF0aW9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBOZ3hVcGxvYWRlck1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtVcGxvYWRDb21wb25lbnQsIFBpY3R1cmVNYW5hZ2VyQ29tcG9uZW50LCBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW1BpY3R1cmVNYW5hZ2VyQ29tcG9uZW50LCBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtUGljdHVyZU1hbmFnZXJNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvdXJjZSwgRG9jdW1lbnRDb2xsZWN0aW9uLCBTZXJ2aWNlIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmaWx0ZXJPclJlcXVlc3QgfSBmcm9tICcuLi9iYXRjaCc7XG5pbXBvcnQgeyB0cmFja0J5SWQgfSBmcm9tICcuLi90cmFjay1ieS1pZCc7XG5pbXBvcnQgeyBJUGFnZSB9IGZyb20gJ25neC1qc29uYXBpL2ludGVyZmFjZXMvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWNoaXBzLWF1dG9jb21wbGV0ZScsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgW3N0eWxlLndpZHRoLiVdPVwiJzEwMCdcIiBbYXBwZWFyYW5jZV09XCJhcHBlYXJhbmNlXCI+XG4gICAgPG1hdC1sYWJlbCAqbmdJZj1cIm1hdExhYmVsXCI+e3sgbWF0TGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICA8bWF0LWNoaXAtbGlzdCAjY2hpcExpc3Q+XG4gICAgICAgIDxtYXQtY2hpcFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJlc291cmNlX3Jlc291cmNlIG9mIGNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcy5kYXRhOyB0cmFja0J5OiBjb2xsZWN0aW9uX3JlbGF0aW9uc2hpcHMudHJhY2tCeVwiXG4gICAgICAgICAgICBbc2VsZWN0YWJsZV09XCJzZWxlY3RhYmxlXCJcbiAgICAgICAgICAgIFtyZW1vdmFibGVdPVwicmVtb3ZhYmxlXCJcbiAgICAgICAgICAgIChyZW1vdmVkKT1cInJlbW92ZVJlc291cmNlKHJlc291cmNlX3Jlc291cmNlKVwiPlxuICAgICAgICAgICAge3sgcmVzb3VyY2VfcmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVzRGlzcGxheVswXV0gfX1cbiAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmUgKm5nSWY9XCJyZW1vdmFibGVcIj5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlciB8fCAnJ1wiXG4gICAgICAgICAgICAjcmVzb3VyY2VJbnB1dFxuICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiXG4gICAgICAgICAgICBbbWF0Q2hpcElucHV0Rm9yXT1cImNoaXBMaXN0XCJcbiAgICAgICAgICAgIFttYXRDaGlwSW5wdXRBZGRPbkJsdXJdPVwiYWRkT25CbHVyXCI+XG4gICAgPC9tYXQtY2hpcC1saXN0PlxuXG4gICAgPG1hdC1hdXRvY29tcGxldGUgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgKG9wdGlvblNlbGVjdGVkKT1cImFkZFJlc291cmNlKCRldmVudC5vcHRpb24udmFsdWUpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHJlc291cmNlIG9mIGZpbHRlcmVkQ29sbGVjdGlvbiB8IGFzeW5jOyB0cmFja0J5OiB0cmFja0J5SWRcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwiIWNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcy5maW5kKHJlc291cmNlLmlkKVwiIFt2YWx1ZV09XCJyZXNvdXJjZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImxheW91dC1tYXJnaW5cIj5wZXJzb248L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnt7IHJlc291cmNlLmF0dHJpYnV0ZXNbYXR0cmlidXRlc0Rpc3BsYXlbMF1dIH19PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgICAgICA8c21hbGwgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgKm5nRm9yPVwibGV0IGF0dHJpYnV0ZV9uYW1lIG9mIGF0dHJpYnV0ZXNEaXNwbGF5OyBsZXQgYXR0cl9pZCA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImF0dHJfaWQgPj0gMVwiPnwge3sgcmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVfbmFtZV0gfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gXG59KVxuZXhwb3J0IGNsYXNzIENoaXBzQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdyZXNvdXJjZUlucHV0JykgcHVibGljIHJlc291cmNlSW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHJlc291cmNlOiBSZXNvdXJjZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXJ2aWNlOiBTZXJ2aWNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZWxhdGlvbkFsaWFzOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZXNEaXNwbGF5OiBBcnJheTxzdHJpbmc+O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhcHBlYXJhbmNlOiAnc3RhbmRhcmQnIHwgJ291dGxpbmUnIHwgJ2xlZ2FjeScgfCAnZmlsbCc7XG4gICAgQElucHV0KCkgcHVibGljIG1hdExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHBhZ2U6IElQYWdlID0ge1xuICAgICAgICBudW1iZXI6IDEsXG4gICAgICAgIHNpemU6IDUwXG4gICAgfTtcblxuICAgIHB1YmxpYyB0cmFja0J5SWQgPSB0cmFja0J5SWQ7XG4gICAgcHVibGljIGZpbHRlcmVkQ29sbGVjdGlvbjogT2JzZXJ2YWJsZTxBcnJheTxSZXNvdXJjZT4+O1xuICAgIHB1YmxpYyBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgcHVibGljIGNvbGxlY3Rpb246IERvY3VtZW50Q29sbGVjdGlvbjtcbiAgICBwdWJsaWMgYWRkT25CbHVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHJlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNvbGxlY3Rpb25fcmVsYXRpb25zaGlwczogRG9jdW1lbnRDb2xsZWN0aW9uO1xuXG4gICAgcHJpdmF0ZSBjb2xsZWN0aW9uQXJyYXk6IEFycmF5PFJlc291cmNlPiA9IFtdO1xuICAgIHByaXZhdGUgY29sbGVjdGlvbkFycmF5TGFzdEZpbHRlclZhbHVlOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSB0aGlzLnNlcnZpY2UubmV3Q29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcyA9IDxEb2N1bWVudENvbGxlY3Rpb24+dGhpcy5yZXNvdXJjZS5yZWxhdGlvbnNoaXBzW3RoaXMucmVsYXRpb25BbGlhc107XG5cbiAgICAgICAgdGhpcy5maWx0ZXJlZENvbGxlY3Rpb24gPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgZmlsdGVyT3JSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVfdG9fc2VhcmNoOiB0aGlzLmF0dHJpYnV0ZXNEaXNwbGF5WzBdLFxuICAgICAgICAgICAgICAgIHJlc291cmNlc0FycmF5OiB0aGlzLmNvbGxlY3Rpb25BcnJheSxcbiAgICAgICAgICAgICAgICBnZXRBbGxGYzogdGhpcy5nZXRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBsYXN0X2ZpbHRlcl92YWx1ZTogdGhpcy5jb2xsZWN0aW9uQXJyYXlMYXN0RmlsdGVyVmFsdWUsXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5jb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIHBhZ2Vfc2l6ZTogdGhpcy5wYWdlLnNpemVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbChzZWFyY2hfdGV4dDogc3RyaW5nKTogT2JzZXJ2YWJsZTxEb2N1bWVudENvbGxlY3Rpb24+IHtcbiAgICAgICAgaWYgKHNlYXJjaF90ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUZpbHRlciA9IHsgLi4udGhpcy5yZW1vdGVGaWx0ZXIsIC4uLnsgW3RoaXMuYXR0cmlidXRlc0Rpc3BsYXlbMF1dOiBzZWFyY2hfdGV4dCB9fTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZVxuICAgICAgICAgICAgICAgIC5hbGwoe1xuICAgICAgICAgICAgICAgICAgICByZW1vdGVmaWx0ZXI6IHRoaXMucmVtb3RlRmlsdGVyLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiB7IG51bWJlcjogMSwgc2l6ZTogdGhpcy5wYWdlLnNpemUgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZVxuICAgICAgICAgICAgLmFsbCh7XG4gICAgICAgICAgICAgICAgcmVtb3RlZmlsdGVyOiB0aGlzLnJlbW90ZUZpbHRlcixcbiAgICAgICAgICAgICAgICBwYWdlOiB7IG51bWJlcjogMSwgc2l6ZTogdGhpcy5wYWdlLnNpemUgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZpbHRlckNvbGxlY3Rpb24oc2VhcmNoX3RleHQ6IHN0cmluZyB8IFJlc291cmNlKTogQXJyYXk8UmVzb3VyY2U+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSB0eXBlb2Ygc2VhcmNoX3RleHQgPT09ICdzdHJpbmcnID8gc2VhcmNoX3RleHQudG9Mb3dlckNhc2UoKSA6ICcnO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uZGF0YS5maWx0ZXIoKHJlc291cmNlOiBSZXNvdXJjZSkgPT4gcmVzb3VyY2UuYXR0cmlidXRlc1t0aGlzLmF0dHJpYnV0ZXNEaXNwbGF5WzBdXVxuICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgLmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZS5hZGRSZWxhdGlvbnNoaXAocmVzb3VyY2UsIHRoaXMucmVsYXRpb25BbGlhcyk7XG4gICAgICAgIHRoaXMucmVzb3VyY2VJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BsYXlOYW1lKHJlc291cmNlOiBSZXNvdXJjZSk6ICcnIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZS5yZW1vdmVSZWxhdGlvbnNoaXAodGhpcy5yZWxhdGlvbkFsaWFzLCByZXNvdXJjZS5pZCk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRDaGlwc01vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlLCBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBDaGlwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vY2hpcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdENoaXBzTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0NoaXBzQXV0b2NvbXBsZXRlQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbQ2hpcHNBdXRvY29tcGxldGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUNoaXBzQXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJ25neC1qc29uYXBpJztcblxuZXhwb3J0IGludGVyZmFjZSBJRWRpdFRleHRBdHRyaWJ1dGVEYXRhIHtcbiAgICByZXNvdXJjZTogUmVzb3VyY2U7XG4gICAgYXR0cmlidXRlOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBhY2NlcHQ/OiBzdHJpbmc7XG4gICAgbWVzc2FnZT86IHN0cmluZztcbiAgICB0ZXh0YXJlYV9sYWJlbD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZWRpdC10ZXh0LWF0dHJpYnV0ZScsXG4gICAgdGVtcGxhdGU6IGA8Zm9ybSBuYW1lPVwibXlGb3JtXCIgbm92YWxpZGF0ZSAobmdTdWJtaXQpPVwidXBkYXRlQXR0cmlidXRlQW5kQ2xvc2UoZGF0YS5hdHRyaWJ1dGUsIHRleHRfdmFsdWUpXCI+XG4gICAgPGgyICpuZ0lmPVwiZGF0YS50aXRsZVwiIG1hdC1kaWFsb2ctdGl0bGUgW2lubmVySHRtbF09XCJkYXRhLnRpdGxlXCI+PC9oMj5cbiAgICA8bWF0LWRpYWxvZy1jb250ZW50PlxuICAgICAgICA8cCAqbmdJZj1cImRhdGEubWVzc2FnZVwiPnt7IGRhdGEubWVzc2FnZSB9fTwvcD5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkXG4gICAgICAgICAgICBhcHBlYXJhbmNlPVwib3V0bGluZVwiXG4gICAgICAgICAgICBmeEZsZXhcbiAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1sYWJlbD57eyBkYXRhLnRleHRhcmVhX2xhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgICAgICA8dGV4dGFyZWEgbWF4bGVuZ3RoPVwiMTQwXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwidGV4dF9hdHRyaWJ1dGVcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAjdGV4dGFyZWFcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInRleHRfdmFsdWVcIlxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICA+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cImVuZFwiPnt7dGV4dGFyZWEudmFsdWUubGVuZ3RofX0gLyAxNDA8L21hdC1oaW50PlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvbWF0LWRpYWxvZy1jb250ZW50PlxuXG4gICAgPG1hdC1kaWFsb2ctYWN0aW9ucyBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgIDxqYW0tc3VibWl0XG4gICAgICAgICAgICAoY2FuY2VsKT1cImRpYWxvZ1JlZi5jbG9zZSgpXCJcbiAgICAgICAgICAgIFtzdWJtaXRMYWJlbF09XCJkYXRhLmFjY2VwdFwiXG4gICAgICAgID48L2phbS1zdWJtaXQ+XG4gICAgPC9tYXQtZGlhbG9nLWFjdGlvbnM+XG48L2Zvcm0+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEVkaXRUZXh0QXR0cmlidXRlRGlhbG9nQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgdGV4dF92YWx1ZSA9ICcnO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RWRpdFRleHRBdHRyaWJ1dGVEaWFsb2dDb21wb25lbnQ+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IElFZGl0VGV4dEF0dHJpYnV0ZURhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhLmFjY2VwdCkge1xuICAgICAgICAgICAgZGF0YS5hY2NlcHQgPSAnQWNlcHRhcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6IGtleXVwJywgWyckZXZlbnQnXSkgcHVibGljIG9uS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyAmJiAhZXZlbnQuc2hpZnRLZXkpICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBdHRyaWJ1dGVBbmRDbG9zZSh0aGlzLmRhdGEuYXR0cmlidXRlLCB0aGlzLnRleHRfdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUF0dHJpYnV0ZUFuZENsb3NlKGF0dHJpYnV0ZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YS5yZXNvdXJjZS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBKYW1TdWJtaXRNb2R1bGUgfSBmcm9tICcuLi9zdWJtaXQvc3VibWl0Lm1vZHVsZSc7XG5pbXBvcnQge1xuICAgIEVkaXRUZXh0QXR0cmlidXRlRGlhbG9nQ29tcG9uZW50XG59IGZyb20gJy4vZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBKYW1TdWJtaXRNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbRWRpdFRleHRBdHRyaWJ1dGVEaWFsb2dDb21wb25lbnRdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0VkaXRUZXh0QXR0cmlidXRlRGlhbG9nQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRWRpdFRleHRBdHRyaWJ1dGVEaWFsb2dDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUVkaXRUZXh0QXR0cmlidXRlTW9kdWxlIHt9XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQHBhcmFtIGlkOiBUaGUgaWQgbXVzdCBiZSBjb21wb3NlZCBvZiB0aGUgcmVzb3VyY2UgZm9sbG93ZWQgYnkgYSBwZXJpb2QgYW5kIGEgc2hvcnQsXG4gKiBkZXNjcmlwdGl2ZSBtZXNzYWdlIG9mIHRoZSB3YXJuaW5nIGluIHF1ZXN0aW9uLlxuICogQHBhcmFtIG1lc3NhZ2U6IEl0IG11c3QgYmUgYSBkZXNjcmlwdGl2ZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcGFyYW0gbGluazogSXQgaXMgb3B0aW9uYWwsIGFuZCBtdXN0IGNvbnRhaW4gYSByb3V0ZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJV2FybmluZyB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgbGluaz86IHN0cmluZztcbiAgICAgICAgbGlua1F1ZXJ5UGFyYW1zPzoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gICAgICAgIGV4dGVybmFsTGluaz86IHN0cmluZztcbiAgICAgICAgbGlua1RleHQ/OiBzdHJpbmc7XG4gICAgfTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRvcFdhcm5pbmdTZXJ2aWNlIHtcbiAgICBwdWJsaWMgd2FybmluZ3M6IEFycmF5PElXYXJuaW5nPiA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogUmVjZWl2ZXMgYSB3YXJuaW5nIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdhcm5pbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0V2FybmluZ01lc3NhZ2Uod2FybmluZzogSVdhcm5pbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF3YXJuaW5nKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmluZ3MubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaCh3YXJuaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWFyY2hfd2FybmluZyA9IHRoaXMud2FybmluZ3MuZmluZChtc2pfd2FybmluZyA9PiBtc2pfd2FybmluZy5pZCA9PT0gd2FybmluZy5pZCk7XG4gICAgICAgIGlmICghc2VhcmNoX3dhcm5pbmcgfHwgc2VhcmNoX3dhcm5pbmcuaWQgIT09IHdhcm5pbmcuaWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaCh3YXJuaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYXJuaW5nTWVzc2FnZSgpOiBBcnJheTxJV2FybmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5ncztcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJNZXNzYWdlKHdhcm5pbmdfa2V5czogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCB3YXJuaW5nIG9mIHRoaXMud2FybmluZ3MpIHtcbiAgICAgICAgICAgIGlmICghd2FybmluZ19rZXlzLmluY2x1ZGVzKHdhcm5pbmcuaWQpKSBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMud2FybmluZ3MuaW5kZXhPZih3YXJuaW5nKTtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9wV2FybmluZ1NlcnZpY2UgfSBmcm9tICcuL3RvcC13YXJuaW5nLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS10b3Atd2FybmluZycsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWFjY29yZGlvbiAqbmdJZj1cInRvcFdhcm5pbmdTZXJ2aWNlLndhcm5pbmdzLmxlbmd0aCA+IDBcIj5cbiAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbCBpZD1cInJzVG9wV2FybmluZ1wiIGNsYXNzPVwieWVsbG93LWJnLTQwMFwiXG4gICAgICAgIFtleHBhbmRlZF09XCJvcGVuZWRcIlxuICAgICAgICBbbmdDbGFzc109XCJvcGVuZWQgPyAnaGlkZGVuLWhlYWRlcicgOiAnJ1wiXG4gICAgICAgIFtoaWRlVG9nZ2xlXT1cInRydWVcIlxuICAgICAgICAoZXhwYW5kZWRDaGFuZ2UpPVwidG9nZ2xlT3BlbkFjY29yZGlvbigkZXZlbnQpXCI+XG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciAqbmdJZj1cIiFvcGVuZWRcIj5cbiAgICAgICAgICAgIDxtYXQtcGFuZWwtZGVzY3JpcHRpb24gZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj57eyBidXR0b25faWNvbnNbYnV0dG9uX3N0YXRlXSB9fTwvbWF0LWljb24+XG4gICAgICAgICAgICA8L21hdC1wYW5lbC1kZXNjcmlwdGlvbj5cbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHdhcm4gb2YgdG9wV2FybmluZ1NlcnZpY2Uud2FybmluZ3NcIj5cbiAgICAgICAgICAgICAgICA8amFtLXNpbmdsZS13YXJuaW5nXG4gICAgICAgICAgICAgICAgICAgIFttZXNzYWdlXT1cIndhcm4uYXR0cmlidXRlcy5tZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgW2xpbmtdPVwid2Fybi5hdHRyaWJ1dGVzLmxpbmtcIlxuICAgICAgICAgICAgICAgICAgICBbbGlua1F1ZXJ5UGFyYW1zXT1cIndhcm4uYXR0cmlidXRlcy5saW5rUXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgICAgICAgICBbZXh0ZXJuYWxMaW5rXT1cIndhcm4uYXR0cmlidXRlcy5leHRlcm5hbExpbmtcIlxuICAgICAgICAgICAgICAgICAgICBbbGlua1RleHRdPVwid2Fybi5hdHRyaWJ1dGVzLmxpbmtUZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwvamFtLXNpbmdsZS13YXJuaW5nPlxuICAgICAgICAgICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IFtzdHlsZS5jdXJzb3JdPVwiJ3BvaW50ZXInXCIgY2xhc3M9XCJhY3Rpb24tYnV0dG9uXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5lZCA9IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm9wZW5lZFwiXG4gICAgICAgICAgICAgICAgICAgID57eyBidXR0b25faWNvbnNbYnV0dG9uX3N0YXRlXSB9fTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxuPC9tYXQtYWNjb3JkaW9uPlxuYCxcbiAgICBzdHlsZXM6IFtgLnllbGxvdy1iZy00MDB7YmFja2dyb3VuZDojZmZlZTU4fS5vdmVybGF5e3otaW5kZXg6OTk5fS50ZXh0LWNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn1tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcntoZWlnaHQ6MTVweCFpbXBvcnRhbnR9Omhvc3QgL2RlZXAvIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWJvZHl7cGFkZGluZy1ib3R0b206MH1tYXQtZGl2aWRlcntib3JkZXItY29sb3I6I2ZiYzAyZCFpbXBvcnRhbnR9bWF0LWljb257Y29sb3I6Izc1NzU3NX0uYWN0aW9uLWJ1dHRvbntoZWlnaHQ6MjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBUb3BXYXJuaW5nQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgb3BlbmVkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgYnV0dG9uX3N0YXRlOiAnZXhwYW5kZWQnIHwgJ2NvbnRyYWN0ZWQnIHwgJ3N0YW5kYnknID0gJ3N0YW5kYnknO1xuICAgIHB1YmxpYyBidXR0b25faWNvbnMgPSB7XG4gICAgICAgIGV4cGFuZGVkOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgIGNvbnRyYWN0ZWQ6ICdrZXlib2FyZF9hcnJvd191cCcsXG4gICAgICAgIHN0YW5kYnk6ICdyZW1vdmUnXG4gICAgfTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgdG9wV2FybmluZ1NlcnZpY2U6IFRvcFdhcm5pbmdTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdEFjY29yZGlvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gICAgcHVibGljIG9uTW91c2VFbnRlcigpIHtcbiAgICAgICAgdGhpcy5vcGVuZWQgPyB0aGlzLmJ1dHRvbl9zdGF0ZSA9ICdjb250cmFjdGVkJyA6IHRoaXMuYnV0dG9uX3N0YXRlID0gJ2V4cGFuZGVkJztcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgICBwdWJsaWMgb25Nb3VzZUxlYXZlKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbl9zdGF0ZSA9ICdzdGFuZGJ5JztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlT3BlbkFjY29yZGlvbihvcGVuZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuZWQgPSBvcGVuZWQ7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvcGVuZWQnLCB0aGlzLm9wZW5lZC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVmYXVsdEFjY29yZGlvblN0YXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW5lZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvcGVuZWQnKSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG59XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXNpbmdsZS13YXJuaW5nJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtY2FyZCBjbGFzcz1cIm1hdC1jYXJkLWZsYXQgeWVsbG93LWJnLTQwMCB3aWR0aC0xMDBcIlxuICAgICpuZ0lmPVwibWVzc2FnZVwiXG4gICAgW25nU3R5bGVdPVwiY3VzdG9tX3N0eWxlc1wiXG4+XG4gICAgPHNwYW4+e3sgbWVzc2FnZSB9fTwvc3Bhbj5cbiAgICA8YVxuICAgICAgICBbcm91dGVyTGlua109XCJsaW5rXCJcbiAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cImxpbmtRdWVyeVBhcmFtcyB8fCB7fVwiXG4gICAgICAgICpuZ0lmPVwibGlua1wiXG4gICAgICAgID5cbiAgICAgICAge3sgbGlua1RleHQgfHwgJ03Dg8KhcyBpbmZvcm1hY2nDg8KzbicgfX1cbiAgICA8L2E+XG4gICAgPGFcbiAgICAgICAgW2hyZWZdPVwiZXh0ZXJuYWxMaW5rXCJcbiAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgKm5nSWY9XCJleHRlcm5hbExpbmtcIlxuICAgICAgICA+XG4gICAgICAgIHt7IGxpbmtUZXh0IHx8ICdNw4PCoXMgaW5mb3JtYWNpw4PCs24nIH19XG4gICAgPC9hPlxuXG4gICAgPGJ1dHRvblxuICAgICAgICAqbmdJZj1cImFjdGlvbkJ1dHRvblRleHRcIlxuICAgICAgICBtYXQtYnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBuYW1lPVwiYnV0dG9uXCJcbiAgICAgICAgKGNsaWNrKT1cImFjdGlvbkJ1dHRvbkNsaWNrLmVtaXQoKVwiXG4gICAgICAgID5cbiAgICAgICAge3sgYWN0aW9uQnV0dG9uVGV4dCB9fVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJhY3Rpb25JY29uQnV0dG9uXCJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFttYXRUb29sdGlwXT1cImFjdGlvbkljb25CdXR0b25Ub29sdGlwXCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG5hbWU9XCJidXR0b25cIlxuICAgICAgICAoY2xpY2spPVwiYWN0aW9uSWNvbkJ1dHRvbkNsaWNrLmVtaXQoKVwiXG4gICAgICAgID5cbiAgICAgICAgPG1hdC1pY29uPlxuICAgICAgICAgICAge3sgYWN0aW9uSWNvbkJ1dHRvbiB9fVxuICAgICAgICA8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuPC9tYXQtY2FyZD5cbmAsXG4gICAgc3R5bGVzOiBbYC55ZWxsb3ctYmctNDAwe2JveC1zaXppbmc6Ym9yZGVyLWJveDtiYWNrZ3JvdW5kOiNmZmVlNTg7Y29sb3I6IzIxMjEyMX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTaW5nbGVXYXJuaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdGV4dENvbG9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGxpbms6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbGlua1F1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGxpbmtUZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGFjdGlvbkJ1dHRvblRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgYWN0aW9uSWNvbkJ1dHRvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhY3Rpb25JY29uQnV0dG9uVG9vbHRpcDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgYWN0aW9uQnV0dG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIGFjdGlvbkljb25CdXR0b25DbGljazogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgcHVibGljIGN1c3RvbV9zdHlsZXM6IHtcbiAgICAgICAgY29sb3I/OiBzdHJpbmc7XG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJz86IHN0cmluZztcbiAgICB9ID0ge307XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmJhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21fc3R5bGVzWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50ZXh0Q29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX3N0eWxlcy5jb2xvciA9IHRoaXMudGV4dENvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRFeHBhbnNpb25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IFRvcFdhcm5pbmdDb21wb25lbnQgfSBmcm9tICcuL3RvcC13YXJuaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW5nbGVXYXJuaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9zaW5nbGUtd2FybmluZy9zaW5nbGUtd2FybmluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9wV2FybmluZ1NlcnZpY2UgfSBmcm9tICcuL3RvcC13YXJuaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgICAgIC8vIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbVG9wV2FybmluZ0NvbXBvbmVudCwgU2luZ2xlV2FybmluZ0NvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbVG9wV2FybmluZ1NlcnZpY2VdLFxuICAgIGV4cG9ydHM6IFtUb3BXYXJuaW5nQ29tcG9uZW50LCBTaW5nbGVXYXJuaW5nQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1Ub3BXYXJuaW5nTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZGlhbG9nLWxvZ2dlZC1zdGF0ZScsXG4gICAgdGVtcGxhdGU6IGA8aDMgbWF0LWRpYWxvZy10aXRsZT5UdSBzZXNpw4PCs24gc2UgaGEgY2VycmFkby48L2gzPlxuPGhyPlxuPG1hdC1kaWFsb2ctY29udGVudD5cbiAgICA8cD5FcyBuZWNlc2FyaW8gcXVlIHZ1ZWx2YXMgYSBpbmdyZXNhciB0dSB1c3VhcmlvIHkgY29udHJhc2XDg8KxYS4gw4LCoVZhbW9zIGEgZWxsbyE8L3A+XG48L21hdC1kaWFsb2ctY29udGVudD5cbjxtYXQtZGlhbG9nLWFjdGlvbnMgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgIDxqYW0tc3VibWl0IChhY2NlcHQpPVwib25DbG9zZUNvbmZpcm0oKVwiIFtub0NhbmNlbF09XCJ0cnVlXCIgc3VibWl0TGFiZWw9XCJBY2VwdGFyXCI+PC9qYW0tc3VibWl0PlxuPC9tYXQtZGlhbG9nLWFjdGlvbnM+XG5gXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0xvZ2dlZFN0YXRlQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJvdGVjdGVkIHRoaXNEaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudD4pIHt9XG5cbiAgICBwdWJsaWMgb25DbG9zZUNvbmZpcm0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGhpc0RpYWxvZ1JlZi5jbG9zZSgnQ29uZmlybScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlQ2FuY2VsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRoaXNEaWFsb2dSZWYuY2xvc2UoJ0NhbmNlbCcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBKc29uYXBpQ29yZSB9IGZyb20gJ25neC1qc29uYXBpJztcbmltcG9ydCB7IFRvYXN0ZXJTZXJ2aWNlIH0gZnJvbSAnYW5ndWxhcjItdG9hc3Rlcic7XG5pbXBvcnQgeyBEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2xvZ2dlZC1zdGF0ZS9kaWFsb2ctbG9nZ2VkLXN0YXRlLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbFN0YXRlU2VydmljZSB7XG4gICAgbG9nb3V0KCk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKYW1FcnJvckhhbmRsZXIgZXh0ZW5kcyBFcnJvckhhbmRsZXIge1xuICAgIHB1YmxpYyBsYXN0RXJyb3JDYWNoZWQgPSB7IHRpdGxlOiAnJywgdGltZTogMCB9O1xuICAgIHB1YmxpYyB0b2tlbl9kaWFsb2dfaXNfb3BlbjogYm9vbGVhbjtcbiAgICBwdWJsaWMgZ2xvYmFsU3RhdGVTZXJ2aWNlOiBJR2xvYmFsU3RhdGVTZXJ2aWNlO1xuICAgIHB1YmxpYyBzaG93X2FuZ3VsYXJfZXJyb3JzID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHB1YmxpYyBtYXREaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgICAgcHVibGljIHRvYXN0ZXJTZXJ2aWNlOiBUb2FzdGVyU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIHRoaXMuTm90aWZpY2F0aW9uKCdFcnJvciBhbCBjb250YWN0YXIgY29uIGVsIHNlcnZpZG9yLCBpbnRlbnRhIG51ZXZhbWVudGUgbcODwqFzIHRhcmRlLicpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNTAwIHx8IGVycm9yLm1lc3NhZ2UgJiYgZXJyb3IubWVzc2FnZSA9PT0gJ1NlcnZlciBFcnJvcicpIHtcbiAgICAgICAgICAgIHRoaXMudW5oYW5kbGVkRXJyb3IoZXJyb3Iuc3RhdHVzKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5lcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSnNvbmFwaUVycm9ycyhlcnJvcik7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IucmVqZWN0aW9uKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGZpcnN0IGNhc2UgaXMgZm9yIGd1ZXN0IG1vZHVsZSByZWplY3Rpb25zXG4gICAgICAgICAgICBpZiAoZXJyb3IucmVqZWN0aW9uLmVycm9yICYmIGVycm9yLnJlamVjdGlvbi5lcnJvci5lcnJvcnMpIHRoaXMuaGFuZGxlSnNvbmFwaUVycm9ycyhlcnJvci5yZWplY3Rpb24uZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlamVjdGlvbi5lcnJvcnMpIHRoaXMuaGFuZGxlSnNvbmFwaUVycm9ycyhlcnJvci5yZWplY3Rpb24pO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmVqZWN0aW9uOicsIGVycm9yLnJlamVjdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMudW5oYW5kbGVkRXJyb3IoZXJyb3Iuc3RhdHVzKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvci5tZXNzYWdlICYmIHRoaXMuc2hvd19hbmd1bGFyX2Vycm9ycykge1xuICAgICAgICAgICAgdGhpcy51bmhhbmRsZWRFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlSnNvbmFwaUVycm9ycyhlcnJvciwgdXNlX2Vycm9yX2NhY2hlID0gdHJ1ZSkge1xuICAgICAgICBmb3IgKGxldCBhY3R1YWxfZXJyb3Igb2YgZXJyb3IuZXJyb3JzKSB7XG5cbiAgICAgICAgICAgIGlmICh1c2VfZXJyb3JfY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAvLyBzaSBlcyB1bHRpbW8gbWVuc2FqZSByZWNpYmlkbyB5IHNvbG8gaGFuIHBhc2FkbyAyIHNlZ3VuZG9zLCBubyBtdWVzdHJhIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdEVycm9yQ2FjaGVkLnRpdGxlID09PSBhY3R1YWxfZXJyb3IudGl0bGUgJiYgdGhpcy5sYXN0RXJyb3JDYWNoZWQudGltZSA+IERhdGUubm93KCkgLSAyMDAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RFcnJvckNhY2hlZC50aXRsZSA9IGFjdHVhbF9lcnJvci50aXRsZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RFcnJvckNhY2hlZC50aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoIChhY3R1YWxfZXJyb3IudGl0bGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5vdGlmaWNhdGlvbihhY3R1YWxfZXJyb3IuZGV0YWlsLCAnZXJyb3InKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAnQmFkIHJlcXVlc3QnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0dWFsX2Vycm9yLmRldGFpbC5pbmNsdWRlcygnVG9rZW4gcmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHRoaXMubG9nT3V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSW52YWxpZCBkYXRhIHJlY2VpdmVkJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdHVhbF9lcnJvci5kZXRhaWwgPT09ICdUaGUgcmVmcmVzaCB0b2tlbiBtdXN0IGJlIGF0IGxlYXN0IDIwIGNoYXJhY3RlcnMuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHRoaXMubG9nT3V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnVG9rZW4gaGFzIGV4cGlyZWQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1Rva2VuIG5vdCBwcm92aWRlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bihhc3luYyAoKSA9PiB0aGlzLmxvZ091dCgpKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAnVG9vIG1hbnkgYXR0ZW1wdHMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5vdGlmaWNhdGlvbignSGFzIGFnb3RhZG8gZWwgbMODwq1taXRlIGRlIGludGVudG9zLCBlc3BlcmEgdW4gbW9tZW50byBhbnRlcyBkZSBjb250aW51YXIuJywgJ2Vycm9yJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYW5ub3QgdXNlIHNwZWNpYWwgY29uZGl0aW9ucyB0byBTV0lUQ0ggc3RhdGVtZW50IHdpdGhvdXQgY2hhbmdpbmcgdGhlIGRhdGEgaW5zaWRlIHN3aXRjaCB0byBcInRydWVcIlxuICAgICAgICAgICAgaWYgKGFjdHVhbF9lcnJvci5kZXRhaWwuaW5jbHVkZXMoJ1Rva2VuIHJlcXVpcmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4gdGhpcy5sb2dPdXQoKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYWN0dWFsX2Vycm9yLmRldGFpbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0V4cGlyZWQgYWNjZXNzIHRva2VuLic6XG4gICAgICAgICAgICAgICAgY2FzZSAnVGhlIHJlZnJlc2ggdG9rZW4gaXMgaW52YWxpZC4gQ2Fubm90IGRlY3J5cHQgdGhlIHJlZnJlc2ggdG9rZW4nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0ludmFsaWQgYWNjZXNzIHRva2VuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHRoaXMubG9nT3V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaW5nbGVFcnJvcihhY3R1YWxfZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvZ091dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9rZW5fZGlhbG9nX2lzX29wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRva2VuX2RpYWxvZ19pc19vcGVuID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZGlhbG9nX3JlZiA9IHRoaXMubWF0RGlhbG9nLm9wZW4oRGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnQsIHtcbiAgICAgICAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpYWxvZ19yZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnRva2VuX2RpYWxvZ19pc19vcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbFN0YXRlU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvcm0oZm9ybTogRm9ybUdyb3VwKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgfVxuXG4gICAgcHVibGljIE5vdGlmaWNhdGlvbih0aXRsZTogc3RyaW5nLCB0eXBlPzogJ3N1Y2Nlc3MnIHwgJ2Vycm9yJyB8ICdpbmZvJyB8ICd3YXJuaW5nJywgYm9keT86IHN0cmluZykge1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSB0aXRsZS5zcGxpdCgnfCcpO1xuICAgICAgICB0eXBlID0gdHlwZSB8fCAnZXJyb3InO1xuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlLnBvcCh0eXBlLCB0aXRsZSwgYm9keSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlYWNoIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBpZiAoZWFjaCAhPT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlLnBvcCh0eXBlLCBlYWNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaW5nbGVFcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoIWVycm9yLmRldGFpbCAmJiAhZXJyb3IudGl0bGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgY2FudCBiZSBoYW5kbGVkOicsIGVycm9yKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybSAmJiBlcnJvci5zb3VyY2UgJiYgdGhpcy5mb3JtLmdldChlcnJvci5zb3VyY2UuYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldChlcnJvci5zb3VyY2UuYXR0cmlidXRlKS5zZXRFcnJvcnMoeyAnc2VydmVyLWVycm9yJzogZXJyb3IuZGV0YWlsIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5Ob3RpZmljYXRpb24oZXJyb3IuZGV0YWlsIHx8IGVycm9yLnRpdGxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bmhhbmRsZWRFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5Ob3RpZmljYXRpb24oXG4gICAgICAgICAgICAnVXBzLCBoYSBvY3VycmlkbyB1biBlcnJvci4gQ29udMODwqFjdGFub3MgcG9yIGNvcnJlbyBhIHNvcG9ydGVAbXVsdGluZXhvLmNvbScsXG4gICAgICAgICAgICAnZXJyb3InLFxuICAgICAgICAgICAgYEPDg8KzZGlnbyBkZSBlcnJvcjogJHttZXNzYWdlfWBcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBKYW1TdWJtaXRNb2R1bGUgfSBmcm9tICcuLi9zdWJtaXQvc3VibWl0Lm1vZHVsZSc7XG5pbXBvcnQgeyBKYW1FcnJvckhhbmRsZXIgfSBmcm9tICcuL2Vycm9yLWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2xvZ2dlZC1zdGF0ZS9kaWFsb2ctbG9nZ2VkLXN0YXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIEphbVN1Ym1pdE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbSmFtRXJyb3JIYW5kbGVyXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW0RpYWxvZ0xvZ2dlZFN0YXRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1FcnJvckhhbmRsZXJNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhdERhdGVwaWNrZXJSYW5nZVZhbHVlLCBTYXREYXRlcGlja2VySW5wdXRFdmVudCB9IGZyb20gJ3NhdHVybi1kYXRlcGlja2VyJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuY29uc3Qgc3RhcnRfdGltZSA9IFswLCAwLCAwXTtcbmNvbnN0IGVuZF90aW1lID0gWzIzLCA1OSwgNTldO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1yYW5nZS1kYXRlcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBbbWF0VG9vbHRpcF09XCJsYWJlbFwiPlxuICAgIDxtYXQtc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbFwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAoY2xpY2spPVwiYXBwbHlDdXN0b21SYW5nZSgkZXZlbnQsIHJlc3VsdFBpY2tlcik7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgICAgICAgICA8c2F0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFByZWZpeCBbZm9yXT1cInJlc3VsdFBpY2tlclwiPjwvc2F0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgPGlucHV0IG1hdElucHV0XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJSYW5nbyBwZXJzb25hbGl6YWRvXCJcbiAgICAgICAgICAgICAgICAjcmVzdWx0UGlja2VyTW9kZWw9XCJuZ01vZGVsXCJcbiAgICAgICAgICAgICAgICBbc2F0RGF0ZXBpY2tlcl09XCJyZXN1bHRQaWNrZXJcIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgKGRhdGVJbnB1dCk9XCJvbkRhdGVJbnB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoZGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2UoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPHNhdC1kYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAjcmVzdWx0UGlja2VyIFtyYW5nZU1vZGVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPC9zYXQtZGF0ZXBpY2tlcj5cblxuICAgICAgICAgICAgPGRpdiBtYXRTdWZmaXggZnhGbGV4PVwiMTBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRUb29sdGlwPVwiTGltcGlhciBmaWx0cm9cIiAoY2xpY2spPVwiY2xlYXJSYW5nZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuXG4gICAgICAgIDxtYXQtb3B0aW9uIChjbGljayk9XCJhcHBseVRvZGF5KClcIj5Ib3k8L21hdC1vcHRpb24+XG4gICAgICAgIDxtYXQtb3B0aW9uIChjbGljayk9XCJhcHBseUxhc3RXZWVrKClcIj7Dg8KabHRpbWEgc2VtYW5hPC9tYXQtb3B0aW9uPlxuICAgICAgICA8bWF0LW9wdGlvbiAoY2xpY2spPVwiYXBwbHlDdXJyZW50TW9udGgoKVwiPkVzdGUgbWVzPC9tYXQtb3B0aW9uPlxuICAgICAgICA8bWF0LW9wdGlvbiAoY2xpY2spPVwiYXBwbHlsYXN0TW9udGgoKVwiPkVsIG1lcyBwYXNhZG88L21hdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0PlxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gICAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxuICAgIHN0eWxlczogW2BtYXQtZm9ybS1maWVsZHtmb250LXNpemU6MTVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBSYW5nZURhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBkYXRlOiBTYXREYXRlcGlja2VyUmFuZ2VWYWx1ZTxEYXRlPjtcbiAgICBwdWJsaWMgbGFzdERhdGVJbnB1dDogU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT4gfCBudWxsO1xuICAgIHB1YmxpYyBsYXN0RGF0ZUNoYW5nZTogU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT4gfCBudWxsO1xuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHVibGljIHN0YXJ0RGF0ZTogRGF0ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZW5kRGF0ZTogRGF0ZTtcblxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc3RhcnREYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZW5kRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHVwZGF0ZURhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGF0ZVBpcGU6IERhdGVQaXBlKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxhYmVsID0gJ1JhbmdvIGRlIGZlY2hhJztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlSW5wdXQoZXZlbnQ6IFNhdERhdGVwaWNrZXJJbnB1dEV2ZW50PERhdGU+KTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFzdERhdGVJbnB1dCA9IGV2ZW50LnZhbHVlIGFzIFNhdERhdGVwaWNrZXJSYW5nZVZhbHVlPERhdGU+O1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGVDaGFuZ2UodGhpcy5sYXN0RGF0ZUlucHV0LmJlZ2luLCB0aGlzLmxhc3REYXRlSW5wdXQuZW5kKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlQ2hhbmdlKGV2ZW50OiBTYXREYXRlcGlja2VySW5wdXRFdmVudDxEYXRlPik6IHZvaWQge1xuICAgICAgICB0aGlzLmxhc3REYXRlQ2hhbmdlID0gZXZlbnQudmFsdWUgYXMgU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT47XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZUNoYW5nZSh0aGlzLmxhc3REYXRlQ2hhbmdlLmJlZ2luLCB0aGlzLmxhc3REYXRlQ2hhbmdlLmVuZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFwcGx5Q3VzdG9tUmFuZ2UoZXZlbnQsIHBpY2tlcik6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcGlja2VyLm9wZW4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwbHlMYXN0V2VlaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXREYXRlKHRoaXMuZW5kRGF0ZS5nZXREYXRlKCkgLSA2KTtcbiAgICAgICAgdGhpcy5kYXRlID0geyBiZWdpbjogdGhpcy5zdGFydERhdGUsIGVuZDogdGhpcy5lbmREYXRlIH07XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZUNoYW5nZSh0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwbHlUb2RheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBseUN1cnJlbnRNb250aCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCAxKTtcbiAgICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSArIDEsIDApO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclJhbmdlKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmRhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGVDaGFuZ2UobnVsbCwgbnVsbCk7XG4gICAgICAgIHRoaXMubGFiZWwgPSAnUmFuZ28gZGUgZmVjaGEnO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBseWxhc3RNb250aCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpIC0gMSwgMSk7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCksIDApO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRGF0ZUNoYW5nZShzdGFydF9kYXRlOiBEYXRlLCBlbmRfZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHN0YXJ0X2RhdGU7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IGVuZF9kYXRlO1xuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy50b2dnbGVQcmV2aWV3VGV4dChzdGFydF9kYXRlLCBlbmRfZGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlQ2hhbmdlLmVtaXQodGhpcy5mb3JtYXREYXRlQW5kQWRkVGltZShzdGFydF9kYXRlLCBzdGFydF90aW1lKSk7XG4gICAgICAgIHRoaXMuZW5kRGF0ZUNoYW5nZS5lbWl0KHRoaXMuZm9ybWF0RGF0ZUFuZEFkZFRpbWUoZW5kX2RhdGUsIGVuZF90aW1lKSk7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2dnbGVQcmV2aWV3VGV4dChzdGFydF9kYXRlOiBEYXRlLCBlbmRfZGF0ZT86IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc3RhcnRfZGF0ZSAmJiBlbmRfZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUHJldmlld1RleHQoc3RhcnRfZGF0ZSwgZW5kX2RhdGUpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRfZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5cyhzdGFydF9kYXRlKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZF9kYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXlzKGVuZF9kYXRlKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXlzKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAoZGF0ZS5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuICdob3knO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsICdkZCBNTU0geXl5eScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUHJldmlld1RleHQoc3RhcnRfZGF0ZTogRGF0ZSwgZW5kX2RhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc3RhcnRfZGF0ZS5nZXRGdWxsWWVhcigpICE9PSBlbmRfZGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHN0YXJ0X2RhdGUsICdkZCBNTU0geXl5eSAtICcpICtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShlbmRfZGF0ZSwgJ2RkIE1NTSB5eXl5JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRfZGF0ZS5nZXRNb250aCgpID09PSBlbmRfZGF0ZS5nZXRNb250aCgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb21wYXJlRGF5c09mVGhlU2FtZU1vbnRoKCkpIHJldHVybiB0aGlzLmdldERheXMoc3RhcnRfZGF0ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oc3RhcnRfZGF0ZSwgJ2RkIC0gJykgK1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGVuZF9kYXRlLCAnZGQnKSArXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZW5kX2RhdGUsICcgTU1NIHl5eXknKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShzdGFydF9kYXRlLCAnZGQgTU1NIC0gJykgK1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZW5kX2RhdGUsICdkZCBNTU0nKSArXG4gICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShlbmRfZGF0ZSwgJyB5eXl5JylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXBhcmVEYXlzT2ZUaGVTYW1lTW9udGgoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZS5nZXREYXRlKCkgPT09IHRoaXMuZW5kRGF0ZS5nZXREYXRlKCkpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0RGF0ZUFuZEFkZFRpbWUoZGF0ZTogRGF0ZSwgdGltZTogQXJyYXk8bnVtYmVyPik6IERhdGUge1xuICAgICAgICBkYXRlLnNldEhvdXJzKHRpbWVbMF0sIHRpbWVbMV0sIHRpbWVbMl0pO1xuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRPcHRpb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJhbmdlRGF0ZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vcmFuZ2UtZGF0ZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2F0RGF0ZXBpY2tlck1vZHVsZSwgU2F0TmF0aXZlRGF0ZU1vZHVsZSB9IGZyb20gJ3NhdHVybi1kYXRlcGlja2VyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBTYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgICAgICBTYXREYXRlcGlja2VyTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdE9wdGlvbk1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUmFuZ2VEYXRlcGlja2VyQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbUmFuZ2VEYXRlcGlja2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1SYW5nZURhdGVwaWNrZXJNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZhYlNwZWVkRGlhbE1pbmlCdXR0b24gfSBmcm9tICcuL2ZhYi1zcGVlZC1kaWFsLW1pbmktYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmFiLXNwZWVkLWRpYWwnLFxuICAgIHRlbXBsYXRlOiBgPGVjby1mYWItc3BlZWQtZGlhbFxuICAgIGNsYXNzPVwicnMtc3BlZWQtZGlhbC0tcG9zaXRpb25cIlxuICAgIFthbmltYXRpb25Nb2RlXT1cImFuaW1hdGlvbk1vZGVcIlxuICAgIChtb3VzZW92ZXIpPVwidG9nZ2xlRmFiU3RhdHVzKCdvcGVuJylcIlxuICAgIChtb3VzZWxlYXZlKT1cInRvZ2dsZUZhYlN0YXR1cygnY2xvc2UnKVwiXG4gICAgWyhvcGVuKV09XCJmYWJfc3RhdHVzLm9wZW5lZFwiXG4gICAgW2ZpeGVkXT1cInRydWVcIlxuICAgID5cbiAgICA8ZWNvLWZhYi1zcGVlZC1kaWFsLXRyaWdnZXIgW3NwaW5dPVwic3BpblwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYXQtZmFiXG4gICAgICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwidG9vbHRpcFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZmFiU3BlZWREaWFsQ2xpY2suZW1pdCgpXCJcbiAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmsgfHwgW11cIlxuICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cInF1ZXJ5UGFyYW1zXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj57eyBmYWJfc3RhdHVzLm9wZW5lZCA/IGljb24gOiAnYWRkJyB9fTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZWNvLWZhYi1zcGVlZC1kaWFsLXRyaWdnZXI+XG5cbiAgICA8ZWNvLWZhYi1zcGVlZC1kaWFsLWFjdGlvbnMgW2hpZGRlbl09XCIhZmFiX3N0YXR1cy5vcGVuZWRcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGZhYlNwZWVkRGlhbE1pbmlCdXR0b24gb2YgZmFiU3BlZWREaWFsTWluaUJ1dHRvbnNcIlxuICAgICAgICAgICAgbWF0LW1pbmktZmFiXG4gICAgICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi50b29sdGlwXCJcbiAgICAgICAgICAgIChjbGljayk9XCJhY3Rpb25zQ2xpY2suZW1pdChmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmtleSlcIlxuICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5yb3V0ZXJfbGluayB8fCBbXVwiXG4gICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5xdWVyeV9wYXJhbXMgfHwgcXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5pY29uLnR5cGUgPT09ICdzdmctaWNvbidcIiBbc3ZnSWNvbl09XCJmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmljb24ubmFtZVwiPjwvbWF0LWljb24+XG4gICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmljb24udHlwZSA9PT0gJ21hdC1pY29uJ1wiPnt7IGZhYlNwZWVkRGlhbE1pbmlCdXR0b24uaWNvbi5uYW1lIH19PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9lY28tZmFiLXNwZWVkLWRpYWwtYWN0aW9ucz5cbjwvZWNvLWZhYi1zcGVlZC1kaWFsPlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRmFiU3BlZWREaWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBhbmltYXRpb25Nb2RlOiBzdHJpbmcgPSAnc2NhbGUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0b29sdGlwOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoKSBwdWJsaWMgc3BpbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcHVibGljIGljb246IHN0cmluZyA9ICdhZGQnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByb3V0ZXJMaW5rOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZmFiU3BlZWREaWFsTWluaUJ1dHRvbnM6IEFycmF5PEZhYlNwZWVkRGlhbE1pbmlCdXR0b24+ID0gW107XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGZhYlNwZWVkRGlhbENsaWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBhY3Rpb25zQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGZhYl9zdGF0dXMgPSB7XG4gICAgICAgIG9wZW5lZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogJ2Nsb3NlZCdcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMucXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUZhYlN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMuc3RhdHVzID0gJ29wZW5lZCc7XG4gICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFiX3N0YXR1cy5zdGF0dXMgPSAnY2xvc2VkJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhYl9zdGF0dXMuc3RhdHVzID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIEZhYlNwZWVkRGlhbE1pbmlCdXR0b24ge1xuICAgIHB1YmxpYyBrZXk6IHN0cmluZztcbiAgICBwdWJsaWMgbmF2aWdhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xuICAgIHB1YmxpYyByb3V0ZXJfbGluazogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgcXVlcnlfcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICBwdWJsaWMgaWNvbjogeyBuYW1lOiBzdHJpbmc7IHR5cGU6ICdzdmctaWNvbid8J21hdC1pY29uJyB9ID0geyBuYW1lOiAnYWRkJywgdHlwZTogJ21hdC1pY29uJyB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgdG9vbHRpcDogc3RyaW5nLFxuICAgICAgICByb3V0ZXJfbGluaz86IEFycmF5PHN0cmluZz4sXG4gICAgICAgIHF1ZXJ5X3BhcmFtcz86IHtba2V5OiBzdHJpbmddOiBhbnl9XG4gICAgKSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnRvb2x0aXAgPSB0b29sdGlwO1xuICAgICAgICBpZiAocm91dGVyX2xpbmspIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyX2xpbmsgPSByb3V0ZXJfbGluaztcbiAgICAgICAgICAgIHRoaXMucXVlcnlfcGFyYW1zID0gcXVlcnlfcGFyYW1zIHx8IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFJvdXRlckxpbmsocm91dGVyX2xpbms6IEFycmF5PHN0cmluZz4pOiB0aGlzIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJfbGluayA9IHJvdXRlcl9saW5rO1xuICAgICAgICB0aGlzLm5hdmlnYXRlID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Um91dGVyTGluaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyX2xpbms7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFF1ZXJ5UGFyYW1zKHF1ZXJ5X3BhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiB0aGlzIHtcbiAgICAgICAgdGhpcy5xdWVyeV9wYXJhbXMgPSBxdWVyeV9wYXJhbXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFF1ZXJ5UGFyYW1zKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlfcGFyYW1zO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGROYXZpZ2F0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGU7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBFY29GYWJTcGVlZERpYWxNb2R1bGUgfSBmcm9tICdAZWNvZGV2L2ZhYi1zcGVlZC1kaWFsJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBGYWJTcGVlZERpYWxDb21wb25lbnQgfSBmcm9tICcuL2ZhYi1zcGVlZC1kaWFsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBFY29GYWJTcGVlZERpYWxNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRmFiU3BlZWREaWFsQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRmFiU3BlZWREaWFsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBGYWJTcGVlZERpYWxNb2R1bGUge31cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkluaXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlc3Ryb3llciB9IGZyb20gJy4uL2Rlc3Ryb3llcic7XG5pbXBvcnQgeyBTZXJ2aWNlLCBEb2N1bWVudENvbGxlY3Rpb24gfSBmcm9tICduZ3gtanNvbmFwaSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSmFtUmVmcmVzaFNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb2xsZWN0aW9uX3RvX3JlZnJlc2ggPSBuZXcgU3ViamVjdDxEb2N1bWVudENvbGxlY3Rpb24+KCk7XG4gICAgcHVibGljIHJlZnJlc2hTdWJqZWN0ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIHB1YmxpYyByZWZyZXNoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZnJlc2hTdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1yZWZyZXNoJyxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b25cbiAgICAqbmdJZj1cImNvbGxlY3Rpb25Ub1JlZnJlc2hcIlxuICAgIG1hdC1pY29uLWJ1dHRvblxuICAgIG1hdFRvb2x0aXA9XCJBY3R1YWxpemFyXCJcbiAgICBtYXQtaW5rLXJpcHBsZT1cImZhbHNlXCJcbiAgICBjbGFzcz1cIm1hdC1pY29uLWJ1dHRvbiBtYXQtYnV0dG9uXCJcbiAgICAoY2xpY2spPVwicmVmcmVzaENvbGxlY3Rpb24oKVwiXG4gICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCJcbiAgICA+XG4gICAgPG1hdC1pY29uXG4gICAgICAgICpuZ0lmPVwiIWNvbGxlY3Rpb25Ub1JlZnJlc2guaXNfbG9hZGluZ1wiXG4gICAgICAgIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIlxuICAgICAgICA+XG4gICAgICAgIHt7IGljb24gfHwgJ3JlZnJlc2gnIH19XG4gICAgPC9tYXQtaWNvbj5cbiAgICA8bWF0LXNwaW5uZXJcbiAgICAgICAgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBlbGVtZW50cy11cCBwYWRkaW5nLTAgbWFyZ2luLTBcIlxuICAgICAgICAqbmdJZj1cImNvbGxlY3Rpb25Ub1JlZnJlc2guaXNfbG9hZGluZ1wiXG4gICAgICAgIGNvbG9yPVwiYWNjZW50XCJcbiAgICAgICAgZGlhbWV0ZXI9XCIyNFwiXG4gICAgICAgID5cbiAgICA8L21hdC1zcGlubmVyPlxuPC9idXR0b24+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFJlZnJlc2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcHVibGljIGNvbGxlY3Rpb25Ub1JlZnJlc2g6IERvY3VtZW50Q29sbGVjdGlvbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VydmljZVRvUmVmcmVzaDogU2VydmljZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgY29sb3JQcm9ncmVzc0NpcmN1bGFyID0gJ3doaXRlJztcbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBwdWJsaWMgZGVzdHJveWVyID0gbmV3IERlc3Ryb3llcigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBqYW1SZWZyZXNoU2VydmljZTogSmFtUmVmcmVzaFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0aW9uVG9SZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLmphbVJlZnJlc2hTZXJ2aWNlLmNvbGxlY3Rpb25fdG9fcmVmcmVzaC5waXBlKHRoaXMuZGVzdHJveWVyLnBpcGUoKSkuc3Vic2NyaWJlKChjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25Ub1JlZnJlc2ggPSBjb2xsZWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVmcmVzaENvbGxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VydmljZVRvUmVmcmVzaC5jbGVhckNhY2hlTWVtb3J5KCk7XG4gICAgICAgIHRoaXMuamFtUmVmcmVzaFNlcnZpY2UucmVmcmVzaCgpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWZyZXNoQ29tcG9uZW50LCBKYW1SZWZyZXNoU2VydmljZSB9IGZyb20gJy4vcmVmcmVzaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbSmFtUmVmcmVzaFNlcnZpY2VdLFxuICAgIGRlY2xhcmF0aW9uczogW1JlZnJlc2hDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtSZWZyZXNoQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1SZWZyZXNoTW9kdWxlIHt9XG4iLCJleHBvcnQgY2xhc3MgTWVudUVsZW1lbnQge1xuICAgIHB1YmxpYyBhdHRyaWJ1dGVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IGFueSk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IHsgLi4udGhpcy5hdHRyaWJ1dGVzLCAuLi5hdHRyaWJ1dGVzIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGUoKTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuaGlkZGVuID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGlzU2hvd24oKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hdHRyaWJ1dGVzLmhpZGRlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZSgpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlKCk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZW51RWxlbWVudHNDb2xsZWN0aW9uIDxUIGV4dGVuZHMgTWVudUVsZW1lbnQgfCBNZW51RWxlbWVudHNDb2xsZWN0aW9uPE1lbnVFbGVtZW50Pj4ge1xuICAgIHB1YmxpYyBkYXRhOiBBcnJheTxNZW51RWxlbWVudHNDb2xsZWN0aW9uPFQ+IHwgVD4gPSBbXTtcbiAgICBwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xuXG4gICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZSgpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCk6IHRoaXMge1xuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1Nob3duKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaGlkZGVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaW5kKGlkOiBzdHJpbmcpOiBNZW51RWxlbWVudHNDb2xsZWN0aW9uPFQ+IHwgVCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmluZChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLSBubyBkYXRhISAtLS0tLS0tLS0tLS0tLS0nKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaWQgPT09IGlkO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkKGRhdGE6IEFycmF5PE1lbnVFbGVtZW50c0NvbGxlY3Rpb248VD4gfCBUPik6IHRoaXMge1xuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuY29uY2F0KGRhdGEpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuL3NlY3Rpb24nO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHsgTWVudUVsZW1lbnRzQ29sbGVjdGlvbiwgTWVudUVsZW1lbnQgfSBmcm9tICcuL21lbnUtZWxlbWVudHMnO1xuXG5leHBvcnQgY2xhc3MgTWVudSBleHRlbmRzIE1lbnVFbGVtZW50c0NvbGxlY3Rpb248U2VjdGlvbj4ge1xuICAgIHB1YmxpYyBkYXRhOiBBcnJheTxTZWN0aW9uPiA9IDxBcnJheTxTZWN0aW9uPj5bXTtcbiAgICBwdWJsaWMgbWFpbl9pbWFnZToge3VybDogc3RyaW5nOyBzdHlsZXM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfX07XG4gICAgcHVibGljIGZpbmRTZWN0aW9uOiAoYXJnOiBzdHJpbmcpID0+IFNlY3Rpb24gPSA8KGFyZzogc3RyaW5nKSA9PiBTZWN0aW9uPnRoaXMuZmluZDtcbiAgICBwdWJsaWMgYWRkU2VjdGlvbnMgPSB0aGlzLmFkZDtcbiAgICBwdWJsaWMgcmVtb3ZlRW1wdHlTZWN0aW9ucygpIHtcbiAgICAgICAgZm9yIChsZXQgc2VjdGlvbiBvZiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmhhc1Nob3duRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0TWFpbkltYWdlKGltYWdlX2RhdGE6IHt1cmw6IHN0cmluZzsgc3R5bGVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ319KTogTWVudSB7XG4gICAgICAgIHRoaXMubWFpbl9pbWFnZSA9IGltYWdlX2RhdGE7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHsgTWVudUVsZW1lbnRzQ29sbGVjdGlvbiwgTWVudUVsZW1lbnQgfSBmcm9tICcuL21lbnUtZWxlbWVudHMnO1xuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIE1lbnVFbGVtZW50c0NvbGxlY3Rpb248TWVudUVsZW1lbnQ+IHtcbiAgICBwdWJsaWMgZmluZEJ1dHRvbjogKGFyZzogc3RyaW5nKSA9PiBCdXR0b24gPSA8KGFyZzogc3RyaW5nKSA9PiBCdXR0b24+dGhpcy5maW5kO1xuICAgIHB1YmxpYyBhZGRCdXR0b25zID0gdGhpcy5hZGQ7XG5cbiAgICBwdWJsaWMgaGFzU2hvd25FbGVtZW50cygpIHtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlzU2hvd24oKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1lbnVFbGVtZW50IH0gZnJvbSAnLi9tZW51LWVsZW1lbnRzJztcblxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIE1lbnVFbGVtZW50IHtcbiAgICBwdWJsaWMgYXR0cmlidXRlczogTWVudUJ1dHRvbkF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGljb246ICcnLFxuICAgICAgICBsYWJlbDogJycsXG4gICAgICAgIGNsYXNzOiAnJyxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBoaWRkZW46IGZhbHNlXG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXRBdHRyaWJ1dGVzKFxuICAgICAgICBhdHRyaWJ1dGU6ICdsYWJlbCcgfCAnaWNvbicgfCAnY2xhc3MnIHwgJ2hpZGRlbicgfCAnZGlzYWJsZWQnIHwgJ3N2Z19pY29uJyB8ICdpY29uX2ZvbnQnLCAvLyBUT0RPOiBpbXByb3ZlIHR5cGluZ1xuICAgICAgICB2YWx1ZTogc3RyaW5nIHwgYm9vbGVhblxuICAgICk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE1lbnVCdXR0b25BdHRyaWJ1dGVzKTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IHsgLi4udGhpcy5hdHRyaWJ1dGVzLCAuLi5hdHRyaWJ1dGVzIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lbnVCdXR0b25BdHRyaWJ1dGVzIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgY2xhc3M/OiBzdHJpbmc7XG4gICAgaGlkZGVuPzogYm9vbGVhbjtcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgc3ZnX2ljb24/OiBzdHJpbmc7XG4gICAgaWNvbl9mb250Pzogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuLi9tZW51LWVsZW1lbnRzL3NlY3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1kcm9wZG93bi1tZW51JyxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIGgze2ZvbnQtc2l6ZToxMHB0O21hcmdpbjoxNnB4O2ZvbnQtd2VpZ2h0OjUwMH1qYW0tZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5qYW0tYm90dG9tLXNoZWV0e2Rpc3BsYXk6bm9uZX0uZGlzYWJsZWR7b3BhY2l0eTouNX1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpe2phbS1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZX0uamFtLWJvdHRvbS1zaGVldHtkaXNwbGF5OmJsb2NrfX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b25cbiAgICBtYXQtaWNvbi1idXR0b25cbiAgICBjbGFzcz1cIm1hdC1pY29uLWJ1dHRvbiBtYXQtYnV0dG9uXCJcbiAgICBtYXRUb29sdGlwPVwiTcODwqFzXCJcbiAgICBmeExheW91dD1cInJvd1wiXG4gICAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51UmVmXCJcbiAgICA+XG4gICAgPGltZ1xuICAgICAgICAqbmdJZj1cIm1haW5faW1hZ2VcIlxuICAgICAgICBbc3JjXT1cIm1haW5faW1hZ2U/LnVybFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIm1haW5faW1hZ2U/LnN0eWxlc1wiXG4gICAgICAgIC8+XG4gICAgPG1hdC1pY29uICpuZ0lmPVwiIW1haW5faW1hZ2VcIj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuPC9idXR0b24+XG5cbjxtYXQtbWVudSAjbWVudVJlZj1cIm1hdE1lbnVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzZWN0aW9uIG9mIHNlY3Rpb25zOyBsZXQgcG9zaXRpb24gPSBpbmRleFwiPlxuICAgICAgICA8bWF0LWRpdmlkZXIgKm5nSWY9XCJzZWN0aW9uLmhhc1Nob3duRWxlbWVudHMoKSAmJiAhc2VjdGlvbi5oaWRkZW4gJiYgcG9zaXRpb24gPiAwXCI+PC9tYXQtZGl2aWRlcj5cblxuICAgICAgICA8aDMgY2xhc3M9XCJtYXQtaGludFwiICpuZ0lmPVwic2VjdGlvbi5oYXNTaG93bkVsZW1lbnRzKCkgJiYgIXNlY3Rpb24uaGlkZGVuICYmIHNlY3Rpb24uaWRcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwic2VjdGlvbi5pZFwiPjwvc3Bhbj5cbiAgICAgICAgPC9oMz5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2Ygc2VjdGlvbi5kYXRhXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgbWF0LW1lbnUtaXRlbVxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIWJ1dHRvbi5hdHRyaWJ1dGVzLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImJ1dHRvbi5hdHRyaWJ1dGVzLmRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJidXR0b24uYXR0cmlidXRlcy5jbGFzc1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdGVkLmVtaXQoYnV0dG9uLmlkKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImJ1dHRvbi5hdHRyaWJ1dGVzLmljb25cIlxuICAgICAgICAgICAgICAgICAgICBbaW5uZXJIdG1sXT1cImJ1dHRvbi5hdHRyaWJ1dGVzLmljb25cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJidXR0b24uYXR0cmlidXRlcy5zdmdfaWNvblwiXG4gICAgICAgICAgICAgICAgICAgIFtzdmdJY29uXT1cImJ1dHRvbi5hdHRyaWJ1dGVzLnN2Z19pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJidXR0b24uYXR0cmlidXRlcy5sYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbWF0LW1lbnU+XG5gXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duTWVudUNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHVibGljIHNlY3Rpb25zOiBBcnJheTxTZWN0aW9uPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgbWFpbl9pbWFnZTogeyB1cmw6IHN0cmluZzsgc3R5bGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfX07XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUFUX0JPVFRPTV9TSEVFVF9EQVRBLCBNYXRCb3R0b21TaGVldFJlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tYm90dG9tLXNoZWV0JyxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIGgze2ZvbnQtc2l6ZToxMHB0O21hcmdpbjoxNnB4O2ZvbnQtd2VpZ2h0OjUwMH1qYW0tZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5qYW0tYm90dG9tLXNoZWV0e2Rpc3BsYXk6bm9uZX0uZGlzYWJsZWR7b3BhY2l0eTouNX1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpe2phbS1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZX0uamFtLWJvdHRvbS1zaGVldHtkaXNwbGF5OmJsb2NrfX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBtYXRNZW51Q29udGVudD5cbiAgICA8bWF0LW5hdi1saXN0PlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzZWN0aW9uIG9mIGRhdGEuc2VjdGlvbnM7IGxldCBwb3NpdGlvbiA9IGluZGV4XCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJtYXQtaGludFwiICpuZ0lmPVwiIXNlY3Rpb24uaGlkZGVuIHx8IHNlY3Rpb24uaWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInNlY3Rpb24uaWRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2gzPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2Ygc2VjdGlvbi5kYXRhXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1saXN0LWl0ZW0gKm5nSWY9XCIhYnV0dG9uLmF0dHJpYnV0ZXMuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiYnV0dG9uLmF0dHJpYnV0ZXMuY2xhc3MgKyAoYnV0dG9uLmF0dHJpYnV0ZXMuZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogbnVsbClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiYnV0dG9uLmF0dHJpYnV0ZXMuZGlzYWJsZWQgPyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkgOiBzZWxlY3RlZChidXR0b24uaWQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJidXR0b24uYXR0cmlidXRlcy5pY29uIHx8IGJ1dHRvbi5hdHRyaWJ1dGVzLnN2Z19pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckh0bWxdPVwiYnV0dG9uLmF0dHJpYnV0ZXMuaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3ZnSWNvbl09XCJidXR0b24uYXR0cmlidXRlcy5zdmdfY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1hdC1oaW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gbWF0LWxpbmUgW2lubmVySHRtbF09XCJidXR0b24uYXR0cmlidXRlcy5sYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L21hdC1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwiKHBvc2l0aW9uICsgMSkgPCBkYXRhLnNlY3Rpb25zLmxlbmd0aFwiPjwvbWF0LWRpdmlkZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbWF0LW5hdi1saXN0PlxuPC9uZy10ZW1wbGF0ZT5cbmBcbn0pXG5leHBvcnQgY2xhc3MgQm90dG9tU2hlZXRDb21wb25lbnQge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChNQVRfQk9UVE9NX1NIRUVUX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgICAgIHByaXZhdGUgbWF0Qm90dG9tU2hlZXRSZWY6IE1hdEJvdHRvbVNoZWV0UmVmPEJvdHRvbVNoZWV0Q29tcG9uZW50PlxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWF0Qm90dG9tU2hlZXRSZWYuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RlZChvcHRpb246IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hdEJvdHRvbVNoZWV0UmVmLmRpc21pc3Mob3B0aW9uKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudSB9IGZyb20gJy4vbWVudS1lbGVtZW50cy9tZW51JztcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuL21lbnUtZWxlbWVudHMvc2VjdGlvbic7XG5pbXBvcnQgeyBCb3R0b21TaGVldENvbXBvbmVudCB9IGZyb20gJy4vYm90dG9tLXNoZWV0L2JvdHRvbS1zaGVldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0Qm90dG9tU2hlZXQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZXN0cm95ZXIgfSBmcm9tICcuLi9kZXN0cm95ZXInO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9tZW51LWVsZW1lbnRzL2J1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLW1lbnUnLFxuICAgIHN0eWxlczogW2AvZGVlcC8gaDN7Zm9udC1zaXplOjEwcHQ7bWFyZ2luOjE2cHg7Zm9udC13ZWlnaHQ6NTAwfWphbS1kcm9wZG93bi1tZW51e2Rpc3BsYXk6YmxvY2t9LmphbS1ib3R0b20tc2hlZXR7ZGlzcGxheTpub25lfS5kaXNhYmxlZHtvcGFjaXR5Oi41fUBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo1OTlweCl7amFtLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpub25lfS5qYW0tYm90dG9tLXNoZWV0e2Rpc3BsYXk6YmxvY2t9fWBdLFxuICAgIHRlbXBsYXRlOiBgPGphbS1kcm9wZG93bi1tZW51XG4gICAgW3NlY3Rpb25zXT1cIm1lbnUuZGF0YVwiXG4gICAgW21haW5faW1hZ2VdPVwibWVudS5tYWluX2ltYWdlXCJcbiAgICAoc2VsZWN0ZWQpPVwic2VsZWN0ZWRPcHRpb24oJGV2ZW50KVwiXG4+PC9qYW0tZHJvcGRvd24tbWVudT5cblxuPGRpdiBjbGFzcz1cImphbS1ib3R0b20tc2hlZXRcIj5cbiAgICA8YnV0dG9uXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICBjbGFzcz1cIm1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXCJcbiAgICAgICAgbWF0VG9vbHRpcD1cIk3Dg8Khc1wiXG4gICAgICAgIGZ4TGF5b3V0PVwicm93XCJcbiAgICAgICAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgICAgICAoY2xpY2spPVwib3BlbigpXCI+XG4gICAgICAgIDxpbWcgKm5nSWY9XCJtZW51Lm1haW5faW1hZ2U/LnVybFwiIFtzcmNdPVwibWVudS5tYWluX2ltYWdlPy51cmxcIiBbbmdTdHlsZV09XCJtZW51Lm1haW5faW1hZ2U/LnN0eWxlc1wiLz5cbiAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiIW1lbnUubWFpbl9pbWFnZT8udXJsXCI+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtZW51OiBNZW51O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2VfZGF0YTogQXJyYXk8YW55PjtcbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjx7IGtleTogc3RyaW5nOyBkYXRhPzogQXJyYXk8YW55PiB9PigpO1xuXG4gICAgcHVibGljIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtYXRCb3R0b21TaGVldDogTWF0Qm90dG9tU2hlZXRcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lbnUubWFpbl9pbWFnZSAmJiAhdGhpcy5tZW51Lm1haW5faW1hZ2Uuc3R5bGVzKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUubWFpbl9pbWFnZS5zdHlsZXMgPSB7ICdib3JkZXItcmFkaXVzJzogJzEwMHB4Jywgd2lkdGg6ICc0MHB4JywgaGVpZ2h0OiAnNDBweCcgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnUucmVtb3ZlRW1wdHlTZWN0aW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuKCkge1xuICAgICAgICB0aGlzLm1hdEJvdHRvbVNoZWV0Lm9wZW4oQm90dG9tU2hlZXRDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGRhdGE6IHsgc2VjdGlvbnM6IHRoaXMubWVudS5kYXRhIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFmdGVyRGlzbWlzc2VkKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3llci5waXBlKCksXG4gICAgICAgICAgICBmaWx0ZXIocmVzcG9uc2UgPT4gIVtudWxsLCB1bmRlZmluZWQsICcnXS5pbmNsdWRlcyhyZXNwb25zZSkpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5mb3JtYXRFbWlzc2lvbihyZXNwb25zZSkpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRPcHRpb24oc2VsZWN0ZWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5mb3JtYXRFbWlzc2lvbihzZWxlY3RlZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0RW1pc3Npb24ocmVzcG9uc2U6IHN0cmluZykge1xuICAgICAgICByZXR1cm4geyBrZXk6IHJlc3BvbnNlLCBkYXRhOiB0aGlzLnNvdXJjZV9kYXRhIHx8IG51bGwgfTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSwgTWF0Qm90dG9tU2hlZXRNb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcm9wZG93bk1lbnVDb21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLW1lbnUvZHJvcGRvd24tbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEJvdHRvbVNoZWV0Q29tcG9uZW50IH0gZnJvbSAnLi9ib3R0b20tc2hlZXQvYm90dG9tLXNoZWV0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNZW51Q29tcG9uZW50LCBEcm9wZG93bk1lbnVDb21wb25lbnQsIEJvdHRvbVNoZWV0Q29tcG9uZW50XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtCb3R0b21TaGVldENvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW01lbnVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbU1lbnVNb2R1bGUge31cbiIsIi8qKiBUaGlzJ3MgY29tcG9uZW50IEBkZXByZWNhdGVkICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmxvYXRpbmctYnV0dG9uJyxcbiAgICBzdHlsZXM6IFtgYS5tYXQtZmFie3Bvc2l0aW9uOmZpeGVkO2JvdHRvbToyNHB4O3JpZ2h0OjI0cHg7ei1pbmRleDozMzN9YF0sXG4gICAgdGVtcGxhdGU6IGA8YVxuICAgIG1hdC1mYWIgaHJlZlxuICAgICpuZ0lmPVwic2hvdyB8fCB0cnVlXCJcbiAgICBbbWF0VG9vbHRpcF09XCJ0b29sdGlwXCJcbiAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgIFt0YXJnZXRdPVwidGFyZ2V0IHx8ICdfc2VsZidcIlxuICAgIFtyb3V0ZXJMaW5rXT1cInJzUm91dGVyTGlua1wiXG4gICAgW3F1ZXJ5UGFyYW1zXT1cInJzUXVlcnlQYXJhbXNcIj5cbiAgICA8bWF0LWljb24gc3R5bGU9XCJjb2xvcjogd2hpdGVcIj57eyBpY29uTmFtZSA/IGljb25OYW1lIDogJ2FkZCcgfX08L21hdC1pY29uPlxuPC9hPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0J1dHRvbkNvbXBvbmVudCB7XG4gICAgcHVibGljIHNob3c6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgcnNCYWNrZ3JvdW5kOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGljb25OYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRvb2x0aXA6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdGFyZ2V0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHJzUm91dGVyTGluazogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByc1F1ZXJ5UGFyYW1zOiBvYmplY3Q7XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxvYXRpbmdCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2Zsb2F0aW5nLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0Zsb2F0aW5nQnV0dG9uQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRmxvYXRpbmdCdXR0b25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUZsb2F0aW5nQnV0dG9uTW9kdWxlIHt9XG4iLCIvLyBAbWVyZ2VmbGFnIGxvcyBjYW1iaW9zIGVuIGVzdGUgY29tcG9uZW50ZSBubyBkZWJlbiBsbGVnYXIgYSAyMVxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seVRlbXBsYXRlT3B0aW9ucyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljSW5wdXQgaW1wbGVtZW50cyBGb3JtbHlGaWVsZENvbmZpZyB7XG4gICAgcHVibGljIHJlYWRvbmx5IG1vZGVsOiBhbnk7XG4gICAgcHVibGljIHJlYWRvbmx5IHBhcmVudDogRm9ybWx5RmllbGRDb25maWc7XG5cbiAgICBwdWJsaWMga2V5OiBzdHJpbmc7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgdGVtcGxhdGVPcHRpb25zOiBGb3JtbHlUZW1wbGF0ZU9wdGlvbnM7XG4gICAgcHVibGljIG9wdGlvbnNUeXBlczogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgdmFsaWRhdGlvbjoge1xuICAgICAgICBtZXNzYWdlcz86IHtcbiAgICAgICAgICAgIFttZXNzYWdlUHJvcGVydGllczogc3RyaW5nXTogc3RyaW5nIHwgKChlcnJvcjogYW55LCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcpID0+IHN0cmluZyk7XG4gICAgICAgIH07XG4gICAgICAgIHNob3c/OiBib29sZWFuO1xuICAgICAgICBbYWRkaXRpb25hbFByb3BlcnRpZXM6IHN0cmluZ106IGFueTtcbiAgICB9O1xuICAgIHB1YmxpYyB2YWxpZGF0b3JzOiBhbnk7XG4gICAgcHVibGljIGFzeW5jVmFsaWRhdG9yczogYW55O1xuICAgIHB1YmxpYyB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgIHB1YmxpYyB3cmFwcGVyczogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgaGlkZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgaGlkZUV4cHJlc3Npb246IGJvb2xlYW4gfCBzdHJpbmcgfCAoKG1vZGVsOiBhbnksIGZvcm1TdGF0ZTogYW55KSA9PiBib29sZWFuKTtcbiAgICBwdWJsaWMgZXhwcmVzc2lvblByb3BlcnRpZXM6IHsgW3Byb3BlcnR5OiBzdHJpbmddOiBzdHJpbmcgfCAoKG1vZGVsOiBhbnksIGZvcm1TdGF0ZTogYW55KSA9PiBib29sZWFuKSB9IHwgYW55O1xuICAgIHB1YmxpYyBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICAgIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZmllbGRHcm91cENsYXNzTmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBmaWVsZEdyb3VwOiBBcnJheTxGb3JtbHlGaWVsZENvbmZpZz47XG4gICAgcHVibGljIGZpZWxkQXJyYXk6IEZvcm1seUZpZWxkQ29uZmlnO1xuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIGNvbXBvbmVudDogYW55O1xuICAgIHB1YmxpYyBmb2N1czogYm9vbGVhbjtcbiAgICBwdWJsaWMgbW9kZWxPcHRpb25zOiB7XG4gICAgICAgIGRlYm91bmNlPzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVPbj86ICdjaGFuZ2UnIHwgJ2JsdXInIHwgJ3N1Ym1pdCc7XG4gICAgfTtcblxuICAgIC8vIHB1YmxpYyBsaWZlY3ljbGU/OiBGb3JtbHlMaWZlQ3ljbGVPcHRpb25zO1xuICAgIHB1YmxpYyBkZWZhdWx0VmFsdWU6IGFueTtcbiAgICBwdWJsaWMgcGFyc2VyczogQXJyYXk8KCh2YWx1ZTogYW55KSA9PiB7fSk+O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5pZCA9IHRoaXMubmFtZSA9IGtleTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Rm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXF1aXJlZCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBmeEZsZXgodmFsdWUpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMuZnhGbGV4ID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXNbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRlbXBsYXRlT3B0aW9uKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFRlbXBsYXRlT3B0aW9ucyh0ZW1wbGF0ZV9vcHRpb25zOiBGb3JtbHlUZW1wbGF0ZU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7IC4uLnRoaXMudGVtcGxhdGVPcHRpb25zLCAuLi50ZW1wbGF0ZV9vcHRpb25zIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRyYW5zbGF0ZWRUZW1wbGF0ZU9wdGlvbnModHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChmaWVsZENvbmZpZzogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGZpZWxkQ29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBmaWVsZENvbmZpZ1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGV4dER5bmFtaWNJbnB1dCBleHRlbmRzIER5bmFtaWNJbnB1dCBpbXBsZW1lbnRzIEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIGtleSkge1xuICAgICAgICBzdXBlcihrZXkpO1xuICAgICAgICB0aGlzLnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBrZXlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcHVibGljIHNldFRyYW5zbGF0ZWRUZW1wbGF0ZU9wdGlvbnModHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5wbGFjZWhvbGRlciA9IHRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCh0aGlzLmtleSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTnVtYmVyRHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdpbnB1dCc7XG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5pZCA9IHRoaXMubmFtZSA9IGtleTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucGxhY2Vob2xkZXIgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENoZWNrYm94RHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgICAgICBsYWJlbDoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMubGFiZWwgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhRHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICd0ZXh0YXJlYSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgbWF0QXV0b3NpemVNaW5Sb3dzOiAyLFxuICAgICAgICAgICAgbWF0QXV0b3NpemVNYXhSb3dzOiAxNTAsXG4gICAgICAgICAgICBsYWJlbDoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucGxhY2Vob2xkZXIgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5sYWJlbCA9IHRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCh0aGlzLmtleSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0RHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBrZXksXG4gICAgICAgICAgICBvcHRpb25zOiBbXVxuICAgICAgICB9O1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VHJhbnNsYXRlZFRlbXBsYXRlT3B0aW9ucyh0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zLmxhYmVsID0gdHJhbnNsYXRlU2VydmljZS5pbnN0YW50KHRoaXMua2V5KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0T3B0aW9ucyhvcHRpb25zOiBBcnJheTx7IHZhbHVlOiBhbnk7IGxhYmVsOiBzdHJpbmcgfT4pOiBTZWxlY3REeW5hbWljSW5wdXQge1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUZvcm0gfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZm9ybWx5LWZvcm0tZmxleCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgIDxmb3JtbHktZmllbGQgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpZWxkc1wiXG4gICAgICAgIFtmeEZsZXhdPVwiZmllbGQudGVtcGxhdGVPcHRpb25zLmZ4RmxleFwiXG4gICAgICAgIFttb2RlbF09XCJtb2RlbFwiIFtmb3JtXT1cImZvcm1cIlxuICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICBbbmdDbGFzc109XCJmaWVsZC5jbGFzc05hbWVcIlxuICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCI+XG4gICAgICA8L2Zvcm1seS1maWVsZD5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGb3JtRmxleENvbXBvbmVudCBleHRlbmRzIEZvcm1seUZvcm0ge31cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlNYXRlcmlhbE1vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1seUZvcm1GbGV4Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtbHktZm9ybS1mbGV4LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIEZvcm1seU1vZHVsZS5mb3JSb290KCksXG4gICAgICAgIEZvcm1seU1hdGVyaWFsTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtGb3JtbHlGb3JtRmxleENvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW0Zvcm1seUZvcm1GbGV4Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1EeW5hbWljRm9ybXNNb2R1bGUge31cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcmFtcywgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYXRUYWJHcm91cCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbamFtVGFic10nXG59KVxuZXhwb3J0IGNsYXNzIEphbVRhYnNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyB0YWJOYW1lczoge1trZXk6IHN0cmluZ106IG51bWJlcn07XG4gICAgQElucHV0KCkgcHVibGljIHRhYkdyb3VwOiBNYXRUYWJHcm91cDtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVmYXVsdFRhYkluZGV4OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBzZWxlY3RlZF90YWI6IG51bWJlcjtcbiAgICBwdWJsaWMgcXVlcnlfcGFyYW1zOiBQYXJhbXM7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICAgICkge1xuICAgICAgICBhY3RpdmF0ZWRSb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocXVlcnlQYXJhbXMgPT4gdGhpcy5xdWVyeV9wYXJhbXMgPSBxdWVyeVBhcmFtcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZF90YWIgPSB0aGlzLnRhYk5hbWVzW3RoaXMucXVlcnlfcGFyYW1zLnRhYl9zZWxlY3RlZCB8fCBPYmplY3Qua2V5cyh0aGlzLnRhYk5hbWVzKVt0aGlzLmRlZmF1bHRUYWJJbmRleF1dO1xuICAgICAgICB0aGlzLnRhYkdyb3VwLnNlbGVjdGVkSW5kZXggPSB0aGlzLnNlbGVjdGVkX3RhYjtcbiAgICAgICAgdGhpcy50YWJHcm91cC5zZWxlY3RlZEluZGV4Q2hhbmdlLnN1YnNjcmliZShpbmRleCA9PiB0aGlzLm9uVGFiQ2hhbmdlKGluZGV4KSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGFiQ2hhbmdlKG5ld19pbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCB0YWJfc2VsZWN0ZWQ7XG4gICAgICAgIGZvciAobGV0IGVhY2ggaW4gdGhpcy50YWJOYW1lcykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFiTmFtZXNbZWFjaF0gIT09IG5ld19pbmRleCkgY29udGludWU7XG4gICAgICAgICAgICB0YWJfc2VsZWN0ZWQgPSBlYWNoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtdLCB7IHF1ZXJ5UGFyYW1zOiB7IC4uLnRoaXMucXVlcnlfcGFyYW1zLCAuLi57dGFiX3NlbGVjdGVkOiB0YWJfc2VsZWN0ZWR9IH0gfSk7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHsgSmFtVGFic0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFicy5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtKYW1UYWJzRGlyZWN0aXZlXSxcbiAgICBleHBvcnRzOiBbSmFtVGFic0RpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgSmFtVGFic01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RXhwYW5zaW9uUGFuZWwgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tqYW1FeHBhbnNpb25QYW5lbFN0YXR1c10nXG59KVxuZXhwb3J0IGNsYXNzIFJlbWVtYmVybWVTdGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIEBDb250ZW50Q2hpbGQoTWF0RXhwYW5zaW9uUGFuZWwpIHB1YmxpYyBtYXRfZXhwYW5zaW9uX3BhbmVsOiBNYXRFeHBhbnNpb25QYW5lbDtcblxuICAgIHByaXZhdGUgbWF0X2V4cGFuc2lvbl9wYW5lX2lkOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkge1xuICAgICAgICB0aGlzLm1hdF9leHBhbnNpb25fcGFuZV9pZCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5tYXRfZXhwYW5zaW9uX3BhbmVfaWQpKSB7XG4gICAgICAgICAgICB0aGlzLm1hdF9leHBhbnNpb25fcGFuZWwuZXhwYW5kZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLm1hdF9leHBhbnNpb25fcGFuZV9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZUV4cGFuZGVkRXhwYW5zaW9uUGFuZWwoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgcHJpdmF0ZSBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxTdG9yZWFnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlRXhwYW5kZWRFeHBhbnNpb25QYW5lbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVMb2NhbFN0b3JlYWdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVMb2NhbFN0b3JlYWdlKCk6IHZvaWQge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm1hdF9leHBhbnNpb25fcGFuZV9pZCwgdGhpcy5tYXRfZXhwYW5zaW9uX3BhbmVsLmV4cGFuZGVkKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJlbWVtYmVybWVTdGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vcmVtZW1iZXItc3RhdGUuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1JlbWVtYmVybWVTdGF0ZURpcmVjdGl2ZV0sXG4gICAgZXhwb3J0czogW1JlbWVtYmVybWVTdGF0ZURpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgSmFtUmVtZW1iZXJTdGF0ZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJ25neC1qc29uYXBpJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmxvYXRpbmctaW5wdXQnLFxuICAgIHN0eWxlczogW2BtYXQtZXhwYW5zaW9uLXBhbmVse3dpZHRoOmF1dG87Ym94LXNoYWRvdzpub25lIWltcG9ydGFudDtiYWNrZ3JvdW5kOmluaGVyaXQhaW1wb3J0YW50O2JvcmRlcjowIWltcG9ydGFudH1tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlfWlucHV0W3R5cGVePW51bWJlcl17dGV4dC1hbGlnbjplbmR9YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZmxvYXRpbmctaW5wdXRcIiBbbmdDbGFzc109XCJzdGF0dXMgPyAnbWF0LWVsZXZhdGlvbi16MScgOiAnJ1wiPlxuICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsXG4gICAgICAgIGhpZGVUb2dnbGU9XCJ0cnVlXCJcbiAgICAgICAgc3R5bGU9XCJ3aWR0aDogYXV0bzsgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50OyBiYWNrZ3JvdW5kOiBpbmhlcml0ICFpbXBvcnRhbnQ7IGJvcmRlcjogMCAhaW1wb3J0YW50O1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJsb2NrXCJcbiAgICAgICAgW2V4cGFuZGVkXT1cInN0YXR1c1wiXG4gICAgICAgIChjbG9zZWQpPVwic3RhdHVzVG9nZ2xlKGZhbHNlKVwiXG4gICAgICAgIChvcGVuZWQpPVwic3RhdHVzVG9nZ2xlKHRydWUpXCI+XG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciAqbmdJZj1cIiFzdGF0dXNcIj5cbiAgICAgICAgICAgIDxtYXQtcGFuZWwtdGl0bGUgZnhMYXlvdXQ9XCJyb3dcIiBbZnhMYXlvdXRBbGlnbl09XCIoaG9yUG9zaXRpb24gfHwgJ2VuZCcpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9tYXQtcGFuZWwtdGl0bGU+XG4gICAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwic3RhdHVzXCI+XG4gICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgaWQ9XCJmbG9hdGluZ0lucHV0XCIgdHlwZT1cIm51bWJlclwiIHN0ZXA9XCIwLjAwMVwiIG5hbWU9XCJmbG9hdGluZ051bWJlclwiIGFyaWEtbGFiZWw9XCJNb2RpZmljYXJcIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZW50cnlWYWx1ZVwiXG4gICAgICAgICAgICAgICAgKGJsdXIpPVwic3RhdHVzVG9nZ2xlKGZhbHNlKVwiXG4gICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiYmluZGluZ0VudHJ5VmFsdWUoZW50cnlWYWx1ZSlcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cImtleVByZXNzKCRldmVudC5rZXlDb2RlKVwiXG4gICAgICAgICAgICAgICAgKGZvY3VzKT1cInN0YXR1c1wiPlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0lucHV0Q29tcG9uZW50IHtcbiAgICBwdWJsaWMgc2VhcmNoUGFyYW1zOiBVcmxUcmVlO1xuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgZW50cnlWYWx1ZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZXNvdXJjZTogUmVzb3VyY2U7XG4gICAgQElucHV0KCkgcHVibGljIGhvclBvc2l0aW9uOiAnc3RhcnQnIHwgJ2VuZCc7XG4gICAgQElucHV0KCkgcHVibGljIGxvY2s6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGVudHJ5VmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlc291cmNlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxSZXNvdXJjZT4oKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMgPSByb3V0ZXIucGFyc2VVcmwocm91dGVyLnVybCk7XG4gICAgICAgIHRoaXMubG9jayA9IHRoaXMubG9jayB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdHVzVG9nZ2xlKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubG9jaykge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJpbmRpbmdFbnRyeVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbnRyeVZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBrZXlQcmVzcyhrZXlDb2RlOiBudW1iZXIpIHtcbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzSW5wdXQoKTogdm9pZCB7XG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbG9hdGluZ0lucHV0Jyk7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEV4cGFuc2lvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZsb2F0aW5nSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2Zsb2F0aW5nLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtGbG9hdGluZ0lucHV0Q29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRmxvYXRpbmdJbnB1dENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtRmxvYXRpbmdJbnB1dE1vZHVsZSB7fVxuIiwiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTcgUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgRmlsdGVyT3B0aW9uIH0gZnJvbSAnLi9maWx0ZXItb3B0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBSYW5nZUZpbHRlckludGVyZmFjZSB9IGZyb20gJy4vZmlsdGVyLXR5cGVzL3JhbmdlLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3RyaW5nRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9maWx0ZXItdHlwZXMvc3RyaW5nLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnVtYmVyRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9maWx0ZXItdHlwZXMvbnVtYmVyLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9maWx0ZXItdHlwZXMvZGF0ZS1yYW5nZS1maWx0ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IHR5cGUgUmVzb3VyY2VGaWx0ZXIgPVxuICAgIHN0cmluZ3xudW1iZXJ8QXJyYXk8c3RyaW5nPnxvYmplY3R8UmFuZ2VGaWx0ZXJJbnRlcmZhY2V8U3RyaW5nRmlsdGVySW50ZXJmYWNlfE51bWJlckZpbHRlckludGVyZmFjZXxEYXRlUmFuZ2VGaWx0ZXJJbnRlcmZhY2U7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgICB0eXBlOiAnb3B0aW9ucycgfCAnY2hlY2tzJyB8ICdyYW5nZV9kYXRlJztcbiAgICBhdHRyaWJ1dGU6IHN0cmluZztcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIFtqc29udmFsdWU6IHN0cmluZ106IEZpbHRlck9wdGlvbjtcbiAgICB9O1xuICAgIHNlbGVjdGVkOiBSZXNvdXJjZUZpbHRlcjtcbiAgICB0aXRsZT86IHN0cmluZztcbiAgICBsb2FkZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyQ29uZmlnIHtcbiAgICBwdWJsaWMgdHlwZTogJ29wdGlvbnMnIHwgJ2NoZWNrcycgfCAncmFuZ2VfZGF0ZSc7XG4gICAgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICAgIHB1YmxpYyBvcHRpb25zOiB7XG4gICAgICAgIFtqc29udmFsdWU6IHN0cmluZ106IEZpbHRlck9wdGlvbjtcbiAgICB9O1xuICAgIHB1YmxpYyBzZWxlY3RlZDogUmVzb3VyY2VGaWx0ZXI7XG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBGaWx0ZXIsIEZpbHRlckNvbmZpZyB9IGZyb20gJy4vZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ZpbHRlci10eXBlcy9kYXRlLXJhbmdlLWZpbHRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckRhdGVSYW5nZSBleHRlbmRzIEZpbHRlciB7XG4gICAgdHlwZTogJ3JhbmdlX2RhdGUnO1xuICAgIHNlbGVjdGVkOiBEYXRlUmFuZ2VGaWx0ZXJJbnRlcmZhY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBKc29uYXBpRmlsdGVyUmFuZ2VkYXRlQ29uZmlnIGV4dGVuZHMgRmlsdGVyQ29uZmlnIGltcGxlbWVudHMgRmlsdGVyRGF0ZVJhbmdlIHtcbiAgICBwdWJsaWMgdHlwZTogJ3JhbmdlX2RhdGUnO1xuICAgIHB1YmxpYyBhdHRyaWJ1dGUgPSAnZGF0ZSc7XG4gICAgcHVibGljIG9wdGlvbnMgPSB7fTtcbiAgICBwdWJsaWMgc2VsZWN0ZWQgPSB7IHNpbmNlOiAnJywgdW50aWw6ICcnIH07XG5cbiAgICBwdWJsaWMgc2V0UHJvcGVydHkocHJvcGVydHlfbmFtZSwgcHJvcGVydHlfdmFsdWUpIHtcbiAgICAgICAgdGhpc1twcm9wZXJ0eV9uYW1lXSA9IHByb3BlcnR5X3ZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGaWx0ZXJPcHRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ZpbHRlci1vcHRpb24uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmlsdGVyLW9wdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNvbG9yPVwicHJpbWFyeVwiIGZsb2F0TGFiZWw9XCJuZXZlclwiPlxuICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyQ29uZmlnLnNlbGVjdGVkXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cImZpbHRlckNvbmZpZy50aXRsZVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIGZpbHRlckNvbmZpZ0FycmF5XCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJjb25maWcudGV4dC5rZXlcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9wdGlvblNlbGVjdGVkKGNvbmZpZywgZmlsdGVyQ29uZmlnLnNlbGVjdGVkKVwiPnt7IGNvbmZpZy50ZXh0Lm5hbWUgfX1cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdD5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEphbUZpbHRlck9wdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmaWx0ZXJDb25maWc6IEZpbHRlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiBvYmplY3Q7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZW1vdGVGaWx0ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBmaWx0ZXJDb25maWdBcnJheTogQXJyYXk8RmlsdGVyT3B0aW9uPjtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJDb25maWdBcnJheSA9IE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJDb25maWcub3B0aW9uc1trZXldLnRleHQgPSB7IGtleToga2V5LCBuYW1lOiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCB9O1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJDb25maWcub3B0aW9uc1trZXldO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0aW9uU2VsZWN0ZWQoanNvbnZhbHVlLCBmaWx0ZXJfbGlzdCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbW90ZUZpbHRlclt0aGlzLmZpbHRlckNvbmZpZy5hdHRyaWJ1dGVdID0gZmlsdGVyX2xpc3QudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5yZW1vdGVGaWx0ZXJDaGFuZ2UuZW1pdCh0aGlzLnJlbW90ZUZpbHRlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyQ2hlY2tzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXItY2hlY2tzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGaWx0ZXJPcHRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ZpbHRlci1vcHRpb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWZpbHRlci1jaGVja3MnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNvbG9yPVwicHJpbWFyeVwiIGZsb2F0TGFiZWw9XCJuZXZlclwiPlxuICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIG11bHRpcGxlXG4gICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyQ29uZmlnLnNlbGVjdGVkXCJcbiAgICAgICAgKGZvY3VzKT1cImZpbHRlckNvbmZpZ09wdGlvbnNVcGRhdGUoKVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJmaWx0ZXJDb25maWcudGl0bGVcIj5cbiAgICAgICAgPGRpdiBtYXQtbWVudS1pdGVtIGNsYXNzPVwiZm9jdXMtZWxlbWVudC00ZHAgcmVzZXQtaW5wdXQtZGVmYXVsdFwiXG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlcl9jb25maWdfb3B0aW9ucy5sZW5ndGggPiAxMFwiXG4gICAgICAgICAgICBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjEwXCJcbiAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPGlucHV0IGZ4RmxleCBjbGFzcz1cInJzLWlucHV0XCIgdGFiaW5kZXg9XCIxXCIgYXV0b2ZvY3VzIHBsYWNlaG9sZGVyPVwiQnVzY2FyXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInNlYXJjaFRleHRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDI0cHg7IHdpZHRoOiAyNHB4XCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwic2VhcmNoVGV4dFwiIChjbGljayk9XCJzZWFyY2hUZXh0ID0gJydcIj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlcl9jb25maWdfb3B0aW9ucyB8IGZpbHRlcjogc2VhcmNoVGV4dFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnRleHQua2V5XCJcbiAgICAgICAgICAgIChjbGljayk9XCJvcHRpb25TZWxlY3RlZChvcHRpb24sIGZpbHRlckNvbmZpZy5zZWxlY3RlZClcIj57eyBvcHRpb24udGV4dC5uYW1lIH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Q+XG48L21hdC1mb3JtLWZpZWxkPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBKYW1GaWx0ZXJDaGVja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmaWx0ZXJDb25maWc6IEZpbHRlckNoZWNrcztcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiBvYmplY3Q7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGZpbHRlckNvbmZpZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBwdWJsaWMgZmlsdGVyX2NvbmZpZ19vcHRpb25zOiBBcnJheTxGaWx0ZXJPcHRpb24+O1xuXG4gICAgcHVibGljIHNlYXJjaFRleHQ6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBzaG93X2lucHV0X3NlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJDb25maWcuc2VsZWN0ZWQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUZpbHRlclt0aGlzLmZpbHRlckNvbmZpZy5hdHRyaWJ1dGVdID0gdGhpcy5maWx0ZXJDb25maWcuc2VsZWN0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWx0ZXJDb25maWdPcHRpb25zVXBkYXRlKCk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJfY29uZmlnX29wdGlvbnMgPSB0aGlzLmZpbHRlcl9jb25maWdfb3B0aW9ucy5zb3J0KFxuICAgICAgICAgICAgKGEsIGIpID0+ICg8SU9wdGlvbj5hLnRleHQpLm5hbWUubG9jYWxlQ29tcGFyZSgoPElPcHRpb24+Yi50ZXh0KS5uYW1lKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2hvd0lucHV0U2VhcmNoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dJbnB1dFNlYXJjaCgpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dfaW5wdXRfc2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmaWx0ZXJDb25maWdPcHRpb25zVXBkYXRlKCkge1xuICAgICAgICB0aGlzLmZpbHRlcl9jb25maWdfb3B0aW9ucyA9IE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCA9IHsga2V5OiBrZXksIG5hbWU6IHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnNba2V5XS50ZXh0IH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclNlbGVjdGVkKCkge1xuICAgICAgICB0aGlzLmZpbHRlckNvbmZpZy5zZWxlY3RlZCA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcHRpb25TZWxlY3RlZChqc29udmFsdWUsIGZpbHRlcl9saXN0KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3RlRmlsdGVyW3RoaXMuZmlsdGVyQ29uZmlnLmF0dHJpYnV0ZV0gPSBmaWx0ZXJfbGlzdC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnJlbW90ZUZpbHRlckNoYW5nZS5lbWl0KHRoaXMucmVtb3RlRmlsdGVyKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRPcHRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNpY3MvZmlsdGVyLWNoZWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSmFtRmlsdGVyT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vYmFzaWNzL2ZpbHRlci1vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC10ZXh0LnBpcGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBKYW1TZWFyY2hJbnB1dE1vZHVsZSB9IGZyb20gJy4uL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBKYW1TZWFyY2hJbnB1dE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbRmlsdGVyUGlwZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50LCBKYW1GaWx0ZXJPcHRpb25zQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50LCBKYW1GaWx0ZXJPcHRpb25zQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1GaWx0ZXJNb2R1bGUge31cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1BvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogaW50ZXJmYWNlLW5hbWUgdXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvciB1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3IgZGlyZWN0aXZlLXNlbGVjdG9yXG5cbi8qKiBVc2VkIHRvIGZsYWcgc2xpZGUgbGFiZWxzIGZvciB1c2Ugd2l0aCB0aGUgcG9ydGFsIGRpcmVjdGl2ZSAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2phbS1zbGlkZS1lbGVtZW50XSwgW2phbVNsaWRlRWxlbWVudF0nXG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlRWxlbWVudCBleHRlbmRzIENka1BvcnRhbCB7fVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG4vLyBpbXBvcnQge0phbVNsaWRlQ29udGVudH0gZnJvbSAnLi9zbGlkZS1jb250ZW50JztcbmltcG9ydCB7IEphbVNsaWRlRWxlbWVudCB9IGZyb20gJy4vc2xpZGUtZWxlbWVudCc7XG5cbi8vIHRzbGludDpkaXNhYmxlOiBpbnRlcmZhY2UtbmFtZSB1c2UtaW5wdXQtcHJvcGVydHktZGVjb3JhdG9yIHVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvciBjb21wb25lbnQtc2VsZWN0b3Igbm8taW5wdXQtcmVuYW1lXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gSmFtU2xpZGUuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIEphbVNsaWRlQmFzZSB7fVxuZXhwb3J0IGNvbnN0IF9KYW1TbGlkZU1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgSmFtU2xpZGVCYXNlID1cbiAgICBtaXhpbkRpc2FibGVkKEphbVNsaWRlQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2phbS1zbGlkZScsXG4gIHRlbXBsYXRlOiBgPCEtLSBDcmVhdGUgYSB0ZW1wbGF0ZSBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIDxqYW0tc2xpZGU+IHNvIHRoYXQgd2UgY2FuIGdyYWIgYSByZWZlcmVuY2UgdG8gdGhpc1xuICAgIFRlbXBsYXRlUmVmIGFuZCB1c2UgaXQgaW4gYSBQb3J0YWwgdG8gcmVuZGVyIHRoZSBzbGlkZSBjb250ZW50IGluIHRoZSBhcHByb3ByaWF0ZSBwbGFjZSBpbiB0aGVcbiAgICBzbGlkZS1ncm91cC4gLS0+XG48bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+XG5gLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnamFtU2xpZGUnXG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlIGV4dGVuZHMgX0phbVNsaWRlTWl4aW5CYXNlIGltcGxlbWVudHMgT25Jbml0LCBDYW5EaXNhYmxlLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBDb250ZW50IGZvciB0aGUgc2xpZGUgZWxlbWVudCBnaXZlbiBieSBgPG5nLXRlbXBsYXRlIGphbS1zbGlkZS1lbGVtZW50PmAuICovXG4gIEBDb250ZW50Q2hpbGQoSmFtU2xpZGVFbGVtZW50KSBwdWJsaWMgdGVtcGxhdGVMYWJlbDogSmFtU2xpZGVFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUZW1wbGF0ZSBwcm92aWRlZCBpbiB0aGUgc2xpZGUgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICovXG4gIC8qKiBQbGFpbiB0ZXh0IGVsZW1lbnQgZm9yIHRoZSBzbGlkZSwgdXNlZCB3aGVuIHRoZXJlIGlzIG5vIHRlbXBsYXRlIGxhYmVsLiAqL1xuICBASW5wdXQoJ2xhYmVsJykgcHVibGljIHRleHRMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgLyoqIEFyaWEgZWxlbWVudCBmb3IgdGhlIHNsaWRlLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCB0aGF0IHRoZSBzbGlkZSBpcyBsYWJlbGxlZCBieS5cbiAgICogV2lsbCBiZSBjbGVhcmVkIGlmIGBhcmlhLWxhYmVsYCBpcyBzZXQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgcHVibGljIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmc7XG5cbiAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgcHVibGljIGdldCBjb250ZW50KCk6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRQb3J0YWw7XG4gIH1cblxuICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSBzbGlkZSBjaGFuZ2VzLiAqL1xuICBwdWJsaWMgcmVhZG9ubHkgX3N0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSByZWxhdGl2ZWx5IGluZGV4ZWQgcG9zaXRpb24gd2hlcmUgMCByZXByZXNlbnRzIHRoZSBjZW50ZXIsIG5lZ2F0aXZlIGlzIGxlZnQsIGFuZCBwb3NpdGl2ZVxuICAgKiByZXByZXNlbnRzIHRoZSByaWdodC5cbiAgICovXG4gIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIHJlbGF0aXZlbHkgaW5kZXggb3JpZ2luIG9mIHRoZSBzbGlkZSBpZiBpdCB3YXMgY3JlYXRlZCBhbmQgc2VsZWN0ZWQgYWZ0ZXIgdGhlcmVcbiAgICogd2FzIGFscmVhZHkgYSBzZWxlY3RlZCBzbGlkZS4gUHJvdmlkZXMgY29udGV4dCBvZiB3aGF0IHBvc2l0aW9uIHRoZSBzbGlkZSBzaG91bGQgb3JpZ2luYXRlIGZyb20uXG4gICAqL1xuICBwdWJsaWMgb3JpZ2luOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgc2xpZGUgaXMgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIHB1YmxpYyBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIC8qKiBQb3J0YWwgdGhhdCB3aWxsIGJlIHRoZSBob3N0ZWQgY29udGVudCBvZiB0aGUgc2xpZGUgKi9cbiAgcHJvdGVjdGVkIF9jb250ZW50UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwgPSBudWxsO1xuXG4gIC8vIEBDb250ZW50Q2hpbGQoSmFtU2xpZGVDb250ZW50LCB7cmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gIHByb3RlY3RlZCBfZXhwbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBUZW1wbGF0ZSBpbnNpZGUgdGhlIEphbVNsaWRlIHZpZXcgdGhhdCBjb250YWlucyBhbiBgPG5nLWNvbnRlbnQ+YC4gKi9cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgcHJvdGVjdGVkIF9pbXBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndGV4dExhYmVsJykgfHwgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZGlzYWJsZWQnKSkge1xuICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGVudFBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbChcbiAgICAgICAgdGhpcy5fZXhwbGljaXRDb250ZW50IHx8IHRoaXMuX2ltcGxpY2l0Q29udGVudCwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gSmFtU2xpZGVFbGVtZW50V3JhcHBlci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVFbGVtZW50V3JhcHBlckJhc2Uge31cbmV4cG9ydCBjb25zdCBfSmFtU2xpZGVFbGVtZW50V3JhcHBlck1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgSmFtU2xpZGVFbGVtZW50V3JhcHBlckJhc2UgPVxuICAgIG1peGluRGlzYWJsZWQoSmFtU2xpZGVFbGVtZW50V3JhcHBlckJhc2UpO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogaW50ZXJmYWNlLW5hbWUgdXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvciB1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3IgZGlyZWN0aXZlLXNlbGVjdG9yXG5cbi8qKlxuICogVXNlZCBpbiB0aGUgYGphbS1zbGlkZS1ncm91cGAgdmlldyB0byBkaXNwbGF5IHNsaWRlIGxhYmVscy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2phbVNsaWRlRWxlbWVudFdyYXBwZXJdJyxcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmphbS1zbGlkZS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICchIWRpc2FibGVkJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlRWxlbWVudFdyYXBwZXIgZXh0ZW5kcyBfSmFtU2xpZGVFbGVtZW50V3JhcHBlck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUge1xuICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqIFNldHMgZm9jdXMgb24gdGhlIHdyYXBwZXIgZWxlbWVudCAqL1xuICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPZmZzZXRMZWZ0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0T2Zmc2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRU5ELCBFTlRFUiwgSE9NRSwgU1BBQ0UgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGVSaXBwbGUsIENhbkRpc2FibGVSaXBwbGVDdG9yLCBtaXhpbkRpc2FibGVSaXBwbGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QsIHRpbWVyLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIGltcG9ydCB7IE1hdElua0JhciB9IGZyb20gJy4vaW5rLWJhcic7XG5pbXBvcnQgeyBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyIH0gZnJvbSAnLi9zbGlkZS1lbGVtZW50LXdyYXBwZXInO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUGxhdGZvcm0sIG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogaW50ZXJmYWNlLW5hbWUgdXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvciB1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3IgY29tcG9uZW50LXNlbGVjdG9yXG5cbnR5cGUgTW9kaWZpZXJLZXkgPSAnYWx0S2V5JyB8ICdzaGlmdEtleScgfCAnY3RybEtleScgfCAnbWV0YUtleSc7XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBtb2RpZmllciBrZXkgaXMgcHJlc3NlZC5cbiAqIEBwYXJhbSBldmVudCBFdmVudCB0byBiZSBjaGVja2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzTW9kaWZpZXJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIC4uLm1vZGlmaWVyczogQXJyYXk8TW9kaWZpZXJLZXk+KTogYm9vbGVhbiB7XG4gICAgaWYgKG1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgICByZXR1cm4gbW9kaWZpZXJzLnNvbWUobW9kaWZpZXIgPT4gZXZlbnRbbW9kaWZpZXJdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnQuYWx0S2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleTtcbn1cblxuLyoqIENvbmZpZyB1c2VkIHRvIGJpbmQgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMgKi9cbmNvbnN0IHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyA9XG4gICAgbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogdHJ1ZX0pIGFzIEV2ZW50TGlzdGVuZXJPcHRpb25zO1xuXG4vKipcbiAqIFRoZSBkaXJlY3Rpb25zIHRoYXQgc2Nyb2xsaW5nIGNhbiBnbyBpbiB3aGVuIHRoZSBoZWFkZXIncyBzbGlkZXMgZXhjZWVkIHRoZSBoZWFkZXIgd2lkdGguICdBZnRlcidcbiAqIHdpbGwgc2Nyb2xsIHRoZSBoZWFkZXIgdG93YXJkcyB0aGUgZW5kIG9mIHRoZSBzbGlkZXMgbGlzdCBhbmQgJ2JlZm9yZScgd2lsbCBzY3JvbGwgdG93YXJkcyB0aGVcbiAqIGJlZ2lubmluZyBvZiB0aGUgbGlzdC5cbiAqL1xuZXhwb3J0IHR5cGUgU2Nyb2xsRGlyZWN0aW9uID0gJ2FmdGVyJyB8ICdiZWZvcmUnO1xuXG4vKipcbiAqIFRoZSBkaXN0YW5jZSBpbiBwaXhlbHMgdGhhdCB3aWxsIGJlIG92ZXJzaG90IHdoZW4gc2Nyb2xsaW5nIGEgc2xpZGUgZWxlbWVudCBpbnRvIHZpZXcuIFRoaXMgaGVscHNcbiAqIHByb3ZpZGUgYSBzbWFsbCBhZmZvcmRhbmNlIHRvIHRoZSBlbGVtZW50IG5leHQgdG8gaXQuXG4gKi9cbmNvbnN0IEVYQUdHRVJBVEVEX09WRVJTQ1JPTEwgPSA2MDtcblxuLyoqXG4gKiBBbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIHN0YXJ0aW5nIHRvIHNjcm9sbCB0aGUgaGVhZGVyIGF1dG9tYXRpY2FsbHkuXG4gKiBTZXQgYSBsaXR0bGUgY29uc2VydmF0aXZlbHkgaW4gb3JkZXIgdG8gaGFuZGxlIGZha2UgZXZlbnRzIGRpc3BhdGNoZWQgb24gdG91Y2ggZGV2aWNlcy5cbiAqL1xuY29uc3QgSEVBREVSX1NDUk9MTF9ERUxBWSA9IDY1MDtcblxuLyoqXG4gKiBJbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMgYXQgd2hpY2ggdG8gc2Nyb2xsIHRoZSBoZWFkZXJcbiAqIHdoaWxlIHRoZSB1c2VyIGlzIGhvbGRpbmcgdGhlaXIgcG9pbnRlci5cbiAqL1xuY29uc3QgSEVBREVSX1NDUk9MTF9JTlRFUlZBTCA9IDEwMDtcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBKYW1TbGlkZUhlYWRlci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVIZWFkZXJCYXNlIHt9XG5leHBvcnQgY29uc3QgX0phbVNsaWRlSGVhZGVyTWl4aW5CYXNlOiBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmIHR5cGVvZiBKYW1TbGlkZUhlYWRlckJhc2UgPVxuICAgIG1peGluRGlzYWJsZVJpcHBsZShKYW1TbGlkZUhlYWRlckJhc2UpO1xuXG4vKipcbiAqIFRoZSBoZWFkZXIgb2YgdGhlIHNsaWRlIGdyb3VwIHdoaWNoIGRpc3BsYXlzIGEgbGlzdCBvZiBhbGwgdGhlIHNsaWRlcyBpbiB0aGUgc2xpZGUgZ3JvdXAuIEluY2x1ZGVzXG4gKiBhbiBpbmsgYmFyIHRoYXQgZm9sbG93cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHNsaWRlLiBXaGVuIHRoZSBzbGlkZXMgbGlzdCdzIHdpZHRoIGV4Y2VlZHMgdGhlXG4gKiB3aWR0aCBvZiB0aGUgaGVhZGVyIGNvbnRhaW5lciwgdGhlbiBhcnJvd3Mgd2lsbCBiZSBkaXNwbGF5ZWQgdG8gYWxsb3cgdGhlIHVzZXIgdG8gc2Nyb2xsXG4gKiBsZWZ0IGFuZCByaWdodCBhY3Jvc3MgdGhlIGhlYWRlci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnamFtLXNsaWRlLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbiBqYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYmVmb3JlIG1hdC1lbGV2YXRpb24tejRcIlxuICAgICAjcHJldmlvdXNQYWdpbmF0b3JcbiAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgbWF0LXJpcHBsZSBbbWF0UmlwcGxlRGlzYWJsZWRdPVwiX2Rpc2FibGVTY3JvbGxCZWZvcmUgfHwgZGlzYWJsZVJpcHBsZVwiXG4gICAgIFtjbGFzcy5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWRdPVwiX2Rpc2FibGVTY3JvbGxCZWZvcmVcIlxuICAgICAoY2xpY2spPVwiX2hhbmRsZVBhZ2luYXRvckNsaWNrKCdiZWZvcmUnKVwiXG4gICAgIChtb3VzZWRvd24pPVwiX2hhbmRsZVBhZ2luYXRvclByZXNzKCdiZWZvcmUnKVwiXG4gICAgICh0b3VjaGVuZCk9XCJfc3RvcEludGVydmFsKClcIj5cbiAgPGRpdiBjbGFzcz1cImphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uXCI+PC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cImphbS1zbGlkZS1lbGVtZW50LWNvbnRhaW5lclwiICNzbGlkZUxpc3RDb250YWluZXJcbiAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiPlxuICA8ZGl2IGNsYXNzPVwiamFtLXNsaWRlLWxpc3RcIiAjc2xpZGVMaXN0IHJvbGU9XCJzbGlkZWxpc3RcIiAoY2RrT2JzZXJ2ZUNvbnRlbnQpPVwiX29uQ29udGVudENoYW5nZXMoKVwiPlxuICAgIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtZWxlbWVudHNcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIDxtYXQtaW5rLWJhcj48L21hdC1pbmstYmFyPiAtLT5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cImphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbiBqYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYWZ0ZXIgbWF0LWVsZXZhdGlvbi16NFwiXG4gICAgICNuZXh0UGFnaW5hdG9yXG4gICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgIG1hdC1yaXBwbGUgW21hdFJpcHBsZURpc2FibGVkXT1cIl9kaXNhYmxlU2Nyb2xsQWZ0ZXIgfHwgZGlzYWJsZVJpcHBsZVwiXG4gICAgIFtjbGFzcy5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWRdPVwiX2Rpc2FibGVTY3JvbGxBZnRlclwiXG4gICAgIChtb3VzZWRvd24pPVwiX2hhbmRsZVBhZ2luYXRvclByZXNzKCdhZnRlcicpXCJcbiAgICAgKGNsaWNrKT1cIl9oYW5kbGVQYWdpbmF0b3JDbGljaygnYWZ0ZXInKVwiXG4gICAgICh0b3VjaGVuZCk9XCJfc3RvcEludGVydmFsKClcIj5cbiAgPGRpdiBjbGFzcz1cImphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BALXdlYmtpdC1rZXlmcmFtZXMgY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnR7LyohKi99QC13ZWJraXQta2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZHsvKiEqL30ubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJhZGdlLXNtYWxsIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6NnB4fS5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZToyNHB4fS5tYXQtaDEsLm1hdC1oZWFkbGluZSwubWF0LXR5cG9ncmFwaHkgaDF7Zm9udDo0MDAgMjRweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMiwubWF0LXRpdGxlLC5tYXQtdHlwb2dyYXBoeSBoMntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgzLC5tYXQtc3ViaGVhZGluZy0yLC5tYXQtdHlwb2dyYXBoeSBoM3tmb250OjQwMCAxNnB4LzI4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg0LC5tYXQtc3ViaGVhZGluZy0xLC5tYXQtdHlwb2dyYXBoeSBoNHtmb250OjQwMCAxNXB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg1LC5tYXQtdHlwb2dyYXBoeSBoNXtmb250OjQwMCAxMS42MnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWg2LC5tYXQtdHlwb2dyYXBoeSBoNntmb250OjQwMCA5LjM4cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtYm9keS0yLC5tYXQtYm9keS1zdHJvbmd7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHksLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5IHAsLm1hdC1ib2R5LTEgcCwubWF0LXR5cG9ncmFwaHkgcHttYXJnaW46MCAwIDEycHh9Lm1hdC1jYXB0aW9uLC5tYXQtc21hbGx7Zm9udDo0MDAgMTJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWRpc3BsYXktNCwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTR7Zm9udDozMDAgMTEycHgvMTEycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNTZweDtsZXR0ZXItc3BhY2luZzotLjA1ZW19Lm1hdC1kaXNwbGF5LTMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ze2ZvbnQ6NDAwIDU2cHgvNTZweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDJlbX0ubWF0LWRpc3BsYXktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTJ7Zm9udDo0MDAgNDVweC80OHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMDVlbX0ubWF0LWRpc3BsYXktMSwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTF7Zm9udDo0MDAgMzRweC80MHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHh9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1idXR0b24sLm1hdC1mYWIsLm1hdC1mbGF0LWJ1dHRvbiwubWF0LWljb24tYnV0dG9uLC5tYXQtbWluaS1mYWIsLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtc3Ryb2tlZC1idXR0b257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWJ1dHRvbi10b2dnbGUsLm1hdC1jYXJke2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhcmQtdGl0bGV7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyMHB4fS5tYXQtY2FyZC1jb250ZW50LC5tYXQtY2FyZC1zdWJ0aXRsZXtmb250LXNpemU6MTRweH0ubWF0LWNoZWNrYm94e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVse2xpbmUtaGVpZ2h0OjI0cHh9Lm1hdC1jaGlwe2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNoaXAgLm1hdC1jaGlwLXJlbW92ZS5tYXQtaWNvbiwubWF0LWNoaXAgLm1hdC1jaGlwLXRyYWlsaW5nLWljb24ubWF0LWljb257Zm9udC1zaXplOjE4cHh9Lm1hdC10YWJsZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1oZWFkZXItY2VsbHtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jZWxsLC5tYXQtZm9vdGVyLWNlbGx7Zm9udC1zaXplOjE0cHh9Lm1hdC1jYWxlbmRhcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYWxlbmRhci1ib2R5e2ZvbnQtc2l6ZToxM3B4fS5tYXQtY2FsZW5kYXItYm9keS1sYWJlbCwubWF0LWNhbGVuZGFyLXBlcmlvZC1idXR0b257Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHRoe2ZvbnQtc2l6ZToxMXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWRpYWxvZy10aXRsZXtmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE1cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZXhwYW5zaW9uLXBhbmVsLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGR7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuMTI1O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb257Zm9udC1zaXplOjE1MCU7bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbntoZWlnaHQ6MS41ZW07d2lkdGg6MS41ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29ue2hlaWdodDoxLjEyNWVtO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi41ZW0gMDtib3JkZXItdG9wOi44NDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50fS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVye3RvcDotLjg0Mzc1ZW07cGFkZGluZy10b3A6Ljg0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcntmb250LXNpemU6NzUlO21hcmdpbi10b3A6LjY2NjY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNzkxNjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjQzNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjNlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzUlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMjgxMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7bWFyZ2luLXRvcDouNTQxNjdlbTt0b3A6Y2FsYygxMDAlIC0gMS42NjY2N2VtKX1AbWVkaWEgcHJpbnR7Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjJlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyMmVtKSBzY2FsZSguNzUpfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2w6LXdlYmtpdC1hdXRvZmlsbCsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyMWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIxZW0pIHNjYWxlKC43NSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMmVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTJlbSkgc2NhbGUoLjc1KX19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouMjVlbSAwIC43NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotLjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0uMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWdyaWQtdGlsZS1mb290ZXIsLm1hdC1ncmlkLXRpbGUtaGVhZGVye2ZvbnQtc2l6ZToxNHB4fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmUsLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fWlucHV0Lm1hdC1pbnB1dC1lbGVtZW50e21hcmdpbi10b3A6LS4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXBhZ2luYXRvciwubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHh9Lm1hdC1yYWRpby1idXR0b24sLm1hdC1zZWxlY3R7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtc3RlcHBlci1ob3Jpem9udGFsLC5tYXQtc3RlcHBlci12ZXJ0aWNhbHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zdGVwLWxhYmVse2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXN0ZXAtc3ViLWxhYmVsLWVycm9ye2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXN0ZXAtbGFiZWwtZXJyb3J7Zm9udC1zaXplOjE0cHh9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdG9vbGJhciwubWF0LXRvb2xiYXIgaDEsLm1hdC10b29sYmFyIGgyLC5tYXQtdG9vbGJhciBoMywubWF0LXRvb2xiYXIgaDQsLm1hdC10b29sYmFyIGg1LC5tYXQtdG9vbGJhciBoNntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowfS5tYXQtdG9vbHRpcHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo4cHg7cGFkZGluZy1ib3R0b206OHB4fS5tYXQtbGlzdC1pdGVtLC5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1vcHRpb257Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdC1iYXNlIC5tYXQtc3ViaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb257Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtc3ViaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4fS5tYXQtb3B0Z3JvdXAtbGFiZWx7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNpbXBsZS1zbmFja2Jhcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHh9Lm1hdC1zaW1wbGUtc25hY2tiYXItYWN0aW9ue2xpbmUtaGVpZ2h0OjE7Zm9udC1mYW1pbHk6aW5oZXJpdDtmb250LXNpemU6aW5oZXJpdDtmb250LXdlaWdodDo1MDB9Lm1hdC10cmVle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LW5lc3RlZC10cmVlLW5vZGUsLm1hdC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZX0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSwtd2Via2l0LXRyYW5zZm9ybSBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gY3ViaWMtYmV6aWVyKDAsMCwuMiwxKSwtd2Via2l0LXRyYW5zZm9ybSBjdWJpYy1iZXppZXIoMCwwLC4yLDEpOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX1AbWVkaWEgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7Lm1hdC1yaXBwbGUtZWxlbWVudHtkaXNwbGF5Om5vbmV9fS5jZGstdmlzdWFsbHktaGlkZGVue2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4O291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIsLmNkay1vdmVybGF5LWNvbnRhaW5lcntwb2ludGVyLWV2ZW50czpub25lO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1jb250YWluZXI6ZW1wdHl7ZGlzcGxheTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlcntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LXBhbmV7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxMDAwO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4O21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJX0uY2RrLW92ZXJsYXktYmFja2Ryb3B7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDoxMDAwO3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTt0cmFuc2l0aW9uOm9wYWNpdHkgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO29wYWNpdHk6MH0uY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjF9QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTouNn19LmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3B7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4zMil9LmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6MH0uY2RrLW92ZXJsYXktY29ubmVjdGVkLXBvc2l0aW9uLWJvdW5kaW5nLWJveHtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDA7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi13aWR0aDoxcHg7bWluLWhlaWdodDoxcHh9LmNkay1nbG9iYWwtc2Nyb2xsYmxvY2t7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbH1Aa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0ey8qISovfUBrZXlmcmFtZXMgY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5key8qISovfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbHstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0fS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6bm90KDotd2Via2l0LWF1dG9maWxsKXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXple3Jlc2l6ZTpub25lfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZS1tZWFzdXJpbmd7aGVpZ2h0OmF1dG8haW1wb3J0YW50O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7cGFkZGluZzoycHggMCFpbXBvcnRhbnQ7Ym94LXNpemluZzpjb250ZW50LWJveCFpbXBvcnRhbnR9LmphbS1zbGlkZS1oZWFkZXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO2ZsZXgtc2hyaW5rOjB9LmphbS1zbGlkZS1lbGVtZW50e2hlaWdodDphdXRvO3BhZGRpbmc6MCAxNnB4O2N1cnNvcjpwb2ludGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveDtvcGFjaXR5Oi42O21pbi13aWR0aDoxNjBweDt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXA7cG9zaXRpb246cmVsYXRpdmV9LmphbS1zbGlkZS1lbGVtZW50OmZvY3Vze291dGxpbmU6MH0uamFtLXNsaWRlLWVsZW1lbnQ6Zm9jdXM6bm90KC5qYW0tc2xpZGUtZGlzYWJsZWQpe29wYWNpdHk6MX0uamFtLXNsaWRlLWVsZW1lbnQuamFtLXNsaWRlLWRpc2FibGVke2N1cnNvcjpkZWZhdWx0fS5qYW0tc2xpZGUtZWxlbWVudCAuamFtLXNsaWRlLWVsZW1lbnQtY29udGVudHtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXB9QG1lZGlhICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5qYW0tc2xpZGUtZWxlbWVudDpmb2N1c3tvdXRsaW5lOmRvdHRlZCAycHh9LmphbS1zbGlkZS1lbGVtZW50LmphbS1zbGlkZS1kaXNhYmxlZHtvcGFjaXR5Oi41fS5qYW0tc2xpZGUtZWxlbWVudHtvcGFjaXR5OjF9fUBtZWRpYSAobWF4LXdpZHRoOjU5OXB4KXsuamFtLXNsaWRlLWVsZW1lbnR7bWluLXdpZHRoOjcycHh9fS5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb257LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6bm9uZTstd2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7bWluLXdpZHRoOjMycHg7Y3Vyc29yOnBvaW50ZXI7ei1pbmRleDoyOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDt0b3VjaC1hY3Rpb246bm9uZX0uamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWNvbnRyb2xzLWVuYWJsZWQgLmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleH0uamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWJlZm9yZSwuamFtLXNsaWRlLWhlYWRlci1ydGwgLmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1hZnRlcntwYWRkaW5nLWxlZnQ6NHB4fS5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYmVmb3JlIC5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiwuamFtLXNsaWRlLWhlYWRlci1ydGwgLmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1hZnRlciAuamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb257LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoLTEzNWRlZyl9LmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1hZnRlciwuamFtLXNsaWRlLWhlYWRlci1ydGwgLmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1iZWZvcmV7cGFkZGluZy1yaWdodDo0cHh9LmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1hZnRlciAuamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLmphbS1zbGlkZS1oZWFkZXItcnRsIC5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYmVmb3JlIC5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbnstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfS5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbntib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjJweCAycHggMCAwO2NvbnRlbnQ6Jyc7aGVpZ2h0OjhweDt3aWR0aDo4cHh9LmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1kaXNhYmxlZHtib3gtc2hhZG93Om5vbmU7Y3Vyc29yOmRlZmF1bHR9LmphbS1zbGlkZS1lbGVtZW50LWNvbnRhaW5lcntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1mbGV4OjE7ZmxleC1ncm93OjE7b3ZlcmZsb3c6aGlkZGVuO3otaW5kZXg6MX0uamFtLXNsaWRlLWxpc3R7LXdlYmtpdC1ib3gtZmxleDoxO2ZsZXgtZ3JvdzoxO3Bvc2l0aW9uOnJlbGF0aXZlOy13ZWJraXQtdHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuNXMgY3ViaWMtYmV6aWVyKC4zNSwwLC4yNSwxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuNXMgY3ViaWMtYmV6aWVyKC4zNSwwLC4yNSwxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuNXMgY3ViaWMtYmV6aWVyKC4zNSwwLC4yNSwxKSwtd2Via2l0LXRyYW5zZm9ybSAuNXMgY3ViaWMtYmV6aWVyKC4zNSwwLC4yNSwxKX0uamFtLXNsaWRlLWVsZW1lbnRze2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4fVttYXQtYWxpZ24tc2xpZGVzPWNlbnRlcl0gLmphbS1zbGlkZS1lbGVtZW50c3std2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfVttYXQtYWxpZ24tc2xpZGVzPWVuZF0gLmphbS1zbGlkZS1lbGVtZW50c3std2Via2l0LWJveC1wYWNrOmVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9YF0sXG4gIGlucHV0czogWydkaXNhYmxlUmlwcGxlJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2phbS1zbGlkZS1oZWFkZXInLFxuICAgICdbY2xhc3MuamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWNvbnRyb2xzLWVuYWJsZWRdJzogJ19zaG93UGFnaW5hdGlvbkNvbnRyb2xzJyxcbiAgICAnW2NsYXNzLmphbS1zbGlkZS1oZWFkZXItcnRsXSc6IGBfZ2V0TGF5b3V0RGlyZWN0aW9uKCkgPT0gJ3J0bCdgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVIZWFkZXIgZXh0ZW5kcyBfSmFtU2xpZGVIZWFkZXJNaXhpbkJhc2VcbiAgICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ2FuRGlzYWJsZVJpcHBsZSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihKYW1TbGlkZUVsZW1lbnRXcmFwcGVyKSBwdWJsaWMgX2VsZW1lbnRXcmFwcGVyczogUXVlcnlMaXN0PEphbVNsaWRlRWxlbWVudFdyYXBwZXI+O1xuICAvLyBAVmlld0NoaWxkKE1hdElua0JhcikgX2lua0JhcjogTWF0SW5rQmFyO1xuICBAVmlld0NoaWxkKCdzbGlkZUxpc3RDb250YWluZXInKSBwdWJsaWMgX3NsaWRlTGlzdENvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc2xpZGVMaXN0JykgcHVibGljIF9zbGlkZUxpc3Q6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ25leHRQYWdpbmF0b3InKSBwdWJsaWMgX25leHRQYWdpbmF0b3I6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdwcmV2aW91c1BhZ2luYXRvcicpIHB1YmxpYyBfcHJldmlvdXNQYWdpbmF0b3I6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIG9wdGlvbiBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByZWFkb25seSBzZWxlY3RGb2N1c2VkSW5kZXg6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIGVsZW1lbnQgaXMgZm9jdXNlZC4gKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByZWFkb25seSBpbmRleEZvY3VzZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNvbnRyb2xzIGZvciBwYWdpbmF0aW9uIHNob3VsZCBiZSBkaXNwbGF5ZWQgKi9cbiAgcHVibGljIF9zaG93UGFnaW5hdGlvbkNvbnRyb2xzID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlIGxpc3QgY2FuIGJlIHNjcm9sbGVkIG1vcmUgdG93YXJkcyB0aGUgZW5kIG9mIHRoZSBzbGlkZSBlbGVtZW50IGxpc3QuICovXG4gIHB1YmxpYyBfZGlzYWJsZVNjcm9sbEFmdGVyID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0aGUgc2xpZGUgbGlzdCBjYW4gYmUgc2Nyb2xsZWQgbW9yZSB0b3dhcmRzIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNsaWRlIGVsZW1lbnQgbGlzdC4gKi9cbiAgcHVibGljIF9kaXNhYmxlU2Nyb2xsQmVmb3JlID0gdHJ1ZTtcblxuICAvKiogVGhlIGRpc3RhbmNlIGluIHBpeGVscyB0aGF0IHRoZSBzbGlkZSBsYWJlbHMgc2hvdWxkIGJlIHRyYW5zbGF0ZWQgdG8gdGhlIGxlZnQuICovXG4gIHByaXZhdGUgX3Njcm9sbERpc3RhbmNlID0gMDtcblxuICAvKiogV2hldGhlciB0aGUgaGVhZGVyIHNob3VsZCBzY3JvbGwgdG8gdGhlIHNlbGVjdGVkIGluZGV4IGFmdGVyIHRoZSB2aWV3IGhhcyBiZWVuIGNoZWNrZWQuICovXG4gIHByaXZhdGUgX3NlbGVjdGVkSW5kZXhDaGFuZ2VkID0gZmFsc2U7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2Ygc2xpZGUgbGFiZWxzIHRoYXQgYXJlIGRpc3BsYXllZCBvbiB0aGUgaGVhZGVyLiBXaGVuIHRoaXMgY2hhbmdlcywgdGhlIGhlYWRlclxuICAgKiBzaG91bGQgcmUtZXZhbHVhdGUgdGhlIHNjcm9sbCBwb3NpdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX3NsaWRlRWxlbWVudENvdW50OiBudW1iZXI7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNjcm9sbCBkaXN0YW5jZSBoYXMgY2hhbmdlZCBhbmQgc2hvdWxkIGJlIGFwcGxpZWQgYWZ0ZXIgdGhlIHZpZXcgaXMgY2hlY2tlZC4gKi9cbiAgcHJpdmF0ZSBfc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkOiBib29sZWFuO1xuXG4gIC8qKiBVc2VkIHRvIG1hbmFnZSBmb2N1cyBiZXR3ZWVuIHRoZSBzbGlkZXMuICovXG4gIHByaXZhdGUgX2tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxKYW1TbGlkZUVsZW1lbnRXcmFwcGVyPjtcblxuICAvKiogQ2FjaGVkIHRleHQgY29udGVudCBvZiB0aGUgaGVhZGVyLiAqL1xuICBwcml2YXRlIF9jdXJyZW50VGV4dENvbnRlbnQ6IHN0cmluZztcblxuICAvKiogU3RyZWFtIHRoYXQgd2lsbCBzdG9wIHRoZSBhdXRvbWF0ZWQgc2Nyb2xsaW5nLiAqL1xuICBwcml2YXRlIF9zdG9wU2Nyb2xsaW5nID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogVGhlIGluZGV4IG9mIHRoZSBhY3RpdmUgc2xpZGUuICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgc2VsZWN0ZWRJbmRleCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDsgfVxuICBwdWJsaWMgc2V0IHNlbGVjdGVkSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgIHZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXhDaGFuZ2VkID0gdGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gdmFsdWU7XG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuX2tleU1hbmFnZXIpIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByaXZhdGUgX3ZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBgX25nWm9uZWAgYW5kIGBfcGxhdGZvcm1zYCBwYXJhbWV0ZXJzIHRvIGJlIG1hZGUgcmVxdWlyZWQuXG4gICAgICBwcml2YXRlIF9uZ1pvbmU/OiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIF9wbGF0Zm9ybT86IFBsYXRmb3JtXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBiaW5kRXZlbnQgPSAoKTogdm9pZCA9PiB7XG4gICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ21vdXNlbGVhdmUnKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fc3RvcEludGVydmFsKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHJlbW92ZSBudWxsIGNoZWNrIG9uY2UgX25nWm9uZSBpcyBtYWRlIGludG8gYSByZXF1aXJlZCBwYXJhbWV0ZXIuXG4gICAgaWYgKF9uZ1pvbmUpIHtcbiAgICAgIC8vIEJpbmQgdGhlIGBtb3VzZWxlYXZlYCBldmVudCBvbiB0aGUgb3V0c2lkZSBzaW5jZSBpdCBkb2Vzbid0IGNoYW5nZSBhbnl0aGluZyBpbiB0aGUgdmlldy5cbiAgICAgIF9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoYmluZEV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmluZEV2ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIHNsaWRlIGxhYmVscyBoYXZlIGNoYW5nZWQsIGNoZWNrIGlmIHNjcm9sbGluZyBzaG91bGQgYmUgZW5hYmxlZFxuICAgIGlmICh0aGlzLl9zbGlkZUVsZW1lbnRDb3VudCAhPT0gdGhpcy5fZWxlbWVudFdyYXBwZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICB0aGlzLl9zbGlkZUVsZW1lbnRDb3VudCA9IHRoaXMuX2VsZW1lbnRXcmFwcGVycy5sZW5ndGg7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgc2VsZWN0ZWQgaW5kZXggaGFzIGNoYW5nZWQsIHNjcm9sbCB0byB0aGUgZWxlbWVudCBhbmQgY2hlY2sgaWYgdGhlIHNjcm9sbGluZyBjb250cm9sc1xuICAgIC8vIHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleENoYW5nZWQpIHtcbiAgICAgIHRoaXMuX3Njcm9sbFRvTGFiZWwodGhpcy5fc2VsZWN0ZWRJbmRleCk7XG4gICAgICB0aGlzLl9jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XG4gICAgICAvLyB0aGlzLl9hbGlnbklua0JhclRvU2VsZWN0ZWRUYWIoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXhDaGFuZ2VkID0gZmFsc2U7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgc2Nyb2xsIGRpc3RhbmNlIGhhcyBiZWVuIGNoYW5nZWQgKHNsaWRlIHNlbGVjdGVkLCBmb2N1c2VkLCBzY3JvbGwgY29udHJvbHMgYWN0aXZhdGVkKSxcbiAgICAvLyB0aGVuIHRyYW5zbGF0ZSB0aGUgaGVhZGVyIHRvIHJlZmxlY3QgdGhpcy5cbiAgICBpZiAodGhpcy5fc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkKSB7XG4gICAgICB0aGlzLl91cGRhdGVUYWJTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgdGhpcy5fc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkID0gZmFsc2U7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlib2FyZCBldmVudHMgb24gdGhlIGhlYWRlci4gKi9cbiAgcHVibGljIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2luc2lkZSBoYW5kbGVLZXlEb3duJywgZXZlbnQpO1xuICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgaGFuZGxlS2V5RG93bicsIGV2ZW50LCBoYXNNb2RpZmllcktleShldmVudCkpO1xuICAgIC8vIFdlIGRvbid0IGhhbmRsZSBhbnkga2V5IGJpbmRpbmdzIHdpdGggYSBtb2RpZmllciBrZXkuXG4gICAgaWYgKGhhc01vZGlmaWVyS2V5KGV2ZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFbmQnOlxuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgY2FzZSAnICc6XG4gICAgICAgIHRoaXMuc2VsZWN0Rm9jdXNlZEluZGV4LmVtaXQodGhpcy5mb2N1c0luZGV4KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbGlnbnMgdGhlIGluayBiYXIgdG8gdGhlIHNlbGVjdGVkIHNsaWRlIG9uIGxvYWQuXG4gICAqL1xuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGNvbnN0IGRpckNoYW5nZSA9IHRoaXMuX2RpciA/IHRoaXMuX2Rpci5jaGFuZ2UgOiBvYnNlcnZhYmxlT2YobnVsbCk7XG4gICAgY29uc3QgcmVzaXplID0gdGhpcy5fdmlld3BvcnRSdWxlci5jaGFuZ2UoMTUwKTtcbiAgICBjb25zdCByZWFsaWduID0gKCk6IHZvaWQgPT4ge1xuICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICAvLyB0aGlzLl9hbGlnbklua0JhclRvU2VsZWN0ZWRUYWIoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fa2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXIodGhpcy5fZWxlbWVudFdyYXBwZXJzKVxuICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5fZ2V0TGF5b3V0RGlyZWN0aW9uKCkpXG4gICAgICAud2l0aFdyYXAoKTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbSgwKTtcblxuICAgIC8vIERlZmVyIHRoZSBmaXJzdCBjYWxsIGluIG9yZGVyIHRvIGFsbG93IGZvciBzbG93ZXIgYnJvd3NlcnMgdG8gbGF5IG91dCB0aGUgZWxlbWVudHMuXG4gICAgLy8gVGhpcyBoZWxwcyBpbiBjYXNlcyB3aGVyZSB0aGUgdXNlciBsYW5kcyBkaXJlY3RseSBvbiBhIHBhZ2Ugd2l0aCBwYWdpbmF0ZWQgc2xpZGVzLlxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVhbGlnbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVhbGlnbigpO1xuICAgIH1cblxuICAgIC8vIE9uIGRpciBjaGFuZ2Ugb3Igd2luZG93IHJlc2l6ZSwgcmVhbGlnbiB0aGUgaW5rIGJhciBhbmQgdXBkYXRlIHRoZSBvcmllbnRhdGlvbiBvZlxuICAgIC8vIHRoZSBrZXkgbWFuYWdlciBpZiB0aGUgZGlyZWN0aW9uIGhhcyBjaGFuZ2VkLlxuICAgIG1lcmdlKGRpckNoYW5nZSwgcmVzaXplKS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgcmVhbGlnbigpO1xuICAgICAgdGhpcy5fa2V5TWFuYWdlci53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuX2dldExheW91dERpcmVjdGlvbigpKTtcbiAgICB9KTtcblxuICAgIC8vIElmIHRoZXJlIGlzIGEgY2hhbmdlIGluIHRoZSBmb2N1cyBrZXkgbWFuYWdlciB3ZSBuZWVkIHRvIGVtaXQgdGhlIGBpbmRleEZvY3VzZWRgXG4gICAgLy8gZXZlbnQgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIHB1YmxpYyBldmVudCB0aGF0IG5vdGlmaWVzIGFib3V0IGZvY3VzIGNoYW5nZXMuIEFsc28gd2UgcmVhbGlnblxuICAgIC8vIHRoZSBzbGlkZXMgY29udGFpbmVyIGJ5IHNjcm9sbGluZyB0aGUgbmV3IGZvY3VzZWQgc2xpZGUgaW50byB0aGUgdmlzaWJsZSBzZWN0aW9uLlxuICAgIHRoaXMuX2tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZShuZXdGb2N1c0luZGV4ID0+IHtcbiAgICAgIHRoaXMuaW5kZXhGb2N1c2VkLmVtaXQobmV3Rm9jdXNJbmRleCk7XG4gICAgICB0aGlzLl9zZXRUYWJGb2N1cyhuZXdGb2N1c0luZGV4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gV2UgbmVlZCB0byBoYW5kbGUgdGhlc2UgZXZlbnRzIG1hbnVhbGx5LCBiZWNhdXNlIHdlIHdhbnQgdG8gYmluZCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycy5cbiAgICBmcm9tRXZlbnQodGhpcy5fcHJldmlvdXNQYWdpbmF0b3IubmF0aXZlRWxlbWVudCwgJ3RvdWNoc3RhcnQnLCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVQYWdpbmF0b3JQcmVzcygnYmVmb3JlJyk7XG4gICAgICB9KTtcblxuICAgIGZyb21FdmVudCh0aGlzLl9uZXh0UGFnaW5hdG9yLm5hdGl2ZUVsZW1lbnQsICd0b3VjaHN0YXJ0JywgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlUGFnaW5hdG9yUHJlc3MoJ2FmdGVyJyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3N0b3BTY3JvbGxpbmcuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmb3Igd2hlbiB0aGUgTXV0YXRpb25PYnNlcnZlciBkZXRlY3RzIHRoYXQgdGhlIGNvbnRlbnQgaGFzIGNoYW5nZWQuXG4gICAqL1xuICBwdWJsaWMgX29uQ29udGVudENoYW5nZXMoKSB7XG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG5cbiAgICAvLyBXZSBuZWVkIHRvIGRpZmYgdGhlIHRleHQgY29udGVudCBvZiB0aGUgaGVhZGVyLCBiZWNhdXNlIHRoZSBNdXRhdGlvbk9ic2VydmVyIGNhbGxiYWNrXG4gICAgLy8gd2lsbCBmaXJlIGV2ZW4gaWYgdGhlIHRleHQgY29udGVudCBkaWRuJ3QgY2hhbmdlIHdoaWNoIGlzIGluZWZmaWNpZW50IGFuZCBpcyBwcm9uZVxuICAgIC8vIHRvIGluZmluaXRlIGxvb3BzIGlmIGEgcG9vcmx5IGNvbnN0cnVjdGVkIGV4cHJlc3Npb24gaXMgcGFzc2VkIGluIChzZWUgIzE0MjQ5KS5cbiAgICBpZiAodGV4dENvbnRlbnQgIT09IHRoaXMuX2N1cnJlbnRUZXh0Q29udGVudCkge1xuICAgICAgdGhpcy5fY3VycmVudFRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XG5cbiAgICAgIGNvbnN0IHpvbmVDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICAgIC8vIHRoaXMuX2FsaWduSW5rQmFyVG9TZWxlY3RlZFRhYigpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIFRoZSBjb250ZW50IG9ic2VydmVyIHJ1bnMgb3V0c2lkZSB0aGUgYE5nWm9uZWAgYnkgZGVmYXVsdCwgd2hpY2hcbiAgICAgIC8vIG1lYW5zIHRoYXQgd2UgbmVlZCB0byBicmluZyB0aGUgY2FsbGJhY2sgYmFjayBpbiBvdXJzZWx2ZXMuXG4gICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIFJlbW92ZSBudWxsIGNoZWNrIGZvciBgX25nWm9uZWAgb25jZSBpdCdzIGEgcmVxdWlyZWQgcGFyYW1ldGVyLlxuICAgICAgaWYgKHRoaXMuX25nWm9uZSkge1xuICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oem9uZUNhbGxiYWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgem9uZUNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2hldGhlciBwYWdpbmF0aW9uIHNob3VsZCBiZSBlbmFibGVkIG9yIG5vdC5cbiAgICpcbiAgICogV0FSTklORzogQ2FsbGluZyB0aGlzIG1ldGhvZCBjYW4gYmUgdmVyeSBjb3N0bHkgaW4gdGVybXMgb2YgcGVyZm9ybWFuY2UuICBJdCBzaG91bGQgYmUgY2FsbGVkXG4gICAqIGFzIGluZnJlcXVlbnRseSBhcyBwb3NzaWJsZSBmcm9tIG91dHNpZGUgb2YgdGhlIFRhYnMgY29tcG9uZW50IGFzIGl0IGNhdXNlcyBhIHJlZmxvdyBvZiB0aGVcbiAgICogcGFnZS5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVQYWdpbmF0aW9uKCkge1xuICAgIHRoaXMuX2NoZWNrUGFnaW5hdGlvbkVuYWJsZWQoKTtcbiAgICB0aGlzLl9jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XG4gICAgdGhpcy5fdXBkYXRlVGFiU2Nyb2xsUG9zaXRpb24oKTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlOiBuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgLyoqIFRyYWNrcyB3aGljaCBlbGVtZW50IGhhcyBmb2N1czsgdXNlZCBmb3Iga2V5Ym9hcmQgbmF2aWdhdGlvbiAqL1xuICBwdWJsaWMgZ2V0IGZvY3VzSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fa2V5TWFuYWdlciA/IHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ISA6IDA7XG4gIH1cblxuICAvKiogV2hlbiB0aGUgZm9jdXMgaW5kZXggaXMgc2V0LCB3ZSBtdXN0IG1hbnVhbGx5IHNlbmQgZm9jdXMgdG8gdGhlIGNvcnJlY3QgZWxlbWVudCAqL1xuICBwdWJsaWMgc2V0IGZvY3VzSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5faXNWYWxpZEluZGV4KHZhbHVlKSB8fCB0aGlzLmZvY3VzSW5kZXggPT09IHZhbHVlIHx8ICF0aGlzLl9rZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIGFuIGluZGV4IGlzIHZhbGlkLiAgSWYgdGhlIHNsaWRlcyBhcmUgbm90IHJlYWR5IHlldCwgd2UgYXNzdW1lIHRoYXQgdGhlIHVzZXIgaXNcbiAgICogcHJvdmlkaW5nIGEgdmFsaWQgaW5kZXggYW5kIHJldHVybiB0cnVlLlxuICAgKi9cbiAgcHVibGljIF9pc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5fZWxlbWVudFdyYXBwZXJzKSB7IHJldHVybiB0cnVlOyB9XG5cbiAgICBjb25zdCBzbGlkZSA9IHRoaXMuX2VsZW1lbnRXcmFwcGVycyA/IHRoaXMuX2VsZW1lbnRXcmFwcGVycy50b0FycmF5KClbaW5kZXhdIDogbnVsbDtcblxuICAgIHJldHVybiAhIXNsaWRlICYmICFzbGlkZS5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGZvY3VzIG9uIHRoZSBIVE1MIGVsZW1lbnQgZm9yIHRoZSBlbGVtZW50IHdyYXBwZXIgYW5kIHNjcm9sbHMgaXQgaW50byB0aGUgdmlldyBpZlxuICAgKiBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICovXG4gIHB1YmxpYyBfc2V0VGFiRm9jdXMoc2xpZGVJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3Nob3dQYWdpbmF0aW9uQ29udHJvbHMpIHtcbiAgICAgIHRoaXMuX3Njcm9sbFRvTGFiZWwoc2xpZGVJbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VsZW1lbnRXcmFwcGVycyAmJiB0aGlzLl9lbGVtZW50V3JhcHBlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9lbGVtZW50V3JhcHBlcnMudG9BcnJheSgpW3NsaWRlSW5kZXhdLmZvY3VzKCk7XG5cbiAgICAgIC8vIERvIG5vdCBsZXQgdGhlIGJyb3dzZXIgbWFuYWdlIHNjcm9sbGluZyB0byBmb2N1cyB0aGUgZWxlbWVudCwgdGhpcyB3aWxsIGJlIGhhbmRsZWRcbiAgICAgIC8vIGJ5IHVzaW5nIHRyYW5zbGF0aW9uLiBJbiBMVFIsIHRoZSBzY3JvbGwgbGVmdCBzaG91bGQgYmUgMC4gSW4gUlRMLCB0aGUgc2Nyb2xsIHdpZHRoXG4gICAgICAvLyBzaG91bGQgYmUgdGhlIGZ1bGwgd2lkdGggbWludXMgdGhlIG9mZnNldCB3aWR0aC5cbiAgICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy5fc2xpZGVMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBkaXIgPSB0aGlzLl9nZXRMYXlvdXREaXJlY3Rpb24oKTtcblxuICAgICAgaWYgKGRpciA9PT0gJ2x0cicpIHtcbiAgICAgICAgY29udGFpbmVyRWwuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXJFbC5zY3JvbGxMZWZ0ID0gY29udGFpbmVyRWwuc2Nyb2xsV2lkdGggLSBjb250YWluZXJFbC5vZmZzZXRXaWR0aDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogVGhlIGxheW91dCBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5pbmcgYXBwLiAqL1xuICBwdWJsaWMgX2dldExheW91dERpcmVjdGlvbigpOiBEaXJlY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA/ICdydGwnIDogJ2x0cic7XG4gIH1cblxuICAvKiogUGVyZm9ybXMgdGhlIENTUyB0cmFuc2Zvcm1hdGlvbiBvbiB0aGUgc2xpZGUgbGlzdCB0aGF0IHdpbGwgY2F1c2UgdGhlIGxpc3QgdG8gc2Nyb2xsLiAqL1xuICBwdWJsaWMgX3VwZGF0ZVRhYlNjcm9sbFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHNjcm9sbERpc3RhbmNlID0gdGhpcy5zY3JvbGxEaXN0YW5jZTtcbiAgICBjb25zdCBwbGF0Zm9ybSA9IHRoaXMuX3BsYXRmb3JtO1xuICAgIGNvbnN0IHRyYW5zbGF0ZVggPSB0aGlzLl9nZXRMYXlvdXREaXJlY3Rpb24oKSA9PT0gJ2x0cicgPyAtc2Nyb2xsRGlzdGFuY2UgOiBzY3JvbGxEaXN0YW5jZTtcblxuICAgIC8vIERvbid0IHVzZSBgdHJhbnNsYXRlM2RgIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGNyZWF0ZSBhIG5ldyBsYXllci4gQSBuZXcgbGF5ZXJcbiAgICAvLyBzZWVtcyB0byBjYXVzZSBmbGlja2VyaW5nIGFuZCBvdmVyZmxvdyBpbiBJbnRlcm5ldCBFeHBsb3Jlci4gRm9yIGV4YW1wbGUsIHRoZSBpbmsgYmFyXG4gICAgLy8gYW5kIHJpcHBsZXMgd2lsbCBleGNlZWQgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIHZpc2libGUgc2xpZGUgYmFyLlxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy8xMDI3NlxuICAgIC8vIFdlIHJvdW5kIHRoZSBgdHJhbnNmb3JtYCBoZXJlLCBiZWNhdXNlIHRyYW5zZm9ybXMgd2l0aCBzdWItcGl4ZWwgcHJlY2lzaW9uIGNhdXNlIHNvbWVcbiAgICAvLyBicm93c2VycyB0byBibHVyIHRoZSBjb250ZW50IG9mIHRoZSBlbGVtZW50LlxuICAgIHRoaXMuX3NsaWRlTGlzdC5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7TWF0aC5yb3VuZCh0cmFuc2xhdGVYKX1weClgO1xuXG4gICAgLy8gU2V0dGluZyB0aGUgYHRyYW5zZm9ybWAgb24gSUUgd2lsbCBjaGFuZ2UgdGhlIHNjcm9sbCBvZmZzZXQgb2YgdGhlIHBhcmVudCwgY2F1c2luZyB0aGVcbiAgICAvLyBwb3NpdGlvbiB0byBiZSB0aHJvd24gb2ZmIGluIHNvbWUgY2FzZXMuIFdlIGhhdmUgdG8gcmVzZXQgaXQgb3Vyc2VsdmVzIHRvIGVuc3VyZSB0aGF0XG4gICAgLy8gaXQgZG9lc24ndCBnZXQgdGhyb3duIG9mZi4gTm90ZSB0aGF0IHdlIHNjb3BlIGl0IG9ubHkgdG8gSUUgYW5kIEVkZ2UsIGJlY2F1c2UgbWVzc2luZ1xuICAgIC8vIHdpdGggdGhlIHNjcm9sbCBwb3NpdGlvbiB0aHJvd3Mgb2ZmIENocm9tZSA3MSsgaW4gUlRMIG1vZGUgKHNlZSAjMTQ2ODkpLlxuICAgIC8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjAgUmVtb3ZlIG51bGwgY2hlY2sgZm9yIGBwbGF0Zm9ybWAuXG4gICAgaWYgKHBsYXRmb3JtICYmIChwbGF0Zm9ybS5UUklERU5UIHx8IHBsYXRmb3JtLkVER0UpKSB7XG4gICAgICB0aGlzLl9zbGlkZUxpc3RDb250YWluZXIubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ID0gMDtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0cyB0aGUgZGlzdGFuY2UgaW4gcGl4ZWxzIHRoYXQgdGhlIHNsaWRlIGhlYWRlciBzaG91bGQgYmUgdHJhbnNmb3JtZWQgaW4gdGhlIFgtYXhpcy4gKi9cbiAgcHVibGljIGdldCBzY3JvbGxEaXN0YW5jZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2Nyb2xsRGlzdGFuY2U7IH1cbiAgcHVibGljIHNldCBzY3JvbGxEaXN0YW5jZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2Nyb2xsVG8odmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRoZSBzbGlkZSBsaXN0IGluIHRoZSAnYmVmb3JlJyBvciAnYWZ0ZXInIGRpcmVjdGlvbiAodG93YXJkcyB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0IG9yXG4gICAqIHRoZSBlbmQgb2YgdGhlIGxpc3QsIHJlc3BlY3RpdmVseSkuIFRoZSBkaXN0YW5jZSB0byBzY3JvbGwgaXMgY29tcHV0ZWQgdG8gYmUgYSB0aGlyZCBvZiB0aGVcbiAgICogbGVuZ3RoIG9mIHRoZSBzbGlkZSBsaXN0IHZpZXcgd2luZG93LlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBjYWxsIHRoYXQgZm9yY2VzIGEgbGF5b3V0IHJlZmxvdyB0byBjb21wdXRlIGJveCBhbmQgc2Nyb2xsIG1ldHJpY3MgYW5kXG4gICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgKi9cbiAgcHVibGljIF9zY3JvbGxIZWFkZXIoZGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24pIHtcbiAgICBjb25zdCB2aWV3TGVuZ3RoID0gdGhpcy5fc2xpZGVMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAvLyBNb3ZlIHRoZSBzY3JvbGwgZGlzdGFuY2Ugb25lLXRoaXJkIHRoZSBsZW5ndGggb2YgdGhlIHNsaWRlIGxpc3QncyB2aWV3cG9ydC5cbiAgICBjb25zdCBzY3JvbGxBbW91bnQgPSAoZGlyZWN0aW9uID09PSAnYmVmb3JlJyA/IC0xIDogMSkgKiB2aWV3TGVuZ3RoIC8gMztcblxuICAgIHJldHVybiB0aGlzLl9zY3JvbGxUbyh0aGlzLl9zY3JvbGxEaXN0YW5jZSArIHNjcm9sbEFtb3VudCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBjbGljayBldmVudHMgb24gdGhlIHBhZ2luYXRpb24gYXJyb3dzLiAqL1xuICBwdWJsaWMgX2hhbmRsZVBhZ2luYXRvckNsaWNrKGRpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uKSB7XG4gICAgdGhpcy5fc3RvcEludGVydmFsKCk7XG4gICAgdGhpcy5fc2Nyb2xsSGVhZGVyKGRpcmVjdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIHNsaWRlIGxpc3Qgc3VjaCB0aGF0IHRoZSBkZXNpcmVkIHNsaWRlIGVsZW1lbnQgKG1hcmtlZCBieSBpbmRleCkgaXMgbW92ZWQgaW50byB2aWV3LlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBjYWxsIHRoYXQgZm9yY2VzIGEgbGF5b3V0IHJlZmxvdyB0byBjb21wdXRlIGJveCBhbmQgc2Nyb2xsIG1ldHJpY3MgYW5kXG4gICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgKi9cbiAgcHVibGljIF9zY3JvbGxUb0xhYmVsKGxhYmVsSW5kZXg6IG51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgX3Njcm9sbFRvTGFiZWwnKTtcbiAgICBjb25zdCBzZWxlY3RlZExhYmVsID0gdGhpcy5fZWxlbWVudFdyYXBwZXJzID8gdGhpcy5fZWxlbWVudFdyYXBwZXJzLnRvQXJyYXkoKVtsYWJlbEluZGV4XSA6IG51bGw7XG5cbiAgICBpZiAoIXNlbGVjdGVkTGFiZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBUaGUgdmlldyBsZW5ndGggaXMgdGhlIHZpc2libGUgd2lkdGggb2YgdGhlIHNsaWRlIGxhYmVscy5cbiAgICBjb25zdCB2aWV3TGVuZ3RoID0gdGhpcy5fc2xpZGVMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgbGFiZWxCZWZvcmVQb3M6IG51bWJlcjtcbiAgICBsZXQgbGFiZWxBZnRlclBvczogbnVtYmVyO1xuICAgIGlmICh0aGlzLl9nZXRMYXlvdXREaXJlY3Rpb24oKSA9PT0gJ2x0cicpIHtcbiAgICAgIGxhYmVsQmVmb3JlUG9zID0gc2VsZWN0ZWRMYWJlbC5nZXRPZmZzZXRMZWZ0KCk7XG4gICAgICBsYWJlbEFmdGVyUG9zID0gbGFiZWxCZWZvcmVQb3MgKyBzZWxlY3RlZExhYmVsLmdldE9mZnNldFdpZHRoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhYmVsQWZ0ZXJQb3MgPSB0aGlzLl9zbGlkZUxpc3QubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAtIHNlbGVjdGVkTGFiZWwuZ2V0T2Zmc2V0TGVmdCgpO1xuICAgICAgbGFiZWxCZWZvcmVQb3MgPSBsYWJlbEFmdGVyUG9zIC0gc2VsZWN0ZWRMYWJlbC5nZXRPZmZzZXRXaWR0aCgpO1xuICAgIH1cblxuICAgIGNvbnN0IGJlZm9yZVZpc2libGVQb3MgPSB0aGlzLnNjcm9sbERpc3RhbmNlO1xuICAgIGNvbnN0IGFmdGVyVmlzaWJsZVBvcyA9IHRoaXMuc2Nyb2xsRGlzdGFuY2UgKyB2aWV3TGVuZ3RoO1xuXG4gICAgaWYgKGxhYmVsQmVmb3JlUG9zIDwgYmVmb3JlVmlzaWJsZVBvcykge1xuICAgICAgLy8gU2Nyb2xsIGhlYWRlciB0byBtb3ZlIGVsZW1lbnQgdG8gdGhlIGJlZm9yZSBkaXJlY3Rpb25cbiAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2UgLT0gYmVmb3JlVmlzaWJsZVBvcyAtIGxhYmVsQmVmb3JlUG9zICsgRVhBR0dFUkFURURfT1ZFUlNDUk9MTDtcbiAgICB9IGVsc2UgaWYgKGxhYmVsQWZ0ZXJQb3MgPiBhZnRlclZpc2libGVQb3MpIHtcbiAgICAgIC8vIFNjcm9sbCBoZWFkZXIgdG8gbW92ZSBlbGVtZW50IHRvIHRoZSBhZnRlciBkaXJlY3Rpb25cbiAgICAgIHRoaXMuc2Nyb2xsRGlzdGFuY2UgKz0gbGFiZWxBZnRlclBvcyAtIGFmdGVyVmlzaWJsZVBvcyArIEVYQUdHRVJBVEVEX09WRVJTQ1JPTEw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIHdoZXRoZXIgdGhlIHBhZ2luYXRpb24gY29udHJvbHMgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgdGhlIHNjcm9sbCB3aWR0aCBvZiB0aGVcbiAgICogc2xpZGUgbGlzdCBpcyB3aWRlciB0aGFuIHRoZSBzaXplIG9mIHRoZSBoZWFkZXIgY29udGFpbmVyLCB0aGVuIHRoZSBwYWdpbmF0aW9uIGNvbnRyb2xzIHNob3VsZFxuICAgKiBiZSBzaG93bi5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICovXG4gIHB1YmxpYyBfY2hlY2tQYWdpbmF0aW9uRW5hYmxlZCgpIHtcbiAgICBjb25zdCBpc0VuYWJsZWQgPVxuICAgICAgICB0aGlzLl9zbGlkZUxpc3QubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCA+IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgIGlmICghaXNFbmFibGVkKSB7XG4gICAgICB0aGlzLnNjcm9sbERpc3RhbmNlID0gMDtcbiAgICB9XG5cbiAgICBpZiAoaXNFbmFibGVkICE9PSB0aGlzLl9zaG93UGFnaW5hdGlvbkNvbnRyb2xzKSB7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zaG93UGFnaW5hdGlvbkNvbnRyb2xzID0gaXNFbmFibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIHdoZXRoZXIgdGhlIGJlZm9yZSBhbmQgYWZ0ZXIgY29udHJvbHMgc2hvdWxkIGJlIGVuYWJsZWQgb3IgZGlzYWJsZWQuXG4gICAqIElmIHRoZSBoZWFkZXIgaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdCAoc2Nyb2xsIGRpc3RhbmNlIGlzIGVxdWFsIHRvIDApIHRoZW4gZGlzYWJsZSB0aGVcbiAgICogYmVmb3JlIGJ1dHRvbi4gSWYgdGhlIGhlYWRlciBpcyBhdCB0aGUgZW5kIG9mIHRoZSBsaXN0IChzY3JvbGwgZGlzdGFuY2UgaXMgZXF1YWwgdG8gdGhlXG4gICAqIG1heGltdW0gZGlzdGFuY2Ugd2UgY2FuIHNjcm9sbCksIHRoZW4gZGlzYWJsZSB0aGUgYWZ0ZXIgYnV0dG9uLlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBjYWxsIHRoYXQgZm9yY2VzIGEgbGF5b3V0IHJlZmxvdyB0byBjb21wdXRlIGJveCBhbmQgc2Nyb2xsIG1ldHJpY3MgYW5kXG4gICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgKi9cbiAgcHVibGljIF9jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCkge1xuICAgIC8vIENoZWNrIGlmIHRoZSBwYWdpbmF0aW9uIGFycm93cyBzaG91bGQgYmUgYWN0aXZhdGVkLlxuICAgIHRoaXMuX2Rpc2FibGVTY3JvbGxCZWZvcmUgPSB0aGlzLnNjcm9sbERpc3RhbmNlID09PSAwO1xuICAgIHRoaXMuX2Rpc2FibGVTY3JvbGxBZnRlciA9IHRoaXMuc2Nyb2xsRGlzdGFuY2UgPT09IHRoaXMuX2dldE1heFNjcm9sbERpc3RhbmNlKCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGF0IGlzIHRoZSBtYXhpbXVtIGxlbmd0aCBpbiBwaXhlbHMgdGhhdCBjYW4gYmUgc2V0IGZvciB0aGUgc2Nyb2xsIGRpc3RhbmNlLiBUaGlzXG4gICAqIGlzIGVxdWFsIHRvIHRoZSBkaWZmZXJlbmNlIGluIHdpZHRoIGJldHdlZW4gdGhlIHNsaWRlIGxpc3QgY29udGFpbmVyIGFuZCBzbGlkZSBoZWFkZXIgY29udGFpbmVyLlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBjYWxsIHRoYXQgZm9yY2VzIGEgbGF5b3V0IHJlZmxvdyB0byBjb21wdXRlIGJveCBhbmQgc2Nyb2xsIG1ldHJpY3MgYW5kXG4gICAqIHNob3VsZCBiZSBjYWxsZWQgc3BhcmluZ2x5LlxuICAgKi9cbiAgcHVibGljIF9nZXRNYXhTY3JvbGxEaXN0YW5jZSgpOiBudW1iZXIge1xuICAgIGNvbnN0IGxlbmd0aE9mVGFiTGlzdCA9IHRoaXMuX3NsaWRlTGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoO1xuICAgIGNvbnN0IHZpZXdMZW5ndGggPSB0aGlzLl9zbGlkZUxpc3RDb250YWluZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgIHJldHVybiAobGVuZ3RoT2ZUYWJMaXN0IC0gdmlld0xlbmd0aCkgfHwgMDtcbiAgfVxuXG4gIC8qKiBUZWxscyB0aGUgaW5rLWJhciB0byBhbGlnbiBpdHNlbGYgdG8gdGhlIGN1cnJlbnQgZWxlbWVudCB3cmFwcGVyICovXG4gIC8vIF9hbGlnbklua0JhclRvU2VsZWN0ZWRUYWIoKTogdm9pZCB7XG4gIC8vICAgY29uc3Qgc2VsZWN0ZWRMYWJlbFdyYXBwZXIgPSB0aGlzLl9lbGVtZW50V3JhcHBlcnMgJiYgdGhpcy5fZWxlbWVudFdyYXBwZXJzLmxlbmd0aCA/XG4gIC8vICAgICAgIHRoaXMuX2VsZW1lbnRXcmFwcGVycy50b0FycmF5KClbdGhpcy5zZWxlY3RlZEluZGV4XS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgOlxuICAvLyAgICAgICBudWxsO1xuICAvL1xuICAvLyAgIHRoaXMuX2lua0Jhci5hbGlnblRvRWxlbWVudChzZWxlY3RlZExhYmVsV3JhcHBlciEpO1xuICAvLyB9XG5cbiAgLyoqIFN0b3BzIHRoZSBjdXJyZW50bHktcnVubmluZyBwYWdpbmF0b3IgaW50ZXJ2YWwuICAqL1xuICBwdWJsaWMgX3N0b3BJbnRlcnZhbCgpIHtcbiAgICB0aGlzLl9zdG9wU2Nyb2xsaW5nLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSB1c2VyIHByZXNzaW5nIGRvd24gb24gb25lIG9mIHRoZSBwYWdpbmF0b3JzLlxuICAgKiBTdGFydHMgc2Nyb2xsaW5nIHRoZSBoZWFkZXIgYWZ0ZXIgYSBjZXJ0YWluIGFtb3VudCBvZiB0aW1lLlxuICAgKiBAcGFyYW0gZGlyZWN0aW9uIEluIHdoaWNoIGRpcmVjdGlvbiB0aGUgcGFnaW5hdG9yIHNob3VsZCBiZSBzY3JvbGxlZC5cbiAgICovXG4gIHB1YmxpYyBfaGFuZGxlUGFnaW5hdG9yUHJlc3MoZGlyZWN0aW9uOiBTY3JvbGxEaXJlY3Rpb24pIHtcbiAgICAvLyBBdm9pZCBvdmVybGFwcGluZyB0aW1lcnMuXG4gICAgdGhpcy5fc3RvcEludGVydmFsKCk7XG5cbiAgICAvLyBTdGFydCBhIHRpbWVyIGFmdGVyIHRoZSBkZWxheSBhbmQga2VlcCBmaXJpbmcgYmFzZWQgb24gdGhlIGludGVydmFsLlxuICAgIHRpbWVyKEhFQURFUl9TQ1JPTExfREVMQVksIEhFQURFUl9TQ1JPTExfSU5URVJWQUwpXG4gICAgICAvLyBLZWVwIHRoZSB0aW1lciBnb2luZyB1bnRpbCBzb21ldGhpbmcgdGVsbHMgaXQgdG8gc3RvcCBvciB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAgICAgIC5waXBlKHRha2VVbnRpbChtZXJnZSh0aGlzLl9zdG9wU2Nyb2xsaW5nLCB0aGlzLl9kZXN0cm95ZWQpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCB7bWF4U2Nyb2xsRGlzdGFuY2UsIGRpc3RhbmNlfTogYW55ID0gdGhpcy5fc2Nyb2xsSGVhZGVyKGRpcmVjdGlvbik7XG5cbiAgICAgICAgLy8gU3RvcCB0aGUgdGltZXIgaWYgd2UndmUgcmVhY2hlZCB0aGUgc3RhcnQgb3IgdGhlIGVuZC5cbiAgICAgICAgaWYgKGRpc3RhbmNlID09PSAwIHx8IGRpc3RhbmNlID49IG1heFNjcm9sbERpc3RhbmNlKSB7XG4gICAgICAgICAgdGhpcy5fc3RvcEludGVydmFsKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgdGhlIGhlYWRlciB0byBhIGdpdmVuIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gUG9zaXRpb24gdG8gd2hpY2ggdG8gc2Nyb2xsLlxuICAgKiBAcmV0dXJucyBJbmZvcm1hdGlvbiBvbiB0aGUgY3VycmVudCBzY3JvbGwgZGlzdGFuY2UgYW5kIHRoZSBtYXhpbXVtLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2Nyb2xsVG8ocG9zaXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IG1heFNjcm9sbERpc3RhbmNlID0gdGhpcy5fZ2V0TWF4U2Nyb2xsRGlzdGFuY2UoKTtcbiAgICB0aGlzLl9zY3JvbGxEaXN0YW5jZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1heFNjcm9sbERpc3RhbmNlLCBwb3NpdGlvbikpO1xuXG4gICAgLy8gTWFyayB0aGF0IHRoZSBzY3JvbGwgZGlzdGFuY2UgaGFzIGNoYW5nZWQgc28gdGhhdCBhZnRlciB0aGUgdmlldyBpcyBjaGVja2VkLCB0aGUgQ1NTXG4gICAgLy8gdHJhbnNmb3JtYXRpb24gY2FuIG1vdmUgdGhlIGhlYWRlci5cbiAgICB0aGlzLl9zY3JvbGxEaXN0YW5jZUNoYW5nZWQgPSB0cnVlO1xuICAgIHRoaXMuX2NoZWNrU2Nyb2xsaW5nQ29udHJvbHMoKTtcblxuICAgIHJldHVybiB7bWF4U2Nyb2xsRGlzdGFuY2UsIGRpc3RhbmNlOiB0aGlzLl9zY3JvbGxEaXN0YW5jZX07XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsXG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsXG4gIG1peGluQ29sb3IsXG4gIG1peGluRGlzYWJsZVJpcHBsZSxcbiAgVGhlbWVQYWxldHRlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSmFtU2xpZGUgfSBmcm9tICcuL3NsaWRlJztcbmltcG9ydCB7IEphbVNsaWRlSGVhZGVyIH0gZnJvbSAnLi9zbGlkZS1oZWFkZXInO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogaW50ZXJmYWNlLW5hbWUgdXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvciB1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3IgY29tcG9uZW50LXNlbGVjdG9yXG5cbi8qKiBVc2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRCdzIGZvciBlYWNoIHNsaWRlIGNvbXBvbmVudCAqL1xubGV0IG5leHRJZCA9IDA7XG5cbi8qKiBBIHNpbXBsZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCBvbiBmb2N1cyBvciBzZWxlY3Rpb24gY2hhbmdlcy4gKi9cbmV4cG9ydCBjbGFzcyBKYW1TbGlkZUNoYW5nZUV2ZW50IHtcbiAgLyoqIEluZGV4IG9mIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgc2xpZGUuICovXG4gIHB1YmxpYyBpbmRleDogbnVtYmVyO1xuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgc2xpZGUuICovXG4gIHB1YmxpYyBzbGlkZTogSmFtU2xpZGU7XG59XG5cbi8qKiBQb3NzaWJsZSBwb3NpdGlvbnMgZm9yIHRoZSBzbGlkZSBoZWFkZXIuICovXG5leHBvcnQgdHlwZSBKYW1TbGlkZUhlYWRlclBvc2l0aW9uID0gJ2Fib3ZlJyB8ICdiZWxvdyc7XG5cbi8qKiBPYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHNsaWRlcyBtb2R1bGUuICovXG5leHBvcnQgaW50ZXJmYWNlIEphbVNsaWRlc0NvbmZpZyB7XG4gIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHNsaWRlIGFuaW1hdGlvbi4gTXVzdCBiZSBhIHZhbGlkIENTUyB2YWx1ZSAoZS5nLiA2MDBtcykuICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uPzogc3RyaW5nO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIHRoZSBzbGlkZXMgbW9kdWxlLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9UQUJTX0NPTkZJRzogSW5qZWN0aW9uVG9rZW48YW55PiA9IG5ldyBJbmplY3Rpb25Ub2tlbignTUFUX1RBQlNfQ09ORklHJyk7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gSmFtU2xpZGVHcm91cC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVHcm91cEJhc2Uge1xuICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuZXhwb3J0IGNvbnN0IF9KYW1TbGlkZUdyb3VwTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmIHR5cGVvZiBKYW1TbGlkZUdyb3VwQmFzZSA9XG4gICAgbWl4aW5Db2xvcihtaXhpbkRpc2FibGVSaXBwbGUoSmFtU2xpZGVHcm91cEJhc2UpLCAncHJpbWFyeScpO1xuXG4vKipcbiAqIE1hdGVyaWFsIGRlc2lnbiBzbGlkZS1ncm91cCBjb21wb25lbnQuICBTdXBwb3J0cyBiYXNpYyBzbGlkZSBwYWlycyAobGFiZWwgKyBjb250ZW50KSBhbmQgaW5jbHVkZXNcbiAqIGFuaW1hdGVkIGluay1iYXIsIGtleWJvYXJkIG5hdmlnYXRpb24sIGFuZCBzY3JlZW4gcmVhZGVyLlxuICogU2VlOiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3NsaWRlcy5odG1sXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2phbS1zbGlkZS1ncm91cCcsXG4gIGV4cG9ydEFzOiAnamFtU2xpZGVHcm91cCcsXG4gIHRlbXBsYXRlOiBgPGphbS1zbGlkZS1oZWFkZXIgI3NsaWRlSGVhZGVyXG4gICAgICAgICAgICAgICBbc2VsZWN0ZWRJbmRleF09XCJzZWxlY3RlZEluZGV4XCJcbiAgICAgICAgICAgICAgIFtkaXNhYmxlUmlwcGxlXT1cImRpc2FibGVSaXBwbGVcIlxuICAgICAgICAgICAgICAgKGluZGV4Rm9jdXNlZCk9XCJfZm9jdXNDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgKHNlbGVjdEZvY3VzZWRJbmRleCk9XCJzZWxlY3RlZEluZGV4ID0gJGV2ZW50XCI+XG4gIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtZWxlbWVudFwiIHJvbGU9XCJzbGlkZVwiIGphbVNsaWRlRWxlbWVudFdyYXBwZXIgbWF0LXJpcHBsZSBjZGtNb25pdG9yRWxlbWVudEZvY3VzXG4gICAgICAgKm5nRm9yPVwibGV0IHNsaWRlIG9mIF9zbGlkZXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgIFtpZF09XCJfZ2V0VGFiTGFiZWxJZChpKVwiXG4gICAgICAgW2F0dHIudGFiSW5kZXhdPVwiX2dldFRhYkluZGV4KHNsaWRlLCBpKVwiXG4gICAgICAgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJpICsgMVwiXG4gICAgICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cIl9zbGlkZXMubGVuZ3RoXCJcbiAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIl9nZXRUYWJDb250ZW50SWQoaSlcIlxuICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwic2VsZWN0ZWRJbmRleCA9PSBpXCJcbiAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInNsaWRlLmFyaWFMYWJlbCB8fCBudWxsXCJcbiAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiKCFzbGlkZS5hcmlhTGFiZWwgJiYgc2xpZGUuYXJpYUxhYmVsbGVkYnkpID8gc2xpZGUuYXJpYUxhYmVsbGVkYnkgOiBudWxsXCJcbiAgICAgICBbY2xhc3MuamFtLXNsaWRlLWVsZW1lbnQtYWN0aXZlXT1cInNlbGVjdGVkSW5kZXggPT0gaVwiXG4gICAgICAgW2Rpc2FibGVkXT1cInNsaWRlLmRpc2FibGVkXCJcbiAgICAgICBbbWF0UmlwcGxlRGlzYWJsZWRdPVwic2xpZGUuZGlzYWJsZWQgfHwgZGlzYWJsZVJpcHBsZVwiXG4gICAgICAgKGNsaWNrKT1cIl9oYW5kbGVDbGljayhzbGlkZSwgc2xpZGVIZWFkZXIsIGkpXCI+XG5cblxuICAgIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtZWxlbWVudC1jb250ZW50XCI+XG4gICAgICA8IS0tIElmIHRoZXJlIGlzIGEgZWxlbWVudCB0ZW1wbGF0ZSwgdXNlIGl0LiAtLT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJzbGlkZS50ZW1wbGF0ZUxhYmVsXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cInNsaWRlLnRlbXBsYXRlTGFiZWxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBJZiB0aGVyZSBpcyBub3QgYSBlbGVtZW50IHRlbXBsYXRlLCBmYWxsIGJhY2sgdG8gdGhlIHRleHQgbGFiZWwuIC0tPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFzbGlkZS50ZW1wbGF0ZUxhYmVsXCI+e3tzbGlkZS50ZXh0TGFiZWx9fTwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9qYW0tc2xpZGUtaGVhZGVyPlxuXG48IS0tIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtYm9keS13cmFwcGVyXCIgI3NsaWRlQm9keVdyYXBwZXI+XG4gIDxqYW0tc2xpZGUtYm9keSByb2xlPVwic2xpZGVwYW5lbFwiXG4gICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgc2xpZGUgb2YgX3NsaWRlczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICBbaWRdPVwiX2dldFRhYkNvbnRlbnRJZChpKVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiX2dldFRhYkxhYmVsSWQoaSlcIlxuICAgICAgICAgICAgICAgW2NsYXNzLmphbS1zbGlkZS1ib2R5LWFjdGl2ZV09XCJzZWxlY3RlZEluZGV4ID09IGlcIlxuICAgICAgICAgICAgICAgW2NvbnRlbnRdPVwic2xpZGUuY29udGVudFwiXG4gICAgICAgICAgICAgICBbcG9zaXRpb25dPVwic2xpZGUucG9zaXRpb25cIlxuICAgICAgICAgICAgICAgW29yaWdpbl09XCJzbGlkZS5vcmlnaW5cIlxuICAgICAgICAgICAgICAgW2FuaW1hdGlvbkR1cmF0aW9uXT1cImFuaW1hdGlvbkR1cmF0aW9uXCJcbiAgICAgICAgICAgICAgIChfb25DZW50ZXJlZCk9XCJfcmVtb3ZlVGFiQm9keVdyYXBwZXJIZWlnaHQoKVwiXG4gICAgICAgICAgICAgICAoX29uQ2VudGVyaW5nKT1cIl9zZXRUYWJCb2R5V3JhcHBlckhlaWdodCgkZXZlbnQpXCI+XG4gIDwvamFtLXNsaWRlLWJvZHk+XG48L2Rpdj4gLS0+XG5gLFxuICBzdHlsZXM6IFtgQC13ZWJraXQta2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0ey8qISovfUAtd2Via2l0LWtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR7LyohKi99Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZXtmb250LXNpemU6MjBweH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9QG1lZGlhIHByaW50ey5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIyZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjJlbSkgc2NhbGUoLjc1KX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjFlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyMWVtKSBzY2FsZSguNzUpfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTJlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyZW0pIHNjYWxlKC43NSl9fS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjI1ZW0gMCAuNzVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4wOTM3NWVtO21hcmdpbi10b3A6LS41ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOjFlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLXN1Yi1sYWJlbC1lcnJvcntmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLWVycm9ye2ZvbnQtc2l6ZToxNHB4fS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OHB4O3BhZGRpbmctYm90dG9tOjhweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTZweH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QtYmFzZSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTJweH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1uZXN0ZWQtdHJlZS1ub2RlLC5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmV9Lm1hdC1yaXBwbGUubWF0LXJpcHBsZS11bmJvdW5kZWR7b3ZlcmZsb3c6dmlzaWJsZX0ubWF0LXJpcHBsZS1lbGVtZW50e3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlci1yYWRpdXM6NTAlO3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9QG1lZGlhICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5tYXQtcmlwcGxlLWVsZW1lbnR7ZGlzcGxheTpub25lfX0uY2RrLXZpc3VhbGx5LWhpZGRlbntib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyLC5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY2RrLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktY29udGFpbmVyOmVtcHR5e2Rpc3BsYXk6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMzIpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWJveC1kaXJlY3Rpb246bm9ybWFsO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttaW4td2lkdGg6MXB4O21pbi1oZWlnaHQ6MXB4fS5jZGstZ2xvYmFsLXNjcm9sbGJsb2Nre3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7b3ZlcmZsb3cteTpzY3JvbGx9QGtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydHsvKiEqL31Aa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZHsvKiEqL30uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5qYW0tc2xpZGUtZ3JvdXB7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5qYW0tc2xpZGUtZ3JvdXAuamFtLXNsaWRlLWdyb3VwLWludmVydGVkLWhlYWRlcnstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOnJldmVyc2U7ZmxleC1kaXJlY3Rpb246Y29sdW1uLXJldmVyc2V9LmphbS1zbGlkZS1lbGVtZW50e2hlaWdodDphdXRvO3BhZGRpbmc6MCAxNnB4O2N1cnNvcjpwb2ludGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveDtvcGFjaXR5Oi42O21pbi13aWR0aDoxNjBweDt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXA7cG9zaXRpb246cmVsYXRpdmV9LmphbS1zbGlkZS1lbGVtZW50OmZvY3Vze291dGxpbmU6MH0uamFtLXNsaWRlLWVsZW1lbnQ6Zm9jdXM6bm90KC5qYW0tc2xpZGUtZGlzYWJsZWQpe29wYWNpdHk6MX0uamFtLXNsaWRlLWVsZW1lbnQuamFtLXNsaWRlLWRpc2FibGVke2N1cnNvcjpkZWZhdWx0fS5qYW0tc2xpZGUtZWxlbWVudCAuamFtLXNsaWRlLWVsZW1lbnQtY29udGVudHtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXB9QG1lZGlhICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5qYW0tc2xpZGUtZWxlbWVudDpmb2N1c3tvdXRsaW5lOmRvdHRlZCAycHh9LmphbS1zbGlkZS1lbGVtZW50LmphbS1zbGlkZS1kaXNhYmxlZHtvcGFjaXR5Oi41fS5qYW0tc2xpZGUtZWxlbWVudHtvcGFjaXR5OjF9fUBtZWRpYSAobWF4LXdpZHRoOjU5OXB4KXsuamFtLXNsaWRlLWVsZW1lbnR7cGFkZGluZzowIDEycHh9fUBtZWRpYSAobWF4LXdpZHRoOjk1OXB4KXsuamFtLXNsaWRlLWVsZW1lbnR7cGFkZGluZzowIDEycHh9fS5qYW0tc2xpZGUtZ3JvdXBbbWF0LXN0cmV0Y2gtc2xpZGVzXT4uamFtLXNsaWRlLWhlYWRlciAuamFtLXNsaWRlLWVsZW1lbnR7ZmxleC1iYXNpczowOy13ZWJraXQtYm94LWZsZXg6MTtmbGV4LWdyb3c6MX0uamFtLXNsaWRlLWJvZHktd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC10cmFuc2l0aW9uOmhlaWdodCAuNXMgY3ViaWMtYmV6aWVyKC4zNSwwLC4yNSwxKTt0cmFuc2l0aW9uOmhlaWdodCAuNXMgY3ViaWMtYmV6aWVyKC4zNSwwLC4yNSwxKX0uamFtLXNsaWRlLWJvZHl7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW47ZmxleC1iYXNpczoxMDAlfS5qYW0tc2xpZGUtYm9keS5qYW0tc2xpZGUtYm9keS1hY3RpdmV7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3cteDpoaWRkZW47b3ZlcmZsb3cteTphdXRvO3otaW5kZXg6MTstd2Via2l0LWJveC1mbGV4OjE7ZmxleC1ncm93OjF9LmphbS1zbGlkZS1ncm91cC5qYW0tc2xpZGUtZ3JvdXAtZHluYW1pYy1oZWlnaHQgLmphbS1zbGlkZS1ib2R5LmphbS1zbGlkZS1ib2R5LWFjdGl2ZXtvdmVyZmxvdy15OmhpZGRlbn1gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnamFtLXNsaWRlLWdyb3VwJyxcbiAgICAnW2NsYXNzLmphbS1zbGlkZS1ncm91cC1keW5hbWljLWhlaWdodF0nOiAnZHluYW1pY0hlaWdodCcsXG4gICAgJ1tjbGFzcy5qYW0tc2xpZGUtZ3JvdXAtaW52ZXJ0ZWQtaGVhZGVyXSc6ICdoZWFkZXJQb3NpdGlvbiA9PT0gXCJiZWxvd1wiJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlR3JvdXAgZXh0ZW5kcyBfSmFtU2xpZGVHcm91cE1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25EZXN0cm95LCBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihKYW1TbGlkZSkgcHVibGljIF9zbGlkZXM6IFF1ZXJ5TGlzdDxKYW1TbGlkZT47XG5cbiAgQFZpZXdDaGlsZCgnc2xpZGVCb2R5V3JhcHBlcicpIHB1YmxpYyBfc2xpZGVCb2R5V3JhcHBlcjogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKCdzbGlkZUhlYWRlcicpIHB1YmxpYyBfc2xpZGVIZWFkZXI6IEphbVNsaWRlSGVhZGVyO1xuXG4gIC8qKiBPdXRwdXQgdG8gZW5hYmxlIHN1cHBvcnQgZm9yIHR3by13YXkgYmluZGluZyBvbiBgWyhzZWxlY3RlZEluZGV4KV1gICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ZWRJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGZvY3VzIGhhcyBjaGFuZ2VkIHdpdGhpbiBhIHNsaWRlIGdyb3VwLiAqL1xuICBAT3V0cHV0KCkgcHVibGljIHJlYWRvbmx5IGZvY3VzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SmFtU2xpZGVDaGFuZ2VFdmVudD4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxKYW1TbGlkZUNoYW5nZUV2ZW50PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGJvZHkgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWQgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByZWFkb25seSBhbmltYXRpb25Eb25lOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGUgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkLiAqL1xuICBAT3V0cHV0KCkgcHVibGljIHJlYWRvbmx5IHNlbGVjdGVkVGFiQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SmFtU2xpZGVDaGFuZ2VFdmVudD4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxKYW1TbGlkZUNoYW5nZUV2ZW50Pih0cnVlKTtcblxuICAvKiogUG9zaXRpb24gb2YgdGhlIHNsaWRlIGhlYWRlci4gKi9cbiAgQElucHV0KCkgcHVibGljIGhlYWRlclBvc2l0aW9uOiBKYW1TbGlkZUhlYWRlclBvc2l0aW9uID0gJ2Fib3ZlJztcblxuICAvKiogVGhlIHNsaWRlIGluZGV4IHRoYXQgc2hvdWxkIGJlIHNlbGVjdGVkIGFmdGVyIHRoZSBjb250ZW50IGhhcyBiZWVuIGNoZWNrZWQuICovXG4gIHByaXZhdGUgX2luZGV4VG9TZWxlY3Q6IG51bWJlciB8IG51bGwgPSAwO1xuXG4gIC8qKiBTbmFwc2hvdCBvZiB0aGUgaGVpZ2h0IG9mIHRoZSBzbGlkZSBib2R5IHdyYXBwZXIgYmVmb3JlIGFub3RoZXIgc2xpZGUgaXMgYWN0aXZhdGVkLiAqL1xuICBwcml2YXRlIF9zbGlkZUJvZHlXcmFwcGVySGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gc2xpZGVzIGJlaW5nIGFkZGVkL3JlbW92ZWQuICovXG4gIHByaXZhdGUgX3NsaWRlc1N1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIHNsaWRlIGxhYmVscy4gKi9cbiAgcHJpdmF0ZSBfc2xpZGVFbGVtZW50U3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZSBncm91cCBzaG91bGQgZ3JvdyB0byB0aGUgc2l6ZSBvZiB0aGUgYWN0aXZlIHNsaWRlLiAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGR5bmFtaWNIZWlnaHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9keW5hbWljSGVpZ2h0OyB9XG4gIHB1YmxpYyBzZXQgZHluYW1pY0hlaWdodCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9keW5hbWljSGVpZ2h0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9keW5hbWljSGVpZ2h0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHNsaWRlLiAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHwgbnVsbCB7IHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4OyB9XG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMuX2luZGV4VG9TZWxlY3QgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgbnVsbCk7XG4gIH1cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIER1cmF0aW9uIGZvciB0aGUgc2xpZGUgYW5pbWF0aW9uLiBXaWxsIGJlIG5vcm1hbGl6ZWQgdG8gbWlsbGlzZWNvbmRzIGlmIG5vIHVuaXRzIGFyZSBzZXQuICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgYW5pbWF0aW9uRHVyYXRpb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uOyB9XG4gIHB1YmxpYyBzZXQgYW5pbWF0aW9uRHVyYXRpb24odmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uID0gL15cXGQrJC8udGVzdCh2YWx1ZSkgPyB2YWx1ZSArICdtcycgOiB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9hbmltYXRpb25EdXJhdGlvbjogc3RyaW5nO1xuXG4gIC8qKiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBzbGlkZSBncm91cC4gKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBiYWNrZ3JvdW5kQ29sb3IoKTogVGhlbWVQYWxldHRlIHsgcmV0dXJuIHRoaXMuX2JhY2tncm91bmRDb2xvcjsgfVxuICBwdWJsaWMgc2V0IGJhY2tncm91bmRDb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBuYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYG1hdC1iYWNrZ3JvdW5kLSR7dGhpcy5iYWNrZ3JvdW5kQ29sb3J9YCk7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIG5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWF0LWJhY2tncm91bmQtJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9iYWNrZ3JvdW5kQ29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICBwcml2YXRlIF9ncm91cElkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIEBJbmplY3QoTUFUX1RBQlNfQ09ORklHKSBAT3B0aW9uYWwoKSBkZWZhdWx0Q29uZmlnPzogSmFtU2xpZGVzQ29uZmlnXG4gICAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgdGhpcy5fZ3JvdXBJZCA9IG5leHRJZCArPSAxO1xuICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSBkZWZhdWx0Q29uZmlnICYmIGRlZmF1bHRDb25maWcuYW5pbWF0aW9uRHVyYXRpb24gP1xuICAgICAgICBkZWZhdWx0Q29uZmlnLmFuaW1hdGlvbkR1cmF0aW9uIDogJzUwMG1zJztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB0aGUgY29udGVudCBpcyBjaGVja2VkLCB0aGlzIGNvbXBvbmVudCBrbm93cyB3aGF0IHNsaWRlcyBoYXZlIGJlZW4gZGVmaW5lZFxuICAgKiBhbmQgd2hhdCB0aGUgc2VsZWN0ZWQgaW5kZXggc2hvdWxkIGJlLiBUaGlzIGlzIHdoZXJlIHdlIGNhbiBrbm93IGV4YWN0bHkgd2hhdCBwb3NpdGlvblxuICAgKiBlYWNoIHNsaWRlIHNob3VsZCBiZSBpbiBhY2NvcmRpbmcgdG8gdGhlIG5ldyBzZWxlY3RlZCBpbmRleCwgYW5kIGFkZGl0aW9uYWxseSB3ZSBrbm93IGhvd1xuICAgKiBhIG5ldyBzZWxlY3RlZCBzbGlkZSBzaG91bGQgdHJhbnNpdGlvbiBpbiAoZnJvbSB0aGUgbGVmdCBvciByaWdodCkuXG4gICAqL1xuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIERvbid0IGNsYW1wIHRoZSBgaW5kZXhUb1NlbGVjdGAgaW1tZWRpYXRlbHkgaW4gdGhlIHNldHRlciBiZWNhdXNlIGl0IGNhbiBoYXBwZW4gdGhhdFxuICAgIC8vIHRoZSBhbW91bnQgb2Ygc2xpZGVzIGNoYW5nZXMgYmVmb3JlIHRoZSBhY3R1YWwgY2hhbmdlIGRldGVjdGlvbiBydW5zLlxuICAgIGNvbnN0IGluZGV4VG9TZWxlY3QgPSB0aGlzLl9pbmRleFRvU2VsZWN0ID0gdGhpcy5fY2xhbXBUYWJJbmRleCh0aGlzLl9pbmRleFRvU2VsZWN0KTtcblxuICAgIC8vIElmIHRoZXJlIGlzIGEgY2hhbmdlIGluIHNlbGVjdGVkIGluZGV4LCBlbWl0IGEgY2hhbmdlIGV2ZW50LiBTaG91bGQgbm90IHRyaWdnZXIgaWZcbiAgICAvLyB0aGUgc2VsZWN0ZWQgaW5kZXggaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZC5cbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCkge1xuICAgICAgY29uc3QgaXNGaXJzdFJ1biA9ICF0aGlzLl9zZWxlY3RlZEluZGV4O1xuXG4gICAgICBpZiAoIWlzRmlyc3RSdW4pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYkNoYW5nZS5lbWl0KHRoaXMuX2NyZWF0ZUNoYW5nZUV2ZW50KGluZGV4VG9TZWxlY3QpKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hhbmdpbmcgdGhlc2UgdmFsdWVzIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgLy8gc2luY2UgdGhlIGNoZWNrZWQgY29udGVudCBtYXkgY29udGFpbiByZWZlcmVuY2VzIHRvIHRoZW0uXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4gc2xpZGUuaXNBY3RpdmUgPSBpbmRleCA9PT0gaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlLmVtaXQoaW5kZXhUb1NlbGVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNldHVwIHRoZSBwb3NpdGlvbiBmb3IgZWFjaCBzbGlkZSBhbmQgb3B0aW9uYWxseSBzZXR1cCBhbiBvcmlnaW4gb24gdGhlIG5leHQgc2VsZWN0ZWQgc2xpZGUuXG4gICAgdGhpcy5fc2xpZGVzLmZvckVhY2goKHNsaWRlOiBKYW1TbGlkZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgc2xpZGUucG9zaXRpb24gPSBpbmRleCAtIGluZGV4VG9TZWxlY3Q7XG5cbiAgICAgIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBzZWxlY3RlZCBzbGlkZSwgdGhlbiBzZXQgdXAgYW4gb3JpZ2luIGZvciB0aGUgbmV4dCBzZWxlY3RlZCBzbGlkZVxuICAgICAgLy8gaWYgaXQgZG9lc24ndCBoYXZlIG9uZSBhbHJlYWR5LlxuICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZEluZGV4ICYmIHNsaWRlLnBvc2l0aW9uID09PSAwICYmICFzbGlkZS5vcmlnaW4pIHtcbiAgICAgICAgc2xpZGUub3JpZ2luID0gaW5kZXhUb1NlbGVjdCAtIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4VG9TZWxlY3Q7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3N1YnNjcmliZVRvVGFiTGFiZWxzKCk7XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgYW1vdW50IG9mIHNsaWRlcywgaW4gb3JkZXIgdG8gYmVcbiAgICAvLyBhYmxlIHRvIHJlLXJlbmRlciB0aGUgY29udGVudCBhcyBuZXcgc2xpZGVzIGFyZSBhZGRlZCBvciByZW1vdmVkLlxuICAgIHRoaXMuX3NsaWRlc1N1YnNjcmlwdGlvbiA9IHRoaXMuX3NsaWRlcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5fY2xhbXBUYWJJbmRleCh0aGlzLl9pbmRleFRvU2VsZWN0KTtcblxuICAgICAgLy8gTWFpbnRhaW4gdGhlIHByZXZpb3VzbHktc2VsZWN0ZWQgc2xpZGUgaWYgYSBuZXcgc2xpZGUgaXMgYWRkZWQgb3IgcmVtb3ZlZCBhbmQgdGhlcmUgaXMgbm9cbiAgICAgIC8vIGV4cGxpY2l0IGNoYW5nZSB0aGF0IHNlbGVjdHMgYSBkaWZmZXJlbnQgc2xpZGUuXG4gICAgICBpZiAoaW5kZXhUb1NlbGVjdCA9PT0gdGhpcy5fc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICBjb25zdCBzbGlkZXMgPSB0aGlzLl9zbGlkZXMudG9BcnJheSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKHNsaWRlc1tpXS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgLy8gQXNzaWduIGJvdGggdG8gdGhlIGBfaW5kZXhUb1NlbGVjdGAgYW5kIGBfc2VsZWN0ZWRJbmRleGAgc28gd2UgZG9uJ3QgZmlyZSBhIGNoYW5nZWRcbiAgICAgICAgICAgIC8vIGV2ZW50LCBvdGhlcndpc2UgdGhlIGNvbnN1bWVyIG1heSBlbmQgdXAgaW4gYW4gaW5maW5pdGUgbG9vcCBpbiBzb21lIGVkZ2UgY2FzZXMgbGlrZVxuICAgICAgICAgICAgLy8gYWRkaW5nIGEgc2xpZGUgd2l0aGluIHRoZSBgc2VsZWN0ZWRJbmRleENoYW5nZWAgZXZlbnQuXG4gICAgICAgICAgICB0aGlzLl9pbmRleFRvU2VsZWN0ID0gdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NsaWRlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NsaWRlRWxlbWVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqIFJlLWFsaWducyB0aGUgaW5rIGJhciB0byB0aGUgc2VsZWN0ZWQgc2xpZGUgZWxlbWVudC4gKi9cbiAgLy8gcmVhbGlnbklua0JhcigpIHtcbiAgLy8gICBpZiAodGhpcy5fc2xpZGVIZWFkZXIpIHtcbiAgLy8gICAgIHRoaXMuX3NsaWRlSGVhZGVyLl9hbGlnbklua0JhclRvU2VsZWN0ZWRUYWIoKTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICBwdWJsaWMgX2ZvY3VzQ2hhbmdlZChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5mb2N1c0NoYW5nZS5lbWl0KHRoaXMuX2NyZWF0ZUNoYW5nZUV2ZW50KGluZGV4KSk7XG4gIH1cblxuICAvKiogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgZWFjaCBzbGlkZSBlbGVtZW50IGVsZW1lbnQgKi9cbiAgcHVibGljIF9nZXRUYWJMYWJlbElkKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBqYW0tc2xpZGUtZWxlbWVudC0ke3RoaXMuX2dyb3VwSWR9LSR7aX1gO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGVhY2ggc2xpZGUgY29udGVudCBlbGVtZW50ICovXG4gIHB1YmxpYyBfZ2V0VGFiQ29udGVudElkKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBqYW0tc2xpZGUtY29udGVudC0ke3RoaXMuX2dyb3VwSWR9LSR7aX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgYm9keSB3cmFwcGVyIHRvIHRoZSBoZWlnaHQgb2YgdGhlIGFjdGl2YXRpbmcgc2xpZGUgaWYgZHluYW1pY1xuICAgKiBoZWlnaHQgcHJvcGVydHkgaXMgdHJ1ZS5cbiAgICovXG4gIHB1YmxpYyBfc2V0VGFiQm9keVdyYXBwZXJIZWlnaHQoc2xpZGVIZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZHluYW1pY0hlaWdodCB8fCAhdGhpcy5fc2xpZGVCb2R5V3JhcHBlckhlaWdodCkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IHdyYXBwZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5fc2xpZGVCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50O1xuXG4gICAgd3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9zbGlkZUJvZHlXcmFwcGVySGVpZ2h0ICsgJ3B4JztcblxuICAgIC8vIFRoaXMgY29uZGl0aW9uYWwgZm9yY2VzIHRoZSBicm93c2VyIHRvIHBhaW50IHRoZSBoZWlnaHQgc28gdGhhdFxuICAgIC8vIHRoZSBhbmltYXRpb24gdG8gdGhlIG5ldyBoZWlnaHQgY2FuIGhhdmUgYW4gb3JpZ2luLlxuICAgIGlmICh0aGlzLl9zbGlkZUJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHNsaWRlSGVpZ2h0ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICAvKiogUmVtb3ZlcyB0aGUgaGVpZ2h0IG9mIHRoZSBzbGlkZSBib2R5IHdyYXBwZXIuICovXG4gIHB1YmxpYyBfcmVtb3ZlVGFiQm9keVdyYXBwZXJIZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuX3NsaWRlQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9zbGlkZUJvZHlXcmFwcGVySGVpZ2h0ID0gd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgd3JhcHBlci5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICB0aGlzLmFuaW1hdGlvbkRvbmUuZW1pdCgpO1xuICB9XG5cbiAgLyoqIEhhbmRsZSBjbGljayBldmVudHMsIHNldHRpbmcgbmV3IHNlbGVjdGVkIGluZGV4IGlmIGFwcHJvcHJpYXRlLiAqL1xuICBwdWJsaWMgX2hhbmRsZUNsaWNrKHNsaWRlOiBKYW1TbGlkZSwgc2xpZGVIZWFkZXI6IEphbVNsaWRlSGVhZGVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCFzbGlkZS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2xpZGVIZWFkZXIuZm9jdXNJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZXRyaWV2ZXMgdGhlIHNsaWRlaW5kZXggZm9yIHRoZSBzbGlkZS4gKi9cbiAgcHVibGljIF9nZXRUYWJJbmRleChzbGlkZTogSmFtU2xpZGUsIGlkeDogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKHNsaWRlLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4ID09PSBpZHggPyAwIDogLTE7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVDaGFuZ2VFdmVudChpbmRleDogbnVtYmVyKTogSmFtU2xpZGVDaGFuZ2VFdmVudCB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgSmFtU2xpZGVDaGFuZ2VFdmVudCgpO1xuICAgIGV2ZW50LmluZGV4ID0gaW5kZXg7XG4gICAgaWYgKHRoaXMuX3NsaWRlcyAmJiB0aGlzLl9zbGlkZXMubGVuZ3RoKSB7XG4gICAgICBldmVudC5zbGlkZSA9IHRoaXMuX3NsaWRlcy50b0FycmF5KClbaW5kZXhdO1xuICAgIH1cblxuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIGNoYW5nZXMgaW4gdGhlIHNsaWRlIGxhYmVscy4gVGhpcyBpcyBuZWVkZWQsIGJlY2F1c2UgdGhlIEBJbnB1dCBmb3IgdGhlIGVsZW1lbnQgaXNcbiAgICogb24gdGhlIEphbVNsaWRlIGNvbXBvbmVudCwgd2hlcmVhcyB0aGUgZGF0YSBiaW5kaW5nIGlzIGluc2lkZSB0aGUgSmFtU2xpZGVHcm91cC4gSW4gb3JkZXIgZm9yIHRoZVxuICAgKiBiaW5kaW5nIHRvIGJlIHVwZGF0ZWQsIHdlIG5lZWQgdG8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gaXQgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgKiBtYW51YWxseS5cbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvVGFiTGFiZWxzKCkge1xuICAgIGlmICh0aGlzLl9zbGlkZUVsZW1lbnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3NsaWRlRWxlbWVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3NsaWRlRWxlbWVudFN1YnNjcmlwdGlvbiA9IG1lcmdlKC4uLnRoaXMuX3NsaWRlcy5tYXAoc2xpZGUgPT4gc2xpZGUuX3N0YXRlQ2hhbmdlcykpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIC8qKiBDbGFtcHMgdGhlIGdpdmVuIGluZGV4IHRvIHRoZSBib3VuZHMgb2YgMCBhbmQgdGhlIHNsaWRlcyBsZW5ndGguICovXG4gIHByaXZhdGUgX2NsYW1wVGFiSW5kZXgoaW5kZXg6IG51bWJlciB8IG51bGwpOiBudW1iZXIge1xuICAgIC8vIE5vdGUgdGhlIGB8fCAwYCwgd2hpY2ggZW5zdXJlcyB0aGF0IHZhbHVlcyBsaWtlIE5hTiBjYW4ndCBnZXQgdGhyb3VnaFxuICAgIC8vIGFuZCB3aGljaCB3b3VsZCBvdGhlcndpc2UgdGhyb3cgdGhlIGNvbXBvbmVudCBpbnRvIGFuIGluZmluaXRlIGxvb3BcbiAgICAvLyAoc2luY2UgTWF0aC5tYXgoTmFOLCAwKSA9PT0gTmFOKS5cbiAgICByZXR1cm4gTWF0aC5taW4odGhpcy5fc2xpZGVzLmxlbmd0aCAtIDEsIE1hdGgubWF4KGluZGV4IHx8IDAsIDApKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgT2JzZXJ2ZXJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IEphbVNsaWRlIH0gZnJvbSAnLi9zbGlkZSc7XG5pbXBvcnQgeyBKYW1TbGlkZUdyb3VwIH0gZnJvbSAnLi9zbGlkZS1ncm91cCc7XG5pbXBvcnQgeyBKYW1TbGlkZUhlYWRlciB9IGZyb20gJy4vc2xpZGUtaGVhZGVyJztcbmltcG9ydCB7IEphbVNsaWRlRWxlbWVudCB9IGZyb20gJy4vc2xpZGUtZWxlbWVudCc7XG5pbXBvcnQgeyBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyIH0gZnJvbSAnLi9zbGlkZS1lbGVtZW50LXdyYXBwZXInO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBPYnNlcnZlcnNNb2R1bGUsXG4gICAgQTExeU1vZHVsZVxuICBdLFxuICAvLyBEb24ndCBleHBvcnQgYWxsIGNvbXBvbmVudHMgYmVjYXVzZSBzb21lIGFyZSBvbmx5IHRvIGJlIHVzZWQgaW50ZXJuYWxseS5cbiAgZXhwb3J0czogW1xuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBKYW1TbGlkZUdyb3VwLFxuICAgIEphbVNsaWRlRWxlbWVudCxcbiAgICBKYW1TbGlkZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBKYW1TbGlkZUdyb3VwLFxuICAgIEphbVNsaWRlRWxlbWVudCxcbiAgICBKYW1TbGlkZSxcbiAgICBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyLFxuICAgIEphbVNsaWRlSGVhZGVyXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVNb2R1bGUge31cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogQW5pbWF0aW9ucyB1c2VkIGJ5IHRoZSBNYXRlcmlhbCBzbGlkZXMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBqYW1TbGlkZXNBbmltYXRpb25zOiB7XG4gIHJlYWRvbmx5IHRyYW5zbGF0ZVRhYjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgLyoqIEFuaW1hdGlvbiB0cmFuc2xhdGVzIGEgc2xpZGUgYWxvbmcgdGhlIFggYXhpcy4gKi9cbiAgdHJhbnNsYXRlVGFiOiB0cmlnZ2VyKCd0cmFuc2xhdGVUYWInLCBbXG4gICAgLy8gTm90ZTogdHJhbnNpdGlvbnMgdG8gYG5vbmVgIGluc3RlYWQgb2YgMCwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIG1pZ2h0IGJsdXIgdGhlIGNvbnRlbnQuXG4gICAgc3RhdGUoJ2NlbnRlciwgdm9pZCwgbGVmdC1vcmlnaW4tY2VudGVyLCByaWdodC1vcmlnaW4tY2VudGVyJywgc3R5bGUoe3RyYW5zZm9ybTogJ25vbmUnfSkpLFxuXG4gICAgLy8gSWYgdGhlIHNsaWRlIGlzIGVpdGhlciBvbiB0aGUgbGVmdCBvciByaWdodCwgd2UgYWRkaXRpb25hbGx5IGFkZCBhIGBtaW4taGVpZ2h0YCBvZiAxcHhcbiAgICAvLyBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBoYXMgYSBoZWlnaHQgYmVmb3JlIGl0cyBzdGF0ZSBjaGFuZ2VzLiBUaGlzIGlzXG4gICAgLy8gbmVjZXNzYXJ5IGJlY2F1c2UgQ2hyb21lIGRvZXMgc2VlbSB0byBza2lwIHRoZSB0cmFuc2l0aW9uIGluIFJUTCBtb2RlIGlmIHRoZSBlbGVtZW50IGRvZXNcbiAgICAvLyBub3QgaGF2ZSBhIHN0YXRpYyBoZWlnaHQgYW5kIGlzIG5vdCByZW5kZXJlZC4gU2VlIHJlbGF0ZWQgaXNzdWU6ICM5NDY1XG4gICAgc3RhdGUoJ2xlZnQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJywgbWluSGVpZ2h0OiAnMXB4J30pKSxcbiAgICBzdGF0ZSgncmlnaHQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknLCBtaW5IZWlnaHQ6ICcxcHgnfSkpLFxuXG4gICAgdHJhbnNpdGlvbignKiA9PiBsZWZ0LCAqID0+IHJpZ2h0LCBsZWZ0ID0+IGNlbnRlciwgcmlnaHQgPT4gY2VudGVyJyxcbiAgICAgICAgYW5pbWF0ZSgne3thbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScpKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGxlZnQtb3JpZ2luLWNlbnRlcicsIFtcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCknfSksXG4gICAgICBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJylcbiAgICBdKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHJpZ2h0LW9yaWdpbi1jZW50ZXInLCBbXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknfSksXG4gICAgICBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJylcbiAgICBdKVxuICBdKVxufTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQaW5CdXR0b24ge1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgbGFiZWw6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tcGluLW9wdGlvbi1idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY2xhc3M9XCJwaW4tYnV0dG9uLXJvdW5kXCJcbiAgICBbbmdDbGFzc109XCJqYW1Db2xvciA9PT0gJ2RlZmF1bHQnID8gJ21hdC1oaW50JyA6IG51bGxcIlxuICAgIFtjb2xvcl09XCJqYW1Db2xvclwiXG4gICAgKGNsaWNrKT1cInNlbGVjdGVkLmVtaXQoc2VsZWN0ZWRfb3B0aW9uKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtYnV0dG9uXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+YWRkX2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxzcGFuPnt7IHNlbGVjdGVkX29wdGlvbj8ubGFiZWwgfX08L3NwYW4+XG5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IGNsYXNzPVwibWF0LWJ1dHRvblwiXG4gICAgICAgICAgICBbbWF0TWVudVRyaWdnZXJGb3JdPVwiamFtUGluT3B0aW9uQnV0dG9uXCJcbiAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19kcm9wX2Rvd248L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvYnV0dG9uPlxuXG48bWF0LW1lbnUgI2phbVBpbk9wdGlvbkJ1dHRvbj1cIm1hdE1lbnVcIj5cbiAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gY2xhc3M9XCJtb3VzZW92ZXJcIiAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnM7IGxldCBpdGVtID0gaW5kZXhcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0ZWQuZW1pdChidXR0b24pXCI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7IGJ1dHRvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaW4tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwic2VsZWN0ZWRfb3B0aW9uPy5pbmRleCAhPT0gaXRlbSA/ICdtb3VzZW92ZXItY2hpbGQgbWF0LWJ1dHRvbicgOiAnbWF0LWJ1dHRvbidcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicGlubmVkT3B0aW9uKCRldmVudCwgYnV0dG9uKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gc3ZnSWNvbj1cInBpbl9yc1wiIGNvbG9yPVwiYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgY29sb3I6IHNlbGVjdGVkX29wdGlvbi5pbmRleCAhPT0gaXRlbSA/ICcjMDAwMDAwQjMnIDogbnVsbCB9XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9idXR0b24+XG48L21hdC1tZW51PlxuYCxcbiAgICBzdHlsZXM6IFtgYnV0dG9uLnBpbi1idXR0b24tcm91bmR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xMDIpIWltcG9ydGFudDtwYWRkaW5nOjA7Ym9yZGVyLXJhZGl1czo1MHB4fS5waW4tY29udGFpbmVye3dpZHRoOjQwcHh9LnBpbi1jb250YWluZXIgYnV0dG9uIG1hdC1pY29ue21hcmdpbjowfS5tb3VzZW92ZXIgKiAubW91c2VvdmVyLWNoaWxke2Rpc3BsYXk6bm9uZX0ubW91c2VvdmVyOmhvdmVyICogLm1vdXNlb3Zlci1jaGlsZHtkaXNwbGF5OmluaGVyaXR9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uczogQXJyYXk8c3RyaW5nPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3BlY2lhbEtleTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBqYW1Db2xvcjogJ3ByaW1hcnknIHwgJ2FjY2VudCcgfCAnd2FybicgfCAnZGVmYXVsdCcgPSAnZGVmYXVsdCc7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxJUGluQnV0dG9uPigpO1xuXG4gICAgcHVibGljIGluZGV4OiBudW1iZXI7XG4gICAgcHVibGljIGJ1dHRvbnM6IEFycmF5PElQaW5CdXR0b24+ID0gW107XG4gICAgcHVibGljIHNlbGVjdGVkX29wdGlvbjogSVBpbkJ1dHRvbjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtYXRJY29uUmVnaXN0cnk6IE1hdEljb25SZWdpc3RyeSxcbiAgICAgICAgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICAgICkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU1lbnUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZF9vcHRpb24gPSB0aGlzLmRlZmF1bHRTZWxlY3RlZE9wdGlvbigpO1xuXG4gICAgICAgIHRoaXMubWF0SWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb25TZXQoXG4gICAgICAgICAgICB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoJ2Fzc2V0cy9hbGxfY3VzdG9tX2ljb25zLnN2ZycpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHBpbm5lZE9wdGlvbihldmVudCwgYnV0dG9uOiBJUGluQnV0dG9uKTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRfb3B0aW9uID0ge1xuICAgICAgICAgICAgaW5kZXg6IGJ1dHRvbi5pbmRleCxcbiAgICAgICAgICAgIGxhYmVsOiBidXR0b24ubGFiZWxcbiAgICAgICAgfTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnNwZWNpYWxLZXkgKyAnX3Bpbm5lZF9jcmVhdGlvbl9vcHRpb24nLCBKU09OLnN0cmluZ2lmeShidXR0b24pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGluQnV0dG9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5zZWxlY3RlZF9vcHRpb24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9wdWxhdGVNZW51KCk6IHZvaWQge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKHsgaW5kZXg6IGNvdW50LCBsYWJlbDogb3B0aW9uIH0pO1xuICAgICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdFNlbGVjdGVkT3B0aW9uKCk6IElQaW5CdXR0b24ge1xuICAgICAgICBsZXQgbG9jYWxfc3RvcmFnZV9pdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zcGVjaWFsS2V5ICsgJ19waW5uZWRfY3JlYXRpb25fb3B0aW9uJyk7XG5cbiAgICAgICAgcmV0dXJuIGxvY2FsX3N0b3JhZ2VfaXRlbSA/IEpTT04ucGFyc2UobG9jYWxfc3RvcmFnZV9pdGVtKSA6IHRoaXMuYnV0dG9uc1swXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdqYW0tbmd4LWpzb25hcGktbWF0ZXJpYWwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbmd4LWpzb25hcGktbWF0ZXJpYWwgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5neEpzb25hcGlNYXRlcmlhbENvbXBvbmVudCB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFRhYmxlTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0VGFic01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSwgTWF0RGF0ZXBpY2tlck1vZHVsZSwgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmd4SnNvbmFwaU1hdGVyaWFsQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtanNvbmFwaS1tYXRlcmlhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFsLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0ZXJpYWxNb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtOZ3hKc29uYXBpTWF0ZXJpYWxDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtOZ3hKc29uYXBpTWF0ZXJpYWxDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5neEpzb25hcGlNYXRlcmlhbE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9waW4tb3B0aW9uLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4SnNvbmFwaU1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi4vbmd4LWpzb25hcGktbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBOZ3hKc29uYXBpTWF0ZXJpYWxNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtdLFxuICAgIGV4cG9ydHM6IFtQaW5PcHRpb25CdXR0b25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbVBpbk9wdGlvbkJ1dHRvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIENoYW5nZURldGVjdG9yUmVmLCBUcmFja0J5RnVuY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJlc291cmNlLCBEb2N1bWVudENvbGxlY3Rpb24sIFNlcnZpY2UsIElQYXJhbXNDb2xsZWN0aW9uIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHRpbWVvdXQsIGZpbHRlciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlVHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGZpbHRlck9yUmVxdWVzdCB9IGZyb20gJy4uLy4uL2xpYi9iYXRjaCc7XG5pbXBvcnQgeyBEZXN0cm95ZXIgfSBmcm9tICcuLi8uLi9saWIvZGVzdHJveWVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnamFtLWF1dG9jb21wbGV0ZScsXG4gIHN0eWxlczogW2AuY3VzdG9tLXBsYWNlaG9sZGVyOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOmluaGVyaXQ7b3BhY2l0eToxfS5jdXN0b20tcGxhY2Vob2xkZXI6Oi1tb3otcGxhY2Vob2xkZXJ7Y29sb3I6aW5oZXJpdDtvcGFjaXR5OjF9LmN1c3RvbS1wbGFjZWhvbGRlcjo6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOmluaGVyaXQ7b3BhY2l0eToxO2NvbG9yOmluaGVyaXR9LmN1c3RvbS1wbGFjZWhvbGRlcjo6cGxhY2Vob2xkZXJ7Y29sb3I6aW5oZXJpdDtvcGFjaXR5OjF9LmN1c3RvbS1wbGFjZWhvbGRlcjotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6aW5oZXJpdH1gXSxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgc3R5bGU9XCJ3aWR0aDogMTAwJVwiICpuZ0lmPVwiY29sbGVjdGlvblwiXG4gICAgYXBwZWFyYW5jZT1cIm91dGxpbmVcIiBmbG9hdExhYmVsPVwibmV2ZXJcIiBjb2xvcj1cImFjY2VudFwiXG4+XG4gICAgPGlucHV0IG1hdElucHV0IGFyaWEtbGFiZWw9XCJFc2NyaWJlIGFsZ28gcXVlIGJ1c2NhclwiIG5hbWU9XCJhdXRvY29tcGxldGUtcmVzb3VyY2VcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwidG9nZ2xlUmVzb3VyY2U/LmF0dHJpYnV0ZXNbZGlzcGxheUF0dHJpYnV0ZXNbMF1dIHx8IHBsYWNlaG9sZGVyXCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBbbmdDbGFzc109XCJ0b2dnbGVSZXNvdXJjZT8uYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlc1swXV0gPyAnY3VzdG9tLXBsYWNlaG9sZGVyJyA6IG51bGxcIlxuICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlQ3RybFwiXG4gICAgICAgIChibHVyKT1cImNsb3NlQXV0b2NvbXBsZXRlKClcIlxuICAgICAgICBpZD1cImF1dG9jb21wbGV0ZVJlc291cmNlXCJcbiAgICAgICAgI2F1dG9jb21wbGV0ZVJlc291cmNlXG4gICAgPlxuXG4gICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIlxuICAgICAgICBbZGlzcGxheVdpdGhdPVwiZGlzcGxheUZuXCJcbiAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cInNlbGVjdGVkUmVzb3VyY2UoJGV2ZW50Lm9wdGlvbi52YWx1ZSlcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNob3dMaXN0XCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwibnVsbFwiIChjbGljayk9XCJjbGVhckRpc3BsYXkoKVwiPi0tIE5pbmd1bmEgLS08L21hdC1vcHRpb24+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbbmdDbGFzc109XCJ0b2dnbGVSZXNvdXJjZT8uaWQgPT09IHJlc291cmNlLmlkID8gJ21hdC1zZWxlY3RlZCBtYXQtYWN0aXZlJyA6IG51bGxcIlxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJyZXNvdXJjZVwiXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJlc291cmNlIG9mIGZpbHRlcmVkX3Jlc291cmNlIHwgYXN5bmM7IHRyYWNrQnk6IHRyYWNrQnlGblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjRweFwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJpY29uXCI+e3sgaWNvbiB9fTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwicmVzb3VyY2UuYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlc1swXV1cIlxuICAgICAgICAgICAgICAgICAgICA+PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGF0dHJpYnV0ZSBvZiBkaXNwbGF5QXR0cmlidXRlczsgbGV0IGl0ZW0gPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwiaXRlbSA+PSAxXCI+IHwge3sgcmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVdIH19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBtYXRTdWZmaXggZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWJ1dHRvblwiIG1hdFN1ZmZpeCBtYXRUb29sdGlwPVwiTGltcGlhciBzZWxlY2Npw4PCs25cIlxuICAgICAgICAgICAgKm5nSWY9XCJ0b2dnbGVSZXNvdXJjZT8uYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlc1swXV0gfHwgYXV0b2NvbXBsZXRlQ3RybC52YWx1ZVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJEaXNwbGF5KClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWJ1dHRvblwiIG1hdFN1ZmZpeCBtYXRUb29sdGlwPVwiQWN0dWFsaXphciBsaXN0YVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IHJlZnJlc2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5yZWZyZXNoPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1zZWxlY3QtYXJyb3ctd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1zZWxlY3QtYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L21hdC1mb3JtLWZpZWxkPlxuXG48bWF0LXByb2dyZXNzLWJhciBjbGFzcz1cInByb2dyZXNzLWJhci1hdXRvY29tcGxldGVcIlxuICAgICpuZ0lmPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiXG4gICAgY29sb3I9XCJhY2NlbnRcIlxuICAgIG1vZGU9XCJpbmRldGVybWluYXRlXCJcbj48L21hdC1wcm9ncmVzcy1iYXI+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEphbUF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBwcmV2aWV3U2VsZWN0ZWRcbiAgICAgKiBAdXNhZ2VOb3RlcyBCeSBkZWZhdWx0IGl0IGlzIGBmYWxzZWAuXG4gICAgICogSW4gY2FzZSBpdCBpcyBgdHJ1ZWAsIHRoZSBhdXRvY29tcGxldGUsXG4gICAgICogc2hvd3MgaW4gdGhlIHBsYWNlaG9sZGVyIG9yIG1hdExhYmVsIGEgcHJldmlldyBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgcHJldmlld1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlUZXh0XG4gICAgICogQHVzYWdlTm90ZXMgVGV4dCBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgdG9nZ2xlUmVzb3VyY2U6IFJlc291cmNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ0VzY3JpYmUgYWxnbyBxdWUgYnVzY2FyJztcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VydmljZXM6IFNlcnZpY2U7XG4gICAgQElucHV0KCkgcHVibGljIGRpc3BsYXlBdHRyaWJ1dGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHJlbW90ZUZpbHRlciA9IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpbmNsdWRlOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHNvcnQ6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93TGlzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgQE91dHB1dCgpIHB1YmxpYyB0b2dnbGVSZXNvdXJjZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzb3VyY2U+KCk7XG4gICAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSBwdWJsaWMgYXV0b2NvbXBsZXRlUmVzb3VyY2U6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXI7XG4gICAgQFZpZXdDaGlsZCgnYXV0b2NvbXBsZXRlUmVzb3VyY2UnKSBwdWJsaWMgYXV0b2NvbXBsZXRlUmVzb3VyY2VJbnB1dDogRWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyBjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb247XG4gICAgcHVibGljIGZpbHRlcmVkX3Jlc291cmNlOiBPYnNlcnZhYmxlPEFycmF5PFJlc291cmNlPj47XG4gICAgcHVibGljIGRhdGFBcnJpdmVkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHB1YmxpYyBteUZvcm06IEZvcm1Hcm91cDtcbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRlQ3RybDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICBwdWJsaWMgcmVzb3VyY2VBcnJheTogQXJyYXk8UmVzb3VyY2U+ID0gW107XG4gICAgcHVibGljIHVzZV9pc19sb2FkaW5nID0gdHJ1ZTtcbiAgICBwdWJsaWMgdHJhY2tCeUZuOiBUcmFja0J5RnVuY3Rpb248UmVzb3VyY2U+O1xuICAgIHB1YmxpYyByZXNvdXJjZUFycmF5TGFzdEZpbHRlclZhbHVlOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbGxlY3Rpb25QZXJQYWdlID0gMTAwOyAvLyA1MDBcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc291cmNlX21heF9vbl9saXN0ID0gNTA7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7fVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSB0aGlzLnNlcnZpY2VzLm5ld0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5maWx0ZXJlZF9yZXNvdXJjZSA9IHRoaXMuYXV0b2NvbXBsZXRlQ3RybC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveWVyLnBpcGUoKSxcbiAgICAgICAgICAgIGZpbHRlck9yUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlX3RvX3NlYXJjaDogdGhpcy5kaXNwbGF5QXR0cmlidXRlc1swXSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXNBcnJheTogdGhpcy5yZXNvdXJjZUFycmF5LFxuICAgICAgICAgICAgICAgIGdldEFsbEZjOiB0aGlzLmdldEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIGxhc3RfZmlsdGVyX3ZhbHVlOiB0aGlzLnJlc291cmNlQXJyYXlMYXN0RmlsdGVyVmFsdWUsXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5jb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIHBhZ2Vfc2l6ZTogdGhpcy5jb2xsZWN0aW9uUGVyUGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VBdXRvY29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlUmVzb3VyY2Uub3B0aW9uU2VsZWN0aW9ucy5waXBlKHRpbWVvdXQoMTUwKSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgc2VsZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZVJlc291cmNlLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlUmVzb3VyY2UuY2xvc2VQYW5lbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RlZFJlc291cmNlKHJlc291cmNlOiBSZXNvdXJjZSkge1xuICAgICAgICBpZiAoIXJlc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2UgPSByZXNvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2VDaGFuZ2UuZW1pdChyZXNvdXJjZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BsYXlGbihyZXNvdXJjZT86IFJlc291cmNlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICcnOyAvLyBjbGVhciBpbnB1dCBhZnRlciBpdGVtIHNlbGVjdGlvblxuICAgIH1cblxuICAgIHB1YmxpYyByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2VzLmNsZWFyQ2FjaGVNZW1vcnkoKTtcbiAgICAgICAgdGhpcy51c2VfaXNfbG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGwoc2VhcmNoX3RleHQ6IHN0cmluZyk6IE9ic2VydmFibGU8RG9jdW1lbnRDb2xsZWN0aW9uPiB7XG4gICAgICAgIGxldCBwYXJhbXM6IElQYXJhbXNDb2xsZWN0aW9uID0ge1xuICAgICAgICAgICAgcGFnZToge1xuICAgICAgICAgICAgICAgIG51bWJlcjogMSxcbiAgICAgICAgICAgICAgICBzaXplOiB0aGlzLmNvbGxlY3Rpb25QZXJQYWdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlZmlsdGVyOiB0aGlzLnJlbW90ZUZpbHRlcixcbiAgICAgICAgICAgIGluY2x1ZGU6IHRoaXMuaW5jbHVkZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoc2VhcmNoX3RleHQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5yZW1vdGVmaWx0ZXIgPSB7IFt0aGlzLmRpc3BsYXlBdHRyaWJ1dGVzWzBdXTogc2VhcmNoX3RleHQgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmFsbChwYXJhbXMpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLmJ1aWxkZWQpLFxuICAgICAgICAgICAgdGFwKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckRpc3BsYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUN0cmwuc2V0VmFsdWUoJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlsdGVyUmVzb3VyY2VCeU5hbWUodmFsdWU6IHN0cmluZyB8IFJlc291cmNlKTogQXJyYXk8UmVzb3VyY2U+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6ICcnO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIHRoaXMuc2hvd0xpc3QgPSAhdmFsdWUgJiYgZmlsdGVyVmFsdWUubGVuZ3RoID4gMDtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUFycmF5LmZpbHRlcigocmVzb3VyY2U6IFJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY291bnQgPCB0aGlzLnJlc291cmNlX21heF9vbl9saXN0ICYmXG4gICAgICAgICAgICAgICAgKHJlc291cmNlLmF0dHJpYnV0ZXNbdGhpcy5kaXNwbGF5QXR0cmlidXRlc1swXV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5hdHRyaWJ1dGVzW3RoaXMuZGlzcGxheUF0dHJpYnV0ZXNbMF1dLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignICcgKyBmaWx0ZXJWYWx1ZSkgPiAwKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBKYW1BdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdE9wdGlvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtKYW1BdXRvY29tcGxldGVDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtKYW1BdXRvY29tcGxldGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUF1dG9jb21wbGV0ZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWluZm8tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYDxhIGNsYXNzPVwibWF0LWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgIG1hdC1pY29uLWJ1dHRvblxuICAgIFttYXRUb29sdGlwXT1cImphbVRvb2x0aXBcIlxuICAgIFtocmVmXT1cImV4dGVybmFsVXJsXCJcbiAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbj5cbiAgICA8bWF0LWljb25cbiAgICAgICAgW2lubmVySHRtbF09XCJpY29uXCJcbiAgICA+PC9tYXQtaWNvbj5cbjwvYT5cbmBcbn0pXG5leHBvcnQgY2xhc3MgSW5mb0J1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyoqIEBwYXJhbSBleHRlcm5hbFVybCByZXF1aXJlZCBwcm9wZXJ0eSAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBleHRlcm5hbFVybDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGljb24gb3B0aW9uYWwgcHJvcGVydHkgLVxuICAgICAqIEBkZXNjcmlwdGlvbiBCeSBkZWZhdWx0IGFjcXVpcmVzIGFzIGljb24gXCJpbmZvXCJcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogJ2luZm8nIHwgJ2hlbHAnID0gJ2luZm8nO1xuXG4gICAgLyoqIEBwYXJhbSBqYW1Ub29sdGlwIG9wdGlvbmFsIHByb3BlcnR5ICovXG4gICAgQElucHV0KCkgcHVibGljIGphbVRvb2x0aXA6IHN0cmluZyA9ICdNw4PCoXMgaW5mb3JtYWNpw4PCs24nO1xuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmljb24gPSB0aGlzLmNoZWNrSWNvbigpO1xuICAgIH1cblxuICAgIC8qKiBAbWV0aG9kIGNoZWNrSWNvbiBDaGVja3MgYXJyaXZpbmcgaWNvbiwgaWYgbm90IHN1cHBvcnRlZCwgdGhlbiByZXR1cm5zIGluZm8uICovXG4gICAgcHJpdmF0ZSBjaGVja0ljb24oKTogJ2luZm8nIHwgJ2hlbHAnIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBcIiR7dGhpcy5pY29ufVwiIGljb24gaXMgbm90IHN1cHBvcnRlZCDDsMKfwqTCt8OiwoDCjcOiwpnCgsOvwrjCjywgVHJ5IFwiaW5mb1wiIG9yIFwiaGVscC5cImApO1xuXG4gICAgICAgIHJldHVybiAhWydpbmZvJywgJ2hlbHAnXS5pbmNsdWRlcyh0aGlzLmljb24pID8gJ2luZm8nIDogdGhpcy5pY29uO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBJbmZvQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9pbmZvLWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0luZm9CdXR0b25Db21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtJbmZvQnV0dG9uQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1JbmZvQnV0dG9uTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEFwcGxpY2F0aW9uUmVmLCBJbmplY3RvciwgRW1iZWRkZWRWaWV3UmVmLCBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW50ZXJmYWNlIElDaGlsZENvbmZpZyB7XG4gICAgaW5wdXRzOiBvYmplY3Q7XG4gICAgb3V0cHV0czogb2JqZWN0O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjaGlsZENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPHt9PjtcbiAgICBwcml2YXRlIGNoaWxkX2RvbV9lbGVtZW50X2lkID0gJ2N1cnJlbnQtc2VsZWN0aW9uLWJhcic7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgYXBwZW5kQ29tcG9uZW50VG8ocGFyZW50SWQ6IHN0cmluZywgY2hpbGQ6IGFueSwgY2hpbGRDb25maWc/OiBJQ2hpbGRDb25maWcpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgICAgIGxldCBjaGlsZF9ub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5jaGlsZF9kb21fZWxlbWVudF9pZCk7XG4gICAgICAgIGlmIChjaGlsZF9ub2RlKSBjaGlsZF9ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2hpbGRfbm9kZSk7XG5cbiAgICAgICAgLyoqIENyZWEgdW5hIHJlZmVyZW5jaWEgZGUgY29tcG9uZW50ZSBkZXNkZSBlbCBjb21wb25lbnRlIGhpam8gKi9cbiAgICAgICAgY29uc3QgY2hpbGRDb21wb25lbnRSZWYgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjaGlsZCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgIC8qKiBDb25lY3RhIGxhIGNvbmZpZ3VyYWNpw4PCs24gYWwgaGlqbyAoZW50cmFkYXMgeSBzYWxpZGFzKSAqL1xuICAgICAgICB0aGlzLmF0dGFjaENvbmZpZyhjaGlsZENvbmZpZywgY2hpbGRDb21wb25lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYgPSBjaGlsZENvbXBvbmVudFJlZjtcbiAgICAgICAgLy8gQWdyZWdhIGVsIGNvbXBvbmVudGUgYWwgYXBwUmVmIGRlIG1vZG8gcXVlIGVzdMODwqkgZGVudHJvIGRlbCDDg8KhcmJvbCBkZSBjb21wb25lbnRlcyBcIm5nXCJcbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjaGlsZENvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICAgICAgLy8gT2J0aWVuZSBlbCBlbGVtZW50byBET00gZGVsIGNvbXBvbmVudGVcbiAgICAgICAgY29uc3QgY2hpbGREb21FbGVtID0gKGNoaWxkQ29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNoaWxkRG9tRWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5jaGlsZF9kb21fZWxlbWVudF9pZCk7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50SWQpLmFwcGVuZENoaWxkKGNoaWxkRG9tRWxlbSk7XG4gICAgICAgIGNoaWxkRG9tRWxlbS5jbGFzc05hbWUgPSAnd2lkdGgtMTAwJztcblxuICAgICAgICByZXR1cm4gY2hpbGRDb21wb25lbnRSZWY7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUNvbXBvbmVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNoaWxkQ29tcG9uZW50UmVmKSByZXR1cm47XG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jaGlsZENvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoQ29uZmlnKGNvbmZpZywgY29tcG9uZW50UmVmKSB7XG4gICAgICAgIGxldCBpbnB1dHMgPSBjb25maWcuaW5wdXRzO1xuICAgICAgICBsZXQgb3V0cHV0cyA9IGNvbmZpZy5vdXRwdXRzO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gaW5wdXRzKSB7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2Vba2V5XSA9IGlucHV0c1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvdXRwdXRzKSB7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2Vba2V5XSA9IG91dHB1dHNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi9kb20uc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1ldGhvZFJlZiB7XG4gICAgbWV0aG9kOiBzdHJpbmc7XG4gICAgcGFyYW1zPzogYW55O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uQmFyU2VydmljZSB7XG4gICAgcHVibGljIHNlbGVjdGVkJDogQmVoYXZpb3JTdWJqZWN0PFNlbGVjdGlvbk1vZGVsPGFueT4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChuZXcgU2VsZWN0aW9uTW9kZWwoKSk7XG4gICAgcHVibGljIGNhbGxNZXRob2QkOiBCZWhhdmlvclN1YmplY3Q8SU1ldGhvZFJlZj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHsgbWV0aG9kOiAnJyB9KTtcbiAgICBwcml2YXRlIHNlbGVjdGlvbkJhckVsZW1lbnRJZCA9ICdzZWxlY3Rpb24tYmFyLWNvbnRhaW5lcic7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBkb21TZXJ2aWNlOiBEb21TZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIHNlbGVjdGVkPFQ+KHNlbGVjdGVkOiBTZWxlY3Rpb25Nb2RlbDxUPik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsbE1ldGhvZChtZXRob2RSZWY6IElNZXRob2RSZWYpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYWxsTWV0aG9kJC5uZXh0KG1ldGhvZFJlZik7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyTWV0aG9kKCkge1xuICAgICAgICB0aGlzLmNhbGxNZXRob2QoeyBtZXRob2Q6ICcnIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGNvbXBvbmVudDogYW55LCBpbnB1dHM6IG9iamVjdCwgb3V0cHV0czogb2JqZWN0KTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgICAgICBsZXQgY29tcG9uZW50Q29uZmlnID0ge1xuICAgICAgICAgICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgICAgICAgICBvdXRwdXRzOiBvdXRwdXRzXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudElkKS5jbGFzc05hbWUgPT09ICdzaG93Jykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gdHMtbGludCA9PiBWYWx1ZS1yZXR1cm5pbmcgZnVuY3Rpb24gc2hvdWxkIHVzZSBgcmV0dXJuIHVuZGVmaW5lZDtgLCBub3QganVzdCBgcmV0dXJuO2BcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjcmVhdGVkX2NvbXBvbmVudF9pbnN0YW5jZSA9IHRoaXMuZG9tU2VydmljZS5hcHBlbmRDb21wb25lbnRUbyh0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnRJZCwgY29tcG9uZW50LCBjb21wb25lbnRDb25maWcpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnRJZCkuY2xhc3NOYW1lID0gJ3Nob3cnO1xuXG4gICAgICAgIHJldHVybiBjcmVhdGVkX2NvbXBvbmVudF9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnJlbW92ZUNvbXBvbmVudCgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnRJZCkuY2xhc3NOYW1lID0gJ2hpZGRlbic7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvblN0YXJ0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFNlbGVjdGlvbkJhclNlcnZpY2UgfSBmcm9tICcuLi9zZWxlY3Rpb24tYmFyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zZWxlY3Rpb24tYmFyLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGlkPVwic2VsZWN0aW9uLWJhci1jb250YWluZXJcIiBjbGFzcz1cImhpZGRlblwiPjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgL2RlZXAvIC5oaWRkZW57ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdCAvZGVlcC8gLnNob3d7ZGlzcGxheTotd2Via2l0LWJveCFpbXBvcnRhbnQ7ZGlzcGxheTpmbGV4IWltcG9ydGFudH0jc2VsZWN0aW9uLWJhci1jb250YWluZXJ7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDM7dG9wOjA7bGVmdDowO3JpZ2h0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6NjRweDtvcGFjaXR5OjE7YmFja2dyb3VuZDojZmZmfTpob3N0IC9kZWVwLyAjc2VsZWN0aW9uLWJhci1jb250YWluZXIgI2N1cnJlbnQtc2VsZWN0aW9uLWJhcjpmaXJzdC1jaGlsZHtwYWRkaW5nOjAgMjBweDt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkJhckNvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgc2VsZWN0aW9uQmFyU2VydmljZTogU2VsZWN0aW9uQmFyU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXG4gICAgKSB7XG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25CYXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgRGVzdHJveWVyIH0gZnJvbSAnLi4vLi4vZGVzdHJveWVyJztcbmltcG9ydCB7IFNlbGVjdGlvbkJhclNlcnZpY2UgfSBmcm9tICcuLi9zZWxlY3Rpb24tYmFyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zZWxlY3Rpb24tYmFyLWluZm8nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0VG9vbHRpcD1cIkJvcnJhciBzZWxlY2Npw4PCs25cIiAoY2xpY2spPVwiY2xvc2UoKVwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxzcGFuPnt7IGxhYmVsIH19PC9zcGFuPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkJhckluZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT47XG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkZXN0cm95ZXIgPSBuZXcgRGVzdHJveWVyKCk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzZWxlY3Rpb25CYXJTZXJ2aWNlOiBTZWxlY3Rpb25CYXJTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQmFyU2VydmljZS5zZWxlY3RlZCRcbiAgICAgICAgICAgIC5waXBlKHRoaXMuZGVzdHJveWVyLnBpcGUoKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoc2VsZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsID0gc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCArIChzZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoID49IDEgPyAnIHNlbGVjY2lvbmFkb3MnIDogJyBzZWxlY2Npb25hZG8nKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCA8PSAwKSB0aGlzLnNlbGVjdGlvbkJhclNlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkJhclNlcnZpY2UuZGVzdHJveSgpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC10ZXh0LnBpcGUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTZWxlY3Rpb25CYXJTZXJ2aWNlIH0gZnJvbSAnLi9zZWxlY3Rpb24tYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRG9tU2VydmljZSB9IGZyb20gJy4vZG9tLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uQmFyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Rpb24tYmFyLWNvbnRhaW5lci9zZWxlY3Rpb24tYmFyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0aW9uQmFySW5mb0NvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0aW9uLWJhci1pbmZvL3NlbGVjdGlvbi1iYXItaW5mby5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbRmlsdGVyUGlwZSwgU2VsZWN0aW9uQmFyU2VydmljZSwgRG9tU2VydmljZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2VsZWN0aW9uQmFyQ29udGFpbmVyQ29tcG9uZW50LCBTZWxlY3Rpb25CYXJJbmZvQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbIFNlbGVjdGlvbkJhckNvbnRhaW5lckNvbXBvbmVudCwgU2VsZWN0aW9uQmFySW5mb0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2VsZWN0aW9uQmFyTW9kdWxlIHt9XG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIG5neC1qc29uYXBpLW1hdGVyaWFsXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9saWIvY3VzdG9tLXZhbGlkYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvdHJhY2stYnktaWQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvYmF0Y2gnO1xuZXhwb3J0ICpmcm9tICcuL2xpYi9kZXN0cm95ZXInO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZWxlY3Qvb3B0aW9uLWZvb3Rlci5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VsZWN0L3NlbGVjdC5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zdWJtaXQvc3VibWl0LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zdWJtaXQvc3VibWl0Lm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zsb2F0aW5nLWZpbHRlcnMvZmxvYXRpbmctZmlsdGVycy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZmxvYXRpbmctZmlsdGVycy9hdm9pZC1kaXNhYmxlZC1zdHlsZS5kaXJlY3RpdmUnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZmxvYXRpbmctZmlsdGVycy9mbG9hdGluZy1maWx0ZXJzLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3BpY3R1cmUtbWFuYWdlci9waWN0dXJlL3BpY3R1cmUtbWFuYWdlci5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvcGljdHVyZS1tYW5hZ2VyL2dhbGxlcnkvZ2FsbGVyeS1tYW5hZ2VyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9waWN0dXJlLW1hbmFnZXIvcGljdHVyZS9pbWFnZS1jaGFuZ2UtaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3BpY3R1cmUtbWFuYWdlci9waWN0dXJlLW1hbmFnZXIubW9kdWxlJztcblxuLy8gZXhwb3J0ICogZnJvbSAnLi9saWIvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnMuY29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vbGliL2JyZWFkY3J1bWJzL2JyZWFkY3J1bWJzLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtdGV4dC5waXBlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvY2hpcHMtYXV0b2NvbXBsZXRlL2NoaXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY2hpcHMtYXV0b2NvbXBsZXRlL2NoaXBzLWF1dG9jb21wbGV0ZS5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWxldGUtY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi1kaWFsb2cvY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVsZXRlLWNvbmZpcm1hdGlvbi9kZWxldGUtY29uZmlybWF0aW9uLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24ubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2VkaXQtdGV4dC1hdHRyaWJ1dGUtZGlhbG9nL2VkaXQtdGV4dC1hdHRyaWJ1dGUtZGlhbG9nLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3RvcC13YXJuaW5nL3RvcC13YXJuaW5nLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi90b3Atd2FybmluZy90b3Atd2FybmluZy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3RvcC13YXJuaW5nL3NpbmdsZS13YXJuaW5nL3NpbmdsZS13YXJuaW5nLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi90b3Atd2FybmluZy90b3Atd2FybmluZy5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9lcnJvci1oYW5kbGVyL2Vycm9yLWhhbmRsZXIuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9lcnJvci1oYW5kbGVyL2Vycm9yLWhhbmRsZXIubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvcmFuZ2UtZGF0ZXBpY2tlci9yYW5nZS1kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9yYW5nZS1kYXRlcGlja2VyL3JhbmdlLWRhdGVwaWNrZXIubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZmFiLXNwZWVkLWRpYWwvZmFiLXNwZWVkLWRpYWwuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZhYi1zcGVlZC1kaWFsL2ZhYi1zcGVlZC1kaWFsLW1pbmktYnV0dG9uJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZhYi1zcGVlZC1kaWFsL2ZhYi1zcGVlZC1kaWFsLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3JlZnJlc2gvcmVmcmVzaC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvcmVmcmVzaC9yZWZyZXNoLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL21lbnUvbWVudS1lbGVtZW50cy9tZW51JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lbnUvbWVudS1lbGVtZW50cy9zZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lbnUvbWVudS1lbGVtZW50cy9idXR0b24nO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbWVudS9kcm9wZG93bi1tZW51L2Ryb3Bkb3duLW1lbnUuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lbnUvbWVudS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbWVudS9tZW51Lm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zsb2F0aW5nLWJ1dHRvbi9mbG9hdGluZy1idXR0b24uY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zsb2F0aW5nLWJ1dHRvbi9mbG9hdGluZy1idXR0b24ubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZHluYW1pYy1mb3Jtcy9keW5hbWljLWlucHV0cyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9keW5hbWljLWZvcm1zL2Zvcm1seS1mb3JtLWZsZXguY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2R5bmFtaWMtZm9ybXMvZHluYW1pYy1mb3Jtcy5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi90YWJzL3RhYnMuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3RhYnMvdGFicy5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHBhbnNpb24tcGFuZWwvcmVtZW1iZXItc3RhdGUuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2V4cGFuc2lvbi1wYW5lbC9yZW1lbWJlci1zdGF0ZS5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9mbG9hdGluZy1pbnB1dC9mbG9hdGluZy1pbnB1dC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZmxvYXRpbmctaW5wdXQvZmxvYXRpbmctaW5wdXQubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZmlsdGVycy9pbnRlcmZhY2VzL2ZpbHRlci1kYXRlLXJhbmdlLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9maWx0ZXJzL2ludGVyZmFjZXMvZmlsdGVyLWNoZWNrcy5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZmlsdGVycy9pbnRlcmZhY2VzL2ZpbHRlci1vcHRpb24uaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZpbHRlcnMvaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZpbHRlcnMvYmFzaWNzL2ZpbHRlci1vcHRpb25zLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9maWx0ZXJzL2Jhc2ljcy9maWx0ZXItY2hlY2tzLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvc2xpZGUvc2xpZGUtbW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NsaWRlL3NsaWRlLWdyb3VwJztcbmV4cG9ydCB7IEphbVNsaWRlSGVhZGVyLCBTY3JvbGxEaXJlY3Rpb24gfSBmcm9tICcuL2xpYi9zbGlkZS9zbGlkZS1oZWFkZXInO1xuZXhwb3J0IHsgSmFtU2xpZGVFbGVtZW50V3JhcHBlciB9IGZyb20gJy4vbGliL3NsaWRlL3NsaWRlLWVsZW1lbnQtd3JhcHBlcic7XG5leHBvcnQgeyBKYW1TbGlkZSB9IGZyb20gJy4vbGliL3NsaWRlL3NsaWRlJztcbmV4cG9ydCB7IEphbVNsaWRlRWxlbWVudCB9IGZyb20gJy4vbGliL3NsaWRlL3NsaWRlLWVsZW1lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2xpZGUvc2xpZGUtYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3Bpbi1vcHRpb24tYnV0dG9uL3Bpbi1vcHRpb24tYnV0dG9uLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9waW4tb3B0aW9uLWJ1dHRvbi9waW4tb3B0aW9uLWJ1dHRvbi5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5cbmV4cG9ydCB7IEluZm9CdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2xpYi9pbmZvLWJ1dHRvbi9pbmZvLWJ1dHRvbi5jb21wb25lbnQnO1xuZXhwb3J0IHsgSmFtSW5mb0J1dHRvbk1vZHVsZSB9IGZyb20gJy4vbGliL2luZm8tYnV0dG9uL2luZm8tYnV0dG9uLm1vZHVsZSc7XG5cbmV4cG9ydCB7IFNlbGVjdGlvbkJhckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbGliL3NlbGVjdGlvbi1iYXIvc2VsZWN0aW9uLWJhci1jb250YWluZXIvc2VsZWN0aW9uLWJhci1jb250YWluZXIuY29tcG9uZW50JztcbmV4cG9ydCB7IFNlbGVjdGlvbkJhckluZm9Db21wb25lbnQgfSBmcm9tICcuL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXItaW5mby9zZWxlY3Rpb24tYmFyLWluZm8uY29tcG9uZW50JztcbmV4cG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL2xpYi9zZWxlY3Rpb24tYmFyL2RvbS5zZXJ2aWNlJztcbmV4cG9ydCB7IElNZXRob2RSZWYsIFNlbGVjdGlvbkJhclNlcnZpY2UgfSBmcm9tICcuL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXIuc2VydmljZSc7XG5leHBvcnQgeyBKYW1TZWxlY3Rpb25CYXJNb2R1bGUgfSBmcm9tICcuL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXIubW9kdWxlJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWMtYXBpJztcblxuZXhwb3J0IHtEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCBhcyDDicK1aH0gZnJvbSAnLi9saWIvbG9nZ2VkLXN0YXRlL2RpYWxvZy1sb2dnZWQtc3RhdGUuY29tcG9uZW50JztcbmV4cG9ydCB7TWF0ZXJpYWxNb2R1bGUgYXMgw4nCtW19IGZyb20gJy4vbGliL21hdGVyaWFsLm1vZHVsZSc7XG5leHBvcnQge0JvdHRvbVNoZWV0Q29tcG9uZW50IGFzIMOJwrVrfSBmcm9tICcuL2xpYi9tZW51L2JvdHRvbS1zaGVldC9ib3R0b20tc2hlZXQuY29tcG9uZW50JztcbmV4cG9ydCB7TWVudUVsZW1lbnQgYXMgw4nCtWksTWVudUVsZW1lbnRzQ29sbGVjdGlvbiBhcyDDicK1an0gZnJvbSAnLi9saWIvbWVudS9tZW51LWVsZW1lbnRzL21lbnUtZWxlbWVudHMnO1xuZXhwb3J0IHtOZ3hKc29uYXBpTWF0ZXJpYWxDb21wb25lbnQgYXMgw4nCtW59IGZyb20gJy4vbGliL25neC1qc29uYXBpLW1hdGVyaWFsLmNvbXBvbmVudCc7XG5leHBvcnQge05neEpzb25hcGlNYXRlcmlhbE1vZHVsZSBhcyDDicK1bH0gZnJvbSAnLi9saWIvbmd4LWpzb25hcGktbWF0ZXJpYWwubW9kdWxlJztcbmV4cG9ydCB7VXBsb2FkQ29tcG9uZW50IGFzIMOJwrVnfSBmcm9tICcuL2xpYi9waWN0dXJlLW1hbmFnZXIvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQnO1xuZXhwb3J0IHtKYW1TbGlkZUJhc2UgYXMgw4nCtWUsX0phbVNsaWRlTWl4aW5CYXNlIGFzIMOJwrVmfSBmcm9tICcuL2xpYi9zbGlkZS9zbGlkZSc7XG5leHBvcnQge0phbVNsaWRlRWxlbWVudFdyYXBwZXJCYXNlIGFzIMOJwrVjLF9KYW1TbGlkZUVsZW1lbnRXcmFwcGVyTWl4aW5CYXNlIGFzIMOJwrVkfSBmcm9tICcuL2xpYi9zbGlkZS9zbGlkZS1lbGVtZW50LXdyYXBwZXInO1xuZXhwb3J0IHtKYW1TbGlkZUhlYWRlckJhc2UgYXMgw4nCtWEsX0phbVNsaWRlSGVhZGVyTWl4aW5CYXNlIGFzIMOJwrVifSBmcm9tICcuL2xpYi9zbGlkZS9zbGlkZS1oZWFkZXInOyJdLCJuYW1lcyI6WyJzdGF0ZSIsIk1hdFRvb2x0aXBNb2R1bGUiLCJNYXREaWFsb2dNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRGb3JtRmllbGRNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJvYnNlcnZhYmxlT2YiLCJNYXRUYWJzTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFFYSxnQkFBZ0I7SUFDbEIsZ0JBQWdCLENBQUMsS0FBYSxFQUFFLEtBQXVCO1FBQzFELE9BQU8sQ0FBQyxPQUF3QjtZQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFFaEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFeEMsT0FBTyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUMvQixDQUFDO0tBQ0w7Ozs7Ozs7Ozs7Ozs7SUFjTSxzQkFBc0IsQ0FBQyxPQUF3QjtRQUNsRCxNQUFNLFFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2RCxNQUFNLGdCQUFnQixHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7O1FBR3ZFLElBQUksUUFBUSxLQUFLLGdCQUFnQixFQUFFOztZQUUvQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN6RTtLQUNKO0NBQ0o7O1NDakNlLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBa0I7SUFDL0MsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDO0NBQ3RCOztBQ0pEO0FBRUEsU0FPZ0IsUUFBUSxDQUEyQyxPQUFVLEVBQUUsTUFBeUI7SUFDcEcsT0FBMEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVU7UUFDbkYsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1B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