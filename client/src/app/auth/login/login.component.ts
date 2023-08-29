import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from '../auth.service';
import { AlertService } from 'src/app/alert/alert.service';

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

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
    ) {
    this.authService.userChanged$.subscribe(
      () => this.loginData = this.authService.getUser()
    );
  }

  async login() {
    this.apiService.login(this.loginForm.value)
    .subscribe({
      next: (data: any) => {
        this.loginData = data;
        this.authService.saveAccessToken(data.authorization);
        this.authService.saveUser(data.userData);
        this.alertService.success('Logged In')
      },
      error: (err: any) => {
        this.alertService.error(err.error.message);
      }
    }
    )
  }

  currentAuth() {
    console.log(
      this.authService.getAccessToken()
    );
  }

  currentExp() {
    this.authService.getExpiration();
  }

  logout() {
    this.authService.logout();
    this.alertService.success('Logged Out')
  }
}
