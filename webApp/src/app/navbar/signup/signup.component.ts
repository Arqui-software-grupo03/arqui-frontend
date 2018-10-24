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
  }
  keyUpCheckEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validEmail = re.test(String(email).toLowerCase());
  }
  onSubmit(username: string, password: string, event) {

  }

  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: TIMEOUT
    });
  }

}
