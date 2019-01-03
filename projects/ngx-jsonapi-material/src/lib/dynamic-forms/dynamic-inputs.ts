// @mergeflag los cambios en este componente no deben llegar a 21
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { Resource } from 'ngx-jsonapi';

export class DynamicInput implements FormlyFieldConfig {
    public readonly model: any;
    public readonly parent: FormlyFieldConfig;

    public key: string;
    public id: string;
    public name: string;
    public templateOptions: FormlyTemplateOptions;
    public optionsTypes: Array<string>;
    public validation: {
        messages?: {
            [messageProperties: string]: string | ((error: any, field: FormlyFieldConfig) => string);
        };
        show?: boolean;
        [additionalProperties: string]: any;
    };
    public validators: any;
    public asyncValidators: any;
    public template: string;
    public wrappers: Array<string>;
    public hide: boolean;
    public hideExpression: boolean | string | ((model: any, formState: any) => boolean);
    public expressionProperties: { [property: string]: string | ((model: any, formState: any) => boolean) } | any;
    public formControl: AbstractControl;
    public className: string;
    public fieldGroupClassName: string;
    public fieldGroup: Array<FormlyFieldConfig>;
    public fieldArray: FormlyFieldConfig;
    public type: string;
    public component: any;
    public focus: boolean;
    public modelOptions: {
        debounce?: {
            default: number;
        };
        updateOn?: 'change' | 'blur' | 'submit';
    };

    // public lifecycle?: FormlyLifeCycleOptions;
    public defaultValue: any;
    public parsers: Array<((value: any) => {})>;

    public constructor(key: string) {
        this.key = this.id = this.name = key;
    }

    public setFocus() {
        this.focus = true;

        return this;
    }

    public required() {
        this.templateOptions.required = true;

        return this;
    }

    public fxFlex(value) {
        this.templateOptions.fxFlex = value;

        return this;
    }

    public set(property: string, value: any) {
        this[property] = value;

        return this;
    }

    public setTemplateOption(property: string, value: any) {
        this.templateOptions[property] = value;

        return this;
    }

    public addTemplateOptions(template_options: FormlyTemplateOptions) {
        this.templateOptions = { ...this.templateOptions, ...template_options };

        return this;
    }

    public setTranslatedTemplateOptions(translateService: TranslateService) {
        return this;
    }

    public load(fieldConfig: FormlyFieldConfig) {
        for (let key in fieldConfig) {
            this[key] = fieldConfig[key];
        }

        return this;
    }
}

export class TextDynamicInput extends DynamicInput implements FormlyFieldConfig {
    public constructor(public key) {
        super(key);
        this.type = 'input';
        this.templateOptions = {
            placeholder: key
        };
    }
    public setTranslatedTemplateOptions(translateService: TranslateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);

        return this;
    }
}

export class NumberDynamicInput extends DynamicInput implements FormlyFieldConfig {
    public constructor(public key) {
        super(key);
        this.type = 'input';
        this.key = this.id = this.name = key;
        this.templateOptions = {
            type: 'number',
            step: 0.01,
            min: 0,
            placeholder: key
        };
    }
    public setTranslatedTemplateOptions(translateService: TranslateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);

        return this;
    }
}

export class CheckboxDynamicInput extends DynamicInput implements FormlyFieldConfig {
    public constructor(public key) {
        super(key);
        this.type = 'checkbox';
        this.templateOptions = {
            indeterminate: false,
            label: key
        };
    }
    public setTranslatedTemplateOptions(translateService: TranslateService) {
        this.templateOptions.label = translateService.instant(this.key);

        return this;
    }
}

export class TextareaDynamicInput extends DynamicInput implements FormlyFieldConfig {
    public constructor(public key) {
        super(key);
        this.type = 'textarea';
        this.templateOptions = {
            matAutosizeMinRows: 2,
            matAutosizeMaxRows: 150,
            label: key
        };
    }
    public setTranslatedTemplateOptions(translateService: TranslateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);
        this.templateOptions.label = translateService.instant(this.key);

        return this;
    }
}

export class SelectDynamicInput extends DynamicInput implements FormlyFieldConfig {
    public constructor(public key) {
        super(key);
        this.type = 'select';
        this.templateOptions = {
            label: key,
            options: []
        };
    }
    public setTranslatedTemplateOptions(translateService: TranslateService) {
        this.templateOptions.label = translateService.instant(this.key);

        return this;
    }

    public setOptions(options: Array<{ value: any; label: string }>): SelectDynamicInput {
        this.templateOptions.options = options;

        return this;
    }
}
