import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(controlName);
    const confirmPassword = control.get('confPassword');

    if (!password || !confirmPassword) {
      return null; // Do nothing if controls are not available yet
    }

    return password.value === confirmPassword.value ? null : { 'passwordMisMatch': true };
  };
}
