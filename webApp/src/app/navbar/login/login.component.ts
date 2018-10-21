import { Component, OnInit } from '@angular/core';
import { LogInService } from './login.service';
import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  user;
  btnEnable = false;
  constructor(private logInService: LogInService ) { }

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
  keyDownFunction(username, password, event) {
    this.btnEnable = username.length > 4 && password.length > 6 ? true : false;
  }
  onSubmit(username, password, event) {
    event.preventDefault();
  }

}
