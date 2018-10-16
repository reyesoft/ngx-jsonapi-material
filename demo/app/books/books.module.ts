import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './components/book.component';
import { BooksComponent } from './components/books.component';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { BookEditComponent } from './components/book-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JamSelectModule } from 'src/public_api';

@NgModule({
    imports: [CommonModule, JamSelectModule, SharedModule, BooksRoutingModule, MaterialModule, ReactiveFormsModule, FormsModule],
    entryComponents: [BookEditComponent],
    declarations: [BookComponent, BookEditComponent, BooksComponent]
})
export class BooksModule {}
