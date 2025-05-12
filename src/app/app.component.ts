import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserListComponent } from "./users/user-list/user-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestioneUtenti';
}
