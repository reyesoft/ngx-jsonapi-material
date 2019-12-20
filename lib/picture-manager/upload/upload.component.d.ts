import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader';
export declare class UploadComponent {
    router: Router;
    uploadUrl: string;
    data: {
        [key: string]: string;
    };
    redirect: boolean;
    jamHeaders: {
        [key: string]: any;
    };
    disabled: boolean;
    httpClient: HttpClient;
    options: UploaderOptions;
    formData: FormData;
    files: Array<UploadFile>;
    uploadInput: EventEmitter<UploadInput>;
    showPreview: EventEmitter<any>;
    response: EventEmitter<UploadOutput>;
    dragAndDropChange: EventEmitter<boolean>;
    humanizeBytesFunction: Function;
    dragOver: boolean;
    constructor(router: Router);
    onUploadOutput(output: UploadOutput): void;
    previewImage(file: any): void;
    startUpload(): void;
    cancelUpload(id: string): void;
    removeFile(id: string): void;
    removeAllFiles(): void;
}
