export class FabSpeedDialMiniButton {
    public key: string;
    public navigate: boolean = false;
    public tooltip: string;
    public router_link: Array<string>;
    public query_params: {[key: string]: any};
    public icon: { name: string; type: 'svg-icon'|'mat-icon' } = { name: 'add', type: 'mat-icon' };

    public constructor(
        key: string,
        tooltip: string,
        router_link?: Array<string>,
        query_params?: {[key: string]: any}
    ) {
        this.key = key;
        this.tooltip = tooltip;
        if (router_link) {
            this.router_link = router_link;
            this.query_params = query_params || {};
        }
    }

    public setRouterLink(router_link: Array<string>): this {
        this.router_link = router_link;
        this.navigate = true;

        return this;
    }

    public getRouterLink() {
        return this.router_link;
    }

    public setQueryParams(query_params: {[key: string]: any}): this {
        this.query_params = query_params;

        return this;
    }

    public getQueryParams(): {[key: string]: any} {
        return this.query_params;
    }

    public shouldNavigate() {
        return this.navigate;
    }

}
