import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../models/login-form.model';
import { LoginResponse } from '../models/login-response.model';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  login(login: LoginForm): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>('/api/auth/login', login);
  }

  getUsers() {
    return this.httpClient.get('/api/users');
  }
}
