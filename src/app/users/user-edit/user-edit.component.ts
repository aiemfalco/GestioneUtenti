import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { CustomFormBuilder } from '../../CustomFormBuilder';
import { formatUser } from '../../shared/string.utils';
import { CustomValidators } from '../../CustomValidators';
import { ButtonModule } from 'primeng/button';
import { MyAutocompleteComponent } from "../../my-autocomplete/my-autocomplete.component";
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, MyAutocompleteComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  user!: User;
  userID!: number;
  userForm!: FormGroup;
  names_suggested = ['Mario', 'Marco', 'Maria', 'Martina', 'Michele']; // verrano filtrati dal onFilter presente in MyAutocomplete
  
  constructor(
    private _Customfb: CustomFormBuilder, // inizializzato una sola volta 
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userID = +this._route.snapshot.paramMap.get('id')!;
    this._userService.getUserById(this.userID).subscribe(user => {
      this.user = user;
      this.userForm = this._Customfb.group({
            name: {label:'Nome', value: user.name, validators: [CustomValidators.required()], useCustomControl: true},
            surname: {label: 'Cognome', value: user.surname, validators: [CustomValidators.required()], useCustomControl: true},
            email: {label: 'Email', value: user.email, validators: [CustomValidators.required(), CustomValidators.email()], useCustomControl: true},
            phone: {label: 'Telefono', value: user.phone, validators: [CustomValidators.required(), CustomValidators.phone()], useCustomControl: true}
        })
    });
    this._cd.markForCheck();
  }

  onSubmit(): void {
    const formattedUser = formatUser(this.userForm.value);
    this._userService.updateUser(this.userID, formattedUser).subscribe({
      next: () => this._router.navigate(['/users']),
      error: err => console.error('Errore durante la PUT: ', err)
  });
  }
}