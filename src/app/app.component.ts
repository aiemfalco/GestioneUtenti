import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonModule, CommonModule, DropdownModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isDark = false;
  defaultTheme: string = 'nora';
  actualTheme: string = '';
  
  constructor(private _primeng: PrimeNG) {}

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
      // applica l'ultimo tema salvato oppure il tema di default 
      const saved = localStorage.getItem('theme') || this.defaultTheme;
      this.changeTheme(saved); 

    }

  onThemeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value) {
      console.log("tema cambiato in: ", value);
      this.changeTheme(value);
      this.actualTheme = value;
    }
  }

  changeTheme(presetName: string) {
    const themes = ['nora', 'lara', 'aura', 'material'];
    if (themes.includes(presetName)) {
      this._primeng.theme.set(presetName);
      const body = document.body;
      themes.forEach(t => body.classList.remove(t));
      body.classList.add(presetName);

      localStorage.setItem('theme', presetName);
      console.log("tema impostato: ", presetName);
    } else {
      console.error('Tema non valido:', presetName);
    }
  }
}