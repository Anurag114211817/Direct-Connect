import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { Signup } from '../../modals/signup.modal';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './signup.component.html',
  styles: ``,
})
export class SignupComponent {
  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{};':"\\|,.<>/?]).{8,}$/;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private userAuth = inject(AuthService);
  submitted: boolean = false;

  public signupForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
    ],
    confPassword: ['', Validators.required],
  });

  constructor() {
    this.signupForm.addValidators([confirmPasswordValidator('password')]);
  }

  signup() {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.userAuth.registerUser(this.signupForm.value).subscribe({
        next: (_value) => {
          this.resetForm();
          this.router.navigate(['login']);
        },
        error: (err: Error) => {
          console.log(
            '🚀 ~ SignupComponent ~ this.auth.registerUser ~ err:',
            err.message
          );
        },
      });
    }
  }

  toggle() {
    this.resetForm();
    this.router.navigate(['login']);
  }

  resetForm() {
    this.signupForm.reset(new Signup());
    this.submitted = false;
  }
}
