import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/users/users.service';
import { LogInService } from '@app/navbar/login/login.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private usersService: UsersService, private logInService: LogInService) { }

  ngOnInit() {
  }
  onLogout() {
    this.logout();
    this.usersService.editUser({});
  }
  logout() {
    this.logInService.removeToken();
    this.logInService.editLogged(false);
  }
}
