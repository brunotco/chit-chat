import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@store/auth/auth.selector';
import { logout } from '@store/auth/auth.actions';
import { Navigation } from '@models/navigation.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuOpen = false;

  public isAuthenticated$;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  public authNav: Navigation[] = [
    new Navigation('Login', () => this.navigateTo('/auth/login'), 'power_settings_new'),
    new Navigation('Register', () => this.navigateTo('/auth/register'), 'add_circle')
  ]

  public userNav: Navigation[] = [
    new Navigation('Users', () => this.navigateTo('/users'), 'group'),
    new Navigation('Rooms', () => this.navigateTo('/rooms'), 'meeting_room'),
    new Navigation('Profile', () => this.navigateTo('/profile'), 'person'),
    new Navigation('Logout', () => this.logout(), 'exit_to_app')
  ]

  public navigateTo(link: string) {
    this.router.navigate([link]);
  }

  public logout() {
    this.store.dispatch(logout());
  }
}
