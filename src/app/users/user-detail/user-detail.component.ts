import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {

  user!: User;

  constructor(private _route: ActivatedRoute,
    private _userService: UserService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('id')!;
    this._userService.getUserById(id).subscribe({
      next: data => {
        this.user = data;
        this._cd.markForCheck();
      },
      error: err => console.error('Errore caricamento user: ', err)
    });
  }
  
}
