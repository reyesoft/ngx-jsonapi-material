import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
export declare class CustomValidators {
    patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn;
    /**
     * @description NoPassswordMatch allows you to display an error if the password does not match.
     * @usageNotes
     * ### Ejemplo
     * ```typescript
     * validation: {
     *     message: {
     *         NoPassswordMatch: 'Mi mensaje'
     *     }
     * }
     * ```
     */
    passwordMatchValidator(control: AbstractControl): void;
}
