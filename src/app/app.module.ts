import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';
import { PhotosService } from './photos/photos.service';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from '../../projects/ngx-jsonapi-material/src/lib/material.module';
import { JamPinOptionButtonModule } from 'ngx-jsonapi-material';
import { JamSelectionBarModule, JamPictureManagerModule } from 'projects/ngx-jsonapi-material/src/public-api';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authors',
        pathMatch: 'full'
    },
    {
        path: 'authors',
        loadChildren: (): Promise<AuthorsModule> => import('./authors/authors.module').then((m): AuthorsModule => m.AuthorsModule)
    },
    {
        path: 'books',
        loadChildren: (): Promise<BooksModule> => import('./books/books.module').then((m): BooksModule => m.BooksModule)
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        JamPinOptionButtonModule,
        BrowserAnimationsModule,
        JamSelectionBarModule,
        JamPictureManagerModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        MaterialModule,
        NgxJsonapiModule.forRoot({
            url: environment.jsonapi_url
        })
    ],
    providers: [AuthorsService, BooksService, PhotosService],
    bootstrap: [AppComponent]
})
export class AppModule {}
