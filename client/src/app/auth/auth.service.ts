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
}
