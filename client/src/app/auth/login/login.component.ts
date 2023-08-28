import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from '../auth.service';

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

  public loginData = {};

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private authService: AuthService) {}

  async login() {
    console.log(this.loginForm.value);
    this.loginData = {};
    this.apiService.login(this.loginForm.value)
    .subscribe(
      (data) => {
        this.authService.setSession(data);
        this.loginData = data;
      }
    )
  }

  currentAuth() {
    this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
