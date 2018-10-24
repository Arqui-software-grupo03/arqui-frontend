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
  validEmail = true;
  private userTypingTimeout;
  private showingMessage = false;
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
                        (password === retypePassword) && this.validEmail ? true : false;
    if (password.length >= 6 && retypePassword.length >= 1) {
      clearTimeout(this.userTypingTimeout);
      this.userTypingTimeout = this.checkAfterUserTypes(password, retypePassword);
    }
  }
  keyUpCheckEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validEmail = re.test(String(email).toLowerCase());
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
      showCloseBtn: true
    });
  }

  checkAfterUserTypes(password: string, retypePassword: string) {
    return setTimeout( () => {
      if ((password !== retypePassword) && !this.showingMessage) {
        this.showMessage('Las contraseñas ingresadas no coinciden.', 'danger');
        this.changeShowingMessageState(true);
      }
    }, 500);
  }

  changeShowingMessageState(value: boolean): void {
    this.showingMessage = value;
    setTimeout( () => {
      this.showingMessage = !this.showingMessage;
    }, TIMEOUT);
  }

  close(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
