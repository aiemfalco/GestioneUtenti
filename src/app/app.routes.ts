import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', loadChildren: () =>
        import('./users/users.routs').then(m => m.USER_ROUTES) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}