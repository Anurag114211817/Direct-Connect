import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { apis } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  public get$ = this.auth.asObservable();

  constructor() {
    this.auth.next(Boolean(!!localStorage.getItem('token')));
  }

  set(signal: boolean, value: any = '') {
    if (signal) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
    this.auth.next(signal);
  }

  registerUser(data: any) {
    return this.http.post(apis.register, data);
  }

  loginUser(data: any) {
    return this.http.post(apis.login, data, { withCredentials: true });
  }
}
