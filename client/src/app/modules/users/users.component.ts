import { Component } from '@angular/core';
import { User } from '@models/user.model';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users$: Observable<User[]>;

  constructor(private apiService: ApiService) {
    // this.apiService.getUsers().subscribe(users => this.users = users);
    this.users$ = this.apiService.getUsers();
  }
}
