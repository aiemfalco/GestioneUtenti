import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from '../../text-area/text-area.component';

@Component({
  standalone: true,
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, CommonModule, TextAreaComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  user!: User;
  validationErrors: any = {};
  userID!: number;
  userForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.userID = +this._route.snapshot.paramMap.get('id')!;
    this._userService.getUserById(this.userID).subscribe(user => {
      this.user = user;
      // inizializzo lo userForm con i valori del user selezionato
      console.log(user);
      this.userForm = this._fb.group({
        id: [user.id],
        name: [user.name, Validators.required],
        surname: [user.surname, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        phone: [user.phone, Validators.required]
      });
    });
  }

  onSubmit(): void {
    this._userService.updateUser(this.userID, this.userForm.value).subscribe({
      next: () => this._router.navigate(['/users']),
      error: err => console.error('Errore durante la PUT: ', err)
    });
  }
}