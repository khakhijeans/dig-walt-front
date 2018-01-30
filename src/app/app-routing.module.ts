import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

import { HOME_ROUTES } from "./shared/routes/home-layout.routes";
import { LOGIN_ROUTES } from "./shared/routes/login-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '', component: HomeLayoutComponent, data: { title: 'Home' }, children: HOME_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: LoginLayoutComponent, data: { title: 'Login' }, children: LOGIN_ROUTES },

  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
