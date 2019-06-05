import { Component, Input } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jam-option-footer',
    styleUrls: ['./option-footer.component.scss'],
    templateUrl: './option-footer.component.html'
})
export class JamOptionFooterComponent {
    @Input() public url: string;
    @Input() public labelOption: string;
    @Input() public routerLink: Array<string>;
    @Input() public queryParams: Params;
    @Input() public openNewTab: boolean = false;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    public goTo(target: '_self' | '_blank' = '_self') {
        if (this.routerLink) {
            this.router.navigate(this.routerLink, {
                relativeTo: this.activatedRoute,
                queryParams: this.queryParams
            });
        } else if (this.url) {
            window.open(
                this.url,
                target
            );
        }
    }
}
