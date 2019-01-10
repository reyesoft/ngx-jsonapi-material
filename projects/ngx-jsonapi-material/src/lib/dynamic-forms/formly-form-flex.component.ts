import { Component } from '@angular/core';
import { FormlyForm } from '@ngx-formly/core';

@Component({
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
})
export class FormlyFormFlexComponent extends FormlyForm {}
