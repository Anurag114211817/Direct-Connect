import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    LoaderComponent,
    NgStyle,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private userAuth = inject(AuthService);
  private loader = inject(LoaderService);
  public auth = false;
  public primaryLoader = false;
  public secondaryLoader = false;
  style = {
    background: 'linear-gradient(0deg, #fff, #fffb), url("/assets/bg.jpg")',
    backgroundSize: '25%',
  };

  ngOnInit() {
    this.loader.showLoader('primary');
    this.userAuth.get$.subscribe((signal) => (this.auth = signal));
    this.loader.getPrimaryLoader$.subscribe(
      (signal) => (this.primaryLoader = signal)
    );
    this.loader.getSecondaryLoader$.subscribe(
      (signal) => (this.secondaryLoader = signal)
    );
    setTimeout(() => this.loader.hideLoader('primary'), 500);
  }
}
