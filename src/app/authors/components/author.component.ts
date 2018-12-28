import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource } from 'ngx-jsonapi';
import { PhotosService } from '../../photos/photos.service';
import { AuthorsService, Author } from '../authors.service';
import { BooksService } from '../../books/books.service';
import { Option } from 'ngx-jsonapi-material';
import { menu_options_model } from './author-button.model';
import { IPage } from 'ngx-jsonapi/interfaces/page';

@Component({
    selector: 'demo-author',
    templateUrl: './author.component.html'
})
export class AuthorComponent {
    public author: Author;
    public relatedbooks: Array<Resource>;
    public page: IPage = {
        number: 1,
        size: 20
    }

    public menu_options: Array<Option> = menu_options_model;

    public constructor(
        protected authorsService: AuthorsService,
        protected photosService: PhotosService,
        protected booksService: BooksService,
        private route: ActivatedRoute
    ) {
        route.params.subscribe(({ id }) => {
            authorsService.get(id, { include: ['books', 'photos'], ttl: 100 }).subscribe(
                author => {
                    this.author = author;
                },
                error => console.error('Could not load author.', error)
            );
        });
    }

    /*
    Add a new author
    */
    public newAuthor() {
        let author = this.authorsService.new();
        author.attributes.name = prompt('New author name:', 'John Doe');
        if (!author.attributes.name) {
            return;
        }
        author.attributes.date_of_birth = '2030-12-10';
        console.log('author data for save', author.toObject());
        author
            .save
            /* { include: ['book'] } */
            ()
            .subscribe(success => {
                console.log('author saved', author.toObject());
            });
    }

    /*
    Update name for actual author
    */
    public updateAuthor() {
        this.author.attributes.name = prompt('Author name:', this.author.attributes.name);
        console.log('author data for save with book include', this.author.toObject({ include: ['books'] }));
        console.log('author data for save without any include', this.author.toObject());
        this.author.save(/* { include: ['book'] } */).subscribe(success => {
            console.log('author saved', this.author.toObject());
        });
    }

    public removeRelationship() {
        this.author.removeRelationship('photos', '1');
        this.author.save();
        console.log('removeRelationship save with photos include', this.author.toObject());
    }

    public selectedOption(option: string): void {
        this[option]();
    }
}
