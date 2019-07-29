import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
    public patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) return null; // if control is empty return no error

            const VALID = regex.test(control.value); // test the value of the control against the regexp supplied

            return VALID ? null : error; // if true, return no error (no error), else return error passed in the second parameter
        };
    }

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
    public passwordMatchValidator(control: AbstractControl) {
        const PASSWORD: string = control.get('password').value; // get password from our password form control
        const CONFIRM_PASSWORD: string = control.get('confirm_password').value; // get password from our confirmPassword form control

        // compare is the password math
        if (PASSWORD !== CONFIRM_PASSWORD) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirm_password').setErrors({ NoPassswordMatch: true });
        }
    }
}
