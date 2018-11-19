import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LogInService } from './login.service';
import * as $ from 'jquery';
import { UsersService } from '@app/users/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ThrowStmt } from '@angular/compiler';
import { AppService } from '@app/app.component.service';

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
  constructor(private flashMessages: FlashMessagesService, private logInService: LogInService,
              private usersService: UsersService, private appService: AppService) { }

  ngOnInit() {
    this.usersService.castUser.subscribe(
      user => {
        this.user = user;
      }
    );
    this.waitingResponse = false;
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
    this.logInService.logIn(email, password).subscribe(
      user => {
        user.user.email = email;
        this.waitingResponse = false;
        this.showMessage('Bienvenido!', 'success');
        this.logInService.setToken(user.token);
        this.setCurrentUser(user.user);

      },
      error => {
        // Error
        this.waitingResponse = false;
        this.showMessage('Mail o clave incorrecta', 'danger');
      }
    );
  }
  setCurrentUser(user) {
    user.token = this.logInService.getToken(),
    this.usersService.editUser(user);
    this.logInService.editLogged(true);
  }

  showMessage(message: string, type: string) {
    this.flashMessages.show(message, {
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
  keyDownFunction(email, password, event) {
    if (event.keyCode === 13) {
      this.validateUser(email, password);
    }
  }

  async updateFCMToken(user) {
    if (!user.user.fcmTokens) {
      let usr: any;
      usr = await this.usersService.patchUserFCMTokens(user.user.id, []).toPromise().then().catch(err => console.log(err));
      if (usr) {
        user.user.fcmTokens = usr.fcmTokens;
        console.log('jere');
      } else {
        console.log('jhjj');
      }
    }
  }

}
