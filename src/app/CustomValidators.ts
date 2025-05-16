import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    static required(): ValidatorFn {
      return (control : AbstractControl): ValidationErrors | null => {
            const isEmpty = control.value === null || control.value === undefined || control.value === '';
            return isEmpty ? { required: true } : null;
        };
    }

    static phone(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const phoneRegex = /^\d{10}$/;
        const valid = phoneRegex.test(control.value);
        return valid ? null : { phone: true };
      }
    }
    
    static email(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null; // scatta il required, isEmpty true

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = emailRegex.test(control.value);

        return valid ? null : { email: 'Formato email non valido' };
    };
  }

}