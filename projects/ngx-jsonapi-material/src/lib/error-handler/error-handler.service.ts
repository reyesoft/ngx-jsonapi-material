import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JsonapiCore } from 'ngx-jsonapi';
import { ToasterService } from 'angular2-toaster';
import { DialogLoggedStateComponent } from '../logged-state/dialog-logged-state.component';

export interface IGlobalStateService {
    logout(): void;
}

@Injectable()
export class JamErrorHandler extends ErrorHandler {
    public lastErrorCached = { title: '', time: 0 };
    public token_dialog_is_open: boolean;
    public globalStateService: IGlobalStateService;
    public show_angular_errors = true;

    private form: FormGroup;

    public constructor(
        public ngZone: NgZone,
        public matDialog: MatDialog,
        public toasterService: ToasterService
    ) {
        super();
    }

    public handleError(error) {
        if (error.status === 404) {
            this.Notification('Error al contactar con el servidor, intenta nuevamente más tarde.');

            return;
        }
        if (error.status === 500 || error.message && error.message === 'Server Error') {
            this.unhandledError(error.status);

            return;
        }
        if (error.errors) {
            this.handleJsonapiErrors(error);

            return;
        }
        if (error.rejection) {
            // this first case is for guest module rejections
            if (error.rejection.error && error.rejection.error.errors) this.handleJsonapiErrors(error.rejection.error);
            if (error.rejection.errors) this.handleJsonapiErrors(error.rejection);
            console.error('Rejection:', error.rejection);

            return;
        }

        if (error.status) {
            this.unhandledError(error.status);
        } else if (error.message && this.show_angular_errors) {
            this.unhandledError(error.message);
        }

        super.handleError(error);
    }

    public handleJsonapiErrors(error, use_error_cache = true) {
        for (let actual_error of error.errors) {

            if (use_error_cache) {
                // si es ultimo mensaje recibido y solo han pasado 2 segundos, no muestra error
                if (this.lastErrorCached.title === actual_error.title && this.lastErrorCached.time > Date.now() - 2000) return;

                this.lastErrorCached.title = actual_error.title;
                this.lastErrorCached.time = Date.now();
            }

            switch (actual_error.title) {
                case 'Internal server error':
                    this.Notification(actual_error.detail, 'error');

                    return;
                case 'Bad request':
                    if (actual_error.detail.includes('Token required')) {
                        this.ngZone.run(async (): Promise<any> => this.logOut());

                        return;
                    }
                    break;
                case 'Invalid data received':
                    if (actual_error.detail === 'The refresh token must be at least 20 characters.') {
                        this.ngZone.run(async (): Promise<any> => this.logOut());

                        return;
                    }
                    break;
                case 'Token has expired':
                case 'Token not provided':
                    this.ngZone.run(async (): Promise<any> => this.logOut());

                    return;
                case 'Too many attempts':
                    this.Notification('Has agotado el límite de intentos, espera un momento antes de continuar.', 'error');

                    return;
            }

            // cannot use special conditions to SWITCH statement without changing the data inside switch to "true"
            if (actual_error.detail.includes('Token required')) {
                this.ngZone.run(async (): Promise<any> => this.logOut());

                return;
            }

            switch (actual_error.detail) {
                case 'Expired access token.':
                case 'The refresh token is invalid. Cannot decrypt the refresh token':
                case 'Invalid access token':
                    this.ngZone.run(async (): Promise<any> => this.logOut());

                    return;
            }

            this.singleError(actual_error);
        }
    }

    public logOut(): void {
        if (this.token_dialog_is_open) {
            return;
        }
        this.token_dialog_is_open = true;
        const dialog_ref = this.matDialog.open(DialogLoggedStateComponent, {
            width: '600px',
            disableClose: true
        });

        dialog_ref.afterClosed().subscribe((): void => {
            this.token_dialog_is_open = false;
            this.globalStateService.logout();
        });
    }

    public setForm(form: FormGroup) {
        this.form = form;
    }

    public Notification(title: string, type?: 'success' | 'error' | 'info' | 'warning', body?: string) {
        let messages = title.split('|');
        type = type || 'error';
        if (messages.length === 1) {
            this.toasterService.pop(type, title, body);

            return;
        }
        for (let each of messages) {
            if (each !== '\n') {
                this.toasterService.pop(type, each);
            }
        }
    }

    public singleError(error) {
        if (!error.detail && !error.title) {
            console.warn('Error cant be handled:', error);

            return;
        }

        if (this.form && error.source && this.form.get(error.source.attribute)) {
            this.form.get(error.source.attribute).setErrors({ 'server-error': error.detail });
        } else {
            this.Notification(error.detail || error.title);
        }
    }

    public unhandledError(message: string) {
        this.Notification(
            'Ups, ha ocurrido un error. Contáctanos por correo a soporte@multinexo.com',
            'error',
            `Código de error: ${message}`
        );
    }
}
