import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
// import { GlobalStateService } from 'app/shared/services/global-state.service';
// import { DialogLoggedStateComponent } from 'app/shared/services/logged-state/dialog-logged-state.component';
import { MatDialog } from '@angular/material/dialog';
import { JsonapiCore } from 'ngx-jsonapi';
// import { RequestStatusService } from 'app/shared/services/request-status.service';
import { ToasterService } from 'angular2-toaster';
import { DialogLoggedStateComponent } from '../logged-state/dialog-logged-state.component';

export interface IGlobalStateService {
    logout(): void;
}

@Injectable()
export class JamErrorHandler extends ErrorHandler {
    // public router: Router;
    // public globalStateService: GlobalStateService;
    public lastErrorCached = { title: '', time: 0 };
    public token_dialog_is_open: boolean;
    public globalStateService: IGlobalStateService;

    private form: FormGroup;

    public constructor(
        public ngZone: NgZone,
        public matDialog: MatDialog,
        public toasterService: ToasterService
        // private requestStatusService: RequestStatusService,
        // private injector: Injector
    ) {
        super();
    }

    public handleError(error) {
        // if (!this.requestStatusService) this.requestStatusService = this.injector.get(RequestStatusService);
        // if (!this.globalStateService) this.globalStateService = this.injector.get(GlobalStateService);
        // if (!this.router) this.router = this.injector.get(Router);
        if (error.status === 404) {
            this.Notification('Error al contactar con el servidor, intenta nuevamente más tarde.');

            return;
        }
        // Así envía el back los unhandled
        if (error.status === 500 || error.message && error.message === 'Server Error') {
            this.Notification('Ups, ha ocurrido un error. Contáctanos por correo a soporte@multinexo.com');

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

        // no lo largo en los errores del front porque hay una issue abierta en el repositorio de Angular que muestra erroers en los DF
        // https://github.com/angular/angular/issues/23657
        if (error.status) {
            this.Notification('Ups, ha ocurrido un error. Contáctanos por correo a soporte@multinexo.com');
        }

        super.handleError(error);
    }

    public handleJsonapiErrors(error) {
        for (let actual_error of error.errors) {
            // si es ultimo mensaje recibido y solo han pasado 2 segundos, no muestra error
            if (this.lastErrorCached.title === actual_error.title && this.lastErrorCached.time > Date.now() - 2000) return;

            this.lastErrorCached.title = actual_error.title;
            this.lastErrorCached.time = Date.now();

            switch (actual_error.title) {
                case 'Internal server error':
                    this.Notification(actual_error.detail, 'error');

                    return;
                case 'Bad request':
                    if (actual_error.detail.includes('Token required')) {
                        this.ngZone.run(async () => this.logOut());

                        return;
                    }
                    // if (actual_error.detail === 'Sin autorización para acceder a la empresa.') {
                    //     this.ngZone.run(async () => this.router.navigate(['/companies']));
                    // }
                    break;
                case 'Invalid data received':
                    if (actual_error.detail === 'The refresh token must be at least 20 characters.') {
                        this.ngZone.run(async () => this.logOut());

                        return;
                    }
                    break;
                case 'Token has expired':
                case 'Token not provided':
                    this.ngZone.run(async () => this.logOut());

                    return;
                case 'Too many attempts':
                    this.Notification('Has agotado el límite de intentos, espera un momento antes de continuar.', 'error');

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

        dialog_ref.afterClosed().subscribe(success => {
            this.token_dialog_is_open = false;
            this.globalStateService.logout();
        });
    }

    public setForm(form: FormGroup) {
        this.form = form;
    }

    public Notification(message: string, type?: 'success' | 'error' | 'info' | 'warning') {
        let messages = message.split('|');
        type = type || 'error';
        if (messages.length === 1) {
            this.toasterService.pop(type, message);

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
}
