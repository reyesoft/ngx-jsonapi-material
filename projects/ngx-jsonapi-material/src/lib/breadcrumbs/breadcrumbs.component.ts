/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'jam-breadcrumbs',
    templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnDestroy {

    @Input() public alias: string;
    // Full breadcrumbs es para crear una lista de bradcrumbs completa
    // hay que pasarle un array de arrays con las pabaras a incluir y el parámetro para routerLink como integrantes
    @Input() public fullBreadcrumbs;
    @Input() public rsRouterLink: Array<string>;

    public breadcrumbs = [];
    public noLinkBreadcrumbList = [];
    public title: string;
    public custom_route_data: {[key: string]: any};
    public query_params_store: {[key: string]: Object} = {};
    private unsubscribe: Subject<void> = new Subject();

    public constructor(
        public router: Router,
        public titleService: Title,
        public translateService: TranslateService,
        public activatedRoute: ActivatedRoute
    ) {
        this.getRouteData(router, activatedRoute)
        .takeUntil(this.unsubscribe)
        .subscribe((event) => {
            if (event.title) {
                titleService.setTitle(translateService.instant(event.title) + ' | Multinexo');
                this.title = event.title;
            }
            this.custom_route_data = event;
            // save query params in query params store to use them when needed
            this.query_params_store[router.url.split('?')[0]] = activatedRoute.snapshot.queryParams;
            this.noLinkBreadcrumbList = router.url.split('/');
            this.breadcrumbs = [];
            this.reloadBreadcrumbs();
        });
    }

    public reloadBreadcrumbs() {
        if (this.fullBreadcrumbs) {
            this.breadcrumbs = this.fullBreadcrumbs;

            return;
        }
        let urlBuilderBoard: string = '';
        for (let urlName of this.noLinkBreadcrumbList) {
            let clean_url_name = urlName.split('?')[0];
            if (urlName) {
                urlBuilderBoard += '/' + clean_url_name;
                this.breadcrumbs.push([clean_url_name, urlBuilderBoard]);
            }
        }
        // done in two lines because Array.push returns a number and used slice to work in a clone
        this.rsRouterLink = this.custom_route_data.parents ? this.custom_route_data.parents.slice(0) : [];
        this.rsRouterLink.push(this.title);
        let filteredRouterLink = [];
        this.breadcrumbs = this.breadcrumbs.filter(value => this.rsRouterLink.indexOf(value[0]) > -1);
        filteredRouterLink = this.rsRouterLink.filter(value => {
            let flatBreadcrumbsList = [];
            for (let breadcrumb of this.breadcrumbs) {
                flatBreadcrumbsList.push(breadcrumb[0]);
            }

            return flatBreadcrumbsList.indexOf(value) === -1;
        });
        // ya probé con this.breadcrumbs.push(...filteredRouterLink); pero no funciona
        while (filteredRouterLink[0]) {
            this.breadcrumbs.push([filteredRouterLink.shift()]);
        }
    }

    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public getRouteData(router: Router, activatedRoute: ActivatedRoute): Observable<Data> {
        return router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;

                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data);
    }
}
