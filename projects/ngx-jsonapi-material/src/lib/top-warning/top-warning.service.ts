/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { Injectable } from '@angular/core';

/**
 * @param id: The id must be composed of the resource followed by a period and a short,
 * descriptive message of the warning in question.
 * @param message: It must be a descriptive warning message.
 * @param link: It is optional, and must contain a route.
 */
export interface IWarning {
    id: string;
    attributes: {
        message: string;
        link?: string;
        linkQueryParams?: {[key: string]: string};
        extenalLink?: string;
        linkText?: string;
    };
}

@Injectable()
export class TopWarningService {
    public warnings: Array<IWarning> = [];

    /**
     * Receives a warning resource.
     *
     * @param warning
     */
    public setWarningMessage(warning: IWarning): void {
        if (!warning) return;

        if (this.warnings.length <= 0) {
            this.warnings.push(warning);
        }

        let search_warning = this.warnings.find(msj_warning => msj_warning.id === warning.id);
        if (search_warning === undefined || search_warning.id !== warning.id) {
            this.warnings.push(warning);
        }
    }

    public getWarningMessage(): Array<IWarning> {
        return this.warnings;
    }

    public clearMessage(warning_keys: Array<string>): void {
        for (let warning of this.warnings) {
            if (!warning_keys.includes(warning.id)) continue;
            let index = this.warnings.indexOf(warning);
            this.warnings.splice(index, 1);
        }
    }
}
