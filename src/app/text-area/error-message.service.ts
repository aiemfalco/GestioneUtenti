import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private _messages: { [key: string]: string} = {};

  constructor(private _http: HttpClient) {
    this.loadMessages();
  }

  private loadMessages() {
    this._http.get<{ [key: string]: string}>('../../assets/error-messages.json')
    .subscribe(messages => {
      this._messages = messages; // popolo il dic dal json
    });
    
  }

  getErrorMessage(errors: ValidationErrors | null, _label?: string) : string | null {

    if (!errors) return null;

    for (const errorKey of Object.keys(errors)) {
      const getMessage = this._messages[errorKey];
      if(getMessage) {
        return getMessage.replace('{{label}}', _label ?? '');
      }
    }

    return 'Errore non specificato';
  }

}
