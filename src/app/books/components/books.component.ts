import { Component, OnDestroy } from '@angular/core';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
import { BooksService, Book } from './../books.service';
import { AuthorsService } from './../../authors/authors.service';
import { PhotosService } from '../../photos/photos.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JamRefreshService, Destroyer, SelectionBarService } from 'ngx-jsonapi-material';
import { BookEditComponent } from './book-edit.component';
import { SelectionModel } from '@angular/cdk/collections';
import { BooksSelectionBarComponent } from './books-selection-bar/books-selection-bar.component';

@Component({
    selector: 'demo-books',
    templateUrl: './books.component.html'
})
export class BooksComponent implements OnDestroy {
    public books: DocumentCollection<Book>;
    public filter_text: string = '';
    public remoteFilter: {
        category_name?: string;
    } = {
        category_name: ''
    };

    // Select Rows
    public initialSelection = [];
    public allowMultiSelect = true;
    public selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
    public selection_bar_component;
    public selection_bar_inputs: { [key: string]: any } = { selected: this.selection };

    public destroyer = new Destroyer();

    public constructor(
        public booksService: BooksService,
        public selectionBarService: SelectionBarService,
        private route: ActivatedRoute,
        private matDialog: MatDialog,
        private jamRefreshService: JamRefreshService,
        protected authorsService: AuthorsService,
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

        this.jamRefreshService.refreshSubject.pipe(this.destroyer.pipe()).subscribe(() => {
            this.getAll(this.remoteFilter);
        });
    }

    public ngOnDestroy() {
        this.destroyer.destroy();
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

    public selected(book: Book): void {
        alert('Libro seleccionado' + book.attributes.title);
    }

    public delete(book: Book) {
        this.booksService.delete(book.id);
        this.getAll(new Date(book.attributes.date_published));
    }

    public callCheckboxEvents(event, row?): void {
        if (event.checked) this.openSelection();
        if (event && row) {
            this.selection.toggle(row);
        } else if (event) {
            this.masterToggle();
        }
        this.selectionBarService.selected(this.selection);
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    public masterToggle(): void {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.books.data.forEach(row => {
                this.selection.select(row);
            });
        }
    }

    /** Checks if the number of selected rows matches the total number of rows */
    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.books.data.length;

        return numSelected === numRows;
    }

    public openSelection() {
        let inputs = this.selection_bar_inputs;
        inputs.selection = this.selection;
        this.selectionBarService.init(BooksSelectionBarComponent, inputs, {});
    }
}
