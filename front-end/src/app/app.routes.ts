import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(
        (module) => module.HomeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'chat/:id',
    loadComponent: () =>
      import('./pages/chat/chat.component').then(
        (module) => module.ChatComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        (module) => module.LoginComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then(
        (module) => module.SignupComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (module) => module.PageNotFoundComponent
      ),
    canActivate: [authGuard],
  },
];
