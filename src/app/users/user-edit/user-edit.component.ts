import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from '../../text-area/text-area.component';
import { ErrorMessageService } from '../../text-area/error-message.service';
import { CustomFormBuilder } from '../../CustomFormBuilder';
import { formatUser } from '../../shared/string-utils';

@Component({
  standalone: true,
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, CommonModule, TextAreaComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  user!: User;
  userID!: number;
  userForm!: FormGroup;
  
  constructor(
    private _Customfb: CustomFormBuilder, // inizializzato una sola volta 
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router, 
    private _errorService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.userID = +this._route.snapshot.paramMap.get('id')!;
    this._userService.getUserById(this.userID).subscribe(user => {
      this.user = user;
      this.userForm = this._Customfb.group({
            name: {label:'Nome', value: user.name, validators: [Validators.required]}, // specificare Validators in modo da avere un array di oggetti con il message o il default 
            surname: {label: 'Cognome', value: user.surname, validators: [Validators.required]},
            email: {label: 'Email', value: user.email, validators: [Validators.required, Validators.email]},
            phone: {label: 'Telefono', value: user.phone, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]}
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