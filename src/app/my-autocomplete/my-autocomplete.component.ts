import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, EventEmitter, forwardRef, inject, Inject, Input, Optional, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, NgControl, AbstractControl } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
@Component({
  selector: 'app-my-autocomplete',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule],
  templateUrl: './my-autocomplete.component.html',
  styleUrl: './my-autocomplete.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyAutocompleteComponent),
      multi: true
    }
  ]
})
export class MyAutocompleteComponent implements ControlValueAccessor, AfterContentInit {

  @Input() suggestions: any[] = [];
  @Input() field: string = 'label';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false; // serve a disattivare il componente(true)
  @Input() dropdown: boolean = true; // serve a mostrare il bottone freccia per mostrare le suggestions
  @Input() forceSelection: boolean = false; // (false) fa accettare input diversi dalle suggestions

  @Output() completeMethod = new EventEmitter<string>();
  @Output() onSelect = new EventEmitter<any>();

  private _control: AbstractControl | null = null;

  get control(): AbstractControl | null {
    return this._control;
  }

  value: any;
  filtered: any[] = []; // suggestions filtered

  // avevo dipendenza circolare perchè...
  constructor() {}

  ngAfterContentInit(): void {
  const ngControl = (this as any)._ngControl as NgControl | null;
  if (ngControl) {
    ngControl.valueAccessor = this;
    this._control = ngControl.control;
  }
}

  // interfaccia di ControlValueAccessor
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
  
  // metodo per filtrare i suggerimenti
  onFilter(event: any) {
    console.log('onFilter chiamato con: ', event.query);
    const query = event.query.toLowerCase();
    this.filtered = this.suggestions.filter(s =>
    typeof s === 'string' ? s.toLowerCase().includes(query)
                          : s[this.field]?.toLowerCase().includes(query)
    );
  }

  onItemSelect(event: any) {
    this.onChange(event);
    this.onTouched();
    this.onSelect.emit(event);
  }

  // gestione degli errori spostata nel componente
 get errorMessage(): string | null {
  // eliminata la dipendenza da CustomFormControl e anche da ErrorMessageService
  if (!this._control || !(this._control.dirty || this._control.touched)) return null;

  const errors = this._control.errors;
  if (!errors) return null;

  if (errors['required']) return `${this.placeholder || 'Campo obbligatorio'} è obbligatorio.`;
  if (errors['email']) return `Email non valida`;
  if (errors['phone']) return `Numero di telefono non valido`;

  return 'Errore non specificato';
  }
}






  /*get control() {
    return this._ngControl?.control;
  }

  get touched(): boolean {
    return this.control?.touched ?? false;
  }

  get dirty(): boolean {
    return this.control?.dirty ?? false;
  }

  get invalid(): boolean {
    return this.control?.invalid ?? false;
  }

  get errors(): any {
    return this.control?.errors;
  } */

