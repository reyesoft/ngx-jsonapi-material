import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormlyForm } from '@ngx-formly/core';
var FormlyFormFlexComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormlyFormFlexComponent, _super);
    function FormlyFormFlexComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormlyFormFlexComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-formly-form-flex',
                    template: "\n      <formly-field *ngFor=\"let field of fields\"\n        [fxFlex]=\"field.templateOptions.fxFlex\"\n        [model]=\"model\" [form]=\"form\"\n        [field]=\"field\"\n        [ngClass]=\"field.className\"\n        [options]=\"options\">\n      </formly-field>\n      <ng-content></ng-content>\n  "
                },] },
    ];
    return FormlyFormFlexComponent;
}(FormlyForm));
export { FormlyFormFlexComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWZvcm0tZmxleC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9keW5hbWljLWZvcm1zL2Zvcm1seS1mb3JtLWZsZXguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QztJQWE2QyxtREFBVTtJQWJ2RDs7SUFheUQsQ0FBQzs7Z0JBYnpELFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsa1RBU1g7aUJBQ0Y7O0lBQ3dELDhCQUFDO0NBQUEsQUFiMUQsQ0FhNkMsVUFBVSxHQUFHO1NBQTdDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5Rm9ybSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1mb3JtbHktZm9ybS1mbGV4JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgPGZvcm1seS1maWVsZCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCJcbiAgICAgICAgW2Z4RmxleF09XCJmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuZnhGbGV4XCJcbiAgICAgICAgW21vZGVsXT1cIm1vZGVsXCIgW2Zvcm1dPVwiZm9ybVwiXG4gICAgICAgIFtmaWVsZF09XCJmaWVsZFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImZpZWxkLmNsYXNzTmFtZVwiXG4gICAgICAgIFtvcHRpb25zXT1cIm9wdGlvbnNcIj5cbiAgICAgIDwvZm9ybWx5LWZpZWxkPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZvcm1GbGV4Q29tcG9uZW50IGV4dGVuZHMgRm9ybWx5Rm9ybSB7fVxuIl19