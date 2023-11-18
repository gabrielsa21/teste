import { AuthService } from 'src/app/core/service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  error = '';
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['programador', Validators.required],
      password: ['pg123', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const ERROR_MESSAGE = 'Usuario ou senha invalido';
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      this.error = ERROR_MESSAGE;
      return;

    } else {
      this.authService
        .login(this.form['username'].value, this.form['password'].value)
        .subscribe(() => {
          this.router.navigate(['/agendamentos']);
        });
      }
  }
}
