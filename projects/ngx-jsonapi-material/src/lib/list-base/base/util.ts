/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

export function isFunction(arg: any): boolean {
    return typeof arg === 'function';
}

export function isUndefined(arg: any): boolean {
    return arg === void 0;
}

export function getToday(): Date {
    return new Date();
}

export function subtractDays(number_of_days_to_subtract: number, from: Date = new Date()): Date {
    return new Date(new Date(from).setDate(from.getDate() - number_of_days_to_subtract));
}

export function randomId(): string {
    return 'new_' + Math.floor(Math.random() * 1000);
}
