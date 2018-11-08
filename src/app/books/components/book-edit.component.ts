import { Component, Inject } from '@angular/core';
import { BooksService, Book } from '../books.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'demo-book-edit.component',
    templateUrl: './book-edit.component.html'
})
export class BookEditComponent {
    public book: Book;
    public title: string;

    public constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private matDialogRef: MatDialogRef<BookEditComponent>,
        private booksService: BooksService
    ) {
        this.book = data || booksService.new();
        this.title = this.book.is_new ? 'Add new book' : 'Edit book';
    }

    public accept(): void {
        this.book.save().subscribe(() => this.matDialogRef.close());
    }

    public cancel(): void {
        this.matDialogRef.close();
    }
}
