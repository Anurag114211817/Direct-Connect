import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RecentContact, User } from '../modals/recent-contact.modal';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private loader = inject(LoaderService);
  public recentContacts: User[] = [];
  public currentUser: User = {} as User;

  constructor() {}

  fetchCurrentUser() {
    this.http
      .get<RecentContact>('https://randomuser.me/api/?results=1&nat=in')
      .subscribe({
        next: (data) => {
          this.currentUser = data?.results[0];
        },
        error: (err) => console.log(err.message as Error),
      });
  }

  fetchRecentContact() {
    this.loader.showTertiaryLoader();
    this.http
      .get<RecentContact>('https://randomuser.me/api/?results=15&nat=in')
      .subscribe({
        next: (data) => (this.recentContacts = data?.results),
        error: (err) => console.log(err.message as Error),
        complete: () => this.loader.hideTertiaryLoader(),
      });
  }
}
