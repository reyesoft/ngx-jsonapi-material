import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
    selector: 'jam-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {
    @Input() public uploadUrl: string;
    @Input() public data: { [key: string]: string } = {};
    @Input() public redirect: boolean;
    @Input() public jamHeaders: { [key: string]: any };
    public httpClient: HttpClient;
    public options: UploaderOptions;
    public formData: FormData;
    public files: Array<UploadFile>;
    @Output() public uploadInput: EventEmitter<UploadInput>;
    @Output() public showPreview: EventEmitter<any> = new EventEmitter();
    @Output() public response: EventEmitter<UploadOutput> = new EventEmitter();
    @Output() public dragAndDropChange: EventEmitter<boolean> = new EventEmitter();
    public humanizeBytesFunction: Function;
    public dragOver: boolean = false;

    public constructor(public router: Router) {
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytesFunction = humanizeBytes;
    }

    public onUploadOutput(output: UploadOutput): void {
        switch (output.type) {
            case 'allAddedToQueue':
                this.startUpload();
                break;
            case 'addedToQueue':
                if (typeof output.file !== 'undefined') {
                    this.previewImage(output.file);
                    this.files.push(output.file);
                }
                break;
            case 'uploading':
                if (typeof output.file !== 'undefined') {
                    // update current data in files array for uploading file
                    const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
                    this.files[index] = output.file;
                }
                break;
            case 'removed':
                // remove file from array when removed
                this.files = this.files.filter((file: UploadFile) => file !== output.file);
                break;
            case 'dragOver':
                this.dragOver = true;
                this.dragAndDropChange.emit(this.dragOver);
                break;
            case 'dragOut':
            case 'drop':
                this.dragOver = false;
                this.dragAndDropChange.emit(this.dragOver);
                break;
            case 'done':
                if (this.redirect) {
                    this.router.navigate([this.router.url + '/' + output.file.response.id]);
                }
                break;
        }
        this.response.emit(output);
    }

    // The preview function
    public previewImage(file: any) {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file.nativeFile || file.target.files[0]);
        fileReader.onload = (image: any): any => {
            this.showPreview.emit(image.target.result);
        };
    }

    public startUpload(): void {
        const event: UploadInput = {
            type: 'uploadAll',
            url: this.uploadUrl,
            method: 'POST',
            data: this.data, // agergar datos
            headers: this.jamHeaders
        };
        this.uploadInput.emit(event);
    }

    public cancelUpload(id: string): void {
        this.uploadInput.emit({ type: 'cancel', id: id });
    }

    public removeFile(id: string): void {
        this.uploadInput.emit({ type: 'remove', id: id });
    }

    public removeAllFiles(): void {
        this.uploadInput.emit({ type: 'removeAll' });
    }
}
