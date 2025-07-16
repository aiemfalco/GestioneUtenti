import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isDark = false;
  number = 0;

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
    }

  counter(): void {
    console.log(this.number++);
  }
}