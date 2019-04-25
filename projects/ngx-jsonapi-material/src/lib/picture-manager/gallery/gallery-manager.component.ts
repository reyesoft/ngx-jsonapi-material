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

    @Output() public addPicture = new EventEmitter<string>();

    public hide_if_have_limit: boolean;

    public ngOnInit() {
        // TODO: arreglar y descomentar en COL-1500
        // this.hide_if_have_limit = this.validateIfHaveLimit();
    }

    public showPreview(img) {
        this.addPicture.emit(img);
    }

    public validateIfHaveLimit() {
        return this.limit ? this.pictures.length > this.limit : false;
    }
}
