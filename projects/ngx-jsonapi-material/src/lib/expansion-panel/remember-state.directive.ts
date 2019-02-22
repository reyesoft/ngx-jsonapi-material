import { Directive, AfterViewInit, ContentChild, ElementRef, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Directive({
    selector: '[jamExpansionPanelStatus]'
})
export class RemembermeStateDirective implements AfterViewInit {
    @ContentChild(MatExpansionPanel) public mat_expansion_panel: MatExpansionPanel;

    private query_params: Params;
    private mat_expansion_pane_id: string;
    private all_mat_expansion_ids: Array<string> = [];

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private elementRef: ElementRef
    ) {
        activatedRoute.queryParams.subscribe(query_params => {
            this.query_params = query_params;
        });

        this.mat_expansion_pane_id = elementRef.nativeElement.id;
    }

    public ngAfterViewInit() {
        if (![null, undefined, ''].includes(this.query_params.expansion_panel)) {
            this.all_mat_expansion_ids = this.query_params.expansion_panel.split(',');
        }

        this.changeExpandedExpansionPanel();
    }

    @HostListener('click', ['$event'])
    private onClick(event) {
        if ((this.all_mat_expansion_ids.indexOf(this.mat_expansion_pane_id) === -1) && this.mat_expansion_panel.expanded) {
            this.all_mat_expansion_ids.push(this.mat_expansion_pane_id);
        } else if (!this.mat_expansion_panel.expanded && (this.all_mat_expansion_ids.indexOf(this.mat_expansion_pane_id) !== -1)) {
            this.all_mat_expansion_ids.splice(this.all_mat_expansion_ids.indexOf((this.mat_expansion_pane_id)), 1);
        }
        this.updateLocalStoreage();
    }

    private changeExpandedExpansionPanel(): void {
        if ((this.all_mat_expansion_ids.indexOf(this.mat_expansion_pane_id) !== -1) && !this.mat_expansion_panel.expanded) {
            this.mat_expansion_panel.open();
        }

        if ((this.all_mat_expansion_ids.indexOf(this.mat_expansion_pane_id) === -1) && this.mat_expansion_panel.expanded) {
            this.all_mat_expansion_ids.push(this.mat_expansion_pane_id);
            this.updateLocalStoreage();
        }
    }

    private updateLocalStoreage(): void {
        localStorage.setItem('expansion_panel', this.all_mat_expansion_ids.toString());
        this.updateQueryParams();
    }

    private updateQueryParams(): void {
        this.router.navigate(['.'], {
            queryParams: {...this.query_params, ...{ expansion_panel: this.all_mat_expansion_ids.toString() }},
            relativeTo: this.activatedRoute
        });
    }
}
