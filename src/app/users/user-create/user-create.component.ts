import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from '../../text-area/text-area.component';
import { ErrorMessageService } from '../../text-area/error-message.service';
import { CustomFormBuilder } from '../../CustomFormBuilder';
import { capitalize, formatUser } from '../../shared/string-utils';

@Component({
  standalone: true,
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, CommonModule, TextAreaComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  userForm!: FormGroup;

  constructor(
    private _Customfb: CustomFormBuilder, // inizializzato una sola volta 
    private _userService: UserService,
    private _router: Router,
    private _errorService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.userForm = this._Customfb.group({
      name: {label:'Nome', value: '', validators: [Validators.required]},
      surname: {label: 'Cognome', value: '', validators: [Validators.required]},
      email: {label: 'Email', value: '', validators: [Validators.required, Validators.email]},
      phone: {label: 'Telefono', value: '', validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]}
    })
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formattedUser = formatUser(this.userForm.value);
    this._userService.createUser(formatUser(formattedUser)).subscribe({
        next: () => this._router.navigate(['/users'])
    });
  }
}
