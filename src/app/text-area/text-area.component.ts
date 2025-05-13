import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-text-area',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css'
})

export class TextAreaComponent implements ControlValueAccessor {

  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() value = '';
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>(); // comunica i cambiamenti al componente padre (UserEdit/UserCreate)

  constructor(@Optional() @Self() public ngControl: NgControl)
  {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (_:any)=> {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(value: string) {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  /* get errorMessage(): string | null {
  
  const control = this.ngControl?.control;
  if (!control || !control.invalid || !control.touched)
    return null;

  if (control.errors?.['required']) {
    return `Il campo ${this.label} è obbligatorio`;
  }
  if (control.errors?.['email']) {
    return `Inserisci un indirizzo email valido`;
  }
  if (control.errors?.['minlength']) {
    return `${this.label} deve avere almeno ${control.errors['minlength'].requiredLength} caratteri`;
  }
  if (control.errors?.['maxlength']) {
    return `${this.label} può avere al massimo ${control.errors['maxlength'].requiredLength} caratteri`;
  }

  return 'Campo non valido';
} */

get errorMessage(): string | null {
  const control = this.ngControl?.control;
  if (!control || !control.invalid || !control.touched) return null;

  const errors = control.errors!;
  const messages: { [key: string]: string } = {
    required: `Il campo ${this.label} è obbligatorio`,
    email: `Inserisci un indirizzo email valido`,
    minlength: `${this.label} deve avere almeno ${errors['minlength']?.requiredLength} caratteri`,
    maxlength: `${this.label} può avere al massimo ${errors['maxlength']?.requiredLength} caratteri`
  };

  for (const key of Object.keys(errors)) {
    if (messages[key]) return messages[key];
  }

  return 'Campo non valido';
}

}

