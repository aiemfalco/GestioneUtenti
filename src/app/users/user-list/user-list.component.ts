import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChangeDetectionStrategy } from '@angular/core';

import { Select } from 'primeng/select';
import { usePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora'
import { MyPreset } from '../../../mypreset';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ButtonModule, TableModule, Select, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  users: User[] = []
  actualTheme: object = Aura;
  themes = [
    { label: 'Aura', value: Aura }, 
    { label: 'Lara', value: Lara }, 
    { label: 'Material', value: Material }, 
    { label: 'Nora', value: Nora },
    { label: 'MyPreset', value: MyPreset}
  ];

  constructor(
    private _userService: UserService, 
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers(); // questo fa cambiare l'input(users era vuoto) -> il component diventa dirty quindi deve essere ricontrollato
    const defaultTheme = 'MyPreset'; //const storageItem = localStorage.getItem('theme');
    this.changeTheme(this.themes.find(theme => theme.label === defaultTheme)?.value);
  }

   async changeTheme(preset: object) {
      try {
        await usePreset(preset);
        this.actualTheme = preset;
      } catch (err) {
        console.error('Errore nel cambio preset:', err);
      }
  }

  loadUsers(): void {
    this._userService.getUsers().subscribe(data => { // chiamata HTTP
      this.users = data; // users valorizzato
      this._cd.markForCheck(); // fa scattare i trigger che non scattano con l'onPush e aggiorna quindi il DOM, senza di essa users non viene visualizzato nel template
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