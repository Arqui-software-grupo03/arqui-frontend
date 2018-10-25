import { Component, OnInit } from '@angular/core';
import { LogInService } from './login.service';
import * as $ from 'jquery';
import { UsersService } from '@app/users/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';

declare var jQuery: any;
const TIMEOUT = 5000;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  user;
  btnEnable = false;
  waitingResponse = false;
  constructor(private logInService: LogInService, private usersService: UsersService,
              private flashMessage: FlashMessagesService) { }

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

  keyUpFunction(email, password, event) {
    this.btnEnable = email.length > 4 && password.length >= 6 ? true : false;
  }

  onSubmit(email, password, event) {
    this.preventClose(event);
    this.waitingResponse = true;
    this.validateUser(email, password);

  }

  validateUser(email, password) {
    this.logInService.getUserByEmail(email, password).subscribe(
      user => {
        user.email = email;
        this.usersService.editUser(user);
        this.waitingResponse = false;
        this.showMessage('Bienvenido!', 'success');
        this.logInService.setToken(user.email, user.token);
        this.setCurrentUser();
      },
      error => {
        // Error
        this.waitingResponse = false;
        this.showMessage('Mail o clave incorrecta', 'danger');
      }
    );
  }
  setCurrentUser() {
    const usr = {
      'token': this.logInService.getToken(),
      'email': this.logInService.getEmail()
    };
    this.usersService.editUser(usr);
  }

  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: TIMEOUT,
      showCloseBtn: true,
      closeOnClick: true
    });
  }

  preventClose(event) {
    event.stopPropagation();
    event.preventDefault();
  }

}
