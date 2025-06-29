import { FormControl } from "@angular/forms";
// import { ErrorMessageService } from "./text-area/error-message.service"; crea dipendenza circolare
// ErrorMessageService->HttpClient->DI root injector->MyAutocompleteComponent->NgControl->DI system->ErrorMessageService

/* classe custom che estende il formControl nativo, aggiungiamo la label e inietiettiamo l'errorService */
export class CustomFormControl extends FormControl {

    constructor(
        formState: any,
        private _label: string,
        // private _errorService: ErrorMessageService,
        validators?: any
    ) {
        super(formState, validators);
    }

  get errorMessage(): string | null {
    if (!this.errors || !(this.touched || this.dirty)) return null;

    // fallback semplice, elimina la dipendenza da ErrorMessageService
    for (const errorKey in this.errors) {
        switch (errorKey) {
            case 'required': return `${this._label} è obbligatorio.`;
            case 'email': return `Email non valida.`;
            case 'phone': return `Telefono non valido.`;
            default: return 'Errore non specificato.';
        }
    }

    return null;
}
}

/* errroMessage che ora grazie alla label può emettere messaggi d'errore personalizzati e non generici
get errorMessage(): string | null {

    if (!this.errors || !(this.touched || this.dirty)) return null;

    return this._errorService.getErrorMessage(this.errors, this._label);
} */