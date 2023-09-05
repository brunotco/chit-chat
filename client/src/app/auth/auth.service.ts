import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '@store/auth/auth.actions';
import { LoginResponse } from '@models/login-response.model';
import { User } from '@models/user.model';

@Injectable()
export class AuthService {

  ACCESS_TOKEN = 'access_token';
  REFRESH_TOKEN = 'refresh_token';
  USER_DATA = 'user_data';

  logoutTimeout: any;
  
  constructor(
    private store: Store,
  ) { }

  public login(loginResponse: LoginResponse) {
    this.saveAccessToken(loginResponse.authorization);
    this.saveUser(loginResponse.userData);
    // this.sessionTimeout(loginResponse.authorization);
  }

  public logout() {
    sessionStorage.clear();
  }

  public log() {
    console.warn('Session Timeout Setter Implementation');
  }

  private sessionTimeout(token: string) {
    const now = new Date().getTime();
    const expires = JSON.parse(atob(token.split('.')[1])).exp;
    const timeout = (expires * 1000) - now;

    console.warn(`Session Timeout: ${new Date(expires * 1000)}`);

    this.logoutTimeout = setTimeout(() => {
      this.store.dispatch(logout());
    }, timeout);
  }

  public getTimeout() {
    const token = this.getAccessToken();
    if (!token) return 0;
    const expires = JSON.parse(atob(token.split('.')[1])).exp;
    const now = new Date().getTime();
    const timeout = (expires * 1000) - now;
    return timeout;
  }

  //? To check
  getExpiration() {
    const token = sessionStorage.getItem('authorization');
    let expires;
    if (token) {
      expires = JSON.parse(atob(token.split('.')[1])).exp;
    }

    const exp = new Date(expires * 1000);
    const now = new Date(Date.now());

    const ms = exp.valueOf() - now.valueOf();
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.round(((ms % 86400000) % 3600000) / 60000);
    // const s = 

    console.warn(
      'expires in:', d + ' days', h + ' hours', m + ' minutes'
    )

    // console.log(Math.floor(timeout / 60));
  }
  anotherExpiration() {
    const token = sessionStorage.getItem(this.ACCESS_TOKEN);
    let expires;
    if (token) {
      expires = JSON.parse(atob(token.split('.')[1])).exp;
    }
    console.log('expires', expires);
    const expiration = new Date(new Date().getTime());
    const exp = new Date(expires * 1000);
    console.log('expiration', exp);
  }

  //? Turn this into just two functions with <T>
  public saveAccessToken(token: string) {
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    sessionStorage.setItem(this.ACCESS_TOKEN, token);
  }
  public getAccessToken(): string | null {
    return sessionStorage.getItem(this.ACCESS_TOKEN);
  }

  public saveRefreshToken(token: string) {
    sessionStorage.removeItem(this.REFRESH_TOKEN);
    sessionStorage.setItem(this.REFRESH_TOKEN, token);
  }
  public getRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }
  
  public saveUser(user: User) {
    sessionStorage.removeItem(this.USER_DATA);
    sessionStorage.setItem(this.USER_DATA, JSON.stringify(user));
  }
  public getUser(): User | null {
    const user = sessionStorage.getItem(this.USER_DATA);
    if (user) return JSON.parse(user);
    return null;
  }
}
