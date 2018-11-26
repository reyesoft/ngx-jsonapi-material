import { Component, Input, HostListener } from '@angular/core';
import { TopWarningService } from './top-warning.service';

@Component({
    selector: 'jam-top-warning',
    templateUrl: './top-warning.component.html',
    styleUrls: ['./top-warning.component.scss']
})
export class TopWarningComponent {
    @Input() public opened: boolean = true;
    public button_state: 'expanded' | 'contracted' | 'standby' = 'standby';
    public button_icons = {
        expanded: 'keyboard_arrow_down',
        contracted: 'keyboard_arrow_up',
        standby: 'remove'
    };

    public constructor(public topWarningService: TopWarningService) {
        this.defaultAccordionState();
    }

    @HostListener('mouseenter')
    public onMouseEnter() {
        this.opened ? this.button_state = 'contracted' : this.button_state = 'expanded';
    }

    @HostListener('mouseleave')
    public onMouseLeave() {
        this.button_state = 'standby';
    }

    public toggleOpenAccordion(opened: boolean): void {
        this.opened = opened;
        localStorage.setItem('opened', this.opened.toString());
    }

    public defaultAccordionState(): void {
        this.opened = localStorage.getItem('opened') === 'false' ? false : true;
    }
}
