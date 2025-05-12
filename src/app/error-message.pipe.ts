import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone:true
})
export class ErrorMessagePipe implements PipeTransform {

  transform(control: AbstractControl | null): string | null {
    if (!control || !control.errors || !control.touched) return null;

    if (control.errors['required']) return 'Questo campo è obbligatorio.';
    if (control.errors['email']) return 'Questo formato email non è valido.';
    if (control.errors['minlength']) {
      return `Minimo ${control.errors['minlength'].requiredLength} caratteri richiesti`;
    }
    if (control.errors['maxlength']) {
      return `Massimo ${control.errors['maxlength'].requiredLength} caratteri consentiti`;
    }
    return 'Campo non valido';
  }
}
