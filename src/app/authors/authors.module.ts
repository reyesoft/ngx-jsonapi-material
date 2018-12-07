import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './components/author.component';
import { AuthorsComponent } from './components/authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { JamChipsAutocompleteModule } from 'ngx-jsonapi-material';

@NgModule({
    imports: [CommonModule, SharedModule, AuthorsRoutingModule, MaterialModule, JamChipsAutocompleteModule],
    declarations: [AuthorComponent, AuthorsComponent]
})
export class AuthorsModule {}
