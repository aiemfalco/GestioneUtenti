import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './theme-service/theme-service';
import { Select } from 'primeng/select';

interface Theme {
    label: string;
    value: {
        primaryColor: string; 
        backgroundColor: string;
        textColor?: string;
    };
    custom: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonModule, CommonModule, FormsModule, Select],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isDark = false;

  constructor(private _primeng: PrimeNG, private _themeService: ThemeService) {}

  get themes() {
    return this._themeService.themes;
  }

  get actualTheme() {
    return this._themeService.actualTheme;
  }

  changeTheme(theme: Theme) {
    return this._themeService.changeTheme(theme);
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
      const defaultTheme = 'MyPreset'; //const storageItem = localStorage.getItem('theme');
      this._themeService.changeTheme(this._themeService.themes.find(theme => theme.label === defaultTheme)?.value);

      // voglio temi standard e custom all'avvio
      const customThemes = this.getCustomThemesFromLocalStorage();
      this._themeService.themes = [...this._themeService.themes, ...customThemes]; 
    }

    getCustomThemesFromLocalStorage(): Theme[] {
    const stored = localStorage.getItem('customThemes');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error('Errore nel parsing dei temi custom:', e);
      }
    }
    return [];
  }

    clearCustomThemes() {
      this._themeService.themes = this.themes.filter(t => !t.custom);
      localStorage.removeItem('customThemes');
    }

}