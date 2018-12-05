/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Resource } from 'ngx-jsonapi';

@Component({
    selector: 'jam-submit',
    templateUrl: './submit.component.html'
})
export class SubmitComponent {
    @Input() public disabled: boolean;
    @Input() public noCancel: boolean;
    @Input() public cancelParamsState: object;
    @Input() public submitLabel: string;
    @Input() public cancelState: string;
    @Input() public resource: Resource;
    @Output() public saveFc: EventEmitter<any> = new EventEmitter();
    @Output() public cancelFc: EventEmitter<any> = new EventEmitter();

    public constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

    public changeState() {
        if (this.cancelFc) {
            this.cancelFc.emit();
        }
        if (this.cancelState) {
            if (this.cancelState.slice(0, 2) === '..') {
                this.router.navigate([this.cancelState], { relativeTo: this.activatedRoute });
            } else {
                this.router.navigate([this.cancelState], { queryParams: this.cancelParamsState });
            }
        }
    }
    public save(payload: Resource): any {
        this.saveFc.emit(payload);
    }
}
