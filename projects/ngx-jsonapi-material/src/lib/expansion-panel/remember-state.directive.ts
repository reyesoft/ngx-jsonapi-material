import { Directive, AfterViewInit, ContentChild, ElementRef, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { Router } from '@angular/router';

@Directive({
    selector: '[jamExpansionPanelStatus]'
})
export class RemembermeStateDirective implements AfterViewInit {
    @ContentChild(MatExpansionPanel) public mat_expansion_panel: MatExpansionPanel;

    private mat_expansion_pane_id: string;

    public constructor(
        private router: Router,
        private elementRef: ElementRef
    ) {
        this.mat_expansion_pane_id = elementRef.nativeElement.id;
    }

    public ngAfterViewInit() {
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
    }
}
