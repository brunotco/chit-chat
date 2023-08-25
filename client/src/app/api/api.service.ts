import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  login(login: any) {
    return this.httpClient.post('/api/auth/login', login);
  }

  getUsers() {
    return this.httpClient.get('/api/users');
  }
}
