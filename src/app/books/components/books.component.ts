import { Component } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
import { BooksService, Book } from './../books.service';
import { AuthorsService } from './../../authors/authors.service';
import { PhotosService } from '../../photos/photos.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { BookEditComponent } from './book-edit.component';
@Component({
    selector: 'demo-books',
    templateUrl: './books.component.html'
})
export class BooksComponent {
    public books: DocumentCollection<Book>;
    public filter_text: string = '';
    public remoteFilter: {
        category_name?: string;
    } = {
        category_name: ''
    };

    public constructor(
        private route: ActivatedRoute,
        private matDialog: MatDialog,
        protected authorsService: AuthorsService,
        protected booksService: BooksService,
        protected photosService: PhotosService
    ) {
        route.queryParams.subscribe(({ page }) => {
            booksService
                .all({
                    page: { number: page || 1 },
                    include: ['author', 'photos']
                })
                .subscribe(
                    books => {
                        this.books = books;
                        console.info('success books controll', this.books);
                    },
                    (error): void => console.info('error books controll', error)
                );
        });
    }

    public getAll(remotefilter) {
        // we add some remote filter
        remotefilter.date_published = {
            since: '1983-01-01',
            until: '2010-01-01'
        };

        let books$ = this.booksService.all({
            remotefilter: remotefilter,
            page: { number: 1 },
            include: ['author', 'photos']
        });
        books$.subscribe(
            books => {
                this.books = books;

                console.log('success books controller', this.books);
            },
            error => console.info('error books controller', error)
        );
        books$.toPromise().then(success => console.log('books loaded PROMISE'));
    }

    public openDialog(book?: Book): void {
        this.matDialog.open(BookEditComponent, {
            data: book || null
        });
    }

    public delete(book: Book) {
        this.booksService.delete(book.id);
        this.getAll(new Date(book.attributes.date_published));
    }
}
