import { Directive, AfterViewInit, ContentChild, ElementRef, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
    selector: '[jamExpansionPanelStatus]'
})
export class RemembermeStateDirective implements AfterViewInit {
    @ContentChild(MatExpansionPanel) public mat_expansion_panel: MatExpansionPanel;

    private query_params: Params;
    private mat_expansion_pane_id: string;

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private elementRef: ElementRef
    ) {
        this.mat_expansion_pane_id = elementRef.nativeElement.id;
    }

    public ngAfterViewInit() {
        this.activatedRoute.queryParams
        .pipe(filter(query_params => query_params[this.mat_expansion_pane_id]))
        .subscribe(query_params => {
            this.query_params = query_params;
            if (this.mat_expansion_panel) {
                this.mat_expansion_panel.expanded = query_params[this.mat_expansion_pane_id];
            }
        });

        if (localStorage.getItem(this.mat_expansion_pane_id)) {
            this.mat_expansion_panel.expanded = localStorage.getItem(this.mat_expansion_pane_id);
        }

        this.changeExpandedExpansionPanel();
    }

    @HostListener('click', ['$event'])
    private onClick(event) {
        this.updateLocalStoreage();
    }

    private changeExpandedExpansionPanel(): void {
        this.updateLocalStoreage();
    }

    private updateLocalStoreage(): void {
        localStorage.setItem(this.mat_expansion_pane_id, this.mat_expansion_panel.expanded);
        this.updateQueryParams();
    }

    private updateQueryParams(): void {
        this.router.navigate(['.'], {
            queryParams: {...this.query_params, ...{ [this.mat_expansion_pane_id]: this.mat_expansion_panel.expanded }},
            relativeTo: this.activatedRoute
        });
    }
}
