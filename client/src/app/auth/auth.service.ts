import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  ACCESS_TOKEN = 'access_token';
  REFRESH_TOKEN = 'refresh_token';
  USER_DATA = 'user_data';

  private userChanged = new BehaviorSubject('');
  userChanged$ = this.userChanged.asObservable();

  constructor() { }

  // setSession(data: any) {
  //   localStorage.setItem('authorization', data.authorization);
  // }

  logout() {
    sessionStorage.clear();
    this.userChanged.next('');
  }

  isLoggedIn() {
    console.log(
      localStorage.getItem('authorization')
    );
  }

  getExpiration() {
    const token = localStorage.getItem('authorization');
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
  
  public saveUser(user: any) {
    sessionStorage.removeItem(this.USER_DATA);
    sessionStorage.setItem(this.USER_DATA, JSON.stringify(user));
    this.userChanged.next('');
  }

  public getUser() {
    const user = sessionStorage.getItem(this.USER_DATA);
    if (user) return JSON.parse(user);
    return {};
  }
}
