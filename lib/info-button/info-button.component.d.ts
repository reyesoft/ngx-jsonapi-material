import { OnInit } from '@angular/core';
export declare class InfoButtonComponent implements OnInit {
    /** @param externalUrl required property */
    externalUrl: string;
    /**
     * @param icon optional property -
     * @description By default acquires as icon "info"
     */
    icon: 'info' | 'help';
    /** @param jamTooltip optional property */
    jamTooltip: string;
    ngOnInit(): void;
    /** @method checkIcon Checks arriving icon, if not supported, then returns info. */
    private checkIcon;
}
