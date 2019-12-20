import { EventEmitter } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Resource } from 'ngx-jsonapi';
export declare class FloatingInputComponent {
    router: Router;
    searchParams: UrlTree;
    status: boolean;
    entryValue: number;
    resource: Resource;
    horPosition: 'start' | 'end';
    lock: boolean;
    entryValueChange: EventEmitter<number>;
    resourceChange: EventEmitter<Resource>;
    constructor(router: Router);
    statusToggle(status: boolean): void;
    bindingEntryValue(value: number): void;
    keyPress(keyCode: number): void;
    private focusInput;
}
