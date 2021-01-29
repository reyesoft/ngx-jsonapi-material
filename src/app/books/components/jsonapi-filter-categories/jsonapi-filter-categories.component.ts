/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';
import { Book, BooksService } from '../../books.service';
import { Filter } from 'ngx-jsonapi-material';

@Component({
    selector: 'demo-jsonapi-filter-categories',
    templateUrl: './jsonapi-filter-categories.component.html'
})
export class JsonapiFilterBooksComponent {
    @Output() public remoteFilterChange = new EventEmitter<any>();

    public remoteFilter = {};
    public books: DocumentCollection<Book>;
    public filter_config_books: Filter = {
        type: 'checks',
        attribute: 'date_published',
        options: {},
        selected: [],
        title: 'Fecha de publicación'
    };

    public constructor(protected booksService: BooksService) {
        let pairDates = ['1900-1950', '1951-2000', '2001-2020'];
        this.booksService.all().subscribe(books => {
            this.books = books;
            for (let dates of pairDates) {
                this.filter_config_books.options[dates] = {
                    text: dates
                };
            }
        });
    }

    // public updateFilter(remoteFilter) {
    //     if (remoteFilter.date_published === '') {
    //         this.remoteFilterChange.emit(remoteFilter);

    //         return;
    //     }

    //     let date = remoteFilter.date_published.split('-');
    //     this.remoteFilter = {
    //         date_published: { since: date[0] + '-01-01', until: date[1] + '-01-01' }
    //     };
    //     this.remoteFilterChange.emit(this.remoteFilter);
    // }
}
