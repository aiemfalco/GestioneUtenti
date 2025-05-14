import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageService } from './error-message.service';
import { CustomFormControl } from '../CustomFormControl';
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

  constructor(@Optional() @Self() public ngControl: NgControl, private _errorMessageService: ErrorMessageService)
  {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control(): CustomFormControl | null {
    return this.ngControl?.control as CustomFormControl;
  }

  get errorMessage() : string | null {
    return this.control?.errorMessage ?? null;
  }

  get shouldShowError(): boolean {
    const ctrl = this.control;
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
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

}

