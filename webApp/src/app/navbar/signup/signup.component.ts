import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as $ from 'jquery';

declare var jQuery: any;
const TIMEOUT = 5000;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  btnEnable = false;
  waitingResponse = false;
  validEmail = false;
  validUsername = false;
  private userEmailTypingTimeout;
  private userNameTypingTimeout;
  private showingMessageEmail = false;
  private showingMessageUserName = false;
  constructor(private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.addjQueryTooltip();
  }

  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }

  keyUpValidatePassword(password: string, retypePassword: string) {
    this.btnEnable = (password.length >= 6 && retypePassword.length >= 6) &&
                        (password === retypePassword) && this.validEmail &&
                          this.validUsername ? true : false;
    if (password.length >= 6 && retypePassword.length >= 1) {
      clearTimeout(this.userEmailTypingTimeout);
      this.userEmailTypingTimeout = this.checkAfterUserTypes(password !== retypePassword &&
          !this.showingMessageEmail, 'Las contraseñas ingresadas no coinciden.', 400, 'email');
    }
  }
  keyUpCheckEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validEmail = re.test(String(email).toLowerCase());
  }
  keyUpCheckUsername(username: string) {
    this.validUsername = username.length >= 4 ? true : false;
    clearTimeout(this.userNameTypingTimeout);
    this.userNameTypingTimeout = this.checkAfterUserTypes(
        !this.validUsername && !this.showingMessageUserName, 'Nombre de usuario mayor o igual a 4 caracteres', 300, 'user');
  }

  onSubmit(username: string, password: string, $event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.waitingResponse = true;
  }

  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: TIMEOUT,
      showCloseBtn: true,
      closeOnClick: true
    });
  }

  checkAfterUserTypes(condition: boolean, message: string, timeout: number, type: string) {
    return setTimeout( () => {
      if (condition) {
        this.showMessage(message, 'danger');
        this.changeShowingMessageState(true, timeout, type);
      }
    }, timeout);
  }

  changeShowingMessageState(value: boolean, timeout: number, type: string): void {
    if (type === 'email') {
      this.showingMessageEmail = value;
    } else {
      this.showingMessageUserName = value;
    }
    setTimeout( () => {
      if (type === 'email') {
        this.showingMessageEmail = !this.showingMessageEmail;
      } else {
        this.showingMessageUserName = !this.showingMessageUserName;
      }
    }, TIMEOUT);
  }

  preventClose(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
