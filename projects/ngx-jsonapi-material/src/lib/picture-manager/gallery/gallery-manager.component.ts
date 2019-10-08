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

    public hide_if_have_limit: boolean;

    public ngOnInit() {
        // TODO: arreglar y descomentar en COL-1500
        // this.hide_if_have_limit = this.validateIfHaveLimit();
        this.highlightedImage = this.highlightedImage || 0;
    }

    public showPreview(img) {
        this.addPicture.emit(img);
    }

    public validateIfHaveLimit() {
        return this.limit ? this.pictures.length > this.limit : false;
    }
}
