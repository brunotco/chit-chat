import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@store/auth/auth.selector';
import { logout } from '@store/auth/auth.actions';

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
  }

  public authNav = [
    { name: 'Login', click: () => this.navigateTo('/auth/login'), icon: 'power_settings_new' },
    { name: 'Register', click: () => this.navigateTo('/auth/register'), icon: 'add_circle' }
  ]

  public userNav = [
    { name: 'Users', click: () => this.navigateTo('/users'), icon: 'group' },
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
