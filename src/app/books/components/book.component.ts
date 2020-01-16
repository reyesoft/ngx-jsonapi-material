import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
import { AuthorsService, Author } from '../../authors/authors.service';
import { BooksService, Book } from './../books.service';
import { PhotosService } from '../../photos/photos.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTextAttributeDialogComponent } from 'ngx-jsonapi-material';

@Component({
    selector: 'demo-book',
    templateUrl: './book.component.html'
})
export class BookComponent {
    public book: Book;

    public authors: DocumentCollection<Author>;

    public constructor(
        protected authorsService: AuthorsService,
        public booksService: BooksService,
        public matDialog: MatDialog,
        protected photosService: PhotosService,
        private route: ActivatedRoute
    ) {
        route.params.subscribe(({ id }) => {
            let book$ = booksService.get(id, { include: ['author', 'photos'] }).subscribe(
                book => {
                    this.book = book;
                    console.log('success book', this.book);
                },
                error => console.log('error books controll', error)
            );
        });

        authorsService.all({ page: { number: 0, size: 100 }, sort: ['name'] }).subscribe(authors => {
            this.authors = authors;
        });
    }

    public openDialog() {
        this.matDialog.open(EditTextAttributeDialogComponent, {
            width: '500px',
            data: {
                resource: this.book,
                attribute: 'title',
                textarea_label: 'Titulo',
                title: 'Libro'
            }
        });
    }

    public getAuthorName(book: Resource): string {
        let data = <Resource>book.relationships.author.data;

        return data.attributes ? data.attributes.name : '';
    }

    public addAuthor(target: '_self' | '_blank' = '_self') {
        window.open('//multinexo.com', target);
    }
}
