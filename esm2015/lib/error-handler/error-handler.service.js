import * as tslib_1 from "tslib";
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { DialogLoggedStateComponent } from '../logged-state/dialog-logged-state.component';
export class JamErrorHandler extends ErrorHandler {
    constructor(ngZone, matDialog, toasterService) {
        super();
        this.ngZone = ngZone;
        this.matDialog = matDialog;
        this.toasterService = toasterService;
        this.lastErrorCached = { title: '', time: 0 };
        this.show_angular_errors = true;
    }
    handleError(error) {
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
            if (error.rejection.error && error.rejection.error.errors)
                this.handleJsonapiErrors(error.rejection.error);
            if (error.rejection.errors)
                this.handleJsonapiErrors(error.rejection);
            console.error('Rejection:', error.rejection);
            return;
        }
        if (error.status) {
            this.unhandledError(error.status);
        }
        else if (error.message && this.show_angular_errors) {
            this.unhandledError(error.message);
        }
        super.handleError(error);
    }
    handleJsonapiErrors(error, use_error_cache = true) {
        for (let actual_error of error.errors) {
            if (use_error_cache) {
                // si es ultimo mensaje recibido y solo han pasado 2 segundos, no muestra error
                if (this.lastErrorCached.title === actual_error.title && this.lastErrorCached.time > Date.now() - 2000)
                    return;
                this.lastErrorCached.title = actual_error.title;
                this.lastErrorCached.time = Date.now();
            }
            switch (actual_error.title) {
                case 'Internal server error':
                    this.Notification(actual_error.detail, 'error');
                    return;
                case 'Bad request':
                    if (actual_error.detail.includes('Token required')) {
                        this.ngZone.run(() => tslib_1.__awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                        return;
                    }
                    break;
                case 'Invalid data received':
                    if (actual_error.detail === 'The refresh token must be at least 20 characters.') {
                        this.ngZone.run(() => tslib_1.__awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                        return;
                    }
                    break;
                case 'Token has expired':
                case 'Token not provided':
                    this.ngZone.run(() => tslib_1.__awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                    return;
                case 'Too many attempts':
                    this.Notification('Has agotado el límite de intentos, espera un momento antes de continuar.', 'error');
                    return;
            }
            // cannot use special conditions to SWITCH statement without changing the data inside switch to "true"
            if (actual_error.detail.includes('Token required')) {
                this.ngZone.run(() => tslib_1.__awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                return;
            }
            switch (actual_error.detail) {
                case 'Expired access token.':
                case 'The refresh token is invalid. Cannot decrypt the refresh token':
                case 'Invalid access token':
                    this.ngZone.run(() => tslib_1.__awaiter(this, void 0, void 0, function* () { return this.logOut(); }));
                    return;
            }
            this.singleError(actual_error);
        }
    }
    logOut() {
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
    setForm(form) {
        this.form = form;
    }
    Notification(title, type, body) {
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
    singleError(error) {
        if (!error.detail && !error.title) {
            console.warn('Error cant be handled:', error);
            return;
        }
        if (this.form && error.source && this.form.get(error.source.attribute)) {
            this.form.get(error.source.attribute).setErrors({ 'server-error': error.detail });
        }
        else {
            this.Notification(error.detail || error.title);
        }
    }
    unhandledError(message) {
        this.Notification('Ups, ha ocurrido un error. Contáctanos por correo a soporte@multinexo.com', 'error', `Código de error: ${message}`);
    }
}
JamErrorHandler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
JamErrorHandler.ctorParameters = () => [
    { type: NgZone },
    { type: MatDialog },
    { type: ToasterService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZXJyb3ItaGFuZGxlci9lcnJvci1oYW5kbGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFZLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBTzNGLE1BQU0sT0FBTyxlQUFnQixTQUFRLFlBQVk7SUFRN0MsWUFDVyxNQUFjLEVBQ2QsU0FBb0IsRUFDcEIsY0FBOEI7UUFFckMsS0FBSyxFQUFFLENBQUM7UUFKRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFWbEMsb0JBQWUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBR3pDLHdCQUFtQixHQUFHLElBQUksQ0FBQztJQVVsQyxDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQUs7UUFDcEIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLG1FQUFtRSxDQUFDLENBQUM7WUFFdkYsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssY0FBYyxFQUFFO1lBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lB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QUFLLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFTSxjQUFjLENBQUMsT0FBZTtRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUNiLDJFQUEyRSxFQUMzRSxPQUFPLEVBQ1Asb0JBQW9CLE9BQU8sRUFBRSxDQUNoQyxDQUFDO0lBQ04sQ0FBQzs7O1lBdktKLFVBQVU7Ozs7WUFaa0MsTUFBTTtZQUcxQyxTQUFTO1lBRVQsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBKc29uYXBpQ29yZSB9IGZyb20gJ25neC1qc29uYXBpJztcbmltcG9ydCB7IFRvYXN0ZXJTZXJ2aWNlIH0gZnJvbSAnYW5ndWxhcjItdG9hc3Rlcic7XG5pbXBvcnQgeyBEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2xvZ2dlZC1zdGF0ZS9kaWFsb2ctbG9nZ2VkLXN0YXRlLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbFN0YXRlU2VydmljZSB7XG4gICAgbG9nb3V0KCk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKYW1FcnJvckhhbmRsZXIgZXh0ZW5kcyBFcnJvckhhbmRsZXIge1xuICAgIHB1YmxpYyBsYXN0RXJyb3JDYWNoZWQgPSB7IHRpdGxlOiAnJywgdGltZTogMCB9O1xuICAgIHB1YmxpYyB0b2tlbl9kaWFsb2dfaXNfb3BlbjogYm9vbGVhbjtcbiAgICBwdWJsaWMgZ2xvYmFsU3RhdGVTZXJ2aWNlOiBJR2xvYmFsU3RhdGVTZXJ2aWNlO1xuICAgIHB1YmxpYyBzaG93X2FuZ3VsYXJfZXJyb3JzID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHB1YmxpYyBtYXREaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgICAgcHVibGljIHRvYXN0ZXJTZXJ2aWNlOiBUb2FzdGVyU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIHRoaXMuTm90aWZpY2F0aW9uKCdFcnJvciBhbCBjb250YWN0YXIgY29uIGVsIHNlcnZpZG9yLCBpbnRlbnRhIG51ZXZhbWVudGUgbcOhcyB0YXJkZS4nKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDUwMCB8fCBlcnJvci5tZXNzYWdlICYmIGVycm9yLm1lc3NhZ2UgPT09ICdTZXJ2ZXIgRXJyb3InKSB7XG4gICAgICAgICAgICB0aGlzLnVuaGFuZGxlZEVycm9yKGVycm9yLnN0YXR1cyk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuZXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUpzb25hcGlFcnJvcnMoZXJyb3IpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnJlamVjdGlvbikge1xuICAgICAgICAgICAgLy8gdGhpcyBmaXJzdCBjYXNlIGlzIGZvciBndWVzdCBtb2R1bGUgcmVqZWN0aW9uc1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlamVjdGlvbi5lcnJvciAmJiBlcnJvci5yZWplY3Rpb24uZXJyb3IuZXJyb3JzKSB0aGlzLmhhbmRsZUpzb25hcGlFcnJvcnMoZXJyb3IucmVqZWN0aW9uLmVycm9yKTtcbiAgICAgICAgICAgIGlmIChlcnJvci5yZWplY3Rpb24uZXJyb3JzKSB0aGlzLmhhbmRsZUpzb25hcGlFcnJvcnMoZXJyb3IucmVqZWN0aW9uKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlamVjdGlvbjonLCBlcnJvci5yZWplY3Rpb24pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLnVuaGFuZGxlZEVycm9yKGVycm9yLnN0YXR1cyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IubWVzc2FnZSAmJiB0aGlzLnNob3dfYW5ndWxhcl9lcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMudW5oYW5kbGVkRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUpzb25hcGlFcnJvcnMoZXJyb3IsIHVzZV9lcnJvcl9jYWNoZSA9IHRydWUpIHtcbiAgICAgICAgZm9yIChsZXQgYWN0dWFsX2Vycm9yIG9mIGVycm9yLmVycm9ycykge1xuXG4gICAgICAgICAgICBpZiAodXNlX2Vycm9yX2NhY2hlKSB7XG4gICAgICAgICAgICAgICAgLy8gc2kgZXMgdWx0aW1vIG1lbnNhamUgcmVjaWJpZG8geSBzb2xvIGhhbiBwYXNhZG8gMiBzZWd1bmRvcywgbm8gbXVlc3RyYSBlcnJvclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RFcnJvckNhY2hlZC50aXRsZSA9PT0gYWN0dWFsX2Vycm9yLnRpdGxlICYmIHRoaXMubGFzdEVycm9yQ2FjaGVkLnRpbWUgPiBEYXRlLm5vdygpIC0gMjAwMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0RXJyb3JDYWNoZWQudGl0bGUgPSBhY3R1YWxfZXJyb3IudGl0bGU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0RXJyb3JDYWNoZWQudGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYWN0dWFsX2Vycm9yLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnSW50ZXJuYWwgc2VydmVyIGVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ob3RpZmljYXRpb24oYWN0dWFsX2Vycm9yLmRldGFpbCwgJ2Vycm9yJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0JhZCByZXF1ZXN0JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdHVhbF9lcnJvci5kZXRhaWwuaW5jbHVkZXMoJ1Rva2VuIHJlcXVpcmVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bihhc3luYyAoKSA9PiB0aGlzLmxvZ091dCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0ludmFsaWQgZGF0YSByZWNlaXZlZCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3R1YWxfZXJyb3IuZGV0YWlsID09PSAnVGhlIHJlZnJlc2ggdG9rZW4gbXVzdCBiZSBhdCBsZWFzdCAyMCBjaGFyYWN0ZXJzLicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bihhc3luYyAoKSA9PiB0aGlzLmxvZ091dCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1Rva2VuIGhhcyBleHBpcmVkJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUb2tlbiBub3QgcHJvdmlkZWQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4gdGhpcy5sb2dPdXQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1RvbyBtYW55IGF0dGVtcHRzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ob3RpZmljYXRpb24oJ0hhcyBhZ290YWRvIGVsIGzDrW1pdGUgZGUgaW50ZW50b3MsIGVzcGVyYSB1biBtb21lbnRvIGFudGVzIGRlIGNvbnRpbnVhci4nLCAnZXJyb3InKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhbm5vdCB1c2Ugc3BlY2lhbCBjb25kaXRpb25zIHRvIFNXSVRDSCBzdGF0ZW1lbnQgd2l0aG91dCBjaGFuZ2luZyB0aGUgZGF0YSBpbnNpZGUgc3dpdGNoIHRvIFwidHJ1ZVwiXG4gICAgICAgICAgICBpZiAoYWN0dWFsX2Vycm9yLmRldGFpbC5pbmNsdWRlcygnVG9rZW4gcmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bihhc3luYyAoKSA9PiB0aGlzLmxvZ091dCgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoIChhY3R1YWxfZXJyb3IuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRXhwaXJlZCBhY2Nlc3MgdG9rZW4uJzpcbiAgICAgICAgICAgICAgICBjYXNlICdUaGUgcmVmcmVzaCB0b2tlbiBpcyBpbnZhbGlkLiBDYW5ub3QgZGVjcnlwdCB0aGUgcmVmcmVzaCB0b2tlbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnSW52YWxpZCBhY2Nlc3MgdG9rZW4nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4gdGhpcy5sb2dPdXQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNpbmdsZUVycm9yKGFjdHVhbF9lcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbG9nT3V0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50b2tlbl9kaWFsb2dfaXNfb3Blbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9rZW5fZGlhbG9nX2lzX29wZW4gPSB0cnVlO1xuICAgICAgICBjb25zdCBkaWFsb2dfcmVmID0gdGhpcy5tYXREaWFsb2cub3BlbihEaWFsb2dMb2dnZWRTdGF0ZUNvbXBvbmVudCwge1xuICAgICAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgICAgICBkaXNhYmxlQ2xvc2U6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlhbG9nX3JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShzdWNjZXNzID0+IHtcbiAgICAgICAgICAgIHRoaXMudG9rZW5fZGlhbG9nX2lzX29wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdGVTZXJ2aWNlLmxvZ291dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Rm9ybShmb3JtOiBGb3JtR3JvdXApIHtcbiAgICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB9XG5cbiAgICBwdWJsaWMgTm90aWZpY2F0aW9uKHRpdGxlOiBzdHJpbmcsIHR5cGU/OiAnc3VjY2VzcycgfCAnZXJyb3InIHwgJ2luZm8nIHwgJ3dhcm5pbmcnLCBib2R5Pzogc3RyaW5nKSB7XG4gICAgICAgIGxldCBtZXNzYWdlcyA9IHRpdGxlLnNwbGl0KCd8Jyk7XG4gICAgICAgIHR5cGUgPSB0eXBlIHx8ICdlcnJvcic7XG4gICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RlclNlcnZpY2UucG9wKHR5cGUsIHRpdGxlLCBib2R5KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGVhY2ggb2YgbWVzc2FnZXMpIHtcbiAgICAgICAgICAgIGlmIChlYWNoICE9PSAnXFxuJykge1xuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RlclNlcnZpY2UucG9wKHR5cGUsIGVhY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNpbmdsZUVycm9yKGVycm9yKSB7XG4gICAgICAgIGlmICghZXJyb3IuZGV0YWlsICYmICFlcnJvci50aXRsZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciBjYW50IGJlIGhhbmRsZWQ6JywgZXJyb3IpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb3JtICYmIGVycm9yLnNvdXJjZSAmJiB0aGlzLmZvcm0uZ2V0KGVycm9yLnNvdXJjZS5hdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2V0KGVycm9yLnNvdXJjZS5hdHRyaWJ1dGUpLnNldEVycm9ycyh7ICdzZXJ2ZXItZXJyb3InOiBlcnJvci5kZXRhaWwgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLk5vdGlmaWNhdGlvbihlcnJvci5kZXRhaWwgfHwgZXJyb3IudGl0bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVuaGFuZGxlZEVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLk5vdGlmaWNhdGlvbihcbiAgICAgICAgICAgICdVcHMsIGhhIG9jdXJyaWRvIHVuIGVycm9yLiBDb250w6FjdGFub3MgcG9yIGNvcnJlbyBhIHNvcG9ydGVAbXVsdGluZXhvLmNvbScsXG4gICAgICAgICAgICAnZXJyb3InLFxuICAgICAgICAgICAgYEPDs2RpZ28gZGUgZXJyb3I6ICR7bWVzc2FnZX1gXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19