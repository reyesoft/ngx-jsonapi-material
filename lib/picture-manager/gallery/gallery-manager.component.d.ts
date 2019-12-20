import { OnInit, EventEmitter } from '@angular/core';
import { Resource } from 'ngx-jsonapi';
export declare class GalleryManagerComponent implements OnInit {
    pictures: Array<Resource | any>;
    uploadUrl: string;
    updatePicture: string;
    limit: number;
    showDeleteOption: boolean;
    jamHeaders: {
        [key: string]: any;
    };
    /**
     * @param  {number} highlightedImage
     * Position in the array of the highlighted image, by default is the position 0.
     */
    highlightedImage: number;
    addPicture: EventEmitter<string>;
    responsePicture: EventEmitter<Resource>;
    image_loading: boolean;
    ngOnInit(): void;
    showPreview(img: any): void;
    response(event: any): void;
}
