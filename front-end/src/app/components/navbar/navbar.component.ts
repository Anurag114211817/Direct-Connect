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
  imports: [SearchComponent, RecentContactComponent, LoaderComponent],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  private userAuth = inject(AuthService);
  private router = inject(Router);
  private loader = inject(LoaderService);
  user = inject(UserService);
  public tertiaryLoader = this.loader.getLoader('tertiary')();

  ngOnInit() {
    this.user.fetchCurrentUser();
  }

  logout() {
    this.loader.showLoader('primary');
    this.userAuth.set(false);
    this.router.navigate(['/auth/login']);
    setTimeout(() => this.loader.hideLoader('primary'), 500);
  }
}
