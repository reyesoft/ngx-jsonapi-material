import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './components/author.component';
import { AuthorsComponent } from './components/authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { JamChipsAutocompleteModule, JamMenuModule, JamSubmitModule, JamDynamicFormsModule } from 'ngx-jsonapi-material';
import { CreateAuthorComponent } from './components/create-author/create-author.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthorsRoutingModule,
        MaterialModule,
        JamDynamicFormsModule,
        JamSubmitModule,
        JamMenuModule,
        JamChipsAutocompleteModule
    ],
    entryComponents: [CreateAuthorComponent],
    declarations: [AuthorComponent, CreateAuthorComponent, AuthorsComponent]
})
export class AuthorsModule {}
