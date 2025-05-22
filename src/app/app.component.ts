import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private _primeng: PrimeNG) {}

  ngOnInit(): void {
      this._primeng.ripple.set(true);
  }
}
