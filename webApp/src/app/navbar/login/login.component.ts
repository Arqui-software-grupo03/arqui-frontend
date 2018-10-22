import { Component, OnInit } from '@angular/core';
import { LogInService } from './login.service';
import * as $ from 'jquery';
import { UsersService } from '@app/users/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  keyDownFunction(email, password, event) {
    this.btnEnable = email.length > 4 && password.length > 6 ? true : false;
  }

  onSubmit(email, password, event) {
    event.preventDefault();
    this.waitingResponse = true;
    this.validateUser(email, password);
    event.stopPropagation();
  }

  validateUser(email, password) {
    this.logInService.getUserByEmail(email, password).subscribe(
      user => {
        user.email = email;
        this.usersService.editUser(user);
        this.waitingResponse = false;
        this.flashMessage.show('Welcome To TheRichPost.com', { cssClass: 'alert-success', timeout: 2000 });
        this.flashMessage.show('RichDotCom', { cssClass: 'alert-info', timeout: 2000 });
      },
      error => {
        // Error
        this.waitingResponse = false;
        this.flashMessage.show('Welcome To TheRichPost.com', { cssClass: 'alert-danger', timeout: 2000 });
      }
    );
  }


}
