import * as tslib_1 from "tslib";
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { DialogLoggedStateComponent } from '../logged-state/dialog-logged-state.component';
var JamErrorHandler = /** @class */ (function (_super) {
    tslib_1.__extends(JamErrorHandler, _super);
    function JamErrorHandler(ngZone, matDialog, toasterService) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.matDialog = matDialog;
        _this.toasterService = toasterService;
        _this.lastErrorCached = { title: '', time: 0 };
        _this.show_angular_errors = true;
        return _this;
    }
    JamErrorHandler.prototype.handleError = function (error) {
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
        _super.prototype.handleError.call(this, error);
    };
    JamErrorHandler.prototype.handleJsonapiErrors = function (error, use_error_cache) {
        var _this = this;
        if (use_error_cache === void 0) { use_error_cache = true; }
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(error.errors), _c = _b.next(); !_c.done; _c = _b.next()) {
                var actual_error = _c.value;
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
                            this.ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, this.logOut()];
                            }); }); });
                            return;
                        }
                        break;
                    case 'Invalid data received':
                        if (actual_error.detail === 'The refresh token must be at least 20 characters.') {
                            this.ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, this.logOut()];
                            }); }); });
                            return;
                        }
                        break;
                    case 'Token has expired':
                    case 'Token not provided':
                        this.ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, this.logOut()];
                        }); }); });
                        return;
                    case 'Too many attempts':
                        this.Notification('Has agotado el límite de intentos, espera un momento antes de continuar.', 'error');
                        return;
                }
                // cannot use special conditions to SWITCH statement without changing the data inside switch to "true"
                if (actual_error.detail.includes('Token required')) {
                    this.ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, this.logOut()];
                    }); }); });
                    return;
                }
                switch (actual_error.detail) {
                    case 'Expired access token.':
                    case 'The refresh token is invalid. Cannot decrypt the refresh token':
                    case 'Invalid access token':
                        this.ngZone.run(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, this.logOut()];
                        }); }); });
                        return;
                }
                this.singleError(actual_error);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    JamErrorHandler.prototype.logOut = function () {
        var _this = this;
        if (this.token_dialog_is_open) {
            return;
        }
        this.token_dialog_is_open = true;
        var dialog_ref = this.matDialog.open(DialogLoggedStateComponent, {
            width: '600px',
            disableClose: true
        });
        dialog_ref.afterClosed().subscribe(function (success) {
            _this.token_dialog_is_open = false;
            _this.globalStateService.logout();
        });
    };
    JamErrorHandler.prototype.setForm = function (form) {
        this.form = form;
    };
    JamErrorHandler.prototype.Notification = function (title, type, body) {
        var e_2, _a;
        var messages = title.split('|');
        type = type || 'error';
        if (messages.length === 1) {
            this.toasterService.pop(type, title, body);
            return;
        }
        try {
            for (var messages_1 = tslib_1.__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                var each = messages_1_1.value;
                if (each !== '\n') {
                    this.toasterService.pop(type, each);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    JamErrorHandler.prototype.singleError = function (error) {
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
    };
    JamErrorHandler.prototype.unhandledError = function (message) {
        this.Notification('Ups, ha ocurrido un error. Contáctanos por correo a soporte@multinexo.com', 'error', "C\u00F3digo de error: " + message);
    };
    JamErrorHandler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    JamErrorHandler.ctorParameters = function () { return [
        { type: NgZone },
        { type: MatDialog },
        { type: ToasterService }
    ]; };
    return JamErrorHandler;
}(ErrorHandler));
export { JamErrorHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZXJyb3ItaGFuZGxlci9lcnJvci1oYW5kbGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFZLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBTTNGO0lBQ3FDLDJDQUFZO0lBUTdDLHlCQUNXLE1BQWMsRUFDZCxTQUFvQixFQUNwQixjQUE4QjtRQUh6QyxZQUtJLGlCQUFPLFNBQ1Y7UUFMVSxZQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZUFBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFWbEMscUJBQWUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBR3pDLHlCQUFtQixHQUFHLElBQUksQ0FBQzs7SUFVbEMsQ0FBQztJQUVNLHFDQUFXLEdBQWxCLFVBQW1CLEtBQUs7UUFDcEIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLG1FQUFtRSxDQUFDLENBQUM7WUFFdkYsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssY0FBYyxFQUFFO1lBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWxDLE9BQU87U0FDVjtRQUNELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVoQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDakIsaURBQWlEO1lBQ2pELElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTTtnQkFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU3QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQzthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEM7UUFFRCxpQkFBTSxXQUFXLFlBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLDZDQUFtQixHQUExQixVQUEyQixLQUFLLEVBQUUsZUFBc0I7UUFBeEQsaUJBMkRDO1FBM0RpQyxnQ0FBQSxFQUFBLHNCQUFzQjs7O1lBQ3BELEtBQXlCLElBQUEsS0FBQSxpQkFBQSxLQUFLLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO2dCQUFsQyxJQUFJLFlBQVksV0FBQTtnQkFFakIsSUFBSSxlQUFlLEVBQUU7b0JBQ2pCLCtFQUErRTtvQkFDL0UsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssS0FBSyxZQUFZLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJO3dCQUFFLE9BQU87b0JBRS9HLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7b0JBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDMUM7Z0JBRUQsUUFBUSxZQUFZLENBQUMsS0FBSyxFQUFFO29CQUN4QixLQUFLLHVCQUF1Qjt3QkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUVoRCxPQUFPO29CQUNYLEtBQUssYUFBYTt3QkFDZCxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7NEJBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dDQUFZLHNCQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTtxQ0FBQSxDQUFDLENBQUM7NEJBRTNDLE9BQU87eUJBQ1Y7d0JBQ0QsTUFBTTtvQkFDVixLQUFLLHVCQUF1Qjt3QkFDeEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLG1EQUFtRCxFQUFFOzRCQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQ0FBWSxzQkFBQSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUE7cUNBQUEsQ0FBQyxDQUFDOzRCQUUzQyxPQUFPO3lCQUNWO3dCQUNELE1BQU07b0JBQ1YsS0FBSyxtQkFBbUIsQ0FBQztvQkFDekIsS0FBSyxvQkFBb0I7d0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDOzRCQUFZLHNCQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTtpQ0FBQSxDQUFDLENBQUM7d0JBRTNDLE9BQU87b0JBQ1gsS0FBSyxtQkFBbUI7d0JBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsMEVBQTBFLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBRXZHLE9BQU87aUJBQ2Q7Z0JBRUQsc0dBQXNHO2dCQUN0RyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO3dCQUFZLHNCQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs2QkFBQSxDQUFDLENBQUM7b0JBRTNDLE9BQU87aUJBQ1Y7Z0JBRUQsUUFBUSxZQUFZLENBQUMsTUFBTSxFQUFFO29CQUN6QixLQUFLLHVCQUF1QixDQUFDO29CQUM3QixLQUFLLGdFQUFnRSxDQUFDO29CQUN0RSxLQUFLLHNCQUFzQjt3QkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7NEJBQVksc0JBQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFBO2lDQUFBLENBQUMsQ0FBQzt3QkFFM0MsT0FBTztpQkFDZDtnQkFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ2xDOzs7Ozs7Ozs7SUFDTCxDQUFDO0lBRU0sZ0NBQU0sR0FBYjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0IsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUMvRCxLQUFLLEVBQUUsT0FBTztZQUNkLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ3RDLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFDbEMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGlDQUFPLEdBQWQsVUFBZSxJQUFlO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxzQ0FBWSxHQUFuQixVQUFvQixLQUFhLEVBQUUsSUFBK0MsRUFBRSxJQUFhOztRQUM3RixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksR0FBRyxJQUFJLElBQUksT0FBTyxDQUFDO1FBQ3ZCLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUUzQyxPQUFPO1NBQ1Y7O1lBQ0QsS0FBaUIsSUFBQSxhQUFBLGlCQUFBLFFBQVEsQ0FBQSxrQ0FBQSx3REFBRTtnQkFBdEIsSUFBSSxJQUFJLHFCQUFBO2dCQUNULElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDZixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0o7Ozs7Ozs7OztJQUNMLENBQUM7SUFFTSxxQ0FBVyxHQUFsQixVQUFtQixLQUFLO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTlDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDckY7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBRU0sd0NBQWMsR0FBckIsVUFBc0IsT0FBZTtRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUNiLDJFQUEyRSxFQUMzRSxPQUFPLEVBQ1AsMkJBQW9CLE9BQVMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7O2dCQXZLSixVQUFVOzs7O2dCQVprQyxNQUFNO2dCQUcxQyxTQUFTO2dCQUVULGNBQWM7O0lBK0t2QixzQkFBQztDQUFBLEFBeEtELENBQ3FDLFlBQVksR0F1S2hEO1NBdktZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgSnNvbmFwaUNvcmUgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5pbXBvcnQgeyBUb2FzdGVyU2VydmljZSB9IGZyb20gJ2FuZ3VsYXIyLXRvYXN0ZXInO1xuaW1wb3J0IHsgRGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnQgfSBmcm9tICcuLi9sb2dnZWQtc3RhdGUvZGlhbG9nLWxvZ2dlZC1zdGF0ZS5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElHbG9iYWxTdGF0ZVNlcnZpY2Uge1xuICAgIGxvZ291dCgpOiB2b2lkO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSmFtRXJyb3JIYW5kbGVyIGV4dGVuZHMgRXJyb3JIYW5kbGVyIHtcbiAgICBwdWJsaWMgbGFzdEVycm9yQ2FjaGVkID0geyB0aXRsZTogJycsIHRpbWU6IDAgfTtcbiAgICBwdWJsaWMgdG9rZW5fZGlhbG9nX2lzX29wZW46IGJvb2xlYW47XG4gICAgcHVibGljIGdsb2JhbFN0YXRlU2VydmljZTogSUdsb2JhbFN0YXRlU2VydmljZTtcbiAgICBwdWJsaWMgc2hvd19hbmd1bGFyX2Vycm9ycyA9IHRydWU7XG5cbiAgICBwcml2YXRlIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwdWJsaWMgbWF0RGlhbG9nOiBNYXREaWFsb2csXG4gICAgICAgIHB1YmxpYyB0b2FzdGVyU2VydmljZTogVG9hc3RlclNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICB0aGlzLk5vdGlmaWNhdGlvbignRXJyb3IgYWwgY29udGFjdGFyIGNvbiBlbCBzZXJ2aWRvciwgaW50ZW50YSBudWV2YW1lbnRlIG3DoXMgdGFyZGUuJyk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDAgfHwgZXJyb3IubWVzc2FnZSAmJiBlcnJvci5tZXNzYWdlID09PSAnU2VydmVyIEVycm9yJykge1xuICAgICAgICAgICAgdGhpcy51bmhhbmRsZWRFcnJvcihlcnJvci5zdGF0dXMpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmVycm9ycykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVKc29uYXBpRXJyb3JzKGVycm9yKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5yZWplY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIHRoaXMgZmlyc3QgY2FzZSBpcyBmb3IgZ3Vlc3QgbW9kdWxlIHJlamVjdGlvbnNcbiAgICAgICAgICAgIGlmIChlcnJvci5yZWplY3Rpb24uZXJyb3IgJiYgZXJyb3IucmVqZWN0aW9uLmVycm9yLmVycm9ycykgdGhpcy5oYW5kbGVKc29uYXBpRXJyb3JzKGVycm9yLnJlamVjdGlvbi5lcnJvcik7XG4gICAgICAgICAgICBpZiAoZXJyb3IucmVqZWN0aW9uLmVycm9ycykgdGhpcy5oYW5kbGVKc29uYXBpRXJyb3JzKGVycm9yLnJlamVjdGlvbik7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSZWplY3Rpb246JywgZXJyb3IucmVqZWN0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy51bmhhbmRsZWRFcnJvcihlcnJvci5zdGF0dXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yLm1lc3NhZ2UgJiYgdGhpcy5zaG93X2FuZ3VsYXJfZXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLnVuaGFuZGxlZEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVKc29uYXBpRXJyb3JzKGVycm9yLCB1c2VfZXJyb3JfY2FjaGUgPSB0cnVlKSB7XG4gICAgICAgIGZvciAobGV0IGFjdHVhbF9lcnJvciBvZiBlcnJvci5lcnJvcnMpIHtcblxuICAgICAgICAgICAgaWYgKHVzZV9lcnJvcl9jYWNoZSkge1xuICAgICAgICAgICAgICAgIC8vIHNpIGVzIHVsdGltbyBtZW5zYWplIHJlY2liaWRvIHkgc29sbyBoYW4gcGFzYWRvIDIgc2VndW5kb3MsIG5vIG11ZXN0cmEgZXJyb3JcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0RXJyb3JDYWNoZWQudGl0bGUgPT09IGFjdHVhbF9lcnJvci50aXRsZSAmJiB0aGlzLmxhc3RFcnJvckNhY2hlZC50aW1lID4gRGF0ZS5ub3coKSAtIDIwMDApIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHRoaXMubGFzdEVycm9yQ2FjaGVkLnRpdGxlID0gYWN0dWFsX2Vycm9yLnRpdGxlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEVycm9yQ2FjaGVkLnRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKGFjdHVhbF9lcnJvci50aXRsZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0ludGVybmFsIHNlcnZlciBlcnJvcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTm90aWZpY2F0aW9uKGFjdHVhbF9lcnJvci5kZXRhaWwsICdlcnJvcicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlICdCYWQgcmVxdWVzdCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3R1YWxfZXJyb3IuZGV0YWlsLmluY2x1ZGVzKCdUb2tlbiByZXF1aXJlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4gdGhpcy5sb2dPdXQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdJbnZhbGlkIGRhdGEgcmVjZWl2ZWQnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0dWFsX2Vycm9yLmRldGFpbCA9PT0gJ1RoZSByZWZyZXNoIHRva2VuIG11c3QgYmUgYXQgbGVhc3QgMjAgY2hhcmFjdGVycy4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4gdGhpcy5sb2dPdXQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdUb2tlbiBoYXMgZXhwaXJlZCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnVG9rZW4gbm90IHByb3ZpZGVkJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHRoaXMubG9nT3V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYXNlICdUb28gbWFueSBhdHRlbXB0cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTm90aWZpY2F0aW9uKCdIYXMgYWdvdGFkbyBlbCBsw61taXRlIGRlIGludGVudG9zLCBlc3BlcmEgdW4gbW9tZW50byBhbnRlcyBkZSBjb250aW51YXIuJywgJ2Vycm9yJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYW5ub3QgdXNlIHNwZWNpYWwgY29uZGl0aW9ucyB0byBTV0lUQ0ggc3RhdGVtZW50IHdpdGhvdXQgY2hhbmdpbmcgdGhlIGRhdGEgaW5zaWRlIHN3aXRjaCB0byBcInRydWVcIlxuICAgICAgICAgICAgaWYgKGFjdHVhbF9lcnJvci5kZXRhaWwuaW5jbHVkZXMoJ1Rva2VuIHJlcXVpcmVkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4gdGhpcy5sb2dPdXQoKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYWN0dWFsX2Vycm9yLmRldGFpbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0V4cGlyZWQgYWNjZXNzIHRva2VuLic6XG4gICAgICAgICAgICAgICAgY2FzZSAnVGhlIHJlZnJlc2ggdG9rZW4gaXMgaW52YWxpZC4gQ2Fubm90IGRlY3J5cHQgdGhlIHJlZnJlc2ggdG9rZW4nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0ludmFsaWQgYWNjZXNzIHRva2VuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHRoaXMubG9nT3V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaW5nbGVFcnJvcihhY3R1YWxfZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvZ091dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9rZW5fZGlhbG9nX2lzX29wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRva2VuX2RpYWxvZ19pc19vcGVuID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZGlhbG9nX3JlZiA9IHRoaXMubWF0RGlhbG9nLm9wZW4oRGlhbG9nTG9nZ2VkU3RhdGVDb21wb25lbnQsIHtcbiAgICAgICAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpYWxvZ19yZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnRva2VuX2RpYWxvZ19pc19vcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbFN0YXRlU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvcm0oZm9ybTogRm9ybUdyb3VwKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgfVxuXG4gICAgcHVibGljIE5vdGlmaWNhdGlvbih0aXRsZTogc3RyaW5nLCB0eXBlPzogJ3N1Y2Nlc3MnIHwgJ2Vycm9yJyB8ICdpbmZvJyB8ICd3YXJuaW5nJywgYm9keT86IHN0cmluZykge1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSB0aXRsZS5zcGxpdCgnfCcpO1xuICAgICAgICB0eXBlID0gdHlwZSB8fCAnZXJyb3InO1xuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlLnBvcCh0eXBlLCB0aXRsZSwgYm9keSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBlYWNoIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBpZiAoZWFjaCAhPT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlLnBvcCh0eXBlLCBlYWNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaW5nbGVFcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoIWVycm9yLmRldGFpbCAmJiAhZXJyb3IudGl0bGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgY2FudCBiZSBoYW5kbGVkOicsIGVycm9yKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybSAmJiBlcnJvci5zb3VyY2UgJiYgdGhpcy5mb3JtLmdldChlcnJvci5zb3VyY2UuYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldChlcnJvci5zb3VyY2UuYXR0cmlidXRlKS5zZXRFcnJvcnMoeyAnc2VydmVyLWVycm9yJzogZXJyb3IuZGV0YWlsIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5Ob3RpZmljYXRpb24oZXJyb3IuZGV0YWlsIHx8IGVycm9yLnRpdGxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bmhhbmRsZWRFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5Ob3RpZmljYXRpb24oXG4gICAgICAgICAgICAnVXBzLCBoYSBvY3VycmlkbyB1biBlcnJvci4gQ29udMOhY3Rhbm9zIHBvciBjb3JyZW8gYSBzb3BvcnRlQG11bHRpbmV4by5jb20nLFxuICAgICAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgICAgIGBDw7NkaWdvIGRlIGVycm9yOiAke21lc3NhZ2V9YFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==