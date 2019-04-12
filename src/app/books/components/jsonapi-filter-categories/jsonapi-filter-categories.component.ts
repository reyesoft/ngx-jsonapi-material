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
    @Input() public remoteFilter;
    @Output() public remoteFilterChange = new EventEmitter<any>();

    public books: DocumentCollection<Book>;
    public filter_config_books: Filter = {
        type: 'checks',
        attribute: 'category_id',
        options: {},
        selected: [],
        title: 'Categorias'
    };

    public constructor(protected booksService: BooksService) {
        this.booksService.all().subscribe(books => {
            this.books = books;
            let count = 0;
            // example...
            for (let category of [
                'Arts & Music',
                'Biographies',
                'Business',
                'Kids',
                'Comics',
                'Computers & Tech',
                'Cooking',
                'Hobbies & Crafts'
            ]) {
                this.filter_config_books.options[count] = {
                    text: category
                };

                count++;
            }
        });
    }

    public updateFilter(remoteFilter) {
        this.remoteFilterChange.emit(remoteFilter);
    }
}
