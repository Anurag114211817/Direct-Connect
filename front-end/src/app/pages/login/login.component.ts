import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../modals/login.modal';
import { Response } from '../../modals/user.modal';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  private userAuth = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private loader = inject(LoaderService);
  submitted: boolean = false;

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
  });

  login() {
    this.loader.showPrimaryLoader();
    this.submitted = true;
    if (this.loginForm.valid) {
      this.userAuth.loginUser(this.loginForm.value).subscribe({
        next: (value) => {
          this.userAuth.set(true, (value as Response).data._id);
          this.resetForm();
          this.router.navigate(['/home']);
        },
        error: (err: Error) => {
          console.log(
            '🚀 ~ LoginComponent ~ this.userAuth.registerUser ~ err:',
            err.message
          );
        },
      });
    }
    setTimeout(() => this.loader.hidePrimaryLoader(), 500);
  }

  toggle() {
    this.resetForm();
    this.router.navigate(['signup']);
  }

  resetForm() {
    this.loginForm.reset(new Login());
    this.submitted = false;
  }
}
