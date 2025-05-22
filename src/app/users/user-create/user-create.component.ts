import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomFormBuilder } from '../../CustomFormBuilder';
import { formatUser } from '../../shared/string.utils';
import { CustomValidators } from '../../CustomValidators';
import { TextAreaComponent } from '../../text-area/text-area.component';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, CommonModule, TextAreaComponent, ButtonModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  userForm!: FormGroup;

  constructor(
    private _Customfb: CustomFormBuilder, // inizializzato una sola volta 
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this._Customfb.group({
      name: {label:'Nome', value: '', validators: [CustomValidators.required()]},
      surname: {label: 'Cognome', value: '', validators: [CustomValidators.required()]},
      email: {label: 'Email', value: '', validators: [CustomValidators.required(), CustomValidators.email()]},
      phone: {label: 'Telefono', value: '', validators: [CustomValidators.required(), CustomValidators.phone()]}
    })
  }

  onSubmit(): void {
    console.log(this.userForm.value);
    console.log(this.userForm.valid); // tutto ok
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
