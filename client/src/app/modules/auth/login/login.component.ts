import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginForm } from '@models/login-form.model';
import { Store } from '@ngrx/store';
import { loginStart } from '@store/auth/auth.actions';
import { isAuthenticated } from '@store/auth/auth.selector';
import { Observable } from 'rxjs';
import { setLoading } from '@store/shared/shared.actions';

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
      this.store.dispatch(setLoading({ status: true }));
      this.store.dispatch(loginStart({ loginForm }));
    }
  }
}
