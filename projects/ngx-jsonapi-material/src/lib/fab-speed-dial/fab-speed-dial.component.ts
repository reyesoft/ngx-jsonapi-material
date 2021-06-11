import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FabSpeedDialMiniButton } from './fab-speed-dial-mini-button';

@Component({
    selector: 'jam-fab-speed-dial',
    templateUrl: './fab-speed-dial.component.html',
    styleUrls: ['./fab-speed-dial.component.scss']
})
export class FabSpeedDialComponent implements OnInit {

    @Input() public animationMode: string = 'scale';
    @Input() public tooltip: string = '';
    @Input() public spin: boolean = true;
    @Input() public icon: string = 'add';
    @Input() public routerLink: Array<string> = [];
    @Input() public queryParams: {[key: string]: any};
    @Input() public fabSpeedDialMiniButtons: Array<FabSpeedDialMiniButton> = [];

    @Output() public fabSpeedDialClick: EventEmitter<void> = new EventEmitter();
    @Output() public actionsClick: EventEmitter<string> = new EventEmitter();

    public fab_status = {
        opened: false,
        status: 'closed'
    };

    public constructor(private activatedRoute: ActivatedRoute) {}

    public ngOnInit() {
        if (!this.queryParams) {
            this.queryParams = this.activatedRoute.snapshot.queryParams;
        }
    }

    public toggleFabStatus(status) {
        if (status === 'open') {
            this.fab_status.status = 'opened';
            this.fab_status.opened = true;
        } else {
            this.fab_status.status = 'closed';
            setTimeout((): void => {
                if (this.fab_status.status === 'closed') {
                    this.fab_status.opened = false;
                }
            }, 300);
        }
    }

}
