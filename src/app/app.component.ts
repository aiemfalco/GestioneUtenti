import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './theme-service/theme-service';

interface Theme {
    label: string;
    value: {
        primaryColor: string; 
        backgroundColor: string;
        textColor?: string;
    };
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isDark = false;

  constructor(private _primeng: PrimeNG, private _themeService: ThemeService) {}

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
    }
}