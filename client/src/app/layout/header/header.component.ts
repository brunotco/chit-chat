import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { autoLogin, logout } from 'src/app/auth/state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuOpen = false;

  public isAuthenticated$;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.store.dispatch(autoLogin());
  }

  public authNav = [
    { name: 'Login', click: () => this.navigateTo('/login'), icon: 'power_settings_new' },
    { name: 'Register', click: () => this.navigateTo('/register'), icon: 'add_circle' }
  ]

  public userNav = [
    { name: 'Rooms', click: () => this.navigateTo('/rooms'), icon: 'meeting_room' },
    { name: 'Profile', click: () => this.navigateTo('/profile'), icon: 'person' },
    { name: 'Logout', click: () => this.logout(), icon: 'exit_to_app' }
  ]

  public navigateTo(link: string) {
    this.router.navigate([link]);
  }

  public logout() {
    this.store.dispatch(logout());
  }
}
