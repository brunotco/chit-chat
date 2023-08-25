import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public loginData = {};

  constructor(private apiService: ApiService) {}

  async login() {
    console.log(this.form.value);
    this.loginData = {};
    this.apiService.login(this.form.value)
    .subscribe(
      (data) => {
        console.log(data);
        this.loginData = data;
      }
    )
  }
}
