import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorMessagePipe } from "../../error-message.pipe";

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorMessagePipe],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  userForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // inizializzo lo userForm con i campi vuoti
    console.log('sono dentro');
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  capitalize(value:string): string {
    return value
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const rawValue = this.userForm.value;

    const formattedUser = {
      ...rawValue,
      name: this.capitalize(rawValue.name),
      surname: this.capitalize(rawValue.surname)
    }

    this._userService.createUser(formattedUser).subscribe({
        next: () => this._router.navigate(['/users'])
    });
}
}
