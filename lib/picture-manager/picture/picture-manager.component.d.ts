import { OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageChange } from './image-change-interface';
import { UploadOutput } from 'ngx-uploader';
export declare class PictureManagerComponent implements OnInit {
    protected httpClient: HttpClient;
    /**
     * Inputs
     * @param type: describes the shape of the image container, this parameter is optional..
     * @param source: is a url to reference an image.
     * @param deleteUrl: is a url for deleting an image, this parameter is optional.
     * @param uploadUrl: is a url for uploading an image, this parameter is optional.
     */
    type: 'square' | 'round';
    source: string;
    deleteUrl: string;
    uploadUrl: string;
    showDeleteOption: boolean;
    jamHeaders: {
        [key: string]: any;
    };
    /**
     * Outputs
     * @param uploadChange: updates the image and returns the url for it.
     */
    uploadChange: EventEmitter<ImageChange>;
    response: EventEmitter<UploadOutput>;
    drag_and_drop: boolean;
    constructor(httpClient: HttpClient);
    ngOnInit(): void;
    dragAndDropStyles(drag_and_drop: boolean): void;
    showPreview(image: string): void;
    delete(): void;
    private settingDefaultValues;
    private creatDeleteUrl;
}
