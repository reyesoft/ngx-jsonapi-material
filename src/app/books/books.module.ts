import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './components/book.component';
import { BooksComponent } from './components/books.component';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../projects/ngx-jsonapi-material/src/lib/material.module';
import { BookEditComponent } from './components/book-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    JamSelectModule,
    JamSubmitModule,
    JamSearchInputModule,
    JamFloatingFiltersModule,
    JamTopWarningModule,
    JamDeleteConfirmationModule
} from 'ngx-jsonapi-material';
import { JamFloatingButtonModule } from 'projects/ngx-jsonapi-material/src/public_api';
import { JamFilterModule } from 'projects/ngx-jsonapi-material/src/lib/filters/filters.module';
import { JsonapiFilterBooksComponent } from './components/jsonapi-filter-categories/jsonapi-filter-categories.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BooksRoutingModule,
        JamSelectModule,
        JamFilterModule,
        JamFloatingButtonModule,
        JamFloatingFiltersModule,
        JamSearchInputModule,
        JamDeleteConfirmationModule,
        JamDeleteConfirmationModule,
        JamTopWarningModule,
        JamSubmitModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    entryComponents: [BookEditComponent],
    declarations: [BookComponent, BookEditComponent, BooksComponent, JsonapiFilterBooksComponent]
})
export class BooksModule {}
