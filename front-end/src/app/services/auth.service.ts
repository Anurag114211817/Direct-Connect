import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { apis } from '../constants/api.constant';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private loader = inject(LoaderService);

  private auth = new BehaviorSubject<boolean>(false);
  public get$ = this.auth.asObservable();

  constructor() {
    this.auth.next(Boolean(!!localStorage.getItem('token')));
  }

  set(signal: boolean, value: any = '') {
    this.loader.showLoader('primary');
    if (signal) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
    this.auth.next(signal);
    this.loader.hideLoader('primary');
  }

  registerUser(data: any) {
    this.loader.showLoader('primary');
    return this.http.post(apis.register, data);
  }

  loginUser(data: any) {
    this.loader.showLoader('primary');
    return this.http.post(apis.login, data, { withCredentials: true });
  }
}
