import { Params, Router, ActivatedRoute } from '@angular/router';
export declare class JamOptionFooterComponent {
    private activatedRoute;
    private router;
    url: string;
    labelOption: string;
    routerLink: Array<string>;
    queryParams: Params;
    openNewTab: boolean;
    constructor(activatedRoute: ActivatedRoute, router: Router);
    goTo(target?: '_self' | '_blank'): void;
}
