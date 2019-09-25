/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'jam-single-warning',
    templateUrl: './single-warning.component.html',
    styleUrls: ['./single-warning.component.scss']
})
export class SingleWarningComponent implements OnInit {
    @Input() public message: string;
    @Input() public backgroundColor: string;
    @Input() public textColor: string;
    @Input() public link: string;
    @Input() public linkQueryParams: {[key: string]: string};
    @Input() public externalLink: string;
    @Input() public linkText: string;
    @Input() public actionButtonText: string;
    @Input() public actionIconButton: string;
    @Input() public actionIconButtonTooltip: string;
    @Output() public actionButtonClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() public actionIconButtonClick: EventEmitter<void> = new EventEmitter<void>();

    public custom_styles: {
        color?: string;
        'background-color'?: string;
    } = {};

    public ngOnInit() {
        if (this.backgroundColor) {
            this.custom_styles['background-color'] = this.backgroundColor;
        }
        if (this.textColor) {
            this.custom_styles.color = this.textColor;
        }
    }

}
