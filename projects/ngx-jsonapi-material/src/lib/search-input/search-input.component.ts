/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
    selector: 'jam-search-input',
    styleUrls: ['./search-input.component.scss'],
    templateUrl: './search-input.component.html'
})
export class SearchInputComponent implements OnInit {
    @Input() public text: string;
    @Output() public textChange: EventEmitter<any> = new EventEmitter();

    public searchCtrl: FormControl = new FormControl();

    public showSearch = false;

    public ngOnInit() {
        this.searchCtrl.valueChanges
            .pipe(
                map(x => x),
                debounceTime(400)
            ).subscribe(newValue => this.textChange.emit(newValue));
    }

    public showInput() {
        this.showSearch = !this.showSearch;
        setTimeout(() => { if (this.showSearch) document.getElementById('search-input').focus(); }, 0);
    }

    public switch() {
        this.showSearch = false;
        if (this.searchCtrl.value !== '') {
            this.searchCtrl.setValue('');
            this.textChange.emit(this.searchCtrl.value);
        }
    }
}
