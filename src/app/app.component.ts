import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { usePreset } from '@primeng/themes';
import { Select } from 'primeng/select';

import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonModule, CommonModule, DropdownModule, FormsModule, Select],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isDark = false;
  actualTheme: object = Aura
  themes = [
    { label: 'Aura', value: Aura }, 
    { label: 'Lara', value: Lara }, 
    { label: 'Material', value: Material }, 
    { label: 'Nora', value: Nora }
  ];

  constructor(private _primeng: PrimeNG) {
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-mode', this.isDark);
    localStorage.setItem('dark-mode', this.isDark ? 'true' : 'false');
  }

  ngOnInit(): void {
      this._primeng.ripple.set(true);
      this.isDark = localStorage.getItem('dark-mode') === 'true';
      if (this.isDark) {
        document.body.classList.add('dark-mode');
      }
      // applica l'ultimo tema salvato
      const storageItem = localStorage.getItem('theme');
      if (storageItem) {
        console.log("Tema caricato al log: ", storageItem);
        this.changeTheme(this.themes.find(theme => theme.label === storageItem)!.value)
      }
    }
    
  async changeTheme(preset: object) {
      try {
        await usePreset(preset);
        this.actualTheme = preset
        console.log('Preset' , preset, "applicato");
      } catch (err) {
        console.error('Errore nel cambio preset:', err);
      }
  }
}