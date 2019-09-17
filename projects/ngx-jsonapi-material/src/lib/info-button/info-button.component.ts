import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'jam-info-button',
    templateUrl: './info-button.component.html'
})
export class InfoButtonComponent implements OnInit {
    /** @param externalUrl required property */
    @Input() public externalUrl: string;

    /**
     * @param icon optional property -
     * @description By default acquires as icon "info"
     */
    @Input() public icon: 'info' | 'help' = 'info';

    /** @param matTooltip optional property */
    @Input() public matTooltip: string = 'Más información';

    public ngOnInit(): void {
        this.icon = this.checkIcon();
    }

    /** @method checkIcon Checks arriving icon, if not supported, then returns info. */
    private checkIcon(): 'info' | 'help' {
        console.warn(`"${this.icon}" icon is not supported 🤷‍♂️, Try "info" or "help."`);

        return !['info', 'help'].includes(this.icon) ? 'info' : this.icon;
    }
}
