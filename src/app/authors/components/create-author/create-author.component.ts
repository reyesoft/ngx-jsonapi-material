import { Component, Inject } from '@angular/core';
import { AuthorsService, Author } from '../../authors.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { DynamicInput } from 'ngx-jsonapi-material';
import { author_form_model } from './author-form.model';

@Component({
    selector: 'demo-create-author.component',
    template: `
        <h1 matDialogTitle>{{ title }}</h1>
        <jam-formly-form-flex [form]="form" [fields]="fields" [model]="model" fxLayout="row" class="width-100"> </jam-formly-form-flex>

        <mat-dialog-actions align="end"> <jam-submit (cancel)="cancel()" (accept)="accept()"></jam-submit> </mat-dialog-actions>
    `
})
export class CreateAuthorComponent {
    public author: Author;
    public title: string;

    // dynamic-forms
    public form = new FormGroup({});
    public model: { [key: string]: any } = {};
    public fields: Array<DynamicInput>;

    public constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private matDialogRef: MatDialogRef<CreateAuthorComponent>,
        private authorsService: AuthorsService
    ) {
        this.author = data || authorsService.new();
        this.title = 'Add new author';
        this.fields = author_form_model;
    }

    public accept(): void {
        for (let key in this.model) {
            this.author[key] = this.model[key];
        }
        this.author.save().subscribe(() => this.matDialogRef.close(true));
    }

    public cancel(): void {
        this.matDialogRef.close();
    }
}
