import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageChange } from './image-change-interface';
import { UploadOutput } from 'ngx-uploader';

@Component({
    selector: 'jam-picture-manager',
    templateUrl: './picture-manager.component.html',
    styleUrls: ['./picture-manager.component.scss']
})
export class PictureManagerComponent implements OnInit {
    /**
     * Inputs
     * @param type: describes the shape of the image container, this parameter is optional..
     * @param source: is a url to reference an image.
     * @param deleteUrl: is a url for deleting an image, this parameter is optional.
     * @param uploadUrl: is a url for uploading an image, this parameter is optional.
     */
    @Input() public type: 'square' | 'round';
    @Input() public source: string;
    @Input() public deleteUrl: string;
    @Input() public uploadUrl: string;
    @Input() public showDeleteOption: boolean = true;
    @Input() public jamHeaders: { [key: string]: any };

    /**
     * Outputs
     * @param uploadChange: updates the image and returns the url for it.
     */
    @Output() public uploadChange = new EventEmitter<ImageChange>();
    @Output() public response = new EventEmitter<UploadOutput>();

    public drag_and_drop: boolean = false;

    public constructor(protected httpClient: HttpClient) {}

    public ngOnInit() {
        this.settingDefaultValues();
    }

    public dragAndDropStyles(drag_and_drop: boolean) {
        this.drag_and_drop = drag_and_drop;
    }

    public showPreview(image: string): void {
        this.source = image;
        this.deleteUrl = this.deleteUrl || this.source;
        this.uploadChange.emit({ status_change: 'update', source: this.source });
    }

    public delete() {
        let delete_url = this.creatDeleteUrl(this.source);
        this.httpClient.delete(delete_url, {
            headers: this.jamHeaders
        }).subscribe(
            (response): void => {
                this.uploadChange.emit({ status_change: 'delete', source: this.source });
            }
        );
    }

    private settingDefaultValues() {
        this.type = this.type || 'square';
        this.deleteUrl = this.deleteUrl || this.source;
        this.uploadUrl = this.uploadUrl || this.source;
    }

    private creatDeleteUrl(source: string): string {
        let img_url_parties: Array<string> = source.split('/');
        let img_name: string = img_url_parties.pop();

        return this.deleteUrl + img_name;
    }
}
