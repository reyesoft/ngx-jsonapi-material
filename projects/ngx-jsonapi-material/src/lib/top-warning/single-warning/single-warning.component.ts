/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'jam-single-warning',
    templateUrl: './single-warning.component.html',
    styleUrls: ['./single-warning.component.scss']
})
export class SingleWarningComponent {
    @Input() public message: string;
    @Input() public link: string;
    @Input() public linkQueryParams: {[key: string]: string};
    @Input() public externalLink: string;
    @Input() public linkText: string;
}
