/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { EventEmitter, OnInit } from '@angular/core';
export declare class SingleWarningComponent implements OnInit {
    message: string;
    backgroundColor: string;
    textColor: string;
    link: string;
    linkQueryParams: {
        [key: string]: string;
    };
    externalLink: string;
    linkText: string;
    actionButtonText: string;
    actionIconButton: string;
    actionIconButtonTooltip: string;
    actionButtonClick: EventEmitter<void>;
    actionIconButtonClick: EventEmitter<void>;
    custom_styles: {
        color?: string;
        'background-color'?: string;
    };
    ngOnInit(): void;
}
