/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
export declare class SearchInputComponent implements OnInit, OnDestroy {
    text: string;
    opened: boolean;
    textChange: EventEmitter<string>;
    searchCtrl: FormControl;
    showSearch: boolean;
    private destroyer;
    ngOnInit(): void;
    ngOnDestroy(): void;
    showInput(): void;
    switch(): void;
}
