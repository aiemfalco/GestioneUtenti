import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users/create', loadComponent: () =>
        import('./users/user-create/user-create.component').then(m => m.UserCreateComponent)},
    { path: 'users', loadComponent: () =>
        import('./users/user-list/user-list.component').then(m => m.UserListComponent) },
    { path: 'users/edit/:id', loadComponent: () =>
        import('./users/user-edit/user-edit.component').then(m => m.UserEditComponent) },
    { path: 'users/:id', loadComponent: () =>
        import('./users/user-detail/user-detail.component').then(m => m.UserDetailComponent) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}