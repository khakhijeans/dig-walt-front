import { Routes, RouterModule } from '@angular/router';

export const LOGIN_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginLayoutPagesModule'
  }
];