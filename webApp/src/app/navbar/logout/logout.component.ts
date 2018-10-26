import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/users/users.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }
  onLogout() {
    this.logout();
    this.usersService.editUser(null);
  }
  logout() {
    localStorage.clear();
  }
}
