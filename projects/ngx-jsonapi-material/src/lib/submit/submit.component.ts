/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Resource } from 'ngx-jsonapi';
import { Location } from '@angular/common';

@Component({
    selector: 'jam-submit',
    templateUrl: './submit.component.html'
})
export class SubmitComponent {
    @Input() public submitAppearance: 'mat-flat-button' | 'mat-stroked-button' | 'mat-raised-button' | 'mat-button' = 'mat-raised-button';
    @Input() public submitColor: 'primary' | 'warn' = 'primary';
    @Input() public disabled: boolean;
    @Input() public noCancel: boolean;
    @Input() public cancelParamsState: object;
    @Input() public submitLabel: string;
    @Input() public cancelState: string;
    @Input() public goBack = false;
    @Input() public loading: boolean = false;
    @Output() public accept: EventEmitter<any> = new EventEmitter();
    @Output() public cancel: EventEmitter<any> = new EventEmitter();

    public constructor(
        private location: Location,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) {}

    public changeState(event): void {
        if (!this.noCancel && this.goBack) {
            this.location.back();
            this.cancel.emit('goBack');
        } else if (this.cancel) {
            this.cancel.emit();
        } else if (this.cancelState && (this.cancelState.slice(0, 2) === '..')) {
            this.router.navigate([this.cancelState], { relativeTo: this.activatedRoute });
        } else {
            this.router.navigate([this.cancelState], { queryParams: this.cancelParamsState });
        }
    }

    public submit(): void {
        this.accept.emit();
    }
}
