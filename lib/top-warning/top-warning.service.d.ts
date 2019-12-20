/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
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
        linkQueryParams?: {
            [key: string]: string;
        };
        externalLink?: string;
        linkText?: string;
    };
}
export declare class TopWarningService {
    warnings: Array<IWarning>;
    /**
     * Receives a warning resource.
     *
     * @param warning
     */
    setWarningMessage(warning: IWarning): void;
    getWarningMessage(): Array<IWarning>;
    clearMessage(warning_keys: Array<string>): void;
}
