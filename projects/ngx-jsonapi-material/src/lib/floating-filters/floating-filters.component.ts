/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, AfterViewInit, ElementRef, Directive, HostBinding, Host, Self, ViewContainerRef, Output, EventEmitter, Renderer2, ViewRef, TemplateRef } from '@angular/core';

/**
 * Este component trabaja con 2 ng-content.
 * En el component que se use, debe definirse dos ng-container con las clases css:
 * header-filters, y filters, de esta forma el component sabe en que ng-content ubicar el contenido que se le pasa.
 */

@Component({
    selector: 'jam-floating-filters',
    templateUrl: './floating-filters.component.html'
})
export class FloatingFiltersComponent {
    @Input() public hasAdvancedFilters: boolean = true;
    @Output() public resetFilters: EventEmitter<void> = new EventEmitter();
    public show_reset_button: boolean = false;
    public open_expansion_panel = false;

    public ngOnInit() {
        this.show_reset_button = this.resetFilters.observers.length > 0;
    }

    public toggleStateExpansionPanel(state: boolean): void {
        this.open_expansion_panel = !state;
    }
}
