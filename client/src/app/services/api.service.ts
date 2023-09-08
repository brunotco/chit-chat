import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '@models/login-form.model';
import { LoginResponse } from '@models/login-response.model';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { getToken } from '@store/auth/auth.selector';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private store: Store) { }

  login(login: LoginForm): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, login);
  }

  getUsers() {
    return this.store.select(getToken).pipe(
      switchMap(token => {
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.httpClient.get<User[]>(`${environment.apiUrl}/api/users`, { headers });
      })
    )
  }
}
