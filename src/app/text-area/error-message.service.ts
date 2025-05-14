import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})

export class ErrorMessageService {

  private messages: { [key: string]: (error?: any) => string } = {
    required: () => 'Campo obbligatorio',
    email: () => 'Formato email non valido!',
    minlength: (error)  => `Sono richiesti minimo ${error?.requiredLength} caratteri`,
    maxlength: (error) => `Sono consentiti massimo ${error?.requiredLength} caratteri`
  };

  getErrorMessage(errors: ValidationErrors | null, _label?: string) : string | null {
    if (!errors) return null;

    for (const errorKey of Object.keys(errors)) {
      const getMessage = this.messages[errorKey];
      if(getMessage) {
        return getMessage(errors[errorKey]);
      }
    }

    return 'Errore non specificato';
  }

}
