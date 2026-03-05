import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(
        (module) => module.HomeComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'chat/:id',
    loadComponent: () =>
      import('./pages/chat/chat.component').then(
        (module) => module.ChatComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (module) => module.PageNotFoundComponent,
      ),
    canActivate: [authGuard],
  },
];
