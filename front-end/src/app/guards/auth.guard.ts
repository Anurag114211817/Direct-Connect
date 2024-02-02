import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  private router = inject(Router);
  private userAuth = inject(AuthService);

  canActivate(): boolean {
    let auth = false;
    this.userAuth.get$.subscribe((signal) => (auth = signal));
    if (auth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
class LoginGuard {
  private router = inject(Router);
  private userAuth = inject(AuthService);

  canActivate(): boolean {
    let auth = false;
    this.userAuth.get$.subscribe((signal) => (auth = signal));
    if (!auth) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (_route, _state) => {
  return inject(AuthGuard).canActivate();
};

export const loginGuard: CanActivateFn = (_route, _state) => {
  return inject(LoginGuard).canActivate();
};
