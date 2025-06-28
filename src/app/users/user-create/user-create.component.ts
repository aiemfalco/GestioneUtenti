import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { formatUser } from '../../shared/string.utils';
import { ButtonModule } from 'primeng/button';
/* wrapped components */
import { CustomFormBuilder } from '../../CustomFormBuilder';
import { CustomValidators } from '../../CustomValidators';
import { MyAutocompleteComponent } from "../../my-autocomplete/my-autocomplete.component";

@Component({
  standalone: true,
  selector: 'app-user-create',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, MyAutocompleteComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {

  userForm!: FormGroup;
  names = ['Mario', 'Marco', 'Maria', 'Martina', 'Michele'];
  names_suggested = [...this.names];

  constructor(
    private _Customfb: CustomFormBuilder, // inizializzato una sola volta 
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this._Customfb.group({
      name: {label:'Nome', value: '', validators: [CustomValidators.required()], useCustomControl: true},
      surname: {label: 'Cognome', value: '', validators: [CustomValidators.required()], useCustomControl: true},
      email: {label: 'Email', value: '', validators: [CustomValidators.required(), CustomValidators.email()], useCustomControl: true},
      phone: {label: 'Telefono', value: '', validators: [CustomValidators.required(), CustomValidators.phone()], useCustomControl: true}
    })
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formattedUser = formatUser(this.userForm.value);
    this._userService.createUser(formattedUser).subscribe({
        next: () => this._router.navigate(['/users'])
    });
  }

  // metodo per il filter
  onNameSearch(query: string): void {
    const lower = query.toLowerCase();
    this.names_suggested = this.names.filter(n =>
      n.toLowerCase().includes(lower)
    );
  } 
}
