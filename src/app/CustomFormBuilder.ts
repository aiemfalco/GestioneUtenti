import { FormGroup } from '@angular/forms';
import { ErrorMessageService } from './text-area/error-message.service';
import { CustomFormControl } from './CustomFormControl';

/* helper per creare uno userForm con CustomFormControl */
export class CustomFormBuilder {

  constructor(private _errorService: ErrorMessageService) {}

  group(controlsConfig: { [key: string]: { label: string, value: any, validators?: any[] } }): FormGroup {
    const controls: any = {};
    for (const key in controlsConfig) {
      const { label, value, validators } = controlsConfig[key];
      controls[key] = new CustomFormControl(value, label, this._errorService, validators);
    }
    return new FormGroup(controls);
  }
}
