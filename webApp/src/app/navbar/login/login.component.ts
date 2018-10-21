import { Component, OnInit } from '@angular/core';
import { LogInService } from './login.service';
import * as $ from 'jquery';
import { UsersService } from '@app/users/users.service';

declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  user;
  btnEnable = false;
  waitingResponse = false;
  constructor(private logInService: LogInService, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.castUser.subscribe(
      user => this.user = user
    );
    this.addjQueryTooltip();
  }

  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }

  keyDownFunction(email, password, event) {
    this.btnEnable = email.length > 4 && password.length > 6 ? true : false;
  }

  onSubmit(email, password, event) {
    event.preventDefault();
    event.stopPropagation();
    this.waitingResponse = true;
    this.validateUser(email, password);
  }

  validateUser(email, password) {
    this.logInService.getUserByEmail(email, password).subscribe(
      user => {
        this.usersService.editUser(user);
        this.waitingResponse = false;
      },
      error => {
        // Error
        this.waitingResponse = false;
      }
    );
  }


}
