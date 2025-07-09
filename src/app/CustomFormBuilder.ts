import { FormControl, FormGroup } from '@angular/forms';
import { ErrorMessageService } from './text-area/error-message.service';
import { CustomFormControl } from './CustomFormControl';
import { Injectable } from '@angular/core';

/* helper per creare uno userForm con CustomFormControl */
@Injectable({
    providedIn: 'root'
})
export class CustomFormBuilder {
  
  constructor(private _errorService: ErrorMessageService) {}

 group(controlsConfig: {[key: string]: { value: any, label: string, validators?: any[], useCustomControl?: boolean } }): FormGroup {
  const group: any = {};
  for (const key in controlsConfig) {
    const config = controlsConfig[key];

    group[key] = config.useCustomControl === false
      ? new FormControl(config.value, config.validators)                   
      : new CustomFormControl(config.value, config.label, this._errorService, config.validators); 
    }
    return new FormGroup(group);
  }
}
