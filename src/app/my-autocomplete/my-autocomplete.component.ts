import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, Self } from '@angular/core';
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

  @Input() suggestions: any[] = []; // riceverà names dal padre
  @Input() field: string = ''; // input del componente valorizzato da fuori
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false; // serve a disattivare il componente(true)
  @Input() dropdown: boolean = true; // serve a mostrare il bottone freccia per mostrare le suggestions
  @Input() forceSelection: boolean = false; // (false) fa accettare input diversi dalle suggestions

  @Output() completeMethod = new EventEmitter<string>();
  @Output() onSelect = new EventEmitter<any>();

  private _control: AbstractControl | null = null; // non viene inizializzata correttamente

  get control(): AbstractControl | null {
    return this._control;
  }

  value: any;
  filtered: any[] = []; // suggestions filtered

  //costruttore vuoto->ngControl non viene mai assegnato->this._control è null
  constructor() {}

  ngAfterContentInit(): void {
  const ngControl = (this as any)._ngControl as NgControl | null;
  if (ngControl) {
    ngControl.valueAccessor = this;
    this._control = ngControl.control;
  }
} 

  /* NgControl va iniettato per forza nel costruttore ma non usato!
  constructor(@Optional() @Self() @Inject(NgControl) private _ngControl: NgControl | null) {}

  //_control viene inizializzato dopo la fase di content init in quando angular ha già completato
  // l'injection del form control
  ngAfterContentInit(): void {
  if (this._ngControl) {
    this._ngControl.valueAccessor = this;
    this._control = this._ngControl.control;
  }
} */

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
    // console.log("I'm in onFilter ", this.suggestions);
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