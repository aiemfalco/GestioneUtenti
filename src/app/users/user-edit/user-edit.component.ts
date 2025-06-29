import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
// import { ErrorMessageService } from '../../text-area/error-message.service';
import { TextAreaComponent } from '../../text-area/text-area.component';
import { CustomFormBuilder } from '../../CustomFormBuilder';
import { formatUser } from '../../shared/string.utils';
import { CustomValidators } from '../../CustomValidators';
import { ButtonModule } from 'primeng/button';
// import { MyAutocompleteComponent } from "../../my-autocomplete/my-autocomplete.component";
@Component({
  standalone: true,
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, TextAreaComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  user!: User;
  userID!: number;
  userForm!: FormGroup;
  names_suggested = ['Mario', 'Marco', 'Maria', 'Martina', 'Michele'];
  
  constructor(
    private _Customfb: CustomFormBuilder, // inizializzato una sola volta 
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.userID = +this._route.snapshot.paramMap.get('id')!;
    this._userService.getUserById(this.userID).subscribe(user => {
      this.user = user;
      this.userForm = this._Customfb.group({
            name: {label:'Nome', value: user.name, validators: [CustomValidators.required()]},
            surname: {label: 'Cognome', value: user.surname, validators: [CustomValidators.required()]},
            email: {label: 'Email', value: user.email, validators: [CustomValidators.required(), CustomValidators.email()]},
            phone: {label: 'Telefono', value: user.phone, validators: [CustomValidators.required(), CustomValidators.phone()]}
        })
    });
  }

  onSubmit(): void {
    const formattedUser = formatUser(this.userForm.value);
    this._userService.updateUser(this.userID, formattedUser).subscribe({
      next: () => this._router.navigate(['/users']),
      error: err => console.error('Errore durante la PUT: ', err)
  });
  }
}