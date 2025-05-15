import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  getErrorMessage(errors: ValidationErrors | null, _label?: string) : string | null {

    if (!errors) return null;

    // messages in un json, in modo da caricarlo dinamicamente
    const messages: { [key: string]: (error?: any) => string } = {
    required: () => `Il campo ${_label} è obbligatorio`,
    email: () => 'Formato email non valido!',
    minlength: (error)  => `Per il campo ${_label} sono richiesti ${error?.requiredLength} caratteri`,
    maxlength: (error)  => `Per il campo ${_label} sono richiesti massimo ${error?.requiredLength} caratteri`,
  };

    for (const errorKey of Object.keys(errors)) {
      const getMessage = messages[errorKey];
      if(getMessage) {
        return getMessage(errors[errorKey]);
      }
    }

    return 'Errore non specificato';
  }

}
