import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get('/api/user');
  }
}
