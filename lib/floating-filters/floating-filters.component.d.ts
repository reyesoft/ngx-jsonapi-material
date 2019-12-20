/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { EventEmitter, OnInit } from '@angular/core';
/**
 * Este component trabaja con 2 ng-content.
 * En el component que se use, debe definirse dos ng-container con las clases css:
 * header-filters, y filters, de esta forma el component sabe en que ng-content ubicar el contenido que se le pasa.
 */
export declare class FloatingFiltersComponent implements OnInit {
    hasAdvancedFilters: boolean;
    appearance: 'round' | 'square';
    resetFilters: EventEmitter<void>;
    show_reset_button: boolean;
    open_expansion_panel: boolean;
    ngOnInit(): void;
    toggleStateExpansionPanel(state: boolean): void;
    clearFilters(panel_state: boolean): void;
}
