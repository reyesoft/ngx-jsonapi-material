(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('rxjs'), require('@angular/core'), require('@angular/router'), require('@angular/forms'), require('@angular/common'), require('@angular/material'), require('@angular/flex-layout'), require('@angular/common/http'), require('ngx-uploader'), require('@angular/material/dialog'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/button'), require('@angular/material/tooltip'), require('@angular/material/form-field'), require('angular2-toaster'), require('saturn-datepicker'), require('@ecodev/fab-speed-dial'), require('@ngx-formly/core'), require('@ngx-formly/material'), require('@angular/material/tabs'), require('@angular/cdk/portal'), require('@angular/material/core'), require('@angular/cdk/coercion'), require('@angular/cdk/bidi'), require('@angular/cdk/scrolling'), require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/cdk/observers'), require('@angular/animations'), require('@angular/platform-browser'), require('@angular/cdk/collections')) :
    typeof define === 'function' && define.amd ? define('ngx-jsonapi-material', ['exports', 'rxjs/operators', 'rxjs', '@angular/core', '@angular/router', '@angular/forms', '@angular/common', '@angular/material', '@angular/flex-layout', '@angular/common/http', 'ngx-uploader', '@angular/material/dialog', '@angular/material/icon', '@angular/material/input', '@angular/material/button', '@angular/material/tooltip', '@angular/material/form-field', 'angular2-toaster', 'saturn-datepicker', '@ecodev/fab-speed-dial', '@ngx-formly/core', '@ngx-formly/material', '@angular/material/tabs', '@angular/cdk/portal', '@angular/material/core', '@angular/cdk/coercion', '@angular/cdk/bidi', '@angular/cdk/scrolling', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/cdk/observers', '@angular/animations', '@angular/platform-browser', '@angular/cdk/collections'], factory) :
    (factory((global['ngx-jsonapi-material'] = {}),global.rxjs.operators,global.rxjs,global.ng.core,global.ng.router,global.ng.forms,global.ng.common,global.ng.material,global.ng['flex-layout'],global.ng.common.http,null,global.ng.material.dialog,global.ng.material.icon,global.ng.material.input,global.ng.material.button,global.ng.material.tooltip,global.ng.material['form-field'],null,null,null,null,null,global.ng.material.tabs,global.ng.cdk.portal,global.ng.material.core,global.ng.cdk.coercion,global.ng.cdk.bidi,global.ng.cdk.scrolling,global.ng.cdk.a11y,global.ng.cdk.platform,global.ng.cdk.observers,global.ng.animations,global.ng.platformBrowser,global.ng.cdk.collections));
}(this, (function (exports,operators,rxjs,core,router,forms,common,material,flexLayout,http,ngxUploader,dialog,icon,input,button,tooltip,formField,angular2Toaster,saturnDatepicker,fabSpeedDial,core$1,material$1,tabs,portal,core$2,coercion,bidi,scrolling,a11y,platform,observers,animations,platformBrowser,collections) { 'use strict';

    var CustomValidators = /** @class */ (function () {
        function CustomValidators() {
        }
        CustomValidators.prototype.patternValidator = function (regex, error) {
            return function (control) {
                if (!control.value)
                    return null; // if control is empty return no error
                var VALID = regex.test(control.value); // test the value of the control against the regexp supplied
                return VALID ? null : error; // if true, return no error (no error), else return error passed in the second parameter
            };
        };
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
        CustomValidators.prototype.passwordMatchValidator = function (control) {
            var PASSWORD = control.get('password').value; // get password from our password form control
            var CONFIRM_PASSWORD = control.get('confirm_password').value; // get password from our confirmPassword form control
            // compare is the password math
            if (PASSWORD !== CONFIRM_PASSWORD) {
                // if they don't match, set an error in our confirmPassword form control
                control.get('confirm_password').setErrors({ NoPassswordMatch: true });
            }
        };
        return CustomValidators;
    }());

    function trackById(index, resource) {
        return resource.id;
    }

    // tslint:disable: rxjs-no-wholesale rxjs-deep-operators
    function batchAll(service, params) {
        return service.all(params).pipe(operators.concatMap(function (collection) {
            if (collection.data.length < params.page.size) {
                return rxjs.of(collection);
            }
            params.page.number += 1;
            return batchAll(service, params).pipe(operators.startWith(collection));
        }));
    }
    var filterOrRequest = function (params) {
        return rxjs.pipe(operators.startWith(''), operators.debounceTime(400), operators.filter(function (filterValue) { return typeof filterValue === 'string'; }), operators.switchMap(function (filterValue) {
            if (filterValue.includes(params.last_filter_value) && params.collection.data.length < params.page_size) {
                return rxjs.of(params.resourcesArray.filter(function (resource) {
                    return resource.attributes[params.attribute_to_search].toLowerCase().indexOf(filterValue) >= 0;
                }));
            }
            return params
                .getAllFc(filterValue)
                .pipe(operators.catchError(function () { return []; })).pipe(operators.map(function (collection) {
                params.collection = collection;
                params.resourcesArray = collection.data;
                params.last_filter_value = filterValue;
                return params.resourcesArray;
            }));
        }));
    };

    var Destroyer = /** @class */ (function () {
        function Destroyer() {
            this.takeuntil = new rxjs.Subject();
        }
        Destroyer.prototype.pipe = function () {
            return rxjs.pipe(operators.takeUntil(this.takeuntil));
        };
        Destroyer.prototype.destroy = function () {
            this.takeuntil.next();
            this.takeuntil.complete();
        };
        return Destroyer;
    }());

    var SelectComponent = /** @class */ (function () {
        function SelectComponent() {
            this.appareance = 'outline';
            this.floatLabel = 'always';
            this.hasRefresh = false;
            this.toRelateChange = new core.EventEmitter();
            this.refresh = new core.EventEmitter();
            this.adaptiveArray = [];
            this.clear_relationships = null;
            this.searchText = '';
        }
        SelectComponent.prototype.ngOnInit = function () {
            if (this.limit) {
                this.adaptiveArray = this.collection.data.slice(0, Number(this.limit));
            }
            else {
                this.adaptiveArray = this.collection.data;
            }
            if (this.toRelate) {
                this.toRelate = this.collection.find(this.toRelate.id);
            }
        };
        SelectComponent.prototype.updateFilter = function (search_text) {
            this.searchText = search_text;
        };
        SelectComponent.prototype.updateRelationships = function (resource) {
            this.toRelateChange.emit(resource);
        };
        SelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-select',
                        styles: [".mat-option-footer,.mat-option-header{position:-webkit-sticky;position:sticky;background:inherit;z-index:999!important;width:100%}.mat-option-header{padding-left:0;padding-right:0;top:0}.mat-option-footer{bottom:0}.mat-icon{margin:0!important}mat-form-field{width:100%}"],
                        template: "<mat-form-field\n    [floatLabel]=\"floatLabel\"\n    [appearance]=\"appareance\"\n>\n    <mat-label>\n        {{ label || 'Seleccione una opci\u00F3n' }}\n        <i *ngIf=\"!toRelate\">(Ninguna)</i>\n    </mat-label>\n    <mat-select\n        [ngModel]=\"toRelate\"\n        (ngModelChange)=\"updateRelationships($event)\"\n        [disabled]=\"disabled || false\"\n        [placeholder]=\"placeholder || 'Seleccione una opci\u00F3n'\"\n        [multiple]=\"multiple || false\"\n        >\n\n        <div class=\"mat-option-header\" *ngIf=\"adaptiveArray.length >= 10\">\n            <jam-search-input\n                [text]=\"searchText\"\n                [opened]=\"true\"\n                (textChange)=\"updateFilter($event)\"\n            ></jam-search-input>\n        </div>\n\n        <mat-divider></mat-divider>\n\n        <mat-option *ngIf=\"removeRelationships\" [value]=\"clear_relationships\">-- Ninguna --</mat-option>\n\n        <ng-container *ngFor=\"let resource of adaptiveArray | filter: searchText\">\n            <mat-option [value]=\"resource\" *ngIf=\"parentId && resource.id !== parentId\">\n                {{ resource.attributes[displayAttribute] }}\n            </mat-option>\n            <mat-option [value]=\"resource\" *ngIf=\"!parentId\">\n                {{ resource.attributes[displayAttribute] }}\n            </mat-option>\n        </ng-container>\n\n        <div class=\"mat-option-footer\">\n            <ng-content></ng-content>\n        </div>\n    </mat-select>\n\n    <button matSuffix mat-icon-button class=\"mat-button\" *ngIf=\"hasRefresh\"\n        (click)=\"refresh.emit()\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n            <mat-icon class=\"mat-hint\">refresh</mat-icon>\n        </div>\n    </button>\n</mat-form-field>\n"
                    },] },
        ];
        SelectComponent.propDecorators = {
            appareance: [{ type: core.Input }],
            floatLabel: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            parentId: [{ type: core.Input }],
            toRelate: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            label: [{ type: core.Input }],
            displayAttribute: [{ type: core.Input }],
            collection: [{ type: core.Input }],
            removeRelationships: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            limit: [{ type: core.Input }],
            hasRefresh: [{ type: core.Input }],
            toRelateChange: [{ type: core.Output }],
            refresh: [{ type: core.Output }]
        };
        return SelectComponent;
    }());

    var JamOptionFooterComponent = /** @class */ (function () {
        function JamOptionFooterComponent(activatedRoute, router$$1) {
            this.activatedRoute = activatedRoute;
            this.router = router$$1;
            this.openNewTab = false;
        }
        JamOptionFooterComponent.prototype.goTo = function (target) {
            if (target === void 0) {
                target = '_self';
            }
            if (this.routerLink) {
                this.router.navigate(this.routerLink, {
                    relativeTo: this.activatedRoute,
                    queryParams: this.queryParams
                });
            }
            else if (this.url) {
                window.open(this.url, target);
            }
        };
        JamOptionFooterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-option-footer',
                        styles: [".mouseover * .mouseover-child{display:none}.mouseover:hover * .mouseover-child{display:inherit}"],
                        template: "<mat-option class=\"mat-elevation-z1 mouseover\"\n    (click)=\"goTo()\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n        <div>\n            <mat-icon class=\"mat-hint\">add_circle</mat-icon>\n            <span>{{ labelOption || 'Add'}}</span>\n        </div>\n        <div *ngIf=\"openNewTab && !routerLink\">\n            <a mat-icon-button class=\"mat-button mouseover-child\" target=\"_blank\"\n                (click)=\"$event.stopPropagation(); goTo('_blank')\">\n                <mat-icon class=\"mat-hint\" [style.margin]=\"'0'\">open_in_new</mat-icon>\n            </a>\n        </div>\n    </div>\n</mat-option>\n"
                    },] },
        ];
        /** @nocollapse */
        JamOptionFooterComponent.ctorParameters = function () {
            return [
                { type: router.ActivatedRoute },
                { type: router.Router }
            ];
        };
        JamOptionFooterComponent.propDecorators = {
            url: [{ type: core.Input }],
            labelOption: [{ type: core.Input }],
            routerLink: [{ type: core.Input }],
            queryParams: [{ type: core.Input }],
            openNewTab: [{ type: core.Input }]
        };
        return JamOptionFooterComponent;
    }());

    var FilterPipe = /** @class */ (function () {
        function FilterPipe() {
        }
        /**
         *
         * @param items List of items to filter
         * @param term  a string term to compare with every property of the list
         *
         */
        FilterPipe.filter = function (items, term) {
            var toCompare = term.toLowerCase();
            return items.filter(function (item) {
                for (var property in item) {
                    if (property !== 'attributes') {
                        continue;
                    }
                    for (var sub_property in item[property]) {
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
        };
        /**
         * @param items object or resource from array
         * @param searchText search term
         */
        FilterPipe.prototype.transform = function (items, searchText) {
            if (!searchText || !items)
                return items;
            return FilterPipe.filter(items, searchText);
        };
        FilterPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'filter'
                    },] },
        ];
        return FilterPipe;
    }());

    /***
     * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var SearchInputComponent = /** @class */ (function () {
        function SearchInputComponent() {
            this.opened = false;
            this.textChange = new core.EventEmitter();
            this.searchCtrl = new forms.FormControl();
            this.showSearch = false;
            this.destroyer = new Destroyer();
        }
        SearchInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.showSearch = this.opened || this.showSearch;
            this.searchCtrl.valueChanges
                .pipe(this.destroyer.pipe(), operators.map(function (x) { return x; }), operators.debounceTime(400)).subscribe(function (newValue) { return _this.textChange.emit(newValue); });
        };
        SearchInputComponent.prototype.ngOnDestroy = function () {
            this.destroyer.destroy();
        };
        SearchInputComponent.prototype.showInput = function () {
            var _this = this;
            if (this.opened) {
                this.showSearch = this.opened;
            }
            else {
                this.showSearch = !this.showSearch;
                setTimeout(function () {
                    if (_this.showSearch)
                        document.getElementById('search-input').focus();
                }, 0);
            }
        };
        SearchInputComponent.prototype.switch = function () {
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
        };
        SearchInputComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-search-input',
                        styles: ["div.opened{background-color:rgba(0,0,0,.12)}.jam-input{border:0;background:0 0;height:48px;padding:16px;outline:0!important}.mat-icon{margin:0!important}@media only screen and (max-width:600px){div.opened{position:absolute;top:0;left:0;right:0;z-index:333;background:#fff;height:48px;max-height:48px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}div.opened:active,div.opened:focus,div.opened:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}}"],
                        template: "<div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n    <button mat-icon-button class=\"mat-button\" matTooltip=\"Buscar\"\n        *ngIf=\"!showSearch\"\n        (click)=\"showInput()\">\n        <mat-icon class=\"mat-hint\">search</mat-icon>\n    </button>\n    <div class=\"reset-input-default\" fxFlex=\"100\" [style.padding-left]=\"'16px'\"\n        *ngIf=\"showSearch\"\n        [ngClass]=\"showSearch ? 'opened' : ''\"\n        fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16\">\n        <mat-icon class=\"mat-hint\">search</mat-icon>\n        <input class=\"jam-input\" fxFlex id=\"search-input\" autocomplete=\"off\"\n            [formControl]=\"searchCtrl\" placeholder=\"Buscar...\">\n\n        <button mat-icon-button class=\"mat-button\" (click)=\"switch()\">\n            <mat-icon class=\"mat-hint\">clear</mat-icon>\n        </button>\n    </div>\n</div>\n"
                    },] },
        ];
        SearchInputComponent.propDecorators = {
            text: [{ type: core.Input }],
            opened: [{ type: core.Input }],
            textChange: [{ type: core.Output }]
        };
        return SearchInputComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamSearchInputModule = /** @class */ (function () {
        function JamSearchInputModule() {
        }
        JamSearchInputModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            flexLayout.FlexLayoutModule,
                            forms.ReactiveFormsModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            common.CommonModule
                        ],
                        declarations: [SearchInputComponent, FilterPipe],
                        exports: [SearchInputComponent, FilterPipe]
                    },] },
        ];
        return JamSearchInputModule;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamSelectModule = /** @class */ (function () {
        function JamSelectModule() {
        }
        JamSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            router.RouterModule,
                            JamSearchInputModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            flexLayout.FlexLayoutModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            material.MatDividerModule,
                            material.MatFormFieldModule,
                            material.MatSelectModule,
                            common.CommonModule
                        ],
                        providers: [FilterPipe],
                        declarations: [SelectComponent, JamOptionFooterComponent],
                        exports: [SelectComponent, JamOptionFooterComponent]
                    },] },
        ];
        return JamSelectModule;
    }());

    /***
     * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var SubmitComponent = /** @class */ (function () {
        function SubmitComponent(location, router$$1, activatedRoute) {
            this.location = location;
            this.router = router$$1;
            this.activatedRoute = activatedRoute;
            this.submitAppearance = 'mat-flat-button';
            this.submitColor = 'primary';
            this.goBack = false;
            this.loading = false;
            this.accept = new core.EventEmitter();
            this.cancel = new core.EventEmitter();
        }
        SubmitComponent.prototype.changeState = function (event) {
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
        };
        SubmitComponent.prototype.submit = function () {
            this.accept.emit();
        };
        SubmitComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-submit',
                        styles: ["div,div button[type=submit]{width:inherit}div button[type=submit]{min-height:36px}"],
                        template: "<div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n    <button type=\"button\" mat-button color=\"accent\" *ngIf=\"!noCancel\" (click)=\"changeState($event)\" class=\"accent pull-right\" rs-esc-key>Cancelar</button>\n    <button mat-button  type=\"submit\" aria-label=\"Guardar\" class=\"pull-right\"\n        [color]=\"submitColor\"\n        [ngClass]=\"submitAppearance\"\n        [disabled]=\"loading || disabled\"\n        (click)=\"submit()\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n            <span *ngIf=\"!loading\" class=\"elements-up\">{{ (submitLabel ? submitLabel : 'Guardar') | uppercase }}</span>\n            <mat-progress-spinner class=\"elements-up default\"\n                *ngIf=\"loading\"\n                mode=\"indeterminate\"\n                value=\"value\"\n                diameter=\"20\"\n                aria-label=\"Cargando Espere\">\n            </mat-progress-spinner>\n        </div>\n    </button>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        SubmitComponent.ctorParameters = function () {
            return [
                { type: common.Location },
                { type: router.Router },
                { type: router.ActivatedRoute }
            ];
        };
        SubmitComponent.propDecorators = {
            submitAppearance: [{ type: core.Input }],
            submitColor: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            noCancel: [{ type: core.Input }],
            cancelParamsState: [{ type: core.Input }],
            submitLabel: [{ type: core.Input }],
            cancelState: [{ type: core.Input }],
            goBack: [{ type: core.Input }],
            loading: [{ type: core.Input }],
            accept: [{ type: core.Output }],
            cancel: [{ type: core.Output }]
        };
        return SubmitComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamSubmitModule = /** @class */ (function () {
        function JamSubmitModule() {
        }
        JamSubmitModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            flexLayout.FlexLayoutModule,
                            material.MatTooltipModule,
                            material.MatButtonModule,
                            material.MatProgressSpinnerModule,
                            common.CommonModule
                        ],
                        declarations: [SubmitComponent],
                        exports: [SubmitComponent]
                    },] },
        ];
        return JamSubmitModule;
    }());

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
    var FloatingFiltersComponent = /** @class */ (function () {
        function FloatingFiltersComponent() {
            this.hasAdvancedFilters = true;
            this.appearance = 'square';
            this.resetFilters = new core.EventEmitter();
            this.show_reset_button = false;
            this.open_expansion_panel = false;
        }
        FloatingFiltersComponent.prototype.ngOnInit = function () {
            this.show_reset_button = this.resetFilters.observers.length > 0;
        };
        FloatingFiltersComponent.prototype.toggleStateExpansionPanel = function (state) {
            this.open_expansion_panel = !state;
        };
        FloatingFiltersComponent.prototype.clearFilters = function (panel_state) {
            if (!panel_state) {
                return;
            }
            this.resetFilters.emit();
        };
        FloatingFiltersComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-floating-filters',
                        styles: ["/deep/ .filter-button,/deep/ .filter-button-round,/deep/ .filter-button-square{padding:0;color:currentColor;font-weight:900!important;box-sizing:border-box}/deep/ .filter-button mat-icon,/deep/ .filter-button-round mat-icon,/deep/ .filter-button-square mat-icon{color:currentColor!important}/deep/ .filter-button-round::before,/deep/ .filter-button-square::before,/deep/ .filter-button::before{content:'';background-color:currentColor;position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit!important;opacity:.08}.filter-button-round{border-radius:100px!important}.filter-button-square{border-radius:6px}.filter-button-square button{border-radius:6px!important}mat-expansion-panel-header{background:0 0!important}"],
                        template: "<mat-expansion-panel\n    [disabled]=\"!hasAdvancedFilters\"\n    [hideToggle]=\"true\"\n    (opened)=\"toggleStateExpansionPanel(false)\"\n    (closed)=\"toggleStateExpansionPanel(true)\"\n    [style.box-shadow]=\"'none'\"\n    class=\"width-100\" [expanded]=\"open_expansion_panel\" [style.background]=\"'transparent'\">\n    <mat-expansion-panel-header jamAvoidDisabledStyle [style.padding]=\"'0'\">\n        <mat-panel-description fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n            <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" (click)=\"$event.stopPropagation()\">\n                <button mat-button [ngClass]=\"'filter-button-' + appearance\" color=\"accent\"\n                    *ngIf=\"hasAdvancedFilters\"\n                    (click)=\"toggleStateExpansionPanel(open_expansion_panel)\">\n                    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"4px\">\n                        <button mat-icon-button class=\"mat-button\" (click)=\"clearFilters(open_expansion_panel)\">\n                            <mat-icon\n                                [innerHtml]=\"!open_expansion_panel ? 'filter_list' : 'close'\"\n                                [matTooltip]=\"open_expansion_panel ? 'Borrar filtros' : 'Ver filtros'\"\n                            ></mat-icon>\n                        </button>\n\n                        <span>FILTROS</span>\n\n                        <mat-icon matSuffix\n                            [style.width.px]=\"'40'\"\n                            [innerHtml]=\"open_expansion_panel ? 'arrow_drop_up' : 'arrow_drop_down'\"\n                        ></mat-icon>\n                    </div>\n                </button>\n            </div>\n\n            <div fxLayout=\"row\" fxLayoutAlign=\"end center\" fxLayoutGap=\"16px\" (keydown)=\"$event.stopPropagation()\" (click)=\"$event.stopPropagation()\">\n                <ng-content select=\"ng-container.jam-filter-header\"></ng-content>\n            </div>\n        </mat-panel-description>\n    </mat-expansion-panel-header>\n\n    <div fxLayout=\"row wrap\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px grid\">\n        <ng-content select=\"ng-container.jam-filter-content\">\n        </ng-content>\n    </div>\n</mat-expansion-panel>\n"
                    },] },
        ];
        FloatingFiltersComponent.propDecorators = {
            hasAdvancedFilters: [{ type: core.Input }],
            appearance: [{ type: core.Input }],
            resetFilters: [{ type: core.Output }]
        };
        return FloatingFiltersComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * Esta directive se usa en conjunto con la directive/attribute [disabled].
     * Es especial para los matExpansionPanel, cuando se aplican botones de acciones al header de este
     * y no se quiere abrir el matExpansionPanel, entonces esta directiv lo que hará es no aplicar los estilos apagado
     * que proporciona material cuando un elemento/tag esta des habilitado.
     */
    var AvoidDisabledStyleDirective = /** @class */ (function () {
        function AvoidDisabledStyleDirective(elementRef) {
            var _this = this;
            this.elementRef = elementRef;
            var NATIVE_ELEMENT = this.elementRef.nativeElement;
            this.changes = new MutationObserver(function (mutations) {
                var e_1, _a;
                try {
                    for (var mutations_1 = __values(mutations), mutations_1_1 = mutations_1.next(); !mutations_1_1.done; mutations_1_1 = mutations_1.next()) {
                        var mutation = mutations_1_1.value;
                        _this.preservingOriginalStyles(mutation);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (mutations_1_1 && !mutations_1_1.done && (_a = mutations_1.return))
                            _a.call(mutations_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            });
            this.changes.observe(NATIVE_ELEMENT, {
                attributes: true,
                childList: false,
                characterData: false
            });
        }
        AvoidDisabledStyleDirective.prototype.ngOnDestroy = function () {
            this.changes.disconnect();
        };
        AvoidDisabledStyleDirective.prototype.preservingOriginalStyles = function (mutation) {
            var e_2, _a;
            if (mutation.attributeName !== 'aria-disabled') {
                return;
            }
            var elements = document.getElementsByTagName(mutation.target.nodeName);
            try {
                for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                    var element = elements_1_1.value;
                    element.style.color = 'inherit';
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return))
                        _a.call(elements_1);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
        };
        AvoidDisabledStyleDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[jamAvoidDisabledStyle]'
                    },] },
        ];
        /** @nocollapse */
        AvoidDisabledStyleDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        return AvoidDisabledStyleDirective;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamFloatingFiltersModule = /** @class */ (function () {
        function JamFloatingFiltersModule() {
        }
        JamFloatingFiltersModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            material.MatExpansionModule,
                            material.MatButtonModule,
                            material.MatTooltipModule,
                            material.MatIconModule,
                            flexLayout.FlexLayoutModule,
                            common.CommonModule
                        ],
                        declarations: [FloatingFiltersComponent, AvoidDisabledStyleDirective],
                        exports: [FloatingFiltersComponent, AvoidDisabledStyleDirective]
                    },] },
        ];
        return JamFloatingFiltersModule;
    }());

    var PictureManagerComponent = /** @class */ (function () {
        function PictureManagerComponent(httpClient) {
            this.httpClient = httpClient;
            this.showDeleteOption = true;
            /**
             * Outputs
             * @param uploadChange: updates the image and returns the url for it.
             */
            this.uploadChange = new core.EventEmitter();
            this.response = new core.EventEmitter();
            this.drag_and_drop = false;
        }
        PictureManagerComponent.prototype.ngOnInit = function () {
            this.settingDefaultValues();
        };
        PictureManagerComponent.prototype.dragAndDropStyles = function (drag_and_drop) {
            this.drag_and_drop = drag_and_drop;
        };
        PictureManagerComponent.prototype.showPreview = function (image) {
            this.source = image;
            this.deleteUrl = this.deleteUrl || this.source;
            this.uploadChange.emit({ status_change: 'update', source: this.source });
        };
        PictureManagerComponent.prototype.delete = function () {
            var _this = this;
            var delete_url = this.creatDeleteUrl(this.source);
            this.httpClient.delete(delete_url, {
                headers: this.jamHeaders
            }).subscribe(function (response) {
                _this.uploadChange.emit({ status_change: 'delete', source: _this.source });
            });
        };
        PictureManagerComponent.prototype.settingDefaultValues = function () {
            this.type = this.type || 'square';
            this.deleteUrl = this.deleteUrl || this.source;
            this.uploadUrl = this.uploadUrl || this.source;
        };
        PictureManagerComponent.prototype.creatDeleteUrl = function (source) {
            var img_url_parties = source.split('/');
            var img_name = img_url_parties.pop();
            return this.deleteUrl + img_name;
        };
        PictureManagerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-picture-manager',
                        template: "<jam-upload [uploadUrl]=\"uploadUrl\" (dragAndDropChange)=\"dragAndDropStyles($event)\" (showPreview)=\"showPreview($event)\" mat-icon-button fxLayout=\"row\" fxLayoutAlign=\"center center\"\n    [jamHeaders]=\"jamHeaders\"\n    (response)=\"response.emit($event)\"\n    >\n    <div *ngIf=\"drag_and_drop\" [ngClass]=\"type + '-drag-and-drop-styles'\"></div>\n    <div *ngIf=\"!drag_and_drop\" id=\"picture-manager\" class=\"mouseover\">\n        <div [ngClass]=\"type\" [style.background-image]=\"'url(' + source + ')'\">\n            <div class=\"mouseover-child\">\n                <div class=\"blur\" [style.background-image]=\"'url(' + source + ')'\"></div>\n                <div class=\"overlay\"></div>\n                <div class=\"menu\">\n                    <div fxLayout=\"column\" fxLayoutAlign=\"center center\" fxLayoutGap=\"8px\">\n                        <mat-icon matTooltip=\"Subir imagen\">add_a_photo</mat-icon>\n                        <mat-divider *ngIf=\"showDeleteOption\"></mat-divider>\n                        <jam-delete-confirmation *ngIf=\"showDeleteOption\"\n                            [styled]=\"{ color: 'white' }\"\n                            (delete)=\"delete()\"\n                        ></jam-delete-confirmation>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</jam-upload>\n",
                        styles: ["jam-upload #picture-manager *,jam-upload #picture-manager *>mat-icon{width:auto;height:auto}.square{border-radius:2%;overflow:hidden}.round{border-radius:50%;overflow:hidden}.round-drag-and-drop-styles{background-color:rgba(0,0,0,.05);position:relative;width:180px;height:180px;top:0;left:0;z-index:333;background-image:url(/assets/images/drag_and_drop.png);border-radius:50%}.square-drag-and-drop-styles{background-color:rgba(0,0,0,.05);position:relative;width:180px;height:180px;top:0;left:0;z-index:333;background-image:url(/assets/images/drag_and_drop.png)}jam-upload #picture-manager *>mat-icon{color:#fff;font-size:4.5rem}jam-upload #picture-manager.mouseover:hover{background-color:transparent}jam-upload #picture-manager.mouseover div>.mouseover-child{display:none;-webkit-transition:display .3s;transition:display .3s}jam-upload #picture-manager.mouseover:hover div>.mouseover-child{display:inherit}jam-upload #picture-manager.mouseover:hover div>.mouseover-child .blur{top:0;bottom:0;left:0;right:0;-webkit-filter:blur(10px);-moz-filter:blur(10px);-ms-filter:blur(10px);-o-filter:blur(10px);filter:blur(10px);width:calc(100% + 40px);height:calc(100% + 40px);position:absolute;z-index:1;margin:-20px}jam-upload #picture-manager div mat-divider{width:60%;position:relative;border-color:#fff}jam-upload #picture-manager div{width:180px;height:180px;position:relative;background-size:cover;background-position:center}jam-upload #picture-manager.mouseover div>.mouseover-child .menu{z-index:3;position:absolute;top:0}jam-upload #picture-manager div>div.overlay{top:0;bottom:0;left:0;right:0;width:100%;height:100%;position:absolute;z-index:1;background-color:rgba(0,0,0,.376)}"]
                    },] },
        ];
        /** @nocollapse */
        PictureManagerComponent.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        PictureManagerComponent.propDecorators = {
            type: [{ type: core.Input }],
            source: [{ type: core.Input }],
            deleteUrl: [{ type: core.Input }],
            uploadUrl: [{ type: core.Input }],
            showDeleteOption: [{ type: core.Input }],
            jamHeaders: [{ type: core.Input }],
            uploadChange: [{ type: core.Output }],
            response: [{ type: core.Output }]
        };
        return PictureManagerComponent;
    }());

    var GalleryManagerComponent = /** @class */ (function () {
        function GalleryManagerComponent() {
            this.updatePicture = '/photos/';
            this.showDeleteOption = true;
            /**
             * @param  {number} highlightedImage
             * Position in the array of the highlighted image, by default is the position 0.
             */
            this.highlightedImage = 0;
            this.addPicture = new core.EventEmitter();
            this.responsePicture = new core.EventEmitter();
            this.image_loading = false;
        }
        GalleryManagerComponent.prototype.ngOnInit = function () {
            this.highlightedImage = this.highlightedImage || 0;
        };
        GalleryManagerComponent.prototype.showPreview = function (img) {
            this.addPicture.emit(img);
        };
        GalleryManagerComponent.prototype.response = function (event) {
            if (event.type !== 'done') {
                this.image_loading = true;
                return;
            }
            this.image_loading = false;
            this.responsePicture.emit(event.file.response.data);
        };
        GalleryManagerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-gallery-manager',
                        template: "<div *ngFor=\"let picture of pictures; let position = index\">\n    <mat-card class=\"mat-card-flat padding-0 container-gallery-manager\"\n        *ngIf=\"limit ? position <= limit : true\"\n        [matTooltip]=\"highlightedImage == position ? 'Imagen principal' : null\"\n        [ngClass]=\"highlightedImage == position ? 'mat-icon mat-accent highlighted-image-container' : null\"\n    >\n        <mat-icon color=\"accent\" *ngIf=\"highlightedImage == position\"\n            class=\"highlighted-image\"\n        >collections_bookmark</mat-icon>\n        <jam-picture-manager\n            [showDeleteOption]=\"showDeleteOption\"\n            [source]=\"picture.attributes.url\"\n            [uploadUrl]=\"uploadUrl + updatePicture + picture.id\"\n            [jamHeaders]=\"jamHeaders\"\n        ></jam-picture-manager>\n    </mat-card>\n</div>\n<jam-upload id=\"gallery-manager\" [uploadUrl]=\"uploadUrl\" (showPreview)=\"showPreview($event)\"\n    *ngIf=\"pictures && pictures.length < limit\" class=\"container-gallery-manager\"\n    [disabled]=\"image_loading\"\n    (response)=\"response($event)\"\n    mat-icon-button matTooltip=\"Subir imagen\"\n    [jamHeaders]=\"jamHeaders\">\n    <mat-icon id=\"base-icon\" [ngClass]=\"image_loading ? 'disabled-update' : null\">add_a_photo</mat-icon>\n    <mat-progress-spinner class=\"elements-up default\"\n        class=\"loading-position\"\n        *ngIf=\"image_loading\"\n        mode=\"indeterminate\"\n        value=\"value\"\n        diameter=\"42\"\n        aria-label=\"Cargando Espere\">\n    </mat-progress-spinner>\n</jam-upload>\n",
                        styles: ["jam-upload #gallery-manager{width:auto;height:100%}#base-icon{width:auto;height:auto;font-size:8rem}.container-gallery-manager{position:relative;border-radius:inherit}.highlighted-image-container{height:auto!important;width:auto!important;--color:currentColor;border:2px solid var(--color)}.highlighted-image{padding:2px;box-sizing:content-box;background:inherit;border-radius:10%;position:absolute;top:-10px;left:calc(100% - 14px);z-index:2}.loading-position{position:absolute;top:54px;left:48px}.disabled-update{opacity:.3}"]
                    },] },
        ];
        GalleryManagerComponent.propDecorators = {
            pictures: [{ type: core.Input }],
            uploadUrl: [{ type: core.Input }],
            updatePicture: [{ type: core.Input }],
            limit: [{ type: core.Input }],
            showDeleteOption: [{ type: core.Input }],
            jamHeaders: [{ type: core.Input }],
            highlightedImage: [{ type: core.Input }],
            addPicture: [{ type: core.Output }],
            responsePicture: [{ type: core.Output }]
        };
        return GalleryManagerComponent;
    }());

    var UploadComponent = /** @class */ (function () {
        function UploadComponent(router$$1) {
            this.router = router$$1;
            this.data = {};
            this.disabled = false;
            this.showPreview = new core.EventEmitter();
            this.response = new core.EventEmitter();
            this.dragAndDropChange = new core.EventEmitter();
            this.dragOver = false;
            this.files = []; // local uploading files array
            this.uploadInput = new core.EventEmitter(); // input events, we use this to emit data to ngx-uploader
            this.humanizeBytesFunction = ngxUploader.humanizeBytes;
        }
        UploadComponent.prototype.onUploadOutput = function (output) {
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
                        var index = this.files.findIndex(function (file) { return typeof output.file !== 'undefined' && file.id === output.file.id; });
                        this.files[index] = output.file;
                    }
                    break;
                case 'removed':
                    // remove file from array when removed
                    this.files = this.files.filter(function (file) { return JSON.stringify(file) !== JSON.stringify(output.file); });
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
        };
        // The preview function
        UploadComponent.prototype.previewImage = function (file) {
            var _this = this;
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file.nativeFile || file.target.files[0]);
            fileReader.onload = function (image) {
                _this.showPreview.emit(image.target.result);
            };
        };
        UploadComponent.prototype.startUpload = function () {
            var event = {
                type: 'uploadAll',
                url: this.uploadUrl,
                method: 'POST',
                data: this.data,
                headers: this.jamHeaders
            };
            this.uploadInput.emit(event);
        };
        UploadComponent.prototype.cancelUpload = function (id) {
            this.uploadInput.emit({ type: 'cancel', id: id });
        };
        UploadComponent.prototype.removeFile = function (id) {
            this.uploadInput.emit({ type: 'remove', id: id });
        };
        UploadComponent.prototype.removeAllFiles = function () {
            this.uploadInput.emit({ type: 'removeAll' });
        };
        UploadComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-upload',
                        template: "<div>\n    <div fxLayout=\"column\" fxLayoutAlign=\"center center\" ngFileDrop [options]=\"options\" (uploadOutput)=\"onUploadOutput($event)\" [uploadInput]=\"uploadInput\">\n        <label class=\"upload-button margin-0\"\n            style=\"display: inline-block;\n                border: none;\n                outline: none;\n                cursor: pointer;\"\n            >\n            <input style=\"display: none\" type=\"file\" class=\"layout-margin\" ngFileSelect\n                [uploadInput]=\"uploadInput\"\n                [disabled]=\"disabled\"\n                [options]=\"options\"\n                (change)=\"previewImage($event)\"\n                (uploadOutput)=\"onUploadOutput($event)\"\n                multiple>\n            <ng-content></ng-content>\n        </label>\n    </div>\n</div>\n<div *ngFor=\"let f of files; let i = index;\">\n    <mat-spinner *ngIf=\"f.progress.data < 100\"></mat-spinner>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        UploadComponent.ctorParameters = function () {
            return [
                { type: router.Router }
            ];
        };
        UploadComponent.propDecorators = {
            uploadUrl: [{ type: core.Input }],
            data: [{ type: core.Input }],
            redirect: [{ type: core.Input }],
            jamHeaders: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            uploadInput: [{ type: core.Output }],
            showPreview: [{ type: core.Output }],
            response: [{ type: core.Output }],
            dragAndDropChange: [{ type: core.Output }]
        };
        return UploadComponent;
    }());

    /***
     * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var ConfirmationDialogComponent = /** @class */ (function () {
        function ConfirmationDialogComponent(dialogRef, data) {
            this.dialogRef = dialogRef;
            this.data = data;
            if (!data.accept) {
                data.accept = 'Sí';
            }
            if (!data.msg) {
                data.msg = '¿Está seguro que desea continuar?';
            }
        }
        ConfirmationDialogComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-confirmation-dialog',
                        template: "<h2 *ngIf=\"data.title\" mat-dialog-title [innerHtml]=\"data.title\"></h2>\n<mat-dialog-content>\n    <p [innerHtml]=\"data.msg\"></p>\n</mat-dialog-content>\n<mat-dialog-actions fxLayout=\"row\" fxLayoutAlign=\"end center\">\n    <button mat-button mat-dialog-close>No</button>\n    <button mat-button [mat-dialog-close]=\"true\" [innerHtml]=\"data.accept\"></button>\n</mat-dialog-actions>\n"
                    },] },
        ];
        /** @nocollapse */
        ConfirmationDialogComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialogRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
            ];
        };
        return ConfirmationDialogComponent;
    }());

    /***
     * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var DeleteConfirmationComponent = /** @class */ (function () {
        function DeleteConfirmationComponent(dialog$$1) {
            this.dialog = dialog$$1;
            this.type = 'icon'; /** @Deprecated */
            this.appearance = 'mat-icon-button';
            this.delete = new core.EventEmitter();
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
        DeleteConfirmationComponent.prototype.showConfirm = function () {
            var _this = this;
            var dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                width: 'auto',
                data: { title: this.title, msg: this.msg, accept: this.accept }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    _this.delete.emit();
                }
            });
        };
        DeleteConfirmationComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-delete-confirmation',
                        template: "<div>\n    <button mat-button type=\"button\"\n        [ngClass]=\"appearance || 'mat-icon-button mat-button'\"\n        (click)=\"showConfirm()\"\n        [color]=\"smartColor[appearance]\"\n        [ngStyle]=\"styled\"\n        [matTooltip]=\"tooltip || text || 'Eliminar'\"\n        >\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\" fxLayoutGap=\"8px\">\n            <mat-icon\n                [ngStyle]=\"styleIcon ? styleIcon : ''\"\n            >\n                {{ icon ? icon : 'delete' }}\n            </mat-icon>\n            <span *ngIf=\"text && appearance !== 'mat-icon-button'\" [innerHtml]=\"text\"></span>\n        </div>\n    </button>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        DeleteConfirmationComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialog }
            ];
        };
        DeleteConfirmationComponent.propDecorators = {
            type: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            tooltip: [{ type: core.Input }],
            msg: [{ type: core.Input }],
            text: [{ type: core.Input }],
            title: [{ type: core.Input }],
            classed: [{ type: core.Input }],
            styled: [{ type: core.Input }],
            styleIcon: [{ type: core.Input }],
            accept: [{ type: core.Input }],
            appearance: [{ type: core.Input }],
            delete: [{ type: core.Output }]
        };
        return DeleteConfirmationComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamDeleteConfirmationModule = /** @class */ (function () {
        function JamDeleteConfirmationModule() {
        }
        JamDeleteConfirmationModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            material.MatTooltipModule,
                            material.MatDialogModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            flexLayout.FlexLayoutModule,
                            common.CommonModule
                        ],
                        declarations: [DeleteConfirmationComponent, ConfirmationDialogComponent],
                        entryComponents: [ConfirmationDialogComponent],
                        exports: [DeleteConfirmationComponent, ConfirmationDialogComponent]
                    },] },
        ];
        return JamDeleteConfirmationModule;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamPictureManagerModule = /** @class */ (function () {
        function JamPictureManagerModule() {
        }
        JamPictureManagerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            JamDeleteConfirmationModule,
                            material.MatCardModule,
                            material.MatProgressSpinnerModule,
                            material.MatTooltipModule,
                            material.MatButtonModule,
                            material.MatProgressSpinnerModule,
                            material.MatDividerModule,
                            material.MatIconModule,
                            ngxUploader.NgxUploaderModule,
                            flexLayout.FlexLayoutModule,
                            common.CommonModule
                        ],
                        declarations: [UploadComponent, PictureManagerComponent, GalleryManagerComponent],
                        exports: [PictureManagerComponent, GalleryManagerComponent]
                    },] },
        ];
        return JamPictureManagerModule;
    }());

    var ChipsAutocompleteComponent = /** @class */ (function () {
        function ChipsAutocompleteComponent() {
            this.page = {
                number: 1,
                size: 50
            };
            this.trackById = trackById;
            this.addOnBlur = true;
            this.selectable = true;
            this.removable = true;
            this.collectionArray = [];
            this.formControl = new forms.FormControl();
        }
        ChipsAutocompleteComponent.prototype.ngOnInit = function () {
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
        };
        ChipsAutocompleteComponent.prototype.getAll = function (search_text) {
            var _a;
            if (search_text) {
                this.remoteFilter = __assign({}, this.remoteFilter, (_a = {}, _a[this.attributesDisplay[0]] = search_text, _a));
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
        };
        ChipsAutocompleteComponent.prototype.filterCollection = function (search_text) {
            var _this = this;
            var filterValue = typeof search_text === 'string' ? search_text.toLowerCase() : '';
            return this.collection.data.filter(function (resource) {
                return resource.attributes[_this.attributesDisplay[0]]
                    .toLowerCase()
                    .indexOf(filterValue) >= 0;
            });
        };
        ChipsAutocompleteComponent.prototype.addResource = function (resource) {
            this.resource.addRelationship(resource, this.relationAlias);
            this.resourceInput.nativeElement.value = '';
            this.formControl.setValue(null);
        };
        ChipsAutocompleteComponent.prototype.displayName = function (resource) {
            return '';
        };
        ChipsAutocompleteComponent.prototype.removeResource = function (resource) {
            this.resource.removeRelationship(this.relationAlias, resource.id);
        };
        ChipsAutocompleteComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-chips-autocomplete',
                        template: "<mat-form-field [style.width.%]=\"'100'\" [appearance]=\"appearance\">\n    <mat-label *ngIf=\"matLabel\">{{ matLabel }}</mat-label>\n    <mat-chip-list #chipList>\n        <mat-chip\n            *ngFor=\"let resource_resource of collection_relationships.data; trackBy: collection_relationships.trackBy\"\n            [selectable]=\"selectable\"\n            [removable]=\"removable\"\n            (removed)=\"removeResource(resource_resource)\">\n            {{ resource_resource.attributes[attributesDisplay[0]] }}\n        <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon>\n        </mat-chip>\n        <input\n            [placeholder]=\"placeholder || ''\"\n            #resourceInput\n            [formControl]=\"formControl\"\n            [matAutocomplete]=\"auto\"\n            [matChipInputFor]=\"chipList\"\n            [matChipInputAddOnBlur]=\"addOnBlur\">\n    </mat-chip-list>\n\n    <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" (optionSelected)=\"addResource($event.option.value)\">\n        <ng-container *ngFor=\"let resource of filteredCollection | async; trackBy: trackById\">\n            <mat-option *ngIf=\"!collection_relationships.find(resource.id)\" [value]=\"resource\">\n                <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                    <mat-icon class=\"layout-margin\">person</mat-icon>\n                    <strong>{{ resource.attributes[attributesDisplay[0]] }}</strong>\n                    &nbsp;\n                    <small fxLayout=\"row\" fxLayoutAlign=\"start center\" *ngFor=\"let attribute_name of attributesDisplay; let attr_id = index\">\n                        <span *ngIf=\"attr_id >= 1\">| {{ resource.attributes[attribute_name] }}</span>\n                    </small>\n                </div>\n            </mat-option>\n        </ng-container>\n    </mat-autocomplete>\n</mat-form-field>\n"
                    },] },
        ];
        /** @nocollapse */
        ChipsAutocompleteComponent.ctorParameters = function () { return []; };
        ChipsAutocompleteComponent.propDecorators = {
            resourceInput: [{ type: core.ViewChild, args: ['resourceInput',] }],
            placeholder: [{ type: core.Input }],
            resource: [{ type: core.Input }],
            remoteFilter: [{ type: core.Input }],
            service: [{ type: core.Input }],
            relationAlias: [{ type: core.Input }],
            attributesDisplay: [{ type: core.Input }],
            appearance: [{ type: core.Input }],
            matLabel: [{ type: core.Input }],
            page: [{ type: core.Input }]
        };
        return ChipsAutocompleteComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamChipsAutocompleteModule = /** @class */ (function () {
        function JamChipsAutocompleteModule() {
        }
        JamChipsAutocompleteModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            flexLayout.FlexLayoutModule,
                            forms.ReactiveFormsModule,
                            material.MatAutocompleteModule,
                            material.MatFormFieldModule,
                            material.MatOptionModule,
                            material.MatChipsModule,
                            material.MatIconModule,
                            common.CommonModule
                        ],
                        declarations: [ChipsAutocompleteComponent],
                        exports: [ChipsAutocompleteComponent]
                    },] },
        ];
        return JamChipsAutocompleteModule;
    }());

    /***
     * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var EditTextAttributeDialogComponent = /** @class */ (function () {
        function EditTextAttributeDialogComponent(dialogRef, data) {
            this.dialogRef = dialogRef;
            this.data = data;
            this.text_value = '';
            if (!data.accept) {
                data.accept = 'Aceptar';
            }
        }
        EditTextAttributeDialogComponent.prototype.onKeyUp = function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                this.updateAttributeAndClose(this.data.attribute, this.text_value);
            }
        };
        EditTextAttributeDialogComponent.prototype.updateAttributeAndClose = function (attribute, value) {
            this.data.resource.attributes[attribute] = value;
            this.dialogRef.close(true);
        };
        EditTextAttributeDialogComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-edit-text-attribute',
                        template: "<form name=\"myForm\" novalidate (ngSubmit)=\"updateAttributeAndClose(data.attribute, text_value)\">\n    <h2 *ngIf=\"data.title\" mat-dialog-title [innerHtml]=\"data.title\"></h2>\n    <mat-dialog-content>\n        <p *ngIf=\"data.message\">{{ data.message }}</p>\n        <mat-form-field\n            appearance=\"outline\"\n            fxFlex\n        >\n            <mat-label>{{ data.textarea_label }}</mat-label>\n            <textarea maxlength=\"140\"\n                name=\"text_attribute\"\n                type=\"text\"\n                #textarea\n                [(ngModel)]=\"text_value\"\n                matInput\n            ></textarea>\n            <mat-hint align=\"end\">{{textarea.value.length}} / 140</mat-hint>\n        </mat-form-field>\n    </mat-dialog-content>\n\n    <mat-dialog-actions fxLayout=\"row\" fxLayoutAlign=\"end center\">\n        <jam-submit\n            (cancel)=\"dialogRef.close()\"\n            [submitLabel]=\"data.accept\"\n        ></jam-submit>\n    </mat-dialog-actions>\n</form>\n"
                    },] },
        ];
        /** @nocollapse */
        EditTextAttributeDialogComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialogRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
            ];
        };
        EditTextAttributeDialogComponent.propDecorators = {
            onKeyUp: [{ type: core.HostListener, args: ['window: keyup', ['$event'],] }]
        };
        return EditTextAttributeDialogComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamEditTextAttributeModule = /** @class */ (function () {
        function JamEditTextAttributeModule() {
        }
        JamEditTextAttributeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            tooltip.MatTooltipModule,
                            dialog.MatDialogModule,
                            button.MatButtonModule,
                            formField.MatFormFieldModule,
                            icon.MatIconModule,
                            input.MatInputModule,
                            flexLayout.FlexLayoutModule,
                            JamSubmitModule,
                            common.CommonModule
                        ],
                        declarations: [EditTextAttributeDialogComponent],
                        entryComponents: [EditTextAttributeDialogComponent],
                        exports: [EditTextAttributeDialogComponent]
                    },] },
        ];
        return JamEditTextAttributeModule;
    }());

    /***
     * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var TopWarningService = /** @class */ (function () {
        function TopWarningService() {
            this.warnings = [];
        }
        /**
         * Receives a warning resource.
         *
         * @param warning
         */
        TopWarningService.prototype.setWarningMessage = function (warning) {
            if (!warning)
                return;
            if (this.warnings.length <= 0) {
                this.warnings.push(warning);
            }
            var search_warning = this.warnings.find(function (msj_warning) { return msj_warning.id === warning.id; });
            if (!search_warning || search_warning.id !== warning.id) {
                this.warnings.push(warning);
            }
        };
        TopWarningService.prototype.getWarningMessage = function () {
            return this.warnings;
        };
        TopWarningService.prototype.clearMessage = function (warning_keys) {
            var e_1, _a;
            try {
                for (var _b = __values(this.warnings), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var warning = _c.value;
                    if (!warning_keys.includes(warning.id))
                        continue;
                    var index = this.warnings.indexOf(warning);
                    this.warnings.splice(index, 1);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
        };
        TopWarningService.decorators = [
            { type: core.Injectable },
        ];
        return TopWarningService;
    }());

    var TopWarningComponent = /** @class */ (function () {
        function TopWarningComponent(topWarningService) {
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
        TopWarningComponent.prototype.onMouseEnter = function () {
            this.opened ? this.button_state = 'contracted' : this.button_state = 'expanded';
        };
        TopWarningComponent.prototype.onMouseLeave = function () {
            this.button_state = 'standby';
        };
        TopWarningComponent.prototype.toggleOpenAccordion = function (opened) {
            this.opened = opened;
            localStorage.setItem('opened', this.opened.toString());
        };
        TopWarningComponent.prototype.defaultAccordionState = function () {
            this.opened = localStorage.getItem('opened') === 'false' ? false : true;
        };
        TopWarningComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-top-warning',
                        template: "<mat-accordion *ngIf=\"topWarningService.warnings.length > 0\">\n    <mat-expansion-panel id=\"rsTopWarning\" class=\"yellow-bg-400\"\n        [expanded]=\"opened\"\n        [ngClass]=\"opened ? 'hidden-header' : ''\"\n        [hideToggle]=\"true\"\n        (expandedChange)=\"toggleOpenAccordion($event)\">\n        <mat-expansion-panel-header *ngIf=\"!opened\">\n            <mat-panel-description fxLayout=\"column\" fxLayoutAlign=\"end center\">\n                <mat-icon>{{ button_icons[button_state] }}</mat-icon>\n            </mat-panel-description>\n        </mat-expansion-panel-header>\n        <div fxLayout=\"column\" class=\"text-center\">\n            <div *ngFor=\"let warn of topWarningService.warnings\">\n                <jam-single-warning\n                    [message]=\"warn.attributes.message\"\n                    [link]=\"warn.attributes.link\"\n                    [linkQueryParams]=\"warn.attributes.linkQueryParams\"\n                    [externalLink]=\"warn.attributes.externalLink\"\n                    [linkText]=\"warn.attributes.linkText\"\n                    >\n                </jam-single-warning>\n                <mat-divider></mat-divider>\n            </div>\n            <div [style.cursor]=\"'pointer'\" class=\"action-button\" fxLayout=\"column\" fxLayoutAlign=\"center center\"\n                (click)=\"opened = false\">\n                <button mat-icon-button>\n                    <mat-icon *ngIf=\"opened\"\n                    >{{ button_icons[button_state] }}</mat-icon>\n                </button>\n            </div>\n        </div>\n    </mat-expansion-panel>\n</mat-accordion>\n",
                        styles: [".yellow-bg-400{background:#ffee58}.overlay{z-index:999}.text-center{text-align:center}mat-expansion-panel-header{height:15px!important}:host /deep/ .mat-expansion-panel-body{padding-bottom:0}mat-divider{border-color:#fbc02d!important}mat-icon{color:#757575}.action-button{height:24px}"]
                    },] },
        ];
        /** @nocollapse */
        TopWarningComponent.ctorParameters = function () {
            return [
                { type: TopWarningService }
            ];
        };
        TopWarningComponent.propDecorators = {
            opened: [{ type: core.Input }],
            onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
            onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }]
        };
        return TopWarningComponent;
    }());

    /***
     * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var SingleWarningComponent = /** @class */ (function () {
        function SingleWarningComponent() {
            this.actionButtonClick = new core.EventEmitter();
            this.actionIconButtonClick = new core.EventEmitter();
            this.custom_styles = {};
        }
        SingleWarningComponent.prototype.ngOnInit = function () {
            if (this.backgroundColor) {
                this.custom_styles['background-color'] = this.backgroundColor;
            }
            if (this.textColor) {
                this.custom_styles.color = this.textColor;
            }
        };
        SingleWarningComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-single-warning',
                        template: "<mat-card class=\"mat-card-flat yellow-bg-400 width-100\"\n    *ngIf=\"message\"\n    [ngStyle]=\"custom_styles\"\n>\n    <span>{{ message }}</span>\n    <a\n        [routerLink]=\"link\"\n        [queryParams]=\"linkQueryParams || {}\"\n        *ngIf=\"link\"\n        >\n        {{ linkText || 'M\u00E1s informaci\u00F3n' }}\n    </a>\n    <a\n        [href]=\"externalLink\"\n        target=\"_blank\"\n        *ngIf=\"externalLink\"\n        >\n        {{ linkText || 'M\u00E1s informaci\u00F3n' }}\n    </a>\n\n    <button\n        *ngIf=\"actionButtonText\"\n        mat-button\n        type=\"button\"\n        name=\"button\"\n        (click)=\"actionButtonClick.emit()\"\n        >\n        {{ actionButtonText }}\n    </button>\n    <button\n        *ngIf=\"actionIconButton\"\n        mat-icon-button\n        [matTooltip]=\"actionIconButtonTooltip\"\n        type=\"button\"\n        name=\"button\"\n        (click)=\"actionIconButtonClick.emit()\"\n        >\n        <mat-icon>\n            {{ actionIconButton }}\n        </mat-icon>\n    </button>\n</mat-card>\n",
                        styles: [".yellow-bg-400{box-sizing:border-box;background:#ffee58;color:#212121}"]
                    },] },
        ];
        SingleWarningComponent.propDecorators = {
            message: [{ type: core.Input }],
            backgroundColor: [{ type: core.Input }],
            textColor: [{ type: core.Input }],
            link: [{ type: core.Input }],
            linkQueryParams: [{ type: core.Input }],
            externalLink: [{ type: core.Input }],
            linkText: [{ type: core.Input }],
            actionButtonText: [{ type: core.Input }],
            actionIconButton: [{ type: core.Input }],
            actionIconButtonTooltip: [{ type: core.Input }],
            actionButtonClick: [{ type: core.Output }],
            actionIconButtonClick: [{ type: core.Output }]
        };
        return SingleWarningComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamTopWarningModule = /** @class */ (function () {
        function JamTopWarningModule() {
        }
        JamTopWarningModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            material.MatFormFieldModule,
                            material.MatExpansionModule,
                            material.MatCardModule,
                            material.MatIconModule,
                            flexLayout.FlexLayoutModule,
                            material.MatButtonModule,
                            material.MatDividerModule,
                            // ReactiveFormsModule,
                            tooltip.MatTooltipModule,
                            forms.FormsModule,
                            router.RouterModule,
                            common.CommonModule
                        ],
                        declarations: [TopWarningComponent, SingleWarningComponent],
                        providers: [TopWarningService],
                        exports: [TopWarningComponent, SingleWarningComponent]
                    },] },
        ];
        return JamTopWarningModule;
    }());

    var DialogLoggedStateComponent = /** @class */ (function () {
        function DialogLoggedStateComponent(thisDialogRef) {
            this.thisDialogRef = thisDialogRef;
        }
        DialogLoggedStateComponent.prototype.onCloseConfirm = function () {
            this.thisDialogRef.close('Confirm');
        };
        DialogLoggedStateComponent.prototype.onCloseCancel = function () {
            this.thisDialogRef.close('Cancel');
        };
        DialogLoggedStateComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-dialog-logged-state',
                        template: "<h3 mat-dialog-title>Tu sesi\u00F3n se ha cerrado.</h3>\n<hr>\n<mat-dialog-content>\n    <p>Es necesario que vuelvas a ingresar tu usuario y contrase\u00F1a. \u00A1Vamos a ello!</p>\n</mat-dialog-content>\n<mat-dialog-actions fxLayout=\"row\" fxLayoutAlign=\"end center\">\n    <jam-submit (accept)=\"onCloseConfirm()\" [noCancel]=\"true\" submitLabel=\"Aceptar\"></jam-submit>\n</mat-dialog-actions>\n"
                    },] },
        ];
        /** @nocollapse */
        DialogLoggedStateComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialogRef }
            ];
        };
        return DialogLoggedStateComponent;
    }());

    var JamErrorHandler = /** @class */ (function (_super) {
        __extends(JamErrorHandler, _super);
        function JamErrorHandler(ngZone, matDialog, toasterService) {
            var _this = _super.call(this) || this;
            _this.ngZone = ngZone;
            _this.matDialog = matDialog;
            _this.toasterService = toasterService;
            _this.lastErrorCached = { title: '', time: 0 };
            _this.show_angular_errors = true;
            return _this;
        }
        JamErrorHandler.prototype.handleError = function (error) {
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
            _super.prototype.handleError.call(this, error);
        };
        JamErrorHandler.prototype.handleJsonapiErrors = function (error, use_error_cache) {
            var _this = this;
            if (use_error_cache === void 0) {
                use_error_cache = true;
            }
            var e_1, _a;
            try {
                for (var _b = __values(error.errors), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var actual_error = _c.value;
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
                                this.ngZone.run(function () {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, this.logOut()];
                                        });
                                    });
                                });
                                return;
                            }
                            break;
                        case 'Invalid data received':
                            if (actual_error.detail === 'The refresh token must be at least 20 characters.') {
                                this.ngZone.run(function () {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, this.logOut()];
                                        });
                                    });
                                });
                                return;
                            }
                            break;
                        case 'Token has expired':
                        case 'Token not provided':
                            this.ngZone.run(function () {
                                return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, this.logOut()];
                                    });
                                });
                            });
                            return;
                        case 'Too many attempts':
                            this.Notification('Has agotado el límite de intentos, espera un momento antes de continuar.', 'error');
                            return;
                    }
                    // cannot use special conditions to SWITCH statement without changing the data inside switch to "true"
                    if (actual_error.detail.includes('Token required')) {
                        this.ngZone.run(function () {
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, this.logOut()];
                                });
                            });
                        });
                        return;
                    }
                    switch (actual_error.detail) {
                        case 'Expired access token.':
                        case 'The refresh token is invalid. Cannot decrypt the refresh token':
                        case 'Invalid access token':
                            this.ngZone.run(function () {
                                return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, this.logOut()];
                                    });
                                });
                            });
                            return;
                    }
                    this.singleError(actual_error);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
        };
        JamErrorHandler.prototype.logOut = function () {
            var _this = this;
            if (this.token_dialog_is_open) {
                return;
            }
            this.token_dialog_is_open = true;
            var dialog_ref = this.matDialog.open(DialogLoggedStateComponent, {
                width: '600px',
                disableClose: true
            });
            dialog_ref.afterClosed().subscribe(function (success) {
                _this.token_dialog_is_open = false;
                _this.globalStateService.logout();
            });
        };
        JamErrorHandler.prototype.setForm = function (form) {
            this.form = form;
        };
        JamErrorHandler.prototype.Notification = function (title, type, body) {
            var e_2, _a;
            var messages = title.split('|');
            type = type || 'error';
            if (messages.length === 1) {
                this.toasterService.pop(type, title, body);
                return;
            }
            try {
                for (var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                    var each = messages_1_1.value;
                    if (each !== '\n') {
                        this.toasterService.pop(type, each);
                    }
                }
            }
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return))
                        _a.call(messages_1);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
        };
        JamErrorHandler.prototype.singleError = function (error) {
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
        };
        JamErrorHandler.prototype.unhandledError = function (message) {
            this.Notification('Ups, ha ocurrido un error. Contáctanos por correo a soporte@multinexo.com', 'error', "C\u00F3digo de error: " + message);
        };
        JamErrorHandler.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        JamErrorHandler.ctorParameters = function () {
            return [
                { type: core.NgZone },
                { type: dialog.MatDialog },
                { type: angular2Toaster.ToasterService }
            ];
        };
        return JamErrorHandler;
    }(core.ErrorHandler));

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamErrorHandlerModule = /** @class */ (function () {
        function JamErrorHandlerModule() {
        }
        JamErrorHandlerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            material.MatDialogModule,
                            material.MatButtonModule,
                            flexLayout.FlexLayoutModule,
                            JamSubmitModule,
                            common.CommonModule
                        ],
                        declarations: [DialogLoggedStateComponent],
                        providers: [JamErrorHandler],
                        entryComponents: [DialogLoggedStateComponent],
                        exports: [DialogLoggedStateComponent]
                    },] },
        ];
        return JamErrorHandlerModule;
    }());

    var start_time = [0, 0, 0];
    var end_time = [23, 59, 59];
    var RangeDatepickerComponent = /** @class */ (function () {
        function RangeDatepickerComponent(datePipe) {
            this.datePipe = datePipe;
            this.startDateChange = new core.EventEmitter();
            this.endDateChange = new core.EventEmitter();
            this.updateDate = new core.EventEmitter();
        }
        RangeDatepickerComponent.prototype.ngOnInit = function () {
            this.label = 'Rango de fecha';
        };
        RangeDatepickerComponent.prototype.onDateInput = function (event) {
            this.lastDateInput = event.value;
            this.updateDateChange(this.lastDateInput.begin, this.lastDateInput.end);
        };
        RangeDatepickerComponent.prototype.onDateChange = function (event) {
            this.lastDateChange = event.value;
            this.updateDateChange(this.lastDateChange.begin, this.lastDateChange.end);
        };
        RangeDatepickerComponent.prototype.applyCustomRange = function (event, picker) {
            event.stopPropagation();
            picker.open();
        };
        RangeDatepickerComponent.prototype.applyLastWeek = function () {
            this.endDate = new Date();
            this.startDate = new Date();
            this.startDate.setDate(this.endDate.getDate() - 6);
            this.date = { begin: this.startDate, end: this.endDate };
            this.updateDateChange(this.startDate, this.endDate);
        };
        RangeDatepickerComponent.prototype.applyToday = function () {
            this.startDate = this.endDate = new Date();
            this.date = { begin: this.startDate, end: this.endDate };
            this.updateDateChange(this.startDate, this.endDate);
        };
        RangeDatepickerComponent.prototype.applyCurrentMonth = function () {
            var today = new Date();
            this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            this.date = { begin: this.startDate, end: this.endDate };
            this.updateDateChange(this.startDate, this.endDate);
        };
        RangeDatepickerComponent.prototype.clearRange = function (event) {
            event.stopPropagation();
            this.date = null;
            this.updateDateChange(null, null);
            this.label = 'Rango de fecha';
        };
        RangeDatepickerComponent.prototype.applylastMonth = function () {
            var today = new Date();
            this.startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            this.endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            this.date = { begin: this.startDate, end: this.endDate };
            this.updateDateChange(this.startDate, this.endDate);
        };
        RangeDatepickerComponent.prototype.updateDateChange = function (start_date, end_date) {
            this.startDate = start_date;
            this.endDate = end_date;
            this.label = this.togglePreviewText(start_date, end_date);
            this.startDateChange.emit(this.formatDateAndAddTime(start_date, start_time));
            this.endDateChange.emit(this.formatDateAndAddTime(end_date, end_time));
            this.updateDate.emit();
        };
        RangeDatepickerComponent.prototype.togglePreviewText = function (start_date, end_date) {
            if (start_date && end_date) {
                return this.createPreviewText(start_date, end_date).toUpperCase();
            }
            if (start_date) {
                return this.getDays(start_date).toUpperCase();
            }
            if (end_date) {
                return this.getDays(end_date).toUpperCase();
            }
        };
        RangeDatepickerComponent.prototype.getDays = function (date) {
            var today = new Date();
            if (date.getDate() === today.getDate()) {
                return 'hoy';
            }
            return this.datePipe.transform(date, 'dd MMM yyyy');
        };
        RangeDatepickerComponent.prototype.createPreviewText = function (start_date, end_date) {
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
        };
        RangeDatepickerComponent.prototype.compareDaysOfTheSameMonth = function () {
            if (this.startDate.getDate() === this.endDate.getDate())
                return true;
        };
        RangeDatepickerComponent.prototype.formatDateAndAddTime = function (date, time) {
            date.setHours(time[0], time[1], time[2]);
            return date;
        };
        RangeDatepickerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-range-datepicker',
                        template: "<mat-form-field [matTooltip]=\"label\">\n    <mat-select [placeholder]=\"label\">\n        <mat-option (click)=\"applyCustomRange($event, resultPicker); $event.stopPropagation()\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n            <sat-datepicker-toggle matPrefix [for]=\"resultPicker\"></sat-datepicker-toggle>\n            <input matInput\n                placeholder=\"Rango personalizado\"\n                #resultPickerModel=\"ngModel\"\n                [satDatepicker]=\"resultPicker\"\n                [(ngModel)]=\"date\"\n                (dateInput)=\"onDateInput($event)\"\n                (dateChange)=\"onDateChange($event)\">\n            <sat-datepicker\n                [disabled]=\"false\"\n                #resultPicker [rangeMode]=\"true\">\n            </sat-datepicker>\n\n            <div matSuffix fxFlex=\"10\">\n                <button mat-icon-button matTooltip=\"Limpiar filtro\" (click)=\"clearRange($event)\">\n                    <mat-icon>clear</mat-icon>\n                </button>\n            </div>\n        </mat-option>\n\n        <mat-option (click)=\"applyToday()\">Hoy</mat-option>\n        <mat-option (click)=\"applyLastWeek()\">\u00DAltima semana</mat-option>\n        <mat-option (click)=\"applyCurrentMonth()\">Este mes</mat-option>\n        <mat-option (click)=\"applylastMonth()\">El mes pasado</mat-option>\n    </mat-select>\n</mat-form-field>\n",
                        providers: [common.DatePipe],
                        styles: ["mat-form-field{font-size:15px}"]
                    },] },
        ];
        /** @nocollapse */
        RangeDatepickerComponent.ctorParameters = function () {
            return [
                { type: common.DatePipe }
            ];
        };
        RangeDatepickerComponent.propDecorators = {
            startDate: [{ type: core.Input }],
            endDate: [{ type: core.Input }],
            startDateChange: [{ type: core.Output }],
            endDateChange: [{ type: core.Output }],
            updateDate: [{ type: core.Output }]
        };
        return RangeDatepickerComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamRangeDatepickerModule = /** @class */ (function () {
        function JamRangeDatepickerModule() {
        }
        JamRangeDatepickerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            saturnDatepicker.SatNativeDateModule,
                            saturnDatepicker.SatDatepickerModule,
                            forms.ReactiveFormsModule,
                            material.MatFormFieldModule,
                            material.MatOptionModule,
                            material.MatButtonModule,
                            material.MatSelectModule,
                            material.MatTooltipModule,
                            material.MatIconModule,
                            common.CommonModule
                        ],
                        declarations: [RangeDatepickerComponent],
                        exports: [RangeDatepickerComponent]
                    },] },
        ];
        return JamRangeDatepickerModule;
    }());

    var FabSpeedDialComponent = /** @class */ (function () {
        function FabSpeedDialComponent(activatedRoute) {
            this.activatedRoute = activatedRoute;
            this.animationMode = 'scale';
            this.tooltip = '';
            this.spin = true;
            this.icon = 'add';
            this.routerLink = [];
            this.fabSpeedDialMiniButtons = [];
            this.fabSpeedDialClick = new core.EventEmitter();
            this.actionsClick = new core.EventEmitter();
            this.fab_status = {
                opened: false,
                status: 'closed'
            };
        }
        FabSpeedDialComponent.prototype.ngOnInit = function () {
            if (!this.queryParams) {
                this.queryParams = this.activatedRoute.snapshot.queryParams;
            }
        };
        FabSpeedDialComponent.prototype.toggleFabStatus = function (status) {
            var _this = this;
            if (status === 'open') {
                this.fab_status.status = 'opened';
                this.fab_status.opened = true;
            }
            else {
                this.fab_status.status = 'closed';
                setTimeout(function () {
                    if (_this.fab_status.status === 'closed') {
                        _this.fab_status.opened = false;
                    }
                }, 300);
            }
        };
        FabSpeedDialComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-fab-speed-dial',
                        template: "<eco-fab-speed-dial\n    class=\"rs-speed-dial--position\"\n    [animationMode]=\"animationMode\"\n    (mouseover)=\"toggleFabStatus('open')\"\n    (mouseleave)=\"toggleFabStatus('close')\"\n    [(open)]=\"fab_status.opened\"\n    [fixed]=\"true\"\n    >\n    <eco-fab-speed-dial-trigger [spin]=\"spin\">\n        <button\n            mat-fab\n            matTooltipPosition=\"before\"\n            [matTooltip]=\"tooltip\"\n            (click)=\"fabSpeedDialClick.emit()\"\n            [routerLink]=\"routerLink || []\"\n            [queryParams]=\"queryParams\"\n            >\n            <mat-icon>{{ fab_status.opened ? icon : 'add' }}</mat-icon>\n        </button>\n    </eco-fab-speed-dial-trigger>\n\n    <eco-fab-speed-dial-actions [hidden]=\"!fab_status.opened\">\n        <button\n            *ngFor=\"let fabSpeedDialMiniButton of fabSpeedDialMiniButtons\"\n            mat-mini-fab\n            matTooltipPosition=\"before\"\n            [matTooltip]=\"fabSpeedDialMiniButton.tooltip\"\n            (click)=\"actionsClick.emit(fabSpeedDialMiniButton.key)\"\n            [routerLink]=\"fabSpeedDialMiniButton.router_link || []\"\n            [queryParams]=\"fabSpeedDialMiniButton.query_params || queryParams\"\n            >\n            <mat-icon *ngIf=\"fabSpeedDialMiniButton.icon.type === 'svg-icon'\" [svgIcon]=\"fabSpeedDialMiniButton.icon.name\"></mat-icon>\n            <mat-icon *ngIf=\"fabSpeedDialMiniButton.icon.type === 'mat-icon'\">{{ fabSpeedDialMiniButton.icon.name }}</mat-icon>\n        </button>\n    </eco-fab-speed-dial-actions>\n</eco-fab-speed-dial>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        FabSpeedDialComponent.ctorParameters = function () {
            return [
                { type: router.ActivatedRoute }
            ];
        };
        FabSpeedDialComponent.propDecorators = {
            animationMode: [{ type: core.Input }],
            tooltip: [{ type: core.Input }],
            spin: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            routerLink: [{ type: core.Input }],
            queryParams: [{ type: core.Input }],
            fabSpeedDialMiniButtons: [{ type: core.Input }],
            fabSpeedDialClick: [{ type: core.Output }],
            actionsClick: [{ type: core.Output }]
        };
        return FabSpeedDialComponent;
    }());

    var FabSpeedDialMiniButton = /** @class */ (function () {
        function FabSpeedDialMiniButton(key, tooltip$$1, router_link, query_params) {
            this.navigate = false;
            this.icon = { name: 'add', type: 'mat-icon' };
            this.key = key;
            this.tooltip = tooltip$$1;
            if (router_link) {
                this.router_link = router_link;
                this.query_params = query_params || {};
            }
        }
        FabSpeedDialMiniButton.prototype.setRouterLink = function (router_link) {
            this.router_link = router_link;
            this.navigate = true;
            return this;
        };
        FabSpeedDialMiniButton.prototype.getRouterLink = function () {
            return this.router_link;
        };
        FabSpeedDialMiniButton.prototype.setQueryParams = function (query_params) {
            this.query_params = query_params;
            return this;
        };
        FabSpeedDialMiniButton.prototype.getQueryParams = function () {
            return this.query_params;
        };
        FabSpeedDialMiniButton.prototype.shouldNavigate = function () {
            return this.navigate;
        };
        return FabSpeedDialMiniButton;
    }());

    var FabSpeedDialModule = /** @class */ (function () {
        function FabSpeedDialModule() {
        }
        FabSpeedDialModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, router.RouterModule, fabSpeedDial.EcoFabSpeedDialModule, icon.MatIconModule, tooltip.MatTooltipModule, button.MatButtonModule],
                        declarations: [FabSpeedDialComponent],
                        exports: [FabSpeedDialComponent]
                    },] },
        ];
        return FabSpeedDialModule;
    }());

    /***
     * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var JamRefreshService = /** @class */ (function () {
        function JamRefreshService() {
            this.collection_to_refresh = new rxjs.Subject();
            this.refreshSubject = new rxjs.Subject();
        }
        JamRefreshService.prototype.refresh = function () {
            this.refreshSubject.next(true);
        };
        JamRefreshService.decorators = [
            { type: core.Injectable },
        ];
        return JamRefreshService;
    }());
    var RefreshComponent = /** @class */ (function () {
        function RefreshComponent(changeDetectorRef, jamRefreshService) {
            this.changeDetectorRef = changeDetectorRef;
            this.jamRefreshService = jamRefreshService;
            this.colorProgressCircular = 'white';
            this.reload = new core.EventEmitter();
            this.destroyer = new Destroyer();
        }
        RefreshComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.collectionToRefresh) {
                this.jamRefreshService.collection_to_refresh.pipe(this.destroyer.pipe()).subscribe(function (collection) {
                    _this.collectionToRefresh = collection;
                    _this.changeDetectorRef.detectChanges();
                });
            }
        };
        RefreshComponent.prototype.ngOnDestroy = function () {
            this.destroyer.destroy();
        };
        RefreshComponent.prototype.refreshCollection = function () {
            this.serviceToRefresh.clearCacheMemory();
            this.jamRefreshService.refresh();
        };
        RefreshComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-refresh',
                        template: "<button\n    *ngIf=\"collectionToRefresh\"\n    mat-icon-button\n    matTooltip=\"Actualizar\"\n    mat-ink-ripple=\"false\"\n    class=\"mat-icon-button mat-button\"\n    (click)=\"refreshCollection()\"\n    fxLayout=\"row\"\n    fxLayoutAlign=\"center center\"\n    >\n    <mat-icon\n        *ngIf=\"!collectionToRefresh.is_loading\"\n        class=\"material-icons\"\n        >\n        {{ icon || 'refresh' }}\n    </mat-icon>\n    <mat-spinner\n        class=\"material-icons elements-up padding-0 margin-0\"\n        *ngIf=\"collectionToRefresh.is_loading\"\n        color=\"accent\"\n        diameter=\"24\"\n        >\n    </mat-spinner>\n</button>\n"
                    },] },
        ];
        /** @nocollapse */
        RefreshComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef },
                { type: JamRefreshService }
            ];
        };
        RefreshComponent.propDecorators = {
            collectionToRefresh: [{ type: core.Input }],
            serviceToRefresh: [{ type: core.Input }],
            colorProgressCircular: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            reload: [{ type: core.Output }]
        };
        return RefreshComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamRefreshModule = /** @class */ (function () {
        function JamRefreshModule() {
        }
        JamRefreshModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatProgressSpinnerModule,
                            material.MatButtonModule,
                            material.MatTooltipModule,
                            flexLayout.FlexLayoutModule,
                            material.MatIconModule
                        ],
                        providers: [JamRefreshService],
                        declarations: [RefreshComponent],
                        exports: [RefreshComponent]
                    },] },
        ];
        return JamRefreshModule;
    }());

    var MenuElement = /** @class */ (function () {
        function MenuElement(id) {
            this.attributes = {};
            this._id = id;
        }
        Object.defineProperty(MenuElement.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        MenuElement.prototype.setAttributes = function (attribute, value) {
            this.attributes[attribute] = value;
            return this;
        };
        MenuElement.prototype.addAttributes = function (attributes) {
            this.attributes = __assign({}, this.attributes, attributes);
            return this;
        };
        MenuElement.prototype.hide = function () {
            this.attributes.hidden = true;
            return this;
        };
        MenuElement.prototype.show = function () {
            this.attributes.hidden = false;
            return this;
        };
        MenuElement.prototype.isShown = function () {
            return !this.attributes.hidden;
        };
        MenuElement.prototype.disable = function () {
            this.attributes.disabled = true;
            return this;
        };
        MenuElement.prototype.enable = function () {
            this.attributes.disabled = false;
            return this;
        };
        return MenuElement;
    }());
    var MenuElementsCollection = /** @class */ (function () {
        function MenuElementsCollection(id) {
            this.data = [];
            this._id = id;
        }
        Object.defineProperty(MenuElementsCollection.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        MenuElementsCollection.prototype.hide = function () {
            this.hidden = true;
            return this;
        };
        MenuElementsCollection.prototype.show = function () {
            this.hidden = false;
            return this;
        };
        MenuElementsCollection.prototype.isShown = function () {
            return !this.hidden;
        };
        MenuElementsCollection.prototype.find = function (id) {
            var _this = this;
            return this.data.find(function (element) {
                if (_this.data.length === 0) {
                    console.log('--------------- no data! ---------------');
                    return false;
                }
                return element.id === id;
            });
        };
        MenuElementsCollection.prototype.add = function (data) {
            this.data = this.data.concat(data);
            return this;
        };
        return MenuElementsCollection;
    }());

    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.data = [];
            _this.findSection = _this.find;
            _this.addSections = _this.add;
            return _this;
        }
        Menu.prototype.removeEmptySections = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var section = _c.value;
                    if (section.hasShownElements()) {
                        return true;
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            return false;
        };
        Menu.prototype.setMainImage = function (image_data) {
            this.main_image = image_data;
            return this;
        };
        return Menu;
    }(MenuElementsCollection));

    var Section = /** @class */ (function (_super) {
        __extends(Section, _super);
        function Section() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.findButton = _this.find;
            _this.addButtons = _this.add;
            return _this;
        }
        Section.prototype.hasShownElements = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var element = _c.value;
                    if (element.isShown()) {
                        return true;
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            return false;
        };
        return Section;
    }(MenuElementsCollection));

    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.attributes = {
                icon: '',
                label: '',
                class: '',
                disabled: false,
                hidden: false
            };
            return _this;
        }
        Button.prototype.setAttributes = function (attribute, // TODO: improve typing
        value) {
            this.attributes[attribute] = value;
            return this;
        };
        Button.prototype.addAttributes = function (attributes) {
            this.attributes = __assign({}, this.attributes, attributes);
            return this;
        };
        return Button;
    }(MenuElement));

    var DropdownMenuComponent = /** @class */ (function () {
        function DropdownMenuComponent() {
            this.selected = new core.EventEmitter();
        }
        DropdownMenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-dropdown-menu',
                        styles: ["/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}"],
                        template: "<button\n    mat-icon-button\n    class=\"mat-icon-button mat-button\"\n    matTooltip=\"M\u00E1s\"\n    fxLayout=\"row\"\n    fxLayoutAlign=\"center center\"\n    [matMenuTriggerFor]=\"menuRef\"\n    >\n    <img\n        *ngIf=\"main_image\"\n        [src]=\"main_image?.url\"\n        [ngStyle]=\"main_image?.styles\"\n        />\n    <mat-icon *ngIf=\"!main_image\">more_vert</mat-icon>\n</button>\n\n<mat-menu #menuRef=\"matMenu\">\n    <ng-container *ngFor=\"let section of sections; let position = index\">\n        <mat-divider *ngIf=\"section.hasShownElements() && !section.hidden && position > 0\"></mat-divider>\n\n        <h3 class=\"mat-hint\" *ngIf=\"section.hasShownElements() && !section.hidden && section.id\">\n            <span [innerHtml]=\"section.id\"></span>\n        </h3>\n\n        <ng-container *ngFor=\"let button of section.data\">\n            <button\n                mat-menu-item\n                *ngIf=\"!button.attributes.hidden\"\n                [disabled]=\"button.attributes.disabled\"\n                [ngClass]=\"button.attributes.class\"\n                (click)=\"selected.emit(button.id)\"\n                >\n                <mat-icon\n                    *ngIf=\"button.attributes.icon\"\n                    [innerHtml]=\"button.attributes.icon\"\n                    >\n                </mat-icon>\n                <mat-icon\n                    *ngIf=\"button.attributes.svg_icon\"\n                    [svgIcon]=\"button.attributes.svg_icon\"\n                    >\n                </mat-icon>\n                <span [innerHtml]=\"button.attributes.label\"></span>\n            </button>\n        </ng-container>\n    </ng-container>\n</mat-menu>\n"
                    },] },
        ];
        DropdownMenuComponent.propDecorators = {
            sections: [{ type: core.Input }],
            main_image: [{ type: core.Input }],
            selected: [{ type: core.Output }]
        };
        return DropdownMenuComponent;
    }());

    var BottomSheetComponent = /** @class */ (function () {
        function BottomSheetComponent(data, matBottomSheetRef) {
            this.data = data;
            this.matBottomSheetRef = matBottomSheetRef;
        }
        BottomSheetComponent.prototype.close = function () {
            this.matBottomSheetRef.dismiss();
        };
        BottomSheetComponent.prototype.selected = function (option) {
            this.matBottomSheetRef.dismiss(option);
        };
        BottomSheetComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-bottom-sheet',
                        styles: ["/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}"],
                        template: "<ng-template matMenuContent>\n    <mat-nav-list>\n        <ng-container *ngFor=\"let section of data.sections; let position = index\">\n            <h3 class=\"mat-hint\" *ngIf=\"!section.hidden || section.id\">\n                <span [innerHtml]=\"section.id\"></span>\n            </h3>\n\n            <ng-container *ngFor=\"let button of section.data\">\n                <mat-list-item *ngIf=\"!button.attributes.hidden\"\n                    [ngClass]=\"button.attributes.class + (button.attributes.disabled ? 'disabled' : null)\"\n                    (click)=\"button.attributes.disabled ? $event.stopPropagation() : selected(button.id)\">\n                    <mat-icon\n                        *ngIf=\"button.attributes.icon || button.attributes.svg_icon\"\n                        [innerHtml]=\"button.attributes.icon\"\n                        [svgIcon]=\"button.attributes.svg_con\"\n                         class=\"mat-hint\"\n                        >\n                    </mat-icon>\n                    <span mat-line [innerHtml]=\"button.attributes.label\"></span>\n                </mat-list-item>\n            </ng-container>\n\n            <mat-divider *ngIf=\"(position + 1) < data.sections.length\"></mat-divider>\n        </ng-container>\n    </mat-nav-list>\n</ng-template>\n"
                    },] },
        ];
        /** @nocollapse */
        BottomSheetComponent.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_BOTTOM_SHEET_DATA,] }] },
                { type: material.MatBottomSheetRef }
            ];
        };
        return BottomSheetComponent;
    }());

    var MenuComponent = /** @class */ (function () {
        function MenuComponent(matBottomSheet) {
            this.matBottomSheet = matBottomSheet;
            this.selected = new core.EventEmitter();
            this.destroyer = new Destroyer();
        }
        MenuComponent.prototype.ngOnInit = function () {
            if (this.menu.main_image && !this.menu.main_image.styles) {
                this.menu.main_image.styles = { 'border-radius': '100px', width: '40px', height: '40px' };
            }
            this.menu.removeEmptySections();
        };
        MenuComponent.prototype.ngOnDestroy = function () {
            this.destroyer.destroy();
        };
        MenuComponent.prototype.open = function () {
            var _this = this;
            this.matBottomSheet.open(BottomSheetComponent, {
                data: { sections: this.menu.data }
            })
                .afterDismissed()
                .pipe(this.destroyer.pipe(), operators.filter(function (response) { return ![null, undefined, ''].includes(response); }))
                .subscribe(function (response) { return _this.selected.emit(_this.formatEmission(response)); });
        };
        MenuComponent.prototype.selectedOption = function (selected) {
            this.selected.emit(this.formatEmission(selected));
        };
        MenuComponent.prototype.formatEmission = function (response) {
            return { key: response, data: this.source_data || null };
        };
        MenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-menu',
                        styles: ["/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}"],
                        template: "<jam-dropdown-menu\n    [sections]=\"menu.data\"\n    [main_image]=\"menu.main_image\"\n    (selected)=\"selectedOption($event)\"\n></jam-dropdown-menu>\n\n<div class=\"jam-bottom-sheet\">\n    <button\n        mat-icon-button\n        class=\"mat-button mat-icon-button\"\n        matTooltip=\"M\u00E1s\"\n        fxLayout=\"row\"\n        fxLayoutAlign=\"center center\"\n        (click)=\"open()\">\n        <img *ngIf=\"menu.main_image?.url\" [src]=\"menu.main_image?.url\" [ngStyle]=\"menu.main_image?.styles\"/>\n        <mat-icon *ngIf=\"!menu.main_image?.url\">more_vert</mat-icon>\n    </button>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        MenuComponent.ctorParameters = function () {
            return [
                { type: material.MatBottomSheet }
            ];
        };
        MenuComponent.propDecorators = {
            menu: [{ type: core.Input }],
            source_data: [{ type: core.Input }],
            selected: [{ type: core.Output }]
        };
        return MenuComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamMenuModule = /** @class */ (function () {
        function JamMenuModule() {
        }
        JamMenuModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            flexLayout.FlexLayoutModule,
                            material.MatMenuModule,
                            material.MatIconModule,
                            material.MatListModule,
                            material.MatDividerModule,
                            material.MatTooltipModule,
                            material.MatBottomSheetModule,
                            common.CommonModule
                        ],
                        declarations: [MenuComponent, DropdownMenuComponent, BottomSheetComponent],
                        entryComponents: [BottomSheetComponent],
                        exports: [MenuComponent]
                    },] },
        ];
        return JamMenuModule;
    }());

    /** This's component @deprecated */
    var FloatingButtonComponent = /** @class */ (function () {
        function FloatingButtonComponent() {
        }
        FloatingButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-floating-button',
                        styles: ["a.mat-fab{position:fixed;bottom:24px;right:24px;z-index:333}"],
                        template: "<a\n    mat-fab href\n    *ngIf=\"show || true\"\n    [matTooltip]=\"tooltip\"\n    matTooltipPosition=\"before\"\n    [target]=\"target || '_self'\"\n    [routerLink]=\"rsRouterLink\"\n    [queryParams]=\"rsQueryParams\">\n    <mat-icon style=\"color: white\">{{ iconName ? iconName : 'add' }}</mat-icon>\n</a>\n"
                    },] },
        ];
        FloatingButtonComponent.propDecorators = {
            rsBackground: [{ type: core.Input }],
            iconName: [{ type: core.Input }],
            tooltip: [{ type: core.Input }],
            target: [{ type: core.Input }],
            rsRouterLink: [{ type: core.Input }],
            rsQueryParams: [{ type: core.Input }]
        };
        return FloatingButtonComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamFloatingButtonModule = /** @class */ (function () {
        function JamFloatingButtonModule() {
        }
        JamFloatingButtonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatButtonModule,
                            router.RouterModule,
                            material.MatTooltipModule,
                            material.MatIconModule
                        ],
                        declarations: [FloatingButtonComponent],
                        exports: [FloatingButtonComponent]
                    },] },
        ];
        return JamFloatingButtonModule;
    }());

    var DynamicInput = /** @class */ (function () {
        function DynamicInput(key) {
            this.key = this.id = this.name = key;
        }
        DynamicInput.prototype.setFocus = function () {
            this.focus = true;
            return this;
        };
        DynamicInput.prototype.required = function () {
            this.templateOptions.required = true;
            return this;
        };
        DynamicInput.prototype.fxFlex = function (value) {
            this.templateOptions.fxFlex = value;
            return this;
        };
        DynamicInput.prototype.set = function (property, value) {
            this[property] = value;
            return this;
        };
        DynamicInput.prototype.setTemplateOption = function (property, value) {
            this.templateOptions[property] = value;
            return this;
        };
        DynamicInput.prototype.addTemplateOptions = function (template_options) {
            this.templateOptions = __assign({}, this.templateOptions, template_options);
            return this;
        };
        DynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
            return this;
        };
        DynamicInput.prototype.load = function (fieldConfig) {
            for (var key in fieldConfig) {
                this[key] = fieldConfig[key];
            }
            return this;
        };
        return DynamicInput;
    }());
    var TextDynamicInput = /** @class */ (function (_super) {
        __extends(TextDynamicInput, _super);
        function TextDynamicInput(key) {
            var _this = _super.call(this, key) || this;
            _this.key = key;
            _this.type = 'input';
            _this.templateOptions = {
                placeholder: key
            };
            return _this;
        }
        TextDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
            this.templateOptions.placeholder = translateService.instant(this.key);
            return this;
        };
        return TextDynamicInput;
    }(DynamicInput));
    var NumberDynamicInput = /** @class */ (function (_super) {
        __extends(NumberDynamicInput, _super);
        function NumberDynamicInput(key) {
            var _this = _super.call(this, key) || this;
            _this.key = key;
            _this.type = 'input';
            _this.key = _this.id = _this.name = key;
            _this.templateOptions = {
                type: 'number',
                step: 0.01,
                min: 0,
                placeholder: key
            };
            return _this;
        }
        NumberDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
            this.templateOptions.placeholder = translateService.instant(this.key);
            return this;
        };
        return NumberDynamicInput;
    }(DynamicInput));
    var CheckboxDynamicInput = /** @class */ (function (_super) {
        __extends(CheckboxDynamicInput, _super);
        function CheckboxDynamicInput(key) {
            var _this = _super.call(this, key) || this;
            _this.key = key;
            _this.type = 'checkbox';
            _this.templateOptions = {
                indeterminate: false,
                label: key
            };
            return _this;
        }
        CheckboxDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
            this.templateOptions.label = translateService.instant(this.key);
            return this;
        };
        return CheckboxDynamicInput;
    }(DynamicInput));
    var TextareaDynamicInput = /** @class */ (function (_super) {
        __extends(TextareaDynamicInput, _super);
        function TextareaDynamicInput(key) {
            var _this = _super.call(this, key) || this;
            _this.key = key;
            _this.type = 'textarea';
            _this.templateOptions = {
                matAutosizeMinRows: 2,
                matAutosizeMaxRows: 150,
                label: key
            };
            return _this;
        }
        TextareaDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
            this.templateOptions.placeholder = translateService.instant(this.key);
            this.templateOptions.label = translateService.instant(this.key);
            return this;
        };
        return TextareaDynamicInput;
    }(DynamicInput));
    var SelectDynamicInput = /** @class */ (function (_super) {
        __extends(SelectDynamicInput, _super);
        function SelectDynamicInput(key) {
            var _this = _super.call(this, key) || this;
            _this.key = key;
            _this.type = 'select';
            _this.templateOptions = {
                label: key,
                options: []
            };
            return _this;
        }
        SelectDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
            this.templateOptions.label = translateService.instant(this.key);
            return this;
        };
        SelectDynamicInput.prototype.setOptions = function (options) {
            this.templateOptions.options = options;
            return this;
        };
        return SelectDynamicInput;
    }(DynamicInput));

    var FormlyFormFlexComponent = /** @class */ (function (_super) {
        __extends(FormlyFormFlexComponent, _super);
        function FormlyFormFlexComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormlyFormFlexComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-formly-form-flex',
                        template: "\n      <formly-field *ngFor=\"let field of fields\"\n        [fxFlex]=\"field.templateOptions.fxFlex\"\n        [model]=\"model\" [form]=\"form\"\n        [field]=\"field\"\n        [ngClass]=\"field.className\"\n        [options]=\"options\">\n      </formly-field>\n      <ng-content></ng-content>\n  "
                    },] },
        ];
        return FormlyFormFlexComponent;
    }(core$1.FormlyForm));

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamDynamicFormsModule = /** @class */ (function () {
        function JamDynamicFormsModule() {
        }
        JamDynamicFormsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            flexLayout.FlexLayoutModule,
                            core$1.FormlyModule.forRoot(),
                            material$1.FormlyMaterialModule
                        ],
                        declarations: [FormlyFormFlexComponent],
                        exports: [FormlyFormFlexComponent]
                    },] },
        ];
        return JamDynamicFormsModule;
    }());

    var JamTabsDirective = /** @class */ (function () {
        function JamTabsDirective(router$$1, activatedRoute) {
            var _this = this;
            this.router = router$$1;
            this.activatedRoute = activatedRoute;
            this.defaultTabIndex = 0;
            activatedRoute.queryParams.subscribe(function (queryParams) { return _this.query_params = queryParams; });
        }
        JamTabsDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.selected_tab = this.tabNames[this.query_params.tab_selected || Object.keys(this.tabNames)[this.defaultTabIndex]];
            this.tabGroup.selectedIndex = this.selected_tab;
            this.tabGroup.selectedIndexChange.subscribe(function (index) { return _this.onTabChange(index); });
        };
        JamTabsDirective.prototype.onTabChange = function (new_index) {
            var tab_selected;
            for (var each in this.tabNames) {
                if (this.tabNames[each] !== new_index)
                    continue;
                tab_selected = each;
            }
            this.router.navigate([], { queryParams: __assign({}, this.query_params, { tab_selected: tab_selected }) });
        };
        JamTabsDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[jamTabs]'
                    },] },
        ];
        /** @nocollapse */
        JamTabsDirective.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: router.ActivatedRoute }
            ];
        };
        JamTabsDirective.propDecorators = {
            tabNames: [{ type: core.Input }],
            tabGroup: [{ type: core.Input }],
            defaultTabIndex: [{ type: core.Input }]
        };
        return JamTabsDirective;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamTabsModule = /** @class */ (function () {
        function JamTabsModule() {
        }
        JamTabsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            tabs.MatTabsModule,
                            common.CommonModule
                        ],
                        declarations: [JamTabsDirective],
                        exports: [JamTabsDirective]
                    },] },
        ];
        return JamTabsModule;
    }());

    var RemembermeStateDirective = /** @class */ (function () {
        function RemembermeStateDirective(router$$1, elementRef) {
            this.router = router$$1;
            this.elementRef = elementRef;
            this.mat_expansion_pane_id = elementRef.nativeElement.id;
        }
        RemembermeStateDirective.prototype.ngAfterViewInit = function () {
            if (localStorage.getItem(this.mat_expansion_pane_id)) {
                this.mat_expansion_panel.expanded = localStorage.getItem(this.mat_expansion_pane_id);
            }
            this.changeExpandedExpansionPanel();
        };
        RemembermeStateDirective.prototype.onClick = function (event) {
            this.updateLocalStoreage();
        };
        RemembermeStateDirective.prototype.changeExpandedExpansionPanel = function () {
            this.updateLocalStoreage();
        };
        RemembermeStateDirective.prototype.updateLocalStoreage = function () {
            localStorage.setItem(this.mat_expansion_pane_id, this.mat_expansion_panel.expanded);
        };
        RemembermeStateDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[jamExpansionPanelStatus]'
                    },] },
        ];
        /** @nocollapse */
        RemembermeStateDirective.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: core.ElementRef }
            ];
        };
        RemembermeStateDirective.propDecorators = {
            mat_expansion_panel: [{ type: core.ContentChild, args: [material.MatExpansionPanel,] }],
            onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }]
        };
        return RemembermeStateDirective;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamRememberStateModule = /** @class */ (function () {
        function JamRememberStateModule() {
        }
        JamRememberStateModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            material.MatExpansionModule,
                            common.CommonModule,
                            router.RouterModule
                        ],
                        declarations: [RemembermeStateDirective],
                        exports: [RemembermeStateDirective]
                    },] },
        ];
        return JamRememberStateModule;
    }());

    var FloatingInputComponent = /** @class */ (function () {
        function FloatingInputComponent(router$$1) {
            this.router = router$$1;
            this.entryValueChange = new core.EventEmitter();
            this.resourceChange = new core.EventEmitter();
            this.searchParams = router$$1.parseUrl(router$$1.url);
            this.lock = this.lock || false;
        }
        FloatingInputComponent.prototype.statusToggle = function (status) {
            var _this = this;
            if (!this.lock) {
                this.status = status;
                setTimeout(function () {
                    if (!status) {
                        return;
                    }
                    _this.focusInput();
                }, 100);
            }
        };
        FloatingInputComponent.prototype.bindingEntryValue = function (value) {
            this.entryValueChange.emit(value);
        };
        FloatingInputComponent.prototype.keyPress = function (keyCode) {
            switch (keyCode) {
                case 13:
                    this.status = false;
                    break;
            }
        };
        FloatingInputComponent.prototype.focusInput = function () {
            var input$$1 = document.getElementById('floatingInput');
            input$$1.focus();
        };
        FloatingInputComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-floating-input',
                        styles: ["mat-expansion-panel{width:auto;box-shadow:none!important;background:inherit!important;border:0!important}mat-form-field{width:100%}input[type^=number]{text-align:end}"],
                        template: "<div class=\"floating-input\" [ngClass]=\"status ? 'mat-elevation-z1' : ''\">\n    <mat-expansion-panel\n        hideToggle=\"true\"\n        style=\"width: auto; box-shadow: none !important; background: inherit !important; border: 0 !important;\"\n        [disabled]=\"lock\"\n        [expanded]=\"status\"\n        (closed)=\"statusToggle(false)\"\n        (opened)=\"statusToggle(true)\">\n        <mat-expansion-panel-header *ngIf=\"!status\">\n            <mat-panel-title fxLayout=\"row\" [fxLayoutAlign]=\"(horPosition || 'end')\">\n                <ng-content></ng-content>\n            </mat-panel-title>\n        </mat-expansion-panel-header>\n\n        <mat-form-field *ngIf=\"status\">\n            <input matInput id=\"floatingInput\" type=\"number\" step=\"0.001\" name=\"floatingNumber\" aria-label=\"Modificar\"\n                [(ngModel)]=\"entryValue\"\n                (blur)=\"statusToggle(false)\"\n                (ngModelChange)=\"bindingEntryValue(entryValue)\"\n                (keydown)=\"keyPress($event.keyCode)\"\n                (focus)=\"status\">\n        </mat-form-field>\n    </mat-expansion-panel>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        FloatingInputComponent.ctorParameters = function () {
            return [
                { type: router.Router }
            ];
        };
        FloatingInputComponent.propDecorators = {
            entryValue: [{ type: core.Input }],
            resource: [{ type: core.Input }],
            horPosition: [{ type: core.Input }],
            lock: [{ type: core.Input }],
            entryValueChange: [{ type: core.Output }],
            resourceChange: [{ type: core.Output }]
        };
        return FloatingInputComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamFloatingInputModule = /** @class */ (function () {
        function JamFloatingInputModule() {
        }
        JamFloatingInputModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            material.MatFormFieldModule,
                            material.MatExpansionModule,
                            material.MatInputModule,
                            material.MatCardModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            flexLayout.FlexLayoutModule,
                            common.CommonModule
                        ],
                        declarations: [FloatingInputComponent],
                        exports: [FloatingInputComponent]
                    },] },
        ];
        return JamFloatingInputModule;
    }());

    /***
     * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var FilterConfig = /** @class */ (function () {
        function FilterConfig() {
        }
        return FilterConfig;
    }());

    var JsonapiFilterRangedateConfig = /** @class */ (function (_super) {
        __extends(JsonapiFilterRangedateConfig, _super);
        function JsonapiFilterRangedateConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.attribute = 'date';
            _this.options = {};
            _this.selected = { since: '', until: '' };
            return _this;
        }
        JsonapiFilterRangedateConfig.prototype.setProperty = function (property_name, property_value) {
            this[property_name] = property_value;
            return this;
        };
        return JsonapiFilterRangedateConfig;
    }(FilterConfig));

    /***
     * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
     *
     * This file is part of Multinexo. Multinexo can not be copied and/or
     * distributed without the express permission of Reyesoft
     */
    var JamFilterOptionsComponent = /** @class */ (function () {
        function JamFilterOptionsComponent() {
            this.remoteFilterChange = new core.EventEmitter();
        }
        JamFilterOptionsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.filterConfigArray = Object.keys(this.filterConfig.options).map(function (key) {
                _this.filterConfig.options[key].text = { key: key, name: _this.filterConfig.options[key].text };
                return _this.filterConfig.options[key];
            });
        };
        JamFilterOptionsComponent.prototype.optionSelected = function (jsonvalue, filter_list) {
            this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
            this.remoteFilterChange.emit(this.remoteFilter);
        };
        JamFilterOptionsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-filter-options',
                        template: "<mat-form-field color=\"primary\" floatLabel=\"never\">\n    <mat-select\n        [(ngModel)]=\"filterConfig.selected\"\n        [placeholder]=\"filterConfig.title\">\n        <mat-option *ngFor=\"let config of filterConfigArray\"\n            [value]=\"config.text.key\"\n            (click)=\"optionSelected(config, filterConfig.selected)\">{{ config.text.name }}\n        </mat-option>\n    </mat-select>\n</mat-form-field>\n"
                    },] },
        ];
        JamFilterOptionsComponent.propDecorators = {
            filterConfig: [{ type: core.Input }],
            remoteFilter: [{ type: core.Input }],
            remoteFilterChange: [{ type: core.Output }]
        };
        return JamFilterOptionsComponent;
    }());

    var JamFilterChecksComponent = /** @class */ (function () {
        function JamFilterChecksComponent() {
            this.filterConfigChange = new core.EventEmitter();
            this.remoteFilterChange = new core.EventEmitter();
            this.searchText = '';
            this.show_input_search = false;
        }
        JamFilterChecksComponent.prototype.ngOnInit = function () {
            if (this.filterConfig.selected.length !== 0) {
                this.remoteFilter[this.filterConfig.attribute] = this.filterConfig.selected;
            }
            this.filterConfigOptionsUpdate();
            this.filter_config_options = this.filter_config_options.sort(function (a, b) { return a.text.name.localeCompare(b.text.name); });
            this.showInputSearch();
        };
        JamFilterChecksComponent.prototype.showInputSearch = function () {
            if (Object.keys(this.filterConfig.options).length > 10) {
                this.show_input_search = true;
            }
        };
        JamFilterChecksComponent.prototype.filterConfigOptionsUpdate = function () {
            var _this = this;
            this.filter_config_options = Object.keys(this.filterConfig.options).map(function (key) {
                if (typeof _this.filterConfig.options[key].text === 'string') {
                    _this.filterConfig.options[key].text = { key: key, name: _this.filterConfig.options[key].text };
                }
                return _this.filterConfig.options[key];
            });
        };
        JamFilterChecksComponent.prototype.clearSelected = function () {
            this.filterConfig.selected = [];
        };
        JamFilterChecksComponent.prototype.optionSelected = function (jsonvalue, filter_list) {
            this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
            this.remoteFilterChange.emit(this.remoteFilter);
        };
        JamFilterChecksComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-filter-checks',
                        template: "<mat-form-field color=\"primary\" floatLabel=\"never\">\n    <mat-select\n        multiple\n        [(ngModel)]=\"filterConfig.selected\"\n        (focus)=\"filterConfigOptionsUpdate()\"\n        [placeholder]=\"filterConfig.title\">\n        <div mat-menu-item class=\"focus-element-4dp reset-input-default\"\n            *ngIf=\"filter_config_options.length > 10\"\n            fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"10\"\n            (click)=\"$event.stopPropagation()\">\n            <mat-icon>search</mat-icon>\n            <input fxFlex class=\"rs-input\" tabindex=\"1\" autofocus placeholder=\"Buscar\"\n                [(ngModel)]=\"searchText\">\n            <div style=\"height: 24px; width: 24px\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                <mat-icon *ngIf=\"searchText\" (click)=\"searchText = ''\">clear</mat-icon>\n            </div>\n        </div>\n        <mat-divider></mat-divider>\n        <mat-option *ngFor=\"let option of filter_config_options | filter: searchText\"\n            [value]=\"option.text.key\"\n            (click)=\"optionSelected(option, filterConfig.selected)\">{{ option.text.name }}\n        </mat-option>\n    </mat-select>\n</mat-form-field>\n"
                    },] },
        ];
        JamFilterChecksComponent.propDecorators = {
            filterConfig: [{ type: core.Input }],
            remoteFilter: [{ type: core.Input }],
            filterConfigChange: [{ type: core.Output }],
            remoteFilterChange: [{ type: core.Output }]
        };
        return JamFilterChecksComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamFilterModule = /** @class */ (function () {
        function JamFilterModule() {
        }
        JamFilterModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            common.CommonModule,
                            material.MatIconModule,
                            material.MatInputModule,
                            material.MatOptionModule,
                            material.MatSelectModule,
                            material.MatDividerModule,
                            flexLayout.FlexLayoutModule,
                            material.MatFormFieldModule,
                            JamSearchInputModule
                        ],
                        providers: [FilterPipe],
                        declarations: [JamFilterChecksComponent, JamFilterOptionsComponent],
                        exports: [JamFilterChecksComponent, JamFilterOptionsComponent]
                    },] },
        ];
        return JamFilterModule;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // tslint:disable: interface-name use-input-property-decorator use-host-property-decorator directive-selector
    /** Used to flag slide labels for use with the portal directive */
    var JamSlideElement = /** @class */ (function (_super) {
        __extends(JamSlideElement, _super);
        function JamSlideElement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JamSlideElement.decorators = [
            { type: core.Directive, args: [{
                        selector: '[jam-slide-element], [jamSlideElement]'
                    },] },
        ];
        return JamSlideElement;
    }(portal.CdkPortal));

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
    var JamSlideBase = /** @class */ (function () {
        function JamSlideBase() {
        }
        return JamSlideBase;
    }());
    var _JamSlideMixinBase = core$2.mixinDisabled(JamSlideBase);
    var JamSlide = /** @class */ (function (_super) {
        __extends(JamSlide, _super);
        function JamSlide(_viewContainerRef) {
            var _this = _super.call(this) || this;
            _this._viewContainerRef = _viewContainerRef;
            /**
             * Template provided in the slide content that will be used if present, used to enable lazy-loading
             */
            /** Plain text element for the slide, used when there is no template label. */
            _this.textLabel = '';
            /** Emits whenever the internal state of the slide changes. */
            _this._stateChanges = new rxjs.Subject();
            /**
             * The relatively indexed position where 0 represents the center, negative is left, and positive
             * represents the right.
             */
            _this.position = null;
            /**
             * The initial relatively index origin of the slide if it was created and selected after there
             * was already a selected slide. Provides context of what position the slide should originate from.
             */
            _this.origin = null;
            /**
             * Whether the slide is currently active.
             */
            _this.isActive = false;
            /** Portal that will be the hosted content of the slide */
            _this._contentPortal = null;
            return _this;
        }
        Object.defineProperty(JamSlide.prototype, "content", {
            /** @docs-private */
            get: function () {
                return this._contentPortal;
            },
            enumerable: true,
            configurable: true
        });
        JamSlide.prototype.ngOnChanges = function (changes) {
            if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
                this._stateChanges.next();
            }
        };
        JamSlide.prototype.ngOnDestroy = function () {
            this._stateChanges.complete();
        };
        JamSlide.prototype.ngOnInit = function () {
            this._contentPortal = new portal.TemplatePortal(this._explicitContent || this._implicitContent, this._viewContainerRef);
        };
        JamSlide.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-slide',
                        template: "<!-- Create a template for the content of the <jam-slide> so that we can grab a reference to this\n    TemplateRef and use it in a Portal to render the slide content in the appropriate place in the\n    slide-group. -->\n<ng-template><ng-content></ng-content></ng-template>\n",
                        inputs: ['disabled'],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        exportAs: 'jamSlide'
                    },] },
        ];
        /** @nocollapse */
        JamSlide.ctorParameters = function () {
            return [
                { type: core.ViewContainerRef }
            ];
        };
        JamSlide.propDecorators = {
            templateLabel: [{ type: core.ContentChild, args: [JamSlideElement,] }],
            textLabel: [{ type: core.Input, args: ['label',] }],
            ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
            ariaLabelledby: [{ type: core.Input, args: ['aria-labelledby',] }],
            _implicitContent: [{ type: core.ViewChild, args: [core.TemplateRef,] }]
        };
        return JamSlide;
    }(_JamSlideMixinBase));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // tslint:disable: interface-name use-input-property-decorator use-host-property-decorator component-selector
    /** Used to generate unique ID's for each slide component */
    var nextId = 0;
    /** A simple change event emitted on focus or selection changes. */
    var JamSlideChangeEvent = /** @class */ (function () {
        function JamSlideChangeEvent() {
        }
        return JamSlideChangeEvent;
    }());
    /** Injection token that can be used to provide the default options the slides module. */
    var MAT_TABS_CONFIG = new core.InjectionToken('MAT_TABS_CONFIG');
    // Boilerplate for applying mixins to JamSlideGroup.
    /** @docs-private */
    var JamSlideGroupBase = /** @class */ (function () {
        function JamSlideGroupBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return JamSlideGroupBase;
    }());
    var _JamSlideGroupMixinBase = core$2.mixinColor(core$2.mixinDisableRipple(JamSlideGroupBase), 'primary');
    /**
     * Material design slide-group component.  Supports basic slide pairs (label + content) and includes
     * animated ink-bar, keyboard navigation, and screen reader.
     * See: https://material.io/design/components/slides.html
     */
    var JamSlideGroup = /** @class */ (function (_super) {
        __extends(JamSlideGroup, _super);
        function JamSlideGroup(elementRef, _changeDetectorRef, defaultConfig) {
            var _this = _super.call(this, elementRef) || this;
            _this._changeDetectorRef = _changeDetectorRef;
            /** Output to enable support for two-way binding on `[(selectedIndex)]` */
            _this.selectedIndexChange = new core.EventEmitter();
            /** Event emitted when focus has changed within a slide group. */
            _this.focusChange = new core.EventEmitter();
            /** Event emitted when the body animation has completed */
            _this.animationDone = new core.EventEmitter();
            /** Event emitted when the slide selection has changed. */
            _this.selectedTabChange = new core.EventEmitter(true);
            /** Position of the slide header. */
            _this.headerPosition = 'above';
            /** The slide index that should be selected after the content has been checked. */
            _this._indexToSelect = 0;
            /** Snapshot of the height of the slide body wrapper before another slide is activated. */
            _this._slideBodyWrapperHeight = 0;
            /** Subscription to slides being added/removed. */
            _this._slidesSubscription = rxjs.Subscription.EMPTY;
            /** Subscription to changes in the slide labels. */
            _this._slideElementSubscription = rxjs.Subscription.EMPTY;
            _this._dynamicHeight = false;
            _this._selectedIndex = null;
            _this._groupId = nextId += 1;
            _this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
                defaultConfig.animationDuration : '500ms';
            return _this;
        }
        Object.defineProperty(JamSlideGroup.prototype, "dynamicHeight", {
            /** Whether the slide group should grow to the size of the active slide. */
            get: function () { return this._dynamicHeight; },
            set: function (value) { this._dynamicHeight = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JamSlideGroup.prototype, "selectedIndex", {
            /** The index of the active slide. */
            get: function () { return this._selectedIndex; },
            set: function (value) {
                this._indexToSelect = coercion.coerceNumberProperty(value, null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JamSlideGroup.prototype, "animationDuration", {
            /** Duration for the slide animation. Will be normalized to milliseconds if no units are set. */
            get: function () { return this._animationDuration; },
            set: function (value) {
                this._animationDuration = /^\d+$/.test(value) ? value + 'ms' : value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JamSlideGroup.prototype, "backgroundColor", {
            /** Background color of the slide group. */
            get: function () { return this._backgroundColor; },
            set: function (value) {
                var nativeElement = this._elementRef.nativeElement;
                nativeElement.classList.remove("mat-background-" + this.backgroundColor);
                if (value) {
                    nativeElement.classList.add("mat-background-" + value);
                }
                this._backgroundColor = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * After the content is checked, this component knows what slides have been defined
         * and what the selected index should be. This is where we can know exactly what position
         * each slide should be in according to the new selected index, and additionally we know how
         * a new selected slide should transition in (from the left or right).
         */
        JamSlideGroup.prototype.ngAfterContentChecked = function () {
            var _this = this;
            // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
            // the amount of slides changes before the actual change detection runs.
            var indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
            // If there is a change in selected index, emit a change event. Should not trigger if
            // the selected index has not yet been initialized.
            if (this._selectedIndex !== indexToSelect) {
                var isFirstRun_1 = !this._selectedIndex;
                if (!isFirstRun_1) {
                    this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
                }
                // Changing these values after change detection has run
                // since the checked content may contain references to them.
                Promise.resolve().then(function () {
                    _this._slides.forEach(function (slide, index) { return slide.isActive = index === indexToSelect; });
                    if (!isFirstRun_1) {
                        _this.selectedIndexChange.emit(indexToSelect);
                    }
                });
            }
            // Setup the position for each slide and optionally setup an origin on the next selected slide.
            this._slides.forEach(function (slide, index) {
                slide.position = index - indexToSelect;
                // If there is already a selected slide, then set up an origin for the next selected slide
                // if it doesn't have one already.
                if (!_this._selectedIndex && slide.position === 0 && !slide.origin) {
                    slide.origin = indexToSelect - _this._selectedIndex;
                }
            });
            if (this._selectedIndex !== indexToSelect) {
                this._selectedIndex = indexToSelect;
                this._changeDetectorRef.markForCheck();
            }
        };
        JamSlideGroup.prototype.ngAfterContentInit = function () {
            var _this = this;
            this._subscribeToTabLabels();
            // Subscribe to changes in the amount of slides, in order to be
            // able to re-render the content as new slides are added or removed.
            this._slidesSubscription = this._slides.changes.subscribe(function () {
                var indexToSelect = _this._clampTabIndex(_this._indexToSelect);
                // Maintain the previously-selected slide if a new slide is added or removed and there is no
                // explicit change that selects a different slide.
                if (indexToSelect === _this._selectedIndex) {
                    var slides = _this._slides.toArray();
                    for (var i = 0; i < slides.length; i += 1) {
                        if (slides[i].isActive) {
                            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                            // adding a slide within the `selectedIndexChange` event.
                            _this._indexToSelect = _this._selectedIndex = i;
                            break;
                        }
                    }
                }
                _this._subscribeToTabLabels();
                _this._changeDetectorRef.markForCheck();
            });
        };
        JamSlideGroup.prototype.ngOnDestroy = function () {
            this._slidesSubscription.unsubscribe();
            this._slideElementSubscription.unsubscribe();
        };
        /** Re-aligns the ink bar to the selected slide element. */
        // realignInkBar() {
        //   if (this._slideHeader) {
        //     this._slideHeader._alignInkBarToSelectedTab();
        //   }
        // }
        JamSlideGroup.prototype._focusChanged = function (index) {
            this.focusChange.emit(this._createChangeEvent(index));
        };
        /** Returns a unique id for each slide element element */
        JamSlideGroup.prototype._getTabLabelId = function (i) {
            return "jam-slide-element-" + this._groupId + "-" + i;
        };
        /** Returns a unique id for each slide content element */
        JamSlideGroup.prototype._getTabContentId = function (i) {
            return "jam-slide-content-" + this._groupId + "-" + i;
        };
        /**
         * Sets the height of the body wrapper to the height of the activating slide if dynamic
         * height property is true.
         */
        JamSlideGroup.prototype._setTabBodyWrapperHeight = function (slideHeight) {
            if (!this._dynamicHeight || !this._slideBodyWrapperHeight) {
                return;
            }
            var wrapper = this._slideBodyWrapper.nativeElement;
            wrapper.style.height = this._slideBodyWrapperHeight + 'px';
            // This conditional forces the browser to paint the height so that
            // the animation to the new height can have an origin.
            if (this._slideBodyWrapper.nativeElement.offsetHeight) {
                wrapper.style.height = slideHeight + 'px';
            }
        };
        /** Removes the height of the slide body wrapper. */
        JamSlideGroup.prototype._removeTabBodyWrapperHeight = function () {
            var wrapper = this._slideBodyWrapper.nativeElement;
            this._slideBodyWrapperHeight = wrapper.clientHeight;
            wrapper.style.height = '';
            this.animationDone.emit();
        };
        /** Handle click events, setting new selected index if appropriate. */
        JamSlideGroup.prototype._handleClick = function (slide, slideHeader, index) {
            if (!slide.disabled) {
                this.selectedIndex = slideHeader.focusIndex = index;
            }
        };
        /** Retrieves the slideindex for the slide. */
        JamSlideGroup.prototype._getTabIndex = function (slide, idx) {
            if (slide.disabled) {
                return null;
            }
            return this.selectedIndex === idx ? 0 : -1;
        };
        JamSlideGroup.prototype._createChangeEvent = function (index) {
            var event = new JamSlideChangeEvent();
            event.index = index;
            if (this._slides && this._slides.length) {
                event.slide = this._slides.toArray()[index];
            }
            return event;
        };
        /**
         * Subscribes to changes in the slide labels. This is needed, because the @Input for the element is
         * on the JamSlide component, whereas the data binding is inside the JamSlideGroup. In order for the
         * binding to be updated, we need to subscribe to changes in it and trigger change detection
         * manually.
         */
        JamSlideGroup.prototype._subscribeToTabLabels = function () {
            var _this = this;
            if (this._slideElementSubscription) {
                this._slideElementSubscription.unsubscribe();
            }
            this._slideElementSubscription = rxjs.merge.apply(void 0, __spread(this._slides.map(function (slide) { return slide._stateChanges; }))).subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
        };
        /** Clamps the given index to the bounds of 0 and the slides length. */
        JamSlideGroup.prototype._clampTabIndex = function (index) {
            // Note the `|| 0`, which ensures that values like NaN can't get through
            // and which would otherwise throw the component into an infinite loop
            // (since Math.max(NaN, 0) === NaN).
            return Math.min(this._slides.length - 1, Math.max(index || 0, 0));
        };
        JamSlideGroup.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-slide-group',
                        exportAs: 'jamSlideGroup',
                        template: "<jam-slide-header #slideHeader\n               [selectedIndex]=\"selectedIndex\"\n               [disableRipple]=\"disableRipple\"\n               (indexFocused)=\"_focusChanged($event)\"\n               (selectFocusedIndex)=\"selectedIndex = $event\">\n  <div class=\"jam-slide-element\" role=\"slide\" jamSlideElementWrapper mat-ripple cdkMonitorElementFocus\n       *ngFor=\"let slide of _slides; let i = index\"\n       [id]=\"_getTabLabelId(i)\"\n       [attr.tabIndex]=\"_getTabIndex(slide, i)\"\n       [attr.aria-posinset]=\"i + 1\"\n       [attr.aria-setsize]=\"_slides.length\"\n       [attr.aria-controls]=\"_getTabContentId(i)\"\n       [attr.aria-selected]=\"selectedIndex == i\"\n       [attr.aria-label]=\"slide.ariaLabel || null\"\n       [attr.aria-labelledby]=\"(!slide.ariaLabel && slide.ariaLabelledby) ? slide.ariaLabelledby : null\"\n       [class.jam-slide-element-active]=\"selectedIndex == i\"\n       [disabled]=\"slide.disabled\"\n       [matRippleDisabled]=\"slide.disabled || disableRipple\"\n       (click)=\"_handleClick(slide, slideHeader, i)\">\n\n\n    <div class=\"jam-slide-element-content\">\n      <!-- If there is a element template, use it. -->\n      <ng-template [ngIf]=\"slide.templateLabel\">\n        <ng-template [cdkPortalOutlet]=\"slide.templateLabel\"></ng-template>\n      </ng-template>\n\n      <!-- If there is not a element template, fall back to the text label. -->\n      <ng-template [ngIf]=\"!slide.templateLabel\">{{slide.textLabel}}</ng-template>\n    </div>\n  </div>\n</jam-slide-header>\n\n<!-- <div class=\"jam-slide-body-wrapper\" #slideBodyWrapper>\n  <jam-slide-body role=\"slidepanel\"\n               *ngFor=\"let slide of _slides; let i = index\"\n               [id]=\"_getTabContentId(i)\"\n               [attr.aria-labelledby]=\"_getTabLabelId(i)\"\n               [class.jam-slide-body-active]=\"selectedIndex == i\"\n               [content]=\"slide.content\"\n               [position]=\"slide.position\"\n               [origin]=\"slide.origin\"\n               [animationDuration]=\"animationDuration\"\n               (_onCentered)=\"_removeTabBodyWrapperHeight()\"\n               (_onCentering)=\"_setTabBodyWrapperHeight($event)\">\n  </jam-slide-body>\n</div> -->\n",
                        styles: ["@-webkit-keyframes cdk-text-field-autofill-start{/*!*/}@-webkit-keyframes cdk-text-field-autofill-end{/*!*/}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-card-title{font-size:24px;font-weight:500}.mat-card-header .mat-card-title{font-size:20px}.mat-card-content,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:14px;font-weight:500}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}@media print{.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28122em) scale(.75);transform:translateY(-1.28122em) scale(.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28121em) scale(.75);transform:translateY(-1.28121em) scale(.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.2812em) scale(.75);transform:translateY(-1.2812em) scale(.75)}}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-sub-label-error{font-weight:400}.mat-step-label-error{font-size:14px}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:8px;padding-bottom:8px}.mat-list-item,.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-list-base .mat-list-item{font-size:16px}.mat-list-base .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list-base .mat-list-option{font-size:16px}.mat-list-base .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list-base .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-list-base[dense] .mat-list-item{font-size:12px}.mat-list-base[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list-base[dense] .mat-list-option{font-size:12px}.mat-list-base[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list-base[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-nested-tree-node,.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden;position:relative}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;-webkit-transition:opacity,-webkit-transform cubic-bezier(0,0,.2,1);transition:opacity,transform cubic-bezier(0,0,.2,1),-webkit-transform cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}@media (-ms-high-contrast:active){.mat-ripple-element{display:none}}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:-webkit-box;display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:-webkit-box;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity .4s cubic-bezier(.25,.8,.25,1);transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.jam-slide-group{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.jam-slide-group.jam-slide-group-inverted-header{-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}.jam-slide-element{height:auto;padding:0 16px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;white-space:nowrap;position:relative}.jam-slide-element:focus{outline:0}.jam-slide-element:focus:not(.jam-slide-disabled){opacity:1}.jam-slide-element.jam-slide-disabled{cursor:default}.jam-slide-element .jam-slide-element-content{display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;white-space:nowrap}@media (-ms-high-contrast:active){.jam-slide-element:focus{outline:dotted 2px}.jam-slide-element.jam-slide-disabled{opacity:.5}.jam-slide-element{opacity:1}}@media (max-width:599px){.jam-slide-element{padding:0 12px}}@media (max-width:959px){.jam-slide-element{padding:0 12px}}.jam-slide-group[mat-stretch-slides]>.jam-slide-header .jam-slide-element{flex-basis:0;-webkit-box-flex:1;flex-grow:1}.jam-slide-body-wrapper{position:relative;overflow:hidden;display:-webkit-box;display:flex;-webkit-transition:height .5s cubic-bezier(.35,0,.25,1);transition:height .5s cubic-bezier(.35,0,.25,1)}.jam-slide-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.jam-slide-body.jam-slide-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;-webkit-box-flex:1;flex-grow:1}.jam-slide-group.jam-slide-group-dynamic-height .jam-slide-body.jam-slide-body-active{overflow-y:hidden}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        inputs: ['color', 'disableRipple'],
                        host: {
                            'class': 'jam-slide-group',
                            '[class.jam-slide-group-dynamic-height]': 'dynamicHeight',
                            '[class.jam-slide-group-inverted-header]': 'headerPosition === "below"'
                        }
                    },] },
        ];
        /** @nocollapse */
        JamSlideGroup.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.ChangeDetectorRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [MAT_TABS_CONFIG,] }, { type: core.Optional }] }
            ];
        };
        JamSlideGroup.propDecorators = {
            _slides: [{ type: core.ContentChildren, args: [JamSlide,] }],
            _slideBodyWrapper: [{ type: core.ViewChild, args: ['slideBodyWrapper',] }],
            _slideHeader: [{ type: core.ViewChild, args: ['slideHeader',] }],
            selectedIndexChange: [{ type: core.Output }],
            focusChange: [{ type: core.Output }],
            animationDone: [{ type: core.Output }],
            selectedTabChange: [{ type: core.Output }],
            headerPosition: [{ type: core.Input }],
            dynamicHeight: [{ type: core.Input }],
            selectedIndex: [{ type: core.Input }],
            animationDuration: [{ type: core.Input }],
            backgroundColor: [{ type: core.Input }]
        };
        return JamSlideGroup;
    }(_JamSlideGroupMixinBase));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Boilerplate for applying mixins to JamSlideElementWrapper.
    /** @docs-private */
    var JamSlideElementWrapperBase = /** @class */ (function () {
        function JamSlideElementWrapperBase() {
        }
        return JamSlideElementWrapperBase;
    }());
    var _JamSlideElementWrapperMixinBase = core$2.mixinDisabled(JamSlideElementWrapperBase);
    // tslint:disable: interface-name use-input-property-decorator use-host-property-decorator directive-selector
    /**
     * Used in the `jam-slide-group` view to display slide labels.
     * @docs-private
     */
    var JamSlideElementWrapper = /** @class */ (function (_super) {
        __extends(JamSlideElementWrapper, _super);
        function JamSlideElementWrapper(elementRef) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            return _this;
        }
        /** Sets focus on the wrapper element */
        JamSlideElementWrapper.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        JamSlideElementWrapper.prototype.getOffsetLeft = function () {
            return this.elementRef.nativeElement.offsetLeft;
        };
        JamSlideElementWrapper.prototype.getOffsetWidth = function () {
            return this.elementRef.nativeElement.offsetWidth;
        };
        JamSlideElementWrapper.decorators = [
            { type: core.Directive, args: [{
                        selector: '[jamSlideElementWrapper]',
                        inputs: ['disabled'],
                        host: {
                            '[class.jam-slide-disabled]': 'disabled',
                            '[attr.aria-disabled]': '!!disabled'
                        }
                    },] },
        ];
        /** @nocollapse */
        JamSlideElementWrapper.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        return JamSlideElementWrapper;
    }(_JamSlideElementWrapperMixinBase));

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
    function hasModifierKey(event) {
        var modifiers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            modifiers[_i - 1] = arguments[_i];
        }
        if (modifiers.length) {
            return modifiers.some(function (modifier) { return event[modifier]; });
        }
        return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
    }
    /** Config used to bind passive event listeners */
    var passiveEventListenerOptions = platform.normalizePassiveListenerOptions({ passive: true });
    /**
     * The distance in pixels that will be overshot when scrolling a slide element into view. This helps
     * provide a small affordance to the element next to it.
     */
    var EXAGGERATED_OVERSCROLL = 60;
    /**
     * Amount of milliseconds to wait before starting to scroll the header automatically.
     * Set a little conservatively in order to handle fake events dispatched on touch devices.
     */
    var HEADER_SCROLL_DELAY = 650;
    /**
     * Interval in milliseconds at which to scroll the header
     * while the user is holding their pointer.
     */
    var HEADER_SCROLL_INTERVAL = 100;
    // Boilerplate for applying mixins to JamSlideHeader.
    /** @docs-private */
    var JamSlideHeaderBase = /** @class */ (function () {
        function JamSlideHeaderBase() {
        }
        return JamSlideHeaderBase;
    }());
    var _JamSlideHeaderMixinBase = core$2.mixinDisableRipple(JamSlideHeaderBase);
    /**
     * The header of the slide group which displays a list of all the slides in the slide group. Includes
     * an ink bar that follows the currently selected slide. When the slides list's width exceeds the
     * width of the header container, then arrows will be displayed to allow the user to scroll
     * left and right across the header.
     * @docs-private
     */
    var JamSlideHeader = /** @class */ (function (_super) {
        __extends(JamSlideHeader, _super);
        function JamSlideHeader(_elementRef, _changeDetectorRef, _viewportRuler, _dir, 
        // @breaking-change 8.0.0 `_ngZone` and `_platforms` parameters to be made required.
        _ngZone, _platform) {
            var _this = _super.call(this) || this;
            _this._elementRef = _elementRef;
            _this._changeDetectorRef = _changeDetectorRef;
            _this._viewportRuler = _viewportRuler;
            _this._dir = _dir;
            _this._ngZone = _ngZone;
            _this._platform = _platform;
            /** Event emitted when the option is selected. */
            _this.selectFocusedIndex = new core.EventEmitter();
            /** Event emitted when a element is focused. */
            _this.indexFocused = new core.EventEmitter();
            /** Whether the controls for pagination should be displayed */
            _this._showPaginationControls = false;
            /** Whether the slide list can be scrolled more towards the end of the slide element list. */
            _this._disableScrollAfter = true;
            /** Whether the slide list can be scrolled more towards the beginning of the slide element list. */
            _this._disableScrollBefore = true;
            /** The distance in pixels that the slide labels should be translated to the left. */
            _this._scrollDistance = 0;
            /** Whether the header should scroll to the selected index after the view has been checked. */
            _this._selectedIndexChanged = false;
            /** Emits when the component is destroyed. */
            _this._destroyed = new rxjs.Subject();
            /** Stream that will stop the automated scrolling. */
            _this._stopScrolling = new rxjs.Subject();
            _this._selectedIndex = 0;
            var element = _elementRef.nativeElement;
            var bindEvent = function () {
                rxjs.fromEvent(element, 'mouseleave')
                    .pipe(operators.takeUntil(_this._destroyed))
                    .subscribe(function () {
                    _this._stopInterval();
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
            return _this;
        }
        Object.defineProperty(JamSlideHeader.prototype, "selectedIndex", {
            /** The index of the active slide. */
            get: function () { return this._selectedIndex; },
            set: function (value) {
                value = coercion.coerceNumberProperty(value);
                this._selectedIndexChanged = this._selectedIndex !== value;
                this._selectedIndex = value;
                if (this._keyManager) {
                    this._keyManager.updateActiveItem(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        JamSlideHeader.prototype.ngAfterContentChecked = function () {
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
        };
        /** Handles keyboard events on the header. */
        JamSlideHeader.prototype._handleKeydown = function (event) {
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
        };
        /**
         * Aligns the ink bar to the selected slide on load.
         */
        JamSlideHeader.prototype.ngAfterContentInit = function () {
            var _this = this;
            var dirChange = this._dir ? this._dir.change : rxjs.of(null);
            var resize = this._viewportRuler.change(150);
            var realign = function () {
                _this.updatePagination();
                // this._alignInkBarToSelectedTab();
            };
            this._keyManager = new a11y.FocusKeyManager(this._elementWrappers)
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
            rxjs.merge(dirChange, resize).pipe(operators.takeUntil(this._destroyed)).subscribe(function () {
                realign();
                _this._keyManager.withHorizontalOrientation(_this._getLayoutDirection());
            });
            // If there is a change in the focus key manager we need to emit the `indexFocused`
            // event in order to provide a public event that notifies about focus changes. Also we realign
            // the slides container by scrolling the new focused slide into the visible section.
            this._keyManager.change.pipe(operators.takeUntil(this._destroyed)).subscribe(function (newFocusIndex) {
                _this.indexFocused.emit(newFocusIndex);
                _this._setTabFocus(newFocusIndex);
            });
        };
        JamSlideHeader.prototype.ngAfterViewInit = function () {
            var _this = this;
            // We need to handle these events manually, because we want to bind passive event listeners.
            rxjs.fromEvent(this._previousPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
                .pipe(operators.takeUntil(this._destroyed))
                .subscribe(function () {
                _this._handlePaginatorPress('before');
            });
            rxjs.fromEvent(this._nextPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
                .pipe(operators.takeUntil(this._destroyed))
                .subscribe(function () {
                _this._handlePaginatorPress('after');
            });
        };
        JamSlideHeader.prototype.ngOnDestroy = function () {
            this._destroyed.next();
            this._destroyed.complete();
            this._stopScrolling.complete();
        };
        /**
         * Callback for when the MutationObserver detects that the content has changed.
         */
        JamSlideHeader.prototype._onContentChanges = function () {
            var _this = this;
            var textContent = this._elementRef.nativeElement.textContent;
            // We need to diff the text content of the header, because the MutationObserver callback
            // will fire even if the text content didn't change which is inefficient and is prone
            // to infinite loops if a poorly constructed expression is passed in (see #14249).
            if (textContent !== this._currentTextContent) {
                this._currentTextContent = textContent;
                var zoneCallback = function () {
                    _this.updatePagination();
                    // this._alignInkBarToSelectedTab();
                    _this._changeDetectorRef.markForCheck();
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
        };
        /**
         * Updates the view whether pagination should be enabled or not.
         *
         * WARNING: Calling this method can be very costly in terms of performance.  It should be called
         * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
         * page.
         */
        JamSlideHeader.prototype.updatePagination = function () {
            this._checkPaginationEnabled();
            this._checkScrollingControls();
            this._updateTabScrollPosition();
        };
        Object.defineProperty(JamSlideHeader.prototype, "focusIndex", {
            // tslint:disable: no-non-null-assertion
            /** Tracks which element has focus; used for keyboard navigation */
            get: function () {
                return this._keyManager ? this._keyManager.activeItemIndex : 0;
            },
            /** When the focus index is set, we must manually send focus to the correct element */
            set: function (value) {
                if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
                    return;
                }
                this._keyManager.setActiveItem(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if an index is valid.  If the slides are not ready yet, we assume that the user is
         * providing a valid index and return true.
         */
        JamSlideHeader.prototype._isValidIndex = function (index) {
            if (!this._elementWrappers) {
                return true;
            }
            var slide = this._elementWrappers ? this._elementWrappers.toArray()[index] : null;
            return !!slide && !slide.disabled;
        };
        /**
         * Sets focus on the HTML element for the element wrapper and scrolls it into the view if
         * scrolling is enabled.
         */
        JamSlideHeader.prototype._setTabFocus = function (slideIndex) {
            if (this._showPaginationControls) {
                this._scrollToLabel(slideIndex);
            }
            if (this._elementWrappers && this._elementWrappers.length) {
                this._elementWrappers.toArray()[slideIndex].focus();
                // Do not let the browser manage scrolling to focus the element, this will be handled
                // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
                // should be the full width minus the offset width.
                var containerEl = this._slideListContainer.nativeElement;
                var dir = this._getLayoutDirection();
                if (dir === 'ltr') {
                    containerEl.scrollLeft = 0;
                }
                else {
                    containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
                }
            }
        };
        /** The layout direction of the containing app. */
        JamSlideHeader.prototype._getLayoutDirection = function () {
            return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
        };
        /** Performs the CSS transformation on the slide list that will cause the list to scroll. */
        JamSlideHeader.prototype._updateTabScrollPosition = function () {
            var scrollDistance = this.scrollDistance;
            var platform$$1 = this._platform;
            var translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
            // Don't use `translate3d` here because we don't want to create a new layer. A new layer
            // seems to cause flickering and overflow in Internet Explorer. For example, the ink bar
            // and ripples will exceed the boundaries of the visible slide bar.
            // See: https://github.com/angular/material2/issues/10276
            // We round the `transform` here, because transforms with sub-pixel precision cause some
            // browsers to blur the content of the element.
            this._slideList.nativeElement.style.transform = "translateX(" + Math.round(translateX) + "px)";
            // Setting the `transform` on IE will change the scroll offset of the parent, causing the
            // position to be thrown off in some cases. We have to reset it ourselves to ensure that
            // it doesn't get thrown off. Note that we scope it only to IE and Edge, because messing
            // with the scroll position throws off Chrome 71+ in RTL mode (see #14689).
            // @breaking-change 8.0.0 Remove null check for `platform`.
            if (platform$$1 && (platform$$1.TRIDENT || platform$$1.EDGE)) {
                this._slideListContainer.nativeElement.scrollLeft = 0;
            }
        };
        Object.defineProperty(JamSlideHeader.prototype, "scrollDistance", {
            /** Sets the distance in pixels that the slide header should be transformed in the X-axis. */
            get: function () { return this._scrollDistance; },
            set: function (value) {
                this._scrollTo(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Moves the slide list in the 'before' or 'after' direction (towards the beginning of the list or
         * the end of the list, respectively). The distance to scroll is computed to be a third of the
         * length of the slide list view window.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        JamSlideHeader.prototype._scrollHeader = function (direction) {
            var viewLength = this._slideListContainer.nativeElement.offsetWidth;
            // Move the scroll distance one-third the length of the slide list's viewport.
            var scrollAmount = (direction === 'before' ? -1 : 1) * viewLength / 3;
            return this._scrollTo(this._scrollDistance + scrollAmount);
        };
        /** Handles click events on the pagination arrows. */
        JamSlideHeader.prototype._handlePaginatorClick = function (direction) {
            this._stopInterval();
            this._scrollHeader(direction);
        };
        /**
         * Moves the slide list such that the desired slide element (marked by index) is moved into view.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        JamSlideHeader.prototype._scrollToLabel = function (labelIndex) {
            console.log('inside _scrollToLabel');
            var selectedLabel = this._elementWrappers ? this._elementWrappers.toArray()[labelIndex] : null;
            if (!selectedLabel) {
                return;
            }
            // The view length is the visible width of the slide labels.
            var viewLength = this._slideListContainer.nativeElement.offsetWidth;
            var labelBeforePos;
            var labelAfterPos;
            if (this._getLayoutDirection() === 'ltr') {
                labelBeforePos = selectedLabel.getOffsetLeft();
                labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
            }
            else {
                labelAfterPos = this._slideList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
                labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
            }
            var beforeVisiblePos = this.scrollDistance;
            var afterVisiblePos = this.scrollDistance + viewLength;
            if (labelBeforePos < beforeVisiblePos) {
                // Scroll header to move element to the before direction
                this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
            }
            else if (labelAfterPos > afterVisiblePos) {
                // Scroll header to move element to the after direction
                this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
            }
        };
        /**
         * Evaluate whether the pagination controls should be displayed. If the scroll width of the
         * slide list is wider than the size of the header container, then the pagination controls should
         * be shown.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        JamSlideHeader.prototype._checkPaginationEnabled = function () {
            var isEnabled = this._slideList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
            if (!isEnabled) {
                this.scrollDistance = 0;
            }
            if (isEnabled !== this._showPaginationControls) {
                this._changeDetectorRef.markForCheck();
            }
            this._showPaginationControls = isEnabled;
        };
        /**
         * Evaluate whether the before and after controls should be enabled or disabled.
         * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
         * before button. If the header is at the end of the list (scroll distance is equal to the
         * maximum distance we can scroll), then disable the after button.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        JamSlideHeader.prototype._checkScrollingControls = function () {
            // Check if the pagination arrows should be activated.
            this._disableScrollBefore = this.scrollDistance === 0;
            this._disableScrollAfter = this.scrollDistance === this._getMaxScrollDistance();
            this._changeDetectorRef.markForCheck();
        };
        /**
         * Determines what is the maximum length in pixels that can be set for the scroll distance. This
         * is equal to the difference in width between the slide list container and slide header container.
         *
         * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
         * should be called sparingly.
         */
        JamSlideHeader.prototype._getMaxScrollDistance = function () {
            var lengthOfTabList = this._slideList.nativeElement.scrollWidth;
            var viewLength = this._slideListContainer.nativeElement.offsetWidth;
            return (lengthOfTabList - viewLength) || 0;
        };
        /** Tells the ink-bar to align itself to the current element wrapper */
        // _alignInkBarToSelectedTab(): void {
        //   const selectedLabelWrapper = this._elementWrappers && this._elementWrappers.length ?
        //       this._elementWrappers.toArray()[this.selectedIndex].elementRef.nativeElement :
        //       null;
        //
        //   this._inkBar.alignToElement(selectedLabelWrapper!);
        // }
        /** Stops the currently-running paginator interval.  */
        JamSlideHeader.prototype._stopInterval = function () {
            this._stopScrolling.next();
        };
        /**
         * Handles the user pressing down on one of the paginators.
         * Starts scrolling the header after a certain amount of time.
         * @param direction In which direction the paginator should be scrolled.
         */
        JamSlideHeader.prototype._handlePaginatorPress = function (direction) {
            var _this = this;
            // Avoid overlapping timers.
            this._stopInterval();
            // Start a timer after the delay and keep firing based on the interval.
            rxjs.timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL)
                // Keep the timer going until something tells it to stop or the component is destroyed.
                .pipe(operators.takeUntil(rxjs.merge(this._stopScrolling, this._destroyed)))
                .subscribe(function () {
                var _a = _this._scrollHeader(direction), maxScrollDistance = _a.maxScrollDistance, distance = _a.distance;
                // Stop the timer if we've reached the start or the end.
                if (distance === 0 || distance >= maxScrollDistance) {
                    _this._stopInterval();
                }
            });
        };
        /**
         * Scrolls the header to a given position.
         * @param position Position to which to scroll.
         * @returns Information on the current scroll distance and the maximum.
         */
        JamSlideHeader.prototype._scrollTo = function (position) {
            var maxScrollDistance = this._getMaxScrollDistance();
            this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this._scrollDistanceChanged = true;
            this._checkScrollingControls();
            return { maxScrollDistance: maxScrollDistance, distance: this._scrollDistance };
        };
        JamSlideHeader.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-slide-header',
                        template: "<div class=\"jam-slide-header-pagination jam-slide-header-pagination-before mat-elevation-z4\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.jam-slide-header-pagination-disabled]=\"_disableScrollBefore\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"jam-slide-header-pagination-chevron\"></div>\n</div>\n\n<div class=\"jam-slide-element-container\" #slideListContainer\n     (keydown)=\"_handleKeydown($event)\">\n  <div class=\"jam-slide-list\" #slideList role=\"slidelist\" (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"jam-slide-elements\">\n      <ng-content></ng-content>\n    </div>\n    <!-- <mat-ink-bar></mat-ink-bar> -->\n  </div>\n</div>\n\n<div class=\"jam-slide-header-pagination jam-slide-header-pagination-after mat-elevation-z4\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.jam-slide-header-pagination-disabled]=\"_disableScrollAfter\"\n     (mousedown)=\"_handlePaginatorPress('after')\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"jam-slide-header-pagination-chevron\"></div>\n</div>\n",
                        styles: ["@-webkit-keyframes cdk-text-field-autofill-start{/*!*/}@-webkit-keyframes cdk-text-field-autofill-end{/*!*/}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-card-title{font-size:24px;font-weight:500}.mat-card-header .mat-card-title{font-size:20px}.mat-card-content,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:14px;font-weight:500}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}@media print{.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28122em) scale(.75);transform:translateY(-1.28122em) scale(.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28121em) scale(.75);transform:translateY(-1.28121em) scale(.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.2812em) scale(.75);transform:translateY(-1.2812em) scale(.75)}}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-sub-label-error{font-weight:400}.mat-step-label-error{font-size:14px}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:8px;padding-bottom:8px}.mat-list-item,.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-list-base .mat-list-item{font-size:16px}.mat-list-base .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list-base .mat-list-option{font-size:16px}.mat-list-base .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list-base .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-list-base[dense] .mat-list-item{font-size:12px}.mat-list-base[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list-base[dense] .mat-list-option{font-size:12px}.mat-list-base[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list-base[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-nested-tree-node,.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden;position:relative}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;-webkit-transition:opacity,-webkit-transform cubic-bezier(0,0,.2,1);transition:opacity,transform cubic-bezier(0,0,.2,1),-webkit-transform cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}@media (-ms-high-contrast:active){.mat-ripple-element{display:none}}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:-webkit-box;display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:-webkit-box;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity .4s cubic-bezier(.25,.8,.25,1);transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.jam-slide-header{display:-webkit-box;display:flex;overflow:hidden;position:relative;flex-shrink:0}.jam-slide-element{height:auto;padding:0 16px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;white-space:nowrap;position:relative}.jam-slide-element:focus{outline:0}.jam-slide-element:focus:not(.jam-slide-disabled){opacity:1}.jam-slide-element.jam-slide-disabled{cursor:default}.jam-slide-element .jam-slide-element-content{display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;white-space:nowrap}@media (-ms-high-contrast:active){.jam-slide-element:focus{outline:dotted 2px}.jam-slide-element.jam-slide-disabled{opacity:.5}.jam-slide-element{opacity:1}}@media (max-width:599px){.jam-slide-element{min-width:72px}}.jam-slide-header-pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.jam-slide-header-pagination-controls-enabled .jam-slide-header-pagination{display:-webkit-box;display:flex}.jam-slide-header-pagination-before,.jam-slide-header-rtl .jam-slide-header-pagination-after{padding-left:4px}.jam-slide-header-pagination-before .jam-slide-header-pagination-chevron,.jam-slide-header-rtl .jam-slide-header-pagination-after .jam-slide-header-pagination-chevron{-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.jam-slide-header-pagination-after,.jam-slide-header-rtl .jam-slide-header-pagination-before{padding-right:4px}.jam-slide-header-pagination-after .jam-slide-header-pagination-chevron,.jam-slide-header-rtl .jam-slide-header-pagination-before .jam-slide-header-pagination-chevron{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.jam-slide-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.jam-slide-header-pagination-disabled{box-shadow:none;cursor:default}.jam-slide-element-container{display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;overflow:hidden;z-index:1}.jam-slide-list{-webkit-box-flex:1;flex-grow:1;position:relative;-webkit-transition:-webkit-transform .5s cubic-bezier(.35,0,.25,1);transition:transform .5s cubic-bezier(.35,0,.25,1);transition:transform .5s cubic-bezier(.35,0,.25,1),-webkit-transform .5s cubic-bezier(.35,0,.25,1)}.jam-slide-elements{display:-webkit-box;display:flex}[mat-align-slides=center] .jam-slide-elements{-webkit-box-pack:center;justify-content:center}[mat-align-slides=end] .jam-slide-elements{-webkit-box-pack:end;justify-content:flex-end}"],
                        inputs: ['disableRipple'],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            'class': 'jam-slide-header',
                            '[class.jam-slide-header-pagination-controls-enabled]': '_showPaginationControls',
                            '[class.jam-slide-header-rtl]': "_getLayoutDirection() == 'rtl'"
                        }
                    },] },
        ];
        /** @nocollapse */
        JamSlideHeader.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.ChangeDetectorRef },
                { type: scrolling.ViewportRuler },
                { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
                { type: core.NgZone },
                { type: platform.Platform }
            ];
        };
        JamSlideHeader.propDecorators = {
            _elementWrappers: [{ type: core.ContentChildren, args: [JamSlideElementWrapper,] }],
            _slideListContainer: [{ type: core.ViewChild, args: ['slideListContainer',] }],
            _slideList: [{ type: core.ViewChild, args: ['slideList',] }],
            _nextPaginator: [{ type: core.ViewChild, args: ['nextPaginator',] }],
            _previousPaginator: [{ type: core.ViewChild, args: ['previousPaginator',] }],
            selectFocusedIndex: [{ type: core.Output }],
            indexFocused: [{ type: core.Output }],
            selectedIndex: [{ type: core.Input }]
        };
        return JamSlideHeader;
    }(_JamSlideHeaderMixinBase));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamSlideModule = /** @class */ (function () {
        function JamSlideModule() {
        }
        JamSlideModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            core$2.MatCommonModule,
                            portal.PortalModule,
                            core$2.MatRippleModule,
                            observers.ObserversModule,
                            a11y.A11yModule
                        ],
                        // Don't export all components because some are only to be used internally.
                        exports: [
                            core$2.MatCommonModule,
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
        return JamSlideModule;
    }());

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
    var jamSlidesAnimations = {
        /** Animation translates a slide along the X axis. */
        translateTab: animations.trigger('translateTab', [
            // Note: transitions to `none` instead of 0, because some browsers might blur the content.
            animations.state('center, void, left-origin-center, right-origin-center', animations.style({ transform: 'none' })),
            // If the slide is either on the left or right, we additionally add a `min-height` of 1px
            // in order to ensure that the element has a height before its state changes. This is
            // necessary because Chrome does seem to skip the transition in RTL mode if the element does
            // not have a static height and is not rendered. See related issue: #9465
            animations.state('left', animations.style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
            animations.state('right', animations.style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
            animations.transition('* => left, * => right, left => center, right => center', animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
            animations.transition('void => left-origin-center', [
                animations.style({ transform: 'translate3d(-100%, 0, 0)' }),
                animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
            ]),
            animations.transition('void => right-origin-center', [
                animations.style({ transform: 'translate3d(100%, 0, 0)' }),
                animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
            ])
        ])
    };

    var PinOptionButtonComponent = /** @class */ (function () {
        function PinOptionButtonComponent(matIconRegistry, domSanitizer) {
            this.matIconRegistry = matIconRegistry;
            this.domSanitizer = domSanitizer;
            this.jamColor = 'default';
            this.selected = new core.EventEmitter();
            this.buttons = [];
        }
        PinOptionButtonComponent.prototype.ngOnInit = function () {
            this.populateMenu();
            this.selected_option = this.defaultSelectedOption();
            this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/all_custom_icons.svg'));
        };
        PinOptionButtonComponent.prototype.pinnedOption = function (event, button$$1) {
            event.stopPropagation();
            this.selected_option = {
                index: button$$1.index,
                label: button$$1.label
            };
            localStorage.setItem(this.specialKey + '_pinned_creation_option', JSON.stringify(button$$1));
        };
        PinOptionButtonComponent.prototype.pinButton = function () {
            this.selected.emit(this.selected_option);
        };
        PinOptionButtonComponent.prototype.populateMenu = function () {
            var e_1, _a;
            var count = 0;
            try {
                for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var option = _c.value;
                    this.buttons.push({ index: count, label: option });
                    count += 1;
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
        };
        PinOptionButtonComponent.prototype.defaultSelectedOption = function () {
            var local_storage_item = localStorage.getItem(this.specialKey + '_pinned_creation_option');
            return local_storage_item ? JSON.parse(local_storage_item) : this.buttons[0];
        };
        PinOptionButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-pin-option-button',
                        template: "<button mat-flat-button class=\"pin-button-round\"\n    [ngClass]=\"jamColor === 'default' ? 'mat-hint' : null\"\n    [color]=\"jamColor\"\n    (click)=\"selected.emit(selected_option)\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"4px\">\n        <button mat-icon-button class=\"mat-button\">\n            <mat-icon>add_circle</mat-icon>\n        </button>\n\n        <span>{{ selected_option?.label }}</span>\n\n        <button mat-icon-button matSuffix class=\"mat-button\"\n            [matMenuTriggerFor]=\"jamPinOptionButton\"\n            (click)=\"$event.stopPropagation()\">\n            <mat-icon>arrow_drop_down</mat-icon>\n        </button>\n    </div>\n</button>\n\n<mat-menu #jamPinOptionButton=\"matMenu\">\n    <button mat-menu-item class=\"mouseover\" *ngFor=\"let button of buttons; let item = index\"\n        (click)=\"selected.emit(button)\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxLayoutGap=\"16px\">\n            <span>{{ button.label }}</span>\n            <div class=\"pin-container\">\n                <button mat-icon-button\n                    [ngClass]=\"selected_option?.index !== item ? 'mouseover-child mat-button' : 'mat-button'\"\n                    (click)=\"pinnedOption($event, button)\">\n                    <mat-icon svgIcon=\"pin_rs\" color=\"accent\"\n                        [ngStyle]=\"{ color: selected_option.index !== item ? '#000000B3' : null }\"\n                    ></mat-icon>\n                </button>\n            </div>\n        </div>\n    </button>\n</mat-menu>\n",
                        styles: ["button.pin-button-round{background-color:rgba(0,0,0,.102)!important;padding:0;border-radius:50px}.pin-container{width:40px}.pin-container button mat-icon{margin:0}.mouseover * .mouseover-child{display:none}.mouseover:hover * .mouseover-child{display:inherit}"]
                    },] },
        ];
        /** @nocollapse */
        PinOptionButtonComponent.ctorParameters = function () {
            return [
                { type: material.MatIconRegistry },
                { type: platformBrowser.DomSanitizer }
            ];
        };
        PinOptionButtonComponent.propDecorators = {
            options: [{ type: core.Input }],
            specialKey: [{ type: core.Input }],
            jamColor: [{ type: core.Input }],
            selected: [{ type: core.Output }]
        };
        return PinOptionButtonComponent;
    }());

    var NgxJsonapiMaterialComponent = /** @class */ (function () {
        function NgxJsonapiMaterialComponent() {
        }
        NgxJsonapiMaterialComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-ngx-jsonapi-material',
                        template: "\n    <p>\n      ngx-jsonapi-material works!\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        return NgxJsonapiMaterialComponent;
    }());

    var MaterialModule = /** @class */ (function () {
        function MaterialModule() {
        }
        MaterialModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [
                            material.MatExpansionModule,
                            material.MatSelectModule,
                            material.MatOptionModule,
                            material.MatNativeDateModule,
                            material.MatDatepickerModule,
                            material.MatInputModule,
                            material.MatFormFieldModule,
                            material.MatDialogModule,
                            material.MatToolbarModule,
                            material.MatTooltipModule,
                            material.MatMenuModule,
                            material.MatIconModule,
                            flexLayout.FlexLayoutModule,
                            material.MatCardModule,
                            material.MatPaginatorModule,
                            material.MatTableModule,
                            material.MatTabsModule,
                            material.MatButtonModule
                        ],
                        exports: [
                            material.MatExpansionModule,
                            material.MatSelectModule,
                            material.MatOptionModule,
                            material.MatNativeDateModule,
                            material.MatDatepickerModule,
                            material.MatInputModule,
                            material.MatFormFieldModule,
                            material.MatDialogModule,
                            material.MatToolbarModule,
                            material.MatTooltipModule,
                            material.MatMenuModule,
                            material.MatIconModule,
                            flexLayout.FlexLayoutModule,
                            material.MatCardModule,
                            material.MatPaginatorModule,
                            material.MatTableModule,
                            material.MatTabsModule,
                            material.MatButtonModule
                        ],
                        providers: []
                    },] },
        ];
        return MaterialModule;
    }());

    var NgxJsonapiMaterialModule = /** @class */ (function () {
        function NgxJsonapiMaterialModule() {
        }
        NgxJsonapiMaterialModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, MaterialModule, forms.FormsModule, forms.ReactiveFormsModule],
                        declarations: [NgxJsonapiMaterialComponent],
                        exports: [NgxJsonapiMaterialComponent]
                    },] },
        ];
        return NgxJsonapiMaterialModule;
    }());

    var JamPinOptionButtonModule = /** @class */ (function () {
        function JamPinOptionButtonModule() {
        }
        JamPinOptionButtonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            NgxJsonapiMaterialModule,
                            flexLayout.FlexLayoutModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            material.MatMenuModule
                        ],
                        declarations: [PinOptionButtonComponent],
                        providers: [],
                        exports: [PinOptionButtonComponent]
                    },] },
        ];
        return JamPinOptionButtonModule;
    }());

    var JamAutocompleteComponent = /** @class */ (function () {
        function JamAutocompleteComponent(changeDetectorRef) {
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
            this.toggleResourceChange = new core.EventEmitter();
            this.dataArrived = new rxjs.Subject();
            this.autocompleteCtrl = new forms.FormControl();
            this.resourceArray = [];
            this.use_is_loading = true;
            this.destroyer = new Destroyer();
            this.collectionPerPage = 100; // 500
            this.resource_max_on_list = 50;
        }
        JamAutocompleteComponent.prototype.ngOnDestroy = function () {
            this.destroyer.destroy();
        };
        JamAutocompleteComponent.prototype.ngOnInit = function () {
            this.collection = this.services.newCollection();
            this.filtered_resource = this.autocompleteCtrl.valueChanges.pipe(this.destroyer.pipe(), filterOrRequest({
                attribute_to_search: this.displayAttributes[0],
                resourcesArray: this.resourceArray,
                getAllFc: this.getAll.bind(this),
                last_filter_value: this.resourceArrayLastFilterValue,
                collection: this.collection,
                page_size: this.collectionPerPage
            }));
        };
        JamAutocompleteComponent.prototype.closeAutocomplete = function () {
            var _this = this;
            this.autocompleteResource.optionSelections.pipe(operators.timeout(150)).subscribe(function (selection) {
                _this.autocompleteResource.closePanel();
            }, function (err) {
                _this.autocompleteResource.closePanel();
            });
        };
        JamAutocompleteComponent.prototype.selectedResource = function (resource) {
            if (!resource) {
                return;
            }
            if (this.previewSelected) {
                this.toggleResource = resource;
            }
            this.toggleResourceChange.emit(resource);
        };
        JamAutocompleteComponent.prototype.displayFn = function (resource) {
            return ''; // clear input after item selection
        };
        JamAutocompleteComponent.prototype.refresh = function () {
            this.services.clearCacheMemory();
            this.use_is_loading = false;
        };
        JamAutocompleteComponent.prototype.getAll = function (search_text) {
            var _this = this;
            var _a;
            var params = {
                page: {
                    number: 1,
                    size: this.collectionPerPage
                },
                remotefilter: this.remoteFilter,
                include: this.include
            };
            if (search_text) {
                params.remotefilter = (_a = {}, _a[this.displayAttributes[0]] = search_text, _a);
            }
            return this.services.all(params).pipe(operators.filter(function (collection) { return collection.builded; }), operators.tap(function (collection) {
                _this.collection = collection;
            }));
        };
        JamAutocompleteComponent.prototype.clearDisplay = function () {
            this.toggleResource = null;
            this.autocompleteCtrl.setValue('');
        };
        JamAutocompleteComponent.prototype.filterResourceByName = function (value) {
            var _this = this;
            var filterValue = typeof value === 'string' ? value.toLowerCase() : '';
            var count = 0;
            this.showList = !value && filterValue.length > 0;
            return this.resourceArray.filter(function (resource) {
                if (count < _this.resource_max_on_list &&
                    (resource.attributes[_this.displayAttributes[0]].toLowerCase().indexOf(filterValue) === 0 ||
                        resource.attributes[_this.displayAttributes[0]].toLowerCase().indexOf(' ' + filterValue) > 0)) {
                    return count += 1;
                }
            });
        };
        JamAutocompleteComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-autocomplete',
                        styles: [".custom-placeholder::-webkit-input-placeholder{color:inherit;opacity:1}.custom-placeholder::-moz-placeholder{color:inherit;opacity:1}.custom-placeholder::-ms-input-placeholder{color:inherit;opacity:1;color:inherit}.custom-placeholder::placeholder{color:inherit;opacity:1}.custom-placeholder:-ms-input-placeholder{color:inherit}"],
                        template: "<mat-form-field style=\"width: 100%\" *ngIf=\"collection\"\n    appearance=\"outline\" floatLabel=\"never\" color=\"accent\"\n>\n    <input matInput aria-label=\"Escribe algo que buscar\" name=\"autocomplete-resource\"\n        [placeholder]=\"toggleResource?.attributes[displayAttributes[0]] || placeholder\"\n        type=\"text\"\n        [ngClass]=\"toggleResource?.attributes[displayAttributes[0]] ? 'custom-placeholder' : null\"\n        [matAutocomplete]=\"auto\"\n        [formControl]=\"autocompleteCtrl\"\n        (blur)=\"closeAutocomplete()\"\n        id=\"autocompleteResource\"\n        #autocompleteResource\n    >\n\n    <mat-autocomplete #auto=\"matAutocomplete\"\n        [displayWith]=\"displayFn\"\n        (optionSelected)=\"selectedResource($event.option.value)\">\n        <div *ngIf=\"showList\">\n            <mat-option [value]=\"null\" (click)=\"clearDisplay()\">-- Ninguna --</mat-option>\n            <mat-option [ngClass]=\"toggleResource?.id === resource.id ? 'mat-selected mat-active' : null\"\n                [value]=\"resource\"\n                *ngFor=\"let resource of filtered_resource | async; trackBy: trackByFn\"\n            >\n                <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"4px\">\n                    <mat-icon *ngIf=\"icon\">{{ icon }}</mat-icon>\n                    <strong\n                        [innerHTML]=\"resource.attributes[displayAttributes[0]]\"\n                    ></strong>\n                    <ng-container *ngFor=\"let attribute of displayAttributes; let item = index\">\n                        <small *ngIf=\"item >= 1\"> | {{ resource.attributes[attribute] }}</small>\n                    </ng-container>\n                </div>\n            </mat-option>\n        </div>\n    </mat-autocomplete>\n\n    <div fxLayout=\"row\" matSuffix fxLayoutAlign=\"end center\">\n        <button mat-icon-button type=\"button\" class=\"mat-button\" matSuffix matTooltip=\"Limpiar selecci\u00F3n\"\n            *ngIf=\"toggleResource?.attributes[displayAttributes[0]] || autocompleteCtrl.value\"\n            [disabled]=\"!collection?.loaded\"\n            (click)=\"clearDisplay()\"\n        >\n            <mat-icon class=\"mat-hint\">close</mat-icon>\n        </button>\n\n        <button mat-icon-button type=\"button\" class=\"mat-button\" matSuffix matTooltip=\"Actualizar lista\"\n            [disabled]=\"!collection?.loaded\" (click)=\"$event.stopPropagation(); refresh()\">\n            <mat-icon class=\"mat-hint\">refresh</mat-icon>\n        </button>\n\n        <div class=\"mat-select-arrow-wrapper\">\n            <div class=\"mat-select-arrow\"></div>\n        </div>\n    </div>\n</mat-form-field>\n\n<mat-progress-bar class=\"progress-bar-autocomplete\"\n    *ngIf=\"!collection?.loaded\"\n    color=\"accent\"\n    mode=\"indeterminate\"\n></mat-progress-bar>\n"
                    },] },
        ];
        /** @nocollapse */
        JamAutocompleteComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef }
            ];
        };
        JamAutocompleteComponent.propDecorators = {
            previewSelected: [{ type: core.Input }],
            toggleResource: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            services: [{ type: core.Input }],
            displayAttributes: [{ type: core.Input }],
            remoteFilter: [{ type: core.Input }],
            include: [{ type: core.Input }],
            sort: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            showList: [{ type: core.Input }],
            toggleResourceChange: [{ type: core.Output }],
            autocompleteResource: [{ type: core.ViewChild, args: [material.MatAutocompleteTrigger,] }],
            autocompleteResourceInput: [{ type: core.ViewChild, args: ['autocompleteResource',] }]
        };
        return JamAutocompleteComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamAutocompleteModule = /** @class */ (function () {
        function JamAutocompleteModule() {
        }
        JamAutocompleteModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            flexLayout.FlexLayoutModule,
                            material.MatTooltipModule,
                            forms.ReactiveFormsModule,
                            material.MatAutocompleteModule,
                            material.MatFormFieldModule,
                            material.MatInputModule,
                            material.MatProgressBarModule,
                            material.MatButtonModule,
                            material.MatOptionModule,
                            material.MatIconModule,
                            common.CommonModule
                        ],
                        declarations: [JamAutocompleteComponent],
                        exports: [JamAutocompleteComponent]
                    },] },
        ];
        return JamAutocompleteModule;
    }());

    var InfoButtonComponent = /** @class */ (function () {
        function InfoButtonComponent() {
            /**
             * @param icon optional property -
             * @description By default acquires as icon "info"
             */
            this.icon = 'info';
            /** @param jamTooltip optional property */
            this.jamTooltip = 'Más información';
        }
        InfoButtonComponent.prototype.ngOnInit = function () {
            this.icon = this.checkIcon();
        };
        /** @method checkIcon Checks arriving icon, if not supported, then returns info. */
        InfoButtonComponent.prototype.checkIcon = function () {
            console.warn("\"" + this.icon + "\" icon is not supported \uD83E\uDD37\u200D\u2642\uFE0F, Try \"info\" or \"help.\"");
            return !['info', 'help'].includes(this.icon) ? 'info' : this.icon;
        };
        InfoButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-info-button',
                        template: "<a class=\"mat-button\" type=\"button\" target=\"_blank\"\n    mat-icon-button\n    [matTooltip]=\"jamTooltip\"\n    [href]=\"externalUrl\"\n    (click)=\"$event.stopPropagation()\"\n>\n    <mat-icon\n        [innerHtml]=\"icon\"\n    ></mat-icon>\n</a>\n"
                    },] },
        ];
        InfoButtonComponent.propDecorators = {
            externalUrl: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            jamTooltip: [{ type: core.Input }]
        };
        return InfoButtonComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamInfoButtonModule = /** @class */ (function () {
        function JamInfoButtonModule() {
        }
        JamInfoButtonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatButtonModule,
                            material.MatTooltipModule,
                            material.MatIconModule
                        ],
                        declarations: [InfoButtonComponent],
                        exports: [InfoButtonComponent]
                    },] },
        ];
        return JamInfoButtonModule;
    }());

    var DomService = /** @class */ (function () {
        function DomService(componentFactoryResolver, appRef, injector) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.appRef = appRef;
            this.injector = injector;
            this.child_dom_element_id = 'current-selection-bar';
        }
        DomService.prototype.appendComponentTo = function (parentId, child, childConfig) {
            var child_node = document.getElementById(this.child_dom_element_id);
            if (child_node)
                child_node.parentNode.removeChild(child_node);
            /** Crea una referencia de componente desde el componente hijo */
            var childComponentRef = this.componentFactoryResolver.resolveComponentFactory(child).create(this.injector);
            /** Conecta la configuración al hijo (entradas y salidas) */
            this.attachConfig(childConfig, childComponentRef);
            this.childComponentRef = childComponentRef;
            // Agrega el componente al appRef de modo que esté dentro del árbol de componentes "ng"
            this.appRef.attachView(childComponentRef.hostView);
            // Obtiene el elemento DOM del componente
            var childDomElem = childComponentRef.hostView.rootNodes[0];
            childDomElem.setAttribute('id', this.child_dom_element_id);
            document.getElementById(parentId).appendChild(childDomElem);
            childDomElem.className = 'width-100';
            return childComponentRef;
        };
        DomService.prototype.removeComponent = function () {
            if (!this.childComponentRef)
                return;
            this.appRef.detachView(this.childComponentRef.hostView);
            this.childComponentRef.destroy();
        };
        DomService.prototype.attachConfig = function (config, componentRef) {
            var inputs = config.inputs;
            var outputs = config.outputs;
            for (var key in inputs) {
                componentRef.instance[key] = inputs[key];
            }
            for (var key in outputs) {
                componentRef.instance[key] = outputs[key];
            }
        };
        DomService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        DomService.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.ApplicationRef },
                { type: core.Injector }
            ];
        };
        return DomService;
    }());

    var SelectionBarService = /** @class */ (function () {
        function SelectionBarService(domService) {
            this.domService = domService;
            this.selected$ = new rxjs.BehaviorSubject(new collections.SelectionModel());
            this.callMethod$ = new rxjs.BehaviorSubject({ method: '' });
            this.selectionBarElementId = 'selection-bar-container';
        }
        SelectionBarService.prototype.selected = function (selected) {
            this.selected$.next(selected);
        };
        SelectionBarService.prototype.callMethod = function (methodRef) {
            this.callMethod$.next(methodRef);
        };
        SelectionBarService.prototype.clearMethod = function () {
            this.callMethod({ method: '' });
        };
        SelectionBarService.prototype.init = function (component, inputs, outputs) {
            var componentConfig = {
                inputs: inputs,
                outputs: outputs
            };
            if (document.getElementById(this.selectionBarElementId).className === 'show') {
                return undefined; // ts-lint => Value-returning function should use `return undefined;`, not just `return;`
            }
            var created_component_instance = this.domService.appendComponentTo(this.selectionBarElementId, component, componentConfig);
            document.getElementById(this.selectionBarElementId).className = 'show';
            return created_component_instance;
        };
        SelectionBarService.prototype.destroy = function () {
            this.domService.removeComponent();
            document.getElementById(this.selectionBarElementId).className = 'hidden';
        };
        SelectionBarService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        SelectionBarService.ctorParameters = function () {
            return [
                { type: DomService }
            ];
        };
        return SelectionBarService;
    }());

    var SelectionBarContainerComponent = /** @class */ (function () {
        function SelectionBarContainerComponent(selectionBarService, router$$1) {
            var _this = this;
            this.selectionBarService = selectionBarService;
            this.router = router$$1;
            this.router.events.subscribe(function (event) {
                if (event instanceof router.NavigationStart) {
                    _this.selectionBarService.destroy();
                }
            });
        }
        SelectionBarContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-selection-bar-container',
                        template: "<div id=\"selection-bar-container\" class=\"hidden\"></div>\n",
                        styles: [":host /deep/ .hidden{display:none!important}:host /deep/ .show{display:-webkit-box!important;display:flex!important}#selection-bar-container{-webkit-box-align:center;align-items:center;position:fixed;z-index:1003;top:0;left:0;right:0;width:100%;height:64px;opacity:1;background:#fff}:host /deep/ #selection-bar-container #current-selection-bar:first-child{padding:0 20px;width:100%}"]
                    },] },
        ];
        /** @nocollapse */
        SelectionBarContainerComponent.ctorParameters = function () {
            return [
                { type: SelectionBarService },
                { type: router.Router }
            ];
        };
        return SelectionBarContainerComponent;
    }());

    var SelectionBarInfoComponent = /** @class */ (function () {
        function SelectionBarInfoComponent(selectionBarService) {
            var _this = this;
            this.selectionBarService = selectionBarService;
            this.destroyer = new Destroyer();
            this.selectionBarService.selected$
                .pipe(this.destroyer.pipe())
                .subscribe(function (selection) {
                _this.selection = selection;
                _this.label = selection.selected.length + (selection.selected.length >= 1 ? ' seleccionados' : ' seleccionado');
                if (selection.selected.length <= 0)
                    _this.selectionBarService.destroy();
            });
        }
        SelectionBarInfoComponent.prototype.ngOnDestroy = function () {
            this.destroyer.destroy();
        };
        SelectionBarInfoComponent.prototype.close = function () {
            this.selection.clear();
            this.selectionBarService.destroy();
        };
        SelectionBarInfoComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'jam-selection-bar-info',
                        template: "<div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n    <button mat-icon-button matTooltip=\"Borrar selecci\u00F3n\" (click)=\"close()\">\n        <mat-icon class=\"material-icons\">arrow_back</mat-icon>\n    </button>\n    <span>{{ label }}</span>\n</div>\n"
                    },] },
        ];
        /** @nocollapse */
        SelectionBarInfoComponent.ctorParameters = function () {
            return [
                { type: SelectionBarService }
            ];
        };
        return SelectionBarInfoComponent;
    }());

    /**
     * @license
     * Copyright Reyesoft All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var JamSelectionBarModule = /** @class */ (function () {
        function JamSelectionBarModule() {
        }
        JamSelectionBarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            router.RouterModule,
                            flexLayout.FlexLayoutModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            common.CommonModule
                        ],
                        providers: [FilterPipe, SelectionBarService, DomService],
                        declarations: [SelectionBarContainerComponent, SelectionBarInfoComponent],
                        exports: [SelectionBarContainerComponent, SelectionBarInfoComponent]
                    },] },
        ];
        return JamSelectionBarModule;
    }());

    /*
     * Public API Surface of ngx-jsonapi-material
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵh = DialogLoggedStateComponent;
    exports.ɵm = MaterialModule;
    exports.ɵk = BottomSheetComponent;
    exports.ɵi = MenuElement;
    exports.ɵj = MenuElementsCollection;
    exports.ɵn = NgxJsonapiMaterialComponent;
    exports.ɵl = NgxJsonapiMaterialModule;
    exports.ɵg = UploadComponent;
    exports.ɵe = JamSlideBase;
    exports.ɵf = _JamSlideMixinBase;
    exports.ɵc = JamSlideElementWrapperBase;
    exports.ɵd = _JamSlideElementWrapperMixinBase;
    exports.ɵa = JamSlideHeaderBase;
    exports.ɵb = _JamSlideHeaderMixinBase;
    exports.JamSlideHeader = JamSlideHeader;
    exports.JamSlideElementWrapper = JamSlideElementWrapper;
    exports.JamSlide = JamSlide;
    exports.JamSlideElement = JamSlideElement;
    exports.InfoButtonComponent = InfoButtonComponent;
    exports.JamInfoButtonModule = JamInfoButtonModule;
    exports.SelectionBarContainerComponent = SelectionBarContainerComponent;
    exports.SelectionBarInfoComponent = SelectionBarInfoComponent;
    exports.DomService = DomService;
    exports.SelectionBarService = SelectionBarService;
    exports.JamSelectionBarModule = JamSelectionBarModule;
    exports.CustomValidators = CustomValidators;
    exports.trackById = trackById;
    exports.batchAll = batchAll;
    exports.filterOrRequest = filterOrRequest;
    exports.Destroyer = Destroyer;
    exports.SelectComponent = SelectComponent;
    exports.JamOptionFooterComponent = JamOptionFooterComponent;
    exports.JamSelectModule = JamSelectModule;
    exports.SubmitComponent = SubmitComponent;
    exports.JamSubmitModule = JamSubmitModule;
    exports.FloatingFiltersComponent = FloatingFiltersComponent;
    exports.AvoidDisabledStyleDirective = AvoidDisabledStyleDirective;
    exports.JamFloatingFiltersModule = JamFloatingFiltersModule;
    exports.PictureManagerComponent = PictureManagerComponent;
    exports.GalleryManagerComponent = GalleryManagerComponent;
    exports.JamPictureManagerModule = JamPictureManagerModule;
    exports.SearchInputComponent = SearchInputComponent;
    exports.FilterPipe = FilterPipe;
    exports.JamSearchInputModule = JamSearchInputModule;
    exports.ChipsAutocompleteComponent = ChipsAutocompleteComponent;
    exports.JamChipsAutocompleteModule = JamChipsAutocompleteModule;
    exports.ConfirmationDialogComponent = ConfirmationDialogComponent;
    exports.DeleteConfirmationComponent = DeleteConfirmationComponent;
    exports.JamDeleteConfirmationModule = JamDeleteConfirmationModule;
    exports.EditTextAttributeDialogComponent = EditTextAttributeDialogComponent;
    exports.JamEditTextAttributeModule = JamEditTextAttributeModule;
    exports.TopWarningComponent = TopWarningComponent;
    exports.TopWarningService = TopWarningService;
    exports.SingleWarningComponent = SingleWarningComponent;
    exports.JamTopWarningModule = JamTopWarningModule;
    exports.JamErrorHandler = JamErrorHandler;
    exports.JamErrorHandlerModule = JamErrorHandlerModule;
    exports.RangeDatepickerComponent = RangeDatepickerComponent;
    exports.JamRangeDatepickerModule = JamRangeDatepickerModule;
    exports.FabSpeedDialComponent = FabSpeedDialComponent;
    exports.FabSpeedDialMiniButton = FabSpeedDialMiniButton;
    exports.FabSpeedDialModule = FabSpeedDialModule;
    exports.JamRefreshService = JamRefreshService;
    exports.RefreshComponent = RefreshComponent;
    exports.JamRefreshModule = JamRefreshModule;
    exports.Menu = Menu;
    exports.Section = Section;
    exports.Button = Button;
    exports.DropdownMenuComponent = DropdownMenuComponent;
    exports.MenuComponent = MenuComponent;
    exports.JamMenuModule = JamMenuModule;
    exports.FloatingButtonComponent = FloatingButtonComponent;
    exports.JamFloatingButtonModule = JamFloatingButtonModule;
    exports.DynamicInput = DynamicInput;
    exports.TextDynamicInput = TextDynamicInput;
    exports.NumberDynamicInput = NumberDynamicInput;
    exports.CheckboxDynamicInput = CheckboxDynamicInput;
    exports.TextareaDynamicInput = TextareaDynamicInput;
    exports.SelectDynamicInput = SelectDynamicInput;
    exports.FormlyFormFlexComponent = FormlyFormFlexComponent;
    exports.JamDynamicFormsModule = JamDynamicFormsModule;
    exports.JamTabsDirective = JamTabsDirective;
    exports.JamTabsModule = JamTabsModule;
    exports.RemembermeStateDirective = RemembermeStateDirective;
    exports.JamRememberStateModule = JamRememberStateModule;
    exports.FloatingInputComponent = FloatingInputComponent;
    exports.JamFloatingInputModule = JamFloatingInputModule;
    exports.JsonapiFilterRangedateConfig = JsonapiFilterRangedateConfig;
    exports.FilterConfig = FilterConfig;
    exports.JamFilterOptionsComponent = JamFilterOptionsComponent;
    exports.JamFilterChecksComponent = JamFilterChecksComponent;
    exports.JamFilterModule = JamFilterModule;
    exports.JamSlideModule = JamSlideModule;
    exports.JamSlideChangeEvent = JamSlideChangeEvent;
    exports.MAT_TABS_CONFIG = MAT_TABS_CONFIG;
    exports.JamSlideGroupBase = JamSlideGroupBase;
    exports._JamSlideGroupMixinBase = _JamSlideGroupMixinBase;
    exports.JamSlideGroup = JamSlideGroup;
    exports.jamSlidesAnimations = jamSlidesAnimations;
    exports.PinOptionButtonComponent = PinOptionButtonComponent;
    exports.JamPinOptionButtonModule = JamPinOptionButtonModule;
    exports.JamAutocompleteComponent = JamAutocompleteComponent;
    exports.JamAutocompleteModule = JamAutocompleteModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWpzb25hcGktbWF0ZXJpYWwudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvY3VzdG9tLXZhbGlkYXRvcnMudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi90cmFjay1ieS1pZC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2JhdGNoLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZGVzdHJveWVyLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Qvb3B0aW9uLWZvb3Rlci5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWFyY2gtaW5wdXQvc2VhcmNoLXRleHQucGlwZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Qvc2VsZWN0Lm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3N1Ym1pdC9zdWJtaXQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc3VibWl0L3N1Ym1pdC5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9mbG9hdGluZy1maWx0ZXJzL2Zsb2F0aW5nLWZpbHRlcnMuY29tcG9uZW50LnRzIixudWxsLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9mbG9hdGluZy1maWx0ZXJzL2F2b2lkLWRpc2FibGVkLXN0eWxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWZpbHRlcnMvZmxvYXRpbmctZmlsdGVycy5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9waWN0dXJlLW1hbmFnZXIvcGljdHVyZS9waWN0dXJlLW1hbmFnZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvcGljdHVyZS1tYW5hZ2VyL2dhbGxlcnkvZ2FsbGVyeS1tYW5hZ2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3BpY3R1cmUtbWFuYWdlci91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2RlbGV0ZS1jb25maXJtYXRpb24vY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2RlbGV0ZS1jb25maXJtYXRpb24vZGVsZXRlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24ubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvcGljdHVyZS1tYW5hZ2VyL3BpY3R1cmUtbWFuYWdlci5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9jaGlwcy1hdXRvY29tcGxldGUvY2hpcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2NoaXBzLWF1dG9jb21wbGV0ZS9jaGlwcy1hdXRvY29tcGxldGUubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvdG9wLXdhcm5pbmcvdG9wLXdhcm5pbmcuc2VydmljZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RvcC13YXJuaW5nL3RvcC13YXJuaW5nLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RvcC13YXJuaW5nL3NpbmdsZS13YXJuaW5nL3NpbmdsZS13YXJuaW5nLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RvcC13YXJuaW5nL3RvcC13YXJuaW5nLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2xvZ2dlZC1zdGF0ZS9kaWFsb2ctbG9nZ2VkLXN0YXRlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Vycm9yLWhhbmRsZXIvZXJyb3ItaGFuZGxlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZXJyb3ItaGFuZGxlci9lcnJvci1oYW5kbGVyLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3JhbmdlLWRhdGVwaWNrZXIvcmFuZ2UtZGF0ZXBpY2tlci5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9yYW5nZS1kYXRlcGlja2VyL3JhbmdlLWRhdGVwaWNrZXIubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZmFiLXNwZWVkLWRpYWwvZmFiLXNwZWVkLWRpYWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZmFiLXNwZWVkLWRpYWwvZmFiLXNwZWVkLWRpYWwtbWluaS1idXR0b24udHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9mYWItc3BlZWQtZGlhbC9mYWItc3BlZWQtZGlhbC5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9yZWZyZXNoL3JlZnJlc2guY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvcmVmcmVzaC9yZWZyZXNoLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL21lbnUvbWVudS1lbGVtZW50cy9tZW51LWVsZW1lbnRzLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvbWVudS9tZW51LWVsZW1lbnRzL21lbnUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9tZW51L21lbnUtZWxlbWVudHMvc2VjdGlvbi50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL21lbnUvbWVudS1lbGVtZW50cy9idXR0b24udHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9tZW51L2Ryb3Bkb3duLW1lbnUvZHJvcGRvd24tbWVudS5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9tZW51L2JvdHRvbS1zaGVldC9ib3R0b20tc2hlZXQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvbWVudS9tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL21lbnUvbWVudS5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9mbG9hdGluZy1idXR0b24vZmxvYXRpbmctYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWJ1dHRvbi9mbG9hdGluZy1idXR0b24ubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZHluYW1pYy1mb3Jtcy9keW5hbWljLWlucHV0cy50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2R5bmFtaWMtZm9ybXMvZm9ybWx5LWZvcm0tZmxleC5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9keW5hbWljLWZvcm1zL2R5bmFtaWMtZm9ybXMubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvdGFicy90YWJzLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3RhYnMvdGFicy5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9leHBhbnNpb24tcGFuZWwvcmVtZW1iZXItc3RhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZXhwYW5zaW9uLXBhbmVsL3JlbWVtYmVyLXN0YXRlLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWlucHV0L2Zsb2F0aW5nLWlucHV0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2Zsb2F0aW5nLWlucHV0L2Zsb2F0aW5nLWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2ZpbHRlcnMvaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZmlsdGVycy9pbnRlcmZhY2VzL2ZpbHRlci1kYXRlLXJhbmdlLmludGVyZmFjZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2ZpbHRlcnMvYmFzaWNzL2ZpbHRlci1vcHRpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2ZpbHRlcnMvYmFzaWNzL2ZpbHRlci1jaGVja3MuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvZmlsdGVycy9maWx0ZXJzLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NsaWRlL3NsaWRlLWVsZW1lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zbGlkZS9zbGlkZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NsaWRlL3NsaWRlLWdyb3VwLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2xpZGUvc2xpZGUtZWxlbWVudC13cmFwcGVyLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2xpZGUvc2xpZGUtaGVhZGVyLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2xpZGUvc2xpZGUtbW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2xpZGUvc2xpZGUtYW5pbWF0aW9ucy50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3Bpbi1vcHRpb24tYnV0dG9uL3Bpbi1vcHRpb24tYnV0dG9uLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL25neC1qc29uYXBpLW1hdGVyaWFsLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL21hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL25neC1qc29uYXBpLW1hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3Bpbi1vcHRpb24tYnV0dG9uL3Bpbi1vcHRpb24tYnV0dG9uLm1vZHVsZS50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9pbmZvLWJ1dHRvbi9pbmZvLWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9pbmZvLWJ1dHRvbi9pbmZvLWJ1dHRvbi5tb2R1bGUudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Rpb24tYmFyL2RvbS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9saWIvc2VsZWN0aW9uLWJhci9zZWxlY3Rpb24tYmFyLnNlcnZpY2UudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXItY29udGFpbmVyL3NlbGVjdGlvbi1iYXItY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvbGliL3NlbGVjdGlvbi1iYXIvc2VsZWN0aW9uLWJhci1pbmZvL3NlbGVjdGlvbi1iYXItaW5mby5jb21wb25lbnQudHMiLCJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXIubW9kdWxlLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9wdWJsaWMtYXBpLnRzIiwibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC9uZ3gtanNvbmFwaS1tYXRlcmlhbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbiwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tVmFsaWRhdG9ycyB7XG4gICAgcHVibGljIHBhdHRlcm5WYWxpZGF0b3IocmVnZXg6IFJlZ0V4cCwgZXJyb3I6IFZhbGlkYXRpb25FcnJvcnMpOiBWYWxpZGF0b3JGbiB7XG4gICAgICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUpIHJldHVybiBudWxsOyAvLyBpZiBjb250cm9sIGlzIGVtcHR5IHJldHVybiBubyBlcnJvclxuXG4gICAgICAgICAgICBjb25zdCBWQUxJRCA9IHJlZ2V4LnRlc3QoY29udHJvbC52YWx1ZSk7IC8vIHRlc3QgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sIGFnYWluc3QgdGhlIHJlZ2V4cCBzdXBwbGllZFxuXG4gICAgICAgICAgICByZXR1cm4gVkFMSUQgPyBudWxsIDogZXJyb3I7IC8vIGlmIHRydWUsIHJldHVybiBubyBlcnJvciAobm8gZXJyb3IpLCBlbHNlIHJldHVybiBlcnJvciBwYXNzZWQgaW4gdGhlIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gTm9QYXNzc3dvcmRNYXRjaCBhbGxvd3MgeW91IHRvIGRpc3BsYXkgYW4gZXJyb3IgaWYgdGhlIHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoLlxuICAgICAqIEB1c2FnZU5vdGVzXG4gICAgICogIyMjIEVqZW1wbG9cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogdmFsaWRhdGlvbjoge1xuICAgICAqICAgICBtZXNzYWdlOiB7XG4gICAgICogICAgICAgICBOb1Bhc3Nzd29yZE1hdGNoOiAnTWkgbWVuc2FqZSdcbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwdWJsaWMgcGFzc3dvcmRNYXRjaFZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgY29uc3QgUEFTU1dPUkQ6IHN0cmluZyA9IGNvbnRyb2wuZ2V0KCdwYXNzd29yZCcpLnZhbHVlOyAvLyBnZXQgcGFzc3dvcmQgZnJvbSBvdXIgcGFzc3dvcmQgZm9ybSBjb250cm9sXG4gICAgICAgIGNvbnN0IENPTkZJUk1fUEFTU1dPUkQ6IHN0cmluZyA9IGNvbnRyb2wuZ2V0KCdjb25maXJtX3Bhc3N3b3JkJykudmFsdWU7IC8vIGdldCBwYXNzd29yZCBmcm9tIG91ciBjb25maXJtUGFzc3dvcmQgZm9ybSBjb250cm9sXG5cbiAgICAgICAgLy8gY29tcGFyZSBpcyB0aGUgcGFzc3dvcmQgbWF0aFxuICAgICAgICBpZiAoUEFTU1dPUkQgIT09IENPTkZJUk1fUEFTU1dPUkQpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZXkgZG9uJ3QgbWF0Y2gsIHNldCBhbiBlcnJvciBpbiBvdXIgY29uZmlybVBhc3N3b3JkIGZvcm0gY29udHJvbFxuICAgICAgICAgICAgY29udHJvbC5nZXQoJ2NvbmZpcm1fcGFzc3dvcmQnKS5zZXRFcnJvcnMoeyBOb1Bhc3Nzd29yZE1hdGNoOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFja0J5SWQoaW5kZXgsIHJlc291cmNlOiBSZXNvdXJjZSkge1xuICAgIHJldHVybiByZXNvdXJjZS5pZDtcbn1cbiIsIi8vIHRzbGludDpkaXNhYmxlOiByeGpzLW5vLXdob2xlc2FsZSByeGpzLWRlZXAtb3BlcmF0b3JzXG5cbmltcG9ydCB7IG1hcCwgY29uY2F0TWFwLCBzdGFydFdpdGggLCBmaWx0ZXIgLCBzd2l0Y2hNYXAgLCBza2lwICwgZGVib3VuY2VUaW1lICwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCBwaXBlICwgb2YgLCBVbmFyeUZ1bmN0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICduZ3gtanNvbmFwaS9zZXJ2aWNlJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnbmd4LWpzb25hcGkvcmVzb3VyY2UnO1xuaW1wb3J0IHsgRG9jdW1lbnRDb2xsZWN0aW9uLCBJUGFyYW1zQ29sbGVjdGlvbiB9IGZyb20gJ25neC1qc29uYXBpJztcblxuZXhwb3J0IGZ1bmN0aW9uIGJhdGNoQWxsPFQgZXh0ZW5kcyBTZXJ2aWNlPFI+LCBSIGV4dGVuZHMgUmVzb3VyY2U+KHNlcnZpY2U6IFQsIHBhcmFtczogSVBhcmFtc0NvbGxlY3Rpb24pOiBPYnNlcnZhYmxlPERvY3VtZW50Q29sbGVjdGlvbjxSPj4ge1xuICAgIHJldHVybiA8T2JzZXJ2YWJsZTxEb2N1bWVudENvbGxlY3Rpb248Uj4+PnNlcnZpY2UuYWxsKHBhcmFtcykucGlwZShjb25jYXRNYXAoY29sbGVjdGlvbiA9PiB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEubGVuZ3RoIDwgcGFyYW1zLnBhZ2Uuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9mKGNvbGxlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zLnBhZ2UubnVtYmVyICs9IDE7XG5cbiAgICAgICAgcmV0dXJuIGJhdGNoQWxsKHNlcnZpY2UsIHBhcmFtcykucGlwZShzdGFydFdpdGgoY29sbGVjdGlvbikpO1xuICAgIH0pKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlck9yUmVxdWVzdCA9IDxUIGV4dGVuZHMgUmVzb3VyY2U+KHBhcmFtczoge1xuICAgIGF0dHJpYnV0ZV90b19zZWFyY2g/OiBzdHJpbmc7XG4gICAgcmVzb3VyY2VzQXJyYXk6IEFycmF5PFQ+O1xuICAgIGdldEFsbEZjOiAoKGZpbHRlcjogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPERvY3VtZW50Q29sbGVjdGlvbjxUPj4pO1xuICAgIGxhc3RfZmlsdGVyX3ZhbHVlOiBzdHJpbmc7XG4gICAgY29sbGVjdGlvbjogRG9jdW1lbnRDb2xsZWN0aW9uPFQ+O1xuICAgIHBhZ2Vfc2l6ZTogbnVtYmVyO1xufSk6IFVuYXJ5RnVuY3Rpb248T2JzZXJ2YWJsZTxzdHJpbmc+LCBPYnNlcnZhYmxlPEFycmF5PFQ+Pj4gPT5cbiAgICBwaXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoNDAwKSxcbiAgICAgICAgZmlsdGVyKGZpbHRlclZhbHVlID0+IHR5cGVvZiBmaWx0ZXJWYWx1ZSA9PT0gJ3N0cmluZycpLFxuICAgICAgICBzd2l0Y2hNYXAoKGZpbHRlclZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJWYWx1ZS5pbmNsdWRlcyhwYXJhbXMubGFzdF9maWx0ZXJfdmFsdWUpICYmIHBhcmFtcy5jb2xsZWN0aW9uLmRhdGEubGVuZ3RoIDwgcGFyYW1zLnBhZ2Vfc2l6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihwYXJhbXMucmVzb3VyY2VzQXJyYXkuZmlsdGVyKChyZXNvdXJjZTogVCkgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UuYXR0cmlidXRlc1twYXJhbXMuYXR0cmlidXRlX3RvX3NlYXJjaF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJhbXNcbiAgICAgICAgICAgICAgICAuZ2V0QWxsRmMoZmlsdGVyVmFsdWUpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gW10pXG4gICAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoY29sbGVjdGlvbjogRG9jdW1lbnRDb2xsZWN0aW9uPFQ+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnJlc291cmNlc0FycmF5ID0gY29sbGVjdGlvbi5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMubGFzdF9maWx0ZXJfdmFsdWUgPSBmaWx0ZXJWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnJlc291cmNlc0FycmF5O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICApO1xuIiwiaW1wb3J0IHsgU3ViamVjdCAsIFVuYXJ5RnVuY3Rpb24gLCBPYnNlcnZhYmxlICwgcGlwZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgRGVzdHJveWVyIHtcbiAgICBwcml2YXRlIHRha2V1bnRpbDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwdWJsaWMgcGlwZSgpOiBVbmFyeUZ1bmN0aW9uPE9ic2VydmFibGU8YW55PiwgT2JzZXJ2YWJsZTxhbnk+PiB7XG4gICAgICAgIHJldHVybiBwaXBlKHRha2VVbnRpbCh0aGlzLnRha2V1bnRpbCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRha2V1bnRpbC5uZXh0KCk7XG4gICAgICAgIHRoaXMudGFrZXVudGlsLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvdXJjZSwgRG9jdW1lbnRDb2xsZWN0aW9uIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zZWxlY3QnLFxuICAgIHN0eWxlczogW2AubWF0LW9wdGlvbi1mb290ZXIsLm1hdC1vcHRpb24taGVhZGVye3Bvc2l0aW9uOi13ZWJraXQtc3RpY2t5O3Bvc2l0aW9uOnN0aWNreTtiYWNrZ3JvdW5kOmluaGVyaXQ7ei1pbmRleDo5OTkhaW1wb3J0YW50O3dpZHRoOjEwMCV9Lm1hdC1vcHRpb24taGVhZGVye3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MDt0b3A6MH0ubWF0LW9wdGlvbi1mb290ZXJ7Ym90dG9tOjB9Lm1hdC1pY29ue21hcmdpbjowIWltcG9ydGFudH1tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlfWBdLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkXG4gICAgW2Zsb2F0TGFiZWxdPVwiZmxvYXRMYWJlbFwiXG4gICAgW2FwcGVhcmFuY2VdPVwiYXBwYXJlYW5jZVwiXG4+XG4gICAgPG1hdC1sYWJlbD5cbiAgICAgICAge3sgbGFiZWwgfHwgJ1NlbGVjY2lvbmUgdW5hIG9wY2nDg8KzbicgfX1cbiAgICAgICAgPGkgKm5nSWY9XCIhdG9SZWxhdGVcIj4oTmluZ3VuYSk8L2k+XG4gICAgPC9tYXQtbGFiZWw+XG4gICAgPG1hdC1zZWxlY3RcbiAgICAgICAgW25nTW9kZWxdPVwidG9SZWxhdGVcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVSZWxhdGlvbnNoaXBzKCRldmVudClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgZmFsc2VcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgfHwgJ1NlbGVjY2lvbmUgdW5hIG9wY2nDg8KzbidcIlxuICAgICAgICBbbXVsdGlwbGVdPVwibXVsdGlwbGUgfHwgZmFsc2VcIlxuICAgICAgICA+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1vcHRpb24taGVhZGVyXCIgKm5nSWY9XCJhZGFwdGl2ZUFycmF5Lmxlbmd0aCA+PSAxMFwiPlxuICAgICAgICAgICAgPGphbS1zZWFyY2gtaW5wdXRcbiAgICAgICAgICAgICAgICBbdGV4dF09XCJzZWFyY2hUZXh0XCJcbiAgICAgICAgICAgICAgICBbb3BlbmVkXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICh0ZXh0Q2hhbmdlKT1cInVwZGF0ZUZpbHRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgID48L2phbS1zZWFyY2gtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuXG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwicmVtb3ZlUmVsYXRpb25zaGlwc1wiIFt2YWx1ZV09XCJjbGVhcl9yZWxhdGlvbnNoaXBzXCI+LS0gTmluZ3VuYSAtLTwvbWF0LW9wdGlvbj5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCByZXNvdXJjZSBvZiBhZGFwdGl2ZUFycmF5IHwgZmlsdGVyOiBzZWFyY2hUZXh0XCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwicmVzb3VyY2VcIiAqbmdJZj1cInBhcmVudElkICYmIHJlc291cmNlLmlkICE9PSBwYXJlbnRJZFwiPlxuICAgICAgICAgICAgICAgIHt7IHJlc291cmNlLmF0dHJpYnV0ZXNbZGlzcGxheUF0dHJpYnV0ZV0gfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJyZXNvdXJjZVwiICpuZ0lmPVwiIXBhcmVudElkXCI+XG4gICAgICAgICAgICAgICAge3sgcmVzb3VyY2UuYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlXSB9fVxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWF0LW9wdGlvbi1mb290ZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYXQtc2VsZWN0PlxuXG4gICAgPGJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWJ1dHRvblwiICpuZ0lmPVwiaGFzUmVmcmVzaFwiXG4gICAgICAgIChjbGljayk9XCJyZWZyZXNoLmVtaXQoKVwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCI+cmVmcmVzaDwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuPC9tYXQtZm9ybS1maWVsZD5cbmBcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgYXBwYXJlYW5jZTogJ2ZpbGwnIHwgJ291dGxpbmUnIHwgJ2xlZ2FjeScgfCAnc3RhbmRhcmQnID0gJ291dGxpbmUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmbG9hdExhYmVsOiAnbmV2ZXInIHwgJ2Fsd2F5cycgPSAnYWx3YXlzJztcbiAgICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIHBhcmVudElkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRvUmVsYXRlOiBSZXNvdXJjZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzcGxheUF0dHJpYnV0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb247XG4gICAgQElucHV0KCkgcHVibGljIHJlbW92ZVJlbGF0aW9uc2hpcHM6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBoYXNSZWZyZXNoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIHRvUmVsYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxSZXNvdXJjZT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlZnJlc2ggPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBhZGFwdGl2ZUFycmF5OiBBcnJheTxSZXNvdXJjZT4gPSBbXTtcbiAgICBwdWJsaWMgY2xlYXJfcmVsYXRpb25zaGlwcyA9IG51bGw7XG5cbiAgICBwdWJsaWMgc2VhcmNoVGV4dDogc3RyaW5nID0gJyc7XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0aXZlQXJyYXkgPSB0aGlzLmNvbGxlY3Rpb24uZGF0YS5zbGljZSgwLCBOdW1iZXIodGhpcy5saW1pdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGl2ZUFycmF5ID0gdGhpcy5jb2xsZWN0aW9uLmRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b1JlbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy50b1JlbGF0ZSA9IHRoaXMuY29sbGVjdGlvbi5maW5kKHRoaXMudG9SZWxhdGUuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUZpbHRlcihzZWFyY2hfdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHNlYXJjaF90ZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVSZWxhdGlvbnNoaXBzKHJlc291cmNlOiBSZXNvdXJjZSkge1xuICAgICAgICB0aGlzLnRvUmVsYXRlQ2hhbmdlLmVtaXQocmVzb3VyY2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcmFtcywgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLW9wdGlvbi1mb290ZXInLFxuICAgIHN0eWxlczogW2AubW91c2VvdmVyICogLm1vdXNlb3Zlci1jaGlsZHtkaXNwbGF5Om5vbmV9Lm1vdXNlb3Zlcjpob3ZlciAqIC5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTppbmhlcml0fWBdLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1vcHRpb24gY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoxIG1vdXNlb3ZlclwiXG4gICAgKGNsaWNrKT1cImdvVG8oKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCI+YWRkX2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgICAgICA8c3Bhbj57eyBsYWJlbE9wdGlvbiB8fCAnQWRkJ319PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm9wZW5OZXdUYWIgJiYgIXJvdXRlckxpbmtcIj5cbiAgICAgICAgICAgIDxhIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1idXR0b24gbW91c2VvdmVyLWNoaWxkXCIgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBnb1RvKCdfYmxhbmsnKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdC1oaW50XCIgW3N0eWxlLm1hcmdpbl09XCInMCdcIj5vcGVuX2luX25ldzwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9tYXQtb3B0aW9uPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBKYW1PcHRpb25Gb290ZXJDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbGFiZWxPcHRpb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgcm91dGVyTGluazogQXJyYXk8c3RyaW5nPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgcXVlcnlQYXJhbXM6IFBhcmFtcztcbiAgICBASW5wdXQoKSBwdWJsaWMgb3Blbk5ld1RhYjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICAgICkge31cblxuICAgIHB1YmxpYyBnb1RvKHRhcmdldDogJ19zZWxmJyB8ICdfYmxhbmsnID0gJ19zZWxmJykge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXJMaW5rKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSh0aGlzLnJvdXRlckxpbmssIHtcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLmFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnVybCkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oXG4gICAgICAgICAgICAgICAgdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgdGFyZ2V0XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNPYmplY3QsIGlzRnVuY3Rpb24sIGlzVW5kZWZpbmVkIH0gZnJvbSAndXRpbCc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZmlsdGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXRlbXMgTGlzdCBvZiBpdGVtcyB0byBmaWx0ZXJcbiAgICAgKiBAcGFyYW0gdGVybSAgYSBzdHJpbmcgdGVybSB0byBjb21wYXJlIHdpdGggZXZlcnkgcHJvcGVydHkgb2YgdGhlIGxpc3RcbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsdGVyKGl0ZW1zOiBBcnJheTxhbnk+LCB0ZXJtOiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgY29uc3QgdG9Db21wYXJlID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcGVydHkgaW4gaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IHN1Yl9wcm9wZXJ0eSBpbiBpdGVtW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVsnc3RyaW5nJywgJ251bWJlciddLmluY2x1ZGVzKHR5cGVvZiBpdGVtW3Byb3BlcnR5XVtzdWJfcHJvcGVydHldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtW3Byb3BlcnR5XVtzdWJfcHJvcGVydHldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmNsdWRlcyh0b0NvbXBhcmUpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW1zIG9iamVjdCBvciByZXNvdXJjZSBmcm9tIGFycmF5XG4gICAgICogQHBhcmFtIHNlYXJjaFRleHQgc2VhcmNoIHRlcm1cbiAgICAgKi9cbiAgICBwdWJsaWMgdHJhbnNmb3JtKGl0ZW1zOiBhbnksIHNlYXJjaFRleHQ6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmICghc2VhcmNoVGV4dCB8fCAhaXRlbXMpIHJldHVybiBpdGVtcztcblxuICAgICAgICByZXR1cm4gRmlsdGVyUGlwZS5maWx0ZXIoaXRlbXMsIHNlYXJjaFRleHQpO1xuICAgIH1cbn1cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlc3Ryb3llciB9IGZyb20gJy4uL2Rlc3Ryb3llcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXNlYXJjaC1pbnB1dCcsXG4gICAgc3R5bGVzOiBbYGRpdi5vcGVuZWR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xMil9LmphbS1pbnB1dHtib3JkZXI6MDtiYWNrZ3JvdW5kOjAgMDtoZWlnaHQ6NDhweDtwYWRkaW5nOjE2cHg7b3V0bGluZTowIWltcG9ydGFudH0ubWF0LWljb257bWFyZ2luOjAhaW1wb3J0YW50fUBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo2MDBweCl7ZGl2Lm9wZW5lZHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjMzMztiYWNrZ3JvdW5kOiNmZmY7aGVpZ2h0OjQ4cHg7bWF4LWhlaWdodDo0OHB4O2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX1kaXYub3BlbmVkOmFjdGl2ZSxkaXYub3BlbmVkOmZvY3VzLGRpdi5vcGVuZWQ6aG92ZXJ7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX19YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtYnV0dG9uXCIgbWF0VG9vbHRpcD1cIkJ1c2NhclwiXG4gICAgICAgICpuZ0lmPVwiIXNob3dTZWFyY2hcIlxuICAgICAgICAoY2xpY2spPVwic2hvd0lucHV0KClcIj5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJyZXNldC1pbnB1dC1kZWZhdWx0XCIgZnhGbGV4PVwiMTAwXCIgW3N0eWxlLnBhZGRpbmctbGVmdF09XCInMTZweCdcIlxuICAgICAgICAqbmdJZj1cInNob3dTZWFyY2hcIlxuICAgICAgICBbbmdDbGFzc109XCJzaG93U2VhcmNoID8gJ29wZW5lZCcgOiAnJ1wiXG4gICAgICAgIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZcIj5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJqYW0taW5wdXRcIiBmeEZsZXggaWQ9XCJzZWFyY2gtaW5wdXRcIiBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cInNlYXJjaEN0cmxcIiBwbGFjZWhvbGRlcj1cIkJ1c2Nhci4uLlwiPlxuXG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWJ1dHRvblwiIChjbGljayk9XCJzd2l0Y2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0ZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIG9wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgdGV4dENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgc2VhcmNoQ3RybDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcblxuICAgIHB1YmxpYyBzaG93U2VhcmNoID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zaG93U2VhcmNoID0gdGhpcy5vcGVuZWQgfHwgdGhpcy5zaG93U2VhcmNoO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoQ3RybC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveWVyLnBpcGUoKSxcbiAgICAgICAgICAgICAgICBtYXAoeCA9PiB4KSxcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoNDAwKVxuICAgICAgICAgICAgKS5zdWJzY3JpYmUobmV3VmFsdWUgPT4gdGhpcy50ZXh0Q2hhbmdlLmVtaXQobmV3VmFsdWUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0lucHV0KCkge1xuICAgICAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1NlYXJjaCA9IHRoaXMub3BlbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93U2VhcmNoID0gIXRoaXMuc2hvd1NlYXJjaDtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBpZiAodGhpcy5zaG93U2VhcmNoKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0JykuZm9jdXMoKTsgfSwgMCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBzd2l0Y2goKSB7XG4gICAgICAgIGlmICh0aGlzLm9wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93U2VhcmNoID0gdGhpcy5vcGVuZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEN0cmwudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEN0cmwuc2V0VmFsdWUoJycpO1xuICAgICAgICAgICAgdGhpcy50ZXh0Q2hhbmdlLmVtaXQodGhpcy5zZWFyY2hDdHJsLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFNlYXJjaElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi9zZWFyY2gtdGV4dC5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2VhcmNoSW5wdXRDb21wb25lbnQsIEZpbHRlclBpcGVdLFxuICAgIGV4cG9ydHM6IFtTZWFyY2hJbnB1dENvbXBvbmVudCwgRmlsdGVyUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2VhcmNoSW5wdXRNb2R1bGUge31cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmlsdGVyUGlwZSB9IGZyb20gJy4uL3NlYXJjaC1pbnB1dC9zZWFyY2gtdGV4dC5waXBlJztcbmltcG9ydCB7IEphbVNlYXJjaElucHV0TW9kdWxlIH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5tb2R1bGUnO1xuaW1wb3J0IHsgSmFtT3B0aW9uRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24tZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgSmFtU2VhcmNoSW5wdXRNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW0ZpbHRlclBpcGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1NlbGVjdENvbXBvbmVudCwgSmFtT3B0aW9uRm9vdGVyQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbIFNlbGVjdENvbXBvbmVudCwgSmFtT3B0aW9uRm9vdGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1TZWxlY3RNb2R1bGUge31cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zdWJtaXQnLFxuICAgIHN0eWxlczogW2BkaXYsZGl2IGJ1dHRvblt0eXBlPXN1Ym1pdF17d2lkdGg6aW5oZXJpdH1kaXYgYnV0dG9uW3R5cGU9c3VibWl0XXttaW4taGVpZ2h0OjM2cHh9YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uIGNvbG9yPVwiYWNjZW50XCIgKm5nSWY9XCIhbm9DYW5jZWxcIiAoY2xpY2spPVwiY2hhbmdlU3RhdGUoJGV2ZW50KVwiIGNsYXNzPVwiYWNjZW50IHB1bGwtcmlnaHRcIiBycy1lc2Mta2V5PkNhbmNlbGFyPC9idXR0b24+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uICB0eXBlPVwic3VibWl0XCIgYXJpYS1sYWJlbD1cIkd1YXJkYXJcIiBjbGFzcz1cInB1bGwtcmlnaHRcIlxuICAgICAgICBbY29sb3JdPVwic3VibWl0Q29sb3JcIlxuICAgICAgICBbbmdDbGFzc109XCJzdWJtaXRBcHBlYXJhbmNlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImxvYWRpbmcgfHwgZGlzYWJsZWRcIlxuICAgICAgICAoY2xpY2spPVwic3VibWl0KClcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFsb2FkaW5nXCIgY2xhc3M9XCJlbGVtZW50cy11cFwiPnt7IChzdWJtaXRMYWJlbCA/IHN1Ym1pdExhYmVsIDogJ0d1YXJkYXInKSB8IHVwcGVyY2FzZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciBjbGFzcz1cImVsZW1lbnRzLXVwIGRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgbW9kZT1cImluZGV0ZXJtaW5hdGVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIGRpYW1ldGVyPVwiMjBcIlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJDYXJnYW5kbyBFc3BlcmVcIj5cbiAgICAgICAgICAgIDwvbWF0LXByb2dyZXNzLXNwaW5uZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFN1Ym1pdENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHVibGljIHN1Ym1pdEFwcGVhcmFuY2U6ICdtYXQtZmxhdC1idXR0b24nIHwgJ21hdC1zdHJva2VkLWJ1dHRvbicgfCAnbWF0LXJhaXNlZC1idXR0b24nIHwgJ21hdC1idXR0b24nID0gJ21hdC1mbGF0LWJ1dHRvbic7XG4gICAgQElucHV0KCkgcHVibGljIHN1Ym1pdENvbG9yOiAncHJpbWFyeScgfCAnd2FybicgPSAncHJpbWFyeSc7XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBub0NhbmNlbDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsUGFyYW1zU3RhdGU6IG9iamVjdDtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3VibWl0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsU3RhdGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZ29CYWNrID0gZmFsc2U7XG4gICAgQElucHV0KCkgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgcHVibGljIGFjY2VwdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwdWJsaWMgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGNoYW5nZVN0YXRlKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ub0NhbmNlbCAmJiB0aGlzLmdvQmFjaykge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbC5lbWl0KCdnb0JhY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbmNlbCkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FuY2VsU3RhdGUgJiYgKHRoaXMuY2FuY2VsU3RhdGUuc2xpY2UoMCwgMikgPT09ICcuLicpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5jYW5jZWxTdGF0ZV0sIHsgcmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmNhbmNlbFN0YXRlXSwgeyBxdWVyeVBhcmFtczogdGhpcy5jYW5jZWxQYXJhbXNTdGF0ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWNjZXB0LmVtaXQoKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFN1Ym1pdENvbXBvbmVudCB9IGZyb20gJy4vc3VibWl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1N1Ym1pdENvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW1N1Ym1pdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU3VibWl0TW9kdWxlIHt9XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRXN0ZSBjb21wb25lbnQgdHJhYmFqYSBjb24gMiBuZy1jb250ZW50LlxuICogRW4gZWwgY29tcG9uZW50IHF1ZSBzZSB1c2UsIGRlYmUgZGVmaW5pcnNlIGRvcyBuZy1jb250YWluZXIgY29uIGxhcyBjbGFzZXMgY3NzOlxuICogaGVhZGVyLWZpbHRlcnMsIHkgZmlsdGVycywgZGUgZXN0YSBmb3JtYSBlbCBjb21wb25lbnQgc2FiZSBlbiBxdWUgbmctY29udGVudCB1YmljYXIgZWwgY29udGVuaWRvIHF1ZSBzZSBsZSBwYXNhLlxuICovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWZsb2F0aW5nLWZpbHRlcnMnLFxuICAgIHN0eWxlczogW2AvZGVlcC8gLmZpbHRlci1idXR0b24sL2RlZXAvIC5maWx0ZXItYnV0dG9uLXJvdW5kLC9kZWVwLyAuZmlsdGVyLWJ1dHRvbi1zcXVhcmV7cGFkZGluZzowO2NvbG9yOmN1cnJlbnRDb2xvcjtmb250LXdlaWdodDo5MDAhaW1wb3J0YW50O2JveC1zaXppbmc6Ym9yZGVyLWJveH0vZGVlcC8gLmZpbHRlci1idXR0b24gbWF0LWljb24sL2RlZXAvIC5maWx0ZXItYnV0dG9uLXJvdW5kIG1hdC1pY29uLC9kZWVwLyAuZmlsdGVyLWJ1dHRvbi1zcXVhcmUgbWF0LWljb257Y29sb3I6Y3VycmVudENvbG9yIWltcG9ydGFudH0vZGVlcC8gLmZpbHRlci1idXR0b24tcm91bmQ6OmJlZm9yZSwvZGVlcC8gLmZpbHRlci1idXR0b24tc3F1YXJlOjpiZWZvcmUsL2RlZXAvIC5maWx0ZXItYnV0dG9uOjpiZWZvcmV7Y29udGVudDonJztiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtib3JkZXItcmFkaXVzOmluaGVyaXQhaW1wb3J0YW50O29wYWNpdHk6LjA4fS5maWx0ZXItYnV0dG9uLXJvdW5ke2JvcmRlci1yYWRpdXM6MTAwcHghaW1wb3J0YW50fS5maWx0ZXItYnV0dG9uLXNxdWFyZXtib3JkZXItcmFkaXVzOjZweH0uZmlsdGVyLWJ1dHRvbi1zcXVhcmUgYnV0dG9ue2JvcmRlci1yYWRpdXM6NnB4IWltcG9ydGFudH1tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcntiYWNrZ3JvdW5kOjAgMCFpbXBvcnRhbnR9YF0sXG4gICAgdGVtcGxhdGU6IGA8bWF0LWV4cGFuc2lvbi1wYW5lbFxuICAgIFtkaXNhYmxlZF09XCIhaGFzQWR2YW5jZWRGaWx0ZXJzXCJcbiAgICBbaGlkZVRvZ2dsZV09XCJ0cnVlXCJcbiAgICAob3BlbmVkKT1cInRvZ2dsZVN0YXRlRXhwYW5zaW9uUGFuZWwoZmFsc2UpXCJcbiAgICAoY2xvc2VkKT1cInRvZ2dsZVN0YXRlRXhwYW5zaW9uUGFuZWwodHJ1ZSlcIlxuICAgIFtzdHlsZS5ib3gtc2hhZG93XT1cIidub25lJ1wiXG4gICAgY2xhc3M9XCJ3aWR0aC0xMDBcIiBbZXhwYW5kZWRdPVwib3Blbl9leHBhbnNpb25fcGFuZWxcIiBbc3R5bGUuYmFja2dyb3VuZF09XCIndHJhbnNwYXJlbnQnXCI+XG4gICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyIGphbUF2b2lkRGlzYWJsZWRTdHlsZSBbc3R5bGUucGFkZGluZ109XCInMCdcIj5cbiAgICAgICAgPG1hdC1wYW5lbC1kZXNjcmlwdGlvbiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHhcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIFtuZ0NsYXNzXT1cIidmaWx0ZXItYnV0dG9uLScgKyBhcHBlYXJhbmNlXCIgY29sb3I9XCJhY2NlbnRcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc0FkdmFuY2VkRmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTdGF0ZUV4cGFuc2lvblBhbmVsKG9wZW5fZXhwYW5zaW9uX3BhbmVsKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiNHB4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1idXR0b25cIiAoY2xpY2spPVwiY2xlYXJGaWx0ZXJzKG9wZW5fZXhwYW5zaW9uX3BhbmVsKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIdG1sXT1cIiFvcGVuX2V4cGFuc2lvbl9wYW5lbCA/ICdmaWx0ZXJfbGlzdCcgOiAnY2xvc2UnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwib3Blbl9leHBhbnNpb25fcGFuZWwgPyAnQm9ycmFyIGZpbHRyb3MnIDogJ1ZlciBmaWx0cm9zJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RklMVFJPUzwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdFN1ZmZpeFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCInNDAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5uZXJIdG1sXT1cIm9wZW5fZXhwYW5zaW9uX3BhbmVsID8gJ2Fycm93X2Ryb3BfdXAnIDogJ2Fycm93X2Ryb3BfZG93bidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiIChrZXlkb3duKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZy1jb250YWluZXIuamFtLWZpbHRlci1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtcGFuZWwtZGVzY3JpcHRpb24+XG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHggZ3JpZFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZy1jb250YWluZXIuamFtLWZpbHRlci1jb250ZW50XCI+XG4gICAgICAgIDwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbjwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdGaWx0ZXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgaGFzQWR2YW5jZWRGaWx0ZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgYXBwZWFyYW5jZTogJ3JvdW5kJyB8ICdzcXVhcmUnID0gJ3NxdWFyZSc7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNldEZpbHRlcnM6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBwdWJsaWMgc2hvd19yZXNldF9idXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgb3Blbl9leHBhbnNpb25fcGFuZWwgPSBmYWxzZTtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zaG93X3Jlc2V0X2J1dHRvbiA9IHRoaXMucmVzZXRGaWx0ZXJzLm9ic2VydmVycy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVTdGF0ZUV4cGFuc2lvblBhbmVsKHN0YXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3Blbl9leHBhbnNpb25fcGFuZWwgPSAhc3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyRmlsdGVycyhwYW5lbF9zdGF0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIXBhbmVsX3N0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldEZpbHRlcnMuZW1pdCgpO1xuICAgIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRXN0YSBkaXJlY3RpdmUgc2UgdXNhIGVuIGNvbmp1bnRvIGNvbiBsYSBkaXJlY3RpdmUvYXR0cmlidXRlIFtkaXNhYmxlZF0uXG4gKiBFcyBlc3BlY2lhbCBwYXJhIGxvcyBtYXRFeHBhbnNpb25QYW5lbCwgY3VhbmRvIHNlIGFwbGljYW4gYm90b25lcyBkZSBhY2Npb25lcyBhbCBoZWFkZXIgZGUgZXN0ZVxuICogeSBubyBzZSBxdWllcmUgYWJyaXIgZWwgbWF0RXhwYW5zaW9uUGFuZWwsIGVudG9uY2VzIGVzdGEgZGlyZWN0aXYgbG8gcXVlIGhhcsODwqEgZXMgbm8gYXBsaWNhciBsb3MgZXN0aWxvcyBhcGFnYWRvXG4gKiBxdWUgcHJvcG9yY2lvbmEgbWF0ZXJpYWwgY3VhbmRvIHVuIGVsZW1lbnRvL3RhZyBlc3RhIGRlcyBoYWJpbGl0YWRvLlxuICovXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2phbUF2b2lkRGlzYWJsZWRTdHlsZV0nXG59KVxuZXhwb3J0IGNsYXNzIEF2b2lkRGlzYWJsZWRTdHlsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBjaGFuZ2VzOiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBjb25zdCBOQVRJVkVfRUxFTUVOVCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuY2hhbmdlcyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnM6IEFycmF5PE11dGF0aW9uUmVjb3JkPik6IHZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzZXJ2aW5nT3JpZ2luYWxTdHlsZXMobXV0YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZXMub2JzZXJ2ZShOQVRJVkVfRUxFTUVOVCwge1xuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVzZXJ2aW5nT3JpZ2luYWxTdHlsZXMobXV0YXRpb246IE11dGF0aW9uUmVjb3JkKTogdm9pZCB7XG4gICAgICAgIGlmIChtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lICE9PSAnYXJpYS1kaXNhYmxlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtZW50czogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUobXV0YXRpb24udGFyZ2V0Lm5vZGVOYW1lKTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9ICdpbmhlcml0JztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsb2F0aW5nRmlsdGVyc0NvbXBvbmVudCB9IGZyb20gJy4vZmxvYXRpbmctZmlsdGVycy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXZvaWREaXNhYmxlZFN0eWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9hdm9pZC1kaXNhYmxlZC1zdHlsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0Zsb2F0aW5nRmlsdGVyc0NvbXBvbmVudCwgQXZvaWREaXNhYmxlZFN0eWxlRGlyZWN0aXZlXSxcbiAgICBleHBvcnRzOiBbRmxvYXRpbmdGaWx0ZXJzQ29tcG9uZW50LCBBdm9pZERpc2FibGVkU3R5bGVEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIEphbUZsb2F0aW5nRmlsdGVyc01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEltYWdlQ2hhbmdlIH0gZnJvbSAnLi9pbWFnZS1jaGFuZ2UtaW50ZXJmYWNlJztcbmltcG9ydCB7IFVwbG9hZE91dHB1dCB9IGZyb20gJ25neC11cGxvYWRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXBpY3R1cmUtbWFuYWdlcicsXG4gICAgdGVtcGxhdGU6IGA8amFtLXVwbG9hZCBbdXBsb2FkVXJsXT1cInVwbG9hZFVybFwiIChkcmFnQW5kRHJvcENoYW5nZSk9XCJkcmFnQW5kRHJvcFN0eWxlcygkZXZlbnQpXCIgKHNob3dQcmV2aWV3KT1cInNob3dQcmV2aWV3KCRldmVudClcIiBtYXQtaWNvbi1idXR0b24gZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiXG4gICAgW2phbUhlYWRlcnNdPVwiamFtSGVhZGVyc1wiXG4gICAgKHJlc3BvbnNlKT1cInJlc3BvbnNlLmVtaXQoJGV2ZW50KVwiXG4gICAgPlxuICAgIDxkaXYgKm5nSWY9XCJkcmFnX2FuZF9kcm9wXCIgW25nQ2xhc3NdPVwidHlwZSArICctZHJhZy1hbmQtZHJvcC1zdHlsZXMnXCI+PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIiFkcmFnX2FuZF9kcm9wXCIgaWQ9XCJwaWN0dXJlLW1hbmFnZXJcIiBjbGFzcz1cIm1vdXNlb3ZlclwiPlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInR5cGVcIiBbc3R5bGUuYmFja2dyb3VuZC1pbWFnZV09XCIndXJsKCcgKyBzb3VyY2UgKyAnKSdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb3VzZW92ZXItY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmx1clwiIFtzdHlsZS5iYWNrZ3JvdW5kLWltYWdlXT1cIid1cmwoJyArIHNvdXJjZSArICcpJ1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBtYXRUb29sdGlwPVwiU3ViaXIgaW1hZ2VuXCI+YWRkX2FfcGhvdG88L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwic2hvd0RlbGV0ZU9wdGlvblwiPjwvbWF0LWRpdmlkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8amFtLWRlbGV0ZS1jb25maXJtYXRpb24gKm5nSWY9XCJzaG93RGVsZXRlT3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVkXT1cInsgY29sb3I6ICd3aGl0ZScgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRlbGV0ZSk9XCJkZWxldGUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9qYW0tZGVsZXRlLWNvbmZpcm1hdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2phbS11cGxvYWQ+XG5gLFxuICAgIHN0eWxlczogW2BqYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKixqYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKj5tYXQtaWNvbnt3aWR0aDphdXRvO2hlaWdodDphdXRvfS5zcXVhcmV7Ym9yZGVyLXJhZGl1czoyJTtvdmVyZmxvdzpoaWRkZW59LnJvdW5ke2JvcmRlci1yYWRpdXM6NTAlO292ZXJmbG93OmhpZGRlbn0ucm91bmQtZHJhZy1hbmQtZHJvcC1zdHlsZXN7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4wNSk7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTgwcHg7aGVpZ2h0OjE4MHB4O3RvcDowO2xlZnQ6MDt6LWluZGV4OjMzMztiYWNrZ3JvdW5kLWltYWdlOnVybCgvYXNzZXRzL2ltYWdlcy9kcmFnX2FuZF9kcm9wLnBuZyk7Ym9yZGVyLXJhZGl1czo1MCV9LnNxdWFyZS1kcmFnLWFuZC1kcm9wLXN0eWxlc3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjA1KTtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxODBweDtoZWlnaHQ6MTgwcHg7dG9wOjA7bGVmdDowO3otaW5kZXg6MzMzO2JhY2tncm91bmQtaW1hZ2U6dXJsKC9hc3NldHMvaW1hZ2VzL2RyYWdfYW5kX2Ryb3AucG5nKX1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKj5tYXQtaWNvbntjb2xvcjojZmZmO2ZvbnQtc2l6ZTo0LjVyZW19amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyLm1vdXNlb3Zlcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTpub25lOy13ZWJraXQtdHJhbnNpdGlvbjpkaXNwbGF5IC4zczt0cmFuc2l0aW9uOmRpc3BsYXkgLjNzfWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXI6aG92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTppbmhlcml0fWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXI6aG92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGQgLmJsdXJ7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7LXdlYmtpdC1maWx0ZXI6Ymx1cigxMHB4KTstbW96LWZpbHRlcjpibHVyKDEwcHgpOy1tcy1maWx0ZXI6Ymx1cigxMHB4KTstby1maWx0ZXI6Ymx1cigxMHB4KTtmaWx0ZXI6Ymx1cigxMHB4KTt3aWR0aDpjYWxjKDEwMCUgKyA0MHB4KTtoZWlnaHQ6Y2FsYygxMDAlICsgNDBweCk7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxO21hcmdpbjotMjBweH1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgZGl2IG1hdC1kaXZpZGVye3dpZHRoOjYwJTtwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXItY29sb3I6I2ZmZn1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgZGl2e3dpZHRoOjE4MHB4O2hlaWdodDoxODBweDtwb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXJ9amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyLm1vdXNlb3ZlciBkaXY+Lm1vdXNlb3Zlci1jaGlsZCAubWVudXt6LWluZGV4OjM7cG9zaXRpb246YWJzb2x1dGU7dG9wOjB9amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyIGRpdj5kaXYub3ZlcmxheXt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjM3Nil9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGljdHVyZU1hbmFnZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qKlxuICAgICAqIElucHV0c1xuICAgICAqIEBwYXJhbSB0eXBlOiBkZXNjcmliZXMgdGhlIHNoYXBlIG9mIHRoZSBpbWFnZSBjb250YWluZXIsIHRoaXMgcGFyYW1ldGVyIGlzIG9wdGlvbmFsLi5cbiAgICAgKiBAcGFyYW0gc291cmNlOiBpcyBhIHVybCB0byByZWZlcmVuY2UgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIGRlbGV0ZVVybDogaXMgYSB1cmwgZm9yIGRlbGV0aW5nIGFuIGltYWdlLCB0aGlzIHBhcmFtZXRlciBpcyBvcHRpb25hbC5cbiAgICAgKiBAcGFyYW0gdXBsb2FkVXJsOiBpcyBhIHVybCBmb3IgdXBsb2FkaW5nIGFuIGltYWdlLCB0aGlzIHBhcmFtZXRlciBpcyBvcHRpb25hbC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgdHlwZTogJ3NxdWFyZScgfCAncm91bmQnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVsZXRlVXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHVwbG9hZFVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVsZXRlT3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgamFtSGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblxuICAgIC8qKlxuICAgICAqIE91dHB1dHNcbiAgICAgKiBAcGFyYW0gdXBsb2FkQ2hhbmdlOiB1cGRhdGVzIHRoZSBpbWFnZSBhbmQgcmV0dXJucyB0aGUgdXJsIGZvciBpdC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VDaGFuZ2U+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXI8VXBsb2FkT3V0cHV0PigpO1xuXG4gICAgcHVibGljIGRyYWdfYW5kX2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cENsaWVudDogSHR0cENsaWVudCkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nRGVmYXVsdFZhbHVlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmFnQW5kRHJvcFN0eWxlcyhkcmFnX2FuZF9kcm9wOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZHJhZ19hbmRfZHJvcCA9IGRyYWdfYW5kX2Ryb3A7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dQcmV2aWV3KGltYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5kZWxldGVVcmwgPSB0aGlzLmRlbGV0ZVVybCB8fCB0aGlzLnNvdXJjZTtcbiAgICAgICAgdGhpcy51cGxvYWRDaGFuZ2UuZW1pdCh7IHN0YXR1c19jaGFuZ2U6ICd1cGRhdGUnLCBzb3VyY2U6IHRoaXMuc291cmNlIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoKSB7XG4gICAgICAgIGxldCBkZWxldGVfdXJsID0gdGhpcy5jcmVhdERlbGV0ZVVybCh0aGlzLnNvdXJjZSk7XG4gICAgICAgIHRoaXMuaHR0cENsaWVudC5kZWxldGUoZGVsZXRlX3VybCwge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5qYW1IZWFkZXJzXG4gICAgICAgIH0pLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXNwb25zZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkQ2hhbmdlLmVtaXQoeyBzdGF0dXNfY2hhbmdlOiAnZGVsZXRlJywgc291cmNlOiB0aGlzLnNvdXJjZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHRpbmdEZWZhdWx0VmFsdWVzKCkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGUgfHwgJ3NxdWFyZSc7XG4gICAgICAgIHRoaXMuZGVsZXRlVXJsID0gdGhpcy5kZWxldGVVcmwgfHwgdGhpcy5zb3VyY2U7XG4gICAgICAgIHRoaXMudXBsb2FkVXJsID0gdGhpcy51cGxvYWRVcmwgfHwgdGhpcy5zb3VyY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdERlbGV0ZVVybChzb3VyY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBpbWdfdXJsX3BhcnRpZXM6IEFycmF5PHN0cmluZz4gPSBzb3VyY2Uuc3BsaXQoJy8nKTtcbiAgICAgICAgbGV0IGltZ19uYW1lOiBzdHJpbmcgPSBpbWdfdXJsX3BhcnRpZXMucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlVXJsICsgaW1nX25hbWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWdhbGxlcnktbWFuYWdlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0Zvcj1cImxldCBwaWN0dXJlIG9mIHBpY3R1cmVzOyBsZXQgcG9zaXRpb24gPSBpbmRleFwiPlxuICAgIDxtYXQtY2FyZCBjbGFzcz1cIm1hdC1jYXJkLWZsYXQgcGFkZGluZy0wIGNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJcIlxuICAgICAgICAqbmdJZj1cImxpbWl0ID8gcG9zaXRpb24gPD0gbGltaXQgOiB0cnVlXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiaGlnaGxpZ2h0ZWRJbWFnZSA9PSBwb3NpdGlvbiA/ICdJbWFnZW4gcHJpbmNpcGFsJyA6IG51bGxcIlxuICAgICAgICBbbmdDbGFzc109XCJoaWdobGlnaHRlZEltYWdlID09IHBvc2l0aW9uID8gJ21hdC1pY29uIG1hdC1hY2NlbnQgaGlnaGxpZ2h0ZWQtaW1hZ2UtY29udGFpbmVyJyA6IG51bGxcIlxuICAgID5cbiAgICAgICAgPG1hdC1pY29uIGNvbG9yPVwiYWNjZW50XCIgKm5nSWY9XCJoaWdobGlnaHRlZEltYWdlID09IHBvc2l0aW9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGlnaGxpZ2h0ZWQtaW1hZ2VcIlxuICAgICAgICA+Y29sbGVjdGlvbnNfYm9va21hcms8L21hdC1pY29uPlxuICAgICAgICA8amFtLXBpY3R1cmUtbWFuYWdlclxuICAgICAgICAgICAgW3Nob3dEZWxldGVPcHRpb25dPVwic2hvd0RlbGV0ZU9wdGlvblwiXG4gICAgICAgICAgICBbc291cmNlXT1cInBpY3R1cmUuYXR0cmlidXRlcy51cmxcIlxuICAgICAgICAgICAgW3VwbG9hZFVybF09XCJ1cGxvYWRVcmwgKyB1cGRhdGVQaWN0dXJlICsgcGljdHVyZS5pZFwiXG4gICAgICAgICAgICBbamFtSGVhZGVyc109XCJqYW1IZWFkZXJzXCJcbiAgICAgICAgPjwvamFtLXBpY3R1cmUtbWFuYWdlcj5cbiAgICA8L21hdC1jYXJkPlxuPC9kaXY+XG48amFtLXVwbG9hZCBpZD1cImdhbGxlcnktbWFuYWdlclwiIFt1cGxvYWRVcmxdPVwidXBsb2FkVXJsXCIgKHNob3dQcmV2aWV3KT1cInNob3dQcmV2aWV3KCRldmVudClcIlxuICAgICpuZ0lmPVwicGljdHVyZXMgJiYgcGljdHVyZXMubGVuZ3RoIDwgbGltaXRcIiBjbGFzcz1cImNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJcIlxuICAgIFtkaXNhYmxlZF09XCJpbWFnZV9sb2FkaW5nXCJcbiAgICAocmVzcG9uc2UpPVwicmVzcG9uc2UoJGV2ZW50KVwiXG4gICAgbWF0LWljb24tYnV0dG9uIG1hdFRvb2x0aXA9XCJTdWJpciBpbWFnZW5cIlxuICAgIFtqYW1IZWFkZXJzXT1cImphbUhlYWRlcnNcIj5cbiAgICA8bWF0LWljb24gaWQ9XCJiYXNlLWljb25cIiBbbmdDbGFzc109XCJpbWFnZV9sb2FkaW5nID8gJ2Rpc2FibGVkLXVwZGF0ZScgOiBudWxsXCI+YWRkX2FfcGhvdG88L21hdC1pY29uPlxuICAgIDxtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciBjbGFzcz1cImVsZW1lbnRzLXVwIGRlZmF1bHRcIlxuICAgICAgICBjbGFzcz1cImxvYWRpbmctcG9zaXRpb25cIlxuICAgICAgICAqbmdJZj1cImltYWdlX2xvYWRpbmdcIlxuICAgICAgICBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiXG4gICAgICAgIHZhbHVlPVwidmFsdWVcIlxuICAgICAgICBkaWFtZXRlcj1cIjQyXCJcbiAgICAgICAgYXJpYS1sYWJlbD1cIkNhcmdhbmRvIEVzcGVyZVwiPlxuICAgIDwvbWF0LXByb2dyZXNzLXNwaW5uZXI+XG48L2phbS11cGxvYWQ+XG5gLFxuICAgIHN0eWxlczogW2BqYW0tdXBsb2FkICNnYWxsZXJ5LW1hbmFnZXJ7d2lkdGg6YXV0bztoZWlnaHQ6MTAwJX0jYmFzZS1pY29ue3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87Zm9udC1zaXplOjhyZW19LmNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJ7cG9zaXRpb246cmVsYXRpdmU7Ym9yZGVyLXJhZGl1czppbmhlcml0fS5oaWdobGlnaHRlZC1pbWFnZS1jb250YWluZXJ7aGVpZ2h0OmF1dG8haW1wb3J0YW50O3dpZHRoOmF1dG8haW1wb3J0YW50Oy0tY29sb3I6Y3VycmVudENvbG9yO2JvcmRlcjoycHggc29saWQgdmFyKC0tY29sb3IpfS5oaWdobGlnaHRlZC1pbWFnZXtwYWRkaW5nOjJweDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O2JhY2tncm91bmQ6aW5oZXJpdDtib3JkZXItcmFkaXVzOjEwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwcHg7bGVmdDpjYWxjKDEwMCUgLSAxNHB4KTt6LWluZGV4OjJ9LmxvYWRpbmctcG9zaXRpb257cG9zaXRpb246YWJzb2x1dGU7dG9wOjU0cHg7bGVmdDo0OHB4fS5kaXNhYmxlZC11cGRhdGV7b3BhY2l0eTouM31gXVxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHBpY3R1cmVzOiBBcnJheTxSZXNvdXJjZSB8IGFueT47XG4gICAgQElucHV0KCkgcHVibGljIHVwbG9hZFVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB1cGRhdGVQaWN0dXJlOiBzdHJpbmcgPSAnL3Bob3Rvcy8nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVsZXRlT3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgamFtSGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IGhpZ2hsaWdodGVkSW1hZ2VcbiAgICAgKiBQb3NpdGlvbiBpbiB0aGUgYXJyYXkgb2YgdGhlIGhpZ2hsaWdodGVkIGltYWdlLCBieSBkZWZhdWx0IGlzIHRoZSBwb3NpdGlvbiAwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBoaWdobGlnaHRlZEltYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgQE91dHB1dCgpIHB1YmxpYyBhZGRQaWN0dXJlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNwb25zZVBpY3R1cmUgPSBuZXcgRXZlbnRFbWl0dGVyPFJlc291cmNlPigpO1xuXG4gICAgcHVibGljIGltYWdlX2xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZEltYWdlID0gdGhpcy5oaWdobGlnaHRlZEltYWdlIHx8IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dQcmV2aWV3KGltZykge1xuICAgICAgICB0aGlzLmFkZFBpY3R1cmUuZW1pdChpbWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNwb25zZShldmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSAhPT0gJ2RvbmUnKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlX2xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbWFnZV9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzcG9uc2VQaWN0dXJlLmVtaXQoZXZlbnQuZmlsZS5yZXNwb25zZS5kYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVXBsb2FkT3V0cHV0LCBVcGxvYWRJbnB1dCwgVXBsb2FkRmlsZSwgaHVtYW5pemVCeXRlcywgVXBsb2FkZXJPcHRpb25zIH0gZnJvbSAnbmd4LXVwbG9hZGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tdXBsb2FkJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXY+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgbmdGaWxlRHJvcCBbb3B0aW9uc109XCJvcHRpb25zXCIgKHVwbG9hZE91dHB1dCk9XCJvblVwbG9hZE91dHB1dCgkZXZlbnQpXCIgW3VwbG9hZElucHV0XT1cInVwbG9hZElucHV0XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInVwbG9hZC1idXR0b24gbWFyZ2luLTBcIlxuICAgICAgICAgICAgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8aW5wdXQgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdHlwZT1cImZpbGVcIiBjbGFzcz1cImxheW91dC1tYXJnaW5cIiBuZ0ZpbGVTZWxlY3RcbiAgICAgICAgICAgICAgICBbdXBsb2FkSW5wdXRdPVwidXBsb2FkSW5wdXRcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW29wdGlvbnNdPVwib3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJwcmV2aWV3SW1hZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHVwbG9hZE91dHB1dCk9XCJvblVwbG9hZE91dHB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBtdWx0aXBsZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdGb3I9XCJsZXQgZiBvZiBmaWxlczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJmLnByb2dyZXNzLmRhdGEgPCAxMDBcIj48L21hdC1zcGlubmVyPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFVwbG9hZENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHVibGljIHVwbG9hZFVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gICAgQElucHV0KCkgcHVibGljIHJlZGlyZWN0OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBqYW1IZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBodHRwQ2xpZW50OiBIdHRwQ2xpZW50O1xuICAgIHB1YmxpYyBvcHRpb25zOiBVcGxvYWRlck9wdGlvbnM7XG4gICAgcHVibGljIGZvcm1EYXRhOiBGb3JtRGF0YTtcbiAgICBwdWJsaWMgZmlsZXM6IEFycmF5PFVwbG9hZEZpbGU+O1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkSW5wdXQ6IEV2ZW50RW1pdHRlcjxVcGxvYWRJbnB1dD47XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzaG93UHJldmlldzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNwb25zZTogRXZlbnRFbWl0dGVyPFVwbG9hZE91dHB1dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBkcmFnQW5kRHJvcENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHB1YmxpYyBodW1hbml6ZUJ5dGVzRnVuY3Rpb246IEZ1bmN0aW9uO1xuICAgIHB1YmxpYyBkcmFnT3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICB0aGlzLmZpbGVzID0gW107IC8vIGxvY2FsIHVwbG9hZGluZyBmaWxlcyBhcnJheVxuICAgICAgICB0aGlzLnVwbG9hZElucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxVcGxvYWRJbnB1dD4oKTsgLy8gaW5wdXQgZXZlbnRzLCB3ZSB1c2UgdGhpcyB0byBlbWl0IGRhdGEgdG8gbmd4LXVwbG9hZGVyXG4gICAgICAgIHRoaXMuaHVtYW5pemVCeXRlc0Z1bmN0aW9uID0gaHVtYW5pemVCeXRlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25VcGxvYWRPdXRwdXQob3V0cHV0OiBVcGxvYWRPdXRwdXQpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChvdXRwdXQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYWxsQWRkZWRUb1F1ZXVlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhZGRlZFRvUXVldWUnOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0LmZpbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0ltYWdlKG91dHB1dC5maWxlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcy5wdXNoKG91dHB1dC5maWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd1cGxvYWRpbmcnOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3V0cHV0LmZpbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBjdXJyZW50IGRhdGEgaW4gZmlsZXMgYXJyYXkgZm9yIHVwbG9hZGluZyBmaWxlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWxlcy5maW5kSW5kZXgoZmlsZSA9PiB0eXBlb2Ygb3V0cHV0LmZpbGUgIT09ICd1bmRlZmluZWQnICYmIGZpbGUuaWQgPT09IG91dHB1dC5maWxlLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlc1tpbmRleF0gPSBvdXRwdXQuZmlsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZW1vdmVkJzpcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZmlsZSBmcm9tIGFycmF5IHdoZW4gcmVtb3ZlZFxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSB0aGlzLmZpbGVzLmZpbHRlcigoZmlsZTogVXBsb2FkRmlsZSkgPT4gSlNPTi5zdHJpbmdpZnkoZmlsZSkgIT09IEpTT04uc3RyaW5naWZ5KG91dHB1dC5maWxlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnT3Zlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnQW5kRHJvcENoYW5nZS5lbWl0KHRoaXMuZHJhZ092ZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJhZ091dCc6XG4gICAgICAgICAgICBjYXNlICdkcm9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnQW5kRHJvcENoYW5nZS5lbWl0KHRoaXMuZHJhZ092ZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG9uZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGVyLnVybCArICcvJyArIG91dHB1dC5maWxlLnJlc3BvbnNlLmlkXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzcG9uc2UuZW1pdChvdXRwdXQpO1xuICAgIH1cblxuICAgIC8vIFRoZSBwcmV2aWV3IGZ1bmN0aW9uXG4gICAgcHVibGljIHByZXZpZXdJbWFnZShmaWxlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUubmF0aXZlRmlsZSB8fCBmaWxlLnRhcmdldC5maWxlc1swXSk7XG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGltYWdlOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93UHJldmlldy5lbWl0KGltYWdlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydFVwbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IFVwbG9hZElucHV0ID0ge1xuICAgICAgICAgICAgdHlwZTogJ3VwbG9hZEFsbCcsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXBsb2FkVXJsLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsIC8vIGFnZXJnYXIgZGF0b3NcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuamFtSGVhZGVyc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVwbG9hZElucHV0LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYW5jZWxVcGxvYWQoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwbG9hZElucHV0LmVtaXQoeyB0eXBlOiAnY2FuY2VsJywgaWQ6IGlkIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVGaWxlKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGxvYWRJbnB1dC5lbWl0KHsgdHlwZTogJ3JlbW92ZScsIGlkOiBpZCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQWxsRmlsZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBsb2FkSW5wdXQuZW1pdCh7IHR5cGU6ICdyZW1vdmVBbGwnIH0pO1xuICAgIH1cbn1cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE4IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWNvbmZpcm1hdGlvbi1kaWFsb2cnLFxuICAgIHRlbXBsYXRlOiBgPGgyICpuZ0lmPVwiZGF0YS50aXRsZVwiIG1hdC1kaWFsb2ctdGl0bGUgW2lubmVySHRtbF09XCJkYXRhLnRpdGxlXCI+PC9oMj5cbjxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPHAgW2lubmVySHRtbF09XCJkYXRhLm1zZ1wiPjwvcD5cbjwvbWF0LWRpYWxvZy1jb250ZW50PlxuPG1hdC1kaWFsb2ctYWN0aW9ucyBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1kaWFsb2ctY2xvc2U+Tm88L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gW21hdC1kaWFsb2ctY2xvc2VdPVwidHJ1ZVwiIFtpbm5lckh0bWxdPVwiZGF0YS5hY2NlcHRcIj48L2J1dHRvbj5cbjwvbWF0LWRpYWxvZy1hY3Rpb25zPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50PiwgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKCFkYXRhLmFjY2VwdCkge1xuICAgICAgICAgICAgZGF0YS5hY2NlcHQgPSAnU8ODwq0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGF0YS5tc2cpIHtcbiAgICAgICAgICAgIGRhdGEubXNnID0gJ8OCwr9Fc3TDg8KhIHNlZ3VybyBxdWUgZGVzZWEgY29udGludWFyPyc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWRlbGV0ZS1jb25maXJtYXRpb24nLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImFwcGVhcmFuY2UgfHwgJ21hdC1pY29uLWJ1dHRvbiBtYXQtYnV0dG9uJ1wiXG4gICAgICAgIChjbGljayk9XCJzaG93Q29uZmlybSgpXCJcbiAgICAgICAgW2NvbG9yXT1cInNtYXJ0Q29sb3JbYXBwZWFyYW5jZV1cIlxuICAgICAgICBbbmdTdHlsZV09XCJzdHlsZWRcIlxuICAgICAgICBbbWF0VG9vbHRpcF09XCJ0b29sdGlwIHx8IHRleHQgfHwgJ0VsaW1pbmFyJ1wiXG4gICAgICAgID5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlSWNvbiA/IHN0eWxlSWNvbiA6ICcnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7eyBpY29uID8gaWNvbiA6ICdkZWxldGUnIH19XG4gICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0ZXh0ICYmIGFwcGVhcmFuY2UgIT09ICdtYXQtaWNvbi1idXR0b24nXCIgW2lubmVySHRtbF09XCJ0ZXh0XCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVDb25maXJtYXRpb25Db21wb25lbnQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0eXBlOiAnaWNvbicgfCAnYnV0dG9uJyA9ICdpY29uJzsgLyoqIEBEZXByZWNhdGVkICovXG4gICAgQElucHV0KCkgcHVibGljIGljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtc2c6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjbGFzc2VkOiBzdHJpbmc7IC8qKiBARGVwcmVjYXRlZCAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzdHlsZWQ6IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzdHlsZUljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgYWNjZXB0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGFwcGVhcmFuY2U6ICdtYXQtYnV0dG9uJyB8ICdtYXQtcmFpc2VkLWJ1dHRvbicgfFxuICAgICAgICAnbWF0LWZsYXQtYnV0dG9uJyB8ICdtYXQtc3Ryb2tlZC1idXR0b24nIHwgJ21hdC1pY29uLWJ1dHRvbicgPSAnbWF0LWljb24tYnV0dG9uJztcbiAgICBAT3V0cHV0KCkgcHVibGljIGRlbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgc21hcnRDb2xvciA9IHtcbiAgICAgICAgJ21hdC1idXR0b24nOiAnYWNjZW50JyxcbiAgICAgICAgJ21hdC1yYWlzZWQtYnV0dG9uJzogJ3ByaW1hcnknLFxuICAgICAgICAnbWF0LWZsYXQtYnV0dG9uJzogJ3ByaW1hcnknLFxuICAgICAgICAnbWF0LXN0cm9rZWQtYnV0dG9uJzogJ2FjY2VudCcsXG4gICAgICAgICdtYXQtaWNvbi1idXR0b24nOiAnZGVmYXVsdCdcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2dcbiAgICApIHtcbiAgICAgICAgdGhpcy5tc2cgPSB0aGlzLm1zZyB8fCAnw4LCv0VzdMODwqEgc2VndXJvIGRlIGVsaW1pbmFyPyc7XG4gICAgICAgIHRoaXMuYWNjZXB0ID0gdGhpcy5hY2NlcHQgfHwgJ1PDg8KtJztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0NvbmZpcm0oKTogdm9pZCB7XG4gICAgICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgICAgICAgIGRhdGE6IHsgdGl0bGU6IHRoaXMudGl0bGUsIG1zZzogdGhpcy5tc2csIGFjY2VwdDogdGhpcy5hY2NlcHQgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBEZWxldGVDb25maXJtYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2RlbGV0ZS1jb25maXJtYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEZWxldGVDb25maXJtYXRpb25Db21wb25lbnQsIENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbQ29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50LCBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbURlbGV0ZUNvbmZpcm1hdGlvbk1vZHVsZSB7fVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFVwbG9hZGVyTW9kdWxlIH0gZnJvbSAnbmd4LXVwbG9hZGVyJztcbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vdXBsb2FkL3VwbG9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGljdHVyZU1hbmFnZXJDb21wb25lbnQgfSBmcm9tICcuL3BpY3R1cmUvcGljdHVyZS1tYW5hZ2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudCB9IGZyb20gJy4vZ2FsbGVyeS9nYWxsZXJ5LW1hbmFnZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEphbURlbGV0ZUNvbmZpcm1hdGlvbk1vZHVsZSB9IGZyb20gJy4uL2RlbGV0ZS1jb25maXJtYXRpb24vZGVsZXRlLWNvbmZpcm1hdGlvbi5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgSmFtRGVsZXRlQ29uZmlybWF0aW9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBOZ3hVcGxvYWRlck1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtVcGxvYWRDb21wb25lbnQsIFBpY3R1cmVNYW5hZ2VyQ29tcG9uZW50LCBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW1BpY3R1cmVNYW5hZ2VyQ29tcG9uZW50LCBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtUGljdHVyZU1hbmFnZXJNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvdXJjZSwgRG9jdW1lbnRDb2xsZWN0aW9uLCBTZXJ2aWNlIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmaWx0ZXJPclJlcXVlc3QgfSBmcm9tICcuLi9iYXRjaCc7XG5pbXBvcnQgeyB0cmFja0J5SWQgfSBmcm9tICcuLi90cmFjay1ieS1pZCc7XG5pbXBvcnQgeyBJUGFnZSB9IGZyb20gJ25neC1qc29uYXBpL2ludGVyZmFjZXMvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWNoaXBzLWF1dG9jb21wbGV0ZScsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgW3N0eWxlLndpZHRoLiVdPVwiJzEwMCdcIiBbYXBwZWFyYW5jZV09XCJhcHBlYXJhbmNlXCI+XG4gICAgPG1hdC1sYWJlbCAqbmdJZj1cIm1hdExhYmVsXCI+e3sgbWF0TGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICA8bWF0LWNoaXAtbGlzdCAjY2hpcExpc3Q+XG4gICAgICAgIDxtYXQtY2hpcFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJlc291cmNlX3Jlc291cmNlIG9mIGNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcy5kYXRhOyB0cmFja0J5OiBjb2xsZWN0aW9uX3JlbGF0aW9uc2hpcHMudHJhY2tCeVwiXG4gICAgICAgICAgICBbc2VsZWN0YWJsZV09XCJzZWxlY3RhYmxlXCJcbiAgICAgICAgICAgIFtyZW1vdmFibGVdPVwicmVtb3ZhYmxlXCJcbiAgICAgICAgICAgIChyZW1vdmVkKT1cInJlbW92ZVJlc291cmNlKHJlc291cmNlX3Jlc291cmNlKVwiPlxuICAgICAgICAgICAge3sgcmVzb3VyY2VfcmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVzRGlzcGxheVswXV0gfX1cbiAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmUgKm5nSWY9XCJyZW1vdmFibGVcIj5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlciB8fCAnJ1wiXG4gICAgICAgICAgICAjcmVzb3VyY2VJbnB1dFxuICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiXG4gICAgICAgICAgICBbbWF0Q2hpcElucHV0Rm9yXT1cImNoaXBMaXN0XCJcbiAgICAgICAgICAgIFttYXRDaGlwSW5wdXRBZGRPbkJsdXJdPVwiYWRkT25CbHVyXCI+XG4gICAgPC9tYXQtY2hpcC1saXN0PlxuXG4gICAgPG1hdC1hdXRvY29tcGxldGUgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgKG9wdGlvblNlbGVjdGVkKT1cImFkZFJlc291cmNlKCRldmVudC5vcHRpb24udmFsdWUpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHJlc291cmNlIG9mIGZpbHRlcmVkQ29sbGVjdGlvbiB8IGFzeW5jOyB0cmFja0J5OiB0cmFja0J5SWRcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwiIWNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcy5maW5kKHJlc291cmNlLmlkKVwiIFt2YWx1ZV09XCJyZXNvdXJjZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImxheW91dC1tYXJnaW5cIj5wZXJzb248L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnt7IHJlc291cmNlLmF0dHJpYnV0ZXNbYXR0cmlidXRlc0Rpc3BsYXlbMF1dIH19PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgICAgICA8c21hbGwgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgKm5nRm9yPVwibGV0IGF0dHJpYnV0ZV9uYW1lIG9mIGF0dHJpYnV0ZXNEaXNwbGF5OyBsZXQgYXR0cl9pZCA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImF0dHJfaWQgPj0gMVwiPnwge3sgcmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVfbmFtZV0gfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gXG59KVxuZXhwb3J0IGNsYXNzIENoaXBzQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdyZXNvdXJjZUlucHV0JykgcHVibGljIHJlc291cmNlSW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHJlc291cmNlOiBSZXNvdXJjZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXJ2aWNlOiBTZXJ2aWNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZWxhdGlvbkFsaWFzOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGF0dHJpYnV0ZXNEaXNwbGF5OiBBcnJheTxzdHJpbmc+O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhcHBlYXJhbmNlOiAnc3RhbmRhcmQnIHwgJ291dGxpbmUnIHwgJ2xlZ2FjeScgfCAnZmlsbCc7XG4gICAgQElucHV0KCkgcHVibGljIG1hdExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHBhZ2U6IElQYWdlID0ge1xuICAgICAgICBudW1iZXI6IDEsXG4gICAgICAgIHNpemU6IDUwXG4gICAgfTtcblxuICAgIHB1YmxpYyB0cmFja0J5SWQgPSB0cmFja0J5SWQ7XG4gICAgcHVibGljIGZpbHRlcmVkQ29sbGVjdGlvbjogT2JzZXJ2YWJsZTxBcnJheTxSZXNvdXJjZT4+O1xuICAgIHB1YmxpYyBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgcHVibGljIGNvbGxlY3Rpb246IERvY3VtZW50Q29sbGVjdGlvbjtcbiAgICBwdWJsaWMgYWRkT25CbHVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHJlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNvbGxlY3Rpb25fcmVsYXRpb25zaGlwczogRG9jdW1lbnRDb2xsZWN0aW9uO1xuXG4gICAgcHJpdmF0ZSBjb2xsZWN0aW9uQXJyYXk6IEFycmF5PFJlc291cmNlPiA9IFtdO1xuICAgIHByaXZhdGUgY29sbGVjdGlvbkFycmF5TGFzdEZpbHRlclZhbHVlOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSB0aGlzLnNlcnZpY2UubmV3Q29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25fcmVsYXRpb25zaGlwcyA9IDxEb2N1bWVudENvbGxlY3Rpb24+dGhpcy5yZXNvdXJjZS5yZWxhdGlvbnNoaXBzW3RoaXMucmVsYXRpb25BbGlhc107XG5cbiAgICAgICAgdGhpcy5maWx0ZXJlZENvbGxlY3Rpb24gPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgZmlsdGVyT3JSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVfdG9fc2VhcmNoOiB0aGlzLmF0dHJpYnV0ZXNEaXNwbGF5WzBdLFxuICAgICAgICAgICAgICAgIHJlc291cmNlc0FycmF5OiB0aGlzLmNvbGxlY3Rpb25BcnJheSxcbiAgICAgICAgICAgICAgICBnZXRBbGxGYzogdGhpcy5nZXRBbGwuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBsYXN0X2ZpbHRlcl92YWx1ZTogdGhpcy5jb2xsZWN0aW9uQXJyYXlMYXN0RmlsdGVyVmFsdWUsXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5jb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIHBhZ2Vfc2l6ZTogdGhpcy5wYWdlLnNpemVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbChzZWFyY2hfdGV4dDogc3RyaW5nKTogT2JzZXJ2YWJsZTxEb2N1bWVudENvbGxlY3Rpb24+IHtcbiAgICAgICAgaWYgKHNlYXJjaF90ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUZpbHRlciA9IHsgLi4udGhpcy5yZW1vdGVGaWx0ZXIsIC4uLnsgW3RoaXMuYXR0cmlidXRlc0Rpc3BsYXlbMF1dOiBzZWFyY2hfdGV4dCB9fTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZVxuICAgICAgICAgICAgICAgIC5hbGwoe1xuICAgICAgICAgICAgICAgICAgICByZW1vdGVmaWx0ZXI6IHRoaXMucmVtb3RlRmlsdGVyLFxuICAgICAgICAgICAgICAgICAgICBwYWdlOiB7IG51bWJlcjogMSwgc2l6ZTogdGhpcy5wYWdlLnNpemUgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZVxuICAgICAgICAgICAgLmFsbCh7XG4gICAgICAgICAgICAgICAgcmVtb3RlZmlsdGVyOiB0aGlzLnJlbW90ZUZpbHRlcixcbiAgICAgICAgICAgICAgICBwYWdlOiB7IG51bWJlcjogMSwgc2l6ZTogdGhpcy5wYWdlLnNpemUgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZpbHRlckNvbGxlY3Rpb24oc2VhcmNoX3RleHQ6IHN0cmluZyB8IFJlc291cmNlKTogQXJyYXk8UmVzb3VyY2U+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSB0eXBlb2Ygc2VhcmNoX3RleHQgPT09ICdzdHJpbmcnID8gc2VhcmNoX3RleHQudG9Mb3dlckNhc2UoKSA6ICcnO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uZGF0YS5maWx0ZXIoKHJlc291cmNlOiBSZXNvdXJjZSkgPT4gcmVzb3VyY2UuYXR0cmlidXRlc1t0aGlzLmF0dHJpYnV0ZXNEaXNwbGF5WzBdXVxuICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgLmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZS5hZGRSZWxhdGlvbnNoaXAocmVzb3VyY2UsIHRoaXMucmVsYXRpb25BbGlhcyk7XG4gICAgICAgIHRoaXMucmVzb3VyY2VJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BsYXlOYW1lKHJlc291cmNlOiBSZXNvdXJjZSk6ICcnIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZS5yZW1vdmVSZWxhdGlvbnNoaXAodGhpcy5yZWxhdGlvbkFsaWFzLCByZXNvdXJjZS5pZCk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRDaGlwc01vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlLCBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBDaGlwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vY2hpcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdENoaXBzTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0NoaXBzQXV0b2NvbXBsZXRlQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbQ2hpcHNBdXRvY29tcGxldGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUNoaXBzQXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJ25neC1qc29uYXBpJztcblxuZXhwb3J0IGludGVyZmFjZSBJRWRpdFRleHRBdHRyaWJ1dGVEYXRhIHtcbiAgICByZXNvdXJjZTogUmVzb3VyY2U7XG4gICAgYXR0cmlidXRlOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBhY2NlcHQ/OiBzdHJpbmc7XG4gICAgbWVzc2FnZT86IHN0cmluZztcbiAgICB0ZXh0YXJlYV9sYWJlbD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZWRpdC10ZXh0LWF0dHJpYnV0ZScsXG4gICAgdGVtcGxhdGU6IGA8Zm9ybSBuYW1lPVwibXlGb3JtXCIgbm92YWxpZGF0ZSAobmdTdWJtaXQpPVwidXBkYXRlQXR0cmlidXRlQW5kQ2xvc2UoZGF0YS5hdHRyaWJ1dGUsIHRleHRfdmFsdWUpXCI+XG4gICAgPGgyICpuZ0lmPVwiZGF0YS50aXRsZVwiIG1hdC1kaWFsb2ctdGl0bGUgW2lubmVySHRtbF09XCJkYXRhLnRpdGxlXCI+PC9oMj5cbiAgICA8bWF0LWRpYWxvZy1jb250ZW50PlxuICAgICAgICA8cCAqbmdJZj1cImRhdGEubWVzc2FnZVwiPnt7IGRhdGEubWVzc2FnZSB9fTwvcD5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkXG4gICAgICAgICAgICBhcHBlYXJhbmNlPVwib3V0bGluZVwiXG4gICAgICAgICAgICBmeEZsZXhcbiAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1sYWJlbD57eyBkYXRhLnRleHRhcmVhX2xhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgICAgICA8dGV4dGFyZWEgbWF4bGVuZ3RoPVwiMTQwXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwidGV4dF9hdHRyaWJ1dGVcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAjdGV4dGFyZWFcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInRleHRfdmFsdWVcIlxuICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICA+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cImVuZFwiPnt7dGV4dGFyZWEudmFsdWUubGVuZ3RofX0gLyAxNDA8L21hdC1oaW50PlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvbWF0LWRpYWxvZy1jb250ZW50PlxuXG4gICAgPG1hdC1kaWFsb2ctYWN0aW9ucyBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgIDxqYW0tc3VibWl0XG4gICAgICAgICAgICAoY2FuY2VsKT1cImRpYWxvZ1JlZi5jbG9zZSgpXCJcbiAgICAgICAgICAgIFtzdWJtaXRMYWJlbF09XCJkYXRhLmFjY2VwdFwiXG4gICAgICAgID48L2phbS1zdWJtaXQ+XG4gICAgPC9tYXQtZGlhbG9nLWFjdGlvbnM+XG48L2Zvcm0+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEVkaXRUZXh0QXR0cmlidXRlRGlhbG9nQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgdGV4dF92YWx1ZSA9ICcnO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RWRpdFRleHRBdHRyaWJ1dGVEaWFsb2dDb21wb25lbnQ+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IElFZGl0VGV4dEF0dHJpYnV0ZURhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhLmFjY2VwdCkge1xuICAgICAgICAgICAgZGF0YS5hY2NlcHQgPSAnQWNlcHRhcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6IGtleXVwJywgWyckZXZlbnQnXSkgcHVibGljIG9uS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyAmJiAhZXZlbnQuc2hpZnRLZXkpICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBdHRyaWJ1dGVBbmRDbG9zZSh0aGlzLmRhdGEuYXR0cmlidXRlLCB0aGlzLnRleHRfdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUF0dHJpYnV0ZUFuZENsb3NlKGF0dHJpYnV0ZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGF0YS5yZXNvdXJjZS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBKYW1TdWJtaXRNb2R1bGUgfSBmcm9tICcuLi9zdWJtaXQvc3VibWl0Lm1vZHVsZSc7XG5pbXBvcnQge1xuICAgIEVkaXRUZXh0QXR0cmlidXRlRGlhbG9nQ29tcG9uZW50XG59IGZyb20gJy4vZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBKYW1TdWJtaXRNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbRWRpdFRleHRBdHRyaWJ1dGVEaWFsb2dDb21wb25lbnRdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0VkaXRUZXh0QXR0cmlidXRlRGlhbG9nQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRWRpdFRleHRBdHRyaWJ1dGVEaWFsb2dDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUVkaXRUZXh0QXR0cmlidXRlTW9kdWxlIHt9XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQHBhcmFtIGlkOiBUaGUgaWQgbXVzdCBiZSBjb21wb3NlZCBvZiB0aGUgcmVzb3VyY2UgZm9sbG93ZWQgYnkgYSBwZXJpb2QgYW5kIGEgc2hvcnQsXG4gKiBkZXNjcmlwdGl2ZSBtZXNzYWdlIG9mIHRoZSB3YXJuaW5nIGluIHF1ZXN0aW9uLlxuICogQHBhcmFtIG1lc3NhZ2U6IEl0IG11c3QgYmUgYSBkZXNjcmlwdGl2ZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcGFyYW0gbGluazogSXQgaXMgb3B0aW9uYWwsIGFuZCBtdXN0IGNvbnRhaW4gYSByb3V0ZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJV2FybmluZyB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgbGluaz86IHN0cmluZztcbiAgICAgICAgbGlua1F1ZXJ5UGFyYW1zPzoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gICAgICAgIGV4dGVybmFsTGluaz86IHN0cmluZztcbiAgICAgICAgbGlua1RleHQ/OiBzdHJpbmc7XG4gICAgfTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRvcFdhcm5pbmdTZXJ2aWNlIHtcbiAgICBwdWJsaWMgd2FybmluZ3M6IEFycmF5PElXYXJuaW5nPiA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogUmVjZWl2ZXMgYSB3YXJuaW5nIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdhcm5pbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0V2FybmluZ01lc3NhZ2Uod2FybmluZzogSVdhcm5pbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF3YXJuaW5nKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmluZ3MubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaCh3YXJuaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWFyY2hfd2FybmluZyA9IHRoaXMud2FybmluZ3MuZmluZChtc2pfd2FybmluZyA9PiBtc2pfd2FybmluZy5pZCA9PT0gd2FybmluZy5pZCk7XG4gICAgICAgIGlmICghc2VhcmNoX3dhcm5pbmcgfHwgc2VhcmNoX3dhcm5pbmcuaWQgIT09IHdhcm5pbmcuaWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaCh3YXJuaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYXJuaW5nTWVzc2FnZSgpOiBBcnJheTxJV2FybmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5ncztcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJNZXNzYWdlKHdhcm5pbmdfa2V5czogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCB3YXJuaW5nIG9mIHRoaXMud2FybmluZ3MpIHtcbiAgICAgICAgICAgIGlmICghd2FybmluZ19rZXlzLmluY2x1ZGVzKHdhcm5pbmcuaWQpKSBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMud2FybmluZ3MuaW5kZXhPZih3YXJuaW5nKTtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9wV2FybmluZ1NlcnZpY2UgfSBmcm9tICcuL3RvcC13YXJuaW5nLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS10b3Atd2FybmluZycsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWFjY29yZGlvbiAqbmdJZj1cInRvcFdhcm5pbmdTZXJ2aWNlLndhcm5pbmdzLmxlbmd0aCA+IDBcIj5cbiAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbCBpZD1cInJzVG9wV2FybmluZ1wiIGNsYXNzPVwieWVsbG93LWJnLTQwMFwiXG4gICAgICAgIFtleHBhbmRlZF09XCJvcGVuZWRcIlxuICAgICAgICBbbmdDbGFzc109XCJvcGVuZWQgPyAnaGlkZGVuLWhlYWRlcicgOiAnJ1wiXG4gICAgICAgIFtoaWRlVG9nZ2xlXT1cInRydWVcIlxuICAgICAgICAoZXhwYW5kZWRDaGFuZ2UpPVwidG9nZ2xlT3BlbkFjY29yZGlvbigkZXZlbnQpXCI+XG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciAqbmdJZj1cIiFvcGVuZWRcIj5cbiAgICAgICAgICAgIDxtYXQtcGFuZWwtZGVzY3JpcHRpb24gZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj57eyBidXR0b25faWNvbnNbYnV0dG9uX3N0YXRlXSB9fTwvbWF0LWljb24+XG4gICAgICAgICAgICA8L21hdC1wYW5lbC1kZXNjcmlwdGlvbj5cbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHdhcm4gb2YgdG9wV2FybmluZ1NlcnZpY2Uud2FybmluZ3NcIj5cbiAgICAgICAgICAgICAgICA8amFtLXNpbmdsZS13YXJuaW5nXG4gICAgICAgICAgICAgICAgICAgIFttZXNzYWdlXT1cIndhcm4uYXR0cmlidXRlcy5tZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgW2xpbmtdPVwid2Fybi5hdHRyaWJ1dGVzLmxpbmtcIlxuICAgICAgICAgICAgICAgICAgICBbbGlua1F1ZXJ5UGFyYW1zXT1cIndhcm4uYXR0cmlidXRlcy5saW5rUXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgICAgICAgICBbZXh0ZXJuYWxMaW5rXT1cIndhcm4uYXR0cmlidXRlcy5leHRlcm5hbExpbmtcIlxuICAgICAgICAgICAgICAgICAgICBbbGlua1RleHRdPVwid2Fybi5hdHRyaWJ1dGVzLmxpbmtUZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwvamFtLXNpbmdsZS13YXJuaW5nPlxuICAgICAgICAgICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IFtzdHlsZS5jdXJzb3JdPVwiJ3BvaW50ZXInXCIgY2xhc3M9XCJhY3Rpb24tYnV0dG9uXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5lZCA9IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm9wZW5lZFwiXG4gICAgICAgICAgICAgICAgICAgID57eyBidXR0b25faWNvbnNbYnV0dG9uX3N0YXRlXSB9fTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxuPC9tYXQtYWNjb3JkaW9uPlxuYCxcbiAgICBzdHlsZXM6IFtgLnllbGxvdy1iZy00MDB7YmFja2dyb3VuZDojZmZlZTU4fS5vdmVybGF5e3otaW5kZXg6OTk5fS50ZXh0LWNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn1tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcntoZWlnaHQ6MTVweCFpbXBvcnRhbnR9Omhvc3QgL2RlZXAvIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWJvZHl7cGFkZGluZy1ib3R0b206MH1tYXQtZGl2aWRlcntib3JkZXItY29sb3I6I2ZiYzAyZCFpbXBvcnRhbnR9bWF0LWljb257Y29sb3I6Izc1NzU3NX0uYWN0aW9uLWJ1dHRvbntoZWlnaHQ6MjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBUb3BXYXJuaW5nQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgb3BlbmVkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgYnV0dG9uX3N0YXRlOiAnZXhwYW5kZWQnIHwgJ2NvbnRyYWN0ZWQnIHwgJ3N0YW5kYnknID0gJ3N0YW5kYnknO1xuICAgIHB1YmxpYyBidXR0b25faWNvbnMgPSB7XG4gICAgICAgIGV4cGFuZGVkOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgIGNvbnRyYWN0ZWQ6ICdrZXlib2FyZF9hcnJvd191cCcsXG4gICAgICAgIHN0YW5kYnk6ICdyZW1vdmUnXG4gICAgfTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgdG9wV2FybmluZ1NlcnZpY2U6IFRvcFdhcm5pbmdTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdEFjY29yZGlvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gICAgcHVibGljIG9uTW91c2VFbnRlcigpIHtcbiAgICAgICAgdGhpcy5vcGVuZWQgPyB0aGlzLmJ1dHRvbl9zdGF0ZSA9ICdjb250cmFjdGVkJyA6IHRoaXMuYnV0dG9uX3N0YXRlID0gJ2V4cGFuZGVkJztcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgICBwdWJsaWMgb25Nb3VzZUxlYXZlKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbl9zdGF0ZSA9ICdzdGFuZGJ5JztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlT3BlbkFjY29yZGlvbihvcGVuZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuZWQgPSBvcGVuZWQ7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvcGVuZWQnLCB0aGlzLm9wZW5lZC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVmYXVsdEFjY29yZGlvblN0YXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW5lZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvcGVuZWQnKSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG59XG4iLCIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXNpbmdsZS13YXJuaW5nJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtY2FyZCBjbGFzcz1cIm1hdC1jYXJkLWZsYXQgeWVsbG93LWJnLTQwMCB3aWR0aC0xMDBcIlxuICAgICpuZ0lmPVwibWVzc2FnZVwiXG4gICAgW25nU3R5bGVdPVwiY3VzdG9tX3N0eWxlc1wiXG4+XG4gICAgPHNwYW4+e3sgbWVzc2FnZSB9fTwvc3Bhbj5cbiAgICA8YVxuICAgICAgICBbcm91dGVyTGlua109XCJsaW5rXCJcbiAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cImxpbmtRdWVyeVBhcmFtcyB8fCB7fVwiXG4gICAgICAgICpuZ0lmPVwibGlua1wiXG4gICAgICAgID5cbiAgICAgICAge3sgbGlua1RleHQgfHwgJ03Dg8KhcyBpbmZvcm1hY2nDg8KzbicgfX1cbiAgICA8L2E+XG4gICAgPGFcbiAgICAgICAgW2hyZWZdPVwiZXh0ZXJuYWxMaW5rXCJcbiAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgKm5nSWY9XCJleHRlcm5hbExpbmtcIlxuICAgICAgICA+XG4gICAgICAgIHt7IGxpbmtUZXh0IHx8ICdNw4PCoXMgaW5mb3JtYWNpw4PCs24nIH19XG4gICAgPC9hPlxuXG4gICAgPGJ1dHRvblxuICAgICAgICAqbmdJZj1cImFjdGlvbkJ1dHRvblRleHRcIlxuICAgICAgICBtYXQtYnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBuYW1lPVwiYnV0dG9uXCJcbiAgICAgICAgKGNsaWNrKT1cImFjdGlvbkJ1dHRvbkNsaWNrLmVtaXQoKVwiXG4gICAgICAgID5cbiAgICAgICAge3sgYWN0aW9uQnV0dG9uVGV4dCB9fVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJhY3Rpb25JY29uQnV0dG9uXCJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIFttYXRUb29sdGlwXT1cImFjdGlvbkljb25CdXR0b25Ub29sdGlwXCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG5hbWU9XCJidXR0b25cIlxuICAgICAgICAoY2xpY2spPVwiYWN0aW9uSWNvbkJ1dHRvbkNsaWNrLmVtaXQoKVwiXG4gICAgICAgID5cbiAgICAgICAgPG1hdC1pY29uPlxuICAgICAgICAgICAge3sgYWN0aW9uSWNvbkJ1dHRvbiB9fVxuICAgICAgICA8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuPC9tYXQtY2FyZD5cbmAsXG4gICAgc3R5bGVzOiBbYC55ZWxsb3ctYmctNDAwe2JveC1zaXppbmc6Ym9yZGVyLWJveDtiYWNrZ3JvdW5kOiNmZmVlNTg7Y29sb3I6IzIxMjEyMX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTaW5nbGVXYXJuaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdGV4dENvbG9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGxpbms6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbGlua1F1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGxpbmtUZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGFjdGlvbkJ1dHRvblRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgYWN0aW9uSWNvbkJ1dHRvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhY3Rpb25JY29uQnV0dG9uVG9vbHRpcDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgYWN0aW9uQnV0dG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIGFjdGlvbkljb25CdXR0b25DbGljazogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgcHVibGljIGN1c3RvbV9zdHlsZXM6IHtcbiAgICAgICAgY29sb3I/OiBzdHJpbmc7XG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJz86IHN0cmluZztcbiAgICB9ID0ge307XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmJhY2tncm91bmRDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21fc3R5bGVzWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50ZXh0Q29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX3N0eWxlcy5jb2xvciA9IHRoaXMudGV4dENvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRFeHBhbnNpb25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IFRvcFdhcm5pbmdDb21wb25lbnQgfSBmcm9tICcuL3RvcC13YXJuaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW5nbGVXYXJuaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9zaW5nbGUtd2FybmluZy9zaW5nbGUtd2FybmluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9wV2FybmluZ1NlcnZpY2UgfSBmcm9tICcuL3RvcC13YXJuaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgICAgIC8vIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbVG9wV2FybmluZ0NvbXBvbmVudCwgU2luZ2xlV2FybmluZ0NvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbVG9wV2FybmluZ1NlcnZpY2VdLFxuICAgIGV4cG9ydHM6IFtUb3BXYXJuaW5nQ29tcG9uZW50LCBTaW5nbGVXYXJuaW5nQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1Ub3BXYXJuaW5nTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZGlhbG9nLWxvZ2dlZC1zdGF0ZScsXG4gICAgdGVtcGxhdGU6IGA8aDMgbWF0LWRpYWxvZy10aXRsZT5UdSBzZXNpw4PCs24gc2UgaGEgY2VycmFkby48L2gzPlxuPGhyPlxuPG1hdC1kaWFsb2ctY29udGVudD5cbiAgICA8cD5FcyBuZWNlc2FyaW8gcXVlIHZ1ZWx2YXMgYSBpbmdyZXNhciB0dSB1c3VhcmlvIHkgY29udHJhc2XDg8KxYS4gw4LCoVZhbW9zIGEgZWxsbyE8L3A+XG48L21hdC1kaWFsb2ctY29udGVudD5cbjxtYXQtZGlhbG9nLWFjdGlvbnMgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgIDxqYW0tc3VibWl0IChhY2NlcHQpPVwib25DbG9zZUNvbmZpcm0oKVwiIFtub0NhbmNlbF09XCJ0cnVlXCIgc3VibWl0TGFiZWw9XCJBY2VwdGFyXCI+PC9qYW0tc3VibWl0PlxuPC9tYXQtZGlhbG9nLWFjdGlvbnM+XG5gXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0xvZ2dlZFN0YXRlQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJvdGVjdGVkIHRoaXNEaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudD4pIHt9XG5cbiAgICBwdWJsaWMgb25DbG9zZUNvbmZpcm0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGhpc0RpYWxvZ1JlZi5jbG9zZSgnQ29uZmlybScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlQ2FuY2VsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRoaXNEaWFsb2dSZWYuY2xvc2UoJ0NhbmNlbCcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBKc29uYXBpQ29yZSB9IGZyb20gJ25neC1qc29uYXBpJztcbmltcG9ydCB7IFRvYXN0ZXJTZXJ2aWNlIH0gZnJvbSAnYW5ndWxhcjItdG9hc3Rlcic7XG5pbXBvcnQgeyBEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2xvZ2dlZC1zdGF0ZS9kaWFsb2ctbG9nZ2VkLXN0YXRlLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbFN0YXRlU2VydmljZSB7XG4gICAgbG9nb3V0KCk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKYW1FcnJvckhhbmRsZXIgZXh0ZW5kcyBFcnJvckhhbmRsZXIge1xuICAgIHB1YmxpYyBsYXN0RXJyb3JDYWNoZWQgPSB7IHRpdGxlOiAnJywgdGltZTogMCB9O1xuICAgIHB1YmxpYyB0b2tlbl9kaWFsb2dfaXNfb3BlbjogYm9vbGVhbjtcbiAgICBwdWJsaWMgZ2xvYmFsU3RhdGVTZXJ2aWNlOiBJR2xvYmFsU3RhdGVTZXJ2aWNlO1xuICAgIHB1YmxpYyBzaG93X2FuZ3VsYXJfZXJyb3JzID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHB1YmxpYyBtYXREaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgICAgcHVibGljIHRvYXN0ZXJTZXJ2aWNlOiBUb2FzdGVyU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIHRoaXMuTm90aWZpY2F0aW9uKCdFcnJvciBhbCBjb250YWN0YXIgY29uIGVsIHNlcnZpZG9yLCBpbnRlbnRhIG51ZXZhbWVudGUgbcODwqFzIHRhcmRlLicpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNTAwIHx8IGVycm9yLm1lc3NhZ2UgJiYgZXJyb3IubWVzc2FnZSA9PT0gJ1NlcnZlciBFcnJvcicpIHtcbiAgICAgICAgICAgIHRoaXMudW5oYW5kbGVkRXJyb3IoZXJyb3Iuc3RhdHVzKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5lcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSnNvbmFwaUVycm9ycyhlcnJvcik7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IucmVqZWN0aW9uKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGZpcnN0IGNhc2UgaXMgZm9yIGd1ZXN0IG1vZHVsZSByZWplY3Rpb25zXG4gICAgICAgICAgICBpZiAoZXJyb3IucmVqZWN0aW9uLmVycm9yICYmIGVycm9yLnJlamVjdGlvbi5lcnJvci5lcnJvcnMpIHRoaXMuaGFuZGxlSnNvbmFwaUVycm9ycyhlcnJvci5yZWplY3Rpb24uZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlamVjdGlvbi5lcnJvcnMpIHRoaXMuaGFuZGxlSnNvbmFwaUVycm9ycyhlcnJvci5yZWplY3Rpb24pO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmVqZWN0aW9uOicsIGVycm9yLnJlamVjdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMudW5oYW5kbGVkRXJyb3IoZXJyb3Iuc3RhdHVzKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvci5tZXNzYWdlICYmIHRoaXMuc2hvd19hbmd1bGFyX2Vycm9ycykge1xuICAgICAgICAgICAgdGhpcy51bmhhbmRsZWRFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlSnNvbmFwaUVycm9ycyhlcnJvciwgdXNlX2Vycm9yX2NhY2hlID0gdHJ1ZSkge1xuICAgICAgICBmb3IgKGxldCBhY3R1YWxfZXJyb3Igb2YgZXJyb3IuZXJyb3JzKSB7XG5cbiAgICAgICAgICAgIGlmICh1c2VfZXJyb3JfY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAvLyBzaSBlcyB1bHRpbW8gbWVuc2FqZSByZWNpYmlkbyB5IHNvbG8gaGFuIHBhc2FkbyAyIHNlZ3VuZG9zLCBubyBtdWVzdHJhIGVycm9yXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdEVycm9yQ2FjaGVkLnRpdGxlID09PSBhY3R1YWxfZXJyb3IudGl0bGUgJiYgdGhpcy5sYXN0RXJyb3JDYWNoZWQudGltZSA+IERhdGUubm93KCkgLSAyMDAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RFcnJvckNhY2hlZC50aXRsZSA9IGFjdHVhbF9lcnJvci50aXRsZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RFcnJvckNhY2hlZC50aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoIChhY3R1YWxfZXJyb3IudGl0bGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5vdGlmaWNhdGlvbihhY3R1YWxfZXJyb3IuZGV0YWlsLCAnZXJyb3InKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAnQmFkIHJlcXVlc3QnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0dWFsX2Vycm9yLmRldGFpbC5pbmNsdWRlcygnVG9rZW4gcmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHRoaXMubG9nT3V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSW52YWxpZCBkYXRhIHJlY2VpdmVkJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdHVhbF9lcnJvci5kZXRhaWwgPT09ICdUaGUgcmVmcmVzaCB0b2tlbiBtdXN0IGJlIGF0IGxlYXN0IDIwIGNoYXJhY3RlcnMuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHRoaXMubG9nT3V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnVG9rZW4gaGFzIGV4cGlyZWQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1Rva2VuIG5vdCBwcm92aWRlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bihhc3luYyAoKSA9PiB0aGlzLmxvZ091dCgpKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSAnVG9vIG1hbnkgYXR0ZW1wdHMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5vdGlmaWNhdGlvbignSGFzIGFnb3RhZG8gZWwgbMODwq1taXRlIGRlIGludGVudG9zLCBlc3BlcmEgdW4gbW9tZW50byBhbnRlcyBkZSBjb250aW51YXIuJywgJ2Vycm9yJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYW5ub3QgdXNlIHNwZWNpYWwgY29uZGl0aW9ucyB0byBTV0lUQ0ggc3RhdGVtZW50IHdpdGhvdXQgY2hhbmdpbmcgdGhlIGRhdGEgaW5zaWRlIHN3aXRjaCB0byBcInRydWVcIlxuICAgICAgICAgICAgaWYgKGFjdHVhbF9lcnJvci5kZXRhaWwuaW5jbHVkZXMoJ1Rva2VuIHJlcXVpcmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4gdGhpcy5sb2dPdXQoKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYWN0dWFsX2Vycm9yLmRldGFpbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0V4cGlyZWQgYWNjZXNzIHRva2VuLic6XG4gICAgICAgICAgICAgICAgY2FzZSAnVGhlIHJlZnJlc2ggdG9rZW4gaXMgaW52YWxpZC4gQ2Fubm90IGRlY3J5cHQgdGhlIHJlZnJlc2ggdG9rZW4nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0ludmFsaWQgYWNjZXNzIHRva2VuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHRoaXMubG9nT3V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaW5nbGVFcnJvcihhY3R1YWxfZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvZ091dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9rZW5fZGlhbG9nX2lzX29wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRva2VuX2RpYWxvZ19pc19vcGVuID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZGlhbG9nX3JlZiA9IHRoaXMubWF0RGlhbG9nLm9wZW4oRGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnQsIHtcbiAgICAgICAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpYWxvZ19yZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnRva2VuX2RpYWxvZ19pc19vcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbFN0YXRlU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvcm0oZm9ybTogRm9ybUdyb3VwKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgfVxuXG4gICAgcHVibGljIE5vdGlmaWNhdGlvbih0aXRsZTogc3RyaW5nLCB0eXBlPzogJ3N1Y2Nlc3MnIHwgJ2Vycm9yJyB8ICdpbmZvJyB8ICd3YXJuaW5nJywgYm9keT86IHN0cmluZykge1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSB0aXRsZS5zcGxpdCgnfCcpO1xuICAgICAgICB0eXBlID0gdHlwZSB8fCAnZXJyb3InO1xuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlLnBvcCh0eXBlLCB0aXRsZSwgYm9keSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlYWNoIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBpZiAoZWFjaCAhPT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlLnBvcCh0eXBlLCBlYWNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaW5nbGVFcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoIWVycm9yLmRldGFpbCAmJiAhZXJyb3IudGl0bGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgY2FudCBiZSBoYW5kbGVkOicsIGVycm9yKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybSAmJiBlcnJvci5zb3VyY2UgJiYgdGhpcy5mb3JtLmdldChlcnJvci5zb3VyY2UuYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldChlcnJvci5zb3VyY2UuYXR0cmlidXRlKS5zZXRFcnJvcnMoeyAnc2VydmVyLWVycm9yJzogZXJyb3IuZGV0YWlsIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5Ob3RpZmljYXRpb24oZXJyb3IuZGV0YWlsIHx8IGVycm9yLnRpdGxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bmhhbmRsZWRFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5Ob3RpZmljYXRpb24oXG4gICAgICAgICAgICAnVXBzLCBoYSBvY3VycmlkbyB1biBlcnJvci4gQ29udMODwqFjdGFub3MgcG9yIGNvcnJlbyBhIHNvcG9ydGVAbXVsdGluZXhvLmNvbScsXG4gICAgICAgICAgICAnZXJyb3InLFxuICAgICAgICAgICAgYEPDg8KzZGlnbyBkZSBlcnJvcjogJHttZXNzYWdlfWBcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBKYW1TdWJtaXRNb2R1bGUgfSBmcm9tICcuLi9zdWJtaXQvc3VibWl0Lm1vZHVsZSc7XG5pbXBvcnQgeyBKYW1FcnJvckhhbmRsZXIgfSBmcm9tICcuL2Vycm9yLWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2xvZ2dlZC1zdGF0ZS9kaWFsb2ctbG9nZ2VkLXN0YXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIEphbVN1Ym1pdE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbSmFtRXJyb3JIYW5kbGVyXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW0RpYWxvZ0xvZ2dlZFN0YXRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1FcnJvckhhbmRsZXJNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhdERhdGVwaWNrZXJSYW5nZVZhbHVlLCBTYXREYXRlcGlja2VySW5wdXRFdmVudCB9IGZyb20gJ3NhdHVybi1kYXRlcGlja2VyJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuY29uc3Qgc3RhcnRfdGltZSA9IFswLCAwLCAwXTtcbmNvbnN0IGVuZF90aW1lID0gWzIzLCA1OSwgNTldO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1yYW5nZS1kYXRlcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBbbWF0VG9vbHRpcF09XCJsYWJlbFwiPlxuICAgIDxtYXQtc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbFwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAoY2xpY2spPVwiYXBwbHlDdXN0b21SYW5nZSgkZXZlbnQsIHJlc3VsdFBpY2tlcik7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgICAgICAgICA8c2F0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFByZWZpeCBbZm9yXT1cInJlc3VsdFBpY2tlclwiPjwvc2F0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgPGlucHV0IG1hdElucHV0XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJSYW5nbyBwZXJzb25hbGl6YWRvXCJcbiAgICAgICAgICAgICAgICAjcmVzdWx0UGlja2VyTW9kZWw9XCJuZ01vZGVsXCJcbiAgICAgICAgICAgICAgICBbc2F0RGF0ZXBpY2tlcl09XCJyZXN1bHRQaWNrZXJcIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgKGRhdGVJbnB1dCk9XCJvbkRhdGVJbnB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoZGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2UoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPHNhdC1kYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAjcmVzdWx0UGlja2VyIFtyYW5nZU1vZGVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPC9zYXQtZGF0ZXBpY2tlcj5cblxuICAgICAgICAgICAgPGRpdiBtYXRTdWZmaXggZnhGbGV4PVwiMTBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRUb29sdGlwPVwiTGltcGlhciBmaWx0cm9cIiAoY2xpY2spPVwiY2xlYXJSYW5nZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuXG4gICAgICAgIDxtYXQtb3B0aW9uIChjbGljayk9XCJhcHBseVRvZGF5KClcIj5Ib3k8L21hdC1vcHRpb24+XG4gICAgICAgIDxtYXQtb3B0aW9uIChjbGljayk9XCJhcHBseUxhc3RXZWVrKClcIj7Dg8KabHRpbWEgc2VtYW5hPC9tYXQtb3B0aW9uPlxuICAgICAgICA8bWF0LW9wdGlvbiAoY2xpY2spPVwiYXBwbHlDdXJyZW50TW9udGgoKVwiPkVzdGUgbWVzPC9tYXQtb3B0aW9uPlxuICAgICAgICA8bWF0LW9wdGlvbiAoY2xpY2spPVwiYXBwbHlsYXN0TW9udGgoKVwiPkVsIG1lcyBwYXNhZG88L21hdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0PlxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gICAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxuICAgIHN0eWxlczogW2BtYXQtZm9ybS1maWVsZHtmb250LXNpemU6MTVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBSYW5nZURhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBkYXRlOiBTYXREYXRlcGlja2VyUmFuZ2VWYWx1ZTxEYXRlPjtcbiAgICBwdWJsaWMgbGFzdERhdGVJbnB1dDogU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT4gfCBudWxsO1xuICAgIHB1YmxpYyBsYXN0RGF0ZUNoYW5nZTogU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT4gfCBudWxsO1xuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHVibGljIHN0YXJ0RGF0ZTogRGF0ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZW5kRGF0ZTogRGF0ZTtcblxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc3RhcnREYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZW5kRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHVwZGF0ZURhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGF0ZVBpcGU6IERhdGVQaXBlKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxhYmVsID0gJ1JhbmdvIGRlIGZlY2hhJztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlSW5wdXQoZXZlbnQ6IFNhdERhdGVwaWNrZXJJbnB1dEV2ZW50PERhdGU+KTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFzdERhdGVJbnB1dCA9IGV2ZW50LnZhbHVlIGFzIFNhdERhdGVwaWNrZXJSYW5nZVZhbHVlPERhdGU+O1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGVDaGFuZ2UodGhpcy5sYXN0RGF0ZUlucHV0LmJlZ2luLCB0aGlzLmxhc3REYXRlSW5wdXQuZW5kKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlQ2hhbmdlKGV2ZW50OiBTYXREYXRlcGlja2VySW5wdXRFdmVudDxEYXRlPik6IHZvaWQge1xuICAgICAgICB0aGlzLmxhc3REYXRlQ2hhbmdlID0gZXZlbnQudmFsdWUgYXMgU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT47XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZUNoYW5nZSh0aGlzLmxhc3REYXRlQ2hhbmdlLmJlZ2luLCB0aGlzLmxhc3REYXRlQ2hhbmdlLmVuZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFwcGx5Q3VzdG9tUmFuZ2UoZXZlbnQsIHBpY2tlcik6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcGlja2VyLm9wZW4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwbHlMYXN0V2VlaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXREYXRlKHRoaXMuZW5kRGF0ZS5nZXREYXRlKCkgLSA2KTtcbiAgICAgICAgdGhpcy5kYXRlID0geyBiZWdpbjogdGhpcy5zdGFydERhdGUsIGVuZDogdGhpcy5lbmREYXRlIH07XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZUNoYW5nZSh0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwbHlUb2RheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBseUN1cnJlbnRNb250aCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCAxKTtcbiAgICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSArIDEsIDApO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclJhbmdlKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmRhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGVDaGFuZ2UobnVsbCwgbnVsbCk7XG4gICAgICAgIHRoaXMubGFiZWwgPSAnUmFuZ28gZGUgZmVjaGEnO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBseWxhc3RNb250aCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpIC0gMSwgMSk7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCksIDApO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRGF0ZUNoYW5nZShzdGFydF9kYXRlOiBEYXRlLCBlbmRfZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHN0YXJ0X2RhdGU7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IGVuZF9kYXRlO1xuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy50b2dnbGVQcmV2aWV3VGV4dChzdGFydF9kYXRlLCBlbmRfZGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlQ2hhbmdlLmVtaXQodGhpcy5mb3JtYXREYXRlQW5kQWRkVGltZShzdGFydF9kYXRlLCBzdGFydF90aW1lKSk7XG4gICAgICAgIHRoaXMuZW5kRGF0ZUNoYW5nZS5lbWl0KHRoaXMuZm9ybWF0RGF0ZUFuZEFkZFRpbWUoZW5kX2RhdGUsIGVuZF90aW1lKSk7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2dnbGVQcmV2aWV3VGV4dChzdGFydF9kYXRlOiBEYXRlLCBlbmRfZGF0ZT86IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc3RhcnRfZGF0ZSAmJiBlbmRfZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUHJldmlld1RleHQoc3RhcnRfZGF0ZSwgZW5kX2RhdGUpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRfZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5cyhzdGFydF9kYXRlKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZF9kYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXlzKGVuZF9kYXRlKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXlzKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAoZGF0ZS5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuICdob3knO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsICdkZCBNTU0geXl5eScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUHJldmlld1RleHQoc3RhcnRfZGF0ZTogRGF0ZSwgZW5kX2RhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc3RhcnRfZGF0ZS5nZXRGdWxsWWVhcigpICE9PSBlbmRfZGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHN0YXJ0X2RhdGUsICdkZCBNTU0geXl5eSAtICcpICtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShlbmRfZGF0ZSwgJ2RkIE1NTSB5eXl5JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRfZGF0ZS5nZXRNb250aCgpID09PSBlbmRfZGF0ZS5nZXRNb250aCgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb21wYXJlRGF5c09mVGhlU2FtZU1vbnRoKCkpIHJldHVybiB0aGlzLmdldERheXMoc3RhcnRfZGF0ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oc3RhcnRfZGF0ZSwgJ2RkIC0gJykgK1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGVuZF9kYXRlLCAnZGQnKSArXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZW5kX2RhdGUsICcgTU1NIHl5eXknKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShzdGFydF9kYXRlLCAnZGQgTU1NIC0gJykgK1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZW5kX2RhdGUsICdkZCBNTU0nKSArXG4gICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShlbmRfZGF0ZSwgJyB5eXl5JylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXBhcmVEYXlzT2ZUaGVTYW1lTW9udGgoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZS5nZXREYXRlKCkgPT09IHRoaXMuZW5kRGF0ZS5nZXREYXRlKCkpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0RGF0ZUFuZEFkZFRpbWUoZGF0ZTogRGF0ZSwgdGltZTogQXJyYXk8bnVtYmVyPik6IERhdGUge1xuICAgICAgICBkYXRlLnNldEhvdXJzKHRpbWVbMF0sIHRpbWVbMV0sIHRpbWVbMl0pO1xuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRPcHRpb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJhbmdlRGF0ZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vcmFuZ2UtZGF0ZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2F0RGF0ZXBpY2tlck1vZHVsZSwgU2F0TmF0aXZlRGF0ZU1vZHVsZSB9IGZyb20gJ3NhdHVybi1kYXRlcGlja2VyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBTYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgICAgICBTYXREYXRlcGlja2VyTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdE9wdGlvbk1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUmFuZ2VEYXRlcGlja2VyQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbUmFuZ2VEYXRlcGlja2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1SYW5nZURhdGVwaWNrZXJNb2R1bGUge31cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZhYlNwZWVkRGlhbE1pbmlCdXR0b24gfSBmcm9tICcuL2ZhYi1zcGVlZC1kaWFsLW1pbmktYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmFiLXNwZWVkLWRpYWwnLFxuICAgIHRlbXBsYXRlOiBgPGVjby1mYWItc3BlZWQtZGlhbFxuICAgIGNsYXNzPVwicnMtc3BlZWQtZGlhbC0tcG9zaXRpb25cIlxuICAgIFthbmltYXRpb25Nb2RlXT1cImFuaW1hdGlvbk1vZGVcIlxuICAgIChtb3VzZW92ZXIpPVwidG9nZ2xlRmFiU3RhdHVzKCdvcGVuJylcIlxuICAgIChtb3VzZWxlYXZlKT1cInRvZ2dsZUZhYlN0YXR1cygnY2xvc2UnKVwiXG4gICAgWyhvcGVuKV09XCJmYWJfc3RhdHVzLm9wZW5lZFwiXG4gICAgW2ZpeGVkXT1cInRydWVcIlxuICAgID5cbiAgICA8ZWNvLWZhYi1zcGVlZC1kaWFsLXRyaWdnZXIgW3NwaW5dPVwic3BpblwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYXQtZmFiXG4gICAgICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwidG9vbHRpcFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiZmFiU3BlZWREaWFsQ2xpY2suZW1pdCgpXCJcbiAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmsgfHwgW11cIlxuICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cInF1ZXJ5UGFyYW1zXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDxtYXQtaWNvbj57eyBmYWJfc3RhdHVzLm9wZW5lZCA/IGljb24gOiAnYWRkJyB9fTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZWNvLWZhYi1zcGVlZC1kaWFsLXRyaWdnZXI+XG5cbiAgICA8ZWNvLWZhYi1zcGVlZC1kaWFsLWFjdGlvbnMgW2hpZGRlbl09XCIhZmFiX3N0YXR1cy5vcGVuZWRcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGZhYlNwZWVkRGlhbE1pbmlCdXR0b24gb2YgZmFiU3BlZWREaWFsTWluaUJ1dHRvbnNcIlxuICAgICAgICAgICAgbWF0LW1pbmktZmFiXG4gICAgICAgICAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi50b29sdGlwXCJcbiAgICAgICAgICAgIChjbGljayk9XCJhY3Rpb25zQ2xpY2suZW1pdChmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmtleSlcIlxuICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5yb3V0ZXJfbGluayB8fCBbXVwiXG4gICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5xdWVyeV9wYXJhbXMgfHwgcXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiZmFiU3BlZWREaWFsTWluaUJ1dHRvbi5pY29uLnR5cGUgPT09ICdzdmctaWNvbidcIiBbc3ZnSWNvbl09XCJmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmljb24ubmFtZVwiPjwvbWF0LWljb24+XG4gICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJmYWJTcGVlZERpYWxNaW5pQnV0dG9uLmljb24udHlwZSA9PT0gJ21hdC1pY29uJ1wiPnt7IGZhYlNwZWVkRGlhbE1pbmlCdXR0b24uaWNvbi5uYW1lIH19PC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9lY28tZmFiLXNwZWVkLWRpYWwtYWN0aW9ucz5cbjwvZWNvLWZhYi1zcGVlZC1kaWFsPlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRmFiU3BlZWREaWFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBhbmltYXRpb25Nb2RlOiBzdHJpbmcgPSAnc2NhbGUnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0b29sdGlwOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoKSBwdWJsaWMgc3BpbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcHVibGljIGljb246IHN0cmluZyA9ICdhZGQnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByb3V0ZXJMaW5rOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZmFiU3BlZWREaWFsTWluaUJ1dHRvbnM6IEFycmF5PEZhYlNwZWVkRGlhbE1pbmlCdXR0b24+ID0gW107XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGZhYlNwZWVkRGlhbENsaWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBhY3Rpb25zQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGZhYl9zdGF0dXMgPSB7XG4gICAgICAgIG9wZW5lZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogJ2Nsb3NlZCdcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMucXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlQYXJhbXMgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUZhYlN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMuc3RhdHVzID0gJ29wZW5lZCc7XG4gICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFiX3N0YXR1cy5zdGF0dXMgPSAnY2xvc2VkJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZhYl9zdGF0dXMuc3RhdHVzID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhYl9zdGF0dXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIEZhYlNwZWVkRGlhbE1pbmlCdXR0b24ge1xuICAgIHB1YmxpYyBrZXk6IHN0cmluZztcbiAgICBwdWJsaWMgbmF2aWdhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xuICAgIHB1YmxpYyByb3V0ZXJfbGluazogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgcXVlcnlfcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICBwdWJsaWMgaWNvbjogeyBuYW1lOiBzdHJpbmc7IHR5cGU6ICdzdmctaWNvbid8J21hdC1pY29uJyB9ID0geyBuYW1lOiAnYWRkJywgdHlwZTogJ21hdC1pY29uJyB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgdG9vbHRpcDogc3RyaW5nLFxuICAgICAgICByb3V0ZXJfbGluaz86IEFycmF5PHN0cmluZz4sXG4gICAgICAgIHF1ZXJ5X3BhcmFtcz86IHtba2V5OiBzdHJpbmddOiBhbnl9XG4gICAgKSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnRvb2x0aXAgPSB0b29sdGlwO1xuICAgICAgICBpZiAocm91dGVyX2xpbmspIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyX2xpbmsgPSByb3V0ZXJfbGluaztcbiAgICAgICAgICAgIHRoaXMucXVlcnlfcGFyYW1zID0gcXVlcnlfcGFyYW1zIHx8IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFJvdXRlckxpbmsocm91dGVyX2xpbms6IEFycmF5PHN0cmluZz4pOiB0aGlzIHtcbiAgICAgICAgdGhpcy5yb3V0ZXJfbGluayA9IHJvdXRlcl9saW5rO1xuICAgICAgICB0aGlzLm5hdmlnYXRlID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Um91dGVyTGluaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyX2xpbms7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFF1ZXJ5UGFyYW1zKHF1ZXJ5X3BhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiB0aGlzIHtcbiAgICAgICAgdGhpcy5xdWVyeV9wYXJhbXMgPSBxdWVyeV9wYXJhbXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFF1ZXJ5UGFyYW1zKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlfcGFyYW1zO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGROYXZpZ2F0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGU7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBFY29GYWJTcGVlZERpYWxNb2R1bGUgfSBmcm9tICdAZWNvZGV2L2ZhYi1zcGVlZC1kaWFsJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBGYWJTcGVlZERpYWxDb21wb25lbnQgfSBmcm9tICcuL2ZhYi1zcGVlZC1kaWFsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBFY29GYWJTcGVlZERpYWxNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRmFiU3BlZWREaWFsQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRmFiU3BlZWREaWFsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBGYWJTcGVlZERpYWxNb2R1bGUge31cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPbkluaXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlc3Ryb3llciB9IGZyb20gJy4uL2Rlc3Ryb3llcic7XG5pbXBvcnQgeyBTZXJ2aWNlLCBEb2N1bWVudENvbGxlY3Rpb24gfSBmcm9tICduZ3gtanNvbmFwaSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSmFtUmVmcmVzaFNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb2xsZWN0aW9uX3RvX3JlZnJlc2ggPSBuZXcgU3ViamVjdDxEb2N1bWVudENvbGxlY3Rpb24+KCk7XG4gICAgcHVibGljIHJlZnJlc2hTdWJqZWN0ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIHB1YmxpYyByZWZyZXNoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZnJlc2hTdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1yZWZyZXNoJyxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b25cbiAgICAqbmdJZj1cImNvbGxlY3Rpb25Ub1JlZnJlc2hcIlxuICAgIG1hdC1pY29uLWJ1dHRvblxuICAgIG1hdFRvb2x0aXA9XCJBY3R1YWxpemFyXCJcbiAgICBtYXQtaW5rLXJpcHBsZT1cImZhbHNlXCJcbiAgICBjbGFzcz1cIm1hdC1pY29uLWJ1dHRvbiBtYXQtYnV0dG9uXCJcbiAgICAoY2xpY2spPVwicmVmcmVzaENvbGxlY3Rpb24oKVwiXG4gICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCJcbiAgICA+XG4gICAgPG1hdC1pY29uXG4gICAgICAgICpuZ0lmPVwiIWNvbGxlY3Rpb25Ub1JlZnJlc2guaXNfbG9hZGluZ1wiXG4gICAgICAgIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIlxuICAgICAgICA+XG4gICAgICAgIHt7IGljb24gfHwgJ3JlZnJlc2gnIH19XG4gICAgPC9tYXQtaWNvbj5cbiAgICA8bWF0LXNwaW5uZXJcbiAgICAgICAgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBlbGVtZW50cy11cCBwYWRkaW5nLTAgbWFyZ2luLTBcIlxuICAgICAgICAqbmdJZj1cImNvbGxlY3Rpb25Ub1JlZnJlc2guaXNfbG9hZGluZ1wiXG4gICAgICAgIGNvbG9yPVwiYWNjZW50XCJcbiAgICAgICAgZGlhbWV0ZXI9XCIyNFwiXG4gICAgICAgID5cbiAgICA8L21hdC1zcGlubmVyPlxuPC9idXR0b24+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFJlZnJlc2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcHVibGljIGNvbGxlY3Rpb25Ub1JlZnJlc2g6IERvY3VtZW50Q29sbGVjdGlvbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VydmljZVRvUmVmcmVzaDogU2VydmljZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgY29sb3JQcm9ncmVzc0NpcmN1bGFyID0gJ3doaXRlJztcbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBwdWJsaWMgZGVzdHJveWVyID0gbmV3IERlc3Ryb3llcigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBqYW1SZWZyZXNoU2VydmljZTogSmFtUmVmcmVzaFNlcnZpY2UpIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb2xsZWN0aW9uVG9SZWZyZXNoKSB7XG4gICAgICAgICAgICB0aGlzLmphbVJlZnJlc2hTZXJ2aWNlLmNvbGxlY3Rpb25fdG9fcmVmcmVzaC5waXBlKHRoaXMuZGVzdHJveWVyLnBpcGUoKSkuc3Vic2NyaWJlKChjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25Ub1JlZnJlc2ggPSBjb2xsZWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVmcmVzaENvbGxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VydmljZVRvUmVmcmVzaC5jbGVhckNhY2hlTWVtb3J5KCk7XG4gICAgICAgIHRoaXMuamFtUmVmcmVzaFNlcnZpY2UucmVmcmVzaCgpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWZyZXNoQ29tcG9uZW50LCBKYW1SZWZyZXNoU2VydmljZSB9IGZyb20gJy4vcmVmcmVzaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbSmFtUmVmcmVzaFNlcnZpY2VdLFxuICAgIGRlY2xhcmF0aW9uczogW1JlZnJlc2hDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtSZWZyZXNoQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1SZWZyZXNoTW9kdWxlIHt9XG4iLCJleHBvcnQgY2xhc3MgTWVudUVsZW1lbnQge1xuICAgIHB1YmxpYyBhdHRyaWJ1dGVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IGFueSk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IHsgLi4udGhpcy5hdHRyaWJ1dGVzLCAuLi5hdHRyaWJ1dGVzIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGUoKTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuaGlkZGVuID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGlzU2hvd24oKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hdHRyaWJ1dGVzLmhpZGRlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZSgpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlKCk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZW51RWxlbWVudHNDb2xsZWN0aW9uIDxUIGV4dGVuZHMgTWVudUVsZW1lbnQgfCBNZW51RWxlbWVudHNDb2xsZWN0aW9uPE1lbnVFbGVtZW50Pj4ge1xuICAgIHB1YmxpYyBkYXRhOiBBcnJheTxNZW51RWxlbWVudHNDb2xsZWN0aW9uPFQ+IHwgVD4gPSBbXTtcbiAgICBwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xuXG4gICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZSgpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCk6IHRoaXMge1xuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1Nob3duKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaGlkZGVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaW5kKGlkOiBzdHJpbmcpOiBNZW51RWxlbWVudHNDb2xsZWN0aW9uPFQ+IHwgVCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmluZChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLSBubyBkYXRhISAtLS0tLS0tLS0tLS0tLS0nKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuaWQgPT09IGlkO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkKGRhdGE6IEFycmF5PE1lbnVFbGVtZW50c0NvbGxlY3Rpb248VD4gfCBUPik6IHRoaXMge1xuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuY29uY2F0KGRhdGEpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuL3NlY3Rpb24nO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHsgTWVudUVsZW1lbnRzQ29sbGVjdGlvbiwgTWVudUVsZW1lbnQgfSBmcm9tICcuL21lbnUtZWxlbWVudHMnO1xuXG5leHBvcnQgY2xhc3MgTWVudSBleHRlbmRzIE1lbnVFbGVtZW50c0NvbGxlY3Rpb248U2VjdGlvbj4ge1xuICAgIHB1YmxpYyBkYXRhOiBBcnJheTxTZWN0aW9uPiA9IDxBcnJheTxTZWN0aW9uPj5bXTtcbiAgICBwdWJsaWMgbWFpbl9pbWFnZToge3VybDogc3RyaW5nOyBzdHlsZXM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfX07XG4gICAgcHVibGljIGZpbmRTZWN0aW9uOiAoYXJnOiBzdHJpbmcpID0+IFNlY3Rpb24gPSA8KGFyZzogc3RyaW5nKSA9PiBTZWN0aW9uPnRoaXMuZmluZDtcbiAgICBwdWJsaWMgYWRkU2VjdGlvbnMgPSB0aGlzLmFkZDtcbiAgICBwdWJsaWMgcmVtb3ZlRW1wdHlTZWN0aW9ucygpIHtcbiAgICAgICAgZm9yIChsZXQgc2VjdGlvbiBvZiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmhhc1Nob3duRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0TWFpbkltYWdlKGltYWdlX2RhdGE6IHt1cmw6IHN0cmluZzsgc3R5bGVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ319KTogTWVudSB7XG4gICAgICAgIHRoaXMubWFpbl9pbWFnZSA9IGltYWdlX2RhdGE7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHsgTWVudUVsZW1lbnRzQ29sbGVjdGlvbiwgTWVudUVsZW1lbnQgfSBmcm9tICcuL21lbnUtZWxlbWVudHMnO1xuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIE1lbnVFbGVtZW50c0NvbGxlY3Rpb248TWVudUVsZW1lbnQ+IHtcbiAgICBwdWJsaWMgZmluZEJ1dHRvbjogKGFyZzogc3RyaW5nKSA9PiBCdXR0b24gPSA8KGFyZzogc3RyaW5nKSA9PiBCdXR0b24+dGhpcy5maW5kO1xuICAgIHB1YmxpYyBhZGRCdXR0b25zID0gdGhpcy5hZGQ7XG5cbiAgICBwdWJsaWMgaGFzU2hvd25FbGVtZW50cygpIHtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlzU2hvd24oKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1lbnVFbGVtZW50IH0gZnJvbSAnLi9tZW51LWVsZW1lbnRzJztcblxuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIE1lbnVFbGVtZW50IHtcbiAgICBwdWJsaWMgYXR0cmlidXRlczogTWVudUJ1dHRvbkF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGljb246ICcnLFxuICAgICAgICBsYWJlbDogJycsXG4gICAgICAgIGNsYXNzOiAnJyxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBoaWRkZW46IGZhbHNlXG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXRBdHRyaWJ1dGVzKFxuICAgICAgICBhdHRyaWJ1dGU6ICdsYWJlbCcgfCAnaWNvbicgfCAnY2xhc3MnIHwgJ2hpZGRlbicgfCAnZGlzYWJsZWQnIHwgJ3N2Z19pY29uJyB8ICdpY29uX2ZvbnQnLCAvLyBUT0RPOiBpbXByb3ZlIHR5cGluZ1xuICAgICAgICB2YWx1ZTogc3RyaW5nIHwgYm9vbGVhblxuICAgICk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE1lbnVCdXR0b25BdHRyaWJ1dGVzKTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IHsgLi4udGhpcy5hdHRyaWJ1dGVzLCAuLi5hdHRyaWJ1dGVzIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lbnVCdXR0b25BdHRyaWJ1dGVzIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgY2xhc3M/OiBzdHJpbmc7XG4gICAgaGlkZGVuPzogYm9vbGVhbjtcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgc3ZnX2ljb24/OiBzdHJpbmc7XG4gICAgaWNvbl9mb250Pzogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuLi9tZW51LWVsZW1lbnRzL3NlY3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1kcm9wZG93bi1tZW51JyxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIGgze2ZvbnQtc2l6ZToxMHB0O21hcmdpbjoxNnB4O2ZvbnQtd2VpZ2h0OjUwMH1qYW0tZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5qYW0tYm90dG9tLXNoZWV0e2Rpc3BsYXk6bm9uZX0uZGlzYWJsZWR7b3BhY2l0eTouNX1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpe2phbS1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZX0uamFtLWJvdHRvbS1zaGVldHtkaXNwbGF5OmJsb2NrfX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b25cbiAgICBtYXQtaWNvbi1idXR0b25cbiAgICBjbGFzcz1cIm1hdC1pY29uLWJ1dHRvbiBtYXQtYnV0dG9uXCJcbiAgICBtYXRUb29sdGlwPVwiTcODwqFzXCJcbiAgICBmeExheW91dD1cInJvd1wiXG4gICAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51UmVmXCJcbiAgICA+XG4gICAgPGltZ1xuICAgICAgICAqbmdJZj1cIm1haW5faW1hZ2VcIlxuICAgICAgICBbc3JjXT1cIm1haW5faW1hZ2U/LnVybFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIm1haW5faW1hZ2U/LnN0eWxlc1wiXG4gICAgICAgIC8+XG4gICAgPG1hdC1pY29uICpuZ0lmPVwiIW1haW5faW1hZ2VcIj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuPC9idXR0b24+XG5cbjxtYXQtbWVudSAjbWVudVJlZj1cIm1hdE1lbnVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzZWN0aW9uIG9mIHNlY3Rpb25zOyBsZXQgcG9zaXRpb24gPSBpbmRleFwiPlxuICAgICAgICA8bWF0LWRpdmlkZXIgKm5nSWY9XCJzZWN0aW9uLmhhc1Nob3duRWxlbWVudHMoKSAmJiAhc2VjdGlvbi5oaWRkZW4gJiYgcG9zaXRpb24gPiAwXCI+PC9tYXQtZGl2aWRlcj5cblxuICAgICAgICA8aDMgY2xhc3M9XCJtYXQtaGludFwiICpuZ0lmPVwic2VjdGlvbi5oYXNTaG93bkVsZW1lbnRzKCkgJiYgIXNlY3Rpb24uaGlkZGVuICYmIHNlY3Rpb24uaWRcIj5cbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwic2VjdGlvbi5pZFwiPjwvc3Bhbj5cbiAgICAgICAgPC9oMz5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2Ygc2VjdGlvbi5kYXRhXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgbWF0LW1lbnUtaXRlbVxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIWJ1dHRvbi5hdHRyaWJ1dGVzLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImJ1dHRvbi5hdHRyaWJ1dGVzLmRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJidXR0b24uYXR0cmlidXRlcy5jbGFzc1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdGVkLmVtaXQoYnV0dG9uLmlkKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImJ1dHRvbi5hdHRyaWJ1dGVzLmljb25cIlxuICAgICAgICAgICAgICAgICAgICBbaW5uZXJIdG1sXT1cImJ1dHRvbi5hdHRyaWJ1dGVzLmljb25cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJidXR0b24uYXR0cmlidXRlcy5zdmdfaWNvblwiXG4gICAgICAgICAgICAgICAgICAgIFtzdmdJY29uXT1cImJ1dHRvbi5hdHRyaWJ1dGVzLnN2Z19pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJidXR0b24uYXR0cmlidXRlcy5sYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbWF0LW1lbnU+XG5gXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duTWVudUNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHVibGljIHNlY3Rpb25zOiBBcnJheTxTZWN0aW9uPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgbWFpbl9pbWFnZTogeyB1cmw6IHN0cmluZzsgc3R5bGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfX07XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUFUX0JPVFRPTV9TSEVFVF9EQVRBLCBNYXRCb3R0b21TaGVldFJlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tYm90dG9tLXNoZWV0JyxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIGgze2ZvbnQtc2l6ZToxMHB0O21hcmdpbjoxNnB4O2ZvbnQtd2VpZ2h0OjUwMH1qYW0tZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5qYW0tYm90dG9tLXNoZWV0e2Rpc3BsYXk6bm9uZX0uZGlzYWJsZWR7b3BhY2l0eTouNX1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpe2phbS1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZX0uamFtLWJvdHRvbS1zaGVldHtkaXNwbGF5OmJsb2NrfX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBtYXRNZW51Q29udGVudD5cbiAgICA8bWF0LW5hdi1saXN0PlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzZWN0aW9uIG9mIGRhdGEuc2VjdGlvbnM7IGxldCBwb3NpdGlvbiA9IGluZGV4XCI+XG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJtYXQtaGludFwiICpuZ0lmPVwiIXNlY3Rpb24uaGlkZGVuIHx8IHNlY3Rpb24uaWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInNlY3Rpb24uaWRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2gzPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBidXR0b24gb2Ygc2VjdGlvbi5kYXRhXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1saXN0LWl0ZW0gKm5nSWY9XCIhYnV0dG9uLmF0dHJpYnV0ZXMuaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiYnV0dG9uLmF0dHJpYnV0ZXMuY2xhc3MgKyAoYnV0dG9uLmF0dHJpYnV0ZXMuZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogbnVsbClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiYnV0dG9uLmF0dHJpYnV0ZXMuZGlzYWJsZWQgPyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkgOiBzZWxlY3RlZChidXR0b24uaWQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJidXR0b24uYXR0cmlidXRlcy5pY29uIHx8IGJ1dHRvbi5hdHRyaWJ1dGVzLnN2Z19pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckh0bWxdPVwiYnV0dG9uLmF0dHJpYnV0ZXMuaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3ZnSWNvbl09XCJidXR0b24uYXR0cmlidXRlcy5zdmdfY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1hdC1oaW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gbWF0LWxpbmUgW2lubmVySHRtbF09XCJidXR0b24uYXR0cmlidXRlcy5sYWJlbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L21hdC1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwiKHBvc2l0aW9uICsgMSkgPCBkYXRhLnNlY3Rpb25zLmxlbmd0aFwiPjwvbWF0LWRpdmlkZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbWF0LW5hdi1saXN0PlxuPC9uZy10ZW1wbGF0ZT5cbmBcbn0pXG5leHBvcnQgY2xhc3MgQm90dG9tU2hlZXRDb21wb25lbnQge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChNQVRfQk9UVE9NX1NIRUVUX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgICAgIHByaXZhdGUgbWF0Qm90dG9tU2hlZXRSZWY6IE1hdEJvdHRvbVNoZWV0UmVmPEJvdHRvbVNoZWV0Q29tcG9uZW50PlxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWF0Qm90dG9tU2hlZXRSZWYuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RlZChvcHRpb246IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hdEJvdHRvbVNoZWV0UmVmLmRpc21pc3Mob3B0aW9uKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudSB9IGZyb20gJy4vbWVudS1lbGVtZW50cy9tZW51JztcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuL21lbnUtZWxlbWVudHMvc2VjdGlvbic7XG5pbXBvcnQgeyBCb3R0b21TaGVldENvbXBvbmVudCB9IGZyb20gJy4vYm90dG9tLXNoZWV0L2JvdHRvbS1zaGVldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0Qm90dG9tU2hlZXQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZXN0cm95ZXIgfSBmcm9tICcuLi9kZXN0cm95ZXInO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9tZW51LWVsZW1lbnRzL2J1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLW1lbnUnLFxuICAgIHN0eWxlczogW2AvZGVlcC8gaDN7Zm9udC1zaXplOjEwcHQ7bWFyZ2luOjE2cHg7Zm9udC13ZWlnaHQ6NTAwfWphbS1kcm9wZG93bi1tZW51e2Rpc3BsYXk6YmxvY2t9LmphbS1ib3R0b20tc2hlZXR7ZGlzcGxheTpub25lfS5kaXNhYmxlZHtvcGFjaXR5Oi41fUBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo1OTlweCl7amFtLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpub25lfS5qYW0tYm90dG9tLXNoZWV0e2Rpc3BsYXk6YmxvY2t9fWBdLFxuICAgIHRlbXBsYXRlOiBgPGphbS1kcm9wZG93bi1tZW51XG4gICAgW3NlY3Rpb25zXT1cIm1lbnUuZGF0YVwiXG4gICAgW21haW5faW1hZ2VdPVwibWVudS5tYWluX2ltYWdlXCJcbiAgICAoc2VsZWN0ZWQpPVwic2VsZWN0ZWRPcHRpb24oJGV2ZW50KVwiXG4+PC9qYW0tZHJvcGRvd24tbWVudT5cblxuPGRpdiBjbGFzcz1cImphbS1ib3R0b20tc2hlZXRcIj5cbiAgICA8YnV0dG9uXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICBjbGFzcz1cIm1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXCJcbiAgICAgICAgbWF0VG9vbHRpcD1cIk3Dg8Khc1wiXG4gICAgICAgIGZ4TGF5b3V0PVwicm93XCJcbiAgICAgICAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgICAgICAoY2xpY2spPVwib3BlbigpXCI+XG4gICAgICAgIDxpbWcgKm5nSWY9XCJtZW51Lm1haW5faW1hZ2U/LnVybFwiIFtzcmNdPVwibWVudS5tYWluX2ltYWdlPy51cmxcIiBbbmdTdHlsZV09XCJtZW51Lm1haW5faW1hZ2U/LnN0eWxlc1wiLz5cbiAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiIW1lbnUubWFpbl9pbWFnZT8udXJsXCI+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtZW51OiBNZW51O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2VfZGF0YTogQXJyYXk8YW55PjtcbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjx7IGtleTogc3RyaW5nOyBkYXRhPzogQXJyYXk8YW55PiB9PigpO1xuXG4gICAgcHVibGljIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtYXRCb3R0b21TaGVldDogTWF0Qm90dG9tU2hlZXRcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lbnUubWFpbl9pbWFnZSAmJiAhdGhpcy5tZW51Lm1haW5faW1hZ2Uuc3R5bGVzKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUubWFpbl9pbWFnZS5zdHlsZXMgPSB7ICdib3JkZXItcmFkaXVzJzogJzEwMHB4Jywgd2lkdGg6ICc0MHB4JywgaGVpZ2h0OiAnNDBweCcgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnUucmVtb3ZlRW1wdHlTZWN0aW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuKCkge1xuICAgICAgICB0aGlzLm1hdEJvdHRvbVNoZWV0Lm9wZW4oQm90dG9tU2hlZXRDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGRhdGE6IHsgc2VjdGlvbnM6IHRoaXMubWVudS5kYXRhIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFmdGVyRGlzbWlzc2VkKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3llci5waXBlKCksXG4gICAgICAgICAgICBmaWx0ZXIocmVzcG9uc2UgPT4gIVtudWxsLCB1bmRlZmluZWQsICcnXS5pbmNsdWRlcyhyZXNwb25zZSkpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5mb3JtYXRFbWlzc2lvbihyZXNwb25zZSkpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRPcHRpb24oc2VsZWN0ZWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5mb3JtYXRFbWlzc2lvbihzZWxlY3RlZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0RW1pc3Npb24ocmVzcG9uc2U6IHN0cmluZykge1xuICAgICAgICByZXR1cm4geyBrZXk6IHJlc3BvbnNlLCBkYXRhOiB0aGlzLnNvdXJjZV9kYXRhIHx8IG51bGwgfTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSwgTWF0Qm90dG9tU2hlZXRNb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcm9wZG93bk1lbnVDb21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duLW1lbnUvZHJvcGRvd24tbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEJvdHRvbVNoZWV0Q29tcG9uZW50IH0gZnJvbSAnLi9ib3R0b20tc2hlZXQvYm90dG9tLXNoZWV0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNZW51Q29tcG9uZW50LCBEcm9wZG93bk1lbnVDb21wb25lbnQsIEJvdHRvbVNoZWV0Q29tcG9uZW50XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtCb3R0b21TaGVldENvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW01lbnVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbU1lbnVNb2R1bGUge31cbiIsIi8qKiBUaGlzJ3MgY29tcG9uZW50IEBkZXByZWNhdGVkICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmxvYXRpbmctYnV0dG9uJyxcbiAgICBzdHlsZXM6IFtgYS5tYXQtZmFie3Bvc2l0aW9uOmZpeGVkO2JvdHRvbToyNHB4O3JpZ2h0OjI0cHg7ei1pbmRleDozMzN9YF0sXG4gICAgdGVtcGxhdGU6IGA8YVxuICAgIG1hdC1mYWIgaHJlZlxuICAgICpuZ0lmPVwic2hvdyB8fCB0cnVlXCJcbiAgICBbbWF0VG9vbHRpcF09XCJ0b29sdGlwXCJcbiAgICBtYXRUb29sdGlwUG9zaXRpb249XCJiZWZvcmVcIlxuICAgIFt0YXJnZXRdPVwidGFyZ2V0IHx8ICdfc2VsZidcIlxuICAgIFtyb3V0ZXJMaW5rXT1cInJzUm91dGVyTGlua1wiXG4gICAgW3F1ZXJ5UGFyYW1zXT1cInJzUXVlcnlQYXJhbXNcIj5cbiAgICA8bWF0LWljb24gc3R5bGU9XCJjb2xvcjogd2hpdGVcIj57eyBpY29uTmFtZSA/IGljb25OYW1lIDogJ2FkZCcgfX08L21hdC1pY29uPlxuPC9hPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0J1dHRvbkNvbXBvbmVudCB7XG4gICAgcHVibGljIHNob3c6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgcnNCYWNrZ3JvdW5kOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGljb25OYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRvb2x0aXA6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdGFyZ2V0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHJzUm91dGVyTGluazogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByc1F1ZXJ5UGFyYW1zOiBvYmplY3Q7XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxvYXRpbmdCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2Zsb2F0aW5nLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0Zsb2F0aW5nQnV0dG9uQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRmxvYXRpbmdCdXR0b25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUZsb2F0aW5nQnV0dG9uTW9kdWxlIHt9XG4iLCIvLyBAbWVyZ2VmbGFnIGxvcyBjYW1iaW9zIGVuIGVzdGUgY29tcG9uZW50ZSBubyBkZWJlbiBsbGVnYXIgYSAyMVxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seVRlbXBsYXRlT3B0aW9ucyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljSW5wdXQgaW1wbGVtZW50cyBGb3JtbHlGaWVsZENvbmZpZyB7XG4gICAgcHVibGljIHJlYWRvbmx5IG1vZGVsOiBhbnk7XG4gICAgcHVibGljIHJlYWRvbmx5IHBhcmVudDogRm9ybWx5RmllbGRDb25maWc7XG5cbiAgICBwdWJsaWMga2V5OiBzdHJpbmc7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgdGVtcGxhdGVPcHRpb25zOiBGb3JtbHlUZW1wbGF0ZU9wdGlvbnM7XG4gICAgcHVibGljIG9wdGlvbnNUeXBlczogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgdmFsaWRhdGlvbjoge1xuICAgICAgICBtZXNzYWdlcz86IHtcbiAgICAgICAgICAgIFttZXNzYWdlUHJvcGVydGllczogc3RyaW5nXTogc3RyaW5nIHwgKChlcnJvcjogYW55LCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcpID0+IHN0cmluZyk7XG4gICAgICAgIH07XG4gICAgICAgIHNob3c/OiBib29sZWFuO1xuICAgICAgICBbYWRkaXRpb25hbFByb3BlcnRpZXM6IHN0cmluZ106IGFueTtcbiAgICB9O1xuICAgIHB1YmxpYyB2YWxpZGF0b3JzOiBhbnk7XG4gICAgcHVibGljIGFzeW5jVmFsaWRhdG9yczogYW55O1xuICAgIHB1YmxpYyB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgIHB1YmxpYyB3cmFwcGVyczogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgaGlkZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgaGlkZUV4cHJlc3Npb246IGJvb2xlYW4gfCBzdHJpbmcgfCAoKG1vZGVsOiBhbnksIGZvcm1TdGF0ZTogYW55KSA9PiBib29sZWFuKTtcbiAgICBwdWJsaWMgZXhwcmVzc2lvblByb3BlcnRpZXM6IHsgW3Byb3BlcnR5OiBzdHJpbmddOiBzdHJpbmcgfCAoKG1vZGVsOiBhbnksIGZvcm1TdGF0ZTogYW55KSA9PiBib29sZWFuKSB9IHwgYW55O1xuICAgIHB1YmxpYyBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICAgIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZmllbGRHcm91cENsYXNzTmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBmaWVsZEdyb3VwOiBBcnJheTxGb3JtbHlGaWVsZENvbmZpZz47XG4gICAgcHVibGljIGZpZWxkQXJyYXk6IEZvcm1seUZpZWxkQ29uZmlnO1xuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIGNvbXBvbmVudDogYW55O1xuICAgIHB1YmxpYyBmb2N1czogYm9vbGVhbjtcbiAgICBwdWJsaWMgbW9kZWxPcHRpb25zOiB7XG4gICAgICAgIGRlYm91bmNlPzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVPbj86ICdjaGFuZ2UnIHwgJ2JsdXInIHwgJ3N1Ym1pdCc7XG4gICAgfTtcblxuICAgIC8vIHB1YmxpYyBsaWZlY3ljbGU/OiBGb3JtbHlMaWZlQ3ljbGVPcHRpb25zO1xuICAgIHB1YmxpYyBkZWZhdWx0VmFsdWU6IGFueTtcbiAgICBwdWJsaWMgcGFyc2VyczogQXJyYXk8KCh2YWx1ZTogYW55KSA9PiB7fSk+O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5pZCA9IHRoaXMubmFtZSA9IGtleTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Rm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXF1aXJlZCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBmeEZsZXgodmFsdWUpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMuZnhGbGV4ID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXNbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRlbXBsYXRlT3B0aW9uKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFRlbXBsYXRlT3B0aW9ucyh0ZW1wbGF0ZV9vcHRpb25zOiBGb3JtbHlUZW1wbGF0ZU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7IC4uLnRoaXMudGVtcGxhdGVPcHRpb25zLCAuLi50ZW1wbGF0ZV9vcHRpb25zIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRyYW5zbGF0ZWRUZW1wbGF0ZU9wdGlvbnModHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChmaWVsZENvbmZpZzogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGZpZWxkQ29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBmaWVsZENvbmZpZ1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGV4dER5bmFtaWNJbnB1dCBleHRlbmRzIER5bmFtaWNJbnB1dCBpbXBsZW1lbnRzIEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIGtleSkge1xuICAgICAgICBzdXBlcihrZXkpO1xuICAgICAgICB0aGlzLnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBrZXlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcHVibGljIHNldFRyYW5zbGF0ZWRUZW1wbGF0ZU9wdGlvbnModHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5wbGFjZWhvbGRlciA9IHRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCh0aGlzLmtleSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTnVtYmVyRHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdpbnB1dCc7XG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5pZCA9IHRoaXMubmFtZSA9IGtleTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucGxhY2Vob2xkZXIgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENoZWNrYm94RHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgICAgICBsYWJlbDoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMubGFiZWwgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhRHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICd0ZXh0YXJlYSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgbWF0QXV0b3NpemVNaW5Sb3dzOiAyLFxuICAgICAgICAgICAgbWF0QXV0b3NpemVNYXhSb3dzOiAxNTAsXG4gICAgICAgICAgICBsYWJlbDoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucGxhY2Vob2xkZXIgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5sYWJlbCA9IHRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCh0aGlzLmtleSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0RHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBrZXksXG4gICAgICAgICAgICBvcHRpb25zOiBbXVxuICAgICAgICB9O1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VHJhbnNsYXRlZFRlbXBsYXRlT3B0aW9ucyh0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zLmxhYmVsID0gdHJhbnNsYXRlU2VydmljZS5pbnN0YW50KHRoaXMua2V5KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0T3B0aW9ucyhvcHRpb25zOiBBcnJheTx7IHZhbHVlOiBhbnk7IGxhYmVsOiBzdHJpbmcgfT4pOiBTZWxlY3REeW5hbWljSW5wdXQge1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUZvcm0gfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZm9ybWx5LWZvcm0tZmxleCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgIDxmb3JtbHktZmllbGQgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpZWxkc1wiXG4gICAgICAgIFtmeEZsZXhdPVwiZmllbGQudGVtcGxhdGVPcHRpb25zLmZ4RmxleFwiXG4gICAgICAgIFttb2RlbF09XCJtb2RlbFwiIFtmb3JtXT1cImZvcm1cIlxuICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICBbbmdDbGFzc109XCJmaWVsZC5jbGFzc05hbWVcIlxuICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCI+XG4gICAgICA8L2Zvcm1seS1maWVsZD5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGb3JtRmxleENvbXBvbmVudCBleHRlbmRzIEZvcm1seUZvcm0ge31cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlNYXRlcmlhbE1vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1seUZvcm1GbGV4Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtbHktZm9ybS1mbGV4LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIEZvcm1seU1vZHVsZS5mb3JSb290KCksXG4gICAgICAgIEZvcm1seU1hdGVyaWFsTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtGb3JtbHlGb3JtRmxleENvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW0Zvcm1seUZvcm1GbGV4Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1EeW5hbWljRm9ybXNNb2R1bGUge31cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcmFtcywgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYXRUYWJHcm91cCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbamFtVGFic10nXG59KVxuZXhwb3J0IGNsYXNzIEphbVRhYnNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyB0YWJOYW1lczoge1trZXk6IHN0cmluZ106IG51bWJlcn07XG4gICAgQElucHV0KCkgcHVibGljIHRhYkdyb3VwOiBNYXRUYWJHcm91cDtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVmYXVsdFRhYkluZGV4OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBzZWxlY3RlZF90YWI6IG51bWJlcjtcbiAgICBwdWJsaWMgcXVlcnlfcGFyYW1zOiBQYXJhbXM7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICAgICkge1xuICAgICAgICBhY3RpdmF0ZWRSb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocXVlcnlQYXJhbXMgPT4gdGhpcy5xdWVyeV9wYXJhbXMgPSBxdWVyeVBhcmFtcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZF90YWIgPSB0aGlzLnRhYk5hbWVzW3RoaXMucXVlcnlfcGFyYW1zLnRhYl9zZWxlY3RlZCB8fCBPYmplY3Qua2V5cyh0aGlzLnRhYk5hbWVzKVt0aGlzLmRlZmF1bHRUYWJJbmRleF1dO1xuICAgICAgICB0aGlzLnRhYkdyb3VwLnNlbGVjdGVkSW5kZXggPSB0aGlzLnNlbGVjdGVkX3RhYjtcbiAgICAgICAgdGhpcy50YWJHcm91cC5zZWxlY3RlZEluZGV4Q2hhbmdlLnN1YnNjcmliZShpbmRleCA9PiB0aGlzLm9uVGFiQ2hhbmdlKGluZGV4KSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGFiQ2hhbmdlKG5ld19pbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCB0YWJfc2VsZWN0ZWQ7XG4gICAgICAgIGZvciAobGV0IGVhY2ggaW4gdGhpcy50YWJOYW1lcykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFiTmFtZXNbZWFjaF0gIT09IG5ld19pbmRleCkgY29udGludWU7XG4gICAgICAgICAgICB0YWJfc2VsZWN0ZWQgPSBlYWNoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtdLCB7IHF1ZXJ5UGFyYW1zOiB7IC4uLnRoaXMucXVlcnlfcGFyYW1zLCAuLi57dGFiX3NlbGVjdGVkOiB0YWJfc2VsZWN0ZWR9IH0gfSk7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHsgSmFtVGFic0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFicy5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtKYW1UYWJzRGlyZWN0aXZlXSxcbiAgICBleHBvcnRzOiBbSmFtVGFic0RpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgSmFtVGFic01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RXhwYW5zaW9uUGFuZWwgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tqYW1FeHBhbnNpb25QYW5lbFN0YXR1c10nXG59KVxuZXhwb3J0IGNsYXNzIFJlbWVtYmVybWVTdGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIEBDb250ZW50Q2hpbGQoTWF0RXhwYW5zaW9uUGFuZWwpIHB1YmxpYyBtYXRfZXhwYW5zaW9uX3BhbmVsOiBNYXRFeHBhbnNpb25QYW5lbDtcblxuICAgIHByaXZhdGUgbWF0X2V4cGFuc2lvbl9wYW5lX2lkOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkge1xuICAgICAgICB0aGlzLm1hdF9leHBhbnNpb25fcGFuZV9pZCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5tYXRfZXhwYW5zaW9uX3BhbmVfaWQpKSB7XG4gICAgICAgICAgICB0aGlzLm1hdF9leHBhbnNpb25fcGFuZWwuZXhwYW5kZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLm1hdF9leHBhbnNpb25fcGFuZV9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZUV4cGFuZGVkRXhwYW5zaW9uUGFuZWwoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgcHJpdmF0ZSBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxTdG9yZWFnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlRXhwYW5kZWRFeHBhbnNpb25QYW5lbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVMb2NhbFN0b3JlYWdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVMb2NhbFN0b3JlYWdlKCk6IHZvaWQge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm1hdF9leHBhbnNpb25fcGFuZV9pZCwgdGhpcy5tYXRfZXhwYW5zaW9uX3BhbmVsLmV4cGFuZGVkKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJlbWVtYmVybWVTdGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vcmVtZW1iZXItc3RhdGUuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1JlbWVtYmVybWVTdGF0ZURpcmVjdGl2ZV0sXG4gICAgZXhwb3J0czogW1JlbWVtYmVybWVTdGF0ZURpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgSmFtUmVtZW1iZXJTdGF0ZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJ25neC1qc29uYXBpJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmxvYXRpbmctaW5wdXQnLFxuICAgIHN0eWxlczogW2BtYXQtZXhwYW5zaW9uLXBhbmVse3dpZHRoOmF1dG87Ym94LXNoYWRvdzpub25lIWltcG9ydGFudDtiYWNrZ3JvdW5kOmluaGVyaXQhaW1wb3J0YW50O2JvcmRlcjowIWltcG9ydGFudH1tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlfWlucHV0W3R5cGVePW51bWJlcl17dGV4dC1hbGlnbjplbmR9YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZmxvYXRpbmctaW5wdXRcIiBbbmdDbGFzc109XCJzdGF0dXMgPyAnbWF0LWVsZXZhdGlvbi16MScgOiAnJ1wiPlxuICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsXG4gICAgICAgIGhpZGVUb2dnbGU9XCJ0cnVlXCJcbiAgICAgICAgc3R5bGU9XCJ3aWR0aDogYXV0bzsgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50OyBiYWNrZ3JvdW5kOiBpbmhlcml0ICFpbXBvcnRhbnQ7IGJvcmRlcjogMCAhaW1wb3J0YW50O1wiXG4gICAgICAgIFtkaXNhYmxlZF09XCJsb2NrXCJcbiAgICAgICAgW2V4cGFuZGVkXT1cInN0YXR1c1wiXG4gICAgICAgIChjbG9zZWQpPVwic3RhdHVzVG9nZ2xlKGZhbHNlKVwiXG4gICAgICAgIChvcGVuZWQpPVwic3RhdHVzVG9nZ2xlKHRydWUpXCI+XG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciAqbmdJZj1cIiFzdGF0dXNcIj5cbiAgICAgICAgICAgIDxtYXQtcGFuZWwtdGl0bGUgZnhMYXlvdXQ9XCJyb3dcIiBbZnhMYXlvdXRBbGlnbl09XCIoaG9yUG9zaXRpb24gfHwgJ2VuZCcpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9tYXQtcGFuZWwtdGl0bGU+XG4gICAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwic3RhdHVzXCI+XG4gICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgaWQ9XCJmbG9hdGluZ0lucHV0XCIgdHlwZT1cIm51bWJlclwiIHN0ZXA9XCIwLjAwMVwiIG5hbWU9XCJmbG9hdGluZ051bWJlclwiIGFyaWEtbGFiZWw9XCJNb2RpZmljYXJcIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZW50cnlWYWx1ZVwiXG4gICAgICAgICAgICAgICAgKGJsdXIpPVwic3RhdHVzVG9nZ2xlKGZhbHNlKVwiXG4gICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiYmluZGluZ0VudHJ5VmFsdWUoZW50cnlWYWx1ZSlcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cImtleVByZXNzKCRldmVudC5rZXlDb2RlKVwiXG4gICAgICAgICAgICAgICAgKGZvY3VzKT1cInN0YXR1c1wiPlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0lucHV0Q29tcG9uZW50IHtcbiAgICBwdWJsaWMgc2VhcmNoUGFyYW1zOiBVcmxUcmVlO1xuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgZW50cnlWYWx1ZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZXNvdXJjZTogUmVzb3VyY2U7XG4gICAgQElucHV0KCkgcHVibGljIGhvclBvc2l0aW9uOiAnc3RhcnQnIHwgJ2VuZCc7XG4gICAgQElucHV0KCkgcHVibGljIGxvY2s6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGVudHJ5VmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlc291cmNlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxSZXNvdXJjZT4oKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMgPSByb3V0ZXIucGFyc2VVcmwocm91dGVyLnVybCk7XG4gICAgICAgIHRoaXMubG9jayA9IHRoaXMubG9jayB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdHVzVG9nZ2xlKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubG9jaykge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJpbmRpbmdFbnRyeVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbnRyeVZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBrZXlQcmVzcyhrZXlDb2RlOiBudW1iZXIpIHtcbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzSW5wdXQoKTogdm9pZCB7XG4gICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbG9hdGluZ0lucHV0Jyk7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IFJleWVzb2Z0IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEV4cGFuc2lvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZsb2F0aW5nSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2Zsb2F0aW5nLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtGbG9hdGluZ0lucHV0Q29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbRmxvYXRpbmdJbnB1dENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtRmxvYXRpbmdJbnB1dE1vZHVsZSB7fVxuIiwiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTcgUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgRmlsdGVyT3B0aW9uIH0gZnJvbSAnLi9maWx0ZXItb3B0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBSYW5nZUZpbHRlckludGVyZmFjZSB9IGZyb20gJy4vZmlsdGVyLXR5cGVzL3JhbmdlLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3RyaW5nRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9maWx0ZXItdHlwZXMvc3RyaW5nLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnVtYmVyRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9maWx0ZXItdHlwZXMvbnVtYmVyLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi9maWx0ZXItdHlwZXMvZGF0ZS1yYW5nZS1maWx0ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IHR5cGUgUmVzb3VyY2VGaWx0ZXIgPVxuICAgIHN0cmluZ3xudW1iZXJ8QXJyYXk8c3RyaW5nPnxvYmplY3R8UmFuZ2VGaWx0ZXJJbnRlcmZhY2V8U3RyaW5nRmlsdGVySW50ZXJmYWNlfE51bWJlckZpbHRlckludGVyZmFjZXxEYXRlUmFuZ2VGaWx0ZXJJbnRlcmZhY2U7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgICB0eXBlOiAnb3B0aW9ucycgfCAnY2hlY2tzJyB8ICdyYW5nZV9kYXRlJztcbiAgICBhdHRyaWJ1dGU6IHN0cmluZztcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIFtqc29udmFsdWU6IHN0cmluZ106IEZpbHRlck9wdGlvbjtcbiAgICB9O1xuICAgIHNlbGVjdGVkOiBSZXNvdXJjZUZpbHRlcjtcbiAgICB0aXRsZT86IHN0cmluZztcbiAgICBsb2FkZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyQ29uZmlnIHtcbiAgICBwdWJsaWMgdHlwZTogJ29wdGlvbnMnIHwgJ2NoZWNrcycgfCAncmFuZ2VfZGF0ZSc7XG4gICAgcHVibGljIGF0dHJpYnV0ZTogc3RyaW5nO1xuICAgIHB1YmxpYyBvcHRpb25zOiB7XG4gICAgICAgIFtqc29udmFsdWU6IHN0cmluZ106IEZpbHRlck9wdGlvbjtcbiAgICB9O1xuICAgIHB1YmxpYyBzZWxlY3RlZDogUmVzb3VyY2VGaWx0ZXI7XG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBGaWx0ZXIsIEZpbHRlckNvbmZpZyB9IGZyb20gJy4vZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ZpbHRlci10eXBlcy9kYXRlLXJhbmdlLWZpbHRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckRhdGVSYW5nZSBleHRlbmRzIEZpbHRlciB7XG4gICAgdHlwZTogJ3JhbmdlX2RhdGUnO1xuICAgIHNlbGVjdGVkOiBEYXRlUmFuZ2VGaWx0ZXJJbnRlcmZhY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBKc29uYXBpRmlsdGVyUmFuZ2VkYXRlQ29uZmlnIGV4dGVuZHMgRmlsdGVyQ29uZmlnIGltcGxlbWVudHMgRmlsdGVyRGF0ZVJhbmdlIHtcbiAgICBwdWJsaWMgdHlwZTogJ3JhbmdlX2RhdGUnO1xuICAgIHB1YmxpYyBhdHRyaWJ1dGUgPSAnZGF0ZSc7XG4gICAgcHVibGljIG9wdGlvbnMgPSB7fTtcbiAgICBwdWJsaWMgc2VsZWN0ZWQgPSB7IHNpbmNlOiAnJywgdW50aWw6ICcnIH07XG5cbiAgICBwdWJsaWMgc2V0UHJvcGVydHkocHJvcGVydHlfbmFtZSwgcHJvcGVydHlfdmFsdWUpIHtcbiAgICAgICAgdGhpc1twcm9wZXJ0eV9uYW1lXSA9IHByb3BlcnR5X3ZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGaWx0ZXJPcHRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ZpbHRlci1vcHRpb24uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tZmlsdGVyLW9wdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNvbG9yPVwicHJpbWFyeVwiIGZsb2F0TGFiZWw9XCJuZXZlclwiPlxuICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyQ29uZmlnLnNlbGVjdGVkXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cImZpbHRlckNvbmZpZy50aXRsZVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIGZpbHRlckNvbmZpZ0FycmF5XCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJjb25maWcudGV4dC5rZXlcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9wdGlvblNlbGVjdGVkKGNvbmZpZywgZmlsdGVyQ29uZmlnLnNlbGVjdGVkKVwiPnt7IGNvbmZpZy50ZXh0Lm5hbWUgfX1cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdD5cbjwvbWF0LWZvcm0tZmllbGQ+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEphbUZpbHRlck9wdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmaWx0ZXJDb25maWc6IEZpbHRlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiBvYmplY3Q7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZW1vdGVGaWx0ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBmaWx0ZXJDb25maWdBcnJheTogQXJyYXk8RmlsdGVyT3B0aW9uPjtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJDb25maWdBcnJheSA9IE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJDb25maWcub3B0aW9uc1trZXldLnRleHQgPSB7IGtleToga2V5LCBuYW1lOiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCB9O1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJDb25maWcub3B0aW9uc1trZXldO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0aW9uU2VsZWN0ZWQoanNvbnZhbHVlLCBmaWx0ZXJfbGlzdCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbW90ZUZpbHRlclt0aGlzLmZpbHRlckNvbmZpZy5hdHRyaWJ1dGVdID0gZmlsdGVyX2xpc3QudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5yZW1vdGVGaWx0ZXJDaGFuZ2UuZW1pdCh0aGlzLnJlbW90ZUZpbHRlcik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyQ2hlY2tzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXItY2hlY2tzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGaWx0ZXJPcHRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ZpbHRlci1vcHRpb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWZpbHRlci1jaGVja3MnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNvbG9yPVwicHJpbWFyeVwiIGZsb2F0TGFiZWw9XCJuZXZlclwiPlxuICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIG11bHRpcGxlXG4gICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyQ29uZmlnLnNlbGVjdGVkXCJcbiAgICAgICAgKGZvY3VzKT1cImZpbHRlckNvbmZpZ09wdGlvbnNVcGRhdGUoKVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJmaWx0ZXJDb25maWcudGl0bGVcIj5cbiAgICAgICAgPGRpdiBtYXQtbWVudS1pdGVtIGNsYXNzPVwiZm9jdXMtZWxlbWVudC00ZHAgcmVzZXQtaW5wdXQtZGVmYXVsdFwiXG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlcl9jb25maWdfb3B0aW9ucy5sZW5ndGggPiAxMFwiXG4gICAgICAgICAgICBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjEwXCJcbiAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPGlucHV0IGZ4RmxleCBjbGFzcz1cInJzLWlucHV0XCIgdGFiaW5kZXg9XCIxXCIgYXV0b2ZvY3VzIHBsYWNlaG9sZGVyPVwiQnVzY2FyXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInNlYXJjaFRleHRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDI0cHg7IHdpZHRoOiAyNHB4XCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwic2VhcmNoVGV4dFwiIChjbGljayk9XCJzZWFyY2hUZXh0ID0gJydcIj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlcl9jb25maWdfb3B0aW9ucyB8IGZpbHRlcjogc2VhcmNoVGV4dFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnRleHQua2V5XCJcbiAgICAgICAgICAgIChjbGljayk9XCJvcHRpb25TZWxlY3RlZChvcHRpb24sIGZpbHRlckNvbmZpZy5zZWxlY3RlZClcIj57eyBvcHRpb24udGV4dC5uYW1lIH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Q+XG48L21hdC1mb3JtLWZpZWxkPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBKYW1GaWx0ZXJDaGVja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmaWx0ZXJDb25maWc6IEZpbHRlckNoZWNrcztcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiBvYmplY3Q7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGZpbHRlckNvbmZpZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBwdWJsaWMgZmlsdGVyX2NvbmZpZ19vcHRpb25zOiBBcnJheTxGaWx0ZXJPcHRpb24+O1xuXG4gICAgcHVibGljIHNlYXJjaFRleHQ6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBzaG93X2lucHV0X3NlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJDb25maWcuc2VsZWN0ZWQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUZpbHRlclt0aGlzLmZpbHRlckNvbmZpZy5hdHRyaWJ1dGVdID0gdGhpcy5maWx0ZXJDb25maWcuc2VsZWN0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWx0ZXJDb25maWdPcHRpb25zVXBkYXRlKCk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJfY29uZmlnX29wdGlvbnMgPSB0aGlzLmZpbHRlcl9jb25maWdfb3B0aW9ucy5zb3J0KFxuICAgICAgICAgICAgKGEsIGIpID0+ICg8SU9wdGlvbj5hLnRleHQpLm5hbWUubG9jYWxlQ29tcGFyZSgoPElPcHRpb24+Yi50ZXh0KS5uYW1lKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2hvd0lucHV0U2VhcmNoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dJbnB1dFNlYXJjaCgpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dfaW5wdXRfc2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmaWx0ZXJDb25maWdPcHRpb25zVXBkYXRlKCkge1xuICAgICAgICB0aGlzLmZpbHRlcl9jb25maWdfb3B0aW9ucyA9IE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCA9IHsga2V5OiBrZXksIG5hbWU6IHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnNba2V5XS50ZXh0IH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclNlbGVjdGVkKCkge1xuICAgICAgICB0aGlzLmZpbHRlckNvbmZpZy5zZWxlY3RlZCA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcHRpb25TZWxlY3RlZChqc29udmFsdWUsIGZpbHRlcl9saXN0KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3RlRmlsdGVyW3RoaXMuZmlsdGVyQ29uZmlnLmF0dHJpYnV0ZV0gPSBmaWx0ZXJfbGlzdC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnJlbW90ZUZpbHRlckNoYW5nZS5lbWl0KHRoaXMucmVtb3RlRmlsdGVyKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgUmV5ZXNvZnQgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRPcHRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNpY3MvZmlsdGVyLWNoZWNrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSmFtRmlsdGVyT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vYmFzaWNzL2ZpbHRlci1vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC10ZXh0LnBpcGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBKYW1TZWFyY2hJbnB1dE1vZHVsZSB9IGZyb20gJy4uL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBKYW1TZWFyY2hJbnB1dE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbRmlsdGVyUGlwZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50LCBKYW1GaWx0ZXJPcHRpb25zQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbSmFtRmlsdGVyQ2hlY2tzQ29tcG9uZW50LCBKYW1GaWx0ZXJPcHRpb25zQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1GaWx0ZXJNb2R1bGUge31cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1BvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogaW50ZXJmYWNlLW5hbWUgdXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvciB1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3IgZGlyZWN0aXZlLXNlbGVjdG9yXG5cbi8qKiBVc2VkIHRvIGZsYWcgc2xpZGUgbGFiZWxzIGZvciB1c2Ugd2l0aCB0aGUgcG9ydGFsIGRpcmVjdGl2ZSAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2phbS1zbGlkZS1lbGVtZW50XSwgW2phbVNsaWRlRWxlbWVudF0nXG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlRWxlbWVudCBleHRlbmRzIENka1BvcnRhbCB7fVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG4vLyBpbXBvcnQge0phbVNsaWRlQ29udGVudH0gZnJvbSAnLi9zbGlkZS1jb250ZW50JztcbmltcG9ydCB7IEphbVNsaWRlRWxlbWVudCB9IGZyb20gJy4vc2xpZGUtZWxlbWVudCc7XG5cbi8vIHRzbGludDpkaXNhYmxlOiBpbnRlcmZhY2UtbmFtZSB1c2UtaW5wdXQtcHJvcGVydHktZGVjb3JhdG9yIHVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvciBjb21wb25lbnQtc2VsZWN0b3Igbm8taW5wdXQtcmVuYW1lXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gSmFtU2xpZGUuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIEphbVNsaWRlQmFzZSB7fVxuZXhwb3J0IGNvbnN0IF9KYW1TbGlkZU1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgSmFtU2xpZGVCYXNlID1cbiAgICBtaXhpbkRpc2FibGVkKEphbVNsaWRlQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2phbS1zbGlkZScsXG4gIHRlbXBsYXRlOiBgPCEtLSBDcmVhdGUgYSB0ZW1wbGF0ZSBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIDxqYW0tc2xpZGU+IHNvIHRoYXQgd2UgY2FuIGdyYWIgYSByZWZlcmVuY2UgdG8gdGhpc1xuICAgIFRlbXBsYXRlUmVmIGFuZCB1c2UgaXQgaW4gYSBQb3J0YWwgdG8gcmVuZGVyIHRoZSBzbGlkZSBjb250ZW50IGluIHRoZSBhcHByb3ByaWF0ZSBwbGFjZSBpbiB0aGVcbiAgICBzbGlkZS1ncm91cC4gLS0+XG48bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+XG5gLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnamFtU2xpZGUnXG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlIGV4dGVuZHMgX0phbVNsaWRlTWl4aW5CYXNlIGltcGxlbWVudHMgT25Jbml0LCBDYW5EaXNhYmxlLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBDb250ZW50IGZvciB0aGUgc2xpZGUgZWxlbWVudCBnaXZlbiBieSBgPG5nLXRlbXBsYXRlIGphbS1zbGlkZS1lbGVtZW50PmAuICovXG4gIEBDb250ZW50Q2hpbGQoSmFtU2xpZGVFbGVtZW50KSBwdWJsaWMgdGVtcGxhdGVMYWJlbDogSmFtU2xpZGVFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUZW1wbGF0ZSBwcm92aWRlZCBpbiB0aGUgc2xpZGUgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICovXG4gIC8qKiBQbGFpbiB0ZXh0IGVsZW1lbnQgZm9yIHRoZSBzbGlkZSwgdXNlZCB3aGVuIHRoZXJlIGlzIG5vIHRlbXBsYXRlIGxhYmVsLiAqL1xuICBASW5wdXQoJ2xhYmVsJykgcHVibGljIHRleHRMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgLyoqIEFyaWEgZWxlbWVudCBmb3IgdGhlIHNsaWRlLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCB0aGF0IHRoZSBzbGlkZSBpcyBsYWJlbGxlZCBieS5cbiAgICogV2lsbCBiZSBjbGVhcmVkIGlmIGBhcmlhLWxhYmVsYCBpcyBzZXQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgcHVibGljIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmc7XG5cbiAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgcHVibGljIGdldCBjb250ZW50KCk6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRQb3J0YWw7XG4gIH1cblxuICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSBzbGlkZSBjaGFuZ2VzLiAqL1xuICBwdWJsaWMgcmVhZG9ubHkgX3N0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSByZWxhdGl2ZWx5IGluZGV4ZWQgcG9zaXRpb24gd2hlcmUgMCByZXByZXNlbnRzIHRoZSBjZW50ZXIsIG5lZ2F0aXZlIGlzIGxlZnQsIGFuZCBwb3NpdGl2ZVxuICAgKiByZXByZXNlbnRzIHRoZSByaWdodC5cbiAgICovXG4gIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIHJlbGF0aXZlbHkgaW5kZXggb3JpZ2luIG9mIHRoZSBzbGlkZSBpZiBpdCB3YXMgY3JlYXRlZCBhbmQgc2VsZWN0ZWQgYWZ0ZXIgdGhlcmVcbiAgICogd2FzIGFscmVhZHkgYSBzZWxlY3RlZCBzbGlkZS4gUHJvdmlkZXMgY29udGV4dCBvZiB3aGF0IHBvc2l0aW9uIHRoZSBzbGlkZSBzaG91bGQgb3JpZ2luYXRlIGZyb20uXG4gICAqL1xuICBwdWJsaWMgb3JpZ2luOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgc2xpZGUgaXMgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIHB1YmxpYyBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIC8qKiBQb3J0YWwgdGhhdCB3aWxsIGJlIHRoZSBob3N0ZWQgY29udGVudCBvZiB0aGUgc2xpZGUgKi9cbiAgcHJvdGVjdGVkIF9jb250ZW50UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwgPSBudWxsO1xuXG4gIC8vIEBDb250ZW50Q2hpbGQoSmFtU2xpZGVDb250ZW50LCB7cmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gIHByb3RlY3RlZCBfZXhwbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBUZW1wbGF0ZSBpbnNpZGUgdGhlIEphbVNsaWRlIHZpZXcgdGhhdCBjb250YWlucyBhbiBgPG5nLWNvbnRlbnQ+YC4gKi9cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgcHJvdGVjdGVkIF9pbXBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndGV4dExhYmVsJykgfHwgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZGlzYWJsZWQnKSkge1xuICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGVudFBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbChcbiAgICAgICAgdGhpcy5fZXhwbGljaXRDb250ZW50IHx8IHRoaXMuX2ltcGxpY2l0Q29udGVudCwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsXG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZVJpcHBsZSxcbiAgQ2FuRGlzYWJsZVJpcHBsZUN0b3IsXG4gIG1peGluQ29sb3IsXG4gIG1peGluRGlzYWJsZVJpcHBsZSxcbiAgVGhlbWVQYWxldHRlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSmFtU2xpZGUgfSBmcm9tICcuL3NsaWRlJztcbmltcG9ydCB7IEphbVNsaWRlSGVhZGVyIH0gZnJvbSAnLi9zbGlkZS1oZWFkZXInO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogaW50ZXJmYWNlLW5hbWUgdXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvciB1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3IgY29tcG9uZW50LXNlbGVjdG9yXG5cbi8qKiBVc2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRCdzIGZvciBlYWNoIHNsaWRlIGNvbXBvbmVudCAqL1xubGV0IG5leHRJZCA9IDA7XG5cbi8qKiBBIHNpbXBsZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCBvbiBmb2N1cyBvciBzZWxlY3Rpb24gY2hhbmdlcy4gKi9cbmV4cG9ydCBjbGFzcyBKYW1TbGlkZUNoYW5nZUV2ZW50IHtcbiAgLyoqIEluZGV4IG9mIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgc2xpZGUuICovXG4gIHB1YmxpYyBpbmRleDogbnVtYmVyO1xuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50bHktc2VsZWN0ZWQgc2xpZGUuICovXG4gIHB1YmxpYyBzbGlkZTogSmFtU2xpZGU7XG59XG5cbi8qKiBQb3NzaWJsZSBwb3NpdGlvbnMgZm9yIHRoZSBzbGlkZSBoZWFkZXIuICovXG5leHBvcnQgdHlwZSBKYW1TbGlkZUhlYWRlclBvc2l0aW9uID0gJ2Fib3ZlJyB8ICdiZWxvdyc7XG5cbi8qKiBPYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHNsaWRlcyBtb2R1bGUuICovXG5leHBvcnQgaW50ZXJmYWNlIEphbVNsaWRlc0NvbmZpZyB7XG4gIC8qKiBEdXJhdGlvbiBmb3IgdGhlIHNsaWRlIGFuaW1hdGlvbi4gTXVzdCBiZSBhIHZhbGlkIENTUyB2YWx1ZSAoZS5nLiA2MDBtcykuICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uPzogc3RyaW5nO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIHRoZSBzbGlkZXMgbW9kdWxlLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9UQUJTX0NPTkZJRzogSW5qZWN0aW9uVG9rZW48YW55PiA9IG5ldyBJbmplY3Rpb25Ub2tlbignTUFUX1RBQlNfQ09ORklHJyk7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gSmFtU2xpZGVHcm91cC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVHcm91cEJhc2Uge1xuICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuZXhwb3J0IGNvbnN0IF9KYW1TbGlkZUdyb3VwTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiBDYW5EaXNhYmxlUmlwcGxlQ3RvciAmIHR5cGVvZiBKYW1TbGlkZUdyb3VwQmFzZSA9XG4gICAgbWl4aW5Db2xvcihtaXhpbkRpc2FibGVSaXBwbGUoSmFtU2xpZGVHcm91cEJhc2UpLCAncHJpbWFyeScpO1xuXG4vKipcbiAqIE1hdGVyaWFsIGRlc2lnbiBzbGlkZS1ncm91cCBjb21wb25lbnQuICBTdXBwb3J0cyBiYXNpYyBzbGlkZSBwYWlycyAobGFiZWwgKyBjb250ZW50KSBhbmQgaW5jbHVkZXNcbiAqIGFuaW1hdGVkIGluay1iYXIsIGtleWJvYXJkIG5hdmlnYXRpb24sIGFuZCBzY3JlZW4gcmVhZGVyLlxuICogU2VlOiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3NsaWRlcy5odG1sXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2phbS1zbGlkZS1ncm91cCcsXG4gIGV4cG9ydEFzOiAnamFtU2xpZGVHcm91cCcsXG4gIHRlbXBsYXRlOiBgPGphbS1zbGlkZS1oZWFkZXIgI3NsaWRlSGVhZGVyXG4gICAgICAgICAgICAgICBbc2VsZWN0ZWRJbmRleF09XCJzZWxlY3RlZEluZGV4XCJcbiAgICAgICAgICAgICAgIFtkaXNhYmxlUmlwcGxlXT1cImRpc2FibGVSaXBwbGVcIlxuICAgICAgICAgICAgICAgKGluZGV4Rm9jdXNlZCk9XCJfZm9jdXNDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgICAgKHNlbGVjdEZvY3VzZWRJbmRleCk9XCJzZWxlY3RlZEluZGV4ID0gJGV2ZW50XCI+XG4gIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtZWxlbWVudFwiIHJvbGU9XCJzbGlkZVwiIGphbVNsaWRlRWxlbWVudFdyYXBwZXIgbWF0LXJpcHBsZSBjZGtNb25pdG9yRWxlbWVudEZvY3VzXG4gICAgICAgKm5nRm9yPVwibGV0IHNsaWRlIG9mIF9zbGlkZXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgIFtpZF09XCJfZ2V0VGFiTGFiZWxJZChpKVwiXG4gICAgICAgW2F0dHIudGFiSW5kZXhdPVwiX2dldFRhYkluZGV4KHNsaWRlLCBpKVwiXG4gICAgICAgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJpICsgMVwiXG4gICAgICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cIl9zbGlkZXMubGVuZ3RoXCJcbiAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIl9nZXRUYWJDb250ZW50SWQoaSlcIlxuICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwic2VsZWN0ZWRJbmRleCA9PSBpXCJcbiAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInNsaWRlLmFyaWFMYWJlbCB8fCBudWxsXCJcbiAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiKCFzbGlkZS5hcmlhTGFiZWwgJiYgc2xpZGUuYXJpYUxhYmVsbGVkYnkpID8gc2xpZGUuYXJpYUxhYmVsbGVkYnkgOiBudWxsXCJcbiAgICAgICBbY2xhc3MuamFtLXNsaWRlLWVsZW1lbnQtYWN0aXZlXT1cInNlbGVjdGVkSW5kZXggPT0gaVwiXG4gICAgICAgW2Rpc2FibGVkXT1cInNsaWRlLmRpc2FibGVkXCJcbiAgICAgICBbbWF0UmlwcGxlRGlzYWJsZWRdPVwic2xpZGUuZGlzYWJsZWQgfHwgZGlzYWJsZVJpcHBsZVwiXG4gICAgICAgKGNsaWNrKT1cIl9oYW5kbGVDbGljayhzbGlkZSwgc2xpZGVIZWFkZXIsIGkpXCI+XG5cblxuICAgIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtZWxlbWVudC1jb250ZW50XCI+XG4gICAgICA8IS0tIElmIHRoZXJlIGlzIGEgZWxlbWVudCB0ZW1wbGF0ZSwgdXNlIGl0LiAtLT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJzbGlkZS50ZW1wbGF0ZUxhYmVsXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cInNsaWRlLnRlbXBsYXRlTGFiZWxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBJZiB0aGVyZSBpcyBub3QgYSBlbGVtZW50IHRlbXBsYXRlLCBmYWxsIGJhY2sgdG8gdGhlIHRleHQgbGFiZWwuIC0tPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFzbGlkZS50ZW1wbGF0ZUxhYmVsXCI+e3tzbGlkZS50ZXh0TGFiZWx9fTwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9qYW0tc2xpZGUtaGVhZGVyPlxuXG48IS0tIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtYm9keS13cmFwcGVyXCIgI3NsaWRlQm9keVdyYXBwZXI+XG4gIDxqYW0tc2xpZGUtYm9keSByb2xlPVwic2xpZGVwYW5lbFwiXG4gICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgc2xpZGUgb2YgX3NsaWRlczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICBbaWRdPVwiX2dldFRhYkNvbnRlbnRJZChpKVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiX2dldFRhYkxhYmVsSWQoaSlcIlxuICAgICAgICAgICAgICAgW2NsYXNzLmphbS1zbGlkZS1ib2R5LWFjdGl2ZV09XCJzZWxlY3RlZEluZGV4ID09IGlcIlxuICAgICAgICAgICAgICAgW2NvbnRlbnRdPVwic2xpZGUuY29udGVudFwiXG4gICAgICAgICAgICAgICBbcG9zaXRpb25dPVwic2xpZGUucG9zaXRpb25cIlxuICAgICAgICAgICAgICAgW29yaWdpbl09XCJzbGlkZS5vcmlnaW5cIlxuICAgICAgICAgICAgICAgW2FuaW1hdGlvbkR1cmF0aW9uXT1cImFuaW1hdGlvbkR1cmF0aW9uXCJcbiAgICAgICAgICAgICAgIChfb25DZW50ZXJlZCk9XCJfcmVtb3ZlVGFiQm9keVdyYXBwZXJIZWlnaHQoKVwiXG4gICAgICAgICAgICAgICAoX29uQ2VudGVyaW5nKT1cIl9zZXRUYWJCb2R5V3JhcHBlckhlaWdodCgkZXZlbnQpXCI+XG4gIDwvamFtLXNsaWRlLWJvZHk+XG48L2Rpdj4gLS0+XG5gLFxuICBzdHlsZXM6IFtgQC13ZWJraXQta2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0ey8qISovfUAtd2Via2l0LWtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR7LyohKi99Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZXtmb250LXNpemU6MjBweH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9QG1lZGlhIHByaW50ey5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIyZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjJlbSkgc2NhbGUoLjc1KX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjFlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyMWVtKSBzY2FsZSguNzUpfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTJlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyZW0pIHNjYWxlKC43NSl9fS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjI1ZW0gMCAuNzVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4wOTM3NWVtO21hcmdpbi10b3A6LS41ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOjFlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLXN1Yi1sYWJlbC1lcnJvcntmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLWVycm9ye2ZvbnQtc2l6ZToxNHB4fS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OHB4O3BhZGRpbmctYm90dG9tOjhweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTZweH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QtYmFzZSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTJweH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1uZXN0ZWQtdHJlZS1ub2RlLC5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmV9Lm1hdC1yaXBwbGUubWF0LXJpcHBsZS11bmJvdW5kZWR7b3ZlcmZsb3c6dmlzaWJsZX0ubWF0LXJpcHBsZS1lbGVtZW50e3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlci1yYWRpdXM6NTAlO3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9QG1lZGlhICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5tYXQtcmlwcGxlLWVsZW1lbnR7ZGlzcGxheTpub25lfX0uY2RrLXZpc3VhbGx5LWhpZGRlbntib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyLC5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY2RrLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktY29udGFpbmVyOmVtcHR5e2Rpc3BsYXk6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMzIpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWJveC1kaXJlY3Rpb246bm9ybWFsO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttaW4td2lkdGg6MXB4O21pbi1oZWlnaHQ6MXB4fS5jZGstZ2xvYmFsLXNjcm9sbGJsb2Nre3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7b3ZlcmZsb3cteTpzY3JvbGx9QGtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydHsvKiEqL31Aa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZHsvKiEqL30uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5qYW0tc2xpZGUtZ3JvdXB7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5qYW0tc2xpZGUtZ3JvdXAuamFtLXNsaWRlLWdyb3VwLWludmVydGVkLWhlYWRlcnstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOnJldmVyc2U7ZmxleC1kaXJlY3Rpb246Y29sdW1uLXJldmVyc2V9LmphbS1zbGlkZS1lbGVtZW50e2hlaWdodDphdXRvO3BhZGRpbmc6MCAxNnB4O2N1cnNvcjpwb2ludGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveDtvcGFjaXR5Oi42O21pbi13aWR0aDoxNjBweDt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXA7cG9zaXRpb246cmVsYXRpdmV9LmphbS1zbGlkZS1lbGVtZW50OmZvY3Vze291dGxpbmU6MH0uamFtLXNsaWRlLWVsZW1lbnQ6Zm9jdXM6bm90KC5qYW0tc2xpZGUtZGlzYWJsZWQpe29wYWNpdHk6MX0uamFtLXNsaWRlLWVsZW1lbnQuamFtLXNsaWRlLWRpc2FibGVke2N1cnNvcjpkZWZhdWx0fS5qYW0tc2xpZGUtZWxlbWVudCAuamFtLXNsaWRlLWVsZW1lbnQtY29udGVudHtkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXB9QG1lZGlhICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5qYW0tc2xpZGUtZWxlbWVudDpmb2N1c3tvdXRsaW5lOmRvdHRlZCAycHh9LmphbS1zbGlkZS1lbGVtZW50LmphbS1zbGlkZS1kaXNhYmxlZHtvcGFjaXR5Oi41fS5qYW0tc2xpZGUtZWxlbWVudHtvcGFjaXR5OjF9fUBtZWRpYSAobWF4LXdpZHRoOjU5OXB4KXsuamFtLXNsaWRlLWVsZW1lbnR7cGFkZGluZzowIDEycHh9fUBtZWRpYSAobWF4LXdpZHRoOjk1OXB4KXsuamFtLXNsaWRlLWVsZW1lbnR7cGFkZGluZzowIDEycHh9fS5qYW0tc2xpZGUtZ3JvdXBbbWF0LXN0cmV0Y2gtc2xpZGVzXT4uamFtLXNsaWRlLWhlYWRlciAuamFtLXNsaWRlLWVsZW1lbnR7ZmxleC1iYXNpczowOy13ZWJraXQtYm94LWZsZXg6MTtmbGV4LWdyb3c6MX0uamFtLXNsaWRlLWJvZHktd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC10cmFuc2l0aW9uOmhlaWdodCAuNXMgY3ViaWMtYmV6aWVyKC4zNSwwLC4yNSwxKTt0cmFuc2l0aW9uOmhlaWdodCAuNXMgY3ViaWMtYmV6aWVyKC4zNSwwLC4yNSwxKX0uamFtLXNsaWRlLWJvZHl7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW47ZmxleC1iYXNpczoxMDAlfS5qYW0tc2xpZGUtYm9keS5qYW0tc2xpZGUtYm9keS1hY3RpdmV7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3cteDpoaWRkZW47b3ZlcmZsb3cteTphdXRvO3otaW5kZXg6MTstd2Via2l0LWJveC1mbGV4OjE7ZmxleC1ncm93OjF9LmphbS1zbGlkZS1ncm91cC5qYW0tc2xpZGUtZ3JvdXAtZHluYW1pYy1oZWlnaHQgLmphbS1zbGlkZS1ib2R5LmphbS1zbGlkZS1ib2R5LWFjdGl2ZXtvdmVyZmxvdy15OmhpZGRlbn1gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlUmlwcGxlJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnamFtLXNsaWRlLWdyb3VwJyxcbiAgICAnW2NsYXNzLmphbS1zbGlkZS1ncm91cC1keW5hbWljLWhlaWdodF0nOiAnZHluYW1pY0hlaWdodCcsXG4gICAgJ1tjbGFzcy5qYW0tc2xpZGUtZ3JvdXAtaW52ZXJ0ZWQtaGVhZGVyXSc6ICdoZWFkZXJQb3NpdGlvbiA9PT0gXCJiZWxvd1wiJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlR3JvdXAgZXh0ZW5kcyBfSmFtU2xpZGVHcm91cE1peGluQmFzZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25EZXN0cm95LCBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihKYW1TbGlkZSkgcHVibGljIF9zbGlkZXM6IFF1ZXJ5TGlzdDxKYW1TbGlkZT47XG5cbiAgQFZpZXdDaGlsZCgnc2xpZGVCb2R5V3JhcHBlcicpIHB1YmxpYyBfc2xpZGVCb2R5V3JhcHBlcjogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKCdzbGlkZUhlYWRlcicpIHB1YmxpYyBfc2xpZGVIZWFkZXI6IEphbVNsaWRlSGVhZGVyO1xuXG4gIC8qKiBPdXRwdXQgdG8gZW5hYmxlIHN1cHBvcnQgZm9yIHR3by13YXkgYmluZGluZyBvbiBgWyhzZWxlY3RlZEluZGV4KV1gICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ZWRJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGZvY3VzIGhhcyBjaGFuZ2VkIHdpdGhpbiBhIHNsaWRlIGdyb3VwLiAqL1xuICBAT3V0cHV0KCkgcHVibGljIHJlYWRvbmx5IGZvY3VzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SmFtU2xpZGVDaGFuZ2VFdmVudD4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxKYW1TbGlkZUNoYW5nZUV2ZW50PigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGJvZHkgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWQgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByZWFkb25seSBhbmltYXRpb25Eb25lOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2xpZGUgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkLiAqL1xuICBAT3V0cHV0KCkgcHVibGljIHJlYWRvbmx5IHNlbGVjdGVkVGFiQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SmFtU2xpZGVDaGFuZ2VFdmVudD4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxKYW1TbGlkZUNoYW5nZUV2ZW50Pih0cnVlKTtcblxuICAvKiogUG9zaXRpb24gb2YgdGhlIHNsaWRlIGhlYWRlci4gKi9cbiAgQElucHV0KCkgcHVibGljIGhlYWRlclBvc2l0aW9uOiBKYW1TbGlkZUhlYWRlclBvc2l0aW9uID0gJ2Fib3ZlJztcblxuICAvKiogVGhlIHNsaWRlIGluZGV4IHRoYXQgc2hvdWxkIGJlIHNlbGVjdGVkIGFmdGVyIHRoZSBjb250ZW50IGhhcyBiZWVuIGNoZWNrZWQuICovXG4gIHByaXZhdGUgX2luZGV4VG9TZWxlY3Q6IG51bWJlciB8IG51bGwgPSAwO1xuXG4gIC8qKiBTbmFwc2hvdCBvZiB0aGUgaGVpZ2h0IG9mIHRoZSBzbGlkZSBib2R5IHdyYXBwZXIgYmVmb3JlIGFub3RoZXIgc2xpZGUgaXMgYWN0aXZhdGVkLiAqL1xuICBwcml2YXRlIF9zbGlkZUJvZHlXcmFwcGVySGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gc2xpZGVzIGJlaW5nIGFkZGVkL3JlbW92ZWQuICovXG4gIHByaXZhdGUgX3NsaWRlc1N1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIHNsaWRlIGxhYmVscy4gKi9cbiAgcHJpdmF0ZSBfc2xpZGVFbGVtZW50U3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZSBncm91cCBzaG91bGQgZ3JvdyB0byB0aGUgc2l6ZSBvZiB0aGUgYWN0aXZlIHNsaWRlLiAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGR5bmFtaWNIZWlnaHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9keW5hbWljSGVpZ2h0OyB9XG4gIHB1YmxpYyBzZXQgZHluYW1pY0hlaWdodCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9keW5hbWljSGVpZ2h0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9keW5hbWljSGVpZ2h0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHNsaWRlLiAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHwgbnVsbCB7IHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4OyB9XG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMuX2luZGV4VG9TZWxlY3QgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgbnVsbCk7XG4gIH1cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIER1cmF0aW9uIGZvciB0aGUgc2xpZGUgYW5pbWF0aW9uLiBXaWxsIGJlIG5vcm1hbGl6ZWQgdG8gbWlsbGlzZWNvbmRzIGlmIG5vIHVuaXRzIGFyZSBzZXQuICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgYW5pbWF0aW9uRHVyYXRpb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uOyB9XG4gIHB1YmxpYyBzZXQgYW5pbWF0aW9uRHVyYXRpb24odmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uID0gL15cXGQrJC8udGVzdCh2YWx1ZSkgPyB2YWx1ZSArICdtcycgOiB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9hbmltYXRpb25EdXJhdGlvbjogc3RyaW5nO1xuXG4gIC8qKiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBzbGlkZSBncm91cC4gKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBiYWNrZ3JvdW5kQ29sb3IoKTogVGhlbWVQYWxldHRlIHsgcmV0dXJuIHRoaXMuX2JhY2tncm91bmRDb2xvcjsgfVxuICBwdWJsaWMgc2V0IGJhY2tncm91bmRDb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBuYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYG1hdC1iYWNrZ3JvdW5kLSR7dGhpcy5iYWNrZ3JvdW5kQ29sb3J9YCk7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIG5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWF0LWJhY2tncm91bmQtJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9iYWNrZ3JvdW5kQ29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICBwcml2YXRlIF9ncm91cElkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIEBJbmplY3QoTUFUX1RBQlNfQ09ORklHKSBAT3B0aW9uYWwoKSBkZWZhdWx0Q29uZmlnPzogSmFtU2xpZGVzQ29uZmlnXG4gICAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgdGhpcy5fZ3JvdXBJZCA9IG5leHRJZCArPSAxO1xuICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSBkZWZhdWx0Q29uZmlnICYmIGRlZmF1bHRDb25maWcuYW5pbWF0aW9uRHVyYXRpb24gP1xuICAgICAgICBkZWZhdWx0Q29uZmlnLmFuaW1hdGlvbkR1cmF0aW9uIDogJzUwMG1zJztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB0aGUgY29udGVudCBpcyBjaGVja2VkLCB0aGlzIGNvbXBvbmVudCBrbm93cyB3aGF0IHNsaWRlcyBoYXZlIGJlZW4gZGVmaW5lZFxuICAgKiBhbmQgd2hhdCB0aGUgc2VsZWN0ZWQgaW5kZXggc2hvdWxkIGJlLiBUaGlzIGlzIHdoZXJlIHdlIGNhbiBrbm93IGV4YWN0bHkgd2hhdCBwb3NpdGlvblxuICAgKiBlYWNoIHNsaWRlIHNob3VsZCBiZSBpbiBhY2NvcmRpbmcgdG8gdGhlIG5ldyBzZWxlY3RlZCBpbmRleCwgYW5kIGFkZGl0aW9uYWxseSB3ZSBrbm93IGhvd1xuICAgKiBhIG5ldyBzZWxlY3RlZCBzbGlkZSBzaG91bGQgdHJhbnNpdGlvbiBpbiAoZnJvbSB0aGUgbGVmdCBvciByaWdodCkuXG4gICAqL1xuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIERvbid0IGNsYW1wIHRoZSBgaW5kZXhUb1NlbGVjdGAgaW1tZWRpYXRlbHkgaW4gdGhlIHNldHRlciBiZWNhdXNlIGl0IGNhbiBoYXBwZW4gdGhhdFxuICAgIC8vIHRoZSBhbW91bnQgb2Ygc2xpZGVzIGNoYW5nZXMgYmVmb3JlIHRoZSBhY3R1YWwgY2hhbmdlIGRldGVjdGlvbiBydW5zLlxuICAgIGNvbnN0IGluZGV4VG9TZWxlY3QgPSB0aGlzLl9pbmRleFRvU2VsZWN0ID0gdGhpcy5fY2xhbXBUYWJJbmRleCh0aGlzLl9pbmRleFRvU2VsZWN0KTtcblxuICAgIC8vIElmIHRoZXJlIGlzIGEgY2hhbmdlIGluIHNlbGVjdGVkIGluZGV4LCBlbWl0IGEgY2hhbmdlIGV2ZW50LiBTaG91bGQgbm90IHRyaWdnZXIgaWZcbiAgICAvLyB0aGUgc2VsZWN0ZWQgaW5kZXggaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZC5cbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCkge1xuICAgICAgY29uc3QgaXNGaXJzdFJ1biA9ICF0aGlzLl9zZWxlY3RlZEluZGV4O1xuXG4gICAgICBpZiAoIWlzRmlyc3RSdW4pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYkNoYW5nZS5lbWl0KHRoaXMuX2NyZWF0ZUNoYW5nZUV2ZW50KGluZGV4VG9TZWxlY3QpKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hhbmdpbmcgdGhlc2UgdmFsdWVzIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgLy8gc2luY2UgdGhlIGNoZWNrZWQgY29udGVudCBtYXkgY29udGFpbiByZWZlcmVuY2VzIHRvIHRoZW0uXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4gc2xpZGUuaXNBY3RpdmUgPSBpbmRleCA9PT0gaW5kZXhUb1NlbGVjdCk7XG5cbiAgICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlLmVtaXQoaW5kZXhUb1NlbGVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNldHVwIHRoZSBwb3NpdGlvbiBmb3IgZWFjaCBzbGlkZSBhbmQgb3B0aW9uYWxseSBzZXR1cCBhbiBvcmlnaW4gb24gdGhlIG5leHQgc2VsZWN0ZWQgc2xpZGUuXG4gICAgdGhpcy5fc2xpZGVzLmZvckVhY2goKHNsaWRlOiBKYW1TbGlkZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgc2xpZGUucG9zaXRpb24gPSBpbmRleCAtIGluZGV4VG9TZWxlY3Q7XG5cbiAgICAgIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBzZWxlY3RlZCBzbGlkZSwgdGhlbiBzZXQgdXAgYW4gb3JpZ2luIGZvciB0aGUgbmV4dCBzZWxlY3RlZCBzbGlkZVxuICAgICAgLy8gaWYgaXQgZG9lc24ndCBoYXZlIG9uZSBhbHJlYWR5LlxuICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZEluZGV4ICYmIHNsaWRlLnBvc2l0aW9uID09PSAwICYmICFzbGlkZS5vcmlnaW4pIHtcbiAgICAgICAgc2xpZGUub3JpZ2luID0gaW5kZXhUb1NlbGVjdCAtIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4VG9TZWxlY3Q7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3N1YnNjcmliZVRvVGFiTGFiZWxzKCk7XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgYW1vdW50IG9mIHNsaWRlcywgaW4gb3JkZXIgdG8gYmVcbiAgICAvLyBhYmxlIHRvIHJlLXJlbmRlciB0aGUgY29udGVudCBhcyBuZXcgc2xpZGVzIGFyZSBhZGRlZCBvciByZW1vdmVkLlxuICAgIHRoaXMuX3NsaWRlc1N1YnNjcmlwdGlvbiA9IHRoaXMuX3NsaWRlcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5fY2xhbXBUYWJJbmRleCh0aGlzLl9pbmRleFRvU2VsZWN0KTtcblxuICAgICAgLy8gTWFpbnRhaW4gdGhlIHByZXZpb3VzbHktc2VsZWN0ZWQgc2xpZGUgaWYgYSBuZXcgc2xpZGUgaXMgYWRkZWQgb3IgcmVtb3ZlZCBhbmQgdGhlcmUgaXMgbm9cbiAgICAgIC8vIGV4cGxpY2l0IGNoYW5nZSB0aGF0IHNlbGVjdHMgYSBkaWZmZXJlbnQgc2xpZGUuXG4gICAgICBpZiAoaW5kZXhUb1NlbGVjdCA9PT0gdGhpcy5fc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICBjb25zdCBzbGlkZXMgPSB0aGlzLl9zbGlkZXMudG9BcnJheSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKHNsaWRlc1tpXS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgLy8gQXNzaWduIGJvdGggdG8gdGhlIGBfaW5kZXhUb1NlbGVjdGAgYW5kIGBfc2VsZWN0ZWRJbmRleGAgc28gd2UgZG9uJ3QgZmlyZSBhIGNoYW5nZWRcbiAgICAgICAgICAgIC8vIGV2ZW50LCBvdGhlcndpc2UgdGhlIGNvbnN1bWVyIG1heSBlbmQgdXAgaW4gYW4gaW5maW5pdGUgbG9vcCBpbiBzb21lIGVkZ2UgY2FzZXMgbGlrZVxuICAgICAgICAgICAgLy8gYWRkaW5nIGEgc2xpZGUgd2l0aGluIHRoZSBgc2VsZWN0ZWRJbmRleENoYW5nZWAgZXZlbnQuXG4gICAgICAgICAgICB0aGlzLl9pbmRleFRvU2VsZWN0ID0gdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3Vic2NyaWJlVG9UYWJMYWJlbHMoKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NsaWRlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NsaWRlRWxlbWVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqIFJlLWFsaWducyB0aGUgaW5rIGJhciB0byB0aGUgc2VsZWN0ZWQgc2xpZGUgZWxlbWVudC4gKi9cbiAgLy8gcmVhbGlnbklua0JhcigpIHtcbiAgLy8gICBpZiAodGhpcy5fc2xpZGVIZWFkZXIpIHtcbiAgLy8gICAgIHRoaXMuX3NsaWRlSGVhZGVyLl9hbGlnbklua0JhclRvU2VsZWN0ZWRUYWIoKTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICBwdWJsaWMgX2ZvY3VzQ2hhbmdlZChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5mb2N1c0NoYW5nZS5lbWl0KHRoaXMuX2NyZWF0ZUNoYW5nZUV2ZW50KGluZGV4KSk7XG4gIH1cblxuICAvKiogUmV0dXJucyBhIHVuaXF1ZSBpZCBmb3IgZWFjaCBzbGlkZSBlbGVtZW50IGVsZW1lbnQgKi9cbiAgcHVibGljIF9nZXRUYWJMYWJlbElkKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBqYW0tc2xpZGUtZWxlbWVudC0ke3RoaXMuX2dyb3VwSWR9LSR7aX1gO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYSB1bmlxdWUgaWQgZm9yIGVhY2ggc2xpZGUgY29udGVudCBlbGVtZW50ICovXG4gIHB1YmxpYyBfZ2V0VGFiQ29udGVudElkKGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBqYW0tc2xpZGUtY29udGVudC0ke3RoaXMuX2dyb3VwSWR9LSR7aX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgYm9keSB3cmFwcGVyIHRvIHRoZSBoZWlnaHQgb2YgdGhlIGFjdGl2YXRpbmcgc2xpZGUgaWYgZHluYW1pY1xuICAgKiBoZWlnaHQgcHJvcGVydHkgaXMgdHJ1ZS5cbiAgICovXG4gIHB1YmxpYyBfc2V0VGFiQm9keVdyYXBwZXJIZWlnaHQoc2xpZGVIZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZHluYW1pY0hlaWdodCB8fCAhdGhpcy5fc2xpZGVCb2R5V3JhcHBlckhlaWdodCkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IHdyYXBwZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5fc2xpZGVCb2R5V3JhcHBlci5uYXRpdmVFbGVtZW50O1xuXG4gICAgd3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9zbGlkZUJvZHlXcmFwcGVySGVpZ2h0ICsgJ3B4JztcblxuICAgIC8vIFRoaXMgY29uZGl0aW9uYWwgZm9yY2VzIHRoZSBicm93c2VyIHRvIHBhaW50IHRoZSBoZWlnaHQgc28gdGhhdFxuICAgIC8vIHRoZSBhbmltYXRpb24gdG8gdGhlIG5ldyBoZWlnaHQgY2FuIGhhdmUgYW4gb3JpZ2luLlxuICAgIGlmICh0aGlzLl9zbGlkZUJvZHlXcmFwcGVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICB3cmFwcGVyLnN0eWxlLmhlaWdodCA9IHNsaWRlSGVpZ2h0ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICAvKiogUmVtb3ZlcyB0aGUgaGVpZ2h0IG9mIHRoZSBzbGlkZSBib2R5IHdyYXBwZXIuICovXG4gIHB1YmxpYyBfcmVtb3ZlVGFiQm9keVdyYXBwZXJIZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuX3NsaWRlQm9keVdyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLl9zbGlkZUJvZHlXcmFwcGVySGVpZ2h0ID0gd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgd3JhcHBlci5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICB0aGlzLmFuaW1hdGlvbkRvbmUuZW1pdCgpO1xuICB9XG5cbiAgLyoqIEhhbmRsZSBjbGljayBldmVudHMsIHNldHRpbmcgbmV3IHNlbGVjdGVkIGluZGV4IGlmIGFwcHJvcHJpYXRlLiAqL1xuICBwdWJsaWMgX2hhbmRsZUNsaWNrKHNsaWRlOiBKYW1TbGlkZSwgc2xpZGVIZWFkZXI6IEphbVNsaWRlSGVhZGVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCFzbGlkZS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2xpZGVIZWFkZXIuZm9jdXNJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZXRyaWV2ZXMgdGhlIHNsaWRlaW5kZXggZm9yIHRoZSBzbGlkZS4gKi9cbiAgcHVibGljIF9nZXRUYWJJbmRleChzbGlkZTogSmFtU2xpZGUsIGlkeDogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKHNsaWRlLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4ID09PSBpZHggPyAwIDogLTE7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVDaGFuZ2VFdmVudChpbmRleDogbnVtYmVyKTogSmFtU2xpZGVDaGFuZ2VFdmVudCB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgSmFtU2xpZGVDaGFuZ2VFdmVudCgpO1xuICAgIGV2ZW50LmluZGV4ID0gaW5kZXg7XG4gICAgaWYgKHRoaXMuX3NsaWRlcyAmJiB0aGlzLl9zbGlkZXMubGVuZ3RoKSB7XG4gICAgICBldmVudC5zbGlkZSA9IHRoaXMuX3NsaWRlcy50b0FycmF5KClbaW5kZXhdO1xuICAgIH1cblxuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIGNoYW5nZXMgaW4gdGhlIHNsaWRlIGxhYmVscy4gVGhpcyBpcyBuZWVkZWQsIGJlY2F1c2UgdGhlIEBJbnB1dCBmb3IgdGhlIGVsZW1lbnQgaXNcbiAgICogb24gdGhlIEphbVNsaWRlIGNvbXBvbmVudCwgd2hlcmVhcyB0aGUgZGF0YSBiaW5kaW5nIGlzIGluc2lkZSB0aGUgSmFtU2xpZGVHcm91cC4gSW4gb3JkZXIgZm9yIHRoZVxuICAgKiBiaW5kaW5nIHRvIGJlIHVwZGF0ZWQsIHdlIG5lZWQgdG8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gaXQgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgKiBtYW51YWxseS5cbiAgICovXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvVGFiTGFiZWxzKCkge1xuICAgIGlmICh0aGlzLl9zbGlkZUVsZW1lbnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3NsaWRlRWxlbWVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3NsaWRlRWxlbWVudFN1YnNjcmlwdGlvbiA9IG1lcmdlKC4uLnRoaXMuX3NsaWRlcy5tYXAoc2xpZGUgPT4gc2xpZGUuX3N0YXRlQ2hhbmdlcykpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIC8qKiBDbGFtcHMgdGhlIGdpdmVuIGluZGV4IHRvIHRoZSBib3VuZHMgb2YgMCBhbmQgdGhlIHNsaWRlcyBsZW5ndGguICovXG4gIHByaXZhdGUgX2NsYW1wVGFiSW5kZXgoaW5kZXg6IG51bWJlciB8IG51bGwpOiBudW1iZXIge1xuICAgIC8vIE5vdGUgdGhlIGB8fCAwYCwgd2hpY2ggZW5zdXJlcyB0aGF0IHZhbHVlcyBsaWtlIE5hTiBjYW4ndCBnZXQgdGhyb3VnaFxuICAgIC8vIGFuZCB3aGljaCB3b3VsZCBvdGhlcndpc2UgdGhyb3cgdGhlIGNvbXBvbmVudCBpbnRvIGFuIGluZmluaXRlIGxvb3BcbiAgICAvLyAoc2luY2UgTWF0aC5tYXgoTmFOLCAwKSA9PT0gTmFOKS5cbiAgICByZXR1cm4gTWF0aC5taW4odGhpcy5fc2xpZGVzLmxlbmd0aCAtIDEsIE1hdGgubWF4KGluZGV4IHx8IDAsIDApKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgbWl4aW5EaXNhYmxlZCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIEphbVNsaWRlRWxlbWVudFdyYXBwZXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIEphbVNsaWRlRWxlbWVudFdyYXBwZXJCYXNlIHt9XG5leHBvcnQgY29uc3QgX0phbVNsaWRlRWxlbWVudFdyYXBwZXJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIEphbVNsaWRlRWxlbWVudFdyYXBwZXJCYXNlID1cbiAgICBtaXhpbkRpc2FibGVkKEphbVNsaWRlRWxlbWVudFdyYXBwZXJCYXNlKTtcblxuLy8gdHNsaW50OmRpc2FibGU6IGludGVyZmFjZS1uYW1lIHVzZS1pbnB1dC1wcm9wZXJ0eS1kZWNvcmF0b3IgdXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yIGRpcmVjdGl2ZS1zZWxlY3RvclxuXG4vKipcbiAqIFVzZWQgaW4gdGhlIGBqYW0tc2xpZGUtZ3JvdXBgIHZpZXcgdG8gZGlzcGxheSBzbGlkZSBsYWJlbHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tqYW1TbGlkZUVsZW1lbnRXcmFwcGVyXScsXG4gIGlucHV0czogWydkaXNhYmxlZCddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5qYW0tc2xpZGUtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnISFkaXNhYmxlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyIGV4dGVuZHMgX0phbVNsaWRlRWxlbWVudFdyYXBwZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSB3cmFwcGVyIGVsZW1lbnQgKi9cbiAgcHVibGljIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0T2Zmc2V0TGVmdCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xuICB9XG5cbiAgcHVibGljIGdldE9mZnNldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEVORCwgRU5URVIsIEhPTUUsIFNQQUNFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlUmlwcGxlLCBDYW5EaXNhYmxlUmlwcGxlQ3RvciwgbWl4aW5EaXNhYmxlUmlwcGxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJqZWN0LCB0aW1lciwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBpbXBvcnQgeyBNYXRJbmtCYXIgfSBmcm9tICcuL2luay1iYXInO1xuaW1wb3J0IHsgSmFtU2xpZGVFbGVtZW50V3JhcHBlciB9IGZyb20gJy4vc2xpZGUtZWxlbWVudC13cmFwcGVyJztcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFBsYXRmb3JtLCBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcblxuLy8gdHNsaW50OmRpc2FibGU6IGludGVyZmFjZS1uYW1lIHVzZS1pbnB1dC1wcm9wZXJ0eS1kZWNvcmF0b3IgdXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yIGNvbXBvbmVudC1zZWxlY3RvclxuXG50eXBlIE1vZGlmaWVyS2V5ID0gJ2FsdEtleScgfCAnc2hpZnRLZXknIHwgJ2N0cmxLZXknIHwgJ21ldGFLZXknO1xuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGEgbW9kaWZpZXIga2V5IGlzIHByZXNzZWQuXG4gKiBAcGFyYW0gZXZlbnQgRXZlbnQgdG8gYmUgY2hlY2tlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc01vZGlmaWVyS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50LCAuLi5tb2RpZmllcnM6IEFycmF5PE1vZGlmaWVyS2V5Pik6IGJvb2xlYW4ge1xuICAgIGlmIChtb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgcmV0dXJuIG1vZGlmaWVycy5zb21lKG1vZGlmaWVyID0+IGV2ZW50W21vZGlmaWVyXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50LmFsdEtleSB8fCBldmVudC5zaGlmdEtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXk7XG59XG5cbi8qKiBDb25maWcgdXNlZCB0byBiaW5kIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzICovXG5jb25zdCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPVxuICAgIG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IHRydWV9KSBhcyBFdmVudExpc3RlbmVyT3B0aW9ucztcblxuLyoqXG4gKiBUaGUgZGlyZWN0aW9ucyB0aGF0IHNjcm9sbGluZyBjYW4gZ28gaW4gd2hlbiB0aGUgaGVhZGVyJ3Mgc2xpZGVzIGV4Y2VlZCB0aGUgaGVhZGVyIHdpZHRoLiAnQWZ0ZXInXG4gKiB3aWxsIHNjcm9sbCB0aGUgaGVhZGVyIHRvd2FyZHMgdGhlIGVuZCBvZiB0aGUgc2xpZGVzIGxpc3QgYW5kICdiZWZvcmUnIHdpbGwgc2Nyb2xsIHRvd2FyZHMgdGhlXG4gKiBiZWdpbm5pbmcgb2YgdGhlIGxpc3QuXG4gKi9cbmV4cG9ydCB0eXBlIFNjcm9sbERpcmVjdGlvbiA9ICdhZnRlcicgfCAnYmVmb3JlJztcblxuLyoqXG4gKiBUaGUgZGlzdGFuY2UgaW4gcGl4ZWxzIHRoYXQgd2lsbCBiZSBvdmVyc2hvdCB3aGVuIHNjcm9sbGluZyBhIHNsaWRlIGVsZW1lbnQgaW50byB2aWV3LiBUaGlzIGhlbHBzXG4gKiBwcm92aWRlIGEgc21hbGwgYWZmb3JkYW5jZSB0byB0aGUgZWxlbWVudCBuZXh0IHRvIGl0LlxuICovXG5jb25zdCBFWEFHR0VSQVRFRF9PVkVSU0NST0xMID0gNjA7XG5cbi8qKlxuICogQW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBzdGFydGluZyB0byBzY3JvbGwgdGhlIGhlYWRlciBhdXRvbWF0aWNhbGx5LlxuICogU2V0IGEgbGl0dGxlIGNvbnNlcnZhdGl2ZWx5IGluIG9yZGVyIHRvIGhhbmRsZSBmYWtlIGV2ZW50cyBkaXNwYXRjaGVkIG9uIHRvdWNoIGRldmljZXMuXG4gKi9cbmNvbnN0IEhFQURFUl9TQ1JPTExfREVMQVkgPSA2NTA7XG5cbi8qKlxuICogSW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzIGF0IHdoaWNoIHRvIHNjcm9sbCB0aGUgaGVhZGVyXG4gKiB3aGlsZSB0aGUgdXNlciBpcyBob2xkaW5nIHRoZWlyIHBvaW50ZXIuXG4gKi9cbmNvbnN0IEhFQURFUl9TQ1JPTExfSU5URVJWQUwgPSAxMDA7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gSmFtU2xpZGVIZWFkZXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIEphbVNsaWRlSGVhZGVyQmFzZSB7fVxuZXhwb3J0IGNvbnN0IF9KYW1TbGlkZUhlYWRlck1peGluQmFzZTogQ2FuRGlzYWJsZVJpcHBsZUN0b3IgJiB0eXBlb2YgSmFtU2xpZGVIZWFkZXJCYXNlID1cbiAgICBtaXhpbkRpc2FibGVSaXBwbGUoSmFtU2xpZGVIZWFkZXJCYXNlKTtcblxuLyoqXG4gKiBUaGUgaGVhZGVyIG9mIHRoZSBzbGlkZSBncm91cCB3aGljaCBkaXNwbGF5cyBhIGxpc3Qgb2YgYWxsIHRoZSBzbGlkZXMgaW4gdGhlIHNsaWRlIGdyb3VwLiBJbmNsdWRlc1xuICogYW4gaW5rIGJhciB0aGF0IGZvbGxvd3MgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBzbGlkZS4gV2hlbiB0aGUgc2xpZGVzIGxpc3QncyB3aWR0aCBleGNlZWRzIHRoZVxuICogd2lkdGggb2YgdGhlIGhlYWRlciBjb250YWluZXIsIHRoZW4gYXJyb3dzIHdpbGwgYmUgZGlzcGxheWVkIHRvIGFsbG93IHRoZSB1c2VyIHRvIHNjcm9sbFxuICogbGVmdCBhbmQgcmlnaHQgYWNyb3NzIHRoZSBoZWFkZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2phbS1zbGlkZS1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24gamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWJlZm9yZSBtYXQtZWxldmF0aW9uLXo0XCJcbiAgICAgI3ByZXZpb3VzUGFnaW5hdG9yXG4gICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgIG1hdC1yaXBwbGUgW21hdFJpcHBsZURpc2FibGVkXT1cIl9kaXNhYmxlU2Nyb2xsQmVmb3JlIHx8IGRpc2FibGVSaXBwbGVcIlxuICAgICBbY2xhc3MuamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWRpc2FibGVkXT1cIl9kaXNhYmxlU2Nyb2xsQmVmb3JlXCJcbiAgICAgKGNsaWNrKT1cIl9oYW5kbGVQYWdpbmF0b3JDbGljaygnYmVmb3JlJylcIlxuICAgICAobW91c2Vkb3duKT1cIl9oYW5kbGVQYWdpbmF0b3JQcmVzcygnYmVmb3JlJylcIlxuICAgICAodG91Y2hlbmQpPVwiX3N0b3BJbnRlcnZhbCgpXCI+XG4gIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvblwiPjwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtZWxlbWVudC1jb250YWluZXJcIiAjc2xpZGVMaXN0Q29udGFpbmVyXG4gICAgIChrZXlkb3duKT1cIl9oYW5kbGVLZXlkb3duKCRldmVudClcIj5cbiAgPGRpdiBjbGFzcz1cImphbS1zbGlkZS1saXN0XCIgI3NsaWRlTGlzdCByb2xlPVwic2xpZGVsaXN0XCIgKGNka09ic2VydmVDb250ZW50KT1cIl9vbkNvbnRlbnRDaGFuZ2VzKClcIj5cbiAgICA8ZGl2IGNsYXNzPVwiamFtLXNsaWRlLWVsZW1lbnRzXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPCEtLSA8bWF0LWluay1iYXI+PC9tYXQtaW5rLWJhcj4gLS0+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24gamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWFmdGVyIG1hdC1lbGV2YXRpb24tejRcIlxuICAgICAjbmV4dFBhZ2luYXRvclxuICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICBtYXQtcmlwcGxlIFttYXRSaXBwbGVEaXNhYmxlZF09XCJfZGlzYWJsZVNjcm9sbEFmdGVyIHx8IGRpc2FibGVSaXBwbGVcIlxuICAgICBbY2xhc3MuamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWRpc2FibGVkXT1cIl9kaXNhYmxlU2Nyb2xsQWZ0ZXJcIlxuICAgICAobW91c2Vkb3duKT1cIl9oYW5kbGVQYWdpbmF0b3JQcmVzcygnYWZ0ZXInKVwiXG4gICAgIChjbGljayk9XCJfaGFuZGxlUGFnaW5hdG9yQ2xpY2soJ2FmdGVyJylcIlxuICAgICAodG91Y2hlbmQpPVwiX3N0b3BJbnRlcnZhbCgpXCI+XG4gIDxkaXYgY2xhc3M9XCJqYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvblwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgQC13ZWJraXQta2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0ey8qISovfUAtd2Via2l0LWtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR7LyohKi99Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZXtmb250LXNpemU6MjBweH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9QG1lZGlhIHByaW50ey5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIyZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjJlbSkgc2NhbGUoLjc1KX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjFlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyMWVtKSBzY2FsZSguNzUpfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTJlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyZW0pIHNjYWxlKC43NSl9fS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjI1ZW0gMCAuNzVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4wOTM3NWVtO21hcmdpbi10b3A6LS41ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOjFlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLXN1Yi1sYWJlbC1lcnJvcntmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLWVycm9ye2ZvbnQtc2l6ZToxNHB4fS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OHB4O3BhZGRpbmctYm90dG9tOjhweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTZweH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QtYmFzZSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTJweH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1uZXN0ZWQtdHJlZS1ub2RlLC5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmV9Lm1hdC1yaXBwbGUubWF0LXJpcHBsZS11bmJvdW5kZWR7b3ZlcmZsb3c6dmlzaWJsZX0ubWF0LXJpcHBsZS1lbGVtZW50e3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlci1yYWRpdXM6NTAlO3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9QG1lZGlhICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5tYXQtcmlwcGxlLWVsZW1lbnR7ZGlzcGxheTpub25lfX0uY2RrLXZpc3VhbGx5LWhpZGRlbntib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyLC5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY2RrLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktY29udGFpbmVyOmVtcHR5e2Rpc3BsYXk6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMzIpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWJveC1kaXJlY3Rpb246bm9ybWFsO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttaW4td2lkdGg6MXB4O21pbi1oZWlnaHQ6MXB4fS5jZGstZ2xvYmFsLXNjcm9sbGJsb2Nre3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7b3ZlcmZsb3cteTpzY3JvbGx9QGtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydHsvKiEqL31Aa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZHsvKiEqL30uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5qYW0tc2xpZGUtaGVhZGVye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4O292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZTtmbGV4LXNocmluazowfS5qYW0tc2xpZGUtZWxlbWVudHtoZWlnaHQ6YXV0bztwYWRkaW5nOjAgMTZweDtjdXJzb3I6cG9pbnRlcjtib3gtc2l6aW5nOmJvcmRlci1ib3g7b3BhY2l0eTouNjttaW4td2lkdGg6MTYwcHg7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTotd2Via2l0LWlubGluZS1ib3g7ZGlzcGxheTppbmxpbmUtZmxleDstd2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7d2hpdGUtc3BhY2U6bm93cmFwO3Bvc2l0aW9uOnJlbGF0aXZlfS5qYW0tc2xpZGUtZWxlbWVudDpmb2N1c3tvdXRsaW5lOjB9LmphbS1zbGlkZS1lbGVtZW50OmZvY3VzOm5vdCguamFtLXNsaWRlLWRpc2FibGVkKXtvcGFjaXR5OjF9LmphbS1zbGlkZS1lbGVtZW50LmphbS1zbGlkZS1kaXNhYmxlZHtjdXJzb3I6ZGVmYXVsdH0uamFtLXNsaWRlLWVsZW1lbnQgLmphbS1zbGlkZS1lbGVtZW50LWNvbnRlbnR7ZGlzcGxheTotd2Via2l0LWlubGluZS1ib3g7ZGlzcGxheTppbmxpbmUtZmxleDstd2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7d2hpdGUtc3BhY2U6bm93cmFwfUBtZWRpYSAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsuamFtLXNsaWRlLWVsZW1lbnQ6Zm9jdXN7b3V0bGluZTpkb3R0ZWQgMnB4fS5qYW0tc2xpZGUtZWxlbWVudC5qYW0tc2xpZGUtZGlzYWJsZWR7b3BhY2l0eTouNX0uamFtLXNsaWRlLWVsZW1lbnR7b3BhY2l0eToxfX1AbWVkaWEgKG1heC13aWR0aDo1OTlweCl7LmphbS1zbGlkZS1lbGVtZW50e21pbi13aWR0aDo3MnB4fX0uamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5Om5vbmU7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO21pbi13aWR0aDozMnB4O2N1cnNvcjpwb2ludGVyO3otaW5kZXg6Mjstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7dG91Y2gtYWN0aW9uOm5vbmV9LmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1jb250cm9scy1lbmFibGVkIC5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb257ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXh9LmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1iZWZvcmUsLmphbS1zbGlkZS1oZWFkZXItcnRsIC5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYWZ0ZXJ7cGFkZGluZy1sZWZ0OjRweH0uamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWJlZm9yZSAuamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLmphbS1zbGlkZS1oZWFkZXItcnRsIC5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYWZ0ZXIgLmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtMTM1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpfS5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYWZ0ZXIsLmphbS1zbGlkZS1oZWFkZXItcnRsIC5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYmVmb3Jle3BhZGRpbmctcmlnaHQ6NHB4fS5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tYWZ0ZXIgLmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uLC5qYW0tc2xpZGUtaGVhZGVyLXJ0bCAuamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWJlZm9yZSAuamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb257LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX0uamFtLXNsaWRlLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb257Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoycHggMnB4IDAgMDtjb250ZW50OicnO2hlaWdodDo4cHg7d2lkdGg6OHB4fS5qYW0tc2xpZGUtaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWR7Ym94LXNoYWRvdzpub25lO2N1cnNvcjpkZWZhdWx0fS5qYW0tc2xpZGUtZWxlbWVudC1jb250YWluZXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtZmxleDoxO2ZsZXgtZ3JvdzoxO292ZXJmbG93OmhpZGRlbjt6LWluZGV4OjF9LmphbS1zbGlkZS1saXN0ey13ZWJraXQtYm94LWZsZXg6MTtmbGV4LWdyb3c6MTtwb3NpdGlvbjpyZWxhdGl2ZTstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjVzIGN1YmljLWJlemllciguMzUsMCwuMjUsMSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjVzIGN1YmljLWJlemllciguMzUsMCwuMjUsMSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjVzIGN1YmljLWJlemllciguMzUsMCwuMjUsMSksLXdlYmtpdC10cmFuc2Zvcm0gLjVzIGN1YmljLWJlemllciguMzUsMCwuMjUsMSl9LmphbS1zbGlkZS1lbGVtZW50c3tkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleH1bbWF0LWFsaWduLXNsaWRlcz1jZW50ZXJdIC5qYW0tc2xpZGUtZWxlbWVudHN7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn1bbWF0LWFsaWduLXNsaWRlcz1lbmRdIC5qYW0tc2xpZGUtZWxlbWVudHN7LXdlYmtpdC1ib3gtcGFjazplbmQ7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfWBdLFxuICBpbnB1dHM6IFsnZGlzYWJsZVJpcHBsZSddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdqYW0tc2xpZGUtaGVhZGVyJyxcbiAgICAnW2NsYXNzLmphbS1zbGlkZS1oZWFkZXItcGFnaW5hdGlvbi1jb250cm9scy1lbmFibGVkXSc6ICdfc2hvd1BhZ2luYXRpb25Db250cm9scycsXG4gICAgJ1tjbGFzcy5qYW0tc2xpZGUtaGVhZGVyLXJ0bF0nOiBgX2dldExheW91dERpcmVjdGlvbigpID09ICdydGwnYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIEphbVNsaWRlSGVhZGVyIGV4dGVuZHMgX0phbVNsaWRlSGVhZGVyTWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENhbkRpc2FibGVSaXBwbGUge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oSmFtU2xpZGVFbGVtZW50V3JhcHBlcikgcHVibGljIF9lbGVtZW50V3JhcHBlcnM6IFF1ZXJ5TGlzdDxKYW1TbGlkZUVsZW1lbnRXcmFwcGVyPjtcbiAgLy8gQFZpZXdDaGlsZChNYXRJbmtCYXIpIF9pbmtCYXI6IE1hdElua0JhcjtcbiAgQFZpZXdDaGlsZCgnc2xpZGVMaXN0Q29udGFpbmVyJykgcHVibGljIF9zbGlkZUxpc3RDb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NsaWRlTGlzdCcpIHB1YmxpYyBfc2xpZGVMaXN0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCduZXh0UGFnaW5hdG9yJykgcHVibGljIF9uZXh0UGFnaW5hdG9yOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgncHJldmlvdXNQYWdpbmF0b3InKSBwdWJsaWMgX3ByZXZpb3VzUGFnaW5hdG9yOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWQuICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0Rm9jdXNlZEluZGV4OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gYSBlbGVtZW50IGlzIGZvY3VzZWQuICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVhZG9ubHkgaW5kZXhGb2N1c2VkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb250cm9scyBmb3IgcGFnaW5hdGlvbiBzaG91bGQgYmUgZGlzcGxheWVkICovXG4gIHB1YmxpYyBfc2hvd1BhZ2luYXRpb25Db250cm9scyA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzbGlkZSBsaXN0IGNhbiBiZSBzY3JvbGxlZCBtb3JlIHRvd2FyZHMgdGhlIGVuZCBvZiB0aGUgc2xpZGUgZWxlbWVudCBsaXN0LiAqL1xuICBwdWJsaWMgX2Rpc2FibGVTY3JvbGxBZnRlciA9IHRydWU7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNsaWRlIGxpc3QgY2FuIGJlIHNjcm9sbGVkIG1vcmUgdG93YXJkcyB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzbGlkZSBlbGVtZW50IGxpc3QuICovXG4gIHB1YmxpYyBfZGlzYWJsZVNjcm9sbEJlZm9yZSA9IHRydWU7XG5cbiAgLyoqIFRoZSBkaXN0YW5jZSBpbiBwaXhlbHMgdGhhdCB0aGUgc2xpZGUgbGFiZWxzIHNob3VsZCBiZSB0cmFuc2xhdGVkIHRvIHRoZSBsZWZ0LiAqL1xuICBwcml2YXRlIF9zY3JvbGxEaXN0YW5jZSA9IDA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGhlYWRlciBzaG91bGQgc2Nyb2xsIHRvIHRoZSBzZWxlY3RlZCBpbmRleCBhZnRlciB0aGUgdmlldyBoYXMgYmVlbiBjaGVja2VkLiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZEluZGV4Q2hhbmdlZCA9IGZhbHNlO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHNsaWRlIGxhYmVscyB0aGF0IGFyZSBkaXNwbGF5ZWQgb24gdGhlIGhlYWRlci4gV2hlbiB0aGlzIGNoYW5nZXMsIHRoZSBoZWFkZXJcbiAgICogc2hvdWxkIHJlLWV2YWx1YXRlIHRoZSBzY3JvbGwgcG9zaXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9zbGlkZUVsZW1lbnRDb3VudDogbnVtYmVyO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzY3JvbGwgZGlzdGFuY2UgaGFzIGNoYW5nZWQgYW5kIHNob3VsZCBiZSBhcHBsaWVkIGFmdGVyIHRoZSB2aWV3IGlzIGNoZWNrZWQuICovXG4gIHByaXZhdGUgX3Njcm9sbERpc3RhbmNlQ2hhbmdlZDogYm9vbGVhbjtcblxuICAvKiogVXNlZCB0byBtYW5hZ2UgZm9jdXMgYmV0d2VlbiB0aGUgc2xpZGVzLiAqL1xuICBwcml2YXRlIF9rZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8SmFtU2xpZGVFbGVtZW50V3JhcHBlcj47XG5cbiAgLyoqIENhY2hlZCB0ZXh0IGNvbnRlbnQgb2YgdGhlIGhlYWRlci4gKi9cbiAgcHJpdmF0ZSBfY3VycmVudFRleHRDb250ZW50OiBzdHJpbmc7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IHdpbGwgc3RvcCB0aGUgYXV0b21hdGVkIHNjcm9sbGluZy4gKi9cbiAgcHJpdmF0ZSBfc3RvcFNjcm9sbGluZyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHNsaWRlLiAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7IH1cbiAgcHVibGljIHNldCBzZWxlY3RlZEluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4Q2hhbmdlZCA9IHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IHZhbHVlO1xuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLl9rZXlNYW5hZ2VyKSB7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0odmFsdWUpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgIC8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjAgYF9uZ1pvbmVgIGFuZCBgX3BsYXRmb3Jtc2AgcGFyYW1ldGVycyB0byBiZSBtYWRlIHJlcXVpcmVkLlxuICAgICAgcHJpdmF0ZSBfbmdab25lPzogTmdab25lLFxuICAgICAgcHJpdmF0ZSBfcGxhdGZvcm0/OiBQbGF0Zm9ybVxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3QgZWxlbWVudCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgYmluZEV2ZW50ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZWxlYXZlJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3N0b3BJbnRlcnZhbCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCByZW1vdmUgbnVsbCBjaGVjayBvbmNlIF9uZ1pvbmUgaXMgbWFkZSBpbnRvIGEgcmVxdWlyZWQgcGFyYW1ldGVyLlxuICAgIGlmIChfbmdab25lKSB7XG4gICAgICAvLyBCaW5kIHRoZSBgbW91c2VsZWF2ZWAgZXZlbnQgb24gdGhlIG91dHNpZGUgc2luY2UgaXQgZG9lc24ndCBjaGFuZ2UgYW55dGhpbmcgaW4gdGhlIHZpZXcuXG4gICAgICBfbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKGJpbmRFdmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJpbmRFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgLy8gSWYgdGhlIG51bWJlciBvZiBzbGlkZSBsYWJlbHMgaGF2ZSBjaGFuZ2VkLCBjaGVjayBpZiBzY3JvbGxpbmcgc2hvdWxkIGJlIGVuYWJsZWRcbiAgICBpZiAodGhpcy5fc2xpZGVFbGVtZW50Q291bnQgIT09IHRoaXMuX2VsZW1lbnRXcmFwcGVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgdGhpcy5fc2xpZGVFbGVtZW50Q291bnQgPSB0aGlzLl9lbGVtZW50V3JhcHBlcnMubGVuZ3RoO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHNlbGVjdGVkIGluZGV4IGhhcyBjaGFuZ2VkLCBzY3JvbGwgdG8gdGhlIGVsZW1lbnQgYW5kIGNoZWNrIGlmIHRoZSBzY3JvbGxpbmcgY29udHJvbHNcbiAgICAvLyBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXhDaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9zY3JvbGxUb0xhYmVsKHRoaXMuX3NlbGVjdGVkSW5kZXgpO1xuICAgICAgdGhpcy5fY2hlY2tTY3JvbGxpbmdDb250cm9scygpO1xuICAgICAgLy8gdGhpcy5fYWxpZ25JbmtCYXJUb1NlbGVjdGVkVGFiKCk7XG4gICAgICB0aGlzLl9zZWxlY3RlZEluZGV4Q2hhbmdlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHNjcm9sbCBkaXN0YW5jZSBoYXMgYmVlbiBjaGFuZ2VkIChzbGlkZSBzZWxlY3RlZCwgZm9jdXNlZCwgc2Nyb2xsIGNvbnRyb2xzIGFjdGl2YXRlZCksXG4gICAgLy8gdGhlbiB0cmFuc2xhdGUgdGhlIGhlYWRlciB0byByZWZsZWN0IHRoaXMuXG4gICAgaWYgKHRoaXMuX3Njcm9sbERpc3RhbmNlQ2hhbmdlZCkge1xuICAgICAgdGhpcy5fdXBkYXRlVGFiU2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgIHRoaXMuX3Njcm9sbERpc3RhbmNlQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIG9uIHRoZSBoZWFkZXIuICovXG4gIHB1YmxpYyBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgaGFuZGxlS2V5RG93bicsIGV2ZW50KTtcbiAgICBjb25zb2xlLmxvZygnaW5zaWRlIGhhbmRsZUtleURvd24nLCBldmVudCwgaGFzTW9kaWZpZXJLZXkoZXZlbnQpKTtcbiAgICAvLyBXZSBkb24ndCBoYW5kbGUgYW55IGtleSBiaW5kaW5ncyB3aXRoIGEgbW9kaWZpZXIga2V5LlxuICAgIGlmIChoYXNNb2RpZmllcktleShldmVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgIGNhc2UgJyAnOlxuICAgICAgICB0aGlzLnNlbGVjdEZvY3VzZWRJbmRleC5lbWl0KHRoaXMuZm9jdXNJbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxpZ25zIHRoZSBpbmsgYmFyIHRvIHRoZSBzZWxlY3RlZCBzbGlkZSBvbiBsb2FkLlxuICAgKi9cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBjb25zdCBkaXJDaGFuZ2UgPSB0aGlzLl9kaXIgPyB0aGlzLl9kaXIuY2hhbmdlIDogb2JzZXJ2YWJsZU9mKG51bGwpO1xuICAgIGNvbnN0IHJlc2l6ZSA9IHRoaXMuX3ZpZXdwb3J0UnVsZXIuY2hhbmdlKDE1MCk7XG4gICAgY29uc3QgcmVhbGlnbiA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgLy8gdGhpcy5fYWxpZ25JbmtCYXJUb1NlbGVjdGVkVGFiKCk7XG4gICAgfTtcblxuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyKHRoaXMuX2VsZW1lbnRXcmFwcGVycylcbiAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuX2dldExheW91dERpcmVjdGlvbigpKVxuICAgICAgLndpdGhXcmFwKCk7XG5cbiAgICB0aGlzLl9rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oMCk7XG5cbiAgICAvLyBEZWZlciB0aGUgZmlyc3QgY2FsbCBpbiBvcmRlciB0byBhbGxvdyBmb3Igc2xvd2VyIGJyb3dzZXJzIHRvIGxheSBvdXQgdGhlIGVsZW1lbnRzLlxuICAgIC8vIFRoaXMgaGVscHMgaW4gY2FzZXMgd2hlcmUgdGhlIHVzZXIgbGFuZHMgZGlyZWN0bHkgb24gYSBwYWdlIHdpdGggcGFnaW5hdGVkIHNsaWRlcy5cbiAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlYWxpZ24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlYWxpZ24oKTtcbiAgICB9XG5cbiAgICAvLyBPbiBkaXIgY2hhbmdlIG9yIHdpbmRvdyByZXNpemUsIHJlYWxpZ24gdGhlIGluayBiYXIgYW5kIHVwZGF0ZSB0aGUgb3JpZW50YXRpb24gb2ZcbiAgICAvLyB0aGUga2V5IG1hbmFnZXIgaWYgdGhlIGRpcmVjdGlvbiBoYXMgY2hhbmdlZC5cbiAgICBtZXJnZShkaXJDaGFuZ2UsIHJlc2l6ZSkucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHJlYWxpZ24oKTtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbih0aGlzLl9nZXRMYXlvdXREaXJlY3Rpb24oKSk7XG4gICAgfSk7XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIGNoYW5nZSBpbiB0aGUgZm9jdXMga2V5IG1hbmFnZXIgd2UgbmVlZCB0byBlbWl0IHRoZSBgaW5kZXhGb2N1c2VkYFxuICAgIC8vIGV2ZW50IGluIG9yZGVyIHRvIHByb3ZpZGUgYSBwdWJsaWMgZXZlbnQgdGhhdCBub3RpZmllcyBhYm91dCBmb2N1cyBjaGFuZ2VzLiBBbHNvIHdlIHJlYWxpZ25cbiAgICAvLyB0aGUgc2xpZGVzIGNvbnRhaW5lciBieSBzY3JvbGxpbmcgdGhlIG5ldyBmb2N1c2VkIHNsaWRlIGludG8gdGhlIHZpc2libGUgc2VjdGlvbi5cbiAgICB0aGlzLl9rZXlNYW5hZ2VyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUobmV3Rm9jdXNJbmRleCA9PiB7XG4gICAgICB0aGlzLmluZGV4Rm9jdXNlZC5lbWl0KG5ld0ZvY3VzSW5kZXgpO1xuICAgICAgdGhpcy5fc2V0VGFiRm9jdXMobmV3Rm9jdXNJbmRleCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIFdlIG5lZWQgdG8gaGFuZGxlIHRoZXNlIGV2ZW50cyBtYW51YWxseSwgYmVjYXVzZSB3ZSB3YW50IHRvIGJpbmQgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMuXG4gICAgZnJvbUV2ZW50KHRoaXMuX3ByZXZpb3VzUGFnaW5hdG9yLm5hdGl2ZUVsZW1lbnQsICd0b3VjaHN0YXJ0JywgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlUGFnaW5hdG9yUHJlc3MoJ2JlZm9yZScpO1xuICAgICAgfSk7XG5cbiAgICBmcm9tRXZlbnQodGhpcy5fbmV4dFBhZ2luYXRvci5uYXRpdmVFbGVtZW50LCAndG91Y2hzdGFydCcsIHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVBhZ2luYXRvclByZXNzKCdhZnRlcicpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9zdG9wU2Nyb2xsaW5nLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIE11dGF0aW9uT2JzZXJ2ZXIgZGV0ZWN0cyB0aGF0IHRoZSBjb250ZW50IGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcHVibGljIF9vbkNvbnRlbnRDaGFuZ2VzKCkge1xuICAgIGNvbnN0IHRleHRDb250ZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuXG4gICAgLy8gV2UgbmVlZCB0byBkaWZmIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIGhlYWRlciwgYmVjYXVzZSB0aGUgTXV0YXRpb25PYnNlcnZlciBjYWxsYmFja1xuICAgIC8vIHdpbGwgZmlyZSBldmVuIGlmIHRoZSB0ZXh0IGNvbnRlbnQgZGlkbid0IGNoYW5nZSB3aGljaCBpcyBpbmVmZmljaWVudCBhbmQgaXMgcHJvbmVcbiAgICAvLyB0byBpbmZpbml0ZSBsb29wcyBpZiBhIHBvb3JseSBjb25zdHJ1Y3RlZCBleHByZXNzaW9uIGlzIHBhc3NlZCBpbiAoc2VlICMxNDI0OSkuXG4gICAgaWYgKHRleHRDb250ZW50ICE9PSB0aGlzLl9jdXJyZW50VGV4dENvbnRlbnQpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xuXG4gICAgICBjb25zdCB6b25lQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgICAvLyB0aGlzLl9hbGlnbklua0JhclRvU2VsZWN0ZWRUYWIoKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBUaGUgY29udGVudCBvYnNlcnZlciBydW5zIG91dHNpZGUgdGhlIGBOZ1pvbmVgIGJ5IGRlZmF1bHQsIHdoaWNoXG4gICAgICAvLyBtZWFucyB0aGF0IHdlIG5lZWQgdG8gYnJpbmcgdGhlIGNhbGxiYWNrIGJhY2sgaW4gb3Vyc2VsdmVzLlxuICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBSZW1vdmUgbnVsbCBjaGVjayBmb3IgYF9uZ1pvbmVgIG9uY2UgaXQncyBhIHJlcXVpcmVkIHBhcmFtZXRlci5cbiAgICAgIGlmICh0aGlzLl9uZ1pvbmUpIHtcbiAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKHpvbmVDYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHpvbmVDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdoZXRoZXIgcGFnaW5hdGlvbiBzaG91bGQgYmUgZW5hYmxlZCBvciBub3QuXG4gICAqXG4gICAqIFdBUk5JTkc6IENhbGxpbmcgdGhpcyBtZXRob2QgY2FuIGJlIHZlcnkgY29zdGx5IGluIHRlcm1zIG9mIHBlcmZvcm1hbmNlLiAgSXQgc2hvdWxkIGJlIGNhbGxlZFxuICAgKiBhcyBpbmZyZXF1ZW50bHkgYXMgcG9zc2libGUgZnJvbSBvdXRzaWRlIG9mIHRoZSBUYWJzIGNvbXBvbmVudCBhcyBpdCBjYXVzZXMgYSByZWZsb3cgb2YgdGhlXG4gICAqIHBhZ2UuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUGFnaW5hdGlvbigpIHtcbiAgICB0aGlzLl9jaGVja1BhZ2luYXRpb25FbmFibGVkKCk7XG4gICAgdGhpcy5fY2hlY2tTY3JvbGxpbmdDb250cm9scygpO1xuICAgIHRoaXMuX3VwZGF0ZVRhYlNjcm9sbFBvc2l0aW9uKCk7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gIC8qKiBUcmFja3Mgd2hpY2ggZWxlbWVudCBoYXMgZm9jdXM7IHVzZWQgZm9yIGtleWJvYXJkIG5hdmlnYXRpb24gKi9cbiAgcHVibGljIGdldCBmb2N1c0luZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2tleU1hbmFnZXIgPyB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCEgOiAwO1xuICB9XG5cbiAgLyoqIFdoZW4gdGhlIGZvY3VzIGluZGV4IGlzIHNldCwgd2UgbXVzdCBtYW51YWxseSBzZW5kIGZvY3VzIHRvIHRoZSBjb3JyZWN0IGVsZW1lbnQgKi9cbiAgcHVibGljIHNldCBmb2N1c0luZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuX2lzVmFsaWRJbmRleCh2YWx1ZSkgfHwgdGhpcy5mb2N1c0luZGV4ID09PSB2YWx1ZSB8fCAhdGhpcy5fa2V5TWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiBhbiBpbmRleCBpcyB2YWxpZC4gIElmIHRoZSBzbGlkZXMgYXJlIG5vdCByZWFkeSB5ZXQsIHdlIGFzc3VtZSB0aGF0IHRoZSB1c2VyIGlzXG4gICAqIHByb3ZpZGluZyBhIHZhbGlkIGluZGV4IGFuZCByZXR1cm4gdHJ1ZS5cbiAgICovXG4gIHB1YmxpYyBfaXNWYWxpZEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX2VsZW1lbnRXcmFwcGVycykgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgY29uc3Qgc2xpZGUgPSB0aGlzLl9lbGVtZW50V3JhcHBlcnMgPyB0aGlzLl9lbGVtZW50V3JhcHBlcnMudG9BcnJheSgpW2luZGV4XSA6IG51bGw7XG5cbiAgICByZXR1cm4gISFzbGlkZSAmJiAhc2xpZGUuZGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBmb2N1cyBvbiB0aGUgSFRNTCBlbGVtZW50IGZvciB0aGUgZWxlbWVudCB3cmFwcGVyIGFuZCBzY3JvbGxzIGl0IGludG8gdGhlIHZpZXcgaWZcbiAgICogc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAqL1xuICBwdWJsaWMgX3NldFRhYkZvY3VzKHNsaWRlSW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9zaG93UGFnaW5hdGlvbkNvbnRyb2xzKSB7XG4gICAgICB0aGlzLl9zY3JvbGxUb0xhYmVsKHNsaWRlSW5kZXgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9lbGVtZW50V3JhcHBlcnMgJiYgdGhpcy5fZWxlbWVudFdyYXBwZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZWxlbWVudFdyYXBwZXJzLnRvQXJyYXkoKVtzbGlkZUluZGV4XS5mb2N1cygpO1xuXG4gICAgICAvLyBEbyBub3QgbGV0IHRoZSBicm93c2VyIG1hbmFnZSBzY3JvbGxpbmcgdG8gZm9jdXMgdGhlIGVsZW1lbnQsIHRoaXMgd2lsbCBiZSBoYW5kbGVkXG4gICAgICAvLyBieSB1c2luZyB0cmFuc2xhdGlvbi4gSW4gTFRSLCB0aGUgc2Nyb2xsIGxlZnQgc2hvdWxkIGJlIDAuIEluIFJUTCwgdGhlIHNjcm9sbCB3aWR0aFxuICAgICAgLy8gc2hvdWxkIGJlIHRoZSBmdWxsIHdpZHRoIG1pbnVzIHRoZSBvZmZzZXQgd2lkdGguXG4gICAgICBjb25zdCBjb250YWluZXJFbCA9IHRoaXMuX3NsaWRlTGlzdENvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgICAgY29uc3QgZGlyID0gdGhpcy5fZ2V0TGF5b3V0RGlyZWN0aW9uKCk7XG5cbiAgICAgIGlmIChkaXIgPT09ICdsdHInKSB7XG4gICAgICAgIGNvbnRhaW5lckVsLnNjcm9sbExlZnQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyRWwuc2Nyb2xsTGVmdCA9IGNvbnRhaW5lckVsLnNjcm9sbFdpZHRoIC0gY29udGFpbmVyRWwub2Zmc2V0V2lkdGg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBsYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgcHVibGljIF9nZXRMYXlvdXREaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcgPyAncnRsJyA6ICdsdHInO1xuICB9XG5cbiAgLyoqIFBlcmZvcm1zIHRoZSBDU1MgdHJhbnNmb3JtYXRpb24gb24gdGhlIHNsaWRlIGxpc3QgdGhhdCB3aWxsIGNhdXNlIHRoZSBsaXN0IHRvIHNjcm9sbC4gKi9cbiAgcHVibGljIF91cGRhdGVUYWJTY3JvbGxQb3NpdGlvbigpIHtcbiAgICBjb25zdCBzY3JvbGxEaXN0YW5jZSA9IHRoaXMuc2Nyb2xsRGlzdGFuY2U7XG4gICAgY29uc3QgcGxhdGZvcm0gPSB0aGlzLl9wbGF0Zm9ybTtcbiAgICBjb25zdCB0cmFuc2xhdGVYID0gdGhpcy5fZ2V0TGF5b3V0RGlyZWN0aW9uKCkgPT09ICdsdHInID8gLXNjcm9sbERpc3RhbmNlIDogc2Nyb2xsRGlzdGFuY2U7XG5cbiAgICAvLyBEb24ndCB1c2UgYHRyYW5zbGF0ZTNkYCBoZXJlIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBjcmVhdGUgYSBuZXcgbGF5ZXIuIEEgbmV3IGxheWVyXG4gICAgLy8gc2VlbXMgdG8gY2F1c2UgZmxpY2tlcmluZyBhbmQgb3ZlcmZsb3cgaW4gSW50ZXJuZXQgRXhwbG9yZXIuIEZvciBleGFtcGxlLCB0aGUgaW5rIGJhclxuICAgIC8vIGFuZCByaXBwbGVzIHdpbGwgZXhjZWVkIHRoZSBib3VuZGFyaWVzIG9mIHRoZSB2aXNpYmxlIHNsaWRlIGJhci5cbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvMTAyNzZcbiAgICAvLyBXZSByb3VuZCB0aGUgYHRyYW5zZm9ybWAgaGVyZSwgYmVjYXVzZSB0cmFuc2Zvcm1zIHdpdGggc3ViLXBpeGVsIHByZWNpc2lvbiBjYXVzZSBzb21lXG4gICAgLy8gYnJvd3NlcnMgdG8gYmx1ciB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudC5cbiAgICB0aGlzLl9zbGlkZUxpc3QubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke01hdGgucm91bmQodHJhbnNsYXRlWCl9cHgpYDtcblxuICAgIC8vIFNldHRpbmcgdGhlIGB0cmFuc2Zvcm1gIG9uIElFIHdpbGwgY2hhbmdlIHRoZSBzY3JvbGwgb2Zmc2V0IG9mIHRoZSBwYXJlbnQsIGNhdXNpbmcgdGhlXG4gICAgLy8gcG9zaXRpb24gdG8gYmUgdGhyb3duIG9mZiBpbiBzb21lIGNhc2VzLiBXZSBoYXZlIHRvIHJlc2V0IGl0IG91cnNlbHZlcyB0byBlbnN1cmUgdGhhdFxuICAgIC8vIGl0IGRvZXNuJ3QgZ2V0IHRocm93biBvZmYuIE5vdGUgdGhhdCB3ZSBzY29wZSBpdCBvbmx5IHRvIElFIGFuZCBFZGdlLCBiZWNhdXNlIG1lc3NpbmdcbiAgICAvLyB3aXRoIHRoZSBzY3JvbGwgcG9zaXRpb24gdGhyb3dzIG9mZiBDaHJvbWUgNzErIGluIFJUTCBtb2RlIChzZWUgIzE0Njg5KS5cbiAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIFJlbW92ZSBudWxsIGNoZWNrIGZvciBgcGxhdGZvcm1gLlxuICAgIGlmIChwbGF0Zm9ybSAmJiAocGxhdGZvcm0uVFJJREVOVCB8fCBwbGF0Zm9ybS5FREdFKSkge1xuICAgICAgdGhpcy5fc2xpZGVMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHMgdGhlIGRpc3RhbmNlIGluIHBpeGVscyB0aGF0IHRoZSBzbGlkZSBoZWFkZXIgc2hvdWxkIGJlIHRyYW5zZm9ybWVkIGluIHRoZSBYLWF4aXMuICovXG4gIHB1YmxpYyBnZXQgc2Nyb2xsRGlzdGFuY2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3Njcm9sbERpc3RhbmNlOyB9XG4gIHB1YmxpYyBzZXQgc2Nyb2xsRGlzdGFuY2UodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3Njcm9sbFRvKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgc2xpZGUgbGlzdCBpbiB0aGUgJ2JlZm9yZScgb3IgJ2FmdGVyJyBkaXJlY3Rpb24gKHRvd2FyZHMgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdCBvclxuICAgKiB0aGUgZW5kIG9mIHRoZSBsaXN0LCByZXNwZWN0aXZlbHkpLiBUaGUgZGlzdGFuY2UgdG8gc2Nyb2xsIGlzIGNvbXB1dGVkIHRvIGJlIGEgdGhpcmQgb2YgdGhlXG4gICAqIGxlbmd0aCBvZiB0aGUgc2xpZGUgbGlzdCB2aWV3IHdpbmRvdy5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICovXG4gIHB1YmxpYyBfc2Nyb2xsSGVhZGVyKGRpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uKSB7XG4gICAgY29uc3Qgdmlld0xlbmd0aCA9IHRoaXMuX3NsaWRlTGlzdENvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgLy8gTW92ZSB0aGUgc2Nyb2xsIGRpc3RhbmNlIG9uZS10aGlyZCB0aGUgbGVuZ3RoIG9mIHRoZSBzbGlkZSBsaXN0J3Mgdmlld3BvcnQuXG4gICAgY29uc3Qgc2Nyb2xsQW1vdW50ID0gKGRpcmVjdGlvbiA9PT0gJ2JlZm9yZScgPyAtMSA6IDEpICogdmlld0xlbmd0aCAvIDM7XG5cbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsVG8odGhpcy5fc2Nyb2xsRGlzdGFuY2UgKyBzY3JvbGxBbW91bnQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG9uIHRoZSBwYWdpbmF0aW9uIGFycm93cy4gKi9cbiAgcHVibGljIF9oYW5kbGVQYWdpbmF0b3JDbGljayhkaXJlY3Rpb246IFNjcm9sbERpcmVjdGlvbikge1xuICAgIHRoaXMuX3N0b3BJbnRlcnZhbCgpO1xuICAgIHRoaXMuX3Njcm9sbEhlYWRlcihkaXJlY3Rpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRoZSBzbGlkZSBsaXN0IHN1Y2ggdGhhdCB0aGUgZGVzaXJlZCBzbGlkZSBlbGVtZW50IChtYXJrZWQgYnkgaW5kZXgpIGlzIG1vdmVkIGludG8gdmlldy5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICovXG4gIHB1YmxpYyBfc2Nyb2xsVG9MYWJlbChsYWJlbEluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zb2xlLmxvZygnaW5zaWRlIF9zY3JvbGxUb0xhYmVsJyk7XG4gICAgY29uc3Qgc2VsZWN0ZWRMYWJlbCA9IHRoaXMuX2VsZW1lbnRXcmFwcGVycyA/IHRoaXMuX2VsZW1lbnRXcmFwcGVycy50b0FycmF5KClbbGFiZWxJbmRleF0gOiBudWxsO1xuXG4gICAgaWYgKCFzZWxlY3RlZExhYmVsKSB7IHJldHVybjsgfVxuXG4gICAgLy8gVGhlIHZpZXcgbGVuZ3RoIGlzIHRoZSB2aXNpYmxlIHdpZHRoIG9mIHRoZSBzbGlkZSBsYWJlbHMuXG4gICAgY29uc3Qgdmlld0xlbmd0aCA9IHRoaXMuX3NsaWRlTGlzdENvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgbGV0IGxhYmVsQmVmb3JlUG9zOiBudW1iZXI7XG4gICAgbGV0IGxhYmVsQWZ0ZXJQb3M6IG51bWJlcjtcbiAgICBpZiAodGhpcy5fZ2V0TGF5b3V0RGlyZWN0aW9uKCkgPT09ICdsdHInKSB7XG4gICAgICBsYWJlbEJlZm9yZVBvcyA9IHNlbGVjdGVkTGFiZWwuZ2V0T2Zmc2V0TGVmdCgpO1xuICAgICAgbGFiZWxBZnRlclBvcyA9IGxhYmVsQmVmb3JlUG9zICsgc2VsZWN0ZWRMYWJlbC5nZXRPZmZzZXRXaWR0aCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYWJlbEFmdGVyUG9zID0gdGhpcy5fc2xpZGVMaXN0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLSBzZWxlY3RlZExhYmVsLmdldE9mZnNldExlZnQoKTtcbiAgICAgIGxhYmVsQmVmb3JlUG9zID0gbGFiZWxBZnRlclBvcyAtIHNlbGVjdGVkTGFiZWwuZ2V0T2Zmc2V0V2lkdGgoKTtcbiAgICB9XG5cbiAgICBjb25zdCBiZWZvcmVWaXNpYmxlUG9zID0gdGhpcy5zY3JvbGxEaXN0YW5jZTtcbiAgICBjb25zdCBhZnRlclZpc2libGVQb3MgPSB0aGlzLnNjcm9sbERpc3RhbmNlICsgdmlld0xlbmd0aDtcblxuICAgIGlmIChsYWJlbEJlZm9yZVBvcyA8IGJlZm9yZVZpc2libGVQb3MpIHtcbiAgICAgIC8vIFNjcm9sbCBoZWFkZXIgdG8gbW92ZSBlbGVtZW50IHRvIHRoZSBiZWZvcmUgZGlyZWN0aW9uXG4gICAgICB0aGlzLnNjcm9sbERpc3RhbmNlIC09IGJlZm9yZVZpc2libGVQb3MgLSBsYWJlbEJlZm9yZVBvcyArIEVYQUdHRVJBVEVEX09WRVJTQ1JPTEw7XG4gICAgfSBlbHNlIGlmIChsYWJlbEFmdGVyUG9zID4gYWZ0ZXJWaXNpYmxlUG9zKSB7XG4gICAgICAvLyBTY3JvbGwgaGVhZGVyIHRvIG1vdmUgZWxlbWVudCB0byB0aGUgYWZ0ZXIgZGlyZWN0aW9uXG4gICAgICB0aGlzLnNjcm9sbERpc3RhbmNlICs9IGxhYmVsQWZ0ZXJQb3MgLSBhZnRlclZpc2libGVQb3MgKyBFWEFHR0VSQVRFRF9PVkVSU0NST0xMO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSB3aGV0aGVyIHRoZSBwYWdpbmF0aW9uIGNvbnRyb2xzIHNob3VsZCBiZSBkaXNwbGF5ZWQuIElmIHRoZSBzY3JvbGwgd2lkdGggb2YgdGhlXG4gICAqIHNsaWRlIGxpc3QgaXMgd2lkZXIgdGhhbiB0aGUgc2l6ZSBvZiB0aGUgaGVhZGVyIGNvbnRhaW5lciwgdGhlbiB0aGUgcGFnaW5hdGlvbiBjb250cm9scyBzaG91bGRcbiAgICogYmUgc2hvd24uXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gZXhwZW5zaXZlIGNhbGwgdGhhdCBmb3JjZXMgYSBsYXlvdXQgcmVmbG93IHRvIGNvbXB1dGUgYm94IGFuZCBzY3JvbGwgbWV0cmljcyBhbmRcbiAgICogc2hvdWxkIGJlIGNhbGxlZCBzcGFyaW5nbHkuXG4gICAqL1xuICBwdWJsaWMgX2NoZWNrUGFnaW5hdGlvbkVuYWJsZWQoKSB7XG4gICAgY29uc3QgaXNFbmFibGVkID1cbiAgICAgICAgdGhpcy5fc2xpZGVMaXN0Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgdGhpcy5zY3JvbGxEaXN0YW5jZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKGlzRW5hYmxlZCAhPT0gdGhpcy5fc2hvd1BhZ2luYXRpb25Db250cm9scykge1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2hvd1BhZ2luYXRpb25Db250cm9scyA9IGlzRW5hYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSB3aGV0aGVyIHRoZSBiZWZvcmUgYW5kIGFmdGVyIGNvbnRyb2xzIHNob3VsZCBiZSBlbmFibGVkIG9yIGRpc2FibGVkLlxuICAgKiBJZiB0aGUgaGVhZGVyIGlzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3QgKHNjcm9sbCBkaXN0YW5jZSBpcyBlcXVhbCB0byAwKSB0aGVuIGRpc2FibGUgdGhlXG4gICAqIGJlZm9yZSBidXR0b24uIElmIHRoZSBoZWFkZXIgaXMgYXQgdGhlIGVuZCBvZiB0aGUgbGlzdCAoc2Nyb2xsIGRpc3RhbmNlIGlzIGVxdWFsIHRvIHRoZVxuICAgKiBtYXhpbXVtIGRpc3RhbmNlIHdlIGNhbiBzY3JvbGwpLCB0aGVuIGRpc2FibGUgdGhlIGFmdGVyIGJ1dHRvbi5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICovXG4gIHB1YmxpYyBfY2hlY2tTY3JvbGxpbmdDb250cm9scygpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgcGFnaW5hdGlvbiBhcnJvd3Mgc2hvdWxkIGJlIGFjdGl2YXRlZC5cbiAgICB0aGlzLl9kaXNhYmxlU2Nyb2xsQmVmb3JlID0gdGhpcy5zY3JvbGxEaXN0YW5jZSA9PT0gMDtcbiAgICB0aGlzLl9kaXNhYmxlU2Nyb2xsQWZ0ZXIgPSB0aGlzLnNjcm9sbERpc3RhbmNlID09PSB0aGlzLl9nZXRNYXhTY3JvbGxEaXN0YW5jZSgpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hhdCBpcyB0aGUgbWF4aW11bSBsZW5ndGggaW4gcGl4ZWxzIHRoYXQgY2FuIGJlIHNldCBmb3IgdGhlIHNjcm9sbCBkaXN0YW5jZS4gVGhpc1xuICAgKiBpcyBlcXVhbCB0byB0aGUgZGlmZmVyZW5jZSBpbiB3aWR0aCBiZXR3ZWVuIHRoZSBzbGlkZSBsaXN0IGNvbnRhaW5lciBhbmQgc2xpZGUgaGVhZGVyIGNvbnRhaW5lci5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBleHBlbnNpdmUgY2FsbCB0aGF0IGZvcmNlcyBhIGxheW91dCByZWZsb3cgdG8gY29tcHV0ZSBib3ggYW5kIHNjcm9sbCBtZXRyaWNzIGFuZFxuICAgKiBzaG91bGQgYmUgY2FsbGVkIHNwYXJpbmdseS5cbiAgICovXG4gIHB1YmxpYyBfZ2V0TWF4U2Nyb2xsRGlzdGFuY2UoKTogbnVtYmVyIHtcbiAgICBjb25zdCBsZW5ndGhPZlRhYkxpc3QgPSB0aGlzLl9zbGlkZUxpc3QubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgICBjb25zdCB2aWV3TGVuZ3RoID0gdGhpcy5fc2xpZGVMaXN0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICByZXR1cm4gKGxlbmd0aE9mVGFiTGlzdCAtIHZpZXdMZW5ndGgpIHx8IDA7XG4gIH1cblxuICAvKiogVGVsbHMgdGhlIGluay1iYXIgdG8gYWxpZ24gaXRzZWxmIHRvIHRoZSBjdXJyZW50IGVsZW1lbnQgd3JhcHBlciAqL1xuICAvLyBfYWxpZ25JbmtCYXJUb1NlbGVjdGVkVGFiKCk6IHZvaWQge1xuICAvLyAgIGNvbnN0IHNlbGVjdGVkTGFiZWxXcmFwcGVyID0gdGhpcy5fZWxlbWVudFdyYXBwZXJzICYmIHRoaXMuX2VsZW1lbnRXcmFwcGVycy5sZW5ndGggP1xuICAvLyAgICAgICB0aGlzLl9lbGVtZW50V3JhcHBlcnMudG9BcnJheSgpW3RoaXMuc2VsZWN0ZWRJbmRleF0uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IDpcbiAgLy8gICAgICAgbnVsbDtcbiAgLy9cbiAgLy8gICB0aGlzLl9pbmtCYXIuYWxpZ25Ub0VsZW1lbnQoc2VsZWN0ZWRMYWJlbFdyYXBwZXIhKTtcbiAgLy8gfVxuXG4gIC8qKiBTdG9wcyB0aGUgY3VycmVudGx5LXJ1bm5pbmcgcGFnaW5hdG9yIGludGVydmFsLiAgKi9cbiAgcHVibGljIF9zdG9wSW50ZXJ2YWwoKSB7XG4gICAgdGhpcy5fc3RvcFNjcm9sbGluZy5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgdXNlciBwcmVzc2luZyBkb3duIG9uIG9uZSBvZiB0aGUgcGFnaW5hdG9ycy5cbiAgICogU3RhcnRzIHNjcm9sbGluZyB0aGUgaGVhZGVyIGFmdGVyIGEgY2VydGFpbiBhbW91bnQgb2YgdGltZS5cbiAgICogQHBhcmFtIGRpcmVjdGlvbiBJbiB3aGljaCBkaXJlY3Rpb24gdGhlIHBhZ2luYXRvciBzaG91bGQgYmUgc2Nyb2xsZWQuXG4gICAqL1xuICBwdWJsaWMgX2hhbmRsZVBhZ2luYXRvclByZXNzKGRpcmVjdGlvbjogU2Nyb2xsRGlyZWN0aW9uKSB7XG4gICAgLy8gQXZvaWQgb3ZlcmxhcHBpbmcgdGltZXJzLlxuICAgIHRoaXMuX3N0b3BJbnRlcnZhbCgpO1xuXG4gICAgLy8gU3RhcnQgYSB0aW1lciBhZnRlciB0aGUgZGVsYXkgYW5kIGtlZXAgZmlyaW5nIGJhc2VkIG9uIHRoZSBpbnRlcnZhbC5cbiAgICB0aW1lcihIRUFERVJfU0NST0xMX0RFTEFZLCBIRUFERVJfU0NST0xMX0lOVEVSVkFMKVxuICAgICAgLy8gS2VlcCB0aGUgdGltZXIgZ29pbmcgdW50aWwgc29tZXRoaW5nIHRlbGxzIGl0IHRvIHN0b3Agb3IgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gICAgICAucGlwZSh0YWtlVW50aWwobWVyZ2UodGhpcy5fc3RvcFNjcm9sbGluZywgdGhpcy5fZGVzdHJveWVkKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3Qge21heFNjcm9sbERpc3RhbmNlLCBkaXN0YW5jZX06IGFueSA9IHRoaXMuX3Njcm9sbEhlYWRlcihkaXJlY3Rpb24pO1xuXG4gICAgICAgIC8vIFN0b3AgdGhlIHRpbWVyIGlmIHdlJ3ZlIHJlYWNoZWQgdGhlIHN0YXJ0IG9yIHRoZSBlbmQuXG4gICAgICAgIGlmIChkaXN0YW5jZSA9PT0gMCB8fCBkaXN0YW5jZSA+PSBtYXhTY3JvbGxEaXN0YW5jZSkge1xuICAgICAgICAgIHRoaXMuX3N0b3BJbnRlcnZhbCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRoZSBoZWFkZXIgdG8gYSBnaXZlbiBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFBvc2l0aW9uIHRvIHdoaWNoIHRvIHNjcm9sbC5cbiAgICogQHJldHVybnMgSW5mb3JtYXRpb24gb24gdGhlIGN1cnJlbnQgc2Nyb2xsIGRpc3RhbmNlIGFuZCB0aGUgbWF4aW11bS5cbiAgICovXG4gIHByaXZhdGUgX3Njcm9sbFRvKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCBtYXhTY3JvbGxEaXN0YW5jZSA9IHRoaXMuX2dldE1heFNjcm9sbERpc3RhbmNlKCk7XG4gICAgdGhpcy5fc2Nyb2xsRGlzdGFuY2UgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhTY3JvbGxEaXN0YW5jZSwgcG9zaXRpb24pKTtcblxuICAgIC8vIE1hcmsgdGhhdCB0aGUgc2Nyb2xsIGRpc3RhbmNlIGhhcyBjaGFuZ2VkIHNvIHRoYXQgYWZ0ZXIgdGhlIHZpZXcgaXMgY2hlY2tlZCwgdGhlIENTU1xuICAgIC8vIHRyYW5zZm9ybWF0aW9uIGNhbiBtb3ZlIHRoZSBoZWFkZXIuXG4gICAgdGhpcy5fc2Nyb2xsRGlzdGFuY2VDaGFuZ2VkID0gdHJ1ZTtcbiAgICB0aGlzLl9jaGVja1Njcm9sbGluZ0NvbnRyb2xzKCk7XG5cbiAgICByZXR1cm4ge21heFNjcm9sbERpc3RhbmNlLCBkaXN0YW5jZTogdGhpcy5fc2Nyb2xsRGlzdGFuY2V9O1xuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgT2JzZXJ2ZXJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IEphbVNsaWRlIH0gZnJvbSAnLi9zbGlkZSc7XG5pbXBvcnQgeyBKYW1TbGlkZUdyb3VwIH0gZnJvbSAnLi9zbGlkZS1ncm91cCc7XG5pbXBvcnQgeyBKYW1TbGlkZUhlYWRlciB9IGZyb20gJy4vc2xpZGUtaGVhZGVyJztcbmltcG9ydCB7IEphbVNsaWRlRWxlbWVudCB9IGZyb20gJy4vc2xpZGUtZWxlbWVudCc7XG5pbXBvcnQgeyBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyIH0gZnJvbSAnLi9zbGlkZS1lbGVtZW50LXdyYXBwZXInO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBPYnNlcnZlcnNNb2R1bGUsXG4gICAgQTExeU1vZHVsZVxuICBdLFxuICAvLyBEb24ndCBleHBvcnQgYWxsIGNvbXBvbmVudHMgYmVjYXVzZSBzb21lIGFyZSBvbmx5IHRvIGJlIHVzZWQgaW50ZXJuYWxseS5cbiAgZXhwb3J0czogW1xuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBKYW1TbGlkZUdyb3VwLFxuICAgIEphbVNsaWRlRWxlbWVudCxcbiAgICBKYW1TbGlkZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBKYW1TbGlkZUdyb3VwLFxuICAgIEphbVNsaWRlRWxlbWVudCxcbiAgICBKYW1TbGlkZSxcbiAgICBKYW1TbGlkZUVsZW1lbnRXcmFwcGVyLFxuICAgIEphbVNsaWRlSGVhZGVyXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2xpZGVNb2R1bGUge31cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogQW5pbWF0aW9ucyB1c2VkIGJ5IHRoZSBNYXRlcmlhbCBzbGlkZXMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBqYW1TbGlkZXNBbmltYXRpb25zOiB7XG4gIHJlYWRvbmx5IHRyYW5zbGF0ZVRhYjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgLyoqIEFuaW1hdGlvbiB0cmFuc2xhdGVzIGEgc2xpZGUgYWxvbmcgdGhlIFggYXhpcy4gKi9cbiAgdHJhbnNsYXRlVGFiOiB0cmlnZ2VyKCd0cmFuc2xhdGVUYWInLCBbXG4gICAgLy8gTm90ZTogdHJhbnNpdGlvbnMgdG8gYG5vbmVgIGluc3RlYWQgb2YgMCwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIG1pZ2h0IGJsdXIgdGhlIGNvbnRlbnQuXG4gICAgc3RhdGUoJ2NlbnRlciwgdm9pZCwgbGVmdC1vcmlnaW4tY2VudGVyLCByaWdodC1vcmlnaW4tY2VudGVyJywgc3R5bGUoe3RyYW5zZm9ybTogJ25vbmUnfSkpLFxuXG4gICAgLy8gSWYgdGhlIHNsaWRlIGlzIGVpdGhlciBvbiB0aGUgbGVmdCBvciByaWdodCwgd2UgYWRkaXRpb25hbGx5IGFkZCBhIGBtaW4taGVpZ2h0YCBvZiAxcHhcbiAgICAvLyBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBoYXMgYSBoZWlnaHQgYmVmb3JlIGl0cyBzdGF0ZSBjaGFuZ2VzLiBUaGlzIGlzXG4gICAgLy8gbmVjZXNzYXJ5IGJlY2F1c2UgQ2hyb21lIGRvZXMgc2VlbSB0byBza2lwIHRoZSB0cmFuc2l0aW9uIGluIFJUTCBtb2RlIGlmIHRoZSBlbGVtZW50IGRvZXNcbiAgICAvLyBub3QgaGF2ZSBhIHN0YXRpYyBoZWlnaHQgYW5kIGlzIG5vdCByZW5kZXJlZC4gU2VlIHJlbGF0ZWQgaXNzdWU6ICM5NDY1XG4gICAgc3RhdGUoJ2xlZnQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJywgbWluSGVpZ2h0OiAnMXB4J30pKSxcbiAgICBzdGF0ZSgncmlnaHQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknLCBtaW5IZWlnaHQ6ICcxcHgnfSkpLFxuXG4gICAgdHJhbnNpdGlvbignKiA9PiBsZWZ0LCAqID0+IHJpZ2h0LCBsZWZ0ID0+IGNlbnRlciwgcmlnaHQgPT4gY2VudGVyJyxcbiAgICAgICAgYW5pbWF0ZSgne3thbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScpKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGxlZnQtb3JpZ2luLWNlbnRlcicsIFtcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCknfSksXG4gICAgICBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJylcbiAgICBdKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHJpZ2h0LW9yaWdpbi1jZW50ZXInLCBbXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknfSksXG4gICAgICBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJylcbiAgICBdKVxuICBdKVxufTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQaW5CdXR0b24ge1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgbGFiZWw6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tcGluLW9wdGlvbi1idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY2xhc3M9XCJwaW4tYnV0dG9uLXJvdW5kXCJcbiAgICBbbmdDbGFzc109XCJqYW1Db2xvciA9PT0gJ2RlZmF1bHQnID8gJ21hdC1oaW50JyA6IG51bGxcIlxuICAgIFtjb2xvcl09XCJqYW1Db2xvclwiXG4gICAgKGNsaWNrKT1cInNlbGVjdGVkLmVtaXQoc2VsZWN0ZWRfb3B0aW9uKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtYnV0dG9uXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+YWRkX2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxzcGFuPnt7IHNlbGVjdGVkX29wdGlvbj8ubGFiZWwgfX08L3NwYW4+XG5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IGNsYXNzPVwibWF0LWJ1dHRvblwiXG4gICAgICAgICAgICBbbWF0TWVudVRyaWdnZXJGb3JdPVwiamFtUGluT3B0aW9uQnV0dG9uXCJcbiAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19kcm9wX2Rvd248L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvYnV0dG9uPlxuXG48bWF0LW1lbnUgI2phbVBpbk9wdGlvbkJ1dHRvbj1cIm1hdE1lbnVcIj5cbiAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gY2xhc3M9XCJtb3VzZW92ZXJcIiAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnM7IGxldCBpdGVtID0gaW5kZXhcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0ZWQuZW1pdChidXR0b24pXCI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7IGJ1dHRvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaW4tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwic2VsZWN0ZWRfb3B0aW9uPy5pbmRleCAhPT0gaXRlbSA/ICdtb3VzZW92ZXItY2hpbGQgbWF0LWJ1dHRvbicgOiAnbWF0LWJ1dHRvbidcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicGlubmVkT3B0aW9uKCRldmVudCwgYnV0dG9uKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gc3ZnSWNvbj1cInBpbl9yc1wiIGNvbG9yPVwiYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgY29sb3I6IHNlbGVjdGVkX29wdGlvbi5pbmRleCAhPT0gaXRlbSA/ICcjMDAwMDAwQjMnIDogbnVsbCB9XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9idXR0b24+XG48L21hdC1tZW51PlxuYCxcbiAgICBzdHlsZXM6IFtgYnV0dG9uLnBpbi1idXR0b24tcm91bmR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xMDIpIWltcG9ydGFudDtwYWRkaW5nOjA7Ym9yZGVyLXJhZGl1czo1MHB4fS5waW4tY29udGFpbmVye3dpZHRoOjQwcHh9LnBpbi1jb250YWluZXIgYnV0dG9uIG1hdC1pY29ue21hcmdpbjowfS5tb3VzZW92ZXIgKiAubW91c2VvdmVyLWNoaWxke2Rpc3BsYXk6bm9uZX0ubW91c2VvdmVyOmhvdmVyICogLm1vdXNlb3Zlci1jaGlsZHtkaXNwbGF5OmluaGVyaXR9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uczogQXJyYXk8c3RyaW5nPjtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3BlY2lhbEtleTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBqYW1Db2xvcjogJ3ByaW1hcnknIHwgJ2FjY2VudCcgfCAnd2FybicgfCAnZGVmYXVsdCcgPSAnZGVmYXVsdCc7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxJUGluQnV0dG9uPigpO1xuXG4gICAgcHVibGljIGluZGV4OiBudW1iZXI7XG4gICAgcHVibGljIGJ1dHRvbnM6IEFycmF5PElQaW5CdXR0b24+ID0gW107XG4gICAgcHVibGljIHNlbGVjdGVkX29wdGlvbjogSVBpbkJ1dHRvbjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtYXRJY29uUmVnaXN0cnk6IE1hdEljb25SZWdpc3RyeSxcbiAgICAgICAgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICAgICkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU1lbnUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZF9vcHRpb24gPSB0aGlzLmRlZmF1bHRTZWxlY3RlZE9wdGlvbigpO1xuXG4gICAgICAgIHRoaXMubWF0SWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb25TZXQoXG4gICAgICAgICAgICB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoJ2Fzc2V0cy9hbGxfY3VzdG9tX2ljb25zLnN2ZycpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHBpbm5lZE9wdGlvbihldmVudCwgYnV0dG9uOiBJUGluQnV0dG9uKTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRfb3B0aW9uID0ge1xuICAgICAgICAgICAgaW5kZXg6IGJ1dHRvbi5pbmRleCxcbiAgICAgICAgICAgIGxhYmVsOiBidXR0b24ubGFiZWxcbiAgICAgICAgfTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnNwZWNpYWxLZXkgKyAnX3Bpbm5lZF9jcmVhdGlvbl9vcHRpb24nLCBKU09OLnN0cmluZ2lmeShidXR0b24pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGluQnV0dG9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5zZWxlY3RlZF9vcHRpb24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9wdWxhdGVNZW51KCk6IHZvaWQge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKHsgaW5kZXg6IGNvdW50LCBsYWJlbDogb3B0aW9uIH0pO1xuICAgICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdFNlbGVjdGVkT3B0aW9uKCk6IElQaW5CdXR0b24ge1xuICAgICAgICBsZXQgbG9jYWxfc3RvcmFnZV9pdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zcGVjaWFsS2V5ICsgJ19waW5uZWRfY3JlYXRpb25fb3B0aW9uJyk7XG5cbiAgICAgICAgcmV0dXJuIGxvY2FsX3N0b3JhZ2VfaXRlbSA/IEpTT04ucGFyc2UobG9jYWxfc3RvcmFnZV9pdGVtKSA6IHRoaXMuYnV0dG9uc1swXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdqYW0tbmd4LWpzb25hcGktbWF0ZXJpYWwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgbmd4LWpzb25hcGktbWF0ZXJpYWwgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5neEpzb25hcGlNYXRlcmlhbENvbXBvbmVudCB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFRhYmxlTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0VGFic01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSwgTWF0RGF0ZXBpY2tlck1vZHVsZSwgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmd4SnNvbmFwaU1hdGVyaWFsQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtanNvbmFwaS1tYXRlcmlhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFsLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0ZXJpYWxNb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtOZ3hKc29uYXBpTWF0ZXJpYWxDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtOZ3hKc29uYXBpTWF0ZXJpYWxDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5neEpzb25hcGlNYXRlcmlhbE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9waW4tb3B0aW9uLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4SnNvbmFwaU1hdGVyaWFsTW9kdWxlIH0gZnJvbSAnLi4vbmd4LWpzb25hcGktbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBOZ3hKc29uYXBpTWF0ZXJpYWxNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGluT3B0aW9uQnV0dG9uQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtdLFxuICAgIGV4cG9ydHM6IFtQaW5PcHRpb25CdXR0b25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbVBpbk9wdGlvbkJ1dHRvbk1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIENoYW5nZURldGVjdG9yUmVmLCBUcmFja0J5RnVuY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJlc291cmNlLCBEb2N1bWVudENvbGxlY3Rpb24sIFNlcnZpY2UsIElQYXJhbXNDb2xsZWN0aW9uIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHRpbWVvdXQsIGZpbHRlciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlVHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGZpbHRlck9yUmVxdWVzdCB9IGZyb20gJy4uLy4uL2xpYi9iYXRjaCc7XG5pbXBvcnQgeyBEZXN0cm95ZXIgfSBmcm9tICcuLi8uLi9saWIvZGVzdHJveWVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnamFtLWF1dG9jb21wbGV0ZScsXG4gIHN0eWxlczogW2AuY3VzdG9tLXBsYWNlaG9sZGVyOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOmluaGVyaXQ7b3BhY2l0eToxfS5jdXN0b20tcGxhY2Vob2xkZXI6Oi1tb3otcGxhY2Vob2xkZXJ7Y29sb3I6aW5oZXJpdDtvcGFjaXR5OjF9LmN1c3RvbS1wbGFjZWhvbGRlcjo6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOmluaGVyaXQ7b3BhY2l0eToxO2NvbG9yOmluaGVyaXR9LmN1c3RvbS1wbGFjZWhvbGRlcjo6cGxhY2Vob2xkZXJ7Y29sb3I6aW5oZXJpdDtvcGFjaXR5OjF9LmN1c3RvbS1wbGFjZWhvbGRlcjotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6aW5oZXJpdH1gXSxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgc3R5bGU9XCJ3aWR0aDogMTAwJVwiICpuZ0lmPVwiY29sbGVjdGlvblwiXG4gICAgYXBwZWFyYW5jZT1cIm91dGxpbmVcIiBmbG9hdExhYmVsPVwibmV2ZXJcIiBjb2xvcj1cImFjY2VudFwiXG4+XG4gICAgPGlucHV0IG1hdElucHV0IGFyaWEtbGFiZWw9XCJFc2NyaWJlIGFsZ28gcXVlIGJ1c2NhclwiIG5hbWU9XCJhdXRvY29tcGxldGUtcmVzb3VyY2VcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwidG9nZ2xlUmVzb3VyY2U/LmF0dHJpYnV0ZXNbZGlzcGxheUF0dHJpYnV0ZXNbMF1dIHx8IHBsYWNlaG9sZGVyXCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBbbmdDbGFzc109XCJ0b2dnbGVSZXNvdXJjZT8uYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlc1swXV0gPyAnY3VzdG9tLXBsYWNlaG9sZGVyJyA6IG51bGxcIlxuICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIlxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlQ3RybFwiXG4gICAgICAgIChibHVyKT1cImNsb3NlQXV0b2NvbXBsZXRlKClcIlxuICAgICAgICBpZD1cImF1dG9jb21wbGV0ZVJlc291cmNlXCJcbiAgICAgICAgI2F1dG9jb21wbGV0ZVJlc291cmNlXG4gICAgPlxuXG4gICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIlxuICAgICAgICBbZGlzcGxheVdpdGhdPVwiZGlzcGxheUZuXCJcbiAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cInNlbGVjdGVkUmVzb3VyY2UoJGV2ZW50Lm9wdGlvbi52YWx1ZSlcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNob3dMaXN0XCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwibnVsbFwiIChjbGljayk9XCJjbGVhckRpc3BsYXkoKVwiPi0tIE5pbmd1bmEgLS08L21hdC1vcHRpb24+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbbmdDbGFzc109XCJ0b2dnbGVSZXNvdXJjZT8uaWQgPT09IHJlc291cmNlLmlkID8gJ21hdC1zZWxlY3RlZCBtYXQtYWN0aXZlJyA6IG51bGxcIlxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJyZXNvdXJjZVwiXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJlc291cmNlIG9mIGZpbHRlcmVkX3Jlc291cmNlIHwgYXN5bmM7IHRyYWNrQnk6IHRyYWNrQnlGblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjRweFwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJpY29uXCI+e3sgaWNvbiB9fTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwicmVzb3VyY2UuYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlc1swXV1cIlxuICAgICAgICAgICAgICAgICAgICA+PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGF0dHJpYnV0ZSBvZiBkaXNwbGF5QXR0cmlidXRlczsgbGV0IGl0ZW0gPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwiaXRlbSA+PSAxXCI+IHwge3sgcmVzb3VyY2UuYXR0cmlidXRlc1thdHRyaWJ1dGVdIH19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBtYXRTdWZmaXggZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWJ1dHRvblwiIG1hdFN1ZmZpeCBtYXRUb29sdGlwPVwiTGltcGlhciBzZWxlY2Npw4PCs25cIlxuICAgICAgICAgICAgKm5nSWY9XCJ0b2dnbGVSZXNvdXJjZT8uYXR0cmlidXRlc1tkaXNwbGF5QXR0cmlidXRlc1swXV0gfHwgYXV0b2NvbXBsZXRlQ3RybC52YWx1ZVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJEaXNwbGF5KClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWF0LWJ1dHRvblwiIG1hdFN1ZmZpeCBtYXRUb29sdGlwPVwiQWN0dWFsaXphciBsaXN0YVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IHJlZnJlc2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0LWhpbnRcIj5yZWZyZXNoPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1zZWxlY3QtYXJyb3ctd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hdC1zZWxlY3QtYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L21hdC1mb3JtLWZpZWxkPlxuXG48bWF0LXByb2dyZXNzLWJhciBjbGFzcz1cInByb2dyZXNzLWJhci1hdXRvY29tcGxldGVcIlxuICAgICpuZ0lmPVwiIWNvbGxlY3Rpb24/LmxvYWRlZFwiXG4gICAgY29sb3I9XCJhY2NlbnRcIlxuICAgIG1vZGU9XCJpbmRldGVybWluYXRlXCJcbj48L21hdC1wcm9ncmVzcy1iYXI+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEphbUF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBwcmV2aWV3U2VsZWN0ZWRcbiAgICAgKiBAdXNhZ2VOb3RlcyBCeSBkZWZhdWx0IGl0IGlzIGBmYWxzZWAuXG4gICAgICogSW4gY2FzZSBpdCBpcyBgdHJ1ZWAsIHRoZSBhdXRvY29tcGxldGUsXG4gICAgICogc2hvd3MgaW4gdGhlIHBsYWNlaG9sZGVyIG9yIG1hdExhYmVsIGEgcHJldmlldyBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgcHJldmlld1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlUZXh0XG4gICAgICogQHVzYWdlTm90ZXMgVGV4dCBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgdG9nZ2xlUmVzb3VyY2U6IFJlc291cmNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ0VzY3JpYmUgYWxnbyBxdWUgYnVzY2FyJztcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VydmljZXM6IFNlcnZpY2U7XG4gICAgQElucHV0KCkgcHVibGljIGRpc3BsYXlBdHRyaWJ1dGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHJlbW90ZUZpbHRlciA9IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpbmNsdWRlOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgQElucHV0KCkgcHVibGljIHNvcnQ6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93TGlzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgQE91dHB1dCgpIHB1YmxpYyB0b2dnbGVSZXNvdXJjZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzb3VyY2U+KCk7XG4gICAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSBwdWJsaWMgYXV0b2NvbXBsZXRlUmVzb3VyY2U6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXI7XG4gICAgQFZpZXdDaGlsZCgnYXV0b2NvbXBsZXRlUmVzb3VyY2UnKSBwdWJsaWMgYXV0b2NvbXBsZXRlUmVzb3VyY2VJbnB1dDogRWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyBjb2xsZWN0aW9uOiBEb2N1bWVudENvbGxlY3Rpb247XG4gICAgcHVibGljIGZpbHRlcmVkX3Jlc291cmNlOiBPYnNlcnZhYmxlPEFycmF5PFJlc291cmNlPj47XG4gICAgcHVibGljIGRhdGFBcnJpdmVkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHB1YmxpYyBteUZvcm06IEZvcm1Hcm91cDtcbiAgICBwdWJsaWMgYXV0b2NvbXBsZXRlQ3RybDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICBwdWJsaWMgcmVzb3VyY2VBcnJheTogQXJyYXk8UmVzb3VyY2U+ID0gW107XG4gICAgcHVibGljIHVzZV9pc19sb2FkaW5nID0gdHJ1ZTtcbiAgICBwdWJsaWMgdHJhY2tCeUZuOiBUcmFja0J5RnVuY3Rpb248UmVzb3VyY2U+O1xuICAgIHB1YmxpYyByZXNvdXJjZUFycmF5TGFzdEZpbHRlclZhbHVlOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbGxlY3Rpb25QZXJQYWdlID0gMTAwOyAvLyA1MDBcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc291cmNlX21heF9vbl9saXN0ID0gNTA7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7fVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSB0aGlzLnNlcnZpY2VzLm5ld0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5maWx0ZXJlZF9yZXNvdXJjZSA9IHRoaXMuYXV0b2NvbXBsZXRlQ3RybC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveWVyLnBpcGUoKSxcbiAgICAgICAgICAgIGZpbHRlck9yUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlX3RvX3NlYXJjaDogdGhpcy5kaXNwbGF5QXR0cmlidXRlc1swXSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXNBcnJheTogdGhpcy5yZXNvdXJjZUFycmF5LFxuICAgICAgICAgICAgICAgIGdldEFsbEZjOiB0aGlzLmdldEFsbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIGxhc3RfZmlsdGVyX3ZhbHVlOiB0aGlzLnJlc291cmNlQXJyYXlMYXN0RmlsdGVyVmFsdWUsXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5jb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIHBhZ2Vfc2l6ZTogdGhpcy5jb2xsZWN0aW9uUGVyUGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VBdXRvY29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlUmVzb3VyY2Uub3B0aW9uU2VsZWN0aW9ucy5waXBlKHRpbWVvdXQoMTUwKSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgc2VsZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZVJlc291cmNlLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlUmVzb3VyY2UuY2xvc2VQYW5lbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RlZFJlc291cmNlKHJlc291cmNlOiBSZXNvdXJjZSkge1xuICAgICAgICBpZiAoIXJlc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2UgPSByZXNvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2VDaGFuZ2UuZW1pdChyZXNvdXJjZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BsYXlGbihyZXNvdXJjZT86IFJlc291cmNlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICcnOyAvLyBjbGVhciBpbnB1dCBhZnRlciBpdGVtIHNlbGVjdGlvblxuICAgIH1cblxuICAgIHB1YmxpYyByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2VzLmNsZWFyQ2FjaGVNZW1vcnkoKTtcbiAgICAgICAgdGhpcy51c2VfaXNfbG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGwoc2VhcmNoX3RleHQ6IHN0cmluZyk6IE9ic2VydmFibGU8RG9jdW1lbnRDb2xsZWN0aW9uPiB7XG4gICAgICAgIGxldCBwYXJhbXM6IElQYXJhbXNDb2xsZWN0aW9uID0ge1xuICAgICAgICAgICAgcGFnZToge1xuICAgICAgICAgICAgICAgIG51bWJlcjogMSxcbiAgICAgICAgICAgICAgICBzaXplOiB0aGlzLmNvbGxlY3Rpb25QZXJQYWdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlZmlsdGVyOiB0aGlzLnJlbW90ZUZpbHRlcixcbiAgICAgICAgICAgIGluY2x1ZGU6IHRoaXMuaW5jbHVkZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoc2VhcmNoX3RleHQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5yZW1vdGVmaWx0ZXIgPSB7IFt0aGlzLmRpc3BsYXlBdHRyaWJ1dGVzWzBdXTogc2VhcmNoX3RleHQgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmFsbChwYXJhbXMpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLmJ1aWxkZWQpLFxuICAgICAgICAgICAgdGFwKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckRpc3BsYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlUmVzb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUN0cmwuc2V0VmFsdWUoJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlsdGVyUmVzb3VyY2VCeU5hbWUodmFsdWU6IHN0cmluZyB8IFJlc291cmNlKTogQXJyYXk8UmVzb3VyY2U+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6ICcnO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIHRoaXMuc2hvd0xpc3QgPSAhdmFsdWUgJiYgZmlsdGVyVmFsdWUubGVuZ3RoID4gMDtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUFycmF5LmZpbHRlcigocmVzb3VyY2U6IFJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY291bnQgPCB0aGlzLnJlc291cmNlX21heF9vbl9saXN0ICYmXG4gICAgICAgICAgICAgICAgKHJlc291cmNlLmF0dHJpYnV0ZXNbdGhpcy5kaXNwbGF5QXR0cmlidXRlc1swXV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5hdHRyaWJ1dGVzW3RoaXMuZGlzcGxheUF0dHJpYnV0ZXNbMF1dLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignICcgKyBmaWx0ZXJWYWx1ZSkgPiAwKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRPcHRpb25Nb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBKYW1BdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdE9wdGlvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtKYW1BdXRvY29tcGxldGVDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtKYW1BdXRvY29tcGxldGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEphbUF1dG9jb21wbGV0ZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWluZm8tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYDxhIGNsYXNzPVwibWF0LWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgIG1hdC1pY29uLWJ1dHRvblxuICAgIFttYXRUb29sdGlwXT1cImphbVRvb2x0aXBcIlxuICAgIFtocmVmXT1cImV4dGVybmFsVXJsXCJcbiAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbj5cbiAgICA8bWF0LWljb25cbiAgICAgICAgW2lubmVySHRtbF09XCJpY29uXCJcbiAgICA+PC9tYXQtaWNvbj5cbjwvYT5cbmBcbn0pXG5leHBvcnQgY2xhc3MgSW5mb0J1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyoqIEBwYXJhbSBleHRlcm5hbFVybCByZXF1aXJlZCBwcm9wZXJ0eSAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBleHRlcm5hbFVybDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGljb24gb3B0aW9uYWwgcHJvcGVydHkgLVxuICAgICAqIEBkZXNjcmlwdGlvbiBCeSBkZWZhdWx0IGFjcXVpcmVzIGFzIGljb24gXCJpbmZvXCJcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogJ2luZm8nIHwgJ2hlbHAnID0gJ2luZm8nO1xuXG4gICAgLyoqIEBwYXJhbSBqYW1Ub29sdGlwIG9wdGlvbmFsIHByb3BlcnR5ICovXG4gICAgQElucHV0KCkgcHVibGljIGphbVRvb2x0aXA6IHN0cmluZyA9ICdNw4PCoXMgaW5mb3JtYWNpw4PCs24nO1xuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmljb24gPSB0aGlzLmNoZWNrSWNvbigpO1xuICAgIH1cblxuICAgIC8qKiBAbWV0aG9kIGNoZWNrSWNvbiBDaGVja3MgYXJyaXZpbmcgaWNvbiwgaWYgbm90IHN1cHBvcnRlZCwgdGhlbiByZXR1cm5zIGluZm8uICovXG4gICAgcHJpdmF0ZSBjaGVja0ljb24oKTogJ2luZm8nIHwgJ2hlbHAnIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBcIiR7dGhpcy5pY29ufVwiIGljb24gaXMgbm90IHN1cHBvcnRlZCDDsMKfwqTCt8OiwoDCjcOiwpnCgsOvwrjCjywgVHJ5IFwiaW5mb1wiIG9yIFwiaGVscC5cImApO1xuXG4gICAgICAgIHJldHVybiAhWydpbmZvJywgJ2hlbHAnXS5pbmNsdWRlcyh0aGlzLmljb24pID8gJ2luZm8nIDogdGhpcy5pY29uO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBJbmZvQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9pbmZvLWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0luZm9CdXR0b25Db21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtJbmZvQnV0dG9uQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBKYW1JbmZvQnV0dG9uTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEFwcGxpY2F0aW9uUmVmLCBJbmplY3RvciwgRW1iZWRkZWRWaWV3UmVmLCBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW50ZXJmYWNlIElDaGlsZENvbmZpZyB7XG4gICAgaW5wdXRzOiBvYmplY3Q7XG4gICAgb3V0cHV0czogb2JqZWN0O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjaGlsZENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPHt9PjtcbiAgICBwcml2YXRlIGNoaWxkX2RvbV9lbGVtZW50X2lkID0gJ2N1cnJlbnQtc2VsZWN0aW9uLWJhcic7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgYXBwZW5kQ29tcG9uZW50VG8ocGFyZW50SWQ6IHN0cmluZywgY2hpbGQ6IGFueSwgY2hpbGRDb25maWc/OiBJQ2hpbGRDb25maWcpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgICAgIGxldCBjaGlsZF9ub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5jaGlsZF9kb21fZWxlbWVudF9pZCk7XG4gICAgICAgIGlmIChjaGlsZF9ub2RlKSBjaGlsZF9ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2hpbGRfbm9kZSk7XG5cbiAgICAgICAgLyoqIENyZWEgdW5hIHJlZmVyZW5jaWEgZGUgY29tcG9uZW50ZSBkZXNkZSBlbCBjb21wb25lbnRlIGhpam8gKi9cbiAgICAgICAgY29uc3QgY2hpbGRDb21wb25lbnRSZWYgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjaGlsZCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgIC8qKiBDb25lY3RhIGxhIGNvbmZpZ3VyYWNpw4PCs24gYWwgaGlqbyAoZW50cmFkYXMgeSBzYWxpZGFzKSAqL1xuICAgICAgICB0aGlzLmF0dGFjaENvbmZpZyhjaGlsZENvbmZpZywgY2hpbGRDb21wb25lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYgPSBjaGlsZENvbXBvbmVudFJlZjtcbiAgICAgICAgLy8gQWdyZWdhIGVsIGNvbXBvbmVudGUgYWwgYXBwUmVmIGRlIG1vZG8gcXVlIGVzdMODwqkgZGVudHJvIGRlbCDDg8KhcmJvbCBkZSBjb21wb25lbnRlcyBcIm5nXCJcbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjaGlsZENvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICAgICAgLy8gT2J0aWVuZSBlbCBlbGVtZW50byBET00gZGVsIGNvbXBvbmVudGVcbiAgICAgICAgY29uc3QgY2hpbGREb21FbGVtID0gKGNoaWxkQ29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNoaWxkRG9tRWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5jaGlsZF9kb21fZWxlbWVudF9pZCk7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50SWQpLmFwcGVuZENoaWxkKGNoaWxkRG9tRWxlbSk7XG4gICAgICAgIGNoaWxkRG9tRWxlbS5jbGFzc05hbWUgPSAnd2lkdGgtMTAwJztcblxuICAgICAgICByZXR1cm4gY2hpbGRDb21wb25lbnRSZWY7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUNvbXBvbmVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNoaWxkQ29tcG9uZW50UmVmKSByZXR1cm47XG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jaGlsZENvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoQ29uZmlnKGNvbmZpZywgY29tcG9uZW50UmVmKSB7XG4gICAgICAgIGxldCBpbnB1dHMgPSBjb25maWcuaW5wdXRzO1xuICAgICAgICBsZXQgb3V0cHV0cyA9IGNvbmZpZy5vdXRwdXRzO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gaW5wdXRzKSB7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2Vba2V5XSA9IGlucHV0c1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvdXRwdXRzKSB7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2Vba2V5XSA9IG91dHB1dHNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi9kb20uc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1ldGhvZFJlZiB7XG4gICAgbWV0aG9kOiBzdHJpbmc7XG4gICAgcGFyYW1zPzogYW55O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uQmFyU2VydmljZSB7XG4gICAgcHVibGljIHNlbGVjdGVkJDogQmVoYXZpb3JTdWJqZWN0PFNlbGVjdGlvbk1vZGVsPGFueT4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChuZXcgU2VsZWN0aW9uTW9kZWwoKSk7XG4gICAgcHVibGljIGNhbGxNZXRob2QkOiBCZWhhdmlvclN1YmplY3Q8SU1ldGhvZFJlZj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHsgbWV0aG9kOiAnJyB9KTtcbiAgICBwcml2YXRlIHNlbGVjdGlvbkJhckVsZW1lbnRJZCA9ICdzZWxlY3Rpb24tYmFyLWNvbnRhaW5lcic7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBkb21TZXJ2aWNlOiBEb21TZXJ2aWNlKSB7fVxuXG4gICAgcHVibGljIHNlbGVjdGVkPFQ+KHNlbGVjdGVkOiBTZWxlY3Rpb25Nb2RlbDxUPik6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsbE1ldGhvZChtZXRob2RSZWY6IElNZXRob2RSZWYpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYWxsTWV0aG9kJC5uZXh0KG1ldGhvZFJlZik7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyTWV0aG9kKCkge1xuICAgICAgICB0aGlzLmNhbGxNZXRob2QoeyBtZXRob2Q6ICcnIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGNvbXBvbmVudDogYW55LCBpbnB1dHM6IG9iamVjdCwgb3V0cHV0czogb2JqZWN0KTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgICAgICBsZXQgY29tcG9uZW50Q29uZmlnID0ge1xuICAgICAgICAgICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgICAgICAgICBvdXRwdXRzOiBvdXRwdXRzXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudElkKS5jbGFzc05hbWUgPT09ICdzaG93Jykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgLy8gdHMtbGludCA9PiBWYWx1ZS1yZXR1cm5pbmcgZnVuY3Rpb24gc2hvdWxkIHVzZSBgcmV0dXJuIHVuZGVmaW5lZDtgLCBub3QganVzdCBgcmV0dXJuO2BcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjcmVhdGVkX2NvbXBvbmVudF9pbnN0YW5jZSA9IHRoaXMuZG9tU2VydmljZS5hcHBlbmRDb21wb25lbnRUbyh0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnRJZCwgY29tcG9uZW50LCBjb21wb25lbnRDb25maWcpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnRJZCkuY2xhc3NOYW1lID0gJ3Nob3cnO1xuXG4gICAgICAgIHJldHVybiBjcmVhdGVkX2NvbXBvbmVudF9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnJlbW92ZUNvbXBvbmVudCgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnRJZCkuY2xhc3NOYW1lID0gJ2hpZGRlbic7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvblN0YXJ0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFNlbGVjdGlvbkJhclNlcnZpY2UgfSBmcm9tICcuLi9zZWxlY3Rpb24tYmFyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zZWxlY3Rpb24tYmFyLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGlkPVwic2VsZWN0aW9uLWJhci1jb250YWluZXJcIiBjbGFzcz1cImhpZGRlblwiPjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3QgL2RlZXAvIC5oaWRkZW57ZGlzcGxheTpub25lIWltcG9ydGFudH06aG9zdCAvZGVlcC8gLnNob3d7ZGlzcGxheTotd2Via2l0LWJveCFpbXBvcnRhbnQ7ZGlzcGxheTpmbGV4IWltcG9ydGFudH0jc2VsZWN0aW9uLWJhci1jb250YWluZXJ7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDM7dG9wOjA7bGVmdDowO3JpZ2h0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6NjRweDtvcGFjaXR5OjE7YmFja2dyb3VuZDojZmZmfTpob3N0IC9kZWVwLyAjc2VsZWN0aW9uLWJhci1jb250YWluZXIgI2N1cnJlbnQtc2VsZWN0aW9uLWJhcjpmaXJzdC1jaGlsZHtwYWRkaW5nOjAgMjBweDt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkJhckNvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgc2VsZWN0aW9uQmFyU2VydmljZTogU2VsZWN0aW9uQmFyU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXG4gICAgKSB7XG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25CYXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgRGVzdHJveWVyIH0gZnJvbSAnLi4vLi4vZGVzdHJveWVyJztcbmltcG9ydCB7IFNlbGVjdGlvbkJhclNlcnZpY2UgfSBmcm9tICcuLi9zZWxlY3Rpb24tYmFyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zZWxlY3Rpb24tYmFyLWluZm8nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0VG9vbHRpcD1cIkJvcnJhciBzZWxlY2Npw4PCs25cIiAoY2xpY2spPVwiY2xvc2UoKVwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxzcGFuPnt7IGxhYmVsIH19PC9zcGFuPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkJhckluZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHB1YmxpYyBzZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT47XG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkZXN0cm95ZXIgPSBuZXcgRGVzdHJveWVyKCk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzZWxlY3Rpb25CYXJTZXJ2aWNlOiBTZWxlY3Rpb25CYXJTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQmFyU2VydmljZS5zZWxlY3RlZCRcbiAgICAgICAgICAgIC5waXBlKHRoaXMuZGVzdHJveWVyLnBpcGUoKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoc2VsZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsID0gc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCArIChzZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoID49IDEgPyAnIHNlbGVjY2lvbmFkb3MnIDogJyBzZWxlY2Npb25hZG8nKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCA8PSAwKSB0aGlzLnNlbGVjdGlvbkJhclNlcnZpY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkJhclNlcnZpY2UuZGVzdHJveSgpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBSZXllc29mdCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi4vc2VhcmNoLWlucHV0L3NlYXJjaC10ZXh0LnBpcGUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTZWxlY3Rpb25CYXJTZXJ2aWNlIH0gZnJvbSAnLi9zZWxlY3Rpb24tYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRG9tU2VydmljZSB9IGZyb20gJy4vZG9tLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uQmFyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Rpb24tYmFyLWNvbnRhaW5lci9zZWxlY3Rpb24tYmFyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0aW9uQmFySW5mb0NvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0aW9uLWJhci1pbmZvL3NlbGVjdGlvbi1iYXItaW5mby5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbRmlsdGVyUGlwZSwgU2VsZWN0aW9uQmFyU2VydmljZSwgRG9tU2VydmljZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2VsZWN0aW9uQmFyQ29udGFpbmVyQ29tcG9uZW50LCBTZWxlY3Rpb25CYXJJbmZvQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbIFNlbGVjdGlvbkJhckNvbnRhaW5lckNvbXBvbmVudCwgU2VsZWN0aW9uQmFySW5mb0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSmFtU2VsZWN0aW9uQmFyTW9kdWxlIHt9XG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIG5neC1qc29uYXBpLW1hdGVyaWFsXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9saWIvY3VzdG9tLXZhbGlkYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvdHJhY2stYnktaWQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvYmF0Y2gnO1xuZXhwb3J0ICpmcm9tICcuL2xpYi9kZXN0cm95ZXInO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZWxlY3Qvb3B0aW9uLWZvb3Rlci5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VsZWN0L3NlbGVjdC5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zdWJtaXQvc3VibWl0LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zdWJtaXQvc3VibWl0Lm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zsb2F0aW5nLWZpbHRlcnMvZmxvYXRpbmctZmlsdGVycy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZmxvYXRpbmctZmlsdGVycy9hdm9pZC1kaXNhYmxlZC1zdHlsZS5kaXJlY3RpdmUnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZmxvYXRpbmctZmlsdGVycy9mbG9hdGluZy1maWx0ZXJzLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3BpY3R1cmUtbWFuYWdlci9waWN0dXJlL3BpY3R1cmUtbWFuYWdlci5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvcGljdHVyZS1tYW5hZ2VyL2dhbGxlcnkvZ2FsbGVyeS1tYW5hZ2VyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9waWN0dXJlLW1hbmFnZXIvcGljdHVyZS9pbWFnZS1jaGFuZ2UtaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3BpY3R1cmUtbWFuYWdlci9waWN0dXJlLW1hbmFnZXIubW9kdWxlJztcblxuLy8gZXhwb3J0ICogZnJvbSAnLi9saWIvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnMuY29tcG9uZW50Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vbGliL2JyZWFkY3J1bWJzL2JyZWFkY3J1bWJzLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtdGV4dC5waXBlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvY2hpcHMtYXV0b2NvbXBsZXRlL2NoaXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY2hpcHMtYXV0b2NvbXBsZXRlL2NoaXBzLWF1dG9jb21wbGV0ZS5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWxldGUtY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi1kaWFsb2cvY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVsZXRlLWNvbmZpcm1hdGlvbi9kZWxldGUtY29uZmlybWF0aW9uLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWxldGUtY29uZmlybWF0aW9uL2RlbGV0ZS1jb25maXJtYXRpb24ubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cvZWRpdC10ZXh0LWF0dHJpYnV0ZS1kaWFsb2cuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2VkaXQtdGV4dC1hdHRyaWJ1dGUtZGlhbG9nL2VkaXQtdGV4dC1hdHRyaWJ1dGUtZGlhbG9nLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3RvcC13YXJuaW5nL3RvcC13YXJuaW5nLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi90b3Atd2FybmluZy90b3Atd2FybmluZy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3RvcC13YXJuaW5nL3NpbmdsZS13YXJuaW5nL3NpbmdsZS13YXJuaW5nLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi90b3Atd2FybmluZy90b3Atd2FybmluZy5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9lcnJvci1oYW5kbGVyL2Vycm9yLWhhbmRsZXIuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9lcnJvci1oYW5kbGVyL2Vycm9yLWhhbmRsZXIubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvcmFuZ2UtZGF0ZXBpY2tlci9yYW5nZS1kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9yYW5nZS1kYXRlcGlja2VyL3JhbmdlLWRhdGVwaWNrZXIubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZmFiLXNwZWVkLWRpYWwvZmFiLXNwZWVkLWRpYWwuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZhYi1zcGVlZC1kaWFsL2ZhYi1zcGVlZC1kaWFsLW1pbmktYnV0dG9uJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZhYi1zcGVlZC1kaWFsL2ZhYi1zcGVlZC1kaWFsLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3JlZnJlc2gvcmVmcmVzaC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvcmVmcmVzaC9yZWZyZXNoLm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL21lbnUvbWVudS1lbGVtZW50cy9tZW51JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lbnUvbWVudS1lbGVtZW50cy9zZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lbnUvbWVudS1lbGVtZW50cy9idXR0b24nO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbWVudS9kcm9wZG93bi1tZW51L2Ryb3Bkb3duLW1lbnUuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lbnUvbWVudS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbWVudS9tZW51Lm1vZHVsZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zsb2F0aW5nLWJ1dHRvbi9mbG9hdGluZy1idXR0b24uY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zsb2F0aW5nLWJ1dHRvbi9mbG9hdGluZy1idXR0b24ubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZHluYW1pYy1mb3Jtcy9keW5hbWljLWlucHV0cyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9keW5hbWljLWZvcm1zL2Zvcm1seS1mb3JtLWZsZXguY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2R5bmFtaWMtZm9ybXMvZHluYW1pYy1mb3Jtcy5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi90YWJzL3RhYnMuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3RhYnMvdGFicy5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHBhbnNpb24tcGFuZWwvcmVtZW1iZXItc3RhdGUuZGlyZWN0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2V4cGFuc2lvbi1wYW5lbC9yZW1lbWJlci1zdGF0ZS5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9mbG9hdGluZy1pbnB1dC9mbG9hdGluZy1pbnB1dC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZmxvYXRpbmctaW5wdXQvZmxvYXRpbmctaW5wdXQubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvZmlsdGVycy9pbnRlcmZhY2VzL2ZpbHRlci1kYXRlLXJhbmdlLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9maWx0ZXJzL2ludGVyZmFjZXMvZmlsdGVyLWNoZWNrcy5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZmlsdGVycy9pbnRlcmZhY2VzL2ZpbHRlci1vcHRpb24uaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZpbHRlcnMvaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZpbHRlcnMvYmFzaWNzL2ZpbHRlci1vcHRpb25zLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9maWx0ZXJzL2Jhc2ljcy9maWx0ZXItY2hlY2tzLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9maWx0ZXJzL2ZpbHRlcnMubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvc2xpZGUvc2xpZGUtbW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NsaWRlL3NsaWRlLWdyb3VwJztcbmV4cG9ydCB7IEphbVNsaWRlSGVhZGVyLCBTY3JvbGxEaXJlY3Rpb24gfSBmcm9tICcuL2xpYi9zbGlkZS9zbGlkZS1oZWFkZXInO1xuZXhwb3J0IHsgSmFtU2xpZGVFbGVtZW50V3JhcHBlciB9IGZyb20gJy4vbGliL3NsaWRlL3NsaWRlLWVsZW1lbnQtd3JhcHBlcic7XG5leHBvcnQgeyBKYW1TbGlkZSB9IGZyb20gJy4vbGliL3NsaWRlL3NsaWRlJztcbmV4cG9ydCB7IEphbVNsaWRlRWxlbWVudCB9IGZyb20gJy4vbGliL3NsaWRlL3NsaWRlLWVsZW1lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2xpZGUvc2xpZGUtYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3Bpbi1vcHRpb24tYnV0dG9uL3Bpbi1vcHRpb24tYnV0dG9uLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9waW4tb3B0aW9uLWJ1dHRvbi9waW4tb3B0aW9uLWJ1dHRvbi5tb2R1bGUnO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5cbmV4cG9ydCB7IEluZm9CdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2xpYi9pbmZvLWJ1dHRvbi9pbmZvLWJ1dHRvbi5jb21wb25lbnQnO1xuZXhwb3J0IHsgSmFtSW5mb0J1dHRvbk1vZHVsZSB9IGZyb20gJy4vbGliL2luZm8tYnV0dG9uL2luZm8tYnV0dG9uLm1vZHVsZSc7XG5cbmV4cG9ydCB7IFNlbGVjdGlvbkJhckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbGliL3NlbGVjdGlvbi1iYXIvc2VsZWN0aW9uLWJhci1jb250YWluZXIvc2VsZWN0aW9uLWJhci1jb250YWluZXIuY29tcG9uZW50JztcbmV4cG9ydCB7IFNlbGVjdGlvbkJhckluZm9Db21wb25lbnQgfSBmcm9tICcuL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXItaW5mby9zZWxlY3Rpb24tYmFyLWluZm8uY29tcG9uZW50JztcbmV4cG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL2xpYi9zZWxlY3Rpb24tYmFyL2RvbS5zZXJ2aWNlJztcbmV4cG9ydCB7IElNZXRob2RSZWYsIFNlbGVjdGlvbkJhclNlcnZpY2UgfSBmcm9tICcuL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXIuc2VydmljZSc7XG5leHBvcnQgeyBKYW1TZWxlY3Rpb25CYXJNb2R1bGUgfSBmcm9tICcuL2xpYi9zZWxlY3Rpb24tYmFyL3NlbGVjdGlvbi1iYXIubW9kdWxlJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWMtYXBpJztcblxuZXhwb3J0IHtEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCBhcyDDicK1aH0gZnJvbSAnLi9saWIvbG9nZ2VkLXN0YXRlL2RpYWxvZy1sb2dnZWQtc3RhdGUuY29tcG9uZW50JztcbmV4cG9ydCB7TWF0ZXJpYWxNb2R1bGUgYXMgw4nCtW19IGZyb20gJy4vbGliL21hdGVyaWFsLm1vZHVsZSc7XG5leHBvcnQge0JvdHRvbVNoZWV0Q29tcG9uZW50IGFzIMOJwrVrfSBmcm9tICcuL2xpYi9tZW51L2JvdHRvbS1zaGVldC9ib3R0b20tc2hlZXQuY29tcG9uZW50JztcbmV4cG9ydCB7TWVudUVsZW1lbnQgYXMgw4nCtWksTWVudUVsZW1lbnRzQ29sbGVjdGlvbiBhcyDDicK1an0gZnJvbSAnLi9saWIvbWVudS9tZW51LWVsZW1lbnRzL21lbnUtZWxlbWVudHMnO1xuZXhwb3J0IHtOZ3hKc29uYXBpTWF0ZXJpYWxDb21wb25lbnQgYXMgw4nCtW59IGZyb20gJy4vbGliL25neC1qc29uYXBpLW1hdGVyaWFsLmNvbXBvbmVudCc7XG5leHBvcnQge05neEpzb25hcGlNYXRlcmlhbE1vZHVsZSBhcyDDicK1bH0gZnJvbSAnLi9saWIvbmd4LWpzb25hcGktbWF0ZXJpYWwubW9kdWxlJztcbmV4cG9ydCB7VXBsb2FkQ29tcG9uZW50IGFzIMOJwrVnfSBmcm9tICcuL2xpYi9waWN0dXJlLW1hbmFnZXIvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQnO1xuZXhwb3J0IHtKYW1TbGlkZUJhc2UgYXMgw4nCtWUsX0phbVNsaWRlTWl4aW5CYXNlIGFzIMOJwrVmfSBmcm9tICcuL2xpYi9zbGlkZS9zbGlkZSc7XG5leHBvcnQge0phbVNsaWRlRWxlbWVudFdyYXBwZXJCYXNlIGFzIMOJwrVjLF9KYW1TbGlkZUVsZW1lbnRXcmFwcGVyTWl4aW5CYXNlIGFzIMOJwrVkfSBmcm9tICcuL2xpYi9zbGlkZS9zbGlkZS1lbGVtZW50LXdyYXBwZXInO1xuZXhwb3J0IHtKYW1TbGlkZUhlYWRlckJhc2UgYXMgw4nCtWEsX0phbVNsaWRlSGVhZGVyTWl4aW5CYXNlIGFzIMOJwrVifSBmcm9tICcuL2xpYi9zbGlkZS9zbGlkZS1oZWFkZXInOyJdLCJuYW1lcyI6WyJjb25jYXRNYXAiLCJvZiIsInN0YXJ0V2l0aCIsInBpcGUiLCJkZWJvdW5jZVRpbWUiLCJmaWx0ZXIiLCJzd2l0Y2hNYXAiLCJjYXRjaEVycm9yIiwibWFwIiwiU3ViamVjdCIsInRha2VVbnRpbCIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0Iiwicm91dGVyIiwiQWN0aXZhdGVkUm91dGUiLCJSb3V0ZXIiLCJQaXBlIiwiRm9ybUNvbnRyb2wiLCJOZ01vZHVsZSIsIkZvcm1zTW9kdWxlIiwiRmxleExheW91dE1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiTWF0RGl2aWRlck1vZHVsZSIsIk1hdEZvcm1GaWVsZE1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIkxvY2F0aW9uIiwiTWF0VG9vbHRpcE1vZHVsZSIsIk1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSIsInRzbGliXzEuX192YWx1ZXMiLCJEaXJlY3RpdmUiLCJFbGVtZW50UmVmIiwiTWF0RXhwYW5zaW9uTW9kdWxlIiwiSHR0cENsaWVudCIsImh1bWFuaXplQnl0ZXMiLCJNYXREaWFsb2dSZWYiLCJJbmplY3QiLCJNQVRfRElBTE9HX0RBVEEiLCJkaWFsb2ciLCJNYXREaWFsb2ciLCJNYXREaWFsb2dNb2R1bGUiLCJNYXRDYXJkTW9kdWxlIiwiTmd4VXBsb2FkZXJNb2R1bGUiLCJWaWV3Q2hpbGQiLCJNYXRBdXRvY29tcGxldGVNb2R1bGUiLCJNYXRPcHRpb25Nb2R1bGUiLCJNYXRDaGlwc01vZHVsZSIsIkhvc3RMaXN0ZW5lciIsIk1hdElucHV0TW9kdWxlIiwiSW5qZWN0YWJsZSIsInRzbGliXzEuX19leHRlbmRzIiwiTmdab25lIiwiVG9hc3RlclNlcnZpY2UiLCJFcnJvckhhbmRsZXIiLCJEYXRlUGlwZSIsIlNhdE5hdGl2ZURhdGVNb2R1bGUiLCJTYXREYXRlcGlja2VyTW9kdWxlIiwidG9vbHRpcCIsIkVjb0ZhYlNwZWVkRGlhbE1vZHVsZSIsIkNoYW5nZURldGVjdG9yUmVmIiwiTUFUX0JPVFRPTV9TSEVFVF9EQVRBIiwiTWF0Qm90dG9tU2hlZXRSZWYiLCJNYXRCb3R0b21TaGVldCIsIk1hdE1lbnVNb2R1bGUiLCJNYXRMaXN0TW9kdWxlIiwiTWF0Qm90dG9tU2hlZXRNb2R1bGUiLCJGb3JtbHlGb3JtIiwiRm9ybWx5TW9kdWxlIiwiRm9ybWx5TWF0ZXJpYWxNb2R1bGUiLCJNYXRUYWJzTW9kdWxlIiwiQ29udGVudENoaWxkIiwiTWF0RXhwYW5zaW9uUGFuZWwiLCJpbnB1dCIsIkNka1BvcnRhbCIsIm1peGluRGlzYWJsZWQiLCJUZW1wbGF0ZVBvcnRhbCIsIkNoYW5nZURldGVjdGlvblN0cmF0ZWd5IiwiVmlld0VuY2Fwc3VsYXRpb24iLCJWaWV3Q29udGFpbmVyUmVmIiwiVGVtcGxhdGVSZWYiLCJJbmplY3Rpb25Ub2tlbiIsIm1peGluQ29sb3IiLCJtaXhpbkRpc2FibGVSaXBwbGUiLCJTdWJzY3JpcHRpb24iLCJjb2VyY2VCb29sZWFuUHJvcGVydHkiLCJjb2VyY2VOdW1iZXJQcm9wZXJ0eSIsIm1lcmdlIiwiT3B0aW9uYWwiLCJDb250ZW50Q2hpbGRyZW4iLCJub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zIiwiZnJvbUV2ZW50Iiwib2JzZXJ2YWJsZU9mIiwiRm9jdXNLZXlNYW5hZ2VyIiwicGxhdGZvcm0iLCJ0aW1lciIsIlZpZXdwb3J0UnVsZXIiLCJEaXJlY3Rpb25hbGl0eSIsIlBsYXRmb3JtIiwiTWF0Q29tbW9uTW9kdWxlIiwiUG9ydGFsTW9kdWxlIiwiTWF0UmlwcGxlTW9kdWxlIiwiT2JzZXJ2ZXJzTW9kdWxlIiwiQTExeU1vZHVsZSIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImFuaW1hdGUiLCJidXR0b24iLCJNYXRJY29uUmVnaXN0cnkiLCJEb21TYW5pdGl6ZXIiLCJNYXROYXRpdmVEYXRlTW9kdWxlIiwiTWF0RGF0ZXBpY2tlck1vZHVsZSIsIk1hdFRvb2xiYXJNb2R1bGUiLCJNYXRQYWdpbmF0b3JNb2R1bGUiLCJNYXRUYWJsZU1vZHVsZSIsInRpbWVvdXQiLCJ0YXAiLCJNYXRBdXRvY29tcGxldGVUcmlnZ2VyIiwiTWF0UHJvZ3Jlc3NCYXJNb2R1bGUiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJBcHBsaWNhdGlvblJlZiIsIkluamVjdG9yIiwiQmVoYXZpb3JTdWJqZWN0IiwiU2VsZWN0aW9uTW9kZWwiLCJOYXZpZ2F0aW9uU3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7UUFFQTtTQWlDQztRQWhDVSwyQ0FBZ0IsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLEtBQXVCO1lBQzFELE9BQU8sVUFBQyxPQUF3QjtnQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO29CQUFFLE9BQU8sSUFBSSxDQUFDO2dCQUVoQyxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFeEMsT0FBTyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUMvQixDQUFDO1NBQ0w7Ozs7Ozs7Ozs7Ozs7UUFjTSxpREFBc0IsR0FBN0IsVUFBOEIsT0FBd0I7WUFDbEQsSUFBTSxRQUFRLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdkQsSUFBTSxnQkFBZ0IsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDOztZQUd2RSxJQUFJLFFBQVEsS0FBSyxnQkFBZ0IsRUFBRTs7Z0JBRS9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pFO1NBQ0o7UUFDTCx1QkFBQztJQUFELENBQUM7O2FDakNlLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBa0I7UUFDL0MsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7O0lDSkQ7QUFFQSxhQU9nQixRQUFRLENBQTJDLE9BQVUsRUFBRSxN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QyxNQUFNO3dCQUM5QixLQUFLLENBQUM7NEJBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQzt3QkFDeEQsS0FBSyxDQUFDOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLFNBQVM7d0JBQ2pELEtBQUssQ0FBQzs0QkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLFNBQVM7d0JBQ2pEOzRCQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUFDLFNBQVM7NkJBQUU7NEJBQzVHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLE1BQU07NkJBQUU7NEJBQ3RGLElBQUks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