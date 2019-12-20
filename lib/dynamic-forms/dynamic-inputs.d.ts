import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
export declare class DynamicInput implements FormlyFieldConfig {
    readonly model: any;
    readonly parent: FormlyFieldConfig;
    key: string;
    id: string;
    name: string;
    templateOptions: FormlyTemplateOptions;
    optionsTypes: Array<string>;
    validation: {
        messages?: {
            [messageProperties: string]: string | ((error: any, field: FormlyFieldConfig) => string);
        };
        show?: boolean;
        [additionalProperties: string]: any;
    };
    validators: any;
    asyncValidators: any;
    template: string;
    wrappers: Array<string>;
    hide: boolean;
    hideExpression: boolean | string | ((model: any, formState: any) => boolean);
    expressionProperties: {
        [property: string]: string | ((model: any, formState: any) => boolean);
    } | any;
    formControl: AbstractControl;
    className: string;
    fieldGroupClassName: string;
    fieldGroup: Array<FormlyFieldConfig>;
    fieldArray: FormlyFieldConfig;
    type: string;
    component: any;
    focus: boolean;
    modelOptions: {
        debounce?: {
            default: number;
        };
        updateOn?: 'change' | 'blur' | 'submit';
    };
    defaultValue: any;
    parsers: Array<((value: any) => {})>;
    constructor(key: string);
    setFocus(): this;
    required(): this;
    fxFlex(value: any): this;
    set(property: string, value: any): this;
    setTemplateOption(property: string, value: any): this;
    addTemplateOptions(template_options: FormlyTemplateOptions): this;
    setTranslatedTemplateOptions(translateService: TranslateService): this;
    load(fieldConfig: FormlyFieldConfig): this;
}
export declare class TextDynamicInput extends DynamicInput implements FormlyFieldConfig {
    key: any;
    constructor(key: any);
    setTranslatedTemplateOptions(translateService: TranslateService): this;
}
export declare class NumberDynamicInput extends DynamicInput implements FormlyFieldConfig {
    key: any;
    constructor(key: any);
    setTranslatedTemplateOptions(translateService: TranslateService): this;
}
export declare class CheckboxDynamicInput extends DynamicInput implements FormlyFieldConfig {
    key: any;
    constructor(key: any);
    setTranslatedTemplateOptions(translateService: TranslateService): this;
}
export declare class TextareaDynamicInput extends DynamicInput implements FormlyFieldConfig {
    key: any;
    constructor(key: any);
    setTranslatedTemplateOptions(translateService: TranslateService): this;
}
export declare class SelectDynamicInput extends DynamicInput implements FormlyFieldConfig {
    key: any;
    constructor(key: any);
    setTranslatedTemplateOptions(translateService: TranslateService): this;
    setOptions(options: Array<{
        value: any;
        label: string;
    }>): SelectDynamicInput;
}
