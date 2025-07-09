import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, EventEmitter, forwardRef, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { CustomFormControl } from '../CustomFormControl';
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
  @Input() disabled: boolean = false; // serve a disattivare il componente(se true)
  @Input() dropdown: boolean = true; // serve a mostrare il bottone freccia per mostrare le suggestions
  @Input() forceSelection: boolean = false; // (se false) fa accettare input diversi dalle suggestions
  @Input() showClear: boolean = true; // icona per pulire il campo

  @Output() completeMethod = new EventEmitter<string>();
  @Output() onSelect = new EventEmitter<any>();

  private _control: CustomFormControl | null = null;

  get control(): CustomFormControl | null {
    return this._control;
  }

  value: any;
  filtered: any[] = []; // suggestions filtered

  constructor(private injector: Injector) {}
  // In questo modo Angular non cerca subito di risolvere NgControl quando crea il componente,
  // ma lo ottiene solo dopo, quando il ciclo di vita è già avviato: niente più dipendenza circolare
  ngAfterContentInit(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) {
      ngControl.valueAccessor = this;
      this._control = ngControl.control as CustomFormControl;
      //console.log("control:", this._control);
    } else {
      console.warn("NgControl non trovato");
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
}