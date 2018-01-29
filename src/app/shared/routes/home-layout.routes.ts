import { Routes, RouterModule } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeLayoutPagesModule'
  }
];