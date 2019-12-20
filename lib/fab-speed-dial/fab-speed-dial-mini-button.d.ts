export declare class FabSpeedDialMiniButton {
    key: string;
    navigate: boolean;
    tooltip: string;
    router_link: Array<string>;
    query_params: {
        [key: string]: any;
    };
    icon: {
        name: string;
        type: 'svg-icon' | 'mat-icon';
    };
    constructor(key: string, tooltip: string, router_link?: Array<string>, query_params?: {
        [key: string]: any;
    });
    setRouterLink(router_link: Array<string>): this;
    getRouterLink(): string[];
    setQueryParams(query_params: {
        [key: string]: any;
    }): this;
    getQueryParams(): {
        [key: string]: any;
    };
    shouldNavigate(): boolean;
}
