import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Resource } from 'ngx-jsonapi';

@Component({
    selector: 'jam-gallery-manager',
    templateUrl: './gallery-manager.component.html',
    styleUrls: ['./gallery-manager.component.scss']
})
export class GalleryManagerComponent implements OnInit {
    @Input() public pictures: Array<Resource | any>;
    @Input() public uploadUrl: string;
    @Input() public limit: number;
    @Input() public showDeleteOption: boolean = true;
    @Input() public jamHeaders: { [key: string]: any };
    /**
     * @param  {number} highlightedImage
     * Position in the array of the highlighted image, by default is the position 0.
     */
    @Input() public highlightedImage: number = 0;

    @Output() public addPicture = new EventEmitter<string>();
    @Output() public responsePicture = new EventEmitter<Resource>();

    public image_loading: boolean = false;

    public ngOnInit() {
        this.highlightedImage = this.highlightedImage || 0;
    }

    public showPreview(img) {
        this.addPicture.emit(img);
    }

    public response(event): void {
        if (event.type !== 'done') {
            this.image_loading = true;

            return;
        }
        this.image_loading = false;
        this.responsePicture.emit(event.file.response.data);
    }
}
