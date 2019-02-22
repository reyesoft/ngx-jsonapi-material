import { Directive, AfterViewInit, Input } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';

@Directive({
  selector: '[jamTabs]'
})
export class JamTabsDirective implements AfterViewInit {

    @Input() public tabNames: {[key: string]: number};
    @Input() public tabGroup: MatTabGroup;
    @Input() public defaultTabIndex: number = 0;
    public selected_tab: number;
    public query_params: Params;

    public constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute
    ) {
        activatedRoute.queryParams.subscribe(queryParams => this.query_params = queryParams);
    }

    public ngAfterViewInit() {
        this.selected_tab = this.tabNames[this.query_params.tab_selected || Object.keys(this.tabNames)[this.defaultTabIndex]];
        this.tabGroup.selectedIndex = this.selected_tab;
        this.tabGroup.selectedIndexChange.subscribe(index => this.onTabChange(index));
    }

    public onTabChange(new_index: number): void {
        let tab_selected;
        for (let each in this.tabNames) {
            if (this.tabNames[each] !== new_index) continue;
            tab_selected = each;
        }
        this.router.navigate([], { queryParams: { ...this.query_params, ...{tab_selected: tab_selected} } });
    }

}
