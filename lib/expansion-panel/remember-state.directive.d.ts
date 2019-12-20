import { AfterViewInit, ElementRef } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { Router } from '@angular/router';
export declare class RemembermeStateDirective implements AfterViewInit {
    private router;
    private elementRef;
    mat_expansion_panel: MatExpansionPanel;
    private mat_expansion_pane_id;
    constructor(router: Router, elementRef: ElementRef);
    ngAfterViewInit(): void;
    private onClick;
    private changeExpandedExpansionPanel;
    private updateLocalStoreage;
}
