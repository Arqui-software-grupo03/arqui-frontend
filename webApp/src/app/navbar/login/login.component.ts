import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LogInService } from './login.service';
import * as $ from 'jquery';
import { UsersService } from '@app/users/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ThrowStmt } from '@angular/compiler';

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
  looged: boolean;
  @Input() isLooged: boolean;
  @Output() isLoogedEvent = new EventEmitter();
  constructor(private logInService: LogInService, private usersService: UsersService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.usersService.castUser.subscribe(
      user => {
        this.user = user;
      }
    );
    this.looged = this.isLooged;
    console.log('imprimiendo desde login');
    console.log(this.looged);
    this.waitingResponse = false;
    this.addjQueryTooltip();
  }

  addjQueryTooltip() {
    jQuery('[data-toggle="toolip"]').tooltip({
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
  onLogout() {
    this.logInService.logout();
    this.looged = false;
    this.isLoogedEvent.emit(this.looged);
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
        this.looged = true;
        this.isLoogedEvent.emit(this.looged);
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
      timeout: TIMEOUT
    });
  }


}
