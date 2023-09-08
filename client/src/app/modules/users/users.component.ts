import { Component } from '@angular/core';
import { User } from '@models/user.model';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';
import { UsersStore } from './users.store';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [provideComponentStore(UsersStore)]
})
export class UsersComponent {
  public users$: Observable<User[]>;

  constructor(private usersStore: UsersStore) {
    this.users$ = this.usersStore.users$;
  }
}
