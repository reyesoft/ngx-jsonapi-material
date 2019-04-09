import { Component, Input } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
    selector: 'jam-option-footer',
    styleUrls: ['./option-footer.component.scss'],
    templateUrl: './option-footer.component.html'
})
export class JamOptionFooterComponent {
    @Input() public url: string;
    @Input() public openNewTab: boolean = false;

    public constructor(
        private router: Router
    ) {}

    public addAuthor(target: '_self' | '_blank' = '_self') {
        window.open(
            this.url,
            target
        );
    }
}
