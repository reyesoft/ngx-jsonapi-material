/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Destroyer } from '../destroyer';

@Component({
    selector: 'jam-search-input',
    styleUrls: ['./search-input.component.scss'],
    templateUrl: './search-input.component.html'
})
export class SearchInputComponent implements OnInit, OnDestroy {
    @Input() public text: string;
    @Input() public opened: boolean = false;
    @Output() public textChange: EventEmitter<string> = new EventEmitter();

    public searchCtrl: FormControl = new FormControl();

    public showSearch = false;

    private destroyer = new Destroyer();

    public ngOnInit() {
        this.showSearch = this.opened || this.showSearch;

        this.searchCtrl.valueChanges
            .pipe(
                this.destroyer.pipe(),
                map((x): any => x),
                debounceTime(400)
            ).subscribe((newValue): void => this.textChange.emit(newValue));
    }

    public ngOnDestroy() {
        this.destroyer.destroy();
    }

    public showInput() {
        if (this.opened) {
            this.showSearch = this.opened;
        } else {
            this.showSearch = !this.showSearch;
            setTimeout((): void => { if (this.showSearch) document.getElementById('search-input').focus(); }, 0);
        }

    }

    public switch() {
        if (this.opened) {
            this.showSearch = this.opened;
        } else {
            this.showSearch = false;
        }

        if (this.searchCtrl.value !== '') {
            this.searchCtrl.setValue('');
            this.textChange.emit(this.searchCtrl.value);
        }
    }
}
