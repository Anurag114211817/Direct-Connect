// src/app/auth/auth.routes.ts
import { Routes } from '@angular/router';
import { loginGuard } from '../../guards/auth.guard';
import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
        canActivate: [loginGuard],
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./signup/signup.component').then((m) => m.SignupComponent),
        canActivate: [loginGuard],
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
