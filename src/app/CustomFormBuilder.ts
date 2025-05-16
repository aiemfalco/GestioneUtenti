import { FormGroup } from '@angular/forms';
import { ErrorMessageService } from './text-area/error-message.service';
import { CustomFormControl } from './CustomFormControl';
import { Injectable } from '@angular/core';

/* helper per creare uno userForm con CustomFormControl */
@Injectable({
    providedIn: 'root'
})
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
