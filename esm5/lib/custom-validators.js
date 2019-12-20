var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators.prototype.patternValidator = function (regex, error) {
        return function (control) {
            if (!control.value)
                return null; // if control is empty return no error
            var VALID = regex.test(control.value); // test the value of the control against the regexp supplied
            return VALID ? null : error; // if true, return no error (no error), else return error passed in the second parameter
        };
    };
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
    CustomValidators.prototype.passwordMatchValidator = function (control) {
        var PASSWORD = control.get('password').value; // get password from our password form control
        var CONFIRM_PASSWORD = control.get('confirm_password').value; // get password from our confirmPassword form control
        // compare is the password math
        if (PASSWORD !== CONFIRM_PASSWORD) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirm_password').setErrors({ NoPassswordMatch: true });
        }
    };
    return CustomValidators;
}());
export { CustomValidators };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXZhbGlkYXRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9jdXN0b20tdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQUFBO0lBaUNBLENBQUM7SUFoQ1UsMkNBQWdCLEdBQXZCLFVBQXdCLEtBQWEsRUFBRSxLQUF1QjtRQUMxRCxPQUFPLFVBQUMsT0FBd0I7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsc0NBQXNDO1lBRXZFLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsNERBQTREO1lBRXJHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLHdGQUF3RjtRQUN6SCxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSSxpREFBc0IsR0FBN0IsVUFBOEIsT0FBd0I7UUFDbEQsSUFBTSxRQUFRLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyw4Q0FBOEM7UUFDdEcsSUFBTSxnQkFBZ0IsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMscURBQXFEO1FBRTdILCtCQUErQjtRQUMvQixJQUFJLFFBQVEsS0FBSyxnQkFBZ0IsRUFBRTtZQUMvQix3RUFBd0U7WUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDekU7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4sIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbVZhbGlkYXRvcnMge1xuICAgIHB1YmxpYyBwYXR0ZXJuVmFsaWRhdG9yKHJlZ2V4OiBSZWdFeHAsIGVycm9yOiBWYWxpZGF0aW9uRXJyb3JzKTogVmFsaWRhdG9yRm4ge1xuICAgICAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xuICAgICAgICAgICAgaWYgKCFjb250cm9sLnZhbHVlKSByZXR1cm4gbnVsbDsgLy8gaWYgY29udHJvbCBpcyBlbXB0eSByZXR1cm4gbm8gZXJyb3JcblxuICAgICAgICAgICAgY29uc3QgVkFMSUQgPSByZWdleC50ZXN0KGNvbnRyb2wudmFsdWUpOyAvLyB0ZXN0IHRoZSB2YWx1ZSBvZiB0aGUgY29udHJvbCBhZ2FpbnN0IHRoZSByZWdleHAgc3VwcGxpZWRcblxuICAgICAgICAgICAgcmV0dXJuIFZBTElEID8gbnVsbCA6IGVycm9yOyAvLyBpZiB0cnVlLCByZXR1cm4gbm8gZXJyb3IgKG5vIGVycm9yKSwgZWxzZSByZXR1cm4gZXJyb3IgcGFzc2VkIGluIHRoZSBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIE5vUGFzc3N3b3JkTWF0Y2ggYWxsb3dzIHlvdSB0byBkaXNwbGF5IGFuIGVycm9yIGlmIHRoZSBwYXNzd29yZCBkb2VzIG5vdCBtYXRjaC5cbiAgICAgKiBAdXNhZ2VOb3Rlc1xuICAgICAqICMjIyBFamVtcGxvXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIHZhbGlkYXRpb246IHtcbiAgICAgKiAgICAgbWVzc2FnZToge1xuICAgICAqICAgICAgICAgTm9QYXNzc3dvcmRNYXRjaDogJ01pIG1lbnNhamUnXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcHVibGljIHBhc3N3b3JkTWF0Y2hWYWxpZGF0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSB7XG4gICAgICAgIGNvbnN0IFBBU1NXT1JEOiBzdHJpbmcgPSBjb250cm9sLmdldCgncGFzc3dvcmQnKS52YWx1ZTsgLy8gZ2V0IHBhc3N3b3JkIGZyb20gb3VyIHBhc3N3b3JkIGZvcm0gY29udHJvbFxuICAgICAgICBjb25zdCBDT05GSVJNX1BBU1NXT1JEOiBzdHJpbmcgPSBjb250cm9sLmdldCgnY29uZmlybV9wYXNzd29yZCcpLnZhbHVlOyAvLyBnZXQgcGFzc3dvcmQgZnJvbSBvdXIgY29uZmlybVBhc3N3b3JkIGZvcm0gY29udHJvbFxuXG4gICAgICAgIC8vIGNvbXBhcmUgaXMgdGhlIHBhc3N3b3JkIG1hdGhcbiAgICAgICAgaWYgKFBBU1NXT1JEICE9PSBDT05GSVJNX1BBU1NXT1JEKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGV5IGRvbid0IG1hdGNoLCBzZXQgYW4gZXJyb3IgaW4gb3VyIGNvbmZpcm1QYXNzd29yZCBmb3JtIGNvbnRyb2xcbiAgICAgICAgICAgIGNvbnRyb2wuZ2V0KCdjb25maXJtX3Bhc3N3b3JkJykuc2V0RXJyb3JzKHsgTm9QYXNzc3dvcmRNYXRjaDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==