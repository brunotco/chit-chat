import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent {
  usersData = this.apiService.getUsers();

  constructor(private apiService: ApiService) { }
}
