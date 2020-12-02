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
    JamSelectionBarModule,
    JamSelectModule,
    JamSubmitModule,
    JamRefreshModule,
    JamSearchInputModule,
    JamChipsAutocompleteModule,
    JamFloatingFiltersModule,
    JamTopWarningModule,
    JamAutocompleteModule,
    JamDeleteConfirmationModule,
    JamEditTextAttributeModule
} from 'ngx-jsonapi-material';
import { JamFloatingButtonModule, JamInfoButtonModule } from 'projects/ngx-jsonapi-material/src/public-api';
import { JamFilterModule } from 'projects/ngx-jsonapi-material/src/lib/filters/filters.module';
import { JsonapiFilterBooksComponent } from './components/jsonapi-filter-categories/jsonapi-filter-categories.component';
import { BooksSelectionBarComponent } from './components/books-selection-bar/books-selection-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        JamInfoButtonModule,
        SharedModule,
        FlexLayoutModule,
        BooksRoutingModule,
        JamSelectModule,
        JamRefreshModule,
        JamSelectionBarModule,
        JamChipsAutocompleteModule,
        JamFilterModule,
        JamFloatingButtonModule,
        JamFloatingFiltersModule,
        JamSearchInputModule,
        JamDeleteConfirmationModule,
        JamAutocompleteModule,
        JamEditTextAttributeModule,
        JamTopWarningModule,
        JamSubmitModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    entryComponents: [BookEditComponent, BooksSelectionBarComponent],
    declarations: [BooksSelectionBarComponent, BookComponent, BookEditComponent, BooksComponent, JsonapiFilterBooksComponent]
})
export class BooksModule {}
