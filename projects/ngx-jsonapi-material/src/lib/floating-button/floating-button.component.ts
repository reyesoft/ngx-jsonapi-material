/** This's component @deprecated */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'jam-floating-button',
    styleUrls: ['./floating-button.component.scss'],
    templateUrl: './floating-button.component.html'
})
export class FloatingButtonComponent {
    public show: boolean;

    @Input() public rsBackground: string;
    @Input() public iconName: string;
    @Input() public tooltip: string;
    @Input() public target: string;
    @Input() public rsRouterLink: string;
    @Input() public rsQueryParams: object;
}
