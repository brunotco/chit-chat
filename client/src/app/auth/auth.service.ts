import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  setSession(data: any) {
    localStorage.setItem('authorization', data.authorization);
  }

  logout() {
    localStorage.removeItem('authorization');
  }

  isLoggedIn() {
    console.log(
      localStorage.getItem('authorization')
    );
  }

  getExpiration() {
    const token = localStorage.getItem('authorization');
    let issued;
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
}
