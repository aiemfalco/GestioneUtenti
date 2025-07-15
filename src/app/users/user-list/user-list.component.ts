import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ButtonModule, TableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  users: User[] = []

  constructor(
    private _userService: UserService, 
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    }

  loadUsers(): void {
    this._userService.getUsers().subscribe(data => {
      this.users = data;
      this._cd.markForCheck();
    });
  }

  viewUser(id: number) {
    this._router.navigate(['/users', id])
  }

  editUser(id: number) {
    this._router.navigate(['/users/edit', id]);
  }

  deleteUser(id:number): void {
    this._userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}