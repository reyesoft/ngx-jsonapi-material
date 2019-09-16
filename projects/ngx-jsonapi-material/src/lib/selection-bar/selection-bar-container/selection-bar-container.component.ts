import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SelectionBarService } from '../selection-bar.service';

@Component({
    selector: 'rs-selection-bar-container',
    templateUrl: './selection-bar-container.component.html',
    styleUrls: ['./selection-bar-container.component.scss']
})
export class SelectionBarContainerComponent {
    public constructor(
        protected selectionBarService: SelectionBarService,
        protected router: Router
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.selectionBarService.destroy();
            }
        });
    }
}
