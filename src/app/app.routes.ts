import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', loadChildren: () =>
        import('./users/users.routs').then(m => m.USER_ROUTES) },
    { path: 'customizetheme', loadComponent: () =>
        import('./theme-service/customize-theme.component').then(m => m.CustomizeTheme) }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {}