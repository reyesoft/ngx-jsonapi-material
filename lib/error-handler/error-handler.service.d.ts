import { ErrorHandler, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
export interface IGlobalStateService {
    logout(): void;
}
export declare class JamErrorHandler extends ErrorHandler {
    ngZone: NgZone;
    matDialog: MatDialog;
    toasterService: ToasterService;
    lastErrorCached: {
        title: string;
        time: number;
    };
    token_dialog_is_open: boolean;
    globalStateService: IGlobalStateService;
    show_angular_errors: boolean;
    private form;
    constructor(ngZone: NgZone, matDialog: MatDialog, toasterService: ToasterService);
    handleError(error: any): void;
    handleJsonapiErrors(error: any, use_error_cache?: boolean): void;
    logOut(): void;
    setForm(form: FormGroup): void;
    Notification(title: string, type?: 'success' | 'error' | 'info' | 'warning', body?: string): void;
    singleError(error: any): void;
    unhandledError(message: string): void;
}
