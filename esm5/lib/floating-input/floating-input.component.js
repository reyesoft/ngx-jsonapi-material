import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from 'ngx-jsonapi';
var FloatingInputComponent = /** @class */ (function () {
    function FloatingInputComponent(router) {
        this.router = router;
        this.entryValueChange = new EventEmitter();
        this.resourceChange = new EventEmitter();
        this.searchParams = router.parseUrl(router.url);
        this.lock = this.lock || false;
    }
    FloatingInputComponent.prototype.statusToggle = function (status) {
        var _this = this;
        if (!this.lock) {
            this.status = status;
            setTimeout(function () {
                if (!status) {
                    return;
                }
                _this.focusInput();
            }, 100);
        }
    };
    FloatingInputComponent.prototype.bindingEntryValue = function (value) {
        this.entryValueChange.emit(value);
    };
    FloatingInputComponent.prototype.keyPress = function (keyCode) {
        switch (keyCode) {
            case 13:
                this.status = false;
                break;
        }
    };
    FloatingInputComponent.prototype.focusInput = function () {
        var input = document.getElementById('floatingInput');
        input.focus();
    };
    FloatingInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-floating-input',
                    styles: ["mat-expansion-panel{width:auto;box-shadow:none!important;background:inherit!important;border:0!important}mat-form-field{width:100%}input[type^=number]{text-align:end}"],
                    template: "<div class=\"floating-input\" [ngClass]=\"status ? 'mat-elevation-z1' : ''\">\n    <mat-expansion-panel\n        hideToggle=\"true\"\n        style=\"width: auto; box-shadow: none !important; background: inherit !important; border: 0 !important;\"\n        [disabled]=\"lock\"\n        [expanded]=\"status\"\n        (closed)=\"statusToggle(false)\"\n        (opened)=\"statusToggle(true)\">\n        <mat-expansion-panel-header *ngIf=\"!status\">\n            <mat-panel-title fxLayout=\"row\" [fxLayoutAlign]=\"(horPosition || 'end')\">\n                <ng-content></ng-content>\n            </mat-panel-title>\n        </mat-expansion-panel-header>\n\n        <mat-form-field *ngIf=\"status\">\n            <input matInput id=\"floatingInput\" type=\"number\" step=\"0.001\" name=\"floatingNumber\" aria-label=\"Modificar\"\n                [(ngModel)]=\"entryValue\"\n                (blur)=\"statusToggle(false)\"\n                (ngModelChange)=\"bindingEntryValue(entryValue)\"\n                (keydown)=\"keyPress($event.keyCode)\"\n                (focus)=\"status\">\n        </mat-form-field>\n    </mat-expansion-panel>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    FloatingInputComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    FloatingInputComponent.propDecorators = {
        entryValue: [{ type: Input }],
        resource: [{ type: Input }],
        horPosition: [{ type: Input }],
        lock: [{ type: Input }],
        entryValueChange: [{ type: Output }],
        resourceChange: [{ type: Output }]
    };
    return FloatingInputComponent;
}());
export { FloatingInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmxvYXRpbmctaW5wdXQvZmxvYXRpbmctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkM7SUF5Q0ksZ0NBQTBCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSHZCLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDOUMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBWSxDQUFDO1FBRzNELElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRU0sNkNBQVksR0FBbkIsVUFBb0IsTUFBZTtRQUFuQyxpQkFXQztRQVZHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsVUFBVSxDQUFDO2dCQUNQLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1QsT0FBTztpQkFDVjtnQkFFRCxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7SUFDTCxDQUFDO0lBRU0sa0RBQWlCLEdBQXhCLFVBQXlCLEtBQWE7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0seUNBQVEsR0FBZixVQUFnQixPQUFlO1FBQzNCLFFBQVEsT0FBTyxFQUFFO1lBQ2IsS0FBSyxFQUFFO2dCQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRU8sMkNBQVUsR0FBbEI7UUFDSSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQixDQUFDOztnQkExRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLE1BQU0sRUFBRSxDQUFDLHdLQUF3SyxDQUFDO29CQUNsTCxRQUFRLEVBQUUsMG5DQXdCYjtpQkFDQTs7OztnQkEvQlEsTUFBTTs7OzZCQW9DVixLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSzt1QkFDTCxLQUFLO21DQUVMLE1BQU07aUNBQ04sTUFBTTs7SUFvQ1gsNkJBQUM7Q0FBQSxBQTNFRCxJQTJFQztTQTlDWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1mbG9hdGluZy1pbnB1dCcsXG4gICAgc3R5bGVzOiBbYG1hdC1leHBhbnNpb24tcGFuZWx7d2lkdGg6YXV0bztib3gtc2hhZG93Om5vbmUhaW1wb3J0YW50O2JhY2tncm91bmQ6aW5oZXJpdCFpbXBvcnRhbnQ7Ym9yZGVyOjAhaW1wb3J0YW50fW1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCV9aW5wdXRbdHlwZV49bnVtYmVyXXt0ZXh0LWFsaWduOmVuZH1gXSxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmbG9hdGluZy1pbnB1dFwiIFtuZ0NsYXNzXT1cInN0YXR1cyA/ICdtYXQtZWxldmF0aW9uLXoxJyA6ICcnXCI+XG4gICAgPG1hdC1leHBhbnNpb24tcGFuZWxcbiAgICAgICAgaGlkZVRvZ2dsZT1cInRydWVcIlxuICAgICAgICBzdHlsZT1cIndpZHRoOiBhdXRvOyBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7IGJhY2tncm91bmQ6IGluaGVyaXQgIWltcG9ydGFudDsgYm9yZGVyOiAwICFpbXBvcnRhbnQ7XCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImxvY2tcIlxuICAgICAgICBbZXhwYW5kZWRdPVwic3RhdHVzXCJcbiAgICAgICAgKGNsb3NlZCk9XCJzdGF0dXNUb2dnbGUoZmFsc2UpXCJcbiAgICAgICAgKG9wZW5lZCk9XCJzdGF0dXNUb2dnbGUodHJ1ZSlcIj5cbiAgICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyICpuZ0lmPVwiIXN0YXR1c1wiPlxuICAgICAgICAgICAgPG1hdC1wYW5lbC10aXRsZSBmeExheW91dD1cInJvd1wiIFtmeExheW91dEFsaWduXT1cIihob3JQb3NpdGlvbiB8fCAnZW5kJylcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L21hdC1wYW5lbC10aXRsZT5cbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cblxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCJzdGF0dXNcIj5cbiAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBpZD1cImZsb2F0aW5nSW5wdXRcIiB0eXBlPVwibnVtYmVyXCIgc3RlcD1cIjAuMDAxXCIgbmFtZT1cImZsb2F0aW5nTnVtYmVyXCIgYXJpYS1sYWJlbD1cIk1vZGlmaWNhclwiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJlbnRyeVZhbHVlXCJcbiAgICAgICAgICAgICAgICAoYmx1cik9XCJzdGF0dXNUb2dnbGUoZmFsc2UpXCJcbiAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJiaW5kaW5nRW50cnlWYWx1ZShlbnRyeVZhbHVlKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwia2V5UHJlc3MoJGV2ZW50LmtleUNvZGUpXCJcbiAgICAgICAgICAgICAgICAoZm9jdXMpPVwic3RhdHVzXCI+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0aW5nSW5wdXRDb21wb25lbnQge1xuICAgIHB1YmxpYyBzZWFyY2hQYXJhbXM6IFVybFRyZWU7XG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBlbnRyeVZhbHVlOiBudW1iZXI7XG4gICAgQElucHV0KCkgcHVibGljIHJlc291cmNlOiBSZXNvdXJjZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgaG9yUG9zaXRpb246ICdzdGFydCcgfCAnZW5kJztcbiAgICBASW5wdXQoKSBwdWJsaWMgbG9jazogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSBwdWJsaWMgZW50cnlWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVzb3VyY2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFJlc291cmNlPigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcyA9IHJvdXRlci5wYXJzZVVybChyb3V0ZXIudXJsKTtcbiAgICAgICAgdGhpcy5sb2NrID0gdGhpcy5sb2NrIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0dXNUb2dnbGUoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5sb2NrKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYmluZGluZ0VudHJ5VmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmVudHJ5VmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGtleVByZXNzKGtleUNvZGU6IG51bWJlcikge1xuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNJbnB1dCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zsb2F0aW5nSW5wdXQnKTtcbiAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICB9XG59XG4iXX0=