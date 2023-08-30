import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  get authenticated$() { return this.authService.userAuthenticated$ };

  menuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

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
    this.router.navigateByUrl(link);
  }

  public logout() {
    this.authService.logout();
  }
}
