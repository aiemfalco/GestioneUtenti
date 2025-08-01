import { FormControl } from "@angular/forms";
import { ErrorMessageService } from "./text-area/error-message.service"; 

/* classe custom che estende il formControl nativo, aggiungiamo la label e inietiettiamo l'errorService */
export class CustomFormControl extends FormControl {

    constructor(
        formState: any,
        private _label: string,
        private _errorService: ErrorMessageService,
        validators?: any
    ) {
        super(formState, validators);
    }

  get errorMessage(): string | null {
    if (!this.errors || !(this.touched || this.dirty)) return null;

    return this._errorService.getErrorMessage(this.errors, this._label);
}
}