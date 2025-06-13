import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', loadChildren: () =>
        import('./users/users.routs').then(m => m.USER_ROUTES) } // andrà a caricare la UserList
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {}