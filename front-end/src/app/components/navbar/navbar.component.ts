import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { UserService } from '../../services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { RecentContactComponent } from './recent-contact/recent-contact.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchComponent, RecentContactComponent, LoaderComponent],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  private userAuth = inject(AuthService);
  private router = inject(Router);
  private loader = inject(LoaderService);
  user = inject(UserService);
  tertiaryLoader = false;
  ngOnInit() {
    this.user.fetchCurrentUser();
    this.loader.getTertiaryLoader$.subscribe({
      next: (value) => (this.tertiaryLoader = value),
    });
  }

  logout() {
    this.loader.showLoader('primary');
    this.userAuth.set(false);
    this.router.navigate(['/login']);
    setTimeout(() => this.loader.hideLoader('primary'), 500);
  }
}
