import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from '../error-message.pipe';

@Component({
  selector: 'app-text-area',
  imports: [CommonModule, ErrorMessagePipe, ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor {

  @Input() label!: string;
  @Input() formGroup!: FormGroup;
  @Input() formControlName!: string;
  @Input() placeholder: string = '';

  private _value: string = '';

  get control(): FormControl {
    return this.formGroup.get(this.formControlName) as FormControl
  }

    // Getter and Setter for the form control value
  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val); // Notify form about the change
  }

  // On change callback to propagate the changes
  onChange: any = () => {};

  // On touch callback to track if the field was touched
  onTouched: any = () => {};

  writeValue(value: string): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

