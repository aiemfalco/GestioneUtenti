import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from '../../text-area/text-area.component';

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
    console.log(this.userForm.value)
  }

  capitalize(value:string): string {
    return value
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
  }

  onSubmit(): void {
    console.log(this.userForm.value)
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
