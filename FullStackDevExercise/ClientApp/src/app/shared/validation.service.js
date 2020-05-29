"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationService = /** @class */ (function () {
    function ValidationService() {
    }
    ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var config = {
            'required': 'This field is Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'whitespace': 'Please enter a valid values',
            'onlyNumberAllow': 'Please enter number only',
            'onlyNumber5DigitAllow': 'Please enter number length between 1 to 5',
            'oneToTenDigitAllow': 'Please enter number One To Ten Digit',
            'zeroToTenDigitAllow': 'Please enter zero To Ten number',
            'TwoDigitAllow': 'Please enter 2 digit value',
            'digitAllow': 'Please enter digit',
            'monthValidation': 'monthValidation',
            'hoursValidation': 'hoursValidator',
            'minutesValidation': 'minutesValidator',
            'hourMinuteValidator': 'hourMinuteValidator',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': "Minimum length " + validatorValue.requiredLength,
            'invalidRequired': "" + validatorValue.message
        };
        return config[validatorName];
    };
    ValidationService.creditCardValidator = function (control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        }
        else {
            return { 'invalidCreditCard': true };
        }
    };
    /* Dg: only Number validation between 3 to 6 */
    ValidationService.onlyNumberBetWeen3to6Validator = function (control) {
        var ctrl = String(control.value);
        if (ctrl.match(/^[0-9]{3,6}$/)) {
            return null;
        }
        else {
            return { 'onlyNumberAllow': true };
        }
    };
    ValidationService.zeroToTenDigitValidator = function (control) {
        ///*^([0-9]|10)$*/
        var ctrl = String(control.value);
        if (ctrl.match(/^([0-9]|0|01|02|03|04|05|06|07|08|09|10)$/)) {
            return null;
        }
        else {
            return { 'zeroToTenDigitAllow': true };
        }
    };
    ValidationService.oneToTenDigitValidator = function (control) {
        var ctrl = String(control.value);
        if (ctrl.match(/^(?:[1-9]|[1-9]|10)$/)) {
            return null;
        }
        else {
            return { 'oneToTenDigitAllow': true };
        }
    };
    ValidationService.monthValidator = function (control) {
        var ctrl = String(control.value);
        if (ctrl.match(/^([1-9]|[1-5][0-9]|60|all)$/)) {
            return null;
        }
        else {
            return { 'monthValidation': true };
        }
    };
    ValidationService.TwoDigitValidator = function (control) {
        var ctrl = String(control.value);
        if (ctrl.match((/^[0-9]{1,2}$/))) {
            return null;
        }
        else {
            return { 'TwoDigitAllow': true };
        }
    };
    ValidationService.hourMinuteValidator = function (control) {
        var ctrl = String(control.value);
        if (ctrl.match((/^\d{1,2}(?:\.\d{1,2})?$/))) {
            return null;
        }
        else {
            return { 'hourMinuteValidator': true };
        }
    };
    ValidationService.hoursValidator = function (control) {
        var ctrl = String(control.value);
        if (ctrl.match((/^([0-9]|00|0|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16)$/))) {
            return null;
        }
        else {
            return { 'hoursValidation': true };
        }
    };
    ValidationService.minutesValidator = function (control) {
        var ctrl = String(control.value);
        if (ctrl.match((/^[0-5]?[0-9]$/))) {
            return null;
        }
        else {
            return { 'minutesValidation': true };
        }
    };
    /*Number Validation allow 4 digit number  */
    ValidationService.onlyNumber5DigitValidator = function (control) {
        var ctrl = String(control.value);
        if (ctrl.match(/^[0-9]{1,5}$/)) {
            return null;
        }
        else {
            return { 'onlyNumber5DigitAllow': true };
        }
    };
    ValidationService.onlyNumberValidator = function (control) {
        var ctrl = String(control.value);
        if (ctrl != "")
            ctrl = ctrl.toString().replace(/\s/g, "");
        if (ctrl.match(/^.[0-9]*$/) || (control.value === null || control.value === "")) {
            return null;
        }
        else {
            return { 'onlyNumberAllow': true };
        }
    };
    ValidationService.emailValidator = function (control) {
        if (control.value === null)
            return null;
        var ctrl = control.value.trim();
        // RFC 2822 compliant regex
        if (ctrl.match(/^\w+([-+.']\w+)*@[^_\W]+([-.]\w+)*\.\w+([-.]\w+)*([A-Za-z])$/)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    ValidationService.phoneNumberValidator = function (control) {
        if (control.value === null || control.value === "")
            return null;
        if (control.value.match(/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)) {
            return null;
        }
        else {
            return { 'invalidPhoneNumber': true };
        }
    };
    ValidationService.faxNumberValidator = function (control) {
        if (control.value === null || control.value === "")
            return null;
        if (control.value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)) {
            return null;
        }
        else {
            return { 'invalidFaxNumber': true };
        }
    };
    ValidationService.extPhoneNumberValidator = function (control) {
        if (control.value === null || control.value === "")
            return null;
        var ctrl = String(control.value);
        if (ctrl.match(/^[0-9]{1,4}$/)) {
            return null;
        }
        else {
            return { 'invalidExtPhoneNumber': true };
        }
    };
    ValidationService.passwordValidator = function (control) {
        if (control.value === null)
            return null;
        if (control.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    };
    ValidationService.customValidator = function (control) {
        if (!control.value && control.value.length <= 0) {
            return null;
        }
        else {
            return { 'invalidRequired': true };
        }
    };
    ValidationService.noWhiteSpace = function (control) {
        if (control.value === null)
            return null;
        if (control.value.length === 0)
            return null;
        var isWhitespace = (control.value || '').trim().length === 0;
        var isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
    ValidationService.noWhiteSpaceNoRequired = function (control) {
        var isWhitespace = (control.value || '').trim().length === 0;
        var isValid = !isWhitespace;
        return isValid ? null : { 'whitespaceNoRequired': true };
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
exports.confirmPasswordValidator = function (control) {
    if (!control.parent || !control) {
        return null;
    }
    var password = control.parent.get('newPassword');
    var passwordConfirm = control.parent.get('confirmPassword');
    if (!password || !passwordConfirm) {
        return null;
    }
    if (passwordConfirm.value === '') {
        return null;
    }
    if (password.value === passwordConfirm.value) {
        return null;
    }
    return { 'passwordsNotMatching': true };
};
//# sourceMappingURL=validation.service.js.map