import { ErrorHandler, Injector } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogLoggedStateComponent } from '../logged-state/dialog-logged-state.component';
import { TestBed, inject, async } from '@angular/core/testing';
import { JamErrorHandler } from './error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { mock, instance, when, anything } from 'ts-mockito';
import { Subject } from 'rxjs';
import { ToasterService } from 'angular2-toaster';

let super_handleError_called: boolean = false;

const ErrorHandlerMock: ErrorHandler = mock(ErrorHandler);
// tslint:disable: no-void-expression
when(ErrorHandlerMock.handleError(anything)).thenCall((): boolean => super_handleError_called = true);
class GlobalStateServiceMock {
    public logout() { /**/ }
}
const MatDialogMock: MatDialog = mock(MatDialog);
const ToasterServiceMock: ToasterService = mock(ToasterService);

describe('JamErrorHandler', () => {
    let service_instance: JamErrorHandler;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                JamErrorHandler,
                { provide: ErrorHandler, useFactory: (): ErrorHandler => instance(ErrorHandlerMock) },
                { provide: ToasterService, useFactory: (): ToasterService => instance(ToasterServiceMock) },
                { provide: MatDialog, useFactory: (): MatDialog => instance(MatDialogMock) }
            ]
        });
    });

    it('should be created', inject([JamErrorHandler], (service: JamErrorHandler) => {
        service_instance = service;
        service_instance.globalStateService = new GlobalStateServiceMock();
        expect(service_instance).toBeTruthy();
    }));

    it(`when recieving a jsonapi formatted error, handleError method should call handleJsonapiErrors method with the error as argument`, () => {
        let handleJsonapiErrors_spy = spyOn(service_instance, 'handleJsonapiErrors');
        service_instance.handleError({
            errors: [
                {status: '403', title: 'Invalid data received', detail: 'The name field is required.'}
            ]
        });
        expect(handleJsonapiErrors_spy).toHaveBeenCalledWith({
            errors: [
                {status: '403', title: 'Invalid data received', detail: 'The name field is required.'}
            ]
        });
        service_instance.handleError({
            errors: [
                {status: '403', title: 'The name field is required', detail: 'The name field is required.'},
                {status: '403', title: 'The responsibility id field is required', detail: 'The responsibility id field is required.'}
            ]
        });
        expect(handleJsonapiErrors_spy).toHaveBeenCalledWith({
            errors: [
                {status: '403', title: 'The name field is required', detail: 'The name field is required.'},
                {status: '403', title: 'The responsibility id field is required', detail: 'The responsibility id field is required.'}
            ]
        });
    });

    it(`when recieving a jsonapi formatted rejection, handleError method should call handleJsonapiErrors method
        with error.rejection.error or error.rejection as argument`, () => {
        let handleJsonapiErrors_spy = spyOn(service_instance, 'handleJsonapiErrors');
        service_instance.handleError({ rejection: {
            errors: [
                {status: '403', title: 'The name field is required', detail: 'The name field is required.'}
            ]
        }});
        expect(handleJsonapiErrors_spy).toHaveBeenCalledWith({
            errors: [
                {status: '403', title: 'The name field is required', detail: 'The name field is required.'}
            ]
        });
        service_instance.handleError({ rejection: {
            errors: [
                {status: '403', title: 'The name field is required', detail: 'The name field is required.'},
                {status: '403', title: 'The responsibility id field is required', detail: 'The responsibility id field is required.'}
            ]
        }});
        expect(handleJsonapiErrors_spy).toHaveBeenCalledWith({
            errors: [
                {status: '403', title: 'The name field is required', detail: 'The name field is required.'},
                {status: '403', title: 'The responsibility id field is required', detail: 'The responsibility id field is required.'}
            ]
        });
        service_instance.handleError({ rejection: {
            error: {
                errors: [
                    {status: '403', title: 'The name field is required', detail: 'The name field is required.'}
                ]
            }
        }});
        expect(handleJsonapiErrors_spy).toHaveBeenCalledWith({
            errors: [
                {status: '403', title: 'The name field is required', detail: 'The name field is required.'}
            ]
        });
    });

    it('when recieving an error with statuc code 404, handleError method should show a special taster message', () => {
        let notification_spy = spyOn(service_instance as any, 'Notification');
        service_instance.handleError({ errors: [], status: 404 });
        expect(notification_spy).toHaveBeenCalledWith('Error al contactar con el servidor, intenta nuevamente más tarde.');
    });

    it('when recieving a non jsonapi error, handleError should pass the error to Angular erorr handler', () => {
        let super_handleError_spy = spyOn(ErrorHandler.prototype, 'handleError');
        service_instance.handleError({ error: 'Some non jsonapi format error.' });
        expect(super_handleError_spy).toHaveBeenCalledWith({ error: 'Some non jsonapi format error.' });
    });

    it('handleJsonapiErrors method should call requestStatusService.error one time for each error in errors array', () => {
        let rss_error_spy = spyOn(service_instance as any, 'singleError');
        service_instance.handleJsonapiErrors({ errors: [
            {status: '403', title: 'Some new error', detail: 'Some new error.'},
            {status: '403', title: 'Some other new error', detail: 'Some other new error.'}
        ]});
        expect(rss_error_spy).toHaveBeenCalledTimes(2);
    });

    it('handleJsonapiErrors method should store last error title and time displayed in lastErrorCached object', () => {
        service_instance.handleJsonapiErrors({
            errors: [
                {status: '403', title: 'Last error title', detail: 'The name field is required.'}
            ]
        });
        expect(service_instance.lastErrorCached.title).toBe('Last error title');
        expect(service_instance.lastErrorCached.time).toBeGreaterThan(Date.now() - 2000);
    });

    it(`if the new error title matches the last error cached title and time elapsed is less than 2 seconds,
        handleJsonapiErrors should renturn without showing the message`, () => {
        let rss_error_spy = spyOn(service_instance as any, 'singleError');
        service_instance.handleJsonapiErrors({
            errors: [{ status: '403', title: 'Cached error title', detail: 'The name field is required.' }]
        });
        service_instance.handleJsonapiErrors({
            errors: [{ status: '403', title: 'Cached error title', detail: 'The name field is required.' }]
        });
        expect(rss_error_spy).toHaveBeenCalledTimes(1);
    });

    it('if the error title matches "Token has expired" or "Token not provided", handleJsonapiErrors should call logOut', () => {
        let logOut_spy = spyOn(service_instance, 'logOut');
        let rss_error_spy = spyOn(service_instance as any, 'singleError');
        service_instance.handleJsonapiErrors({
            errors: [{ status: '403', title: 'Token has expired', detail: 'Token has expired.' }]
        });
        expect(logOut_spy).toHaveBeenCalled();
        service_instance.handleJsonapiErrors({
            errors: [{ status: '403', title: 'Token not provided', detail: 'Token not provided.' }]
        });
        expect(logOut_spy).toHaveBeenCalled();
        expect(rss_error_spy).not.toHaveBeenCalled();
    });

    it('if the error title is "Too many attempts", handleJsonapiErrors should show a spwcial error message', () => {
        let notification_spy = spyOn(service_instance as any, 'Notification');
        let rss_error_spy = spyOn(service_instance as any, 'singleError');
        service_instance.handleJsonapiErrors({
            errors: [{ status: '403', title: 'Too many attempts', detail: 'Too many attempts' }]
        });
        expect(notification_spy).toHaveBeenCalledWith('Has agotado el límite de intentos, espera un momento antes de continuar.', 'error');
        expect(rss_error_spy).not.toHaveBeenCalled();
    });

    it('openDialog method should open DialogLoggedStateComponent dialog', () => {
        let close_dialog: Subject<boolean> = new Subject();
        let open_dialog_spy = spyOn(service_instance.matDialog, 'open').and.returnValue(
            { afterClosed: (): Subject<boolean> => close_dialog }
        );
        service_instance.logOut();
        expect(open_dialog_spy).toHaveBeenCalledWith(DialogLoggedStateComponent, {
            width: '600px',
            disableClose: true
        });
    });

    it('openDialog should call logout method when the dialog is clased', () => {
        let close_dialog: Subject<boolean> = new Subject();
        service_instance.token_dialog_is_open = false;
        let logout_spy = spyOn(service_instance.globalStateService, 'logout');
        let open_dialog_spy = spyOn(service_instance.matDialog, 'open').and.returnValue(
            { afterClosed: (): Subject<boolean> => close_dialog }
        );
        service_instance.logOut();
        close_dialog.next(true);
        expect(logout_spy).toHaveBeenCalled();
    });
});
