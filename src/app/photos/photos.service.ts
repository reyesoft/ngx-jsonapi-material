import { Injectable } from '@angular/core';
import { Service, Resource, Autoregister } from 'ngx-jsonapi';

@Injectable()
export class PhotosService extends Service {
    // TODO: add explicit constructor

    // public resource = Photo;
    public type = 'photos';
}

export class Photo extends Resource {
    public attributes = {
        title: '',
        uri: '',
        imageable_id: '',
        created_at: '',
        updated_at: ''
    };
}
