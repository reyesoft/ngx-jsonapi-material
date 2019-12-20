import { Component } from '@angular/core';
import { FormlyForm } from '@ngx-formly/core';
export class FormlyFormFlexComponent extends FormlyForm {
}
FormlyFormFlexComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-formly-form-flex',
                template: `
      <formly-field *ngFor="let field of fields"
        [fxFlex]="field.templateOptions.fxFlex"
        [model]="model" [form]="form"
        [field]="field"
        [ngClass]="field.className"
        [options]="options">
      </formly-field>
      <ng-content></ng-content>
  `
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWZvcm0tZmxleC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9keW5hbWljLWZvcm1zL2Zvcm1seS1mb3JtLWZsZXguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBZTlDLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxVQUFVOzs7WUFidEQsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1g7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5Rm9ybSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1mb3JtbHktZm9ybS1mbGV4JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgPGZvcm1seS1maWVsZCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCJcbiAgICAgICAgW2Z4RmxleF09XCJmaWVsZC50ZW1wbGF0ZU9wdGlvbnMuZnhGbGV4XCJcbiAgICAgICAgW21vZGVsXT1cIm1vZGVsXCIgW2Zvcm1dPVwiZm9ybVwiXG4gICAgICAgIFtmaWVsZF09XCJmaWVsZFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImZpZWxkLmNsYXNzTmFtZVwiXG4gICAgICAgIFtvcHRpb25zXT1cIm9wdGlvbnNcIj5cbiAgICAgIDwvZm9ybWx5LWZpZWxkPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZvcm1GbGV4Q29tcG9uZW50IGV4dGVuZHMgRm9ybWx5Rm9ybSB7fVxuIl19