import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from '../auth.service';
import { AlertService } from 'src/app/alert/alert.service';
import { LoginForm } from 'src/app/models/login-form.model';
import { Store } from '@ngrx/store';
import { loginStart, logout } from '../state/auth.actions';
import { isAuthenticated } from '../state/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  })

  public hidePassword = true;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  async login() {
    const login = this.loginForm.get('login')?.value;
    const password = this.loginForm.get('password')?.value;
    if (login && password) {
      const loginForm: LoginForm = {
          login,
          password
      };
      this.store.dispatch(loginStart({ loginForm }));
    }
  }
}
