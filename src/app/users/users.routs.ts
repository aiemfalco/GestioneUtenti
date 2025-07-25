import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    { path: '', loadComponent: () =>
        import('./user-list/user-list.component').then(m => m.UserListComponent) },
    { path: 'create', loadComponent: () =>
        import('./user-create/user-create.component').then(m => m.UserCreateComponent)},
    { path: 'edit/:id', loadComponent: () =>
        import('./user-edit/user-edit.component').then(m => m.UserEditComponent) },
    { path: ':id', loadComponent: () =>
        import('./user-detail/user-detail.component').then(m => m.UserDetailComponent) }
];