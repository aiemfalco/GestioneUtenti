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
    // ripristina il tema salvato al load
    const saved = localStorage.getItem('theme') || 'nora';
    this.changeTheme(saved);
  }

  onThemeChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  if (value) {
    this.changeTheme(value);
  }
}

  changeTheme(presetName: string) {
    this._primeng.theme.set(presetName);
    localStorage.setItem('theme', presetName);
  }

}