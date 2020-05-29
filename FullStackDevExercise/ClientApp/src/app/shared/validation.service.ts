import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config: any = {
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
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'invalidRequired': `${validatorValue.message}`
    };

    return config[validatorName];
  }

  static creditCardValidator(control: any) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }
  /* Dg: only Number validation between 3 to 6 */
  static onlyNumberBetWeen3to6Validator(control: any) {
    var ctrl = String(control.value);
    if (ctrl.match(/^[0-9]{3,6}$/)) {
      return null;
    } else {
      return { 'onlyNumberAllow': true };
    }
  }
  static zeroToTenDigitValidator(control: any) {
    ///*^([0-9]|10)$*/
    var ctrl = String(control.value);
    if (ctrl.match(/^([0-9]|0|01|02|03|04|05|06|07|08|09|10)$/)) {
      return null;
    } else {
      return { 'zeroToTenDigitAllow': true };
    }
  }

  static oneToTenDigitValidator(control: any) {
    var ctrl = String(control.value);
    if (ctrl.match(/^(?:[1-9]|[1-9]|10)$/)) {
      return null;
    } else {
      return { 'oneToTenDigitAllow': true };
    }
  }

  static monthValidator(control: any) {
    var ctrl = String(control.value);
    if (ctrl.match(/^([1-9]|[1-5][0-9]|60|all)$/)) {
      return null;
    } else {
      return { 'monthValidation': true };
    }
  }


  static TwoDigitValidator(control: any) {
    var ctrl = String(control.value);
    if (ctrl.match((/^[0-9]{1,2}$/))) {
      return null;
    } else {
      return { 'TwoDigitAllow': true };
    }
  }

  static hourMinuteValidator(control: any) {
    var ctrl = String(control.value);
    if (ctrl.match((/^\d{1,2}(?:\.\d{1,2})?$/))) {
      return null;
    } else {
      return { 'hourMinuteValidator': true };
    }
  }

  static hoursValidator(control: any) {
    var ctrl = String(control.value);
    if (ctrl.match((/^([0-9]|00|0|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16)$/))) {
      return null;
    } else {
      return { 'hoursValidation': true };
    }
  }

  static minutesValidator(control: any) {
    var ctrl = String(control.value);
    if (ctrl.match((/^[0-5]?[0-9]$/))) {
      return null;
    } else {
      return { 'minutesValidation': true };
    }
  }

  /*Number Validation allow 4 digit number  */
  static onlyNumber5DigitValidator(control: any) {
    var ctrl = String(control.value);
    if (ctrl.match(/^[0-9]{1,5}$/)) {
      return null;
    } else {
      return { 'onlyNumber5DigitAllow': true };
    }
  }

  static onlyNumberValidator(control: any) {
    var ctrl = String(control.value);
    if (ctrl != "")
      ctrl = ctrl.toString().replace(/\s/g, "");
    if (ctrl.match(/^.[0-9]*$/) || (control.value === null || control.value === "")) {
      return null;
    } else {
      return { 'onlyNumberAllow': true };
    }
  }


  static emailValidator(control: any) {
    if (control.value === null) return null;
    var ctrl = control.value.trim();
    // RFC 2822 compliant regex
    if (ctrl.match(/^\w+([-+.']\w+)*@[^_\W]+([-.]\w+)*\.\w+([-.]\w+)*([A-Za-z])$/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static phoneNumberValidator(control: any) {
    if (control.value === null || control.value === "") return null;
    if (control.value.match(/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)) {
      return null;
    } else {
      return { 'invalidPhoneNumber': true };
    }
  }

  static faxNumberValidator(control: any) {
    if (control.value === null || control.value === "") return null;
    if (control.value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)) {
      return null;
    } else {
      return { 'invalidFaxNumber': true };
    }
  }

  static extPhoneNumberValidator(control: any) {
    if (control.value === null || control.value === "") return null;
    var ctrl = String(control.value);
    if (ctrl.match(/^[0-9]{1,4}$/)) {
      return null;
    } else {
      return { 'invalidExtPhoneNumber': true };
    }
  }

  static passwordValidator(control: any) {
    if (control.value === null) return null;
    if (control.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static customValidator(control: any) {
    if (!control.value && control.value.length <= 0) {
      return null;
    } else {
      return { 'invalidRequired': true };
    }
  }

  static noWhiteSpace(control: any) {
    if (control.value === null) return null;
    if (control.value.length === 0) return null;
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }



  static noWhiteSpaceNoRequired(control: any) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespaceNoRequired': true }
  }


}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('newPassword');
  const passwordConfirm = control.parent.get('confirmPassword');

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
