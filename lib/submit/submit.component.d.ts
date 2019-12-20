/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
export declare class SubmitComponent {
    private location;
    router: Router;
    activatedRoute: ActivatedRoute;
    submitAppearance: 'mat-flat-button' | 'mat-stroked-button' | 'mat-raised-button' | 'mat-button';
    submitColor: 'primary' | 'warn';
    disabled: boolean;
    noCancel: boolean;
    cancelParamsState: object;
    submitLabel: string;
    cancelState: string;
    goBack: boolean;
    loading: boolean;
    accept: EventEmitter<any>;
    cancel: EventEmitter<any>;
    constructor(location: Location, router: Router, activatedRoute: ActivatedRoute);
    changeState(event: any): void;
    submit(): void;
}
